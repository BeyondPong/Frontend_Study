## 2. 렌더링

웹 애플리케이션에서 가장 중요한 기능 중 하나는 **데이터 표시**다. <br/>
데이터를 표시한다는 것은 화면같은 출력장치에 **렌더링**하는 것을 의미한다.<br/>
2장의 목적은 프레임워크 없이 DOM을 효과적으로 조작하는 방법을 배우는 데 있다.

## 𝌭 문서 객체 모델 (DOM)

**DOM** : 웹 애플리케이션을 구성하는 요소를 조작할 수 있는 API <br/>
**HTML페이지** : 트리로 구성

```
HTML테이블
<html>
<body>
  <table>
    <tr>
        <td>요소</td>
    </tr>
  </table>
</body>
</html>
```

![title](https://velog.velcdn.com/images/junvhui/post/f64fad64-bc91-4f35-90e3-36fbdb9ffdd7/image.png)
DOM을 통해 HTML요소로 정의된 트리를 관리할 수 있다.

```
DOM조작
const SELECTOR = `tr:nth-child(3) > td`
const cell = document.querySelector(SELECTOR);
cell.style.backgroundColor = 'red';
```

## 🖥️ 렌더링 성능 모니터링

웹용 렌더링 엔진을 설계할 때는 **가독성**과 **유지관리성**을 염두해야 한다. <br/>
렌더링 엔진에서 또 다른 중요한 요소는 **성능**이다. <br/>
렌더링 엔진의 성능을 모니터링 하는 다양한 도구들

- ### 크롬 개발자 도구

  **FPS** : 렌더링 성능을 판단하는 지표로 초당 프레임 수를 추적

- ### state.js

  애플리케이션의 FPS를 모니터링 할 수 있다.

- ### 사용자 정의 위젯
  requestAnimationFrame 콜백을 사용해 현재 렌더링 사이클과 다음 사이클 사이의 시간을 추적하여 콜백이 1초내에 호출되는 횟수를 추적.

```
사용자 정의 성능 모니터 위젯
let panel,start;
let frames = 0;

const create = () = > {
    const $div = document.createElement('div');
    div.style.color = 'white';
    return div;
};

const tick = () => {
    frames++;
    const now = window.performance.now();
    if (now >= start + 1000) {
        panel.innertext = frames;
        frames = 0;
        start = now;
    }
    window.requestAnimationFrame(tick);
};

const init = (parent = document.body) => {
    panel = create();
    window.requestAnimationFrame( ()=>{
         start = window.performance.now();
         parent = appendChild(panel);
         tick();
    });
};
```

## 🧩 렌더링 함수

순수 함수로 요소를 렌더링 <br/>
= DOM요소가 애플리케이션의 상태에만 의존
![title](data:image/png;base64,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)

```
순수 함수 렌더링의 수학적 표현
view = function(state)
```

### MVC 어플리케이션 뼈대

```
<body>
  <section class="todoapp">
    <header class="header">
      <h1>todos</h1>
      <input
        class="new-todo"
        placeholder="what needs to be done?"
        autofocus=""
      />
    </header>
    <section class="main">
      <input id="toggle-all" class="toggle-all" type="checkbox" />
      <label for="toggle-all"> Mark all as complete </label>
      <ul class="todo-list"></ul>
    </section>
    <footer class="footer">
      <span class="todo-count"></span>
      <ul class="filters">
        <li>
          <a href="#/">All</a>
        </li>
        <li>
          <a href="#/active">Active</a>
        </li>
        <li>
          <a href="#/completed">Completed</a>
        </li>
      </ul>
      <button class="clear-completed">Clear completed</button>
    </footer>
  </section>
  <footer class="info">
    <p>Double-click to edit a todo</p>
  </footer>
</body>
```

해당 어플리케이션을 동적으로 만들기 위해 다음을 업데이트 한다.

- 필터링된 todo list
- 완료되지 않은 todo수를 가진 span
- selected 클래스를 오른쪽에 추가한 필터 유형을 가진 링크

```
뷰 함수
const getTodoElement = (todo) => {
  const { text, completed } = todo;
  return `
	<li ${completed ? 'class="completed"' : ""}>
	<div class="view">
		<input ${completed ? "checked" : ""} class="toggle" type="checkbox"/>
		<label>${text}</label>
		<button class="destroy"></button>
	</div>
	<input class="edit" value="${text}"/>
	</li>
  `;
};

const getTodoCount = (todos) => {
  const notCompleted = todos.filter((todo) => !todo.completed);

  const { length } = notCompleted;
  if (length === 1) {
    return "1 Item left";
  }
  return `${length} Items left`;
};

export default (targetElement, state) => {
  const { currentFilter, todos } = state;

  const element = targetElement.cloneNode(true);
  const list = element.querySelector(".todo-list");
  const counter = element.querySelector(".todo-count");
  const filters = element.querySelector(".filters");

  list.innerHTML = todos.map(getTodoElement).join("");
  counter.textContent = getTodoCount(todos);

  Array.from(filters.querySelector("li a")).forEach((a) => {
    if (a.textContent === currentFilter) {
      a.classList.add("selected");
    } else {
      a.classList.remove("selected");
    }
  });
  return element;
};

```

이 뷰 함수는 target DOM을 요소로 받고, target을 복제한 후 state 매개변수를 사용해 업
데이트 한다. <br/>
복제하여 분리된 DOM요소를 수정하면 성능이 향상된다. <br/>
이 뷰 함수를 실제 DOM에 연결하고자 다음과 같은 컨트롤러를 사용한다.

```
렌더링 엔진
import getTodos from "./getTodos.js";
import view from "./view.js";

const state = {
  todos: getTodos(),
  currentFilter: "All",
};

const $main = document.querySelector(".todoapp");

window.requestAnimationFrame(() => {
  const newMain = view($main, state);
  $main.replaceWith(newMain);
});
```

해당 렌더링 엔진은 **requestAnimationFrame**을 기반으로 한다. <br/>
모든 DOM조작이나 애니메이션은 해당 DOM API를 기반으로 해야 한다. <br/>
해당 콜백 내에서 DOM 작업을 수행하면 더 효율적이기 때문이다. <br/>
브라우저에게 수행하기를 원하는 애니메이션을 알리고 다음 리페인트가 진행되기 전에 해당 애니메이션을 업데이트하는 함수를 호출하게 한다. <br/>
이 API는 리페인트 이전에 실행할 콜백을 인자로 받는다. <br/>

- [requestAnimaionFrame MDN](https://yari-demos.prod.mdn.mozit.cloud/ko/docs/Web/API/Window/requestAnimationFrame)

![title](https://github.com/Meet-Coder-Study/frameworkless-front-end-development/raw/main/chapter2/images/2.7.png)

## 📖 코드 리뷰

여기서의 렌더링 방식은 requestAnimationFrame과 가상 노드 조작을 사용해 충분한 성능을 보인다. <br/>
하지만 뷰 함수는 읽기 쉽지 않다. <br/>
두 가지 중요한 문제를 갖고 있다. <br/>

- **하나의 거대한 함수** : 여러 DOM 요소를 조작하는 함수가 단 하나뿐이다. 이는 상황을 아주 쉽게 복잡하게 만들 수 있다.
- **동일한 작업을 수행하는 여러 방법** : DOM을 수정할 때, 문자열로 처리하거나 내부 text만 변경하거나 classList로 관리하는 등 여러 방법을 사용하고 있다.

```
view함수의 엔트리포인트

import todosView from "./todos.js";
import counterView from "./counter.js";
import filtersView from "./filters.js";

export default (targetElement, state) => {
  const element = targetElement.cloneNode(true);
  const list = element.querySelector(".todo-list");
  const counter = element.querySelector(".todo-count");
  const filters = element.querySelector(".filters");

  list.replaceWith(todosView(list, state));
  counter.replaceWith(counterView(counter, state));
  filters.replaceWith(filtersView(filters, state));

  return element;
};
```

```
Todos view함수

const getTodoElement = (todo) => {
  const { text, completed } = todo;
  return `
	  <li ${completed ? 'class="completed"' : ""}>
	  <div class="view">
		  <input ${completed ? "checked" : ""} class="toggle" type="checkbox"/>
		  <label>${text}</label>
		  <button class="destroy"></button>
	  </div>
	  <input class="edit" value="${text}"/>
	  </li>
	`;
};

export default (targetElement, { todos }) => {
  const newTodoList = targetElement.cloneNode(true);
  const todosElements = todos.map(getTodoElement).join();
  newTodoList.innerHTML = todosElements;
  return newTodoList;
};
```

```
Count View 함수

const getTodoCount = (todos) => {
  const notCompleted = todos.filter((todo) => !todo.completed);

  const { length } = notCompleted;
  if (length === 1) {
    return "1 Item left";
  }
  return `${length} Items left`;
};

export default (targetElement, { todos }) => {
  const newCounter = targetElement.cloneNode(true);
  newCounter.textContent = getTodoCount(todos);
  return newCounter;
};
```

```
Filter View 함수

export default (targetElement, { currentFilter }) => {
  const newCounter = targetElement.cloneNode(true);

  Array.from(newCounter.querySelector("li a")).forEach((a) => {
    if (a.textContent === currentFilter) {
      a.classList.add("selected");
    } else {
      a.classList.remove("selected");
    }
  });
  return newCounter;
};
```

## 🔧 구성 요소 함수

구성 요소 기반의 애플리케이션을 작성하려면 구성 요소 간의 상호작용에 **선언적 방식**을 사용해야 한다.
예제에선 todos,counters,filters의 세가지 구성요소를 가진다. <br/>
데이터 속성을 이용해 사용하는 컴포넌트를 정의하였다.

- [데이터 속성](https://developer.mozilla.org/ko/docs/Learn/HTML/Howto/Use_data_attributes)

```
data-component속성이 추가된 HTML페이지

<section class="todoapp">
  <header class="header">
    <h1>todos</h1>
    <input
      class="new-todo"
      placeholder="What needs to be done?"
      autofocus>
  </header>
  <section class="main">
    <input
      id="toggle=all"
      class="toggle-all"
      type="checkbox">
    <label for="toggle-all">
      Mark all as complete
    </label>
    <ul class="todo-list"></ul>
  </section>
  <footer class="footer">
    <span
      class="todo-count"
      data-component="counter">
      1 Item Left
    </span>
    <ul class="filters" data-component="filters">
      <li>
        <a href="#/">All</a>
      </li>
      <li>
        <a href="#/active">Active</a>
      </li>
      <li>
        <a href="#/completed">Completed</a>
      </li>
    </ul>
    <button class="clear-completed">
      Clear completed
    </button>
  </footer>
</body>
```

컴포넌트의 이름을 **data-component** 속성에 넣었다. <br/>
이 속성은 뷰 함수에서의 호출에서 사용된다. <br/>
컴포넌트 라이브러리를 생성하기 위한 또 다른 필수 조건은 **registry**로 모든 컴포넌트의 인덱스이다. <br/>

```
const registry = {
    todos: todosView,
    counter: counterView,
    filters: filtersView,
}
```

레지스트리의 키는 data-component의 속성과 **일치**한다. <br/>
컴포넌트 기반 렌더링 엔진의 핵심 메커니즘으로, 이 메커니즘은 루트 컨테이너 뿐만 아니라 모든 컴포넌트에 적용돼야 한다. <br/>
이렇게 하면 모든 컴포넌트가 다른 컴포넌트 안에서 불러와 사용될 수 있다. <br/>
이런 재사용성은 컴포넌트 기반 애플리케이션에서 필수적이다. <br/>

이 작업을 위해서는 모든 컴포넌트가 data-component 속성의 값을 읽고 올바른 함수를 호출할 수 있어야 한다. <br/>
이를 위해 컴포넌트를 래핑하는 고차 함수를 생성해야 한다.

```
컴포넌트를 래핑하는 고차함수

const renderWrapper = component => {
  return (targetElement, state) => {
    const element = component(targetElement, state);
    const childComponents = element.querySelectorAll('[data-component']);

    Array
      .from(childComponents)
      .forEach(target => {
        const name = target.dataset.component
        const child = registry[name];

        if(!child) {
          return;
        }

        target.replaceWith(child(target, state))
      })

    return element;
  }
}
```

해당 wrapper함수는 기존 컴포넌트를 가져와 동일한 구성의 새로운 컴포넌트를 반환한다. <br/>
wrapper는 레지스트리에서 data-component속성을 가진 모든 DOM요소를 찾는다. <br/>
요소가 발견되면 자식 컴포넌트를 동일한 함수로 래핑하여 호출한다. <br/>
레지스트리에 컴포넌트를 추가하려면 다음과 같은 컴포넌트를 래핑하는 함수가 더 필요하다.

```
레지스트리에 컴포넌트를 래핑하는 함수

const add = (name, component) => {
    registry[name] = renderWrapper(component);
}
```

컨트롤러에서 모든 요소를 합친 결과

```
import getTodos from "./getTodos.js";
import todosView from "./view/todos.js";
import counterView from "./view/counter.js";
import filtersView from "./view/filters.js";

import registry from "./registry.js";

registry.add("todos", todosView);
registry.add("counter", counterView);
registry.add("filters", filtersView);

const state = {
  todos: getTodos(),
  currentFilter: "All",
};

window.requestAnimationFrame(() => {
  const main = document.querySelector(".todoapp");
  const newMain = registry.renderRoot(main, state);
  main.replaceWith(newMain);
});
```

## 🏃‍♂️ 동적 데이터 렌더링

이전 예제에선 정적 데이터를 사용했다. <br/>
그러나 실제 애플리케이션에선 사용자나 시스템의 이벤트에 의해 데이터가 변경된다. <br/>
예시로 5초마다 상태를 무작위로 변경해보자.

```
5초마다 무작위로 데이터를 변경

const render = () => {
  window.requestAnimationFrame(() => {
    const main = document.querySelector(".todoapp");
    const newMain = registry.renderRoot(main, state);
    main.replaceWith(newMain);
  });
};

window.setInterval(() => {
  state.todos = getTodos();
  render();
}, 5000);

render();
```

## 🖥 가상 DOM

리액트에 의해 유명해진 가상 DOM 개념은 선언적 렌더링 엔진의 성능을 개선시키는 방법이다. <br/>
UI표현은 메모리에 유지되고 '실제' DOM과 동기화된다.
