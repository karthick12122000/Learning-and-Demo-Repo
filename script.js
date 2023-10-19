// Fetch and display ToDo items
async function fetchAndDisplayTodos() {
  const response = await fetch("http://localhost:4000/api/todos", {
    method: "GET",
  });

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
var Add = document.getElementById("add");
Add.addEventListener("click", async () => {
  let value = document.querySelector("input").value;
  try {
    const response = await fetch("http://localhost:4000/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ task: value }),
    });
    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }
    const data = await response.json(); // Note the use of response.json(), not response.JSON()
    console.log(data);
    fetchAndDisplayTodos();
  } catch (err) {
    console.error("Error:", err);
  }
});
