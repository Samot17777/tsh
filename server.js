var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');


var port = process.env.PORT || 8080; 

app.use(express.static(__dirname + '/public')); 

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 




require('./app/routes')(app,__dirname); 



app.listen(port);	
console.log('Magic happens on port ' + port); 			