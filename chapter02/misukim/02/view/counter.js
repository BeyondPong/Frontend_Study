const getTodoCount = todos => {
    const notCompleted = todos
        .filter(todo => !todo.completed)
    
    const { length } = notCompleted
    if (length == 1) {
        return '1 Item left'
    }
    return `${length} Items left`
}

// 두 매개변수를 받는 내보내기 함수
// targetElement: 할일 수를 표시해야하는 DOM 요소
// todos: todos 배열을 포함하는 객체
export default (targetElement, { todos }) => {
    const newCounter = targetElement.cloneNode(true)
    newCounter.textContent = getTodoCount(todos)
    return newCounter
}