 ## 2. 렌더링
웹 애플리케이션에서 가장 중요한 기능 중 하나는 **데이터 표시**다. <br/>
데이터를 표시한다는 것은 화면같은 출력장치에 **렌더링**하는 것을 의미한다.<br/>
2장의 목적은 프레임워크 없이 DOM을 효과적으로 조작하는 방법을 배우는 데 있다.

## 𝌭문서 객체 모델 (DOM)
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

<details><summary>MVC 어플리케이션 뼈대 코드
</summary>

</details>