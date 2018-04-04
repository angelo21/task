
//DEFINE VARIABLES
const form = document.querySelector(".js-card__form");
const taskList = document.querySelector(".js-card__collection");
const clearBtn = document.querySelector(".js-card__clear-tasks");
const filter = document.querySelector(".js-filter");
const taskInput = document.querySelector(".js-task")

// LOAD ALL EVENT LISTENERS
function loadEventListeners() {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (taskInput.value === "") {
      alert("Add a task");
    }

    //CREATE LI ELEMENT
    const li =  document.createElement("li");
                li.className ="card__collection-item";
                li.appendChild(document.createTextNode(taskInput.value));

    //CREATE LINK ELEMENT
    const a = document.createElement("a");
          a.setAttribute("href", "#");
          a.className = "card__delete";
          a.innerHTML = "<i class='card__delete-item'><span class='card__delete-button'>X</span></i>";
          li.appendChild(a);

    //APPEND LI TO UL
    taskList.appendChild(li);

    //CLEAR THE INPUT
    taskInput.value = "";
  });
}

loadEventListeners();







