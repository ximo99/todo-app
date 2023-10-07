import { createStore } from "vuex";

export default createStore({
  state: {
    newTodo: "",
    idForTodo: 10,
    filter: "all",
    todos: [
      {
        id: 1,
        title: "Finish the homework",
        completed: true,
        editing: false,
      },
      {
        id: 2,
        title: "Clean the kitchen",
        completed: false,
        editing: false,
      },
      {
        id: 3,
        title: "Visit the vet",
        completed: false,
        editing: false,
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
    clearCompleted(state) {
      state.todos = state.todos.filter((todo) => !todo.completed);
    },
    finishedEdit(state, updatedTodo) {
      const index = state.todos.findIndex((todo) => todo.id === updatedTodo.id);
      if (index !== -1) {
        state.todos[index] = { ...state.todos[index], ...updatedTodo };
      }
    },
    changeFilter(state, filter) {
      state.filter = filter;
    },
  },
  getters: {
    remaining(state) {
      return state.todos.filter((todo) => !todo.completed).length;
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
