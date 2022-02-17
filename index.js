// server side

const io = require('socket.io')(8000, {
    cors:{
        origin:'*',
    }
} )

const users ={};

io.on('connection',(socket) => {
    socket.on('new-user-joined',(name) =>{
        console.log("name",typeof(name))
        users[socket.id]=name;
        socket.broadcast.emit('user-joined',name)
    });

    socket.on('send',(message)=>{
        socket.broadcast.emit('receiver',{usermessage:message,name:users[socket.id]})
    });

    socket.on('disconnect',  name => {

       socket.broadcast.emit('left',users[socket.id]);

    });
})





  
