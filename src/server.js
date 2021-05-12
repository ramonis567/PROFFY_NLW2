const { subjects, weekdays, getSubject, hasProffys, hasNotProffys, transformHoursToMinutes } = require("./utils/format.js");

const Database = require("./database/db.js");

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

// async function awaitDatabase(database, query){
//   const db = await database;
//   const proffys = await db.all(query);

//   proffys

//   return proffys;
// }

server.get("/study", (req, res) => {
  const filters = req.query;

  if((!filters.subject)||(!filters.weekday)||(!filters.hours)){
    console.log("Campos vazios");
    return res.render("page-study.html", { hasNotProffys, filters, subjects, weekdays });
  } else {
    filters.hours = transformHoursToMinutes(filters.hours);
    
    const query = `
      SELECT classes.*, proffys.*
      FROM proffys
      JOIN classes ON (classes.proffy_id = proffys.id)
      WHERE EXISTS(
        SELECT class_schedule.*
        FROM class_schedule
        WHERE class_schedule.class_id = classes.id
        AND class_schedule.weekday = ${filters.weekday}
        AND class_schedule.time_from <= ${filters.hours}
        AND class_schedule.time_to > ${filters.hours}
      )
      AND classes.subject = "${filters.subject}"
    `;
    
    try {
      // awaitDatabase(Database, query);
      //const db = Database;
      //db.then
      //console.log(proffys);
      if(proffys == []){
        return res.render("page-study.html", { hasNotProffys, filters, subjects, weekdays });
      } else {
        return res.render("page-study.html", { hasProffys, proffys, filters, subjects, weekdays });
      }
    } catch (error) {
      console.log(error);
    }

  }

  // const query = `
  // SELECT classes.*, proffys.*
  //   FROM proffys
  //   JOIN classes ON (classes.proffy_id = proffys.id)
  //   WHERE EXISTS(
  //     SELECT class_schedule.*
  //     FROM class_schedule
  //     WHERE class_schedule.class_id = classes.id
  //     AND class_schedule.weekday = ${filters.weekday}
  //     AND class_schedule.time_from <= ${filters.hours}
  //     AND class_schedule.time_to > ${filters.hours}
  //   )
  // `;

  // return res.render("page-study.html", { hasProffys, proffys, filters, subjects, weekdays });
});

server.get("/give-classes", (req, res) => {
  const data = req.query;
  const hasData = Object.keys(data).length > 0;

  if(hasData){
    data.subject = getSubject(data.subject);

    // let tam = data.weekday.length;
    // for(let i = 0; i <= tam; i++){
    //   data.weekday = getWeekday(data.weekday);
    // }
    console.log(data.weekday);
    proffys.push(data);
    return res.redirect("/study");
  }

  return res.render("give-classes.html", { subjects, weekdays });
});

server.listen(port);