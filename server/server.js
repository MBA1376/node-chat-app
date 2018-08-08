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
	
	// socket.emit('newEmail' , {
		// from : 'mohammad@Example.com' ,
		// text : 'Hey. how\'d you do' ,
		// createdAt : 123
	// });
	
	// socket.on('createEmail' , (newEmail) => {
		// console.log('createEmail',newEmail);
	// });
	
	socket.emit('newMessage' , {
		from : 'mohammad@Example.com' , 
		text : 'hey. this is mohammad' ,
		creadtedAt : new Date()
	});
	
	socket.on('newMessage' , (newMessage) => {
		console.log('newMessage ', newMessage);
	});
	
	socket.on('disconnect' , () => {
		console.log('user was disconnected');
	});
});

server.listen(port , () => {
	console.log(`server is up on ${port}`);
});
