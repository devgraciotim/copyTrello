// ADICIONA TASK
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
// ADICIONA TASK

// CRIA OS ELEMENTOS DAS TASKS
function createTaskElements(taskName, taskDescription) {
	// PRIMEIRAMENTE CRIA OS ELEMENTOS E ATRIBUI PROPRIEDADES
	const newTaskElement = document.createElement("div");
	newTaskElement.className = "taskElement";
	newTaskElement.id = `task-${Date.now()}`;
	newTaskElement.draggable = true;
	newTaskElement.addEventListener("dragstart", drag);

	const taskTitle = document.createElement("h2");
	taskTitle.className = "taskTitle";
	taskTitle.innerText = taskName;

	const taskDescriptionElement = document.createElement("h4");
	taskDescriptionElement.className = "taskDescription";
	taskDescriptionElement.innerText = taskDescription;

	const removeTaskElement = document.createElement("div");
	removeTaskElement.innerHTML = '<i class="fa-solid fa-trash"></i>';
	removeTaskElement.className = "removeTaskElement";
	removeTaskElement.addEventListener("click", () => removeTask(newTaskElement));
	// PRIMEIRAMENTE CRIA OS ELEMENTOS E ATRIBUI PROPRIEDADES

	// FAZ O APPEND(ADICAO) DOS ELEMENTOS NO HTML
	newTaskElement.append(taskTitle, taskDescriptionElement, removeTaskElement);
	// FAZ O APPEND(ADICAO) DOS ELEMENTOS NO HTML

	// RETORNA O TASK CRIADA NA FUNCAO
	return newTaskElement;
	// RETORNA O TASK CRIADA NA FUNCAO
}
// CRIA OS ELEMENTOS DAS TASKS

// SALVA AS TASKS
function saveTasks() {
	// CRIA UMA VARIAVEL PARA AS COLUNAS (STRING)
	const columns = document.querySelectorAll(".column");
	// CRIA UM OBJETO PARA GUARDAR AS TASKS NO LOCAL STORAGE DO NAVEGADOR
	const tasks = {};

	// UM FOREACH PARA CADA COLUNA
	columns.forEach((column) => {
		const columnId = column.id;
		const tasksColumn = column.querySelectorAll(".taskElement");
		const taskContent = [];

		// UM FOREACH PARA CADA TASK DENTRO DA RESPECTIVA COLUNA
		tasksColumn.forEach((task) => {
			const taskName = task.querySelector(".taskTitle").innerText;
			const taskDescription = task.querySelector(".taskDescription").innerText;
			taskContent.push({ name: taskName, description: taskDescription });
		});

		tasks[columnId] = taskContent;
	});

	localStorage.setItem("tasks", JSON.stringify(tasks));
}
// SALVA AS TASKS

// CARREGA AS TASKS
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
// CARREGA AS TASKS

// REMOVE TASK SELECIONADA
function removeTask(taskElement) {
	const confirmation = confirm("Deseja remover a Task?");
	if (confirmation) {
		taskElement.remove();
		saveTasks();
	}
}
// REMOVE TASK SELECIONADA

loadTasks();

// PERMITIR DROP DE TASK
function allowDrop(ev) {
	ev.preventDefault();
}
// PERMITIR DROP DE TASK

// FUNCAO DE ARRASTO DE TASK
function drag(ev) {
	ev.dataTransfer.setData("text", ev.target.id);
}
// FUNCAO DE ARRASTO DE TASK

// DROP DE TASK
function drop(ev) {
	ev.preventDefault();
	const data = ev.dataTransfer.getData("text");
	const draggedElement = document.getElementById(data);
	let targetColumn = ev.target;

	while (targetColumn && !targetColumn.classList.contains("column")) {
		targetColumn = targetColumn.parentElement;
	}

	if (targetColumn) {
		const newTask = createTaskElements(
			draggedElement.querySelector(".taskTitle").innerText,
			draggedElement.querySelector(".taskDescription").innerText
		);
		targetColumn.querySelector(".taskContainer").appendChild(newTask);
		draggedElement.parentElement.removeChild(draggedElement);
		saveTasks();
	}
}
// DROP DE TASK
