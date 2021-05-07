const proffys = [
  {
    name: "Ramon Matos",
    avatar: "https://cdn.icon-icons.com/icons2/1879/PNG/512/iconfinder-7-avatar-2754582_120519.png",
    subject: "Matemática", 
    bio : "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste, autem dolorum accusantium ducimus architecto distinctio vero. Odio eaque unde, vero perspiciatis illum voluptatibus sunt quod excepturi! Illo natus sed magni!",
    cost: "20",
    whatsapp: "33988928922",
    weekday: [2,3,4,5,6], 
    time_from: [720, 720, 720, 720, 720], 
    time_to: [810, 810, 810, 810, 810]
  },
  {
    name: "Ramon Ferreira",
    avatar: "https://cdn.icon-icons.com/icons2/1879/PNG/512/iconfinder-7-avatar-2754582_120519.png",
    subject: "Química", 
    bio : "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste, autem dolorum accusantium ducimus architecto distinctio vero. Odio eaque unde, vero perspiciatis illum voluptatibus sunt quod excepturi! Illo natus sed magni!",
    cost: "40",
    whatsapp: "33988928922",
    weekday: [1,3,4,5,6], 
    time_from: [720, 720, 720, 720, 720], 
    time_to: [810, 810, 810, 810, 810]
  },
];

const hasProffys = proffys.length > 0;

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
  return res.render("page-study.html", { hasProffys, proffys });
});

server.get("/give-classes", (req, res) => {
  return res.render("give-classes.html");
});

server.listen(port);