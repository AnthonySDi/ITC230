// JavaScript source code
// taking form the site http://anthonydevelopedthis.com/ITC240/Pages/books.php

let scifibooks = [{ title: "dune", author: "Frank Herbert", price: 8.00 },
    { title: "book of the new sun", author: "gene wolfe", price: 13.97 },
    { title: "the moon is a harsh mistress", author: "robert heinlein", price: 12.61 },
    { title: "the dispossessed", author: "ursula leguin", price: 4.86 },
    { title: "hyperion", author: "dan simmons", price: 6.82 },
    { title: "neuromancer", author: "william gibson", price: 7.99 },
    { title: "the stars my destination", author: "alfred bester", price: 7.12 },
    { title: "the man in the high castle", author: "philip dick", price: 3.70 },
    { title: "use of weapons", author: "lain banks", price: 11.76 },
    { title: "the foundation trilogy", author: "isaac asimov", price: 7.19 },
    { title: "2001: a space odyssey", author: "arthur clarke", price: 5.82 },
    { title: "the forever war", author: "joe haldeman", price: 10.87 },
    { title: "red mars", author: "kim stanley", price: 7.99 },
    { title: "brave new world", author: "aldous huxley", price: 2.98 },
    { title: "a fire upon the deep", author: "vernor vinge", price: 7.79 },
    { title: "solaris", author: "stanislaw lem", price: 3.94 },
    { title: "falling free", author: "lois mcmaster bujold", price: .49 },
    { title: "the time machine", author: "h.g. wells", price: .68 },
    { title: "bring the jubilee", author: "ward moore", price: 5.72 },
    { title: "the martian chronicles", author: "ray bradbury", price: 2.28 }];


exports.get = (title) => {
    return scifibooks.find((item) => {
        return item.title == title;
    }); 
}
exports.getAllBooks = () => {
    return scifibooks;
}
exports.delete = (title) => {
    let oldLength = scifibooks.length;
    scifibooks = scifibooks.filter((item) => {
        return item.title !== title;
    });
 //   var deleted = (scifibooks.length == oldLength) ? "" : 'deleted';
    return { "deleted": scifibooks.length !== oldLength, "total": scifibooks.length };
   
    };

exports.add = (title) => {
    const oldLength = scifibooks.length;
    // use existing get() method to check if book already in our list
    let found = this.get(scifibooks.title);
    if (!found) {
        scifibooks.push(title);
    }
    // if old & new array lengths differ, item was added
    return { added: oldLength !== scifibooks.length, total: scifibooks.length };
};
