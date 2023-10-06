<template>
    <div class="todo-item">
        <div class="todo-item-left">
            <input type="checkbox" v-model="completed" @change="updateTodoStatus">

            <div v-if="!editing" @dblclick="editTodo" class="todo-item-label" :class="{ completed: completed }">{{ title }}
            </div>
            <input v-else class="todo-item-edit" type="text" v-model="title" @blur="doneEdit" @keyup.enter="doneEdit"
                @keyup.esc="cancelEdit" v-focus>
        </div>
        <div class="remove-item" @click="removeTodo(todo.id)">
            &times;
        </div>
    </div>
</template>
  
<script>
import { mapMutations } from 'vuex'; // Importa las utilidades de Vuex

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
            'editing': this.todo.editing,
            'beforeEditCache': '',
        }
    },
    watch: {
        checkAll() {
            this.completed = this.checkAll ? true : this.todo.completed
        }
    },
    directives: {
        focus: {
            inserted: function (el) {
                el.focus()
            }
        }
    },
    methods: {
        // Mapea las mutaciones de Vuex
        ...mapMutations(['removeTodo', 'updateTodo']),
        updateTodoStatus() {
            this.$store.commit('updateTodo', {
                id: this.id,
                title: this.title,
                completed: this.completed,
            });
        },
    }
}
</script>
  