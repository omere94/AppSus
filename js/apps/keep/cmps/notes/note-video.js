export default {
    props: ['data'],
    template: `
    <div class="note-video"  >
      <h3 class="title">{{noteTitle}}</h3>
      <iframe  :src="'https://www.youtube.com/embed/'+noteVidId+'?autoplay=0'"></iframe>
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
        noteVidId() {
            const fullUrl = this.data.info.url
            const idStartIdx = fullUrl.indexOf('?v=');
            let endIdx = fullUrl.indexOf('&');
            if (idStartIdx === -1) return '';
            if (endIdx === -1) endIdx = fullUrl.length;
            const vidId = fullUrl.substring(idStartIdx + 3, endIdx);
            return vidId
        }
    },
    created() {

    }
}