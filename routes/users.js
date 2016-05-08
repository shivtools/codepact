var express = require('express');
var router = express.Router();
var Users = require('../models/Users.js');


/** GET all users */
router.get('/', function(req, res) {
    var user = new Users(req);

    user.GetProfile(function(err, rows) {
        if (err)
            data = { "status": false, "message": err };
        else
            data = { "status": true, "data": rows };

        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(data));
    });
});


/** GET user profile */
router.get('/:uid', function(req, res) {
    var user = new Users(req);
    var uid = req.params.uid; // gets user id from endpoint

    user.GetProfile(uid, callMeWhenIGetUserProfile);
});


function callMeWhenIGetUserProfile(err, rows) {
    if (err)
        data = { "status": false, "message": err };
    else
        data = { "status": true, "data": rows };

    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(data));
}



module.exports = router;