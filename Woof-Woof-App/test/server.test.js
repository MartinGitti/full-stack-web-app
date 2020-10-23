const express = require('express');
const app = express();

// Run server on Port 8080:
app.get('/', function (req, res) {
    res.status(200).send('ok');
});
var server = app.listen(8080, function () {
    var port = server.address().port;
    console.log('Server is listening and running at port %s', port);
});

module.exports = server;

