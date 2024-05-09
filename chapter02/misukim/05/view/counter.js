const getTodoCount = todos => {
    const notCompleted = todos
        .filters(todo => !todo.completed)
    
    const { length } = notCompleted
    if (length === 1) {
        return '1 Item left'
    }
    return `${length} Items left`
}

export default (targetElement, { todos }) => {
    const newCounter = targetElement.cloneNode(true)
    newCounter.textContent = getTodoCount(todos)
    return newCounter
}