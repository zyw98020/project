// app.js
document.addEventListener('DOMContentLoaded', function() {
    // 待办事项列表
    if (window.location.pathname.includes('todo.html')) {
        const todoList = document.getElementById('todo-items');
        const newTodoInput = document.getElementById('new-todo');
        const addTodoButton = document.getElementById('add-todo');

        let todos = JSON.parse(localStorage.getItem('todos')) || [];
        displayTodos();

        addTodoButton.addEventListener('click', () => {
            const newTodo = newTodoInput.value.trim();
            if (newTodo) {
                todos.push(newTodo);
                localStorage.setItem('todos', JSON.stringify(todos));
                displayTodos();
                newTodoInput.value = '';
            }
        });

        function displayTodos() {
            todoList.innerHTML = '';
            todos.forEach((todo, index) => {
                const li = document.createElement('li');
                li.className = 'list-group-item d-flex justify-content-between align-items-center';
                li.textContent = todo;
                const deleteButton = document.createElement('button');
                deleteButton.className = 'btn btn-danger btn-sm';
                deleteButton.textContent = '删除';
                deleteButton.addEventListener('click', () => {
                    todos.splice(index, 1);
                    localStorage.setItem('todos', JSON.stringify(todos));
                    displayTodos();
                });
                li.appendChild(deleteButton);
                todoList.appendChild(li);
            });
        }
    }

    // 番茄钟
    if (window.location.pathname.includes('pomodoro.html')) {
        const timerDisplay = document.getElementById('timer-display');
        const startPomodoroButton = document.getElementById('start-pomodoro');
        const pausePomodoroButton = document.getElementById('pause-pomodoro');
        const resetPomodoroButton = document.getElementById('reset-pomodoro');

        let timeLeft = 25 * 60; // 25分钟倒计时
        let timerInterval;

        function startPomodoro() {
            clearInterval(timerInterval);
            timeLeft = 25 * 60;
            updateTimerDisplay();
            timerInterval = setInterval(() => {
                if (timeLeft <= 0) {
                    clearInterval(timerInterval);
                    alert("时间到！");
                } else {
                    timeLeft--;
                    updateTimerDisplay();
                }
            }, 1000);
            startPomodoroButton.disabled = true;
            pausePomodoroButton.disabled = false;
            resetPomodoroButton.disabled = false;
        }

        function pausePomodoro() {
            clearInterval(timerInterval);
            startPomodoroButton.disabled = false;
            pausePomodoroButton.disabled = true;
            resetPomodoroButton.disabled = false;
        }

        function resetPomodoro() {
            clearInterval(timerInterval);
            timeLeft = 25 * 60;
            updateTimerDisplay();
            startPomodoroButton.disabled = false;
            pausePomodoroButton.disabled = true;
            resetPomodoroButton.disabled = true;
        }

        function updateTimerDisplay() {
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            timerDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        }

        startPomodoroButton.addEventListener('click', startPomodoro);
        pausePomodoroButton.addEventListener('click', pausePomodoro);
        resetPomodoroButton.addEventListener('click', resetPomodoro);
    }

    // 日程表
    if (window.location.pathname.includes('calendar.html')) {
        const eventList = document.getElementById('event-list');
        const newEventTitleInput = document.getElementById('new-event-title');
        const newEventTimeInput = document.getElementById('new-event-time');
        const addEventButton = document.getElementById('add-event');

        let events = JSON.parse(localStorage.getItem('events')) || [];
        displayEvents();

        addEventButton.addEventListener('click', () => {
            const newEventTitle = newEventTitleInput.value.trim();
            const newEventTime = newEventTimeInput.value.trim();
            if (newEventTitle && newEventTime) {
                events.push({ title: newEventTitle, time: newEventTime });
                localStorage.setItem('events', JSON.stringify(events));
                displayEvents();
                newEventTitleInput.value = '';
                newEventTimeInput.value = '';
            }
        });

        function displayEvents() {
            eventList.innerHTML = '';
            events.forEach((event, index) => {
                const li = document.createElement('li');
                li.className = 'list-group-item d-flex justify-content-between align-items-center';
                li.textContent = `${event.title} - ${event.time}`;
                const deleteButton = document.createElement('button');
                deleteButton.className = 'btn btn-danger btn-sm';
                deleteButton.textContent = '删除';
                deleteButton.addEventListener('click', () => {
                    events.splice(index, 1);
                    localStorage.setItem('events', JSON.stringify(events));
                    displayEvents();
                });
                li.appendChild(deleteButton);
                eventList.appendChild(li);
            });
        }
    }
});