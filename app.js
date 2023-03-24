const plusIcon = document.querySelector(".plus-icon");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const bookForm = document.querySelector("form");
const bookList = document.querySelector(".book-list");
const genre = document.getElementById('genre')
let localLibrary

let myLibrary = [
  { title: "Galileo", author: "John", page: 100, genre: "bio" },
  { title: "Khalid ibn Walid", author: "Abu Ibrahim", page: 130, genre: "bio" },
];

function openModal() {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
}
function closeModal() {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
}
function addNewBook(e) {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const genre = document.getElementById("genre").value;
  const page = document.getElementById("page").value;

  const newBook = new Book(title, author, genre, page);
  localLibrary.push(newBook);
  localStorage.setItem("library", JSON.stringify(localLibrary))
  addBookToLibrary(newBook)
  closeModal();
}

// function styleBookItem(genre){
//   if(genre.includes('history')){
//     this.
//   }
// }

plusIcon.addEventListener("click", openModal);
overlay.addEventListener("click", closeModal);
bookForm.addEventListener("submit", (e) => addNewBook(e));

//object constructor
// function Book(title, author, genre, page) {
//   this.title = title;
//   this.author = author;
//   this.genre = genre;
//   this.page = page;
// }


//class function
class Book {
  constructor(title, author, genre, page) {
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.page = page;
  }
}

function addBookToLibrary(newBook) {
    const {title, author, genre, page} = newBook
    const html = `<div class="book-item">
        <h1>Title : ${title}</h1>
        <p>Author: ${author}</p>
        <p>Genre : ${genre}</p>
        <p>Page : ${page}</p>
        <div>
          <input type="checkbox" id="read">
          <label for="read">Read</label>
        </div>
    </div>`
    bookList.innerHTML += html
}


function renderBookList() {
  const jsonObj = localStorage.getItem("library")
  if(jsonObj){
    localLibrary = JSON.parse(jsonObj)
  }else{
    localLibrary = myLibrary
  }
  localLibrary.forEach((book) => {
    html = `<div class="book-item"><h1>Title: ${book.title}</h1>
        <p>Author: ${book.author}</p>
        <p>Genre : ${book.genre}</p>
        <p>Page : ${book.page} pages.</p>
          <div>
          <input type="checkbox" id="read">
          <label for="read">Read</label>
        </div>
      </div>
        `;
    bookList.insertAdjacentHTML("beforeend", html);
  });
}
window.onload = renderBookList();
