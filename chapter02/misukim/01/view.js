
// 함수 렌더링(TodoMVC 렌더링 함수)의 첫번째 버전
// 여기서는 DOM의 실제 수정 사항이 커밋되지 않는다. 분리된 DOM 요소를 수정하면 성능이 향상된다.
// 이 뷰 함수를 실제 DOM에 연결하고자 index.js에서 간단한 컨트롤러를 사용한다.

const getTodoElement = todo => {
    const {
        text,
        completed
    } = todo

    return `
    <li ${completed ? 'class="completed"' : ''}>
        <div class="view>
            <input
                ${completed ? 'checked' : ''}
                class="toggle"
                type="checkbox">
            <label>${text}</label>
            <button class="destroy></button>
        </div>
        <input class="edit" value="${text}>
    </li>
    `
}

const getTodoCount = todos => {
    const notCompleted = todos
        .filter(todo => !todo.completed)
    
    const { length } = notCompleted
    if (length === 1) {
        return '1 Item left'
    }
    return `${length} Items left`
}

export default (targetElement, state) => {
    const {
        currentFilter,
        todos
    } = state
    
    // cloneNode(): 호출된 노드의 깊은 복사본을 만드는 DOM API 메소드. 페이지의 원본 요소에 영향을 주지 않음
    const element = targetElement.cloneNode(true)

    const list = element.querySelector('.todo-list')
    const counter = element.querySelector('.todo-count')
    const filters = element.querySelector('.filters')

    list.innerHTML = todos.map(getTodoElement).join('')
    counter.textContent = getTodoCount(todos)

    // Array.from(): 배열과 같은 또는 반복 가능한 객체에서 새 배열 인스턴스를 생성하는 메소드.
    // 아래에서 querySelectorAll이 반환하는 NodeList를 Javascript 배열로 변환하는데 사용.
    // NodeList는 forEach와 같은 배열 메소드를 가지고 있지 않기 때문에 배열로 변환하는데 사용.
    // 처음부터 배열로 만드는 것이 아니라 기존 데이터 구조를 배열로 변환하여 배열 메소드를 사용할 수 있게 함.
    Array
        .from(filters.querySelectorAll('li a'))
        .forEach(a => {
            if (a.textContent === currentFilter) {
                a.classList.add('selected')
            } else {
                a.classList.remove('selected')
            }
        })
    return element
}
