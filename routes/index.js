var express = require('express');
var router = express.Router();

/* GET base homepage. */
router.get('/', function(req, res, next) {
    res.render('index');
});

/* FOR ASIMOV */
router.get('/robots.txt', function(req, res, next) {
    res.type('text/plain');
    res.send("User-agent: *\nDisallow: /");
});

module.exports = router;