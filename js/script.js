
// Translation
const translations = {
    en: {
        title: 'Daily Todo List',
        previousDay: 'Previous Day',
        nextDay: 'Next Day',
        addButton: 'Add',
        inputPlaceholder: 'Enter a new task...',
        deleteButton: 'Delete',
        statusPending: 'Pending',
        statusInProgress: 'In Progress',
        statusCompleted: 'Completed'
    },
    zh: {
        title: '每日待办事项',
        previousDay: '前一天',
        nextDay: '后一天',
        addButton: '添加',
        inputPlaceholder: '输入新任务...',
        deleteButton: '删除',
        statusPending: '待处理',
        statusInProgress: '进行中',
        statusCompleted: '已完成'
    }
};

let currentLanguage = 'en';

function switchLanguage(lang) {
    currentLanguage = lang;
    document.getElementById('en-btn').classList.toggle('active', lang === 'en');
    document.getElementById('zh-btn').classList.toggle('active', lang === 'zh');
    updateInterface();
}

function updateInterface() {
    const t = translations[currentLanguage];
    
    // Update title
    document.querySelector('h1').textContent = t.title;
    
    // Update button text
    document.querySelector('.date-navigation button:first-child').textContent = t.previousDay;
    document.querySelector('.date-navigation button:last-child').textContent = t.nextDay;
    
    // Update input placeholder
    document.getElementById('taskInput').placeholder = t.inputPlaceholder;
    
    // Update add placeholder
    document.querySelector('.input-container button').textContent = t.addButton;
    
    // Update status selector
    const statusSelect = document.getElementById('statusSelect');
    statusSelect.innerHTML = `
        <option value="pending">${t.statusPending}</option>
        <option value="in-progress">${t.statusInProgress}</option>
        <option value="completed">${t.statusCompleted}</option>
    `;
    
    // Update status selector
    renderTasks();
}

// Current selected date
let currentDate = new Date();

// Load tasks from local storage
function loadTasks(dateStr) {
    const stored = localStorage.getItem(`tasks_${dateStr}`);
    return stored ? JSON.parse(stored) : [];
}

// Save tasks to local storage
function saveTasks(dateStr, tasks) {
    localStorage.setItem(`tasks_${dateStr}`, JSON.stringify(tasks));
}

// Format date to YYYY-MM-DD
function formatDate(date) {
    return date.toISOString().split('T')[0];
}

// Change current date
function changeDate(days) {
    currentDate.setDate(currentDate.getDate() + days);
    updateDateDisplay();
    renderTasks();
}

// Update date display in header
function updateDateDisplay() {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('currentDate').textContent = currentDate.toLocaleDateString('en-US', options);
}

// Render task list
function renderTasks() {
    const dateStr = formatDate(currentDate);
    const tasks = loadTasks(dateStr);
    const todoTiles = document.getElementById('todoTiles');
    const t = translations[currentLanguage];
    
    todoTiles.innerHTML = `
        <div class="todo-tile">
            <h2>${dateStr}</h2>
            <ul id="taskList">
                ${tasks.map((task, index) => `
                    <li>
                        <span class="task-number">${index + 1}.</span>
                        <span class="${task.status === 'completed' ? 'completed' : ''}" 
                              onclick="toggleTask(${index})">
                            ${task.text}
                        </span>
                        <span class="status-badge status-${task.status}">
                            ${translations[currentLanguage]['status' + task.status.charAt(0).toUpperCase() + task.status.slice(1).replace('-', '')]}
                        </span>
                        <button class="delete-btn" onclick="deleteTask(${index})">${t.deleteButton}</button>
                    </li>
                `).join('')}
            </ul>
        </div>
    `;
}

// Add new task
function addTask() {
    const input = document.getElementById('taskInput');
    const statusSelect = document.getElementById('statusSelect');
    const text = input.value.trim();
    const dateStr = formatDate(currentDate);
    
    if (text) {
        const tasks = loadTasks(dateStr);
        tasks.push({
            text: text,
            status: statusSelect.value,
            created: new Date().toISOString()
        });
        
        saveTasks(dateStr, tasks);
        input.value = '';
        renderTasks();
    }
}

// Toggle task status
function toggleTask(index) {
    const dateStr = formatDate(currentDate);
    const tasks = loadTasks(dateStr);
    const statusOrder = ['pending', 'in-progress', 'completed'];
    const currentStatusIndex = statusOrder.indexOf(tasks[index].status);
    tasks[index].status = statusOrder[(currentStatusIndex + 1) % statusOrder.length];
    
    saveTasks(dateStr, tasks);
    renderTasks();
}

// Delete task
function deleteTask(index) {
    const dateStr = formatDate(currentDate);
    const tasks = loadTasks(dateStr);
    tasks.splice(index, 1);
    saveTasks(dateStr, tasks);
    renderTasks();
}

// Listen for Enter key
document.getElementById('taskInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTask();
    }
});

document.addEventListener('DOMContentLoaded', function() {
    switchLanguage('en');
    updateDateDisplay();
    renderTasks();
});
// Initialize the app
updateDateDisplay();