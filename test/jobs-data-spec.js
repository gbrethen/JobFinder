/*jslint node:true */
/*global require, describe, it*/
'use strict';
var expect = require('chai').expect;
var mongoose = require('mongoose');
var jobModel = require('../models/job');
var Promise = require('bluebird');
var jobsData = require('../jobs-data');

function resetJobs() {
    return new Promise(function (resolve, reject) {
        mongoose.connection.collections['jobs'].drop(resolve, reject);
    });
}

describe("get jobs", function () {
    
    var jobs;
    
    before(function (done) {
        jobsData.connectDB('mongodb://gbrethen:BrAnDoN9991@ds041516.mlab.com:41516/jobfinder_gb')
            .then(resetJobs)
            .then(jobsData.seedJobs)
            .then(jobsData.findJobs)
            .then(function (collection) {
                jobs = collection;
                done();
            });
    });
    
    it("should never be empty since jobs are seeded", function () {
        expect(jobs.length).to.be.at.least(1);
    });
    
    it("should have a job with a title", function () {
        expect(jobs[0].title).to.not.be.empty;
    });
    
    it("should have a job with a description", function () {
        expect(jobs[0].description).to.not.be.empty;
    });
});