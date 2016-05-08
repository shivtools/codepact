var express = require('express');
var router = express.Router();
var Statues = require('../models/Statues.js');


/** GET statues endpoint */
router.get('/', function(req, res) {
    var statues = new Statues(req);
    statues.GetStatues(function(err, rows) {
        if (err)
            data = { "status": false, "message": err };
        else
            data = { "status": true, "data": rows };

        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(data));
    });
});


module.exports = router;