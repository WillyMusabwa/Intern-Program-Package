const taskInput = document.getElementById('taskTitle');
const taskIdInput = document.getElementById('taskId');
const saveBtn = document.getElementById('saveBtn');
const taskList = document.getElementById('taskList');
const errorMsg = document.getElementById('errorMsg');

const timeModal = document.getElementById('timeModal');
const timeInput = document.getElementById('timeInput');
const confirmTimeBtn = document.getElementById('confirmTimeBtn');
const cancelTimeBtn = document.getElementById('cancelTimeBtn');

let tasks = [];
let currentTaskIdToComplete = null;
document.addEventListener('DOMContentLoaded', () => {
    const storedTasks = localStorage.getItem('myTasks');
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
        renderTasks();
    }
});
function saveTask() {
    const title = taskInput.value.trim();
    const id = taskIdInput.value;

    if (!title) {
        errorMsg.classList.remove('hidden');
        return;
    }
    errorMsg.classList.add('hidden');
    if (id) {
        const index = tasks.findIndex(t => t.id == id);
        if (index > -1) {
            tasks[index].title = title;
        }
        taskIdInput.value = ''; 
        saveBtn.textContent = 'Add Task';
    } else {
        const newTask = {
            id: Date.now(),
            title: title,
            isDone: false,
            timeSpent: 0
        };
        tasks.push(newTask);
    }
    updateLocalStorage();
    renderTasks();
    taskInput.value = '';
}
function deleteTask(id) {
    if(confirm('Are you sure you want to delete this task?')) {
        tasks = tasks.filter(t => t.id !== id);
        updateLocalStorage();
        renderTasks();
    }
}

function prepareEdit(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        taskInput.value = task.title;
        taskIdInput.value = task.id;
        saveBtn.textContent = 'Update Task';
        taskInput.focus();
    }
}
function triggerComplete(id) {
    const task = tasks.find(t => t.id === id);

    if (task.isDone) {
        task.isDone = false;
        task.timeSpent = 0;
        updateLocalStorage();
        renderTasks();
    } else {
        currentTaskIdToComplete = id;
        timeInput.value = ''; 
        timeModal.classList.remove('hidden');
        timeInput.focus();
    }
}
function confirmCompletion() {
    const minutes = parseInt(timeInput.value);
    if (!minutes || minutes < 0) {
        alert("Please enter a valid number of minutes.");
        return;
    }
    const index = tasks.findIndex(t => t.id === currentTaskIdToComplete);
    if (index > -1) {
        tasks[index].isDone = true;
        tasks[index].timeSpent = minutes;
        updateLocalStorage();
        renderTasks();
    }
    closeModal();
}
function closeModal() {
    timeModal.classList.add('hidden');
    currentTaskIdToComplete = null;
}
function updateLocalStorage() {
    localStorage.setItem('myTasks', JSON.stringify(tasks));
}
function renderTasks() {
    taskList.innerHTML = '';   
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = `task-item ${task.isDone ? 'done' : ''}`;
        
        li.innerHTML = `
            <div class="task-info">
                <span class="task-title">${escapeHtml(task.title)}</span>
                ${task.isDone ? `<span class="time-badge">${task.timeSpent} mins</span>` : ''}
            </div>
            <div class="actions">
                <button class="btn-done" onclick="triggerComplete(${task.id})">
                    ${task.isDone ? 'Undo' : 'Done'}
                </button>
                <button class="btn-edit" onclick="prepareEdit(${task.id})" ${task.isDone ? 'disabled' : ''}>Edit</button>
                <button class="btn-delete" onclick="deleteTask(${task.id})">Delete</button>
            </div>
        `;
        taskList.appendChild(li);
    });
}
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
saveBtn.addEventListener('click', saveTask);
confirmTimeBtn.addEventListener('click', confirmCompletion);
cancelTimeBtn.addEventListener('click', closeModal);
taskInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') saveTask();
});