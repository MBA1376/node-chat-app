var socket = io();
	socket.on('connect' , function(){
		console.log('connected to the server');
		
		// socket.emit('createEmail' , {
			// to : 'jen@Example.com' , 
			// text : 'Hey . this is mohammad'
		// });
		socket.emit('newMessage' , {
			from : 'jen@Example.com' ,
			text : 'hey. this is jen'
		});
	});
	socket.on('disconnect' , function() {
		console.log('disconnected from the server');
	});
	
	socket.on('newEmail' , function (email) {
		console.log('New Email ' , email);
	});
	
	socket.on('newMessage' , function(newMessage) {
			console.log('new message : ' ,newMessage);
	});
		
	