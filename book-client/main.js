
const bookListDiv = document.getElementById("book-list");
const bookDetailsDiv = document.getElementById("book-details");

const getBooks = () => {
  provider.getBooks()
    .then((books) => {

      console.log({ books });

      bookListDiv.innerHTML = books
        .map((book) => {
          return `
          <div id="book-${book.id}" class="card book">
            <div class="card-body">
              <h5 class="card-title">${book.title}</h5>
              <h6 class="card-subtitle mb-2 text-muted">${book.author}</h6>
              <button class="btn btn-primary btn-edit mt-2"><i class="bi bi-pencil-fill"></i></button>
              <button class="btn btn-danger btn-cancel mt-2"><i class="bi bi-trash-fill"></i></button>
            </div>
          </div>
          `;
        })
        .join("");

        addEventListeners(books);

    })
    .catch((err) => console.log(err));

    document.querySelectorAll(".book").forEach(book => {

    })
};

getBooks();

const renderBook = (book) => {
  console.log(book)
  if (book.id) {
    bookDetailsDiv.innerHTML = `
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">${book.title}</h5>
          <h6 class="card-subtitle mb-2 text-muted">${book.author}</h6>
        </div>
      </div>
    `;
  
    return;
  }

  bookDetailsDiv.innerHTML = `
  <div class="card">
    <div class="card-body p-3">
      <h5 class="card-title">Not Found</h5>
    </div>
  </div>
  `;
}

const bookForm = document.getElementById("book-form");
const bookTitleInput = document.getElementById("title");
const bookAuthorInput = document.getElementById("author");

bookForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let formData = new FormData(bookForm);

  let data = {};

  for (var pair of formData.entries()) {
    data[pair[0]] = pair[1];
  }

  provider.addBook(data)
    .then(getBooks)
    .catch(console.error);
});

const searchBookForm = document.getElementById("search-book-form");
const searchBookInput = document.getElementById("bookid");

searchBookForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const bookId = +searchBookInput.value;

  provider.getBook(bookId)
    .then((book) => renderBook(book))
    .catch(console.error);
});

