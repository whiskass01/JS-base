document.addEventListener('DOMContentLoaded',()=> {
    loadTasks();
});
function loadTasks(){
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskList= document.getElementById('taskList');
    tasks.forEach(task=>{
        const li = document.createElement('li');
        li.innerHTML=`
        <span id= "name" >${task[0]}</span>
        <button onclick="editTask(this)">Редактировать</button>
   <span id = "complete">${task[1]}</span>
   <button onclick="editComplete(this)">Выполнено</button>
   <button onclick="deleteTask(this)">Удалить</button>`;
   const taskComplete= li.querySelector('#complete').textContent.trim();
   if (taskComplete == "Выполнено"){
    const taskText =li.querySelector('#name').textContent;
    li.querySelector('#name').innerHTML= `<del>${taskText}<del>`
   };
   taskList.appendChild(li);
    });
    filterTasks();
}
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();
    const taskComplete = 'Не выполнено'.trim();

    if (taskText === '') return;
    const taskList = document.getElementById('taskList');
    const li = document.createElement('li');
    li.innerHTML = `
            <span id = "name" class = "name">${taskText}</span>
            <button onclick = "editTask(this)">Редактировать название</button>
            <span id = "complete">${taskComplete} </span>
            <button onclick = "editComplete(this)">Отметка о выполнении</button>
            <button onclick = "deleteTask(this)">Удалить</button>
        `;

    taskList.appendChild(li);
    saveTasks();
    taskInput.value = "";
    filterTasks();
}

function saveTasks() {
    const taskList = document.getElementById('taskList');
    const tasks = Array.from(taskList.children).map(li => [li.querySelector('#name').textContent.trim(), li.querySelector('#complete').textContent.trim()]);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function deleteTask(button) {
    const li = button.parentElement;
    li.remove();
    saveTasks();
    filterTasks();
}

function editTask(button) {
    const li = button.parentElement;
    const taskText = li.querySelector('#name').textContent.trim();
    const taskComplete = li.querySelector('#complete').textContent.trim();
    const newTaskText = prompt("Редактировать задачу", taskText);

    if (newTaskText !== null && newTaskText.trim() !== "") {
        li.querySelector('#name').textContent = newTaskText.trim();
        saveTasks();
        filterTasks();
    }
    if (taskComplete == "Выполнено") {
        const taskText = li.querySelector('#name').textContent
        li.querySelector('#name').innerHTML = `<del>${taskText}</del>`
    };
}

function editComplete(button) {
    const li = button.parentElement;
    const taskComplete = li.querySelector('#complete').textContent;
    if (taskComplete !== "Не выполнено") {
        li.querySelector('#complete').textContent = "Выполнено";
        const taskText = li.querySelector('#name').textContent
        li.querySelector('#name').innerHTML = `<del>${taskText}</del>`;
    }
    saveTasks();
    filterTasks();
}

function filterTasks() {
    const filterInput = document.getElementById('filterInput');
    const filterText = filterInput.value;
    const taskList = document.getElementById('taskList');

    Array.from(taskList.children).forEach(li => {
        const taskText = li.querySelector('#complete').textContent;
        if (taskText.includes(filterText)) {
            li.style.display = "";
        } else {
            li.style.display = 'none';
        }
    })
}

document.addEventListener('DOMContentLoaded', () => {
    const taskList = document.getElementById('taskList');

    Array.from(taskList.children).forEach(li => {
        const taskText = li.querySelector('#name').textContent;
        const taskComplete = li.querySelector('#complete').textContent.trim();
        li.addEventListener('dblclick', () => {
            const newTaskText = prompt("Редактировать задачу", taskText);

            if (newTaskText !== null && newTaskText.trim() !== "") {
                li.querySelector('#name').textContent = newTaskText.trim();
                saveTasks();
                filterTasks();
                if (taskComplete == "Выполнено") {
                    const taskText = li.querySelector('#name').textContent
                    li.querySelector('#name').innerHTML = `<del>${taskText}</del>`
                };
            };
        });
    });
});
