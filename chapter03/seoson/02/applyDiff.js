const isNodeChanged = (node1, node2) => {
  const n1Attributes = node1.attributes;
  const n2Attributes = node2.attributes;

  if (n1Attributes.length !== n2Attributes.length) {
    return true;
  } // 속성수가 다르다

  const differentAttribute = Array.from(n1Attributes).find((attribute) => {
    const { name } = attribute;
    const attribute1 = node1.getAttribute(name);
    const attribute2 = node2.getAttribute(name);

    return attribute1 !== attribute2;
  });

  if (differentAttribute) {
    return true;
  } // 하나 이상의 속성이 변경됐다

  if (
    node1.children.length == 0 &&
    node2.children.length === 0 &&
    node1.textContent !== node2.textContent
  ) {
    return true;
  } // 노드에는 자식이 없으며 textContent가 다르다.

  return false;
};

const applyDiff = (parentNode, realNode, virtualNode) => {
  if (realNode && !virtualNode) {
    realNode.remove();
    return;
  } // 새 노드가 정의되지 않은 경우 실제 노드를 삭제한다
  if (!realNode && virtualNode) {
    parentNode.appendChild(virtualNode);
    return ;
  } // 실제 노드가 정의되지 않았지만 가상 노드가 존재하는 경우 부모노드에 추가한다
  if (isNodeChanged(virtualNode, realNode)) {
    realNode.replaceWith(virtualNode);
    return ;
  }

  const realChildren = Array.from(realNode.children);
  const virtualChildren = Array.from(virtualNode.children);

  const max = Math.max(realChildren.length, virtualChildren.length);

  for (let i = 0; i < max; i++) {
    applyDiff(realNode, realChildren[i], virtualChildren[i]);
  }
};

export default applyDiff;
