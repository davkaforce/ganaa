const addCard = document.querySelectorAll(".buttons");
const modal = document.getElementById("Modal");
const cards = document.querySelectorAll(".card ");
const addButton = document.getElementById("add_button");

const btn = document.getElementById("button");
const hourEl = document.querySelector(".hour");
const minuteEl = document.querySelector(".minute");
const valueEl = document.querySelector(".value");
const draggable = document.querySelectorAll(".results");

addCard.forEach((el) => {
  el.addEventListener("click", () => {
    modal.style.display = "block";
  });
});

window.addEventListener("click", (event) => {
  if (event.target == modal) {
    modal.style.display = "none";
  }
});
const title1 = document.getElementById("title1");
const description1 = document.getElementById("description1");
const status1 = document.getElementById("sta");
const priority1 = document.getElementById("pri");
const restart = () => {
  (title1.value = ""),
    (description1.value = ""),
    (status1.value = "To do"),
    (priority1.value = "Low");
  todo_values.title = "";
  todo_values.description = "";
  todo_values.status = "To do";
  todo_values.priority = "Low";
};

let states = [];
const first = JSON.parse(localStorage.getItem("todo"));
states = first ? first : [];

let todo_values = {
  title: "",
  description: "",
  status: "To do",
  priority: "Low",
  id: "",
};

title1.addEventListener("change", (event) => {
  todo_values.title = event.target.value;
});

description1.addEventListener("change", (event) => {
  todo_values.description = event.target.value;
});
status1.addEventListener("change", (event) => {
  todo_values.status = event.target.value;
});

priority1.addEventListener("change", (event) => {
  todo_values.priority = event.target.value;
});

const cardComponent = (props) => {
  const { title, description, status, priority, id } = props;
  return ` <div class="addedTask" style="margin-bottom: 19px" draggable="true" id="${id}" >
  
   <div id="checker">${
     status == "Done"
       ? `<div class="ass" style="background-color:black; color:white; font-size:15px" >&#x2713</div>`
       : "&#x2713;"
   }
    </div>
 

  <div class="mid_add">
    <div>${title}</div>
    <div>${description}</div>
    <div id="priorit">${priority}</div>
  </div>
  <div class="modal_buttons">
    <button
      id="closeButton"
      style="border: none; background-color: #fefefe"
    >
      <i
        id="closeBut"
        class="material-symbols-outlined"
        style="
          border-radius: 50px;
          border: 2px solid #c3c3c3;
          font-size: 15px;
          padding: 5px;
        "
      >
        close
      </i>
    </button>
    <button
      id="editButton"
      style="border: none; background-color: #fefefe"
    >
      <i
        id="closeEdit"
        class="material-symbols-outlined"
        style="
          border-radius: 50px;
          border: 2px solid #c3c3c3;
          font-size: 15px;
          padding: 5px;
        "
      >
        edit_square
      </i>
    </button>
  </div>
</div>`;
};
let editedTaskId = "";

const render = () => {
  const addedTaskTodo = document.getElementById("addedTaskTodo");
  const addedTaskProg = document.getElementById("addedTaskProg");
  const addedTaskStuck = document.getElementById("addedTaskStuck");
  const addedTaskDone = document.getElementById("addedTaskDone");

  const textJson = JSON.parse(localStorage.getItem("todo"));

  addedTaskDone.innerHTML = "";
  addedTaskTodo.innerHTML = "";
  addedTaskProg.innerHTML = "";
  addedTaskStuck.innerHTML = "";

  textJson?.forEach((el) => {
    const result = cardComponent(el);

    switch (el.status) {
      case "To do":
        addedTaskTodo.innerHTML += result;

        break;
      case "In progress":
        addedTaskProg.innerHTML += result;
        break;
      case "Stuck":
        addedTaskStuck.innerHTML += result;
        break;
      case "Done":
        addedTaskDone.innerHTML += result;

        break;
    }
  });
  const titlw = document.getElementById("titlw");
  const editButton = document.querySelectorAll("#editButton");
  editButton.forEach((el) => {
    el.addEventListener("click", () => {
      const parent1 = el.parentNode;
      const parent2 = parent1.id;
      const grandparent = parent1.parentNode;
      const grandparent1 = grandparent.id;
      const grandparentID1 = grandparent1.id;
      editedTaskId = grandparent1;
      console.log(editedTaskId);
      // const responseEdit = JSON.parse(localStorage.getItem("todo"));
      modal.style.display = "block";
      titlw.innerHTML = "Edit task";
      addButton.innerHTML = "Save changes";
      activeEdit = true;
      console.log("aa");
      states.forEach((el) => {
        if (el.id === grandparent1) {
          title1.value = el.title;
          status1.value = el.status;
          priority1.value = el.priority;
          description1.value = el.description;
          console.log("aa");
        }
      });
    });
  });
};

function editTaskFunction() {
  const findBack = JSON.parse(localStorage.getItem("todo"));
  const editArr = findBack.map((el) => {
    if (el.id === editedTaskId) {
      return {
        ...el,
        title: title1.value,
        status: status1.value,
        description: description1.value,
        priority: priority1.value,
      };
    } else {
      return el;
    }
  });

  localStorage.setItem("todo", JSON.stringify(editArr));
  // add_taskButton.innerHTML = "Add Task";
  modal.style.display = "none";
  activeEdit = false;
  location.reload();
}

render();

const uniqId = () => {
  const uniq = "id" + new Date().getTime();
  return uniq;
};

const setData = (obj) => {
  obj.id = uniqId();
  states.push({ ...obj });
  localStorage.setItem("todo", JSON.stringify(states));
  render();
};

let activeEdit = false;

addButton.addEventListener("click", () => {
  if (activeEdit) {
    editTaskFunction();
  } else {
    modal.style.display = "none";
    setData(todo_values);
    restart();
    location.reload();
  }
});

let temp;
draggable?.forEach((el) => {
  el.addEventListener("dragstart", (event) => {
    event.dataTransfer.setData("draggg", event.target.id);
  });
});

cards?.forEach((el) => {
  el.addEventListener("dragover", (event) => {
    event.preventDefault();
  });
});

const cardTodo = document.getElementById("card_todo");
const cardProg = document.getElementById("card_prog");
const cardStuck = document.getElementById("card_stuck");
const cardDone = document.getElementById("card_done");

cardTodo.addEventListener("drop", (event) => {
  temp = event.dataTransfer.getData("draggg");
  const draggedTodo = document.getElementById(temp);
  addedTaskTodo.appendChild(draggedTodo);

  const dbData = JSON.parse(localStorage.getItem("todo"));
  const newArray = dbData.map((el) => {
    if (el.id === temp) {
      return { ...el, status: "To do" };
    } else {
      return el;
    }
  });
  location.reload();
  localStorage.setItem("todo", JSON.stringify(newArray));
});
cardProg.addEventListener("drop", (event) => {
  temp = event.dataTransfer.getData("draggg");
  const draggedProg = document.getElementById(temp);
  const dbData = JSON.parse(localStorage.getItem("todo"));
  const newArray = dbData.map((el) => {
    if (el.id === temp) {
      return { ...el, status: "In progress" };
    } else {
      return el;
    }
  });
  location.reload();
  localStorage.setItem("todo", JSON.stringify(newArray));
  addedTaskProg.appendChild(draggedProg);
});
cardStuck.addEventListener("drop", (event) => {
  temp = event.dataTransfer.getData("draggg");
  const draggedStuck = document.getElementById(temp);
  const dbData = JSON.parse(localStorage.getItem("todo"));
  const newArray = dbData.map((el) => {
    if (el.id === temp) {
      return { ...el, status: "Stuck" };
    } else {
      return el;
    }
  });
  location.reload();
  localStorage.setItem("todo", JSON.stringify(newArray));
  addedTaskStuck.appendChild(draggedStuck);
});
cardDone.addEventListener("drop", (event) => {
  temp = event.dataTransfer.getData("draggg");
  const draggedDone = document.getElementById(temp);
  const dbData = JSON.parse(localStorage.getItem("todo"));
  const newArray = dbData.map((el) => {
    if (el.id === temp) {
      return { ...el, status: "Done" };
    } else {
      return el;
    }
  });
  location.reload();
  localStorage.setItem("todo", JSON.stringify(newArray));
  addedTaskDone.appendChild(draggedDone);
});
const check = document.querySelectorAll("#checker");
console.log(check);
check.forEach((el) => {
  el.addEventListener("click", () => {
    const parent = el.parentNode;
    const grandparentId = parent.id;

    const responseDone = JSON.parse(localStorage.getItem("todo"));
    const checkerArr = responseDone.map((el) => {
      if (el.id === grandparentId) {
        return { ...el, status: "Done" };
      } else {
        return el;
      }
    });
    localStorage.setItem("todo", JSON.stringify(checkerArr));
    location.reload();
    render.call(this);
    render();
  });
});

const close = document.querySelectorAll("#closeButton");
// console.log(close);
close.forEach((el) => {
  el.addEventListener("click", () => {
    const parent1 = el.parentNode;
    const grandparent = parent1.parentNode;
    const grandparentID = grandparent.id;
    const responseClose = JSON.parse(localStorage.getItem("todo"));
    const closeArr = responseClose.filter((item) => {
      if (item.id === grandparentID) {
        return false;
      }
      return true;
    });
    localStorage.setItem("todo", JSON.stringify(closeArr));
    location.reload();
    render.call(this);
    render();
  });
});
const boxes = document.querySelectorAll(".card");
console.log(boxes);
const counter = () => {
  boxes.forEach((el) => {
    tasks = el.querySelectorAll(".addedTask");
    console.log(tasks);
    counts = el.getElementsByClassName("counter")[0];
    console.log(counts);
    counts.innerHTML = tasks.length;
  });
};
counter();

const taskBoxes = document.querySelectorAll(".results");
console.log(taskBoxes);
taskBoxes.forEach(() => {
  const priorities = ["High", "Medium", "Low"];
  const data = JSON.parse(localStorage.getItem("todo"));

  data.sort((a, b) => {
    const x = priorities.indexOf(a.priority);
    const y = priorities.indexOf(b.priority);
    return x - y;
  });

  localStorage.setItem("todo", JSON.stringify(data));
});
