var MongoDB = require('./Mongo');
var config = require('../configs/config');

var Users = function(req) {
    this.req = req;
    this.mongo = new MongoDB();
}

// GETs user profile
Users.prototype.GetUserProfile = function(params, callback) {
    var userid = params.user_id;

    var user = this.mongo.find('users', {"user_id": userid}, function(err, results) {
        if (err) {
            callback(err, null);
        } else {
            results.toArray(function(err, array) {
                if (err)
                    callback(null, []);
                else
                    callback(null, array);
            });
        }
    });
}

// GETs user github
Users.prototype.GetUserGithub = function(params, callback) {
    var userid = params.user_id;

    var user = this.mongo.find('github', {"user_id": userid}, function(err, results) {
        if (err) {
            callback(err, null);
        } else {
            results.toArray(function(err, array) {
                if (err)
                    callback(null, []);
                else
                    callback(null, array);
            });
        }
    });
}


Users.prototype.RegisterUser = function(params, callback) {
    var userSchema = params;

    var userObj = params.userObj;
    var githubObj = params.githubObj;

    var user = this.mongo.insert('users', userObj, function(err, results) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, {
                "profile": userObj,
                "github": githubObj
            });
        }
    });
}

// GETs user pact
Users.prototype.GetUserPact = function(params, callback) {
    var userid = params.user_id;

    var user = this.mongo.find('pacts', {"user_id": userid}, function(err, results) {
        if (err) {
            callback(err, null);
        } else {
            results.toArray(function(err, array) {
                if (err)
                    callback(null, []);
                else
                    callback(null, array);
            });
        }
    });
}

module.exports = Users;