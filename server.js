/*jslint node:true */
/*global require, describe*/
'use strict';
var express = require('express');
var mongoose = require('mongoose');
var jobModel = require('./models/job');

var app = express();
var port = process.env.PORT || 3000;

app.set('views', __dirname);
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

app.get('/api/jobs', function (req, res) {
    mongoose.model('jobs').find({}).exec(function (err, collection) {
        res.send(collection);
    });
});

app.get('*', function (req, res) {
    res.render('index');
});

//mongoose.connect('mongodb://localhost/jobfinder');
mongoose.connect('mongodb://gbrethen:BrAnDoN9991@ds041516.mlab.com:41516/jobfinder_gb')

var con = mongoose.connection;

con.once('open', function () {
    console.log('connected to mongodb successfully!');
    jobModel.seedJobs();
});

app.listen(port);