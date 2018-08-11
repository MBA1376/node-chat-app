const moment = require('moment');

var timeStamp = moment().valueOf();
var date = moment(timeStamp);

console.log(date.format('h:mm a'));
