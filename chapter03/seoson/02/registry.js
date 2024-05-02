const registry = {};

const renderWrapper = (component) => {
  return (targertElement, state, events) => {
    const element = component(targertElement, state, events);

    const childComponents = element.querySelectorAll("[data-component]");

    Array.from(childComponents).forEach((target) => {
      const name = target.dataset.component;

      const child = registry[name];
      if (!child) {
        return;
      }

      target.replaceWith(child(target, state, events));
    });
    return element;
  };
};

const add = (name, component) => {
  registry[name] = renderWrapper(component);
};

const renderRoot = (root, state, events) => {
  const cloneComponent = (root) => {
    return root.cloneNode(true);
  };

  return renderWrapper(cloneComponent)(root, state, events); //render wrapper함수에 root복사본을 component인자로 넣고, targetElement,state에 root,state변수가 들어가게 되는 커링.
};

export default {
  add,
  renderRoot,
};
