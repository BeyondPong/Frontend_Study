
## 4. 웹 구성 요소
오늘날 프론트엔드 프레임워크에는 공통점이 있다. <br/>
모두 UI 구성을 위한 기본 블록으로 구성 요소를 사용한다. <br/>
4장 에서는 웹 구성 요소라고 하는 **네이티브 API세트**를 사용해 웹 애플리케이션의 구성 요소를 작성할 수 있다.

## 📝 API
웹 구성 요소는 세 가지 중요 기술로 구성된다. <br/>
이 기술은 개발자가 재사용할 수 있는 UI 구성 요소를 작성하고 게시할 수 있게 해준다.
<br/>

- **HTML 템플릿** <br/>
: template태그는 콘텐츠가 렌더링 되지는 않지만 자바스크립트 코드에서 동적인 콘텐츠를 생성하는데 '스탬프'로 사용되도록 하려는 경우에 유용하다.

- **사용자 정의 요소** <br/>
: 해당 API를 통해 개발자는 자신만의 DOM 요소를 작성할 수 있다.

- **섀도우 DOM** <br/>
: 해당 기술은 웹 구성요소가 구성 요소 외부의 DOM에 영향을 받지 않아야 하는 경우에 유용하다.

```섀도우DOM과 가상DOM은  다른 개념이다.``` <br/>
웹 구성 요소는 웹 엔진마다 다르게 지원하는 기능이다. <br/>
IE의 경우 세가지 기능을 모두 지원하지 않으니 조심해야 한다. <br/>

## 🙋‍♂️ 사용자 정의 요소
사용자 정의요소 API를 이용해, 다음과 같이 사용자 정의 HTML 태그를 작성할 수 있다.
```
<app-calander/>
```
우연히 app-calander라는 이름을 사용한 것이 아니다! <br/>
사용자 정의 요소 API 사용해 사용자 정의 태그를 작성할 때는, 대시로 구분된 두단어 이상의 태그를 사용해야 한다.

```
HelloWorld 사용자 정의 태그 만들기

export default class HelloWorld extends HTMLElement {
    connectedCallback() {
        window.requestAnimationFrame( ()=> {
          this.innerHTML = '<div>Hello World! </div>';
})
    }
}
```
connectedCallback은 사용자 정의 요소의 라이프사이클 메서드 중 하나다. <br/>
해당 메서드는 구성 요소가 DOM에 연결될 때 호출된다. <br/>
리액트의 componentDidMount메서드와 유사하다. <br/>

<br/>새로 구성된 이 구성 요소를 사용하려면 브라우저 구성 요소 레지스트리에 추가해야 한다. <br/>
```
사용자 정의 요소 레지스트리에 HelloWorld추가
import HelloWorld from './component/HelloWorld.js'

window.customElements.define('hello-world', HelloWorld);
```

<br/>
또한, 게터/세터를 이용하여 사용자 정의 태그에 속성을 추가할 수 있다.

```
사용자 정의 요소에 속성 설정

const DEFAULT_COLOR = "black";

export default class HelloWorld extends HTMLElement {
  get color() {
    return this.getAttribute("color") || DEFAULT_COLOR;
  }
  set color(value) {
    this.setAttribute("color", value);
  }
  connectedCallback() {
    window.requestAnimationFrame(() => {
      const div = document.createElement("div");
      div.textContent = "Hello World!";
      div.style.color = this.color;
      this.appendChild(div);
    });
  }
}
```