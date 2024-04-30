// 여기서 작성하는 데이터 모델은 랜덤 데이터 생성에 유용한 작은 라이브러리인 Faker.js로 생성된 랜덤 배열

// window 객체에서 faker를 추출.
// <script> 태그를 통해 스크립트가 포함된 웹 환경에서 일반적으로 Faker 라이브러리가 전역 window 객체로 로드된 것을 가정
const { faker } = window

// 할 일 항목을 나타내는 객체를 반환하는 함수
// text: 2개의 무작위 단어로 구성된 문자열
// completed: 이 속성은 할 일이 완료되었는지 여부를 시뮬레이션한다.
const createElement = () => ({
    text: faker.random.words(2),
    completed: faker.random.boolean()
})

// 지정된 elementFactory 함수를 주어진 number만큼 반복 호출하여 요소의 배열을 생성
const repeat = (elementFactory, number) => {
    const array = []
    for (let index = 0; index < number; index++) {
        array.push(elementFactory())
    }
    return array
}

// 내보낼 함수
// faker를 사용하여 10까지의 무작위 숫자를 선택하여 생성할 할일 항목의 수를 결정
// createElement를 elementFactory로, 무작위 숫자를 number로 전달하여 repeat 함수를 호출함으로써 무작위로 생성된 할 일 항목의 배열 생성
export default () => {
    const howMany = faker.random.number(10)
    return repeat(createElement, howMany)
}