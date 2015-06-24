var http = require('http');

const PORT = 7331;

function handleRequest(request, response) {
    try {
        var body = "";
        request.on('data', function (chunk) {
            body += chunk;
        });
        request.on('end', function () {
            console.log('URL: ' + request.url);
            console.log('Data: ' + body);
            response.writeHead(200, { 'Content-Type': 'text/plain' });
            response.end('URL: ' + request.url + 'Data: ' + body);
        });
    } catch(err) {
        console.log(err);
    }
}

var server = http.createServer(handleRequest);

server.listen(PORT, function() {
    console.log("Server listing on http://localhost:%s/", PORT);
});
