const isNodeChanged = (node1, node2) => {
    const n1Attributes = node1.attributes
    const n2Attributes = node2.attributes
    if (n1Attributes.length !== n2Attributes.length) {
        return true
    }

const differentAttribute = Array
    .from(n1Attributes)
    .find(attribute => {
        const { name } = attribute
        const attribute1 = node1
            .getAttribute(name)
        const attribute2 = node2
            .getAttribute(name)
        
        return attribute1 != attribute2
    })

    if (differentAttribute) {
        return true
    }

    if (node1.children.length === 0 &&
        node2.children.length === 0 &&
        node1.textContent !== node2.textContent) {
            return true
        }
    return false
    }

    /*
        applyDiff 함수 매개변수
        (1) parentNode: 실제 DOM에서 realNode가 속한 부모 DOM 노드.
                        이 노드의 자식들을 추가하거나 제거할 때 기준점으로 사용.
                        실제 DOM에서 이 노드의 자식요소에 접근하고 수정할 수 있는 방법 제공.
        (2) realNode: 가상 DOM의 virtualNode에 해당하는 실제 DOM 노드.
                      업데이트 전에 페이지에 렌더링된 실제 DOM이며, realNode가 null인 경우
                      해당 위치에 존재하는 실제 DOM 노드가 없다는 것을 나타내며 이때 새로운 노드를 추가해야한다.
        (3) virtualNode: realNode를 대체하거나 업데이트해야 하는 가상 DOM 노드.
                         virtualNode가 null인 경우, 새로운 상태에서 더 이상 존재하지 않아야하므로
                         기존 realNode를 제거해야 한다.
    */
    const applyDiff = (
        parentNode,
        realNode,
        virtualNode) => {
            if (realNode && !virtualNode) {
                realNode.remove()
                return
            }
            
            if (!realNode && virtualNode) {
                parentNode.appendChild(virtualNode)
                return
            }

            if (isNodeChanged(virtualNode, realNode)) {
                realNode.replaceWith(virtualNode)
                return
            }

            const realChildren = Array.from(realNode.children)
            const virtualChildren = Array.from(virtualNode.children)

            const max = Math.max(
                realChildren.length,
                virtualChildren.length
            )
            for (let i = 0; i < max; i++) {
                applyDiff(
                    realNode,
                    realChildren[i],
                    virtualChildren[i]
                )
            }
        }

        export default applyDiff
        