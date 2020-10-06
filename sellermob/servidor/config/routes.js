const express = require("express");
const path = require("path");
const passportStatic = require("../config/passportStatic");
const formidableMiddleware = require('express-formidable');
module.exports = app => {
  app

    //.use((req, res, next) => passportStatic(req, res, next))
    .use(
      "/static",
      express.static(path.resolve(path.dirname(__dirname), "uploads"))
    )

  app.post("/signup", app.api.user.save);
  app.post("/signin", app.api.auth.signin);
  
  app
    .route("/grupos/:id?")
    .all(app.config.passport.authenticate())
    .get(app.api.grupos.getGrupos)
    .delete(app.api.grupos.deleteGrupos)
    .post(app.api.grupos.setGrupos)
    .put(app.api.grupos.updateGrupos);
    
  app
    .route("/imagem_grupos/:id?")
    .all(app.config.passport.authenticate())
    .all(formidableMiddleware())
    .post(app.api.grupos.setImgGrupos)

  app
    .route("/categorias/:id?")
    .all(app.config.passport.authenticate())
    .get(app.api.categorias.getCategorias)
    .delete(app.api.categorias.deleteCategorias)
    .post(app.api.categorias.setCategorias)
    .put(app.api.categorias.updateCategorias);
    
  app
    .route("/imagem_categorias/:id?")
    .all(app.config.passport.authenticate())
    .all(formidableMiddleware())
    .post(app.api.categorias.setImgCategorias)  
  
    app
    .route("/config")
    .all(app.config.passport.authenticate())
    .get(app.api.configuracoes.getConfig)
    .post(app.api.configuracoes.updateConfig)  

  app
    .route("/imagem_config/:id?")
    .all(app.config.passport.authenticate())
    .get(app.api.configuracoes.getConfigImagens)
    .delete(app.api.configuracoes.deleteImgConfig)

  app
    .route("/imagem_config/:id?")
    .all(app.config.passport.authenticate())
    .all(formidableMiddleware())
    .post(app.api.configuracoes.setImgConfig)  
  
  app
    .route("/produtos/:id?")
    .all(app.config.passport.authenticate())
    .get(app.api.produtos.getProdutos)
    .delete(app.api.produtos.deleteProdutos)
    .post(app.api.produtos.setProdutos)
    .put(app.api.produtos.updateProdutos);

  app
    .route("/imagem_produtos/:id?")
    .all(app.config.passport.authenticate())
    .all(formidableMiddleware())
    .post(app.api.produtos.setImgProdutos)  

  app
    .route("/pessoas/:id?")
    .all(app.config.passport.authenticate())
    .get(app.api.pessoas.getPessoas)
    .post(app.api.pessoas.setPessoas)
    .delete(app.api.pessoas.deletePessoas)
    .put(app.api.pessoas.updatePessoas);

  app
    .route("/pessoas/:pessoa_id/tipos/:id?")
    .all(app.config.passport.authenticate())
    .post(app.api.pessoas_tipos.setPessoaTipo)
    .delete(app.api.pessoas_tipos.deletePessoaTipo);
};
