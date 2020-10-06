const fs = require('fs')
const path = require('path')

module.exports = function (app, idUsuario, id, tipo, callback) {
     app.db('usuarios')
    .where('id', idUsuario)
    .select('empresa_id')
    .first()
    .then(usuario => {
        
        let pasta = 'diversos';
        switch(tipo){
            case 'C':
                pasta = 'categorias';
                break;
            case 'G':
                pasta = 'grupos';
                break;
            case 'P':
                pasta = 'produtos';
                break;
            case 'D':
                pasta = 'diversos';
                break;    
            default:
                pasta = 'diversos'; 
        }
        const dir = `./uploads/${usuario.empresa_id}/${pasta}/${tipo === 'D' ? '' : id}`
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir, { recursive: true })
        } 
        callback(dir)
    })
    .catch(err => console.log(err))
}