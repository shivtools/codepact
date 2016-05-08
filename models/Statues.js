var tokens = require('../configs/tokens');

var Statues = function(req) {
    this.req = req;
}

// GETs all statues (example model)
Statues.prototype.GetStatues = function(callback) {
    // collect statues from twitter
}

module.exports = Statues;