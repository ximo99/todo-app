<template>
  <div id="app" class="container">
    <h1 class="title">Todo List App</h1>
    <h2 class="subtitle">by Ximo Casanova</h2>
    <todo-list></todo-list>
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
  background-color: #191A19;
}

.container {
  max-width: 600px;
  margin: 0 auto;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-top: 60px;
  font-size: 24px;
  background-color: #191A19;
  color: #D8E9A8;
}

.title {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 30px;
}

.subtitle {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  font-weight: normal;
  margin-bottom: 5%;
}
</style>