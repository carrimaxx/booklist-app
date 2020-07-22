// Book Class
class Book {
    constructor(title, author, status, review){
        this.title = title;
        this.author = author;
        this.status = status;
        this.review = review;
    }
}

// UI class
class UI {
    static displayBooks(){ //this class' method only
        const books = Store.getBooks();

        books.forEach((book) => UI.addBookToList(book));
    }
    static addBookToList(book){
        //target tbody 
        const list = document.getElementById('book-list');

        // Create table row or tr
        const row = document.createElement('tr');
        //insert th later for numbers
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.status}</td>
        <td>${book.review}</td>
        <td><a href="#" class="btn btn-sm delete"><i class="fas fa-backspace delete"></i></a></td>
        `;
        // append row to list
        list.appendChild(row);
    }

    static deleteBook(el){
        if(el.classList.contains('delete')){
            el.parentElement.parentElement.parentElement.remove(); //tr
        }
    }

    static showAlert(message, className){
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const inputSection = document.querySelector('.input-section');
        const form = document.querySelector('#book-form');
        inputSection.insertBefore(div, form);

        // Remove alert after ** seconds
        setTimeout(() => document.querySelector('.alert').remove(), 2500)
    }

    static clearFields(){
        // document.querySelector('.title-input').value = '';
        // document.querySelector('.author-input').value = '';
        // document.querySelector('.status-input').value = '';
        // document.querySelector('.review-input').value = '';
        document.getElementById("book-form").reset();
    }
}

// Local Storage
class Store {
    static getBooks(){
        let books;
        if(localStorage.getItem('books') === null){
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }
    
        return books;
    }

    static addBook(book){
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }
    static removeBook(title){
        const books = Store.getBooks();
        books.forEach((book, index) => {
            if(book.title === title){
                books.splice(index, 1);
            }
        });
        localStorage.setItem('books', JSON.stringify(books));
    }
}


// Event Listeners
    // when page loads, view book list
    document.addEventListener('DOMContentLoaded', UI.displayBooks);
    // Add a Book
    document.addEventListener('submit', (e) => {
    // prevent default submit
    e.preventDefault();
    // Get form values
    const title = document.querySelector('.title-input').value;
    const author = document.querySelector('.author-input').value;
    const status = document.querySelector('.status-input').value;
    const review = document.querySelector('.review-input').value;


    //form validation
    if(title === '' || author === ''){
        UI.showAlert("Don't forget the title and author!", "light");
    } else {
    // add to class Book(instatiate)
        const book = new Book(title, author, status, review);
        console.log(book);

        //add Book to UI
        UI.addBookToList(book);

        // add book to local storage
        Store.addBook(book);
        
        //show success message
        UI.showAlert('Book added to my list', 'light');

        //clear fields
        UI.clearFields();
    } //else statement
});


  //DELETE BOOKS
    // Delete a Book from UI
    document.querySelector('#book-list').addEventListener('click', (e) => {
    UI.deleteBook(e.target);

    // Delete book from local storage 
    Store.removeBook(e.target.parentElement.parentElement.parentElement.firstElementChild.innerText);

    //show alert that book is removed
    UI.showAlert('Book removed from list', 'light');
});