/*jslint node:true */
/*global require, describe*/
'use strict';
var mongoose = require('mongoose');
var jobModel = require('./models/job');
var Promise = require('bluebird');

var Job = mongoose.model('jobs');

var findJobs = function (query) {
    return Promise.cast(mongoose.model('jobs').find(query).exec());
};

exports.findJobs = findJobs;

exports.connectDB = Promise.promisify(mongoose.connect, {context: mongoose});

var createJob = Promise.promisify(Job.create, {context: Job});

exports.seedJobs = function () {
    return findJobs({}).then(function (collection) {
        if (collection.length === 0) {
            return Promise.map(jobs, function (job) {
                return createJob(job);
            });
        }
    });
};

var jobs = [
    {title: 'Cook', description: 'You will be making bagels.'},
    {title: 'Waiter', description: 'You will be putting food on peoples table.'},
    {title: 'Programmer', description: 'You will be mindlessly typing for hours.'},
    {title: 'Axe Maker', description: 'We need many axes made.. so many..'}
];