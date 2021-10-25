const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
var path = require('path');

const app = express();


//removes commas from 'user-agent' header
morgan.token('custom-user-agent', (req) => {
  let customUserserAgent =(req.headers['user-agent'].replace(/,/g, ''));
  return customUserserAgent;
})

morgan.token('custom', ':custom-user-agent,:date[iso],:method,:url,HTTP/:http-version,:status');
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.csv'), { flags: 'a' })
app.use(morgan('custom'));
app.use(morgan('custom', { stream: accessLogStream }));

app.get('/', (req, res) => {
// write your code to respond "ok" here
  res.status(200).send("ok");

});

app.get('/logs', (req, res) => {
// write your code to return a json object containing the log data here
  res.json()
});




module.exports = app;
