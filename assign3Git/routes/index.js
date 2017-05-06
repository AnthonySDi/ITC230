
/*
 * GET home page.
 */

exports.home = function (req, res) {
    res.render('index', { title: 'Sci-fi Books', year: new Date().getFullYear() });
};

exports.about = function (req, res) {
    res.render('about', { title: 'About', year: new Date().getFullYear(), message: 'Your application description page' });
};

exports.details = function (req, res) {
    res.render('Details', { title: 'Details', year: new Date().getFullYear(), message: 'Your contact page' });
};
