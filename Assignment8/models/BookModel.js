// JavaScript source code

var mongoose = require("mongoose");

var options = { server: { socketOptions: { KeepAlive: 1, connectTimeoutMS: 30000 } } };

mongoose.connect('mongodb://localhost/scifibooks');

var conn = mongoose.connection;
conn.on('error', console.error.bind(console, 'connection error!'));

var scifibooksSchema = mongoose.Schema({
    title: String,
    author: String,
    price: String,
},
    { collection: 'scifibookscollection' }
);

module.exports = mongoose.model('scifibooks', scifibooksSchema);