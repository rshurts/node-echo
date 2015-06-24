var http = require('http');
var chalk = require('chalk');

const PORT = 7331;

function handleRequest(request, response) {
    try {
        var body = "";
        request.on('data', function (chunk) {
            body += chunk;
        });
        request.on('end', function () {
            console.log(chalk.magenta('Path   : ') + request.url);
            console.log(chalk.magenta('Method : ') + request.method);
            console.log(chalk.magenta('Data   : ') + body);
            console.log();
            response.writeHead(200, { 'Content-Type': 'text/plain' });
            response.end('OK\n');
        });
    } catch(err) {
        console.log(err);
    }
}

var server = http.createServer(handleRequest);

server.listen(PORT, function() {
    console.log("Server listing on http://localhost:%s/", PORT);
});
