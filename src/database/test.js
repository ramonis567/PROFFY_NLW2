const Database = require("./db.js");
const createProffy = require("./createProffy.js");

Database.then(async (db) => {
  proffyValue = {
    name: "Jane Santos",
    avatar: "https://cdn.icon-icons.com/icons2/1879/PNG/512/iconfinder-7-avatar-2754582_120519.png",
    whatsapp: "33999995555",
    bio : "Lorem ipsum!",
  };

  classValue = {
    subject: 6,
    cost: 30,
    // proffy_id
  };

  classScheduleValues = [
    {
      // class_id
      weekday: 1, 
      time_from: 720, 
      time_to: 810,
    },
    {
      // class_id     
      weekday: 2, 
      time_from: 720, 
      time_to: 900,
    }
  ];
  // ------------------ 
  // await createProffy (db, {proffyValue, classValue, classScheduleValues});

  const selectedProffys = await db.all("SELECT * FROM proffys");
  // console.log(selectedProffys);

  const selectedClasses = await db.all("SELECT * FROM classes");
  // console.log(selectedClasses);

  const selectedClassSchedules = await db.all("SELECT * FROM class_schedule");
  //console.log(selectedClassSchedules);

  const selectClassesAndProffys = await db.all(`
    SELECT classes.*, proffys.*
    FROM proffys
    JOIN classes ON (classes.proffy_id = proffys.id)
    WHERE classes.proffy_id = "1"
  `);
  //console.log(selectClassesAndProffys);

  const selectClassesSchedules = await db.all(`
    SELECT class_schedule.*
    FROM class_schedule
    WHERE class_schedule.class_id = "1"
    AND class_schedule.weekday = "1"
    AND class_schedule.time_from <= "720"
    AND class_schedule.time_to > "720"
  `);

  console.log(selectClassesSchedules);

});
