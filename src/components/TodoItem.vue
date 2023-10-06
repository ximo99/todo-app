<template>
    <div class="todo-item">
        <div class="todo-item-left">
            <input type="checkbox" v-model="completed" @change="updateTodoStatus">
            <div class="todo-item-label" :class="{ completed: completed }">{{ title }}</div>
        </div>
        <div class="remove-item" @click="removeTodo(todo.id)">&times;</div>
    </div>
</template>
  
<script>
import { mapMutations } from 'vuex';

export default {
    name: 'todo-item',
    props: {
        todo: {
            type: Object,
            required: true,
        },
        checkAll: {
            type: Boolean,
            required: true,
        }
    },
    data() {
        return {
            'id': this.todo.id,
            'title': this.todo.title,
            'completed': this.todo.completed,
        }
    },
    watch: {
        checkAll() {
            this.completed = this.checkAll ? true : this.todo.completed
        }
    },
    methods: {
        ...mapMutations(['removeTodo', 'updateTodo']),
    }
}
</script>