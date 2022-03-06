export default {
    props: ['note'],
    template: `
    <div class="keep-edit"  >
        <section class="remove-modal" :class="modalShow" @keyup.esc="closeModal" >
         <p>Are you sure you want to remove this note? </p>
            <button class="btn-ok" @click="remove(note.id)" ref="btn"  >Ok </button>
            <button class="btn-cancel" @click="closeModal" ref="btn1">Cancel</button>
        </section>
      <section class="edit-btns">
      <button @click="togglePin" :class="pinToggeling" :title="pinText"> 
        <i class="fas fa-thumbtack"></i>
        </button> 
        <button title="Change color" @click="toggleColorMode" :class="colorToggeling"> 
            <i class="fas fa-tint"></i>
          </button>
        <button @click="toggleEditMode" :class="editToggeling" title="Edit"> 
        <i class="fas fa-edit" ></i>
     </button>
     <button @click="openModal()" title="Delete">
     <i class="fas fa-trash"></i>
       </button>
      </section>
        <section v-if="isOnEditMode" class="edit-section">
          
           <form @submit.prevent="updateNote">
                <input type="text" v-if="checkIfEmpty(newSetting.txt)" name="note-txt" v-model="newSetting.txt">
                <input type="text" v-if="checkIfEmpty(newSetting.title)" name="note-tilte" v-model="newSetting.title">
                <input type="text" v-if="checkIfEmpty(newSetting.url)" name="note-url" v-model="newSetting.url">
                <input type="text" name="todo" v-if="checkIfEmpty(newSetting.todos)" v-model="newSetting.todos">
                <button class="update-btn">Update</button>
           </form>
        </section>
        <section v-if="isOnColorMode" class="color-change-section">
        <form @submit.prevent="updateNote">
           <section class="colors-container" > 
           <label :style="fontColor" > <i class="fas fa-font"></i>  <input type="color" v-model="newSetting.style.color" /> </label>
            <label :style="bgColor" > <i class="fas fa-palette"></i>: <input type="color" v-model="newSetting.style.backgroundColor " /> </label>
           </section>
            <button class="update-btn">Update</button>
        </form>

      
            
    </section>
    </div>
`,
    data() {
        return {
            isOnEditMode: false,
            isOnColorMode: false,
            isModalOpen: false,
            newSetting: {
                isPinned: this.note.isPinned,
                style: {
                    color: this.note.style.color,
                    backgroundColor: this.note.style.backgroundColor
                }
            }
        }
    },
    methods: {
        remove(noteId) {
            this.$emit('remove', noteId);
            this.isModalOpen = false;
        },
        updateNote() {
            const data = {
                noteId: this.note.id,
                newSetting: this.newSetting
            }
            this.$emit('change', data);
            this.isOnEditMode = false;
            this.isOnColorMode = false;
        },
        toggleEditMode() {
            this.isOnEditMode = !this.isOnEditMode;
        },
        togglePin() {
            this.newSetting.isPinned = !this.newSetting.isPinned;
            this.updateNote()
        },
        toggleColorMode() {
            this.isOnColorMode = !this.isOnColorMode;
        },
        checkIfEmpty(str) {
            return str || str === '';
        },
        openModal() {
            this.isModalOpen = true;
            this.$nextTick(function() {
                this.$refs.btn.focus()
            })


        },
        closeModal() {
            this.isModalOpen = false;
        }




    },

    computed: {
        pinToggeling() {
            return { selected: this.newSetting.isPinned }
        },
        editToggeling() {
            return { selected: this.isOnEditMode };
        },
        colorToggeling() {
            return { selected: this.isOnColorMode };
        },
        stringifiedTodos() {
            if (!this.note.info.todos) return null;

            return this.note.info.todos.map(todo => todo.txt).join(',');
        },

        pinText() {
            return (this.newSetting.isPinned) ? 'Unpin' : 'pin';
        },
        fontColor() {
            return { color: this.newSetting.style.color };
        },
        bgColor() {
            return { color: this.newSetting.style.backgroundColor }
        },

        modalShow() {
            return (this.isModalOpen) ? 'modal-show' : '';
        }



    },
    watch: {
        note: {
            handler() {
                const { type } = this.note;
                switch (type) {
                    case 'noteTxt':
                        this.newSetting.txt = this.note.info.txt;
                        break;
                    case 'noteImg':
                    case 'noteVideo':
                        this.newSetting.title = this.note.info.title;
                        this.newSetting.url = this.note.info.url;
                        break
                    case 'noteTodos':
                        this.newSetting.title = this.note.info.title;
                        this.newSetting.todos = this.stringifiedTodos;
                        break

                    default:
                        break;
                }
            },
            immediate: true,
            deep: true
        }
    },

    created() {},

}