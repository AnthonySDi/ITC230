
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var app = express();
var books = require('./lib/books.js');

// set up handlebars view engine
var handlebars = require('express-handlebars')
    .create({ defaultLayout: 'main' });


// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.use(express.favicon());
app.engine('handlebars', handlebars.engine);
app.set('view engine', '.handlebars');
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('body-parser')());

//form
app.get('/title', function (req, res) {

    //redirect form submission
    res.render('titles', { csrf: 'CSRF token goes here' });
});
app.post('/process', function (req, res) {
    console.log('Title (from visible form field): ' + req.body.title);
    res.redirect(303, '/about');
});



// development only
//if ('development' == app.get('env')) {
//    app.use(express.errorHandler());
//}

//app.get('/', routes.home);
app.get('/about', routes.about);
app.get('/contact', routes.details);

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

app.get('/', function (req, res) {
    res.render('home', { Books: books.getAllBooks() });
});


app.get('/about', function (req, res) {
    res.render('about', {
        Title: scifibooks.title,
        Author: scifibooks.author,
        Price: scifibooks.price
    });
});

//get object
//app.get('/get', function (req, res) {
//    var item = books.get(req.query.title)
//    if (item) {
//        res.send("Looking for a book called " + req.query.title + "\n" + JSON.stringify(item));
//    } else {
//        res.send("item not found");
//    }
//});
app.get('/get/:title', function (req, res) {
    res.type('text/html');
    var found = books.get(req.params.title);
    if (!found) {
        found = { title: req.params.title };
    }
    res.render('Details', { title: req.params.title, item: found })    
});

app.post('/get', function (req, res) {
    var item = books.get(req.body.title)
    res.render('Details', { title: req.body.title, item: item });

});

//delete object
app.get('/delete', function (req, res) {
    var result = books.delete(req.query.title)
    console.log(result)
    //res.send("Deleted book (Why would you do that? Don't you like our books?) " + req.query.title + "\n" + JSON.stringify(result));
    res.render('delete', { title: req.query.title, result: result });
});

app.post('/add', function (req, res) {
    res.type('text/html');
    let totalBook = { title: req.body.title, author: req.body.author, price: req.body.price };
    let item = books.add(totalBook);
    res.render('Details', { title: req.body.title, item: totalBook });
});

// 404 handler
app.use(function (req, res, next) {
    res.status(404);
    res.render('404');
});
// 500 handler
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500);
    res.render('500');
});