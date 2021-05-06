window.addEventListener("load", ()=> {
  const button = document.querySelector("#add-new-time");
  button.addEventListener("click", addNewTimeField)
});

const addNewTimeField = () => {
  const newTimeField = document.querySelector(".times-selection").cloneNode(true);
  document.querySelector("#times-selections").appendChild(newTimeField);
}