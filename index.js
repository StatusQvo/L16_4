const tasks = [
  {
    id: '1138465078061',
    completed: false,
    text: 'Посмотреть новый урок по JavaScript',
  },
  {
    id: '1138465078062',
    completed: false,
    text: 'Выполнить тест после урока',
  },
  {
    id: '1138465078063',
    completed: false,
    text: 'Выполнить ДЗ после урока',
  },
]

let arrayTaskText = []

class SetLesson {
  constructor(idTask, status, textTask) {
    this.idTask = idTask
    this.completed = status
    this.textTask = textTask
  }

  newElt() {
    let TaskElt = document.createElement('div')
    TaskElt.className = 'task-item'
    TaskElt.dataset.taskId = this.idTask
    return TaskElt
  }

  createCheckBox() {
    const checkBoxForm = document.createElement('form')
    checkBoxForm.className = 'checkbox-form'

    const newCheckBoxElt = document.createElement('input')
    newCheckBoxElt.type = 'checkbox'
    newCheckBoxElt.className = 'checkbox-form__checkbox'
    newCheckBoxElt.id = `task-${this.idTask}`

    const labelCheckBox = document.createElement('label')
    labelCheckBox.htmlFor = `task-${this.idTask}`

    const taskSpan = document.createElement('span')
    taskSpan.className = 'task-item__text'
    taskSpan.innerText = this.textTask

    checkBoxForm.append(newCheckBoxElt, labelCheckBox)
    return [checkBoxForm, taskSpan]
  }

  createDeleteButton() {
    const deleteButton = document.createElement('button')
    deleteButton.className =
      'task-item__delete-button default-button delete-button'
    deleteButton.innerHTML = 'Удалить'
    return deleteButton
  }

  createAndPutElt() {
    let TaskItemMainContainer = document.createElement('div')
    TaskItemMainContainer.className = 'task-item__main-container'

    let TaskItemMainContent = document.createElement('div')
    TaskItemMainContent.className = 'task-item__main-content'

    const taskList = document.querySelector('.tasks-list')

    const TaskElt = this.newElt()
    const [checkBox, taskSpan] = this.createCheckBox()
    const deleteButton = this.createDeleteButton()

    TaskItemMainContent.append(checkBox, taskSpan)
    TaskItemMainContainer.append(TaskItemMainContent, deleteButton)
    TaskElt.append(TaskItemMainContainer)
    taskList.append(TaskElt)
  }
}

function setNewTaskInObj(newLessonValue) {
  const lastId = String(Date.now())
  const newTaskObj = new SetLesson(lastId, false, newLessonValue)
  newTaskObj.createAndPutElt()

  tasks.push({
    id: newTaskObj.idTask,
    completed: false,
    text: newTaskObj.textTask,
  })

  arrayTaskText.push(newTaskObj.textTask)
}

const createSpanElt = (ErrorMessage) => {
  const ErrorMsgBlock = document.createElement('span')
  ErrorMsgBlock.setAttribute('class', '.error-message-block')
  ErrorMsgBlock.innerText = ErrorMessage
  return ErrorMsgBlock
}

function checkNewTaskValid(newLessonVal) {
  let errorSpan = formBlock.querySelector('span')
  const ErrorText_Empty = 'Название задачи не должно быть пустым'
  const ErrorText_Exist = 'Задача с таким названием уже существует.'
  //
  if (!newLessonVal) {
    console.log(errorSpan)

    if (errorSpan) {
      errorSpan.innerHTML = ErrorText_Empty
    } else {
      const NewErrorSpan = createSpanElt(ErrorText_Empty)
      NewErrorSpan.className = 'error-message-block'
      formBlock.insertAdjacentElement('beforeend', NewErrorSpan)
    }
  } else if (arrayTaskText.includes(newLessonVal)) {
    if (errorSpan) {
      errorSpan.innerHTML = ErrorText_Exist
    } else {
      const NewErrorSpan = createSpanElt(ErrorText_Exist)
      NewErrorSpan.className = 'error-message-block'
      formBlock.insertAdjacentElement('beforeend', NewErrorSpan)
    }
  } else {
    if (errorSpan) errorSpan.remove()
    setNewTaskInObj(newLessonVal)
  }
}

function submitEvent(event) {
  event.preventDefault()
  const { target } = event
  const newLesson = target.taskName.value
  console.log(newLesson.trim())
  checkNewTaskValid(newLesson.trim())
}

const formBlock = document.querySelector('.create-task-block')
formBlock.addEventListener('submit', submitEvent)

tasks.forEach((task) => {
  arrayTaskText.push(task.text)
  let taskEltFromList = new SetLesson(task.id, task.completed, task.text)
  taskEltFromList.createAndPutElt()
})
