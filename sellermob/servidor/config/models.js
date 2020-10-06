module.exports = (knex) => {
  const bookshelf = require("bookshelf")(knex)
  .plugin("pagination");
  //.plugin('visibility');

  const Grupos = bookshelf.Model.extend({
      tableName: "grupos",
      produtos: function() {
        return this.hasMany(Produtos, 'id', 'grupo_id');
      },
    });

    const Categorias = bookshelf.Model.extend({
      tableName: "categorias",
      grupos: function() {
        return this.hasMany(Grupos, 'id', 'categoria_id');
      },
    });

  const Produtos = bookshelf.Model.extend({
      tableName: "produtos",    
      grupos: function() {
        return this.hasMany(Grupos, 'id', 'grupo_id');
      },
    });

  const Config_Imagens = bookshelf.Model.extend({
      tableName: "config_imagens",    
    });

  const Config = bookshelf.Model.extend({
      tableName: "config",    
    });

  return {
   Grupos,
   Produtos,
   Categorias,
   Config_Imagens,
   Config
  }
};
