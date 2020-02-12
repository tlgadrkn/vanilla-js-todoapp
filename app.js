const LOCAL_STORAGE_KEY_NAME = 'item';
const form = document.querySelector('form');
const todoContent = document.querySelector('#todoContent');
let todos = getTodos(LOCAL_STORAGE_KEY_NAME);


// get todos from local Storage
function getTodos(key) {
    let todos;
    localStorage.getItem(key) === null ? todos = [] : todos = JSON.parse(localStorage.getItem(key))
    return todos;
}

// add todos to local storage
const addTodo = todoTitle => {
    let tempTodo = {
        id: Math.floor(Math.random() * 9999), // Normally I would use uuid etc.
        title: todoTitle,
        completed: false
    }
    todos.push(tempTodo);
    localStorage.setItem(LOCAL_STORAGE_KEY_NAME, JSON.stringify(todos))
}

 //delete todos from local storage and browser
const deleteTodo = (e) => {
    let allTodos = getTodos(LOCAL_STORAGE_KEY_NAME);
    todos = allTodos
    console.log(todos);

    if (e.target.getAttribute('id') === 'deleteTodo') {

        const parentElement = e.target.parentElement;

        // remove todo in localStorage
        todos.forEach((todo, index) => {
            todo.id == parentElement.getAttribute('id') ? todos.splice(index, 1) : ""
        })

        localStorage.setItem(LOCAL_STORAGE_KEY_NAME, JSON.stringify(todos))
        // remove todo in DOM
        parentElement.remove();
    }
    render();

}

const render = () => {
    
    let allTodos = todos.map(todo => {
        

        if (todo.completed) {
            return `<li id=${todo.id} class="list-group-item">${todo.title}</li>`

        } else {
            return `<li id=${todo.id} class="list-group-item">
                ${todo.title}
                <button id="deleteTodo" class="btn btn-sm btn-danger float-left mr-2">x</button>
            </li> `

        }
    })

    todoContent.innerHTML = allTodos.join("")

    if (todoContent.childNodes.length === 0) {
        todoContent.innerHTML = `<li class="list-group-item ">You have no items today</li>`
    }
}


document.addEventListener('DOMContentLoaded', todos = getTodos(LOCAL_STORAGE_KEY_NAME))
document.addEventListener('DOMContentLoaded', render)
document.querySelector('#todoContent').addEventListener('click', deleteTodo);

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const todoInput = document.querySelector('#todoInput');
    todoInput.value === "" || todoInput.value == undefined ? alert('Please enter a task') : addTodo(todoInput.value);
    todoInput.value = "";
    render()
})