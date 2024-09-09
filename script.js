// script.js

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('todo-form');
    const input = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
    const filters = document.querySelectorAll('.filters button');
    
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    function renderTasks(filter) {
        taskList.innerHTML = '';
        const filteredTasks = tasks.filter(task => {
            if (filter === 'active') return !task.completed;
            if (filter === 'completed') return task.completed;
            return true;
        });
        filteredTasks.forEach(task => {
            const li = document.createElement('li');
            li.className = task.completed ? 'completed' : '';
            li.innerHTML = `
                <span>${task.text}</span>
                <button class="complete">${task.completed ? 'Desmarcar' : 'Concluir'}</button>
                <button class="delete">Excluir</button>
            `;
            taskList.appendChild(li);

            li.querySelector('.complete').addEventListener('click', () => {
                task.completed = !task.completed;
                saveTasks();
                renderTasks(filter);
            });

            li.querySelector('.delete').addEventListener('click', () => {
                tasks = tasks.filter(t => t !== task);
                saveTasks();
                renderTasks(filter);
            });
        });
    }

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const taskText = input.value.trim();
        if (taskText) {
            tasks.push({ text: taskText, completed: false });
            input.value = '';
            saveTasks();
            renderTasks('all');
        }
    });

    filters.forEach(button => {
        button.addEventListener('click', () => {
            filters.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            renderTasks(button.id);
        });
    });

    renderTasks('all');
});
