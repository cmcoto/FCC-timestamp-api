// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// Time now try1
app.get("/now", function(req, res) {
  var time = new Date().getTime();
  var utc = new Date().toString();
  console.log('time'+time );
  res.json({'unix': time, 'utc': utc});
});

//TIME stamp API
app.get("/api/timestamp/:date_string", function(req, res) {
  var date_string = req.params.date_string;
  
  var dateFormattingOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }; 
  if (isNaN(date_string)){
    var naturalDate = new Date(date_string);
    naturalDate = naturalDate.toString("en-us", dateFormattingOptions);
    var unixDate = new Date(date_string).getTime()/1000;
  } else {
    var unixDate = date_string;
    var naturalDate = new Date(date_string * 1000);
    naturalDate = naturalDate.toString("en-us", dateFormattingOptions);
  };
  
  //var time = new Date().getTime();
  //var utc = new Date().toString();
  //console.log('time'+ time, 'utc'+ utc );
  res.json({'unix': unixDate, 'utc': naturalDate});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});