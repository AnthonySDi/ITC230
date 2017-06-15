var Book = require("../models/book");

// insert a new document into the database
//new Book({title:"dune", author:"frank herbert", amount: 10, pubdate: "05-21-1969"}).save();
new Book({ title: "dune", author: "frank herbert", price: 10.00}).save();
new Book({ title: "book of the new sun", author: "gene wolfe", price: 13.97 }).save();
new Book({ title: "the moon is a harsh mistress", author: "robert heinlein", price: 12.61 }).save();
new Book({ title: "the dispossessed", author: "ursula leguin", price: 4.86 }).save();
new Book({ title: "hyperion", author: "dan simmons", price: 6.82 }).save();
new Book({ title: "the stars my destination", author: "alfred bester", price: 7.12 }).save();
new Book({ title: "the man in the high castle", author: "philip dick", price: 3.70 }).save();
new Book({ title: "use of weapons", author: "lain banks", price: 11.76 }).save();


Book.count((err, result) => {
    console.log(result);
});

// find all documents 
Book.find((err, result) => {
    // output error if one occurred
    if (err) {
        console.log(err);
    } else {
        // otherwise output the array of documents
        console.log(result);
    }
});

