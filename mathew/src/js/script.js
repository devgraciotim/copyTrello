function addTask(columnId) {
    const nameInput = document.getElementById(`${columnId}-nameInput`).value
    const descInput = document.getElementById(`${columnId}-descInput`).value
    const taskCreated = createTask(nameInput, descInput)
    document.getElementById(`${columnId}-taskContainer`).append(taskCreated)
}

function createTask(nameInput, descInput) {

    const taskContainer = document.createElement("div")
    taskContainer.className = "taskContainer"
    const taskName = document.createElement("h3")
    taskName.innerText = nameInput
    const taskDesc = document.createElement("p")
    taskDesc.innerText = descInput
    const removeTaskButton = document.createElement("button")

    taskContainer.append(taskName, taskDesc, removeTaskButton)

    return taskContainer
}

function removeTask() {

}