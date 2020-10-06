module.exports = app => {
  const setPessoaTipo = (req, res) => {
    const { pessoa_id } = req.params;
    const { tipo_id } = req.body;

    if (tipo_id) {
      app.bancoUsuario(app, req.user.id, "D", async config => {
        const db = app.knex(config);

        try {
          await db("pessoa_tipos").insert({ pessoa_id, tipo_id });
        } catch (err) {
          return res.status(500).send(err);
        }
        res.status(201).send();
      });
    } else {
      res.status(400).send("É necessário enviar o ID do tipo!");
    }
  };

  const deletePessoaTipo = (req, res) => {
    const { pessoa_id, id: tipo_id } = req.params;
    if (tipo_id) {
      app.bancoUsuario(app, req.user.id, "D", async config => {
        const db = app.knex(config);

        try {
          await db("pessoa_tipos")
            .where({ pessoa_id, tipo_id })
            .del();
        } catch (err) {
          return res.status(500).send(err);
        }
        res.status(200).send();
      });
    } else {
      res.status(400).send("É necessário enviar o ID do tipo!");
    }
  };

  return {
    setPessoaTipo,
    deletePessoaTipo
  };
};
