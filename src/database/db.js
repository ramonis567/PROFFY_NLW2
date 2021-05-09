const db = require("sqlite-async");
db.open(__dirname + "/database.sqlite").then(dbOperate);

function dbOperate(db) {
  console.log("Teste")
  console.log(db);
}


