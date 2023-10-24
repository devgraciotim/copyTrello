//Adiciona tarefas a uma coluna específica.
//Valida entrada, cria elementos de tarefa e os anexa.
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

//Cria elementos HTML para representar uma tarefa.
//Retorna um elemento de tarefa com título, descrição e botão de remoção.
function createTaskElements(taskName, taskDescription) {
	const newTaskElement = document.createElement("div");
	newTaskElement.className = "taskElement";
	newTaskElement.id = `task-${Date.now()}`;
	newTaskElement.draggable = true;
	newTaskElement.addEventListener("dragstart", drag);

	const taskTitle = document.createElement("h2");
	taskTitle.className = "taskTitle";
	taskTitle.innerText = taskName;
	taskTitle.preventDefault = true

	const taskDescriptionElement = document.createElement("h4");
	taskDescriptionElement.className = "taskDescription";
	taskDescriptionElement.innerText = taskDescription;
	taskDescription.preventDefault = true

	const revomeTaksElement = document.createElement("div");
	revomeTaksElement.innerHTML = '<i class="fa-solid fa-trash"></i>';
	revomeTaksElement.className = "revomeTaksElement";
	revomeTaksElement.addEventListener("click", () => removeTask(newTaskElement));

	newTaskElement.append(taskTitle, taskDescriptionElement, revomeTaksElement);

	return newTaskElement;
}

//Salva as tarefas no armazenamento local (localStorage).
//Coleta detalhes das tarefas e armazena em JSON
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

//Carrega tarefas do armazenamento local e as adiciona.
//Itera pelas colunas e cria elementos de tarefa correspondentes.
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

//Permite a remoção de tarefas com confirmação.
//Remove o elemento da tarefa e atualiza o armazenamento.
function removeTask(taskElement) {
	const confirmation = confirm("Deseja remover a Task?");
	if (confirmation) {
		taskElement.remove();
		saveTasks();
	}
}

loadTasks();

//Permite a soltura de elementos em uma área.
//Usado em eventos "dragover" para permitir soltar.
function allowDrop(ev) {
	ev.preventDefault();
}

//Inicia operação de arrastar e soltar.
//Define dados arrastados (ID do elemento).
function drag(ev) {
	ev.dataTransfer.setData("text", ev.target.id);
}

//Lida com a soltura de elementos, movendo tarefas.
//Cria uma nova tarefa na coluna de destino.
function drop(ev) {
	ev.preventDefault();
	const data = ev.dataTransfer.getData("text");
	const draggedElement = document.getElementById(data)
	let targetColumn = ev.target;

	while (targetColumn && !targetColumn.classList.contains('column')) {
		targetColumn = targetColumn.parentElement;
	}

	if(targetColumn) {
		const newTask = createTaskElements(
			draggedElement.querySelector('.taskTitle').innerText,
			draggedElement.querySelector('.taskDescription').innerText
		);
		targetColumn.querySelector('.taskContainer').appendChild(newTask);
		draggedElement.parentElement.removeChild(draggedElement);
		saveTasks();
	}

}
