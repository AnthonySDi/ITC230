
/*
 * GET home page.
 */

exports.home = function (req, res) {
    res.render('Home', { title: 'Sci-fi Books', year: new Date().getFullYear()});
};

exports.about = function (req, res) {
    res.render('about', { title: 'About', year: new Date().getFullYear(), message: 'Your application description page' });
};

exports.details = function (req, res) {
    res.render('Details', { title: 'Details', year: new Date().getFullYear(), message: 'Your contact page' });
};

exports.delete = function (req, res) {
    res.render('Delete', { title: req.body.title, year: new Date().getFullYear(), message: 'Your Delete page' });
};