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
    taskName.className = "taskName"
    taskName.innerText = nameInput
    const taskDesc = document.createElement("p")
    taskDesc.className = "taskDesc"
    taskDesc.innerText = descInput
    const removeTaskButton = document.createElement("button")

    taskContainer.append(taskName, taskDesc, removeTaskButton)

    return taskContainer
}

function removeTask() {

}

function saveTask() {
    const columns = document.querySelectorAll(".column")
    const tasks = {}

    columns.forEach(column => {
        const columnId = column.id
        tasks[columnId] = []

        const taskContent = document.querySelectorAll(".taskContainer")

        taskContent.forEach(task => {
            const name = taskContent.querySelector(".taskName").innerText
            const desc = taskContent.querySelector(".taskDesc").innerText
            tasks[columnId].push({ taskName: name, taskDesc: desc })
        })
    })

    localStorage.setItem("taskKey", tasks)
}