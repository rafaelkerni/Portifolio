module.exports = app => {

    const getCategorias = (req, res) => {
        app.bancoUsuario(app, req.user.id, "D", config => {
          var query = Object.keys(req.query).map(key => key);
          const { id } = req.query;

          const models = require("../config/models");
          const Categorias = models(app.knex(config)).Categorias;
    
          let related = [];
          if (query.includes("roteiros_trajeto")) {
            related.push("roteiros_trajeto");
          }

          //console.log(related);
          Categorias.query(function(db) {
            if (id && id > 0) {
              db.where("id", id);
            }
          })
          .fetchPage({
            withRelated: related,
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
  
    const setCategorias = (req, res) => {
      if(!req.body.nome || req.body.nome === ''){
        res.status(200).json("É necessário informar o nome da Categoria!");
      }else{
        app.bancoUsuario(app, req.user.id, "D", config => {
          app
            .knex(config)("categorias")
            .insert([req.body])
            .then(grupos => res.json(grupos))
            .catch(err => res.status(500).json(err.sqlMessage));
        });
      }
    }

    const setImgCategorias = (req, res) => {
      if(!req.files || req.files.lengh <= 0){
          res.status(400).json("É necessário enviar as imagens!");
      } else {
          app.bancoUsuario(app, req.user.id, "D", config => {
              const fs = require("fs-extra");
              app.salvarArquivo(app, req.user.id, req.params.id, "C", diretorio => {
                const imagem = req.files.image
                  const fPath = `${diretorio}/${imagem.name}`;
                  fs.copy(imagem.path, fPath)
                  .then(result => {
                    app
                    .knex(config)("categorias")
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
  
    const deleteCategorias = (req, res) => {
      if (req.params.id && req.params.id > 0) {
        app.bancoUsuario(app, req.user.id, "D", config => {
          app
            .knex(config)("categorias")
            .where("id", req.params.id)
            .del()
            .then(grupo => res.json(grupo))
            .catch(err => res.status(500).json(err.sqlMessage));
        });
      } else {
        res
          .status(400)
          .json("É necessário informar o id da categoria a ser deletada!");
      }
    };
  
    const updateCategorias = (req, res) => {
      delete req.body.created_at
      delete req.body.updated_at
      delete req.body.delete_at
      if (req.params.id && req.params.id > 0) {
        app.bancoUsuario(app, req.user.id, "D", config => {
          app
            .knex(config)("categorias")
            .where("id", req.params.id)
            .update(req.body)
            .then(grupo => res.json(grupo))
            .catch(err => res.status(500).json(err.sqlMessage));
        });
      } else {
        res
          .status(400)
          .json("É necessário informar o id da categoria a ser alterada!");
      }
    };
  
    return {
      getCategorias,
      setCategorias,
      updateCategorias,
      deleteCategorias,
      setImgCategorias
    };
  };
  