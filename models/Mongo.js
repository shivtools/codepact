var config = require('../configs/config');
var MongoClient = require('mongodb').MongoClient;

/** MongoDB class */
var MongoDB = function() {
    this.connectionUrl = config.CONNECTION_URL;
    this.MongoClient = MongoClient;
};

/**
 * insert() inserts an object into a collection
 *
 * @param {String} collection
 * @param {Object} insertObj
 * @param {Function} callback
 */
MongoDB.prototype.insert = function(collection, insertObj, callback) {
    this.MongoClient.connect(this.connectionUrl, function(err, db) {
        if (err) {
            callback(err, null);
        } else {
            db.collection(collection).insertOne(insertObj, function(err, results) {
                if (err)
                    callback(err, results);
                else
                    callback(null, results);
            });
        }
    });
};

/**
 * find() inserts an object into a collection
 *
 * @param {String} collection
 * @param {Object} findObj
 * @param {Function} callback
 */
MongoDB.prototype.find = function(collection, findObj, callback) {
    this.MongoClient.connect(this.connectionUrl, function(err, db) {
        if (err) {
            callback(err, null);
        } else {
            var cursor = db.collection(collection).find(findObj);
            callback(null, cursor);
        }
    });
};

/**
 * updateOne() updates a single object (first one found in dataset)
 *
 * @param {String} collection
 * @param {Object} findObj
 * @param {Object} setObj
 * @param {Function} callback
 */
MongoDB.prototype.updateOne = function(collection, updateObj, setObj, callback) {
    this.MongoClient.connect(this.connectionUrl, function(err, db) {
        if (err) {
            callback(err, null);
        } else {
            db.collection(collection).updateOne(updateObj, setObj, function(err, results) {
                if (err)
                    callback(err, results);
                else
                    callback(null, results);
            });
        }
    });
}

/**
 * updateMany() updates all objects found in search dataset
 *
 * @param {String} collection
 * @param {Object} findObj
 * @param {Object} setObj
 * @param {Function} callback
 */
MongoDB.prototype.updateMany = function(collection, updateObj, setObj, callback) {
    this.MongoClient.connect(this.connectionUrl, function(err, db) {
        if (err) {
            callback(err, null);
        } else {
            db.collection(collection).updateMany(updateObj, setObj, function(err, results) {
                if (err)
                    callback(err, results);
                else
                    callback(null, results);
            });
        }
    });
}

/**
 * deleteOne() deletes the first item found matching filter dataset
 *
 * @param {String} collection
 * @param {Object} delObj
 * @param {Function} callback
 */
MongoDB.prototype.deleteOne = function(collection, delObj, callback) {
    this.MongoClient.connect(this.connectionUrl, function(err, db) {
        if (err) {
            callback(err, null);
        } else {
            db.collection(collection).deleteOne(delObj, function(err, results) {
                if (err)
                    callback(err, results);
                else
                    callback(null, results);
            });
        }
    });
}

/**
 * deleteMany() deletes all items found matching filter dataset
 *
 * @param {String} collection
 * @param {Object} delObj
 * @param {Function} callback
 */
MongoDB.prototype.deleteMany = function(collection, delObj, callback) {
    this.MongoClient.connect(this.connectionUrl, function(err, db) {
        if (err) {
            callback(err, null);
        } else {
            db.collection(collection).deleteMany(delObj, function(err, results) {
                if (err)
                    callback(err, results);
                else
                    callback(null, results);
            });
        }
    });
}

/**
 * drop() drops a collection
 *
 * @param {String} collection
 * @param {Function} callback
 */
MongoDB.prototype.drop = function(collection, callback) {
    this.MongoClient.connect(this.connectionUrl, function(err, db) {
        if (err) {
            callback(err, null);
        } else {
            db.collection(collection).drop(function(err, results) {
                if (err)
                    callback(err, results);
                else
                    callback(null, results);
            });
        }
    });
}

module.exports = MongoDB;