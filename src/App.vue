<template>
  <div id="app" class="container">
    <h1 class="title">Todo List App</h1>
    <todo-list/>
  </div>
</template>


<script>
import TodoList from './components/TodoList.vue'

export default {
  name: 'App',
  components: {
    TodoList,
  }
}
</script>

<style>
* {
  box-sizing: border-box;
}

.container {
  max-width: 600px;
  margin: 0 auto;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
  font-size: 24px;
}

.title {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>