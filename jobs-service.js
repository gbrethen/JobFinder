/*jslint node:true */
/*global require, describe*/
'use strict';
var bodyParser = require("body-parser");

module.exports = function (db, app) {
    app.use(bodyParser.json());
    
    app.get('/api/jobs', function (req, res) {
        db.findJobs().then(function (collection) {
            res.header('Access-Control-Allow-Origin', '*');
            res.send(collection);
        });
    });
    
    app.post("/api/jobs", function (req, res) {
        res.header('Access-Control-Allow-Origin', '*');
        db.saveJob(req.body);
        res.end();

    });
    
    app.get("/api/jobs/:id", function (req, res) {
        res.header('Access-Control-Allow-Origin', '*');
        db.deleteJob({_id: req.params.id});
        res.redirect('/');

    });
};