var express = require('express');
var router = express.Router();

/* GET base homepage. */
router.get('/', function(req, res, next) {
    res.render('setup');
});

module.exports = router;