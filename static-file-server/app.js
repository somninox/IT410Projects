//var commandLineArgs		= require('command-line-args');

var express = require('express');
var path    = require('path');
var app = express();
var port = 8000;

var p;

if(process.argv[2]){
	//p = process.argv[2];

	p = path.resolve(process.cwd(), process.argv[2]);

	console.log('Current path is ' + p);
}

else{
	p = process.cwd();

	console.log('Current path is ' + p);

}

//path directory
app.use(express.static(p));

//console.log("static input: " + __dirname + p);

app.listen(port);
console.log('Server started on port ' + port);

