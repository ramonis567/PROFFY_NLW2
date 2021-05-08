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
const subjects = ["Artes", "Biologia", "Ciências", "Educação Física", "Espanhol", "Física", "Filosofia", "Geografia", "História", "Inglês", "Matemática", "Português", "Química", "Sociologia"];
const weekdays = ["Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira", "Sábado", "Domingo"];
const hasProffys = proffys.length > 0;

function getSubject(subjectIndex) {
  return subjects[subjectIndex - 1];
}

// function getWeekday(weekdayIndex) {
//   return weekdays[weekdayIndex - 1];
// }

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
  const filters = req.query;
  return res.render("page-study.html", { hasProffys, proffys, filters, subjects, weekdays });
});

server.get("/give-classes", (req, res) => {
  const data = req.query;
  const hasData = Object.keys(data).length > 0;

  if(hasData){
    data.subject = getSubject(data.subject);

    // tam = data.weekday.length;
    // for(let i = 0; i <= tam; i++){
    //   data.weekday = getWeekday(data.weekday);
    // }
    console.log(data.weekday);
    proffys.push(data)
    return res.redirect("/study");
  }

  return res.render("give-classes.html", { subjects, weekdays });
});

server.listen(port);