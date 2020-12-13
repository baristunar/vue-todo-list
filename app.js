// Selecting all elements

const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const clearButton = document.querySelector("#clear-todos");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const listGroup = document.querySelector(".list-group");
const addTodoButton = document.querySelector("#addTodoButton");
eventListeners();

function eventListeners() {
    form.addEventListener("submit", addTodo);
    document.addEventListener("DOMContentLoaded", loadAllTodosToUI);
    secondCardBody.addEventListener("click", deleteTodo)
    clearButton.addEventListener("click", clearAllTodos);
};

function loadAllTodosToUI() {
    let todos = getTodosFromStorage();

    todos.forEach(function (todo) {
        addTodoToUI(todo);

    })

}

function showAlert(type, message) {
    const alert = document.createElement("div");

    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    firstCardBody.appendChild(alert);
    //setTimeout

    setTimeout(function () {
        alert.remove();
    }, 1000);



};

function clearAllTodos(e) {
    if (confirm("Tümünü silmek istediğinize emin misiniz?")) {

        while (listGroup.firstElementChild != null) {
            listGroup.removeChild(listGroup.firstElementChild);

        }
        localStorage.removeItem("todos");
    }

}

function deleteTodoFromStorage(deleteTodo) {
    let todos = getTodosFromStorage();

    todos.forEach(function (todo, index) {
        if (todo === deleteTodo) {
            todos.splice(index, 1);
        }

    })

    localStorage.setItem("todos", JSON.stringify(todos));

}


function deleteTodo(e) {

    if (e.target.className === "fa fa-remove") {
        e.target.parentElement.parentElement.remove();
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
        showAlert("success", "Todo başarıyla silinmiştir.")

    }


}


function addTodo(e) {
    const newTodo = todoInput.value.trim();
    let todos = getTodosFromStorage();
    let text = todos[todos.indexOf(newTodo)];


    if (newTodo === "") {

        showAlert("danger", "Lütfen Bir Todo Giriniz...");

    }

    else if (todos.indexOf(newTodo) != -1) {

        showAlert("danger", "Girmek istediğiniz içerik zaten mevcut...");

    }

    else {
        addTodoToUI(newTodo);
        addTodoToStorage(newTodo);
        showAlert("success", "Todo List Başarıyla Eklendi...");
    }


    e.preventDefault();

};


function addTodoToStorage(newTodo) {
    let todos = getTodosFromStorage();

    todos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(todos));


};



function getTodosFromStorage(newTodo) {

    let todos;

    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));

    }
    return todos;
};





function addTodoToUI(newTodo) {
    //     <<li class="list-group-item d-flex justify-content-between">
    //     Todo 1
    //     <a href = "#" class ="delete-item">
    //         <i class = "fa fa-remove"></i>
    //     </a>

    // </li>

    const listItem = document.createElement("li");
    const link = document.createElement("a");
    listItem.className = "list-group-item d-flex justify-content-between";
    link.href = "#";
    link.className = "delete-item";
    link.innerHTML = "<i class ='fa fa-remove'></i>";
    listItem.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(link);
    listGroup.appendChild(listItem);
    todoInput.value = "";
};
