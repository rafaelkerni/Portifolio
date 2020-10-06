module.exports = app => {

    const getGrupos = (req, res) => {
        app.bancoUsuario(app, req.user.id, "D", config => {
          var query = Object.keys(req.query).map(key => key);
          const { id, categoria_id } = req.query;

          const models = require("../config/models");
          const Grupos = models(app.knex(config)).Grupos;
          //console.log(related);
           Grupos.query(function(db) {
            if (id && id > 0) {
              db.where("id", id);
            } else if (categoria_id && categoria_id > 0) {
              db.where("categoria_id", categoria_id);
            }
          })
          .fetchPage({
            withRelated: [],
            page: req.query.page || 1,
            pageSize: req.query.pagesize || 250
          }) .then(function({ models, pagination } = data) {
            if (req.params.id && req.params.id > 0) {
              res.send({ data: models[0] });
            } else {
              res.send({ data: models, pagination });
            }
          })
          .catch(function(err) {
            console.error(err);
          });
        });
      };
  
    const setGrupos = (req, res) => {
      if(!req.body.nome || req.body.nome === ''){
        res.status(200).json("É necessário informar o nome do Grupo!");
      }else{
        app.bancoUsuario(app, req.user.id, "D", config => {
          app
            .knex(config)("grupos")
            .insert([req.body])
            .then(grupos => res.json(grupos))
            .catch(err => res.status(500).json(err.sqlMessage));
        });
      }
    }

    const setImgGrupos = (req, res) => {
      if(!req.files || req.files.lengh <= 0){
          res.status(400).json("É necessário enviar as imagens!");
      } else {
          app.bancoUsuario(app, req.user.id, "D", config => {
              const fs = require("fs-extra");
              app.salvarArquivo(app, req.user.id, req.params.id, "G", diretorio => {
                  const imagem = req.files.image
                  const fPath = `${diretorio}/${imagem.name}`;
                  fs.copy(imagem.path, fPath)
                  .then(result => {
                    app
                    .knex(config)("grupos")
                    .update({imagem: fPath.replace('./uploads/', '')})
                    .where("id", req.params.id)
                    .then(() => res.status(200).json('OK'))
                    .catch(err => res.status(500).json(err))
                  })
                  .catch(err => res.status(500).json(err))
                 
              })
          })
      }
  }
  
    const deleteGrupos = (req, res) => {
      if (req.params.id && req.params.id > 0) {
        app.bancoUsuario(app, req.user.id, "D", config => {
          app
            .knex(config)("grupos")
            .where("id", req.params.id)
            .del()
            .then(grupo => res.json(grupo))
            .catch(err => res.status(500).json(err.sqlMessage));
        });
      } else {
        res
          .status(400)
          .json("É necessário informar o id do grupo a ser deletado!");
      }
    };
  
    const updateGrupos = (req, res) => {
      delete req.body.created_at
      delete req.body.updated_at
      delete req.body.delete_at
      if (req.params.id && req.params.id > 0) {
        app.bancoUsuario(app, req.user.id, "D", config => {
          app
            .knex(config)("grupos")
            .where("id", req.params.id)
            .update(req.body)
            .then(grupo => res.json(grupo))
            .catch(err => res.status(500).json(err.sqlMessage));
        });
      } else {
        res
          .status(400)
          .json("É necessário informar o id do grupo a ser alterado!");
      }
    };
  
    return {
      getGrupos,
      setGrupos,
      updateGrupos,
      deleteGrupos,
      setImgGrupos
    };
  };
  