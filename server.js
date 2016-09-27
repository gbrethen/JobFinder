/*jslint node:true */
/*global require, describe*/
'use strict';
var express = require('express');
var app = express();

app.set('views', __dirname);
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

app.get('*', function (req, res) {
    res.render('index');
});

app.listen(3000);