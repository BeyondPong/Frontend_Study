## 3. DOM 이벤트 관리

웹 애플리케이션은 고정된 그림이 아니다. <br/>
애플리케이션의 내용은 시간이 지남에 따라 변경된다. <br/>
이런 변경이 발생하게 만드는 것이 **이벤트**다. <br/>
이벤트는 DOM API에서 매우 중요한 부분이다. <br/>
3장의 목적은 이벤트 핸들러가 무엇이며 이를 DOM요소에 올바르게 연결하는 방법을 배운다.

## 🎪 DOM 이벤트 API

**이벤트**는 웹 애플리케이션에서 발생하는 동작으로, 브라우저는 사용자에게 이를 알려줘 사용자는 어떤 방식으로든 반응할 수 있다. <br/>
`이벤트에 반응하려면 이벤트를 트리거한 DOM요소에 연결해야 한다.`

- **속성에 핸들러 연결** <br/>
  빠르지만 지저분한 방법으로 **on속성**을 이용하는 방법이 있다.

```
let button = document.querySelector("#property");
button.onClick = () => {
  console.log("Clicked!");
};
```

`왜냐하면 한 번에 한 핸들러`만 연결 할 수 있어서 좋지 않은 방법이다. <br/>

- **addEventListener로 핸들러 연결** <br/>
  한 이벤트에 여러 핸들러가 등록 가능하다.

```
다수의 이벤트 핸들러 등록

div.addEventListener("click", ()=>{
  console.log("Clicked! 1");
}, false);

div.addEventListener("click", ()=>{
  console.log("Clicked! 2");
}, false);
```

DOM에 요소가 더 이상 존재하지 않으면, 메모리 누수를 방지하고자 이벤트를 지워야 한다. <br/>
이때 removeEventListener로 제거가 가능하다.

```
이벤트 핸들러 삭제

const button =  document.querySelector('button');

const firstHandler = () => {
  console.log('first handler!");
}

button.addEventListener('click', firstHandler);
button.removeEventListener('click', firstHandler);
```

중요한 점은 이벤트 핸들러를 제거하려면 매개변수로 전달되는 메소드에 대한 참조를 유지해야 한다.

## 🎉 이벤트 객체

웹에 전달된 `모든 이벤트에는 Event 인터페이스를 구현` <br/>

타입에 따라 이벤트 객체는 Event 인터페이스를 확장하는 좀 더 구체적인 Event 인터페이스를 구현할 수 있다.

```
ex) click이벤트는 MouseEvent인터페이스를 구혀난다.
```

## 🚲 DOM 이벤트 라이프 사이클

addEventListener 메서드를 사용해 핸들러를 추가하는 코드에는 일반적으로 다음과 같은 내용이 포함된다.

```
button.addEventListener('click',handler,false);
```

세번째 매개변수는 useCapture라고 불리며 기본값은 false다. <br/>
해당 매개변수는 선택사항이긴 하지만 이상적으로 폭넓은 브라우저 호환성을 얻으려면 포함시켜야 한다. <br/>
이벤트를 캡처한다는것은 무엇을 의미하는지? <br/>
useCapture를 true로 설정하면 어떻게 되는지?
알아보자.

```
간단한 중첩 HTML구조

<body>
  <div>
    This is a container
    <button>Click Here</button>
   </div>
</body>
```

```
버블 단계 메커니즘의 예

const button = document.querySelector('button');
const div = document.querySelector('div');

div.addEventListener('click', () => {
  console.log('div clicked!');
},false);

button.addEventListener('click', () => {
  console.log('button clicked!');
},false);
```

버튼을 클릭하면 어떤 일이 발생할까? <br/>

button이 div안에 있으므로 button부터 시작해 두 핸들러가 모두 호출된다. <br/>
따라서 이벤트 객체는 이를 트리거한 DOM 노드에서 시작해 모든 조상 노드로 올라간다. <br/>
이 메커니즘을 버블단계, 이벤트 버블링 이라고 한다. <br/>
Event 인터페이스의 stopPropagation메소드를 사용해 버블 체인을 중지할 수 있다.

```
버블 체인 중지

const button = document.querySelector('button');
const div = document.querySelector('div');

div.addEventListener('click', () => {
  console.log('Div Clicked!');
}, false);

button.addEventListener('click', () => {
  e.stopPropagation();
  console.log('button Clicked!');
}, false);
```

예제에서 div호출러는 호출되지 않는다. <br/>
이 기술은 복잡한 레이아웃에선 유용할 수 있지만, 핸들러의 순서에 의존하는 경우 코드를 유지하기가 어려워질 수 있으니 주의해야 한다. <br/>
useCapture매개변수를 이용해 핸들러의 실행 순서를 반대로 할 수 있다. <br/>
버블 단계에서는 핸들러가 상향식으로 처리되는 반면, 캡처 단계에서는 반대로 처리된다. <br/>
생성된 모든 DOM 이벤트에 대해 브라우저는 캡처단계를 실행한 다음, 버블단계를 실행한다. <br/>
목표단계라고 하는 세 번째 단계도 있다. <br/>목표 단계는 이벤트가 목표요소에 도달할 때 발생한다. <br/>
![title](https://velog.velcdn.com/images/junvhui/post/e38efdf2-7c9a-4919-9927-3af0d67a1ac8/image.png)

- **캡처링** -> **타깃** -> **버블링** <br/>
  단계로 일어난다.
정리하자면 addEventListner로 dom에 이벤트 등록시에, 세번 째 변수로 useCapture가 있다. <br/>
기본 값은 False로 설정되어있으며, false시에 이벤트가 버블링으로 발생한다. <br/>
이 값을 true로 줄 시 캡처링 단계에서 이벤트가 먼저 발생한다. <br/>

## 🧩 사용자 정의 이벤트

DOM이벤트 API에서는 사용자 정의 이벤트 타입을 정의하고 다른 이벤트처럼 처리할 수 있다. <br/>
사용자 정의 이벤트를 생성하려면 CustromEvent 생성자 함수를 사용한다. <br/>

```
사용자 정의 이벤트

const EVENT_NAME = 'FiveCharInputValue';
const input = document.querySelector('input');

input.addEventListener('input', () => {
  const {length} = input.value;
  if (length === 5) {
      const time = (new Date()).getTime();
      const event = new                 CustomEvent(EVENT_NAME, {
        detail : {
            time
        }
    });
    input.dispatchEvent(event); // 이벤트를 만들고 반드시 호출
  }
});

input.addEventListener(EVENT_NAME, (e)=>{
    console.log('custom event..');
});
```

## 이벤트 위임

리스트 자체에 하나의 이벤트 핸들러만 연결한다. <br/>
