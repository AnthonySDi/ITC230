// JavaScript source code
// taking form the site http://anthonydevelopedthis.com/ITC240/Pages/books.php

let scifibooks = [{ Title: "Dune", Author: "Frank Herbert", Price: 8.00 },
    { Title: "book of the new sun", Author: "gene wolfe", Price: 13.97 },
    { Title: "the moon is a harsh mistress", Author: "robert heinlein", Price: 12.61 },
    { Title: "the dispossessed", Author: "ursula leguin", Price: 4.86 },
    { Title: "hyperion", Author: "dan simmons", Price: 6.82 },
    { Title: "neuromancer", Author: "william gibson", Price: 7.99 },
    { Title: "the stars my destination", Author: "alfred bester", Price: 7.12 },
    { Title: "the man in the high castle", Author: "philip dick", Price: 3.70 },
    { Title: "use of weapons", Author: "lain banks", Price: 11.76 },
    { Title: "the foundation trilogy", Author: "isaac asimov", Price: 7.19 },
    { Title: "2001: a space odyssey", Author: "arthur clarke", Price: 5.82 },
    { Title: "the forever war", Author: "joe haldeman", Price: 10.87 },
    { Title: "red mars", Author: "kim stanley", Price: 7.99 },
    { Title: "brave new world", Author: "aldous huxley", Price: 2.98 },
    { Title: "a fire upon the deep", Author: "vernor vinge", Price: 7.79 },
    { Title: "solaris", Author: "stanislaw lem", Price: 3.94 },
    { Title: "falling free", Author: "lois mcmaster bujold", Price: .49 },
    { Title: "the time machine", Author: "h.g. wells", Price: .68 },
    { Title: "bring the jubilee", Author: "ward moore", Price: 5.72 },
    { Title: "the martian chronicles", Author: "ray bradbury", Price: 2.28 }];

let get = (Title) => {
    return scifibooks.find((item) => {
        return item.Title == Title;
    });
}