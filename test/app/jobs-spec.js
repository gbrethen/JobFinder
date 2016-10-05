/*jslint node:true */
/*global require, describe*/
'use strict';

describe("posting jobs", function () {
    var postRequestJob;
    var newJob = {title: 'new title', description: 'new description'};
    
    beforeEach(module('app'));
    
    it("should call /api/jobs with job data", inject(function ($httpBackend, jobs) {
        $httpBackend.whenPOST("/api/jobs", function (data) {
            expect(JSON.parse(data)).to.not.be.empty;
            return true;
        }).respond(200);
        jobs.save(newJob);
        $httpBackend.flush();
    }));
});