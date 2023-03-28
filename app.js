const plusIcon = document.querySelector(".plus-icon");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const bookForm = document.querySelector("form");
let bookList = document.querySelector(".book-list");
const genre = document.getElementById("genre");
const bookItems = document.querySelectorAll('input[type="checkbox"]');

let myLibrary = getStorage("library") || [];

function openModal() {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
}
function closeModal() {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
}
function addBookToLibrary(e) {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const page = document.getElementById("page").value;
  const isRead = document.querySelector('input[type="checkbox"]').checked;
  const newBook = new Book(title, author, page, isRead);
  newBook.updateRead
  console.log(newBook);
  myLibrary.push(newBook);
  setStorage("library", myLibrary);
  renderBookList();
  closeModal();
  bookForm.reset()
}
plusIcon.addEventListener("click", openModal);
overlay.addEventListener("click", closeModal);
bookForm.addEventListener("submit", (e) => addBookToLibrary(e));

class Book {
  constructor(title, author, page, isRead = false) {
    this.title = title;
    this.author = author;
    this.page = page;
    this.isRead = isRead;
  }
}

function updateRead(index) {
  const currentBook = myLibrary[index]
  if(!!currentBook.isRead){
    currentBook.isRead = false
  }else{
    currentBook.isRead = true
  }  
  setStorage("library", myLibrary)
  renderBookList();
}

function renderBookList() {
  bookList.innerHTML = "";
  myLibrary.forEach((book, index) => {
    html = `<div class="book-item"><h1>Title: ${book.title}</h1>
        <p>Author: ${book.author}</p>
        <p>Page : ${book.page} pages.</p>
          <div>
            <p onclick="updateRead(${index})" class=${book.isRead ? "read" : "not-read"}>${
      book.isRead ? "Read" : "Not Read"}</p>
          </div>
          <button onclick="removeBook(${index})" class="remove">Remove</button>
      </div>
        `;
    bookList.insertAdjacentHTML("beforeend", html);
  });
}
function removeBook(index) {
  myLibrary.splice(index, 1);
  setStorage("library", myLibrary);
  renderBookList();
}
function setStorage(key = "library", value) {
  localStorage.setItem(key, JSON.stringify(value));
}
function getStorage(key = "library") {
  return JSON.parse(localStorage.getItem(key));
}
window.onload = renderBookList();
