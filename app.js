let todos = [];

// FUNCTION get todos - from local storage

const form = document.querySelector('form');
const todoContent = document.querySelector('#todoContent');


form.addEventListener('submit', (e) => {
    e.preventDefault();
    const todoInput = document.querySelector('#todoInput');
    todoInput.value === "" || todoInput.value == undefined ? alert('Please enter a task') : addTodo(todoInput.value);
    todoInput.value = "";
    render(todos)        

})


const addTodo = todo => {
    let tempTodo = {
        id: Math.floor(Math.random() * 9999), // Normally I would use uuid etc.
        title: todo,
        completed: false
    }

    todos.push(tempTodo);
    console.log(todos);

}

const deleteTodo = (e) => {

    if (e.target.getAttribute('id') === 'deleteTodo') {
        const parentElement = e.target.parentElement; 
        todos = [...todos].filter( todo => todo.id == parentElement.getAttribute('id') ? parentElement.remove() : todo);
        render(todos);
        console.log(todos);

    }
    
}

document.querySelector('#todoContent').addEventListener('click', deleteTodo);
console.log(todos);

const render = (todos) => {

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
    console.log(todos.length)

}
// document.addEventListener('DOMContentLoaded', renderTodos())
render(todos)

