// imports
var path = require('path');
var geolib = require('geolib');
var express = require('express');
var bodyParser = require('body-parser');

// initial setups
var app = express();

// directories
var pagesDir = 'pages';

// returns the main page
app.get('/', function(req, res) {
  res.type('html').sendFile(path.resolve(pagesDir+'/index.html'));
});

// REST
var jsonParser = bodyParser.json();
app.use('/js', express.static(pagesDir+'/js'));

app.post('/api/geo/distance/', jsonParser, function(req, res) {
  // returnin data
  var status = 200;
  var body = {};

  if (req.body) { 
    // incoming data
    var from = req.body.from;
    var to = req.body.to;
    console.log(req.body);
    if (!from || !to) {
      status = 400; // bad request
      body = { error: "Incomplete data." };
    } else {
      try {
        console.log(from, to);
        body = { distance: geolib.getDistance(from, to) };
      } catch (exception) {
        status = 400;
        body = { error: "Invalid data. "+exception.message };
      }
    }
  } else {
    status = 400;
    body = {error: "Uh oh... something weird happened, please try again after few minutes.." };
  }

  res.type('json').send(body);
});

app.listen(8080);
