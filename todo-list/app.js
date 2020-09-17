

// VARIABLES
const addToDoForm = document.querySelector('form.add');
const toDoList = document.querySelector('ul.todos');
const search = document.querySelector('.search input');

window.addEventListener('load', e => {
    // checking the load event in windows
    // declaring variable to house the data from LS
    let tasks; 
    // on window load, checking the local storage if not empty    
    if (localStorage.getItem('tasks') !== null) {
        // JSON.parse(), to convert to javascript object
        tasks = JSON.parse(localStorage.getItem('tasks'));
        // looping throught the parsed data
        tasks.forEach(task => {
            // call to function to display values to UI
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
        // insertAdjacentHTML() => very handy when inserting template literals
    toDoList.insertAdjacentHTML('afterbegin', html);
}

const addToLS = newToDo => {
    // initializaing a variable to contain the LS data
    let tasks; 
    // check to see if LS is empty, ternary operation for if
    // if no data with key 'tasks' in LS, we create and empty array to hold the push or data
    // if data with key 'tasks' exists, parse the data and assign to 'tasks' variable
    localStorage.getItem('tasks') === null ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks'));
    // either way, we push the new data to the 'tasks' variable
    tasks.push(newToDo);
    // after push, set the data back to string by JSON.stringify()
    // then, overwrite the key 'tasks' with new values
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

const removeFromLS = () => {
    // initializaing a variable 'tasks' with empty array, 
    // this will contain the new value using push()
    let tasks = [];
    // looping throug the tasks, getting only the trim() textContent and pushing to variable 'tasks'
    Array.from(toDoList.children).forEach(task => tasks.push(task.textContent.trim()));
    // overwriting the LS with updated value of the list of tasks
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

const filterSearch = searchTerm => {
    // looping through the children element of toDoList
    // conversting them to array as they are HTML collection
    // method chaining for array methods
    Array.from(toDoList.children)
        // .filter() => array method to filter based on condition
        .filter(todo => !todo.textContent.toLowerCase().includes(searchTerm))
        // looping through the filtered data and adding .filtered class to each
        .forEach(todo => todo.classList.add('filtered'));

    // to re-filter the array, just in case search term is changed
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
    // listen for the event in the search input form, & 
    // get the search term, trim() it and set toLowerCase()
    let searchTerm = search.value.trim().toLowerCase();

    // call to function 'filterSearch'
    filterSearch(searchTerm);
});


