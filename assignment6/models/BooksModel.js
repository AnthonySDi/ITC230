// BooksModel.js

//var credentials = require("../lib/credentials");


var mongoose = require("mongoose");

// remote db settings 
var options = { server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } } };

mongoose.connect('mongodb://localhost/scifibooks');  //changename to database


var conn = mongoose.connection;
conn.on('error', console.error.bind(console, 'connection error!'));


var scifibooksSchema = mongoose.Schema({
    _id: Number,
    title: String,
    author: String,
    price: String,
},
    { collection: 'scifibookscollection' }
);

module.exports = mongoose.model('scifibooks', scifibooksSchema); 