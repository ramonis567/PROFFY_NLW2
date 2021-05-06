const express = require("express");
const server = express();
const port = 3000;

const nunjucks = require("nunjucks");
nunjucks.configure("src/pages", {
  express: server,
  noCache: true,
});

server.use(express.static("public"));
server.use(express.urlencoded({ extended: true }));

server.get("/", (req, res) => {
  return res.render("index.html");
});

server.get("/study", (req, res) => {
  return res.render("page-study.html");
});

server.get("/give-classes", (req, res) => {
  return res.render("give-classes.html");
});

server.listen(port);