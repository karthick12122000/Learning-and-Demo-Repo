// Fetch and display ToDo items
async function fetchAndDisplayTodos() {
  const response = await fetch("http://localhost:4000/api/todos");
  const todos = await response.json();
  console.log(todos);
  const todoList = document.getElementById("app");
  todoList.innerHTML = "";

  todos.forEach((todo) => {
    const listItem = document.createElement("div");
    listItem.innerHTML = `
            <input type="checkbox" ${todo.done ? "checked" : ""} />
            <span>${todo.task}</span>
        `;
    console.log("listItem");
    todoList.appendChild(listItem);
  });
}

fetchAndDisplayTodos();
console.log("listItem");
