var mongoose = require('mongoose');

var mongodbUri = 'mongodb://shivtools:SINO007@ds017432.mlab.com:17432/codepact';

mongoose.connect(mongodbUri);

module.exports = mongoose;