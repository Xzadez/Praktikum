function addTask() {
  const taskInput = document.getElementById("task-input");
  const taskText = taskInput.value;

  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }

  const taskList = document.getElementById("task-list");

  const li = document.createElement("li");
  
  li.innerHTML = `
    <label>
      <input type="checkbox" onclick="toggleTask(this)">
      <span>${taskText}</span>
    </label>
    <button class="delete-btn" onclick="deleteTask(this)">×</button>
  `;

  taskList.appendChild(li);

  taskInput.value = "";
}

function toggleTask(checkbox) {
  const li = checkbox.parentElement.parentElement;
  li.classList.toggle("completed");
}

function deleteTask(button) {
  const li = button.parentElement;
  li.remove();
}
