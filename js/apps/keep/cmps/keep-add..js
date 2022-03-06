export default {

    template: `
        <section class="keep-add">
            <input type="text"  :placeholder="noteTypePlaceHolder" @keyup.enter="addNote" v-model="newNote.info.value"/>
`,
    data() {
        return {
            newNote: {
                type: 'noteTxt',
                isPinned: false,
                info: {
                    value: ''
                }
            },
        }
    },
    methods: {
        addNote() {
            this.$emit('add', this.newNote);
            this.newNote = {
                type: 'noteTxt',
                isPinned: true,
                info: {
                    value: ''
                }
            }
        }
    },
    computed: {
        noteTypePlaceHolder() {
            switch (this.newNote.type) {
                case 'noteTxt':
                    return 'What is on your mind?';
                case 'noteImg':
                    return 'Enter image URL';
                case 'noteTodos':
                    return 'Enter comma seperated list';
                case 'noteVideo':
                    return 'Enter youtube video URL';
                default:
                    return 'error';
            }
        },

    },
    components: {
    },
    created() {
        this.noteTypes = this.getNotesTypes();
    },
    destroyed() {
    }
};