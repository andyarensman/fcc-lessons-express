var express = require('express');
var app = express();
var bodyParser = require("body-parser");

//const mySecret = process.env.MESSAGE_STYLE



app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.use(bodyParser.urlencoded({extended: false}));
app.use("/public", express.static(__dirname + "/public"));
app.use((req, res, next) => {
  console.log(req.method + " " + req.path + " - " + req.ip);
  next();
});

app.get("/:word/echo", (req, res) => {
  res.json({echo: req.params.word});
});

app.get("/name", (req, res) => {
  res.json({name: req.query.first + " " + req.query.last})
});

app.post("/name", (req, res) => {
  res.json({name: req.body.first + " " + req.body.last})
});

app.get("/json", (req, res) => {
  res.json({"message": process.env.MESSAGE_STYLE === 'uppercase' ? "HELLO JSON" : "Hello json"});
});

app.get("/now", (req, res, next) => {
  req.time = new Date().toString();
  next();
}, (req, res) => {
  res.json({time: req.time});
});































 module.exports = app;
