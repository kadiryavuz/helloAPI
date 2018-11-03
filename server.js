/*
* create and export the generic server object
* which handles both http and https
*
*/

//dependencies
var url = require('url');
var StringDecoder = require('string_decoder').StringDecoder;
var handlers = require('./handlers');
var router = require('./router');

// module object
var genServer = {};

//instantiating the generic server object
genServer.combinedServer = (request, response) => {
    //get the url and parse it
    var parsedUrl = url.parse(request.url, true);

    //get the path
    var path = parsedUrl.pathname;
    var trimmedPath = path.replace(/^\/+|\/+$/g, '');

    //get the query string

    var queryString = parsedUrl.query;

    //get the http method
    var method = request.method.toLowerCase();

    //get the headers as a object
    var headers = request.headers;

    //get the payload if there is any
    var decoderVal = new StringDecoder('utf-8');
    var buffer = '';
    request.on('data', (data) => {
        buffer += decoderVal.write(data);
    })

    request.on('end', () => {
        buffer += decoderVal.end();


        //choose the handler that this request is supposed to be handled
        //if not found, then notFound handler handles it

        var finalHandler = (typeof (router[trimmedPath]) === 'undefined') ? handlers.notFound : router[trimmedPath];

        //construct the data to be sent to handler
        var data = {
            'path': trimmedPath,
            'queryString': queryString,
            'method': method,
            'headers': headers,
            'payload': buffer,
        }

        //call to chosen handler
        finalHandler(data, (statusCode, payload) => {
            statusCode = typeof (statusCode) == 'number' ? statusCode : 200;
            payload = typeof (payload) == 'object' ? payload : {};

            //convert the payload to string
            var payloadString = JSON.stringify(payload);

            response.setHeader('Content-Type', 'application/json');
            response.writeHead(statusCode);
            response.end(payloadString);

            //log the parse info from url
            // console.log('Request received on path: ' + path + ' with method: ' + method + ' with queryString: ', queryString);
            // console.log('request received with headers', headers);
            // console.log('request received with payload ', buffer);
            console.log('returning this response ', statusCode, payloadString);
        });


    })
};

module.exports = genServer;