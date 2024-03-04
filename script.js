const tasksList = document.getElementById('tasks-list');
const newTaskInput = document.getElementById('new-task');
const addTaskButton = document.getElementById('add-task');
const toggleCheckbox = document.getElementById('toggle');

const storedTasks = localStorage.getItem('tasks');
if (storedTasks) {
  tasksList.innerHTML = storedTasks;
}

function createTaskItem(task) {
  const listItem = document.createElement('li');
  listItem.classList.add('task'); // Add a class for easier styling

  const taskText = document.createElement('span');
  taskText.innerText = task;
  listItem.appendChild(taskText);

  const completeButton = document.createElement('button');
  completeButton.classList.add('complete-btn'); // Add a class for styling
  completeButton.innerHTML = '<span class="material-icons">check</span>';
  completeButton.addEventListener('click', () => {
    listItem.classList.toggle('completed');
  });

  const deleteButton = document.createElement('button');
  deleteButton.classList.add('delete-btn'); // Add a class for styling
  deleteButton.innerHTML = '<span class="material-icons">delete</span>';
  deleteButton.addEventListener('click', () => {
    tasksList.removeChild(listItem);
    saveTasks(); // Update local storage when an item is deleted
  });

  listItem.appendChild(completeButton);
  listItem.appendChild(deleteButton);

  return listItem;
}


addTaskButton.addEventListener('click', () => {
  const newTask = newTaskInput.value.trim();
  if (newTask) {
    const listItem = createTaskItem(newTask);
    tasksList.appendChild(listItem);
    newTaskInput.value = '';
    saveTasks(); // Save tasks to local storage
  }
});

toggleCheckbox.addEventListener('change', () => {
  const body = document.body;
  const app = document.getElementById('app');
  body.classList.toggle('dark');
  app.classList.toggle('dark');
});

function saveTasks() {
  const tasks = Array.from(tasksList.querySelectorAll('li'))
    .map(item => item.innerText.trim())
    .join('\n');
  localStorage.setItem('tasks', tasks);
}
