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
	
	
	
	// socket.emit('newMessage' , {
		// from : 'mohammad@Example.com' , 
		// text : 'hey. this is mohammad' ,
		// creadtedAt : new Date()
	// });
	socket.emit('newMessage' , {
		from : 'Admin' ,
		text : 'welcome to the chat page' ,
		createdAt : new Date().getTime()
	});
	
	socket.broadcast.emit('newMessage' , {
		from : 'Admin' ,
		text : 'new user joined' ,
		createdAt : new Date().getTime()
	});
	
	socket.on('newMessage' , (newMessage) => {
		console.log('newMessage ', newMessage);
		
		io.emit('newMessage' , {
			from :  newMessage.from ,
			text : newMessage.text , 
			createdAt : new Date().getTime()
		});
	});
	
	socket.on('disconnect' , () => {
		console.log('user was disconnected');
	});
});

server.listen(port , () => {
	console.log(`server is up on ${port}`);
});
