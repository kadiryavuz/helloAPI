/*
* create and export API handlers
*
*
*/

//define the handlers
var handlers = {};

handlers.hello = (data, callback) => {
    callback(200, { 'message': 'Hello! Homework Assignment 1'});
}

handlers.notFound = (data, callback) => {

    callback(404, { 'message': 'The route you requested is not valid!'});
}

//exporting handlers
module.exports = handlers;