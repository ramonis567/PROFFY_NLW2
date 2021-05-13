const { subjects, weekdays, getSubject, transformHoursToMinutes } = require("./utils/format.js");
const Database = require("./database/db.js");

async function renderPageStudy(req, res){
  const filters = req.query;

  if((!filters.subject) || (!filters.weekday) || (!filters.hours)){
    console.log("Campos vazios", filters.subject, filters.weekday, filters.hours);
    return res.render("study.html", { filters, subjects, weekdays });
  } 
    
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
    const db = await Database;
    const proffys = await db.all(query);

    proffys.map((proffy) => {
      proffy.subject = getSubject(proffy.subject)
    });

    if(proffys.length = 0){
      console.log("Nenhum professor");
      return res.render("study.html", { filters, subjects, weekdays });
    }
    else {
      console.log("Há professores");
      console.log(proffys);
      return res.render("study.html", { proffys, filters, subjects, weekdays });
    } 
  } catch (error) {
    console.log(error);
  }
}

function renderGiveClasses(req, res){
  return res.render("give-classes.html", { subjects, weekdays });
}

async function renderSaveClasses (req, res) {
  const createProffy = require("./database/createProffy.js");

  const proffyValue = {
    name: req.body.name,
    avatar: req.body.avatar,
    whatsapp: req.body.whatsapp,
    bio : req.body.bio
  };

  const classValue = {
    subject: req.body.subject,
    cost: req.body.cost
    // proffy_id => function createProffy
  };

  const classScheduleValues = req.body.weekday.map((weekday, index) => {
      return {
        // class_id => function createProffy
        weekday: weekday, 
        time_from: transformHoursToMinutes(req.body.time_from[index]), 
        time_to: transformHoursToMinutes(req.body.time_to[index]),
      }  
    } 
  );

  try {
    const db = await Database;
    await createProffy(db, {proffyValue, classValue, classScheduleValues});

    let queryString = "?subject=" + req.body.subject;
    queryString += "&weekday=" + req.body.weekday[0];
    queryString += "&time=" + req.body.time_from[0]

    return res.redirect("/study" + queryString);
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  renderPageStudy, renderGiveClasses, renderSaveClasses
};