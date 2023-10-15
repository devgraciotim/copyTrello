function createColumnElements() {
    const elements = document.createElement('div')

    const inputTitleColumn = document.createElement('input')
    inputTitleColumn.className = 'inputTitleColumn'
    inputTitleColumn.type = 'text'
    inputTitleColumn.placeholder = 'Insira o Titulo da Coluna'

    const buttonsContainer = document.createElement('div')
    buttonsContainer.className = 'buttonsContainer'

    const addColumnBtn = document.createElement('button')
    addColumnBtn.innerText = 'Adicionar Coluna'
    addColumnBtn.className = 'addColumn'

    const returnBtn = document.createElement('button')
    returnBtn.innerText = 'X'
    returnBtn.className = 'returnBtn'

    buttonsContainer.append(addColumnBtn, returnBtn)
    elements.append(inputTitleColumn, buttonsContainer)
    return elements
}

function addColumnElements() {
    const addColumnBtn = document.getElementById('addColumnBtn')
    const dinamicContainer = document.getElementById('dinamicContainer')
    const elements = createColumnElements()

    dinamicContainer.querySelector('#addColumnBtn') === addColumnBtn
        ? (dinamicContainer.innerHTML = '', dinamicContainer.appendChild(elements))
        : null

    dinamicContainer.querySelector('.returnBtn').addEventListener('click', function () {
        dinamicContainer.innerHTML = ''
        dinamicContainer.appendChild(addColumnBtn)
    })

    dinamicContainer.querySelector('.addColumn').addEventListener('click', function () {
        const title = dinamicContainer.querySelector('.inputTitleColumn').value
        if (title) {
            addColumn(title)
        }
        else {
            alert('Insira um Titulo para a Coluna')
        }
    })
}

function createColumn(title) {
    const column = document.createElement('div')
    column.className = 'column'

    const columnTitleEl = document.createElement('h1')
    columnTitleEl.innerText = title

    const tasksContainer = document.createElement('div')
    tasksContainer.className = 'tasksContainer'

    const addTaskBtn = document.createElement('button')
    addTaskBtn.innerHTML = '<i class="fa-solid fa-circle-plus"></i>'
    addTaskBtn.addEventListener('click', () => {
        addTaskInputs(parentElement)
    })

    column.append(columnTitleEl, tasksContainer, addTaskBtn)
    return column
}

function addColumn(columnTitle) {
    const column = createColumn(columnTitle)
    document.querySelector('.columns').append(column)
}

function createTaskInputs() {
    const taskInputs = document.createElement('div')
    taskInputs.className = 'taskInputs'

    const taskNameInput = document.createElement('input')
    taskNameInput.placeholder = 'Insira o Nome da Task'
    const taskDescriptionArea = document.createElement('textarea')
    taskDescriptionArea.placeholder = 'Insira a Descrição'

    const taskInputsBtns = document.createElement('div')
    taskInputsBtns.className = 'taskInputsBtns'
    const cancelTaskBtn = document.createElement('button')
    cancelTaskBtn.innerHTML = '<i class="fa-solid fa-x"></i>'
    const createTaskBtn = document.createElement('button')
    createTaskBtn.innerHTML = '<i class="fa-solid fa-check"></i>'


    taskInputsBtns.append(cancelTaskBtn, createTaskBtn)
    taskInputs.append(taskNameInput, taskDescriptionArea, taskInputsBtns)
    return taskInputs
}

function addTaskInputs(parentElement) {
    const taskInputs = createTaskInputs();
    parentElement.querySelector('.tasksContainer').append(taskInputs);

    const taskNameInput = taskInputs.querySelector('input');
    const taskDescriptionArea = taskInputs.querySelector('textarea');

    const taskContainer = createElement({ taskNameInput, taskDescriptionArea })
    parentElement.querySelector('.tasksContainer').append(taskContainer);
}

function createTaskElements({ taskNameInput, taskDescriptionArea }) {
    const taskContainer = document.createElement('div')
    const taskName = document.createElement('h4')
    taskName.innerText = taskNameInput.value
    const taskDescription = document.createElement('p')
    taskDescription.innerText = taskDescriptionArea.value

    taskContainer.append(taskName, taskDescription)
    return taskContainer
}
