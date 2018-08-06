const express = require('express');

var app = express();
const path = require('path');
const port = process.env.PORT || 3000 ;
const publicPath = path.join(__dirname  , '../public');
app.use(express.static(publicPath)); 
 


app.listen(port , () => {
	console.log(`app running on port ${port}`);
});
