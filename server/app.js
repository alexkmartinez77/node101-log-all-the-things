const express = require('express');
const fs = require('fs');
const csvToJson = require('convert-csv-to-json');

const app = express();

app.set('json spaces', 2);

app.use((req, res, next) => {

  const logPath = './server/log.csv';
  const headers = 'userAgent;timestamp;method;url;protocol;statusCode';

  if (!fs.existsSync(logPath) || fs.statSync(logPath).size === 0) {
    fs.writeFileSync(logPath, headers);
  }

  let log = (`${req.header('user-agent').replace(/;/g, '')};${new Date().toISOString()};${req.method};${req.originalUrl};HTTP/${req.httpVersion};${res.statusCode}`);
  fs.appendFile('./server/log.csv', `\n${log}`, (err) => err ? console.log(err) : console.log('Successful log!'));
  console.log(log);
  next();
})

app.get('/', (req, res) => {
  res.status(200).send("ok");
});

app.get('/logs', (req, res) => {
  //Convert csv file to json
  let jsonLog = csvToJson.getJsonFromCsv('./server/log.csv');
  res.json(jsonLog);

});
module.exports = app;
