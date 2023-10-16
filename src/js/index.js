function addTask(columnId) {
	const taskName = document.getElementById(`${columnId}-taskNameInput`).value;
	const taskDescription = document.getElementById(
		`${columnId}-taskDescription`
	).value;

	if (taskName.trim() !== "") {
		document
			.getElementById(`${columnId}-taskContent`)
			.appendChild(createTaskElements(taskName, taskDescription));

		document.getElementById(`${columnId}-taskNameInput`).value = "";
		document.getElementById(`${columnId}-taskDescription`).value = "";
	} else {
		alert("Favor inserir um titulo para a task");
	}

	saveTasks();
}

function createTaskElements(taskName, taskDescription) {
	const newTaskElement = document.createElement("div");
	newTaskElement.className = "taskElement";

	const taskTitle = document.createElement("h2");
	taskTitle.className = "taskTitle";
	taskTitle.innerText = taskName;

	const taskDescriptionElement = document.createElement("h4");
	taskDescriptionElement.className = "taskDescription";
	taskDescriptionElement.innerText = taskDescription;

	const removeButton = document.createElement("button");
	removeButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
	removeButton.className = "removeButton";
	removeButton.addEventListener("click", () => removeTask(newTaskElement));

	newTaskElement.append(taskTitle, taskDescriptionElement, removeButton);

	return newTaskElement;
}

function saveTasks() {
	const columns = document.querySelectorAll(".column");
	const tasks = {};

	columns.forEach((column) => {
		const columnId = column.id;
		const tasksColumn = column.querySelectorAll(".taskElement");
		const taskContent = [];

		tasksColumn.forEach((task) => {
			const taskName = task.querySelector(".taskTitle").innerText;
			const taskDescription = task.querySelector(".taskDescription").innerText;
			taskContent.push({ name: taskName, description: taskDescription });
		});

		tasks[columnId] = taskContent;
	});

	console.log(tasks);
	localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
	const columns = document.querySelectorAll(".column");
	const tasks = JSON.parse(localStorage.getItem("tasks"));

	if (tasks) {
		columns.forEach((column) => {
			const columnId = column.id;
			const taskContent = tasks[columnId];

			if (taskContent) {
				taskContent.forEach((task) => {
					const taskName = task.name;
					const taskDescription = task.description;

					const taskElement = createTaskElements(taskName, taskDescription);

					document
						.getElementById(`${columnId}-taskContent`)
						.appendChild(taskElement);
				});
			}
		});
	}
}

function removeTask(taskElement) {
	taskElement.remove();
	saveTasks();
}

loadTasks();
