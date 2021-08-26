
const port=process.env.PORT || 8001;
const http=require('http');
http.createServer().listen(port);
const io = require('socket.io')(http, {
    cors: {
      origin: '*',
    }
  });
const users={};

io.on('connection',socket => {
    socket.on('new-user-joined',name => {
       console.log(name);
        users[socket.id] = name;
        socket.broadcast.emit('user-joined',name);

    });
    socket.on('send',message=>{
        socket.broadcast.emit('receive',{message:message,name:users[socket.id]})
    });
    socket.on('disconnect',message =>{
      socket.broadcast.emit('left',users[socket.id]);
      delete users[socket.id];
  });
});