export default {

    template: `
        <section class="keep-add">


         <input type="text"  :placeholder="noteTypePlaceHolder" @keyup.enter="addNote" v-model="newNote.info.value" />
        <section class="buttons-container">
        <button v-for="noteType in noteTypes" @click="changeNoteType(noteType.type)" :title="noteType.title" :class="isNoteSelected(noteType.type)" >
             <i :class="noteType.iconClasses"> </i>
         </button>
        </section>


        </section>
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
            notesTypes: []
        }
    },
    methods: {
        getNotesTypes() {
            const notesTypes = [{
                type: 'noteTxt',
                title: 'Free text',
                iconClasses: 'fas fa-font',
            },
            {
                type: 'noteImg',
                title: 'Enter image URL',
                iconClasses: 'far fa-image'
            },
            {
                type: 'noteTodos',
                title: 'Enter comma seperated list',
                iconClasses: 'fas fa-list-ol'
            },
            {
                type: 'noteVideo',
                title: 'Enter Youtube video URL',
                iconClasses: 'fab fa-youtube'
            },

            ]
            return notesTypes;
        },
        changeNoteType(noteType) {
            this.newNote.type = noteType;
        },
        isNoteSelected(type) {
            return type === this.newNote.type ? 'selected' : '';
        },
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