// VARIABLES
const addToDoForm = document.querySelector('form.add');
const toDoList = document.querySelector('ul.todos');
const search = document.querySelector('.search input');

window.addEventListener('load', e => {
    let tasks;
    if (localStorage.getItem('tasks') !== null) {
        tasks = JSON.parse(localStorage.getItem('tasks'));
        tasks.forEach(task => {
            insertHTML(task);
        })
    }
});


// FUNCTIONS
const insertHTML = toDo => {
    let html = `
        <li class="list-group-item d-flex justify-content-between align-items-center">
            <span>${toDo}</span>
            <i class="far fa-trash-alt delete"></i>
        </li>`;
    toDoList.insertAdjacentHTML('afterbegin', html);
}

const addToLS = newToDo => {
    let tasks;
    localStorage.getItem('tasks') === null ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.push(newToDo);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

const removeFromLS = () => {
    let tasks = [];
    Array.from(toDoList.children).forEach(task => tasks.push(task.textContent.trim()));
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

const filterSearch = searchTerm => {
    Array.from(toDoList.children)
        .filter(todo => !todo.textContent.toLowerCase().includes(searchTerm))
        .forEach(todo => todo.classList.add('filtered'));

    Array.from(toDoList.children)
        .filter(todo => todo.textContent.toLowerCase().includes(searchTerm))
        .forEach(todo => todo.classList.remove('filtered'));
};


// EVENT LISTENERS
addToDoForm.addEventListener('submit', e => {
    e.preventDefault();

    let newToDo = addToDoForm.add.value.trim();

    if (newToDo.length >= 3) {
        insertHTML(newToDo);
        addToLS(newToDo);
        addToDoForm.reset();
    } else {
        alert('Please add a note.');
    }
});

toDoList.addEventListener('click', e => {
    e.stopPropagation();
    e.target.classList.contains('delete') ? e.target.parentElement.remove() : "";
    removeFromLS();
});

search.addEventListener('keyup', e => {
    let searchTerm = search.value.trim().toLowerCase();
    filterSearch(searchTerm);
});