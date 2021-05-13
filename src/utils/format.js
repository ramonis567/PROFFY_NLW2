// const proffys = [
//   {
//     name: "Ramon Matos",
//     avatar: "https://cdn.icon-icons.com/icons2/1879/PNG/512/iconfinder-7-avatar-2754582_120519.png",
//     subject: "Matemática", 
//     bio : "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste, autem dolorum accusantium ducimus architecto distinctio vero. Odio eaque unde, vero perspiciatis illum voluptatibus sunt quod excepturi! Illo natus sed magni!",
//     cost: "20",
//     whatsapp: "33988928922",
//     weekday: [2,3,4,5,6], 
//     time_from: [720, 720, 720, 720, 720], 
//     time_to: [810, 810, 810, 810, 810]
//   },
//   {
//     name: "Ramon Ferreira",
//     avatar: "https://cdn.icon-icons.com/icons2/1879/PNG/512/iconfinder-7-avatar-2754582_120519.png",
//     subject: "Química", 
//     bio : "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste, autem dolorum accusantium ducimus architecto distinctio vero. Odio eaque unde, vero perspiciatis illum voluptatibus sunt quod excepturi! Illo natus sed magni!",
//     cost: "40",
//     whatsapp: "33988928922",
//     weekday: [1,3,4,5,6], 
//     time_from: [720, 720, 720, 720, 720], 
//     time_to: [810, 810, 810, 810, 810]
//   },
// ];

const subjects = ["Artes", "Biologia", "Ciências", "Educação Física", "Espanhol", "Física", "Filosofia", "Geografia", "História", "Inglês", "Matemática", "Português", "Química", "Sociologia"];
const weekdays = ["Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira", "Sábado", "Domingo"];

function getSubject(subjectIndex) {
  return subjects[subjectIndex - 1];
}

function transformHoursToMinutes(hours){
  const [hour, minutes] = hours.split(":");
  const totalMinutes = Number(hour*60) + Number(minutes);
  return (totalMinutes);
}

module.exports = {
  subjects, weekdays, getSubject, transformHoursToMinutes
};