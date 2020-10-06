const express = require('express')
const db = require('knex')(require('./knexfile.js'))
const consign = require('consign')
const cron = require("node-cron")
const knex = require('knex');

const app = express()

const server = require('http').Server(app)
const io = require('socket.io')(server)

/* knex().on('query', function(data) {
    console.log(data)
})

db.on('query', function(data) {
    console.log(data)
}) */


io.on('connection', socket => {
    socket.on('connectRoom', id => {
        //console.log('connectRoom');
        socket.join(id)
    })
    
    socket.on('welcome',  function(integrar) {
        console.log(integrar);
    })
})

consign().then('./config/passport.js')
.then('./config/middlewares.js')
.then('./api') 
.then('./config/routes.js')
.into(app)

app.db = db
app.io = io
app.knex = knex;

app.bancoUsuario = require('./config/bancoDados')
app.salvarArquivo = require('./config/salvarArquivo')

server.listen(3525, () =>{
    console.log('Backend executando na porta 3525...')
} )

module.exports = {
    io: io,
    server:server
}

