export default {
    props: ['data'],
    template: `
        <div class="note-todo">
                <h3 class="title">{{noteTitle}}</h3>
                    <ol class="todos-list">
                    <li v-for="todo in noteTodos" class="todo" :key="todo.id" :class="setTodoClassStatus(todo)" @click="toggleTodo(todo.id)">
                        <p  > 
                            {{todo.txt}}
                            <span v-if="todo.doneAt"> {{getDateTime(todo.doneAt)}}</span>
                       </p>
                    </li>
                    </ol>
        </div>
    `,
    data() {
        return {}
    },
    methods: {
        toggleTodo(todoId) {
            this.$emit('toggleTodo', todoId);
        },
        setTodoClassStatus(todo) {
            return (todo.doneAt) ? 'done' : '';
        },
        getDateTime(timeStamp) {
            const date = new Date(timeStamp).toLocaleDateString();
            const time = new Date(timeStamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            return date + ' ' + time;
        }
    },
    computed: {
        noteTitle() {
            return this.data.info.title;
        },
        noteTodos() {
            return this.data.info.todos;
        },
    }
}