import getTodos from "./getTodos.js";
import todosView from "./view/todos.js";
import counterView from "./view/counter.js";
import filtersView from "./view/filters.js";
import appView from "./view/app.js";
import registry from "./registry.js";
import applyDiff from "./applyDiff.js";

registry.add("app", appView);
registry.add("todos", todosView);
registry.add("counter", counterView);
registry.add("filters", filtersView);

const state = {
  todos: getTodos(),
  currentFilter: "All",
};

const render = () => {
  window.requestAnimationFrame(() => {
    const $main = document.querySelector("#root");
    const newMain = registry.renderRoot($main, state);
    applyDiff(document.body, $main, newMain);
  });
};

window.setInterval(() => {
  state.todos = getTodos();
  render();
}, 5000);

render();
