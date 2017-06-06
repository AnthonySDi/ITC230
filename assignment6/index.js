
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var app = express();
//var books = require('./lib/books.js');
var books = require('./models/BooksModel.js');


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
//app.post('/process', function (req, res) {
//    console.log('Title (from visible form field): ' + req.body.title);
//    res.redirect(303, '/details');
//});


app.get('/about', routes.about);
app.get('/contact', routes.details);

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

app.get('/', function (req, res) {
//    to list all books on the main page.
    books.find({}, function (err, items) {
        if (err) return next(err);
        res.render('home', { Books: items });
        // other code here if needed 
    });
});



//get object
app.get('/get', function (req, res, next) { 

    books.findOne({ title: req.query.title, item: item }, (err, book) => {
        if (err) return next(err);
        res.type('text/html');
        res.render('details', { title: req.body.title, item: item });
    });

});

app.post('/get', function (req,res, next) {
// to find a single damned book. 

    books.findOne({ title: req.body.title }, (err, book) => {
        if (err) return next(err);
        res.type('text/html');  
        res.render('details', { title: req.body.title, book });
    });
    //console.log(req.body);
});

//delete object
app.get('/delete', function (req, res) {
    books.remove({ title: req.query.title }, (err, result) => {
        console.log(req.query.title);
        if (err) return next(err);
        let deleted = result.result.n !== 0; // n will be 0 if no docs deleted
        books.count((err, total) => {
            res.type('text/html');
            res.render('delete', { title: req.query.title, deleted: result.result.n !== 0, total: total });
        });
    });

    //var result = books.delete(req.query.title)
    //console.log(result)
   
    //res.render('delete', { title: req.query.title, result: result });
});

app.post('/add', function (req, res) {
    books.insert({ "title": req.body.title, "author": req.body.author, "price" : req.body.price }, (err, result) => {
        if (err) return next(err);
        let added = result.result.n !== 0; // n will be 0 if no docs deleted
        Book.count((err, total) => {
            res.type('text/html');
            res.render('Add', { result, total: total });
        });
    }); 

    //var result = books.delete(req.query.title)
    //console.log(result)

    //res.render('delete', { title: req.query.title, result: result });
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