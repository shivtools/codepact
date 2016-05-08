var express = require('express');
var router = express.Router();
var passport = require('passport');
var GithubStrategy = require('passport-github').Strategy;
var config = require('../configs/config');

var Users = require('../models/Users.js');

var session = require('express-session');
router.use(session({secret: "asdaskldanksld"}));
router.use(passport.initialize());
router.use(passport.session());


passport.serializeUser(function(user, done) {
    console.log("user serial", user);
    done(null, user);
});


passport.deserializeUser(function(user, done) {
    var userClass = new Users();

    var userObj = {
        "user_id": user.id,
        "firstName": user.displayName.split(' ')[0],
        "lastName": user.displayName.split(' ')[1],
        "email": user.emails[0].value,
        "phone": ""
    }

    var githubObj = {
        "user_id": user.id,
        "username": user.username,
        "token": ""
    };

    var currUser = [];

    var userCheck = new Promise(function(resolve, reject) {
        userClass.GetUserProfile({"user_id": userObj.user_id}, function(err, rows) {
            if (rows.length>0) {
                resolve(userObj);
            } else {
                reject(userObj);
            }
        });
    }).then(function(userObj) {
        // registered
        done(null, {"profile": userObj, "github": githubObj});
    }, function(userObj) {
        // not registered
        userClass.RegisterUser({"userObj": userObj, "githubObj": githubObj}, function(err, rows) {
            if (err)
                data = { "status": false, "message": err };
            else
                data = { "status": true, "data": rows };

            done(null, user);
        });
    });
});



passport.use(new GithubStrategy({
    clientID: config.GITHUB_CLIENT_ID,
    clientSecret: config.GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/auth/github/callback"
}, function(accessToken, refreshToken, profile, done) {
    return done(null, profile);
}));



router.get('/auth/github', passport.authenticate('github'));
router.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/' }), function(req, res) {
    console.log("NEW LINK", '/profile/' + req.user.id);
    res.redirect('/profile/' + req.user.id);
});


/* GET base homepage. */
router.get('/profile/:user_id', function(req, res, next) {
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
        res.render('profile', {"user": userObj});
    });
});



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