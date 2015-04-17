/// <reference path="./typings/node/node.d.ts" />
/// <reference path="./typings/express/express.d.ts" /><% if(props.useSocketIO){ %>
/// <reference path="./typings/socketio/socket.io.d.ts" /><% } %>

import express = require('express');
import http = require('http');
import path = require('path');

var app:express.Express = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());

app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());

    app.get('/', function (req, res) {
        console.log(app.get('env'));
        res.redirect('/src/index.html');
    });
}

// production only
if ('production' == app.get('env')) {
    app.get('/', function (req:express.Request, res:express.Response) {
        console.log(app.get('env'));
        res.redirect('/dist/index.html');
    });
}

//ajax request
app.post('/json', function (req:express.Request, res:express.Response) {
    console.log("requested");
    console.log(req.body.name);
    console.log(req.body.input1);

    var dao:SampleDAO = new SampleDAO();
    var json = JSON.parse(dao.getData());

    res.contentType('application/json');
    res.send(JSON.stringify(json));
});

class SampleDAO {
  public getData():string {
    return '{ "foo" : "bar" }';
  }
}

var server:http.Server = http.createServer(app);
server.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
<% if(props.useSocketIO){ %>var socketIO:SocketIO.Server = require('socket.io');
var io:SocketIO.Server = socketIO.listen(server);
io.sockets.on('connection', function(socket) {
  console.log('connected');
  socket.on('message send', function(data) {
    console.log("get message");
    console.log("push message");
    io.sockets.emit('message push', data);
  });
  socket.on('disconnect socket', function(client) {
    console.log('diconnect client:' + client.id);
    (<SocketIO.Socket>io.sockets.connected[client.id]).disconnect();
    delete (<SocketIO.Socket>io.sockets.connected[client.id]);
  });
});<% } %>
