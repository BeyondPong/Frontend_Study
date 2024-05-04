## 5. HTTP 요청

5장에서는 프레임워크 없는 방식으로 HTTP 클라이언트를 구축하는 방법을 알아본다. <br/>

## 📕 AJAX

1999년 이전에는 서버에서 데이터를 가져올 필요가 있는 경우 전체 페이지를 다시 로드해야 했다. <br/>
1999년도 부터 지메일 구글지도 같은 애플리케이션들은 페이지를 완전히 로드하지 않고 최초 페이지 로드 후 필요한 데이터만 서버에서 로드하는 새로운 기술을 사용하기 시작한다. <br/>
이 기술을 Asynchronous JavaScript and XML(비동기 자바스크립트 및 XML) <br/>
의 약어인 AJAX로 명명했다. <br/>

AJAX 애플리케이션의 핵심은 XMLHttpRequest 객체다. <br/>
해당 객체를 통해 HTTP 요청으로 서버에서 데이터를 가져올 수 있다. <br/>
AJAX의 'X'는 XML을 나타낸다. AJAX가 등장했을 때 웹 애플리케이션은 서버 데이터를 XML형식으로 수신했다. 그러나 지금은 좀 더 친숙한 JSON형식이 사용된다. <br/>

## ⌘ REST

REpresentational State Transfer의 약자로 웹 서비스를 디자인하고 개발하는 방법이다. <br/>
도메인을 리소스로 분할해야 하며, 각 리소스는 특정 URI로 접근해 읽거나 조작할 수 있어야 한다. <br/>

| 동작                            | URI                             | HTTP 메서드 |
| ------------------------------- | ------------------------------- | ----------- |
| 모든 사용자의 데이터 읽기       | https://api.example.com/users/  | GET         |
| ID가 1인 사용자의 데이터 읽기   | https://api.example.com/users/1 | GET         |
| 새로운 사용자 생성              | https://api.example.com/users   | POST        |
| ID가 1인 사용자 데이터 교체     | https://api.example.com/users/1 | PUT         |
| ID가 1인 사용자 데이터 업데이트 | https://api.example.com/users/1 | PATCH       |
| ID가 1인 사용자 데이터 삭제     | https://api.example.com/users/1 | DELETE      |

데이터 업데이트 PATCH와, 데이터 교체 PUT의 차이가 있다. <br/>
PUT 메서드를 사용할 때는 HTTP 요청의 본문에 새로운 사용자의 모든 데이터를 전달해야 한다. <br/>
PATCH 메서드의 경우는 이전 상태와의 차이만 포함한다. <br/>

HTTP 클라이언트의 핵심은 request메서드다. <br>
완료된 요청에 대한 onload 콜백, 오류로 끝나는 HTTP에 대한 onerror 콜백과 타임아웃된 요청에 대한 ontimeout 콜백이 있다. <br/>
HTTP 클라이언트의 공개 API는 프라미스를 기반으로 한다. <br/>
따라서 request 메서드는 표준 XMLHttpRequest 요청을 새로운 **Promise 객체**로 묶는다. <br/>

```
XMLHttpRequest를 사용한 HTTP 요청의 흐름

1. 새로운 XMLHttpRequest 객체 생성 (new XMLHttpRequest().
2. 특정 URL로 요청을 초기화 (xhr.open(method,url))
3. 요청(헤더 설정, 타임아웃 등을 구성
4. 요청 전송(xhr.send(JSON.stringify(body)))
5. 요청이 끝날 때까지 대기
   a. 요청이 성공적으로 끝나면 onload 콜백 호출
   b. 요청이 오류로 끝나면 onerror 콜백 호출
   c. 요청이 타임아웃으로 끝나며 ontimeout 콜백 호출
```

## 📝 Fetch
Fetch는 원격 리소스에 접근하고자 만들어진 새로운 API다. <br/>
이 API의 목적은 Request나 Response 같은 많은 네트워크 객체에 대한 표준 정의를 제공하는 것이다. <br/>
 ```
Fetch API를 기반으로 하는 HTTP 클라이언트

const request = async (params) =>{
    const {method = 'GET', url, headers={}, body} = params;
    const config = {
        method,
        headers: new windowHeaders(headers);
}
    if (body) {
        config.body = JSON.stringify(body);
}
    const response = await window.fetch(url,config);
    return parseResponse(response);
}
```
여기서 다른점은 window.fetch로 fetch api를 사용하는 부분이다. <br/>
fetch api는 promise를 return 한다. <br/>