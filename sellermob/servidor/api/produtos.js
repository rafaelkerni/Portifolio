module.exports = app => {

    const getProdutos = (req, res) => {
        app.bancoUsuario(app, req.user.id, "D", config => {
          var query = Object.keys(req.query).map(key => key);
          const { grupo_id, buscar, situacao } = req.query;

          const models = require("../config/models");
          const Produtos = models(app.knex(config)).Produtos;

          Produtos.query(function(db) {
            if (req.params.id && req.params.id > 0) {
              db.where("id", req.params.id);
            } else if (grupo_id && grupo_id > 0) {
              db.where("grupo_id",  grupo_id);
            } else if (buscar && buscar !== '') {
              db.where("nome", 'like', `%${buscar}%`).orWhere("codigo", 'like',  `%${buscar}%`)
            }
            
            if (situacao && situacao !== '') {
              db.where("situacao", situacao)
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
  
    const setProdutos = (req, res) => {
      if(!req.body.codigo || req.body.codigo === ''){
        res.status(200).json("É necessário informar o codigo do Produto!");
      } else if(!req.body.situacao || (req.body.situacao !== 0 && req.body.situacao !== 1) ){
        res.status(200).json("É necessário informar a situcao do Produto!");  
      } else if(!req.body.grupo_id || req.body.grupo_id === ''){
        res.status(200).json("É necessário informar o id do grupo do Produto!");  
      } else if(!req.body.nome || req.body.nome === ''){
        res.status(200).json("É necessário informar o nome do Produto!");
      }else{
        app.bancoUsuario(app, req.user.id, "D", config => {
          app
            .knex(config)("produtos")
            .insert([req.body])
            .then(grupos => res.json(grupos))
            .catch(err => res.status(500).json(err.sqlMessage));
        });
      }
    }

    const setImgProdutos = (req, res) => {
      if(!req.files || req.files.lengh <= 0){
          res.status(400).json("É necessário enviar as imagens!");
      } else {
          app.bancoUsuario(app, req.user.id, "D", config => {
              const fs = require("fs-extra");
              app.salvarArquivo(app, req.user.id, req.params.id, "P", diretorio => {
                  const imagem = req.files.image
                  const fPath = `${diretorio}/${imagem.name}`;
                  fs.copy(imagem.path, fPath)
                  .then(result => {
                    app
                    .knex(config)("produtos")
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
  
    const deleteProdutos = (req, res) => {
      if (req.params.id && req.params.id > 0) {
        app.bancoUsuario(app, req.user.id, "D", config => {
          app
            .knex(config)("produtos")
            .where("id", req.params.id)
            .del()
            .then(grupo => res.json(grupo))
            .catch(err => res.status(500).json(err.sqlMessage));
        });
      } else {
        res
          .status(400)
          .json("É necessário informar o id do produto a ser deletado!");
      }
    };
  
    const updateProdutos = (req, res) => {
      delete req.body.created_at
      delete req.body.updated_at
      delete req.body.delete_at
      if (req.params.id && req.params.id > 0) {
        app.bancoUsuario(app, req.user.id, "D", config => {
          app
            .knex(config)("produtos")
            .where("id", req.params.id)
            .update(req.body)
            .then(grupo => res.json(grupo))
            .catch(err => res.status(500).json(err.sqlMessage));
        });
      } else {
        res
          .status(400)
          .json("É necessário informar o id do produto a ser alterado!");
      }
    };
  
    return {
      getProdutos,
      setProdutos,
      updateProdutos,
      deleteProdutos,
      setImgProdutos
    };
  };
  