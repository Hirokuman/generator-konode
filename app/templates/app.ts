/// <reference path="./typings/node/node.d.ts" />
/// <reference path="./typings/express/express.d.ts" />

import express = require('express');
import http = require('http');
import path = require('path');

var app = express();

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
    app.get('/', function (req, res) {
        console.log(app.get('env'));
        res.redirect('/dist/index.html');
    });
}

//ajax request
app.post('/json', function (req, res) {
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

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
