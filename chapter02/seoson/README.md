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
UI표현은 메모리에 유지되고 '실제' DOM과 동기화된다. <br/>
실제 DOM은 가능한 적은 작업을 수행한다. <br/>
이 과정은 **조정**이라고 불린다.
<br/>
예를 들어 실제 DOM 요소가 다음과 같은 간단한 리스트라고 가정해보자.

```
<ul>
  <li>First Item</li>
</ul>
```
이를 다음과 같은 새 요소의 리스트로 변경하고자 한다.

```
<ul>
  <li>First Item</li>
  <li>Second Item</li>
</ul>
```
이전 알고리즘에서는 전체 ul을 교체했다.
<br/>
가상 DOM 방법을 사용하면 시스템은 추가된 마지막 li가 실제 DOM에 필요한 유일한 작업임을 동적으로 이해한다. <br/>
가상 DOM의 핵심은 **diff 알고리즘** 이다. <br/>
이 알고리즘은 실제 DOM을 문서에서 분리된 새로운 DOM 요소의 사본으로 바꾸는 가장 빠른 방법을 찾아낸다.

![title](https://velog.velcdn.com/images/junvhui/post/92f06c91-6660-47f2-99ed-f57a103054d2/image.png)

## 🏠 간단한 가상 DOM 구현

```
diff 알고리즘을 사용하는 메인 컨트롤러

const render = () => {
  window.requestAnimationFrame(() => {
        const main = document.querySelector('.todoapp');
        const newMain = registry.renderRoot(main, state);
        applyDiff(document.body, main, newMain);
  }
}
```
해당 diff알고리즘 구현에서는 노드를 다른 노드와 비교해 노드가 변경됐는지 확인한다.
- 속성 수가 다르다.
- 하나 이상의 속성이 변경됐다.
- 노드에는 자식이 없으며, textContent가 다르다.
<br/>
이 외에도 실제 노드가 있는지, 가상노드가 있는지 등을 확인하여 applyDiff가 모든 하위 노드까지 적용되도록 반복한다.

```
  const realChildren = Array.from(realNode.children);
  const virtualChildren = Array.from(virtualNode.children);

  const max = Math.max(realChildren.length, virtualChildren.length);

  for (let i = 0; i < max; i++) {
    applyDiff(realNode, realChildren[i], virtualChildren[i]);
  }
```
