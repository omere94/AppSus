export default {
    props: ['data'],
    template: `
    <div class="note-txt">
        <pre class="txt">
            {{noteTxt}}
        </pre>
    </div>
`,
    data() {
        return {

        }
    },
    methods: {

    },
    watch: {
        txt() {
            console.log('text');
        }
    },
    created() {

    },
    computed: {
        noteTxt() {
            return this.data.info.txt;
        }
    }
}