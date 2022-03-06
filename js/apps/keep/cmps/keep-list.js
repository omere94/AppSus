import keepPreview from './keep-preview.js';
import keepEdit from './keep-edit.js';

export default {
    props: ['notes'],
    template: `
       <ul class="notes-list">
         <li v-for="note in notes" :key="note.id" :style="note.style"   >
             <keep-preview :note="note" @toggleTodo="toggleTodo"  />
       <footer>
       <keep-edit :note="note"  @remove="remove" @change="change"  />       
      </footer>
       </li>  
</ul>
</section>
    `,
    data() {
        return {
            pinnedNotes: [],
            unPinnedNotes: []
        }
    },
    methods: {
        remove(noteId) {
            this.$emit('remove', noteId);
        },
        change(data) {
            this.$emit('change', data);
        },
        toggleTodo(data) {
            this.$emit('toggleTodo', data)
        }
    },
    components: {
        keepPreview,
        keepEdit
    },
    created() {
    },
};