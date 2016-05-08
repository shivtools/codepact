//var db = require('mongodb'); // get mongo connection here (fix this)

var Users = function(req) {
    this.req = req;
}

// GETs user profile (example model)
Users.prototype.GetProfile = function(uid, callback) {
    // collect user profile from mongodb
    var user = db.users.find({"uid": uid});

    if (users.length == 0) {
        callback("no users exist", null);
    } else {
        callback(null, user);
    }
}

module.exports = Users;