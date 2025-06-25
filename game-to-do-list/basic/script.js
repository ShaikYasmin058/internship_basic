// let tasks = [];
// let completedTasks = [];
// let points = 0;
// let level = 1;

// const input = document.getElementById('input');
// const todoList = document.getElementById('todo-list');
// const historyList = document.getElementById('history-list');
// const pointsDisplay = document.getElementById('points');
// const levelDisplay = document.getElementById('level');

// function handleInput() {
//   const value = input.value.trim();
//   if (value === '') return;

//   if (["1", "2", "3", "4", "5"].includes(value)) {
//     handleCommand(parseInt(value));
//   } else {
//     addTask(value);
//   }

//   input.value = '';
// }

// function handleCommand(command) {
//   switch (command) {
//     case 1:
//       displayTasks();
//       break;
//     case 2:
//       const taskName = prompt("Enter the task name:");
//       if (taskName) addTask(taskName);
//       break;
//     case 3:
//       if (tasks.length === 0) return alert("No tasks to complete.");
//       displayTasks();
//       const completeIndex = prompt("Enter task number to mark as completed:");
//       completeTask(parseInt(completeIndex) - 1);
//       break;
//     case 4:
//       if (completedTasks.length === 0) return alert("No completed tasks to remove.");
//       displayHistory();
//       const removeIndex = prompt("Enter completed task number to remove from history:");
//       removeCompletedTask(parseInt(removeIndex) - 1);
//       break;
//     case 5:
//       alert("Thanks for playing! Reload the page to restart.");
//       input.disabled = true;
//       break;
//     default:
//       alert("Invalid option.");
//   }
// }

// function addTask(taskText) {
//   tasks.push({ text: taskText, completed: false });
//   updatePoints(5);
//   displayTasks();
// }

// function completeTask(index) {
//   if (index >= 0 && index < tasks.length) {
//     if (!tasks[index].completed) {
//       tasks[index].completed = true;
//       completedTasks.push(tasks[index].text); // Add to history
//       updatePoints(10);
//       displayTasks();
//       updateHistory();
//     } else {
//       alert("Task already completed.");
//     }
//   } else {
//     alert("Invalid task number.");
//   }
// }

// function removeCompletedTask(index) {
//   if (index >= 0 && index < completedTasks.length) {
//     completedTasks.splice(index, 1);
//     updatePoints(2);
//     updateHistory();
//   } else {
//     alert("Invalid task number.");
//   }
// }

// function displayTasks() {
//   todoList.innerHTML = '';
//   if (tasks.length === 0) {
//     todoList.innerHTML = '<li>No tasks yet. Add some!</li>';
//     return;
//   }

//   tasks.forEach((task, index) => {
//     const li = document.createElement('li');
//     li.textContent = `${index + 1}. ${task.text}`;
//     if (task.completed) li.classList.add('completed');
//     todoList.appendChild(li);
//   });
// }

// function updateHistory() {
//   historyList.innerHTML = '';
//   if (completedTasks.length === 0) {
//     historyList.innerHTML = '<li>No completed tasks yet.</li>';
//     return;
//   }

//   completedTasks.forEach((task, index) => {
//     const li = document.createElement('li');
//     li.textContent = `${index + 1}. ${task}`;
//     historyList.appendChild(li);
//   });
// }

// function updatePoints(amount) {
//   points += amount;
//   pointsDisplay.textContent = points;
//   updateLevel();
// }

// function updateLevel() {
//   level = Math.floor(points / 20) + 1;
//   levelDisplay.textContent = level;
// }

// function toggleDarkMode() {
//   document.body.classList.toggle("dark-mode");
// }
// function toggleHistory() {
//   const historyContainer = document.getElementById('history-container');
//   const toggleBtn = document.getElementById('toggle-history-btn');

//   if (historyContainer.style.display === 'none') {
//     historyContainer.style.display = 'block';
//     toggleBtn.textContent = '📕 Hide Completed Tasks';
//   } else {
//     historyContainer.style.display = 'none';
//     toggleBtn.textContent = '📜 Show Completed Tasks';
//   }
// }

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let completedTasks = JSON.parse(localStorage.getItem('completedTasks')) || [];
let points = parseInt(localStorage.getItem('points')) || 0;
let level = parseInt(localStorage.getItem('level')) || 1;

const input = document.getElementById('input');
const todoList = document.getElementById('todo-list');
const historyList = document.getElementById('history-list');
const pointsDisplay = document.getElementById('points');
const levelDisplay = document.getElementById('level');

pointsDisplay.textContent = points;
levelDisplay.textContent = level;

displayTasks();
updateHistory();

function handleInput() {
  const value = input.value.trim();
  if (value === '') return;

  if (["1", "2", "3", "4", "5"].includes(value)) {
    handleCommand(parseInt(value));
  } else {
    addTask(value);
  }

  input.value = '';
}

function handleCommand(command) {
  switch (command) {
    case 1:
      displayTasks();
      break;
    case 2:
      const taskName = prompt("Enter the task name:");
      if (taskName) addTask(taskName);
      break;
    case 3:
      if (tasks.length === 0) return alert("No tasks to complete.");
      displayTasks();
      const completeIndex = prompt("Enter task number to mark as completed:");
      completeTask(parseInt(completeIndex) - 1);
      break;
    case 4:
      if (completedTasks.length === 0) return alert("No completed tasks to remove.");
      updateHistory();
      const removeIndex = prompt("Enter completed task number to remove from history:");
      removeCompletedTask(parseInt(removeIndex) - 1);
      break;
    case 5:
      alert("Thanks for playing! Reload the page to restart.");
      input.disabled = true;
      break;
    default:
      alert("Invalid option.");
  }
}

function addTask(taskText) {
  tasks.push({ text: taskText, completed: false });
  updatePoints(5);
  saveData();
  displayTasks();
}

function completeTask(index) {
  if (index >= 0 && index < tasks.length) {
    if (!tasks[index].completed) {
      tasks[index].completed = true;
      completedTasks.push(tasks[index].text);
      updatePoints(10);
      saveData();
      displayTasks();
      updateHistory();
    } else {
      alert("Task already completed.");
    }
  } else {
    alert("Invalid task number.");
  }
}

function removeCompletedTask(index) {
  if (index >= 0 && index < completedTasks.length) {
    completedTasks.splice(index, 1);
    updatePoints(2);
    saveData();
    updateHistory();
  } else {
    alert("Invalid task number.");
  }
}

function displayTasks() {
  todoList.innerHTML = '';
  if (tasks.length === 0) {
    todoList.innerHTML = '<li>No tasks yet. Add some!</li>';
    return;
  }

  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.textContent = `${index + 1}. ${task.text}`;
    if (task.completed) li.classList.add('completed');
    todoList.appendChild(li);
  });
}

function updateHistory() {
  historyList.innerHTML = '';
  if (completedTasks.length === 0) {
    historyList.innerHTML = '<li>No completed tasks yet.</li>';
    return;
  }

  completedTasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.textContent = `${index + 1}. ${task}`;
    historyList.appendChild(li);
  });
}

function updatePoints(amount) {
  points += amount;
  pointsDisplay.textContent = points;
  updateLevel();
  saveData();
}

function updateLevel() {
  level = Math.floor(points / 20) + 1;
  levelDisplay.textContent = level;
}

function saveData() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
  localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
  localStorage.setItem('points', points.toString());
  localStorage.setItem('level', level.toString());
}

function toggleHistory() {
  const historyContainer = document.getElementById('history-container');
  const toggleBtn = document.getElementById('toggle-history-btn');

  if (historyContainer.style.display === 'none') {
    historyContainer.style.display = 'block';
    toggleBtn.textContent = '📕 Hide Completed Tasks';
  } else {
    historyContainer.style.display = 'none';
    toggleBtn.textContent = '📜 Show Completed Tasks';
  }
}
function resetData() {
  const choice = prompt(`🧹 What would you like to reset?\n
  1 - Clear only active tasks
  2 - Clear only completed tasks (history)
  3 - Reset points and level
  4 - Clear EVERYTHING`);

  switch (choice) {
    case '1':
      tasks = [];
      displayTasks();
      saveData();
      alert("✅ Active tasks cleared.");
      break;

    case '2':
      completedTasks = [];
      updateHistory();
      saveData();
      alert("✅ Completed task history cleared.");
      break;

    case '3':
      points = 0;
      level = 1;
      updateLevel();
      pointsDisplay.textContent = points;
      saveData();
      alert("✅ Points and level reset.");
      break;

    case '4':
      if (confirm("⚠️ Are you sure you want to clear EVERYTHING?")) {
        tasks = [];
        completedTasks = [];
        points = 0;
        level = 1;
        localStorage.clear();
        displayTasks();
        updateHistory();
        updateLevel();
        pointsDisplay.textContent = points;
        alert("✅ Everything has been reset.");
      }
      break;

    default:
      alert("❌ Invalid choice. Please enter 1, 2, 3, or 4.");
  }
}
