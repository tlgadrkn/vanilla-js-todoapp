const LOCAL_STORAGE_KEY_NAME = 'item';
const form = document.querySelector('form');
const todoContent = document.querySelector('#todoContent');
let todos = getTodos(LOCAL_STORAGE_KEY_NAME);


// get todos from local Storage
function getTodos(key) {
    let todos = localStorage.getItem(key);
    Array.isArray(todos) && todos.length || todos !== null ? todos = JSON.parse(todos) : todos = [];
    return todos;
}

// create todo //

// const createTodo = todoTitle => {
//     let tempTodo = {
//         id: Math.floor(Math.random() * 9999), // Normally I would use uuid etc.
//         title: todoTitle,
//         completed: false
//     }
//     return tempTodo
// }

// todos to local storage
const addTodo = todoTitle => {
    let tempTodo = {
                id: Math.floor(Math.random() * 9999), // Normally I would use uuid etc.
                title: todoTitle,
                completed: false
            }
    todos.push(tempTodo);
    localStorage.setItem(LOCAL_STORAGE_KEY_NAME, JSON.stringify(todos))
    console.log(JSON.stringify(tempTodo));
    return tempTodo

}

//delete todos from local storage and browser
const deleteTodo = (e) => {

    if (e.target.getAttribute('id') === 'deleteTodo') {
        const parentElement = e.target.parentElement;

         //first remove element from DOM
         todos = todos.filter(todo => todo.id == parentElement.getAttribute('id') ? parentElement.remove() : todo);

        //then remove todo in localStorage
        let storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_NAME))
        let filteredTodos = storedTodos.filter( todo => todo.id != parentElement.getAttribute('id'));
        localStorage.clear();

        addTodo(filteredTodos) 
        // render(todos);

    }

}

const render = (todos) => {
        
    
    let allTodos =  todos.map(todo => {
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
    // console.log(todos)

}
document.addEventListener('DOMContentLoaded', getTodos(LOCAL_STORAGE_KEY_NAME))
document.addEventListener('DOMContentLoaded', render(todos))

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const todoInput = document.querySelector('#todoInput');
    todoInput.value === "" || todoInput.value == undefined ? alert('Please enter a task') : addTodo(todoInput.value);
    todoInput.value = "";
    render(todos)

})


document.querySelector('#todoContent').addEventListener('click', deleteTodo);
