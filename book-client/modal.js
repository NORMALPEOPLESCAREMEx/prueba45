const addEventListeners = (books) => {

    const editButtons = document.querySelectorAll(".book .btn-edit");
    const deleteButtons = document.querySelectorAll(".book .btn-cancel");

    editButtons.forEach((button, i) => {
        button.addEventListener("click", () => showEditModalHandler(books[i]));
    });

    deleteButtons.forEach((button, i) => {
        button.addEventListener("click", () => showDeleteModalHandler(books[i]));
    });

};

let modal;
let backdrop;

const showDeleteModalHandler = (book) => {

    if (modal) return;

    modal = document.createElement("div");
    modal.className = "custom-modal";

    const modalText = document.createElement("h3");
    modalText.textContent = "Are you sure you want to delete this book?";

    const buttonContainer = document.createElement("div");
    buttonContainer.className = "button-container d-flex justify-content-center mt-4";
    buttonContainer.style.gap = "20px";

    const modalCancelAction = document.createElement("button");
    modalCancelAction.textContent = "Cancel";
    modalCancelAction.className = "btn btn-secondary";
    modalCancelAction.addEventListener("click", closeModalHandler);

    const modalConfirmAction = document.createElement("button");
    modalConfirmAction.textContent = "Yes, Delete";
    modalConfirmAction.className = "btn btn-danger";
    modalConfirmAction.addEventListener("click", () => {
        provider.deleteBook(book.id).then(getBooks).then(closeModalHandler);
    });

    modal.append(modalText);
    modal.append(buttonContainer);
    buttonContainer.append(modalConfirmAction);
    buttonContainer.append(modalCancelAction);

    document.body.append(modal);

    backdrop = document.createElement("div");
    backdrop.className = "backdrop";

    backdrop.addEventListener("click", closeModalHandler);

    document.body.append(backdrop);

}

const showEditModalHandler = (book) => {

    if (modal) return;

    modal = document.createElement("div");
    modal.className = "custom-modal";

    const modalText = document.createElement("h3");
    modalText.textContent = "Edit Book";

    const modalForm = document.createElement("form");
    modalForm.className = "form-group d-flex flex-column";
    modalForm.id = "book-form";
    modalForm.style.gap = "20px";

    const titleGroup = document.createElement("div");
    titleGroup.className = "form-group d-flex flex-column";

    const titleLabel = document.createElement("label");
    titleLabel.textContent = "Title";
    titleLabel.className = "text-start"
    const modalTitle = document.createElement("input");
    modalTitle.type = "text";
    modalTitle.className = "form-control";
    modalTitle.id = "edit-title";
    modalTitle.value = book.title;

    const authorGroup = document.createElement("div");
    authorGroup.className = "form-group d-flex flex-column";

    const authorLabel = document.createElement("label");
    authorLabel.textContent = "Author";
    authorLabel.className = "text-start"
    const modalAuthor = document.createElement("input");
    modalAuthor.type = "text";
    modalAuthor.className = "form-control";
    modalAuthor.id = "edit-author";
    modalAuthor.value = book.author;

    titleGroup.append(titleLabel);
    titleGroup.append(modalTitle);
    authorGroup.append(authorLabel);
    authorGroup.append(modalAuthor);

    const buttonContainer = document.createElement("div");
    buttonContainer.className = "button-container d-flex justify-content-center";
    buttonContainer.style.gap = "20px";

    const modalCancelAction = document.createElement("button");
    modalCancelAction.textContent = "Cancel";
    modalCancelAction.className = "btn btn-secondary";
    modalCancelAction.addEventListener("click", closeModalHandler);

    const modalConfirmAction = document.createElement("button");
    modalConfirmAction.textContent = "Save";
    modalConfirmAction.className = "btn btn-primary";
    modalConfirmAction.addEventListener("click", () => {

        const title = document.querySelector("#edit-title").value;
        const author = document.querySelector("#edit-author").value;

        const bookToUpdate = {
            id: book.id,
            title,
            author
        }

        provider.editBook(bookToUpdate).then(getBooks).then(closeModalHandler);
    });
    
    buttonContainer.append(modalConfirmAction);
    buttonContainer.append(modalCancelAction);

    modalForm.append(titleGroup);
    modalForm.append(authorGroup);
    modalForm.append(buttonContainer);

    modal.append(modalText);
    modal.append(modalForm);

    document.body.append(modal);

    backdrop = document.createElement("div");
    backdrop.className = "backdrop";

    backdrop.addEventListener("click", closeModalHandler);

    document.body.append(backdrop);

}

const closeModalHandler = () => {
    modal.remove();
    modal = null;

    backdrop.remove();
    backdrop = null;
}
