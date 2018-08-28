const express = require('express');
const patient = require('./models/patient');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// create express app

const app = express();

//connect to mongodb
mongoose.connect('mongodb://localhost/hospitalbilling');
mongoose.Promise = global.Promise;

// Add headers
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

  // // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // // Set to true if you need the website to include cookies in the requests sent
  // // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // // Pass to next layer of middleware
  next();
});

//middleware
app.use(bodyParser.json());

app.use('/api', require('./routes/api'));

app.use(function(err, req, res, next) {
  //console.log(err);
  res.status(422).send({
    error: err.errors
  });
});

var patientToAdmit = new patient();

//listen on port 4000
app.listen(process.env.port || 4000, function() {
  console.log("Server Started at port 4000");
});
