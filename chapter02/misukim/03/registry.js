/*
구성 요소 라이브러리를 생성하기 위해 또 다른 필수 조건은 레지스트리(registry) - 레지스트리 패턴 - 로,
레지스트리는 애플리케이션에서 사용할 수 있는 모든 구성 요소의 인덱스다.
여기서 구현할 수 있는 가장 간단한 레지스트리는 아래와 같은 일반 자바스크립트 객체다.

const registry = {
    'todos' : todosView,
    'counter' : counterView,
    'filters' : filtersView
}

레지스트리의 키는 data-component 속성 값과 일치한다. 이것이 구성 요소 기반 렌더링 엔진의 핵심 메커니즘이다.
이 메커니즘은 루트 컨테이너(애플리케이션 뷰 함수)뿐만 아니라 생성할 모든 구성 요소에도 적용돼야 한다.
이렇게 하면 모든 구성 요소가 다른 구성 요소 안에서도 사용될 수 있다. 이런 재사용성은 구성 요소 기반 애플리케이션에서 필수적이다.

이 작업을 위해서는 모든 구성 요소가 data-component 속성의 값을 읽고 올바른 함수를 자동으로 호출하는 기본 구성 요소에서 상속돼야 한다.
하지만 순수 함수로 작성하고 있기 때문에 실제로는 이 기본 객체에서 상속받을 수 없다. 따라서 구성 요소를 래핑하는 고차 함수(high-order function)을 작성해야한다.component. 
*/

// 이 객체는 컴포넌트 함수를 저장하는 레지스트리로 작동. 여기에 등록된 컴포넌트는 특별한 렌더링 함수로 감싸져 저장되며 이름으로 검색 가능하다.
const registry = {}

// 컴포넌트 함수를 입력받아 새로운 함수를 반환하는 '고차 함수'
// 이 새로운 함수는 렌더링된 요소 내에 정의된 자식 컴포넌트를 처리하도록 설계되었다.
// 반환된 함수는 targetElement와 state를 기반으로 component 함수를 호출하여 DOM 요소를 생성
// 자식 컴포넌트 렌더링: data-component 값으로 레지스트리에서 적절한 컴포넌트 함수를 검색한다.
//                  찾은 경우, 현재 target과 state를 전달하여 등록된 자식 컴포넌트 함수를 호출한 결과로 플레이스홀더를 대체
const renderWrapper = component => {
    return (targetElement, state) => {
        const element = component(targetElement, state)

        const childComponents = element
            .querySelectorAll('[data-component]')

        Array
            .from(childComponents)
            .forEach(target => {
                const name = target
                    .dataset
                    .component
                
                const child  = registry[name]
                if (!child) {
                    return 
                }

                target.replaceWith(child(target, state)) 
            })
        return element
    }
}

// 주어진 이름으로 레지스트리에 컴포넌트를 등록하는 함수
// 이 함수는 renderWrapper로 컴포넌트를 감싸서 렌더링될 때 자식 컴포넌트를 올바르게 처리하도록 한다.
const add = (name, component) => {
    registry[name] = renderWrapper(component)
}

// 애플리케이션의 루트에서 렌더링을 초기화한다. cloneNode(true)를 사용하여 root 요소의 얕은 복사본을 만든다.
//      이렇게 하면 이벤트 리스너나 자식 노드 내의 데이터도 복사된다.
// 이 함수는 기본 복제 컴포넌트에 renderWrapper를 사용하여 루트에 존재할 수 있는 자식 컴포넌트를 처리하고 현재 애플리케이션 state를 적용.
const renderRoot = (root, state) => {
    const cloneComponent = root => {
        return root.cloneNode(true)
    }

    return renderWrapper(cloneComponent)(root, state)
}

// 모듈은 add와 renderRoot 함수를 내보내며, 애플리케이션의 다른 부분에서 컴포넌트를 등록하고 렌더링 프로세스를 루트에서 시작할 수 있도록 한다.
// 최초 DOM 요소에서 렌더링을 시작하려면 애플리케이션의 루트를 렌더링하는 메소드를 제공해야한다. 예제 애플리케이션에서 이 메소드는 renderRoot
// add와 renderRoot 메소드는 구성 요소 레지스트리의 공용 인터페이스
export default {
    add,
    renderRoot
}