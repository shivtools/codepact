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
router.get('/:user_id', function(req, res) {
    var user = new Users(req);
    var user_id = req.params.user_id;
    var userObj = {};

    var userProfile = new Promise(function(resolve, reject) {
        user.GetUserProfile({"user_id": user_id}, function(err, rows) {
            if (err) {
                reject({ "status": false, "message": err });
            } else {
                userObj['profile'] = (rows.length>0) ? rows[0] : {};
                delete userObj['profile']['_id'];
                resolve('profile');
            }
        });
    });

    var userGithub = new Promise(function(resolve, reject) {
        user.GetUserGithub({"user_id": user_id}, function(err, rows) {
            if (err) {
                reject({ "status": false, "message": err });
            } else {
                userObj['github'] = (rows.length>0) ? rows[0] : {};
                delete userObj['github']['_id'];
                delete userObj['github']['user_id'];
                resolve('github');
            }
        });
    });

    var userPacts = new Promise(function(resolve, reject) {
        user.GetUserPact({"user_id": user_id}, function(err, rows) {
            if (err) {
                reject({ "status": false, "message": err });
            } else {
                userObj['pacts'] = (rows.length>0) ? rows[0] : {};
                delete userObj['pacts']['_id'];
                delete userObj['pacts']['user_id'];
                resolve('pacts');
            }
        });
    });


    Promise.all([userProfile, userGithub, userPacts]).then(function(results) {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(userObj));
    });
});


module.exports = router;