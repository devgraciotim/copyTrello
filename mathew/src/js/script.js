function addTask(columnId) {
	const nameInput = document.getElementById(`${columnId}-nameInput`).value;
	const descInput = document.getElementById(`${columnId}-descInput`).value;
	const taskCreated = createTask(nameInput, descInput);
	document.getElementById(`${columnId}-taskContainer`).append(taskCreated);
	saveTask();
}

function createTask(nameInput, descInput) {
	const taskContainer = document.createElement("div");
	taskContainer.className = "taskContainer";
	const taskName = document.createElement("h3");
	taskName.className = "taskName";
	taskName.innerText = nameInput;
	const taskDesc = document.createElement("p");
	taskDesc.className = "taskDesc";
	taskDesc.innerText = descInput;
	const removeTaskButton = document.createElement("button");

	taskContainer.append(taskName, taskDesc, removeTaskButton);

	return taskContainer;
}

function saveTask() {
	const columns = document.querySelectorAll(".column");
	const tasks = {};

	columns.forEach((column) => {
		const columnId = column.id;
		tasks[columnId] = [];
		const taskContent = document.querySelectorAll(".taskContainer");

		taskContent.forEach((taskElements) => {
			const name = taskElements.querySelector(".taskName").innerText;
			const desc = taskElements.querySelector(".taskDesc").innerText;
			tasks[columnId].push({ taskName: name, taskDesc: desc });
		});
	});
	console.log(tasks);
	localStorage.setItem("taskKey", JSON.stringify(tasks));
}

function removeTask(taskElement) {
	taskElement.remove();
	saveTask();
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
					const taskElement = createTask(task.name, task.desc);

					document
						.getElementById(`${columnId}-taskContainer`)
						.appendChild(taskElement);
				});
			}
		});
	}
}
