const tabMenu = document.querySelectorAll('.tab-menu button');
tabMenu.forEach(menu => {
    menu.addEventListener('click', () => {
        tabMenu.forEach(menu => {
            if (menu.classList.contains('tab-active')) {
                menu.classList.remove('tab-active');
            };
        });
        menu.classList.add('tab-active');
    });
});

const formTask = document.querySelector('.form-task');
const taskInput = document.querySelector('.task-input');
const totalTask = document.querySelector('.total-task');
const totalTodo = document.querySelector('.total-todo');
const totalDone = document.querySelector('.total-done');
const btnAllTask = document.querySelector('.btn-all-task');
const btnTodo = document.querySelector('.btn-todo');
const btnDone = document.querySelector('.btn-done');
const toastPopup = document.querySelector('.toast-popup');

const tasksStorage = localStorage.getItem('task-list') ? JSON.parse(localStorage.getItem('task-list')) : [];

let updatedTaskIndex = -1;

window.onload = function () {
    displayTaskList();
    taskInput.focus();
};

formTask.addEventListener('submit', (e) => {
    if (taskInput.value.trim() == '') {
        toastPopup.classList.add('show-toast');
        toastPopup.innerHTML = 'Task cannot be empty';
        setTimeout(function () {
            toastPopup.classList.remove('show-toast');
        }, 3000);

        e.preventDefault();
    } else if (updatedTaskIndex !== -1) {
        updateTaskIndex();
    } else {
        createNewTask(taskInput);
    };
});

function createNewTask(taskInput) {
    tasksStorage.push(taskInput.value);
    localStorage.setItem('task-list', JSON.stringify(tasksStorage));
    location.reload();
};

function displayTaskList() {
    let tasks = '';

    if (tasksStorage.length === 0) {
        tasks +=
            `
            <div class="task-notification">
                <i class="fa-solid fa-clipboard-list"></i>
                <br>
                <p>No anything task yet</p>
            </div>
            `
        document.querySelector('.wrapper-task').innerHTML = `${tasks}`;
    } else {
        for (let i = 0; i < tasksStorage.length; i++) {
            tasks +=
                `
                <li>
                    <span class="task-list">
                        <input type="checkbox" class="checkbox" style="margin-right: .5em;">
                        <p>${tasksStorage[i]}</p>
                    </span>
                    <span class="menu-action">
                        <i class="fa-solid fa-pen-to-square btn-edit-task" style="margin-right: .75em;"></i>
                        <i class="fa-solid fa-trash-can btn-delete-task"></i>
                    </span>
                </li>
                `
        };
        document.querySelector('.wrapper-task').innerHTML = `${tasks}`;
        document.querySelector('.total-task').innerHTML = tasksStorage.length;

        const checkboxes = document.querySelectorAll('.checkbox');
        checkboxes.forEach((checkbox, i) => {
            checkbox.addEventListener('change', () => {
                if (checkbox.checked) {
                    localStorage.setItem(`check-state-${i}`, true);
                    location.reload();
                } else {
                    localStorage.removeItem(`check-state-${i}`);
                    location.reload();
                };
            });
        });

        function loadCheckStateSaved() {
            checkboxes.forEach((checkbox, i) => {
                const checkStateSaved = localStorage.getItem(`check-state-${i}`);
                if (checkStateSaved) {
                    checkbox.checked = true;
                } else {
                    checkbox.checked = false;
                };
            });
        };
        loadCheckStateSaved();

        function countUpdatedTotalTask() {
            const currentTotalTodo = Array.from(checkboxes).filter(checkbox => !checkbox.checked);
            const currentTotalDone = Array.from(checkboxes).filter(checkbox => checkbox.checked);

            totalTodo.innerHTML = currentTotalTodo.length;
            totalDone.innerHTML = currentTotalDone.length;
        };
        countUpdatedTotalTask();

        btnAllTask.addEventListener('click', () => {
            checkboxes.forEach(checkbox => {
                checkbox.closest('li').style.display = 'flex';
            });
        });

        btnTodo.addEventListener('click', () => {
            checkboxes.forEach(checkbox => {
                if (checkbox.checked) {
                    checkbox.closest('li').style.display = 'none';
                } else {
                    checkbox.closest('li').style.display = 'flex';
                };
            });
        });

        btnDone.addEventListener('click', () => {
            checkboxes.forEach(checkbox => {
                if (!checkbox.checked) {
                    checkbox.closest('li').style.display = 'none';
                } else {
                    checkbox.closest('li').style.display = 'flex';
                };
            });
        });
    };
    activateBtnEdit();
    activateBtnDelete();
    activateBtnClearAllTask();
};

function activateBtnEdit() {
    const btnEditTask = document.querySelectorAll('.btn-edit-task');

    btnEditTask.forEach((edit, i) => {
        edit.addEventListener('click', () => {
            let taskIndex = edit.closest('li').textContent;
            taskInput.focus();

            editTaskIndex(taskIndex, i);
        });
    });
};

function editTaskIndex(taskIndex, i) {
    taskInput.value = taskIndex.trim();
    updatedTaskIndex = i;
};

function updateTaskIndex() {
    if (updatedTaskIndex !== -1) {
        tasksStorage[updatedTaskIndex] = taskInput.value;
        updatedTaskIndex = -1;

        saveUpdatedTaskIndex();
    };
};

function saveUpdatedTaskIndex() {
    localStorage.setItem('task-list', JSON.stringify(tasksStorage));
    location.reload();
};

function activateBtnDelete() {
    const btnDeleteTask = document.querySelectorAll('.btn-delete-task');

    btnDeleteTask.forEach((del, i) => {
        del.addEventListener('click', () => {
            deleteTaskIem(i);
        });
    });
};

function deleteTaskIem(i) {
    tasksStorage.splice(i, 1);
    localStorage.setItem('task-list', JSON.stringify(tasksStorage));
    localStorage.removeItem(`check-state-${i}`);
    location.reload();
};

function activateBtnClearAllTask() {
    const btnClearAllTasks = document.querySelector('.btn-clear-all-tasks');

    btnClearAllTasks.addEventListener('click', () => {
        if (tasksStorage.length === 0) {
            toastPopup.classList.add('show-toast');
            toastPopup.innerHTML = 'You don\'t have anything task to clear';
            setTimeout(function () {
                toastPopup.classList.remove('show-toast');
            }, 3000);
        } else {
            localStorage.removeItem('task-list');

            const checkboxes = document.querySelectorAll('.checkbox');
            checkboxes.forEach((checkbox, i) => {
                if (checkbox.checked) {
                    localStorage.removeItem(`check-state-${i}`);
                };
            });

            location.reload();
        };
    });
};