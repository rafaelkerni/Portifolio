module.exports = (req, res, next) => {
        
        if ( req.path !== '/static') return next();
        return app
          .db("usuarios")
          .select("empresa_id")
          .where({ id: req.user.id })
          .first()
          .then(usuario => {
            let route = req.originalUrl.replace("/static/", "");
            route = route.split('/').shift()
            if(`${usuario.empresa_id}` == route){
              return next();
            }else{
              return res.status(400).json('Unauthorized')
            }
          })
          .catch(err => res.status(400).json('Unauthorized'))
}