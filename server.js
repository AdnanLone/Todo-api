var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;

app.get('/', function (req, res) {
	res.send('Hi all this is a TODO API Root');
});

app.listen(PORT, function () {
	console.log('Express listening on PORT ' + PORT + ' !');
})