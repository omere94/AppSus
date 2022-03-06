import noteTxt from "./notes/note-txt.js";
import noteImg from "./notes/note-img.js";
import noteTodos from "./notes/note-todos.js";
import noteVideo from "./notes/note-video.js";

export default {
    props: ['note'],
    template: `
    <div class="keep-preview">
    <component :is="note.type"  :data="note" @toggleTodo="toggleTodo">
   </component>
    </div>
    `,
    computed: {
    },
    methods: {
        toggleTodo(todoId) {
            const data = {
                noteId: this.note.id,
                todoId
            }
            this.$emit('toggleTodo', data);
        }
    },
    created() { },
    components: {
        noteTxt,
        noteImg,
        noteTodos,
        noteVideo
    }

};