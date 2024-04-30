export default (targetElement, { currentFilter }) => {
    const newCounter = targetElement.cloneNode(true)
    Array
        .from(newCounter.querySelectorAll('li a'))
        .forEach(a => {
            if (a.textContent === currentFilter) {
                a.classList.add('selelcted')
            } else {
                a.classList.remove('selected')
            }
        })
    return newCounter
}