<template>
    <div>
        <input type="text" class="todo-input" placeholder="Write your tasks here" v-model="newTodo"
            @keyup.enter="addTodo" />
        <transition-group name="fade" enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown">
            <todo-item v-for="todo in todosFiltered" :key="todo.id" :todo="todo" :checkAll="!anyRemaining"
                @removedTodo="removeTodo" @finishedEdit="finishedEdit"></todo-item>
        </transition-group>

        <div class="extra-container">
            <div>
                <label>
                    <input class="check-all-button" type="checkbox" :checked="!anyRemaining" @change="checkAllTodos" />
                    <span class="check-all-text">Check All</span>
                </label>
            </div>
            <div>{{ remaining }} items left</div>
        </div>

        <div class="extra-container">
            <div>
                <button :class="{ active: filter === 'all' }" @click="changeFilter('all')">All</button>
                <button :class="{ active: filter === 'active' }" @click="changeFilter('active')">Active</button>
                <button :class="{ active: filter === 'completed' }" @click="changeFilter('completed')">Completed</button>
            </div>

            <div>
                <transition name="fade">
                    <button v-if="showClearCompletedButton" @click="clearCompleted">
                        Clear Completed
                    </button>
                </transition>
            </div>
        </div>
    </div>
</template>
  
<script>
import TodoItem from './TodoItem';
import { mapState, mapMutations, mapGetters } from 'vuex';

export default {
    name: 'todo-list',
    components: {
        TodoItem,
    },
    data() {
        return {
            newTodo: '',
        };
    },
    computed: {
        ...mapState(['todos', 'filter']),
        ...mapGetters(['remaining', 'todosFiltered', 'showClearCompletedButton']),
        anyRemaining() {
            return this.remaining !== 0;
        },
    },
    methods: {
        ...mapMutations(['addTodo', 'checkAllTodos', 'clearCompleted', 'removeTodo', 'finishedEdit']),
        changeFilter(filter) {
            this.$store.commit('changeFilter', filter);
        },
        addTodo() {
            if (this.newTodo.trim().length === 0) {
                return;
            }

            this.$store.commit('addTodo', {
                id: this.idForTodo,
                title: this.newTodo,
                completed: false,
                editing: false,
            });

            this.newTodo = '';
            this.idForTodo++;
        },

    },
};
</script>
  
  
<style lang="scss">
@import url("https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css");

.todo-input {
    width: 100%;
    padding: 10px 18px;
    font-size: 18px;
    margin-bottom: 16px;
    font-weight: bold;
    border-radius: 20px;
    border: 0px;
    color: #4E9F3D;
    background-color: #D8E9A8;

    &:focus {
        outline: 0;
    }
}

.todo-input::placeholder {
    font-weight: normal;
}

.todo-item {
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    animation-duration: 0.3s;
}

.remove-item {
    cursor: pointer;
    margin-left: 14px;

    &:hover {
        color: black;
    }
}

.todo-item-left {
    display: flex;
    align-items: center;
}

.todo-item-left input[type="checkbox"] {
    appearance: none;
    width: 25px;
    height: 23px;
    background-color: white;
    border: 2px solid #4E9F3D;
    border-radius: 4px;
    cursor: pointer;
    outline: none;
    font-weight: bold;
}

.todo-item-left input[type="checkbox"]:checked::before {
    content: "\2713";
    font-size: 16px;
    color: white;
    background-color: #4E9F3D;
    line-height: 20px;
    text-align: center;
    display: block;
}

.todo-item-label {
    padding: 10px;
    border: none;
    margin-left: 12px;
}

.todo-item-edit {
    font-size: 24px;
    color: #2c3e50;
    margin-left: 12px;
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;

    &:focus {
        outline: none;
    }
}

.check-all-button {
    appearance: none;
    width: 23px;
    height: 23px;
    background-color: white;
    border: 2px solid #4E9F3D;
    border-radius: 4px;
    cursor: pointer;
    outline: none;
    font-size: 30px;
    line-height: 20px;
    vertical-align: middle;
}

.check-all-button:checked::before {
    content: "\2713";
    font-size: 18px;
    color: white;
    line-height: 20px;
    text-align: center;
    display: block;
    background-color: #4E9F3D;
}

.check-all-text {
    font-size: 18px;
    margin-left: 20px;
}

.completed {
    text-decoration: line-through;
    color: grey;
}

.extra-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 16px;
    border-top: 1px solid lightgrey;
    padding-top: 14px;
    margin-bottom: 14px;
}

button {
    font-size: 14px;
    background-color: #D8E9A8;
    appearance: none;
    margin-right: 5px;
    border: none;
    border-radius: 5px;
    padding: 5px;

    &:hover {
        background: #4E9F3D;
        font-weight: bold;
        color: #191A19;
    }

    &:focus {
        outline: none;
    }
}

.active {
    background: #4E9F3D;
}


.fade-enter-active,
.fade-leave-active {
    transition: opacity .2s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>