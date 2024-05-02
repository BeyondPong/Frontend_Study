/*
뷰 함수를 실제 DOM에 연결하고자 아래와 같이 간단한 컨트롤러 사용
*/

// 2개의 모듈을 가져온다.
// getTodos: 할 일 항목 배열을 반환하는 함수    
// view: 상태 객체와 HTML 요소를 받아 상태에 기반한 UI를 적절하게 렌더링하는 함수
import getTodos from './getTodos.js'
import view from './view.js'

// 상태 초기화
//  state는 애플리케이션의 현재 상태를 담고 있는 객체   
const state = {
    todos: getTodos(),
    currentFilter: 'All'
}

// DOM에서 앱의 메인 컨테이너를 선택. 이 요소는 할일 앱이 렌더링 될 루트
const main = document.querySelector('.todoapp')

// requestAnimationFrame: 애니메이션을 수행하고자 할 때 브라우저에 알리고
//                        다음 리페인트 전에 애니메이션을 업데이트하기 위해 지정된 함수를 호출하도록 요청 
//                        콜백 메소드는 브라우저가 리페인트하기 전에 실행되어,
//                        DOM 변경이 적시에 이루어지도록 하여 깜빡임을 줄이고 애니메이션의 부드러움을 향상 
window.requestAnimationFrame( () => {
    // 콜백 내부에서 main과 state를 인자로 받아 view 함수를 호출
    const newMain = view(main, state)
    // 기존의 메인 요소(main)를 view가 반환한 새로운 메인요소(newMain)로 교체 
    main.replaceWith(newMain)
})

// 이렇게 이 애플리케이션은 동적으로 UI를 업데이트한다. 상태가 변경될 때마다 requestAnimationFrame이 호출되고
// view는 UI의 새로운 버전을 생성하여 기존 버전을 대체한다.