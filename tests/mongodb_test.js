var MongoDB = require("../models/Mongo");
var mongo = new MongoDB();

// inserts an object
// mongo.insert('test_charities', {"name": "test_3", "price": 100}, function(err, results) {
//     if (err)
//         console.log("Error", err);
//     else
//         console.log("Entry Inserted", results);
// });


// finds datasets (send in empty obj to get all records)
// mongo.find('test_charities', {"price": 100}, function(err, results) {
//     if (err)
//         console.log("Error", err);
//     else {
//         results.toArray(function(err, array) {
//             return array;
//         });
//     }
// });


// update a single entry based on search filter
// mongo.updateOne('test_charities', {"name": "test_2"}, {"price": 1337}, function(err, results) {
//     if (err)
//         console.log("Error", err);
//     else {
//         console.log("all good");
//     }
// });


// update many entries based on filter
// mongo.updateMany('test_charities', {"price": 1337}, {"$set": { "price": 20} }, function(err, results) {
//     if (err)
//         console.log("Error", err);
//     else {
//         console.log("all good");
//     }
// });


// delete one entry
// mongo.deleteOne('test_charities', {"price": 20}, function(err, results) {
//     if (err)
//         console.log("Error", err);
//     else {
//         console.log(results);
//     }
// });


// delete multiple entries
// mongo.deleteMany('test_charities', {"price": 100}, function(err, results) {
//     if (err)
//         console.log("Error", err);
//     else {
//         console.log(results);
//     }
// });


// drop entire collection
// mongo.drop('test_charities', function(err, results) {
//     if (err)
//         console.log("Error", err);
//     else {
//         console.log(results);
//     }
// });