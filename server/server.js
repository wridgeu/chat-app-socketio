const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);


//add middleware: serve static public dir
app.use(express.static('public'));

//default get request to base route 'http://localhost:3000/'
app.get('/', (req, res) => {
    res.sendFile('public/index.html');
});

//manage socket connection (single connection)
io.on('connection', socket => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('a user disconnected');
    });

    //broadcast message across socket via 'message' command (custom)
    socket.on('message', message => {
        io.emit('message', message);
    });
});

//tell server to listen on port 3000
http.listen(3000, ()=>{
    console.log('listening on port 3000')
});