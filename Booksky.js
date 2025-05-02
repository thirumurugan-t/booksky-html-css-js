document.addEventListener("DOMContentLoaded", function () {
    var popupoverlay = document.querySelector(".popup-overlay");
    var popupbox = document.querySelector(".popup-box");
    var addpopupbutton = document.getElementById("add-popup-button");
    var cancelbutton = document.getElementById("cancelbutton");

    var containers = document.getElementsByClassName("containers");
    var addbutton = document.getElementById("plusbutton");
    var booktitle = document.getElementById("booktitle");
    var bookauthor = document.getElementById("bookauthor");
    var bookdes = document.getElementById("bookdes");


    let books = JSON.parse(localStorage.getItem("books")) || [];
    books.forEach((book, index) => {
        createBookElement(book.title, book.author, book.description, index);
    });

    addpopupbutton.addEventListener("click", function () {
        popupoverlay.style.display = "block";
        popupbox.style.display = "block";
    });

    cancelbutton.addEventListener("click", function (event) {
        event.preventDefault();
        popupoverlay.style.display = "none";
        popupbox.style.display = "none";
    });

    addbutton.addEventListener("click", function (event) {
        event.preventDefault();
        const title = booktitle.value;
        const author = bookauthor.value;
        const description = bookdes.value;

        if (!title || !author || !description) return;

        const book = { title, author, description };
        books.push(book);
        localStorage.setItem("books", JSON.stringify(books));

        createBookElement(title, author, description, books.length - 1);

        popupoverlay.style.display = "none";
        popupbox.style.display = "none";
        booktitle.value = "";
        bookauthor.value = "";
        bookdes.value = "";
    });

    function createBookElement(title, author, description, index) {
        const div = document.createElement("div");
        div.setAttribute("class", "container");
        div.innerHTML = `
            <h3>${title}</h3>
            <h6>${author}</h6>
            <p>${description}</p>
            <button onclick="Delete(event, ${index})">Delete</button>`;
        if (containers.length > 0) {
            containers[0].appendChild(div);
        }
    }
});


function Delete(event, index) {
    let books = JSON.parse(localStorage.getItem("books")) || [];
    books.splice(index, 1);
    localStorage.setItem("books", JSON.stringify(books));
    event.target.parentElement.remove();

   
    location.reload();
}
