// JavaScript source code
var http = require('http'),
	fs = require('fs'),
	qs = require("querystring");



let scifibooks = require('./lib/books.js');


function serveStaticFile(res, path, contentType, responseCode) {
    if (!responseCode) responseCode = 200;
    fs.readFile(__dirname + path, function (err, data) {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('500 - Internal Error');
        } else {
            res.writeHead(responseCode,
				{ 'Content-Type': contentType });
            res.end(data);
        }
    });
}

http.createServer(function (req, res) {
    // normalize url by removing querystring, optional
    // trailing slash, and making lowercase
    var path = req.url.replace(/\/?(?:\?.*)?$/, '')
		.toLowerCase();
    var url = req.url.split("?"),
        params = qs.parse(url[1]);
    switch (path) {
        case '':
            serveStaticFile(res, '/public/home.html', 'text/html');
            break;
        case '/about':
            serveStaticFile(res, '/public/about.html', 'text/html');
            break;
        case '/search':
            serveStaticFile(res, '/public/search', 'text/html');
            break;
        //case '/add':
        //    serveStaticFile(res, '/public/add', 'text/html');
            //    break;
        case '/get':
                
            let found = scifibooks.get(params.title);
           
            res.writeHead(200, { 'content-type': 'text/plain' });
            let results = (found) ? JSON.stringify(found) : "Not found";
            res.end('results for ' + params.title + "..............." + results);
            break;
        case '/delete':
            res.writeHead(200, { 'content-Type': 'text/plain' });
            res.end('delete');
            //serveStaticFile(res, '/public/delete', 'text/html');
            break;
        case '/img/logo.jpg':
            serveStaticFile(res, '/public/img/logo.jpg',
				'image/jpeg');
            break;
        default:
            serveStaticFile(res, '/public/404.html', 'text/html',
				404);
            break;
    }
}).listen(3000);

console.log('Server started on localhost:3000; press Ctrl-C to terminate....');