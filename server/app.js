const express = require('express');
const fs = require('fs');
const csvToJson = require('convert-csv-to-json');

const app = express();

app.set('json spaces', 2);

app.get('/', (req, res) => {
  //create log string
  let log = (`${req.header('user-agent').replace(/;/g, '')};${new Date().toISOString()};${req.method};${req.originalUrl};HTTP/${req.httpVersion};${res.statusCode}`)
  //to pass the tests
  console.log(log);
  //append log to log.csv file
  fs.appendFile('./server/log.csv', `\n${log}`, (err) => err ? console.log(err) : console.log('Successful log!'))
  //response to root route
  res.send("ok");
});

app.get('/logs', (req, res) => {
  //Convert csv file to json
  let jsonLog = csvToJson.getJsonFromCsv('./server/log.csv');
  res.json(jsonLog);

});
module.exports = app;
