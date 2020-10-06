module.exports = app => {
  const setPessoas = (req, res) => {
    if (req.body) {
      if (!req.body.nome || req.body.nome === "") {
        res.status(400).send("É necessário informar o nome da Pessoa!");
      } else if (!req.body.pessoa || req.body.pessoa === "") {
        res
          .status(400)
          .send("É necessário informar o tipo da Pessoa ('F' | 'J')!");
      } else {
        app.bancoUsuario(app, req.user.id, "D", config => {
          app
            .knex(config)("pessoas")
            .insert([req.body])
            .then(pessoa => res.json(pessoa))
            .catch(err => res.status(500).json(err.sqlMessage));
        });
      }
    } else {
      res
        .status(204)
        .send("É necessário enviar os dados da pessoa para inserção!");
    }
  };

  const getPessoas = (req, res) =>
    app.bancoUsuario(app, req.user.id, "D", config => {
      var query = Object.keys(req.query).map(key => key);

      const models = require("../config/models");

      const Pessoas = models(app.knex(config)).Pessoas;

      let related = [];
      if (req.query["contatos"] != undefined) {
        related.push("contatos");
      }

      if (req.query["enderecos"] != undefined) {
        related.push("enderecos");
      }

      Pessoas.query(function(db) {
        if (req.params.id && req.params.id > 0) db.where("id", req.params.id);
        if (req.query.tipo_pessoa && req.query.tipo_pessoa > 0){
          db.leftJoin(
            'pessoa_tipos',
            'pessoa_tipos.pessoa_id',
            'pessoas.id'
          );
          db.where("pessoa_tipos.tipo_id", req.query.tipo_pessoa);
        } 
        if (req.query.id_externo && req.query.id_externo !== "")
          db.where("id_externo", req.query.id_externo);
      })
        .fetchPage({
          withRelated: related,
          page: req.params.page || 1,
          pageSize: req.query.pagesize || 200
        })
        .then(function({ models, pagination } = data) {
          res.json({ data: models, pagination });
        })
        .catch(function(err) {
          console.error(err);
        });
    });

  const deletePessoas = (req, res) => {
    if (req.params.id && req.params.id > 0) {
      app.bancoUsuario(app, req.user.id, "D", config => {
        app
          .knex(config)("pessoas")
          .where("id", req.params.id)
          .del()
          .then(pessoa => res.json(pessoa))
          .catch(err => res.status(500).json(err.sqlMessage));
      });
    } else {
      res
        .status(400)
        .json("É necessário informar o id do cliente a ser deletado!");
    }
  };

  const updatePessoas = (req, res) => {
    if (req.params.id && req.params.id > 0) {
      app.bancoUsuario(app, req.user.id, "D", config => {
        app
          .knex(config)("pessoas")
          .where("id", req.params.id)
          .update(req.body)
          .then(pessoas => res.json(pessoas))
          .catch(err => res.status(500).json(err.sqlMessage));
      });
    } else {
      res
        .status(400)
        .json("É necessário informar o id do cliente a ser alterado!");
    }
  };

  return {
    getPessoas,
    setPessoas,
    updatePessoas,
    deletePessoas
  };
};
