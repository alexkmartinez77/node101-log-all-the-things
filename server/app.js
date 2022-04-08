const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const csvToJson = require('convert-csv-to-json');
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.csv'), { flags: 'a' });

const app = express();

app.set('json spaces', 2);

//morgan setup
morgan.token('custom-user-agent', (req) => {
  let customUserserAgent =(req.headers['user-agent'].replace(/;/g, ''));
  return customUserserAgent;
})
morgan.token('custom', ':custom-user-agent;:date[iso];:method;:url;HTTP/:http-version;:status');
app.use(morgan('custom'));
app.use(morgan('custom', { stream: accessLogStream }));

app.get('/', (req, res) => {
  let jsonLog = csvToJson.getJsonFromCsv('./server/log.csv');
  console.log('line 23', jsonLog[0].tostring());
  res.send("ok");

});

app.get('/logs', (req, res) => {

  let jsonLog = csvToJson.getJsonFromCsv('./server/log.csv');
  console.log(jsonLog.toString());
  res.json(jsonLog);

});

module.exports = app;
