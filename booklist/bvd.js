/* CLASSES
==================*/
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI {
    static addBookToList(book) {
        const bookEntryHTML = `
            <tr data-id="${book.isbn}"><td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.isbn}</td>
                <td><i class="fa fa-trash fa-1x delete"></i></td>
            </tr>`;
        bookList.insertAdjacentHTML('afterbegin', bookEntryHTML);
    }

    static delBookFromList(target) {
        target.parentElement.parentElement.remove();
    }

    static showAlert(message, error) {
        const alert = `<div class="alert ${error}">${message}</div>`;
        bookForm.insertAdjacentHTML("beforebegin", alert);
        setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }
}

class LS {
    static loadBooksFromLS() {
        let books;
        localStorage.getItem('books') === null ? books = [] : books = JSON.parse(localStorage.getItem('books'));
        books.forEach(book => UI.addBookToList(book));       
    }

    static addToLS(book) {
        let addNewBook = {
                title: book.title,
                author: book.author,
                isbn: book.isbn
            };

        let books;
        localStorage.getItem('books') === null ? books = [] : books = JSON.parse(localStorage.getItem('books'));
        books.push(addNewBook);
        localStorage.setItem('books', JSON.stringify(books));
    }

    static delFromLS(target) {
        const rowID = target.parentElement.parentElement.getAttribute('data-id');
        const LS = JSON.parse(localStorage.getItem('books'));
        LS.forEach((book, index) => book.isbn === rowID ? LS.splice(index, 1) : "");
        localStorage.setItem('books', JSON.stringify(LS));
    }
}


/* VARIABLES
==================*/
const bookForm = document.querySelector('#book-form');
const bookList = document.querySelector('#book-list');


/* EVENT LISTENERS
==================*/
// alternative: window.onload = LS.loadBooksFromLS();
window.addEventListener('DOMContentLoaded', LS.loadBooksFromLS());

bookForm.addEventListener('submit', e => {
    e.preventDefault();
    const book = new Book(bookForm.title.value, bookForm.author.value, bookForm.isbn.value);

    if(book) {
        UI.addBookToList (book);
        UI.showAlert(`The book "${book.title}" by ${book.author} is added successfully.`,'success');
        LS.addToLS(book);
        bookForm.reset();
    } else {
        UI.showAlert('Please check book info.', 'error');
    }    
});

bookList.addEventListener('click', e => {
    UI.delBookFromList(e.target);
    LS.delFromLS(e.target);
    UI.showAlert('Book is successfully removed from the list.', 'success');
});




