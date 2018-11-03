/*
* create and export API router which includes necessary routes
*
*
*/

//dependencies
var handlers = require('./handlers');

//define a router
var router = {
    'hello': handlers.hello,
}


// export the router
module.exports = router;