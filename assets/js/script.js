const inputTask = document.querySelector('.input-task'); 
const tasks = document.querySelector('.tasks');
const btnTask = document.querySelector('.btn-task');

function createLi() {
  const li = document.createElement('li');
  return li;
}

inputTask.addEventListener('keypress', function(e) {
if(e.keyCode === 13){
  if(!inputTask.value) return;
  createTask(inputTask.value);
  cleanInput()
}
});

function cleanInput(){
  inputTask.value = '';
  inputTask.focus();
}

function crateDeleteButton(li){
  li.innerText += ' ';
  const deleteButton = document.createElement('button');
  deleteButton.innerText = 'Delete';
  deleteButton.setAttribute('class', 'Delete');
  li.appendChild(deleteButton);
}


function createTask(inputText) {
 const li = createLi();
  li.innerText = inputText;
  tasks.appendChild(li);
  crateDeleteButton(li)
  saveTask();
}



btnTask.addEventListener('click',function(){
  if(!inputTask.value) return;
  createTask(inputTask.value);
  cleanInput()
});

document.addEventListener('click', function(e) {
  const element = e.target;
  if(element.classList.contains('Delete')) {
   element.parentElement.remove();
   saveTask();
  }
});

function saveTask(){
  const liTask = tasks.querySelectorAll('li');
  const toDoList = [];

  for (let task of liTask){
    let textTask = task.innerText;
    textTask = textTask.replace('Delete', '').trim();
    toDoList.push(textTask);
  }

  const taskJSON = JSON.stringify(toDoList);
  console.log(taskJSON);
  localStorage.setItem('task', taskJSON);
}

function addSavedTask(){
  const tasks = localStorage.getItem('task');
  const toDoList = JSON.parse(tasks);
  
  for(let task of toDoList) {
    createTask(task);
  }
}
addSavedTask();