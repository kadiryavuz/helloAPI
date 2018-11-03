/*
* entry point for helloAPI 
* 
* author: kadir yavuz
* pirple account: kadir.yavuz@outlook.com
* fb account: k_kadiryavuz_y@hotmail.com
*
*/

//Dependencies
var http = require('http');
var https = require('https');
var serverVal = require('./server');
var config = require('./config');
var fs = require('fs');

// define the HTTP server
var httpServer = http.createServer((request, response) => {
    serverVal.combinedServer(request, response);
});

// start the HTTP server
httpServer.listen(config.httpPort, () => {
    console.log("The server is listening on port " + config.httpPort + " now in mode: " + config.envName);
})

// define the HTTPS server
var httpsServerOptions = {
    'key': fs.readFileSync('./https/key.pem'),
    'cert': fs.readFileSync('./https/cert.pem'),
};
var httpsServer = https.createServer(httpsServerOptions, (request, response) => {
    serverVal.combinedServer(request, response);
});

// start the HTTPS server
httpsServer.listen(config.httpsPort, () => {
    console.log("The server is listening on port " + config.httpsPort + " now in mode: " + config.envName);
})

//unified server to support http and https
