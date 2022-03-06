export default {
    name: 'email-preview',
    props: ['email'],
    template: `
        <section class="email-preview" :class="toggleClass" @click.stop="updateIfRead">
        <div class="star" :class="{starred: email.isStarred}" @click.stop.prevent="toggleStarred(email)">
        <i class="fas fa-star"></i>
        </div>
			<div class="from" :class="{bold: !this.email.isRead}"> 
                {{email.from}}
            </div>  
            <div class="content " :class="{bold: !this.email.isRead}" >
                {{email.subject.substring(0, 10)}}...
            </div>  
            <div class="email-desc">
                {{email.body.substring(0, 20)}}...
            </div>
            <div class="sent-at">
			 {{sentAt}}
			</div>
            <div class="action flex " >

                <div class="trash">
                    <span @click.prevent="removeEmail(email.id)">
                        <i class="far fa-trash-alt"></i>
                    </span>
                </div>
                <div class="envelope" :class="toggleIcon" @click.stop.prevent="toggleIsRead">
                </div> 
            </div>      
        </section>
        `,
    methods: {
        updateIfRead() {
            if (!this.email.isRead) this.email.isRead = true;
            this.$emit('read', this.email)
        },
        toggleStarred(email) {
            email.isStarred = !email.isStarred
            this.$emit('starred', email)
        },
        removeEmail(emailId) {
            this.$emit('remove', emailId);
        },
        toggleIsRead() {
            return !this.email.isRead ? this.email.isRead = true : this.email.isRead = false;
        },
    },
    computed: {
        toggleClass() {
            return this.email.isRead ? 'read ' : 'unread '
        },
        toggleIcon() {
            return this.email.isRead ? 'fas fa-envelope-open' : 'fas fa-envelope '
        },
        sentAt() {
            let currDate = moment(Date.now())
            let emailDate = moment(this.email.sentAt)

            if (currDate.diff(emailDate, 'days') === 0) {
                return moment(emailDate).format('LT')
            } else if (currDate.diff(emailDate, 'years') === 0) {
                return moment(emailDate).format('MMM, D')
            } else {
                return moment(emailDate).format('l')
            }
        },
    }
}