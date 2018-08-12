var socket = io();
	socket.on('connect' , function(){
		console.log('connected to the server');
	});
	
	socket.on('disconnect' , function() {
		console.log('disconnected from the server');
	});
	
	socket.on('newEmail' , function (email) {
		console.log('New Email ' , email);
	});
	
	socket.on('newMessage' , function(message) {
		var formattedTime = moment(message.createdAt).format('h:mm a');
		var template = jQuery('#message-template').html();
		var html = Mustache.render(template , {
			from :message.from ,
			text : message.text ,
			createdAt :formattedTime
		});
		
		jQuery('#messages').append(html);
		
	});
	
	socket.on('newLocationMessage' , function(message) {
		var formattedTime = moment(message.createdAt).format('h:mm a');
		var template = jQuery('#location-message-template').html();
		var html = Mustache.render(template , {
			from :message.from ,
			url : message.url ,
			createdAt :formattedTime
		});
		
		jQuery('#messages').append(html);
		
		// var formattedTime = moment(message.createdAt).format('h:mm a');
		// console.log(message);
		// var li = jQuery('<li></li>');
		// var a = jQuery('<a target="_blank">My Current Location</a>');
		
		// li.text(`${message.from} ${formattedTime}: `);
		// a.attr('href' , message.url);
		// li.append(a);
		
		// jQuery('#messages').append(li);
	});
	
	var messageTextBox = jQuery('[name=message]');
	jQuery('#message-form').on('submit' , function (e) {
		e.preventDefault();
		
		socket.emit('createMessage' , {
			from : 'User' ,
			text : messageTextBox.val()
		} , function () {
			messageTextBox.val('');
		});
		
	});
	
	
	var locationButton = jQuery('#send-location');
	
	locationButton.on('click' , function () {
		if(! navigator.geolocation){
			return alert('Geolocation not supported by your browser');
		}
		
		locationButton.attr('disabled' , 'disabled').text('Sending location...');
		
		navigator.geolocation.getCurrentPosition( function (position) {
			locationButton.removeAttr('disabled').text('Send Location');
			socket.emit('createLocationMessage' , {
				latitude : position.coords.latitude ,
				longitude : position.coords.longitude
			});
		}, function () {
			locationButton.removeAttr('disabled').text('Send Location');
			alert('Unable to fetch location');
		});
		
	});
	
	
	