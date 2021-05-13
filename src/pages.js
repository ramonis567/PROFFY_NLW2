const { subjects, weekdays, getSubject, transformHoursToMinutes } = require("./utils/format.js");
const Database = require("./database/db.js");

async function renderPageStudy(req, res){
  const filters = req.query;

  if((!filters.subject)||(!filters.weekday)||(!filters.hours)){
    console.log("Campos vazios");
    return res.render("page-study.html", { filters, subjects, weekdays });
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
      return res.render("page-study.html", { filters, subjects, weekdays });
    }
    else {
      console.log("Há professores");
      console.log(proffys);
      return res.render("page-study.html", { proffys, filters, subjects, weekdays });
    } 
  } catch (error) {
    console.log(error);
  }
}

function renderGiveClasses(req, res){
  const data = req.query;
  const hasData = Object.keys(data).length > 0;

  if(hasData){
    data.subject = getSubject(data.subject);
    proffys.push(data);
    return res.redirect("/study");
  }

  return res.render("give-classes.html", { subjects, weekdays });
}

async function renderSaveClasses (req, res) {
  console.log("teste");
}

module.exports = {
  renderPageStudy, renderGiveClasses, renderSaveClasses
};