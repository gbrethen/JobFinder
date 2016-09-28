/*jslint node:true */
/*global require, describe*/
'use strict';
var express = require('express');
var jobModel = require('./models/job');
var jobsData = require('./jobs-data');

var app = express();
var port = process.env.PORT || 3000;

app.set('views', __dirname);
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

app.get('/api/jobs', function (req, res) {
    jobsData.findJobs().then(function (collection) {
        res.header('Access-Control-Allow-Origin', '*');
        res.send(collection);
    });
});

app.get('*', function (req, res) {
    res.render('index');
});

//mongoose.connect('mongodb://localhost/jobfinder');
jobsData.connectDB('mongodb://gbrethen:BrAnDoN9991@ds041516.mlab.com:41516/jobfinder_gb')
    .then(function () {
        console.log('connected to mongodb successfully!');
        jobModel.seedJobs();
    });


app.listen(port);