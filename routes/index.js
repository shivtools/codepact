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
router.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/login' }), function(req, res) {
    console.log(req);
    res.redirect('/profile');
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