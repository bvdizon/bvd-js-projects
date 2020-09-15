// VARIABLES
const addToDoForm = document.querySelector('form.add');
const toDoList = document.querySelector('ul.todos');
const search = document.querySelector('.search input');


// FUNCTIONS
const addToDo = newToDo => {
    let html = `
        <li class="list-group-item d-flex justify-content-between align-items-center">
            <span>${newToDo}</span>
            <i class="far fa-trash-alt delete"></i>
        </li>`;    

    toDoList.insertAdjacentHTML('afterbegin', html);
};

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
    newToDo.length ? addToDo(newToDo) : alert('Please add a note.');
    addToDoForm.reset();
    
});

toDoList.addEventListener('click', e => {
    e.stopPropagation();
    if(e.target.classList.contains('delete')) {        
        e.target.parentElement.remove();
    }
});

search.addEventListener('keyup', e => {
    let searchTerm = search.value.trim().toLowerCase();
    filterSearch(searchTerm);
});




