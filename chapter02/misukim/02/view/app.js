// 작은 뷰 함수로 작성된 앱 뷰 함수
// 새로 작성된 애플리케이션의 버전

import todosView from './todos.js'
import counterView from './counter.js'
import filtersView from './filters.js'

export default (targetElement, state) => {
    const element = targetElement.cloneNode(true)

    const list = element
        .querySelector('.todo-list')
    const counter = element
        .querySelector('.todo-count')
    const filters = element
        .querySelector('.filters')

    list.replaceWith(todosView(list, state))
    counter.replaceWith(counter(counter, state))
    filters.replaceWith(filtersView(filters, state))

    return element
}