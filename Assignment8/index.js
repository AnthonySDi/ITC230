// JavaScript source code

let express = require("express");
let bodyParser = require("body-parser");
let books = require("./models/BookModel.js");

let app = express();

app.set('port', process.env.port || 3000);
app.use(express.static(__dirname + '/..public'));
app.use(bodyParser.urlencoded({ extened: true }));
app.use(bodyParser.json());
app.use('/api', require("cors")());
app.use((err, req, res, next) => {console.log(err);
});

let handlebars = require("express-handlebars");
app.engine(".html", handlebars({ extname: '.html', defaultLayout: 'main' }));
app.set("view engine", ".html");

app.get('/', (req, res) => {
    books.find((err, books) => {
    if (err) return (err);
    res.render('home', { books: JSON.stringify(books) });
    })
});

app.get('/about', (req, res) => {
    res.type('text/html');
    res.render('about');
});

// the damned api
app.get('/api/books/:title', (req, res) => {
    let title = req.params.title;
    console.log(title);
    books.findOne({ Title: title }, (err, result) => {
        if (err || !result) return (err);
        res.json(result)
    });
});

app.get('/api/books', (req, res) => {
    books.find((err, results) => {
        if (err) return (err);
        res.json({ "deleted": result.result.n });
    });
});

app.post('/api/add/', (req,res, next) => {
    if (!req.body._id) {
        let book = new book({title: req.body.title, author:req.body.author, price: req.body.price});
        book.save((err,newBook) => {
            if (err) return next(err);
            console.log(newBook)
            res.json({updated: 0, _id: newBook._id});
        });
    } else { 
        books.updateOne({ _id: req.body._id}, {title:req.body.title, author: req.body.author, price: req.body.price }, {upsert: true }, (err, result) => {
            if (err) return next(err);
            res.json({updated: result.nModified, _id: req.body._id});
        });
    }
});

app.get('/api/add/:title/:author/:price', (req, res, next) => {
    let title = req.params.title;
    books.update({ title: title }, { title: title, author: req.params.author, price: req.params.price }, { upsert: true }, (err, result) => {
        if (err) return next(err);
        res.json({ updated: result.nModified })
    });
});

app.use((req, res) => {
    res.type('text/plain');
    res.status(404);
    res.send('404 - not found');
});

app.listen(app.get('port'), () => {
    console.log('express started, press control C to esc');
});