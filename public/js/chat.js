	var socket = io();
	
	function scrollToButtom () {
		var messages = jQuery('#messages');
		var newMessage = messages.children('li:last-child');
		
		var scrollTop = messages.prop('scrollTop');
		var clientHeight = messages.prop('clientHeight');
		var scrollHeight = messages.prop('scrollHeight');
		var newMessageHeight = newMessage.innerHeight();
		var lastMessageHeight = newMessage.prev().innerHeight();
		
		
		if(scrollTop + clientHeight + newMessageHeight + lastMessageHeight >= scrollHeight) {
			messages.scrollTop(scrollHeight);
		}
		
	}

	socket.on('connect' , function(){
		console.log('connected to the server');
		var params = jQuery.deparam(window.location.search);
		
		socket.emit('join' , params , function(err) {
			if(err){
				alert(err);
				window.location.href = '/';
			}
			else{
				console.log('No error');
			}
		});
	});
	
	socket.on('disconnect' , function() {
		console.log('disconnected from the server');
	});
	
	socket.on('updateUserList' , function(users) {
		console.log('users list',users);
		var ol = jQuery('<o></ol>');
		users.forEach( function(user) {
			ol.append( jQuery('<li></li>').text(user) );
		});
		
		jQuery('#users').html(ol);
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
		scrollToButtom();
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
		
		scrollToButtom();
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
	
	
	