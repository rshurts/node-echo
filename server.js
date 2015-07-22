var http = require('http');
var chalk = require('chalk');

function setPort () {
    var args = process.argv.slice(2);
    if (args[0] === "--port" && args[1]) {
        return args[1];
    } else {
        return 7331;
    }
}

function handleRequest (request, response) {
    try {
        var body = "";
        request.on('data', function (chunk) {
            body += chunk;
        });
        request.on('end', function () {
            console.log(chalk.magenta('Time   : ') + new Date());
            console.log(chalk.magenta('Path   : ') + request.url);
            console.log(chalk.magenta('Method : ') + request.method);
            console.log(chalk.magenta('Header : ') + JSON.stringify(request.headers));
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

var port = setPort();

server.listen(port, function () {
    console.log("Server listing on http://localhost:%s/", port);
});
