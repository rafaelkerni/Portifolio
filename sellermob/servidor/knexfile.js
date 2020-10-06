module.exports = { 
  client: 'mysql',
  connection: {
      host : '127.0.0.1',
      database: 'aplicacao',
      user: 'root'
  },
  migrations: {
      directory: './migrations/aplicacao',
      tableName: 'migrations'
  },
};
