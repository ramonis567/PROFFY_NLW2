const { renderPageStudy, renderGiveClasses, renderSaveClasses } = require("./pages.js");

const express = require("express");
const server = express();
const port = 3333;
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

server.get("/study", renderPageStudy);
server.get("/give-classes", renderGiveClasses);
server.post("/save-classes", renderSaveClasses);

server.listen(port);