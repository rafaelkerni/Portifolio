import { io } from './index'

io.on('connection', socket => {
    socket.on('connectRoom', id => {
        socket.join(id)
    })
    
    socket.on('welcome',  function(integrar) {
        console.log(integrar);
    })
})