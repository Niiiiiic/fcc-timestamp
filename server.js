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
//app.get("/", function (req, res) {
//  res.sendFile(__dirname + '/views/index.html');
//});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

//date endpoint
app.get('/:date_string?',function(req,res){
  let utc;
  let unix;
  if(req.params.date_string) {
      if (req.params.date_string.indexOf('-') > -1) {
          console.log('index true')
           utc = new Date("'"+req.params.date_string+"'").toUTCString()
           unix = Math.round(new Date("'"+req.params.date_string+"'").getTime()/1000);  
              return res.json({unix: unix, utc : utc});
        } else {
          console.log('index false', req.params.date_string)
          let milliseconds = Number(req.params.date_string)
           utc = new Date(milliseconds).toUTCString()
           unix = Math.round(new Date(milliseconds).getTime()/1000);  
              return res.json({unix: unix, utc : utc});
        }
  } else {
            console.log('no date', req.params.date_string)
    
           utc = new Date().toUTCString()
           unix = Math.round(new Date().getTime()/1000);  
              return res.json({unix: unix, utc : utc});
        }

   
    
  
})


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});