import { createStore } from "vuex";

export default createStore({
  state: {
    newTodo: "",
    idForTodo: 3,
    filter: "all",
    todos: [
      {
        id: 1,
        title: "Finish the homework",
        completed: true,
      },
      {
        id: 2,
        title: "Clean the kitchen",
        completed: false,
      },
      {
        id: 3,
        title: "Take the dog to the vet",
        completed: false,
      },
    ],
  },
  mutations: {
    addTodo(state, newTodo) {
      state.todos.push(newTodo);
    },
    removeTodo(state, id) {
      state.todos = state.todos.filter((todo) => todo.id !== id);
    },
    checkAllTodos(state) {
      const areAllCompleted = state.todos.every((todo) => todo.completed);
      state.todos.forEach((todo) => (todo.completed = !areAllCompleted));
    },
    changeFilter(state, filter) {
      state.filter = filter;
    },
  },
  getters: {
    remaining(state) {
      return state.todos.filter((todo) => !todo.completed).length;
    },
    anyRemaining(state, getters) {
      return getters.remaining !== 0;
    },
    todosFiltered(state) {
      if (state.filter === "all") {
        return state.todos;
      } else if (state.filter === "active") {
        return state.todos.filter((todo) => !todo.completed);
      } else if (state.filter === "completed") {
        return state.todos.filter((todo) => todo.completed);
      }
      return state.todos;
    },
    showClearCompletedButton(state) {
      return state.todos.filter((todo) => todo.completed).length > 0;
    },
  },
});
