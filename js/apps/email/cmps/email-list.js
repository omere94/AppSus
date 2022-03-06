import emailPreview from './email-preview.js';
import emailFilter from './email-filter.js';

export default {
    props: ['emails'],
    template: `
    <section class="email-list-container">
        <email-filter @filtered="setFilter"/>
        <ul class="email-list">
            <li v-for="email in emails" :key="email.id" class="email-preview-container  ">
                <router-link :to="'/email/'+email.id">
                 <email-preview :email="email"@read="setEmailToRead" @remove="removeEmail" />
                </router-link>
            </li>
        </ul>
    </section>
    `,
    methods: {
        setFilter(filterBy) {
            this.$emit('filtered', filterBy)
        },
        setEmailToRead(readEmail) {
            this.$emit('read', readEmail)
        },
        toggleStarred(email) {
            email.isStarred = !email.isStarred
            this.$emit('starred', email)
        },
        toggleRead(email) {
            email.isRead = !email.isRead
            this.$emit('read', email)
        },
        title(email) {
            return email.isRead ? 'Unread' : 'Read'
        },
        removeEmail(emailId) {
            this.$emit('remove', emailId);
        }
    },
    components: {
        emailPreview,
        emailFilter
    }
}