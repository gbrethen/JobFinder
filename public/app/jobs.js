/*jslint node:true */
/*global require, describe*/
'use strict';
app.factory('jobs', ['$resource', function ($resource) {
    return $resource('/api/jobs');
}]);