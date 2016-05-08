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

router.get('/profile', function(req, res, next){
	res.render('profile');
})

module.exports = router;