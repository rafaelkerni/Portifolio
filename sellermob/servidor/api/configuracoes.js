module.exports = app => {

  const getConfigImagens = (req, res) => {
    app.bancoUsuario(app, req.user.id, "D", config => {
      var query = Object.keys(req.query).map(key => key);
      const { id } = req.query;

      const models = require("../config/models");
      const Config_Imagens = models(app.knex(config)).Config_Imagens;

      Config_Imagens.query(function(db) {
        if (id && id > 0) {
          db.where("id", id);
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

  const deleteImgConfig = (req, res) => {
    if (req.params.id && req.params.id > 0) {
      app.bancoUsuario(app, req.user.id, "D", config => {
        app
          .knex(config)("config_imagens")
          .where("id", req.params.id)
          .del()
          .then(img => res.json(img))
          .catch(err => res.status(500).json(err.sqlMessage));
      });
    } else {
      res
        .status(400)
        .json("É necessário informar o id da imagem a ser deletada!");
    }
  };

    const setImgConfig = (req, res) => {
      if(!req.files || req.files.lengh <= 0){
          res.status(400).json("É necessário enviar as imagens!");
      } else {
          app.bancoUsuario(app, req.user.id, "D", config => {
              const fs = require("fs-extra");
              app.salvarArquivo(app, req.user.id, req.params.id, "D", diretorio => {
                  const imagem = req.files.image
                  const fPath = `${diretorio}/${imagem.name}`;
                  fs.copy(imagem.path, fPath)
                  .then(result => {
                    if(!req.params.id){
                      app
                      .knex(config)("config_imagens")
                      .insert({imagem: fPath.replace('./uploads/', '')})
                      .then(() => res.status(200).json('OK'))
                      .catch(err => res.status(500).json(err.sqlMessage));
                    }else{
                      app
                      .knex(config)("config_imagens")
                      .update({imagem: fPath.replace('./uploads/', '')})
                      .where("id", req.params.id)
                      .then(() => res.status(200).json('OK'))
                      .catch(err => res.status(500).json(err))
                    }
                  })
                  .catch(err => res.status(500).json(err))
                 
              })
          })
      }
  }  

  const getConfig = (req, res) => {
    app.bancoUsuario(app, req.user.id, "D", config => {
      const models = require("../config/models");
      const Config = models(app.knex(config)).Config;

      Config.query(db => {})
      .fetchAll() .then(function({ models } = data) {
        res.send({ data: models[0] });
      })
      .catch(function(err) {
        console.error(err);
      });
    });
  };

  const updateConfig = (req, res) => {
    delete req.body.created_at
    delete req.body.updated_at
    delete req.body.delete_at
      app.bancoUsuario(app, req.user.id, "D", config => {
        app
          .knex(config)("config")
          .update(req.body)
          .then(config => res.json(config))
          .catch(err => res.status(500).json(err.sqlMessage));
      });
  };

    return {
      setImgConfig,
      getConfigImagens,
      deleteImgConfig,
      getConfig,
      updateConfig
    };
};
  