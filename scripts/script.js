
//DEFINE VARIABLES
const form = document.querySelector(".js-card__form");
const taskList = document.querySelector(".js-card__collection");
const clearBtn = document.querySelector(".js-card__clear-tasks");
const filter = document.querySelector(".js-filter");
const taskInput = document.querySelector(".js-task");


// LOAD ALL EVENT LISTENERS
// function loadEventListeners() {
//   form.addEventListener("submit", (e) => {
//     e.preventDefault();
//     if (taskInput.value === "") {
//       alert("Add a task");
//     }

//     //CREATE LI ELEMENT
//     const li =  document.createElement("li");
//                 li.className ="card__collection-item";
//                 li.appendChild(document.createTextNode(taskInput.value));

//     //CREATE LINK ELEMENT
//     const a = document.createElement("a");
//           a.setAttribute("href", "#");
//           a.className = "card__delete";
//           a.innerHTML = "<i class='card__delete-item'>X</i>";
//           li.appendChild(a);

//     //APPEND LI TO UL
//     taskList.appendChild(li);

//     //CLEAR THE INPUT
//     taskInput.value = "";
//   });
// }
// loadEventListeners();

// //LOAD EVENT TO DELETE ITEMS
// function deleteItems() {
//   taskList.addEventListener("click", (e) => {
//     if (e.target.className === "card__delete-item") {
//       e.target.parentElement.parentElement.remove()
//     }  
//   })
// }
// deleteItems()

//LOAD EVENT TO CLEAR ALL TASKS
// function deleteAll() {
//   clearBtn.addEventListener("click", (e) => {
//     while(taskList.firstChild) {
//       taskList.firstChild.remove();
//     }
//   })
// }
// deleteAll();


const events = {
  //LOAD FORM EVENT LISTENERS
  formEvents() {
    //DOM LOAD EVENT
    document.addEventListener("DOMContentLoaded", (e) => {
      this.getTasks();
    })

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (taskInput.value === "") {
        alert("Add a task");
        deleteAll();
      }
  
      //CREATE LI ELEMENT
      const li =  document.createElement("li");
                  li.className ="card__collection-item";
                  li.appendChild(document.createTextNode(taskInput.value));
  
      //CREATE LINK ELEMENT
      const a = document.createElement("a");
            a.setAttribute("href", "#");
            a.className = "card__delete";
            a.innerHTML = "<i class='card__delete-item'>X</i>";
            li.appendChild(a);
  
      //APPEND LI TO UL
      taskList.appendChild(li);

      //CALL STORE IN LOCALSTORAGE
      storage.store(taskInput.value);
  
      //CLEAR THE INPUT
      taskInput.value = "";
    });
  },
  //LOAD EVENTS TO DELETE SINGLE ITEMS
  deleteItems() {
    taskList.addEventListener("click", (e) => {
      if (e.target.className === "card__delete-item") {
        e.target.parentElement.parentElement.remove()
        
        //REMOVE FROM LOCAL STORAGE
        storage.removeFromLocalStorage(e.target.parentElement.parentElement);
      }  
    })
  },
  //LOAD EVENTS TO DELETE ALL ITEM
  deleteAll() {
    clearBtn.addEventListener("click", (e) => {
      while(taskList.firstChild) {
        taskList.firstChild.remove();

        //REMOVE ALL FROM LOCAL STORAGE
        localStorage.clear();
      } 
    })
  },
  //LOAD EVENTS TO FILTER ITEMS
  filterTasks() {
    filter.addEventListener("keyup", (e) => {
      const text = e.target.value.toLowerCase();
      const items = document.querySelectorAll(".card__collection-item");
      items.forEach((task) => {
        const item = task.textContent;
        if (item.toLowerCase().includes(text)) {
          task.style.display = "block";
        } else {
          task.style.display = "none";
        }
      })
    })
  },
  //GET TASKS FROM LOCAL STORAGE TO LOAD WHEN DOM LOADS
  getTasks() {
    let tasks;
     if (localStorage.getItem("tasks") === null) {
       tasks = [];
     } else {
      tasks = JSON.parse(localStorage.getItem("tasks"));
    } 
    tasks.forEach((item) => {
      const li =  document.createElement("li");
                  li.className ="card__collection-item";
                  li.appendChild(document.createTextNode(item));
  
      //CREATE LINK ELEMENT
      const a = document.createElement("a");
            a.setAttribute("href", "#");
            a.className = "card__delete";
            a.innerHTML = "<i class='card__delete-item'>X</i>";
            li.appendChild(a);
  
      //APPEND LI TO UL
      taskList.appendChild(li);
    })
  }
};

//LOCAL STORAGE
const storage = {
  store(task) {
    let tasks;
     if (localStorage.getItem("tasks") === null) {
       tasks = [];
     } else {
      tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    tasks.push(task);

    localStorage.setItem("tasks", JSON.stringify(tasks));
  },
  removeFromLocalStorage(taskItem) {
    let tasks;
     if (localStorage.getItem("tasks") === null) {
       tasks = [];
     } else {
      tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    tasks.forEach((task, index) => {
      if (`${taskItem.textContent}` === `${task}X`) {
        tasks.splice(index, 1);
      }
    })
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }
}

events.formEvents();
events.deleteItems();
events.deleteAll();
events.filterTasks();



