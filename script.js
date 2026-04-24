let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
    let name = document.getElementById("name").value;
    let desc = document.getElementById("desc").value;
    let priority = document.getElementById("priority").value;
    let date = document.getElementById("date").value;

    if (name === "" || desc === "" || date === "") {
        alert("Please fill all fields!");
        return;
    }

    let task = {
        name, desc, priority, date, status: "Pending"
    };

    tasks.push(task);
    saveTasks();
    clearForm();
    showTasks();
}

function clearForm() {
    document.getElementById("name").value = "";
    document.getElementById("desc").value = "";
    document.getElementById("date").value = "";
}

function showTasks() {
    let table = document.getElementById("taskTable");
    table.innerHTML = "";

    tasks.forEach((task, index) => {
        table.innerHTML += `
        <tr>
            <td>${task.name}</td>
            <td>${task.desc}</td>
            <td class="${task.priority.toLowerCase()}">${task.priority}</td>
            <td>${task.date}</td>

            <td>
                <select onchange="changeStatus(${index}, this.value)">
                    <option ${task.status === "Pending" ? "selected" : ""}>Pending</option>
                    <option ${task.status === "In Progress" ? "selected" : ""}>In Progress</option>
                    <option ${task.status === "Completed" ? "selected" : ""}>Completed</option>
                </select>
            </td>

            <td>
                <button onclick="editTask(${index})">Edit</button>
                <button onclick="deleteTask(${index})">Delete</button>
            </td>
        </tr>`;
    });

    updateStats();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    showTasks();
}

function editTask(index) {
    let task = tasks[index];

    document.getElementById("name").value = task.name;
    document.getElementById("desc").value = task.desc;
    document.getElementById("priority").value = task.priority;
    document.getElementById("date").value = task.date;

    deleteTask(index);
}

function changeStatus(index, value) {
    tasks[index].status = value;
    saveTasks();
    showTasks();
}

function searchTask() {
    let input = document.getElementById("search").value.toLowerCase();

    let table = document.getElementById("taskTable");
    table.innerHTML = "";

    tasks.filter(task =>
        task.name.toLowerCase().includes(input) ||
        task.desc.toLowerCase().includes(input)
    ).forEach((task, index) => {
        table.innerHTML += `<tr>
            <td>${task.name}</td>
            <td>${task.desc}</td>
            <td>${task.priority}</td>
            <td>${task.date}</td>
            <td>${task.status}</td>
            <td>
                <button onclick="editTask(${index})">Edit</button>
                <button onclick="deleteTask(${index})">Delete</button>
            </td>
        </tr>`;
    });
}

function updateStats() {
    document.getElementById("total").innerText = tasks.length;

    document.getElementById("pending").innerText =
        tasks.filter(t => t.status === "Pending").length;

    document.getElementById("completed").innerText =
        tasks.filter(t => t.status === "Completed").length;
}

function toggleDarkMode() {
    document.body.classList.toggle("dark");
}

function toggleSidebar() {
    document.querySelector(".sidebar").classList.toggle("closed");
}

showTasks();
updateStats();
