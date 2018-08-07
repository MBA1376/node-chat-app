const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
var app = express();
var server = http.createServer(app);

const port = process.env.PORT || 3000 ;
const publicPath = path.join(__dirname  , '../public');
app.use(express.static(publicPath)); 
 
var io = socketIO(server);

io.on('connection' , (socket) => {
	console.log('new user connected');
	
	socket.on('disconnect' , () => {
		console.log('user was disconnected');
	});
});

server.listen(port , () => {
	console.log(`server is up on ${port}`);
});
