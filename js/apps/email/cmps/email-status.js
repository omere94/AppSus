export default {
    props: ['percent'],
    template: `
		<section class="email-status">
         <div class="myStatus">
             <p>{{strPercent}}</p>
             <div class="myBar" :style="styleObj"
                role="progressbar" :aria-valuenow="percent"
                aria-valuemin="0" aria-valuemax="100">
            </div>
        </div>
		</section>
    `,
    created() {
    },
    data() {
        return {
        }
    },
    computed: {
        deterColor() {
            if (+this.percent < 25) return `#d9534f`;
            if (+this.percent < 50) return `#f0ad4e`;
            if (+this.percent < 75) return `#5bc0de`;
            return `#5cb85c`;
        },
        styleObj() {
            return {
                width: this.percent + '%',
                'background-color': this.deterColor,
                'min-width': 1 + '%'
            }
        },
        strPercent() {
            {
                if (this.percent >= 0) return this.percent + '%';
                else return ''
            }
        }
    }
}