/*jslint node:true */
/*global require, describe*/
'use strict';
var mongoose = require('mongoose');

var jobSchema = mongoose.Schema({
    title: {type: String},
    description: {type: String}
});

mongoose.model('jobs', jobSchema);
