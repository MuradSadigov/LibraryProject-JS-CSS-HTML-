//Data
let myLibrary = [];
const LS = localStorage.getItem("ArrayData");
const ML = JSON.parse(LS);
if(ML !== null)
{
    myLibrary = [...ML];
}

//OOP
class Book
{
    constructor(title = "Unknown", author = "Unknown", pages = 0, isRead = "Unknown")
    {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.isRead = isRead;
    }
};

let isClicked = false;
const add_button = document.querySelector("#add-btn");
const shelf = document.querySelector(".shelf");
const body = document.querySelector("body");
const form = document.querySelector("form");
const flWindow = document.querySelector("#floating-Window");

// Inputs
const title = document.querySelector("#title");
const author = document.querySelector("#author");
const pages = document.querySelector("#pages");
const read = document.querySelector("#read");

// Buttons
const apply = document.querySelector("#apply");
const cancel = document.querySelector("#cancel");
const deleteAll = document.querySelector("#deleteAll-btn");

// Side bar
const qtyOfBooks = document.querySelector("#qtyBook");
const qtyOfCompBooks = document.querySelector("#completedBook");
const qtyOfImCompBooks = document.querySelector("#imcompletedBook");

// EVENTS
add_button.addEventListener("click", AddBook);
apply.addEventListener("click", AddingBook);
cancel.addEventListener("click", AddBook);
shelf.addEventListener("click", function(e){
    if(e.target.className === "delete")
    {
        let DelID = Number(e.target.id);
        myLibrary.splice(DelID, 1);
        localStorage.setItem("ArrayData", JSON.stringify(myLibrary));
        Iterator();
    }
});

deleteAll.addEventListener("click", () => {
    myLibrary = [];
    localStorage.setItem("ArrayData", JSON.stringify(myLibrary));
    Iterator();
});

function AddBook()
{
    if(isClicked == false)
    {
        isClicked = true;
        flWindow.style.display = "flex";
        body.style.overflow = "hidden";
    }
    else
    {
        isClicked = false;
        flWindow.style.display = "none";
        body.style.overflow = "visible";
    }
}

function getData()
{
    if(title.value === "" && author.value === "" && pages.value === "" && read.checked === false)
    {
        alert("Please fill the inputs!");
        return 0;
    }
    else
    {
        let a = title.value;
        let b = author.value;
        let c = pages.value;
        let d;
        if(a !== "" && b !== "" && c !== "")
        {
            if(read.checked === true)
            {
                d = "Completed!";
            }
            else
            {
                d = "Imcompleted!"
            }
            return new Book(a, b, c, d);
        }
        else
        {
            alert("Please fill all the inputs!");
            return 0;
        }
    }
}

function AddingBook()
{
    if(getData() !== 0)
    {
        myLibrary.push(getData());
    }
    localStorage.setItem("ArrayData", JSON.stringify(myLibrary));
    
    Iterator();
    form.reset();
    AddBook();
}

function Iterator()
{
    shelf.innerHTML = "";
    for(let item in myLibrary)
    {
        const div = document.createElement("div");
        div.setAttribute("class", "book");
        div.innerHTML = `<div class="description">
                            <p>${myLibrary[item].title}</p>
                            <p>${myLibrary[item].author}</p>
                            <p>${myLibrary[item].pages}</p>
                            <p>${myLibrary[item].isRead}</p>
                        </div>
                        <div class="book-buttons">
                            <button id=${item} class="delete">Delete</button>
                        </div>`;
        shelf.appendChild(div);
    }
    qtyOfCompBooks.textContent = CompletedCount();
    qtyOfImCompBooks.textContent = myLibrary.length - CompletedCount();
    qtyOfBooks.textContent = myLibrary.length;
}

function CompletedCount()
{
    let CountOfCompleted = 0;
    for(let i = 0; i < myLibrary.length; i++)
    {
        if(myLibrary[i].isRead === "Completed!")
        {
            CountOfCompleted++;
        }
    }
    return CountOfCompleted;
}

window.addEventListener("load", function(){
    Iterator();
});