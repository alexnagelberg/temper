(function () {
	var config = require('./config.js');
	var http = require('http');
	var fs = require('fs');
	http.createServer (function (req, res) {
		fs.readFile(config.inputFile, function (err, data) {
			if (err) {
				res.writeHead(500, {'Content-Type': 'text/plain'});
				res.end('Error reading temperature data\n');
			} else {
				var temperatureModel = JSON.parse(data);
				var date = new Date(temperatureModel.time*1000);
				var unitAbbr = temperatureModel.unit === 'fahrenheit' ? 'F' : 'C';
				// TODO: stylize!
				res.writeHead(200, {'Content-Type': 'text/plain'});
				res.end(temperatureModel.temperature + unitAbbr + ' as of ' + date + '\n');
			}
		});
	}).listen(8083);
}());
