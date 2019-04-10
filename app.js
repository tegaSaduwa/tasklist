const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//load eventlisteners
loadEventListeners();

//load all eventListeners
function loadEventListeners () {
  //DOM load event
  document.addEventListener('DOMContentLoaded', getTasks);
  //add task
  form.addEventListener('submit', addTask);
  //remove task
  taskList.addEventListener('click', removeTask);
  //clear task
  clearBtn.addEventListener('click', clearTask);
  //filter task
  filter.addEventListener('keyup', filterTask);

}
//get task and store in ls
function getTasks () {
  let tasks;
  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  }else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function (task) {
   //create li
  const li = document.createElement('li');
  //add a class
  li.className = 'collection-item';
  //create textnode and append to li
  li.appendChild(document.createTextNode(task));
  //add delete link
  const link =  document.createElement('a');
  //add class
  link.className = 'delete-item secondary-content';
  //add the icon to the link delete button
  link.innerHTML = `<span> x </span>`;
  //add link to li
  li.appendChild(link);
  //append li to ul;
  taskList.appendChild(li);
  
  });
}

function addTask (e) {

    e.preventDefault();
    

    if(taskInput.value === '') {

      //add task
      
    }

  //create li
  const li = document.createElement('li');
  //add a class
  li.className = 'collection-item';
  //create textnode and append to li
  li.appendChild(document.createTextNode(taskInput.value));
  //add delete link
  const link =  document.createElement('a');
  //add class
  link.className = 'delete-item secondary-content';
  //add the icon to the link delete button
  link.innerHTML = `<span> x </span>`;
  //add link to li
  li.appendChild(link);
  //append li to ul;
  taskList.appendChild(li);
  //store task in ls
  storeTaskInLocalStorage(taskInput.value);
  //clear input
  taskInput.value = '';


}

//store task
function storeTaskInLocalStorage(task) {
  let tasks;
  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  }else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);

  localStorage.setItem('tasks',JSON.stringify(tasks));

}

function removeTask (e) {
  
  if(e.target.parentElement.classList.contains('delete-item')) {
      
    if(confirm('are you sure?')) {
      e.target.parentElement.parentElement.remove();
        console.log(e.target.parentElement.parentElement);
    //remove task from ls
    removeTaskFromLs(e.target.parentElement.parentElement);

    }
    
  }

}

//remove task from ls
function removeTaskFromLs (taskItem) {
  let tasks;
  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  }else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function (task, index) {
    if(taskItem.textContent === task)  {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));

}

function clearTask () {

    taskList.innerHTML= '';

    //clear task from ls
    clearTaskFromLs();

}

//clear task from ls
function clearTaskFromLs() {
  localStorage.clear();
}

function filterTask (e) {

    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(function (task) {

      let item = task.firstChild.textContent;

      if(item.toLowerCase().indexOf(text) != -1){

            task.style.display = 'block';

      }else {

            task.style.display = 'none';

      }


    });

  

}