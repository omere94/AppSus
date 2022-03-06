export default {
    props: ['data'],
    template: `
    <div class="note-img"  >
      <h3 class="title">{{noteTitle}}</h3>
      <img :src="noteImgUrl" :alt="noteTitle"  />
    </div>
`,
    data() {
        return {
        }
    },
    methods: {

    },
    computed: {
        noteTitle() {
            return this.data.info.title
        },
        noteImgUrl() {
            return this.data.info.url
        }
    },
    created() {

    }
}