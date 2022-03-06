import { emailService } from '../services/email.service.js';
import emailList from '../cmps/email-list.js';
import emailStatus from '../cmps/email-status.js';

export default {
    template: `
    <section class="email-app ">
        <div class="main">
            <ul class="side-menu">
                <router-link to="/email/compose">
                <li class="compose fas fa-plus">
                 Compose
                </li>
                </router-link>
                <li class="inbox fas fa-inbox " @click="currMenu = 'inbox'">
                    <router-link to="/email">inbox </router-link>
                </li>
                <li class="sent fas fa-paper-plane" @click="currMenu = 'sent'">
                    <router-link to="/email">Sent</router-link>
                </li>
                <li class="starred fas fa-star" @click="currMenu = 'starred'">
                    <router-link to="/email" >Starred</router-link>
                </li>
                <li class="drafts fas fa-file" @click="currMenu = 'drafts'">
                    <router-link to="/email" >Drafts</router-link>
                </li>
                <email-status :percent="readPercentage"/>
            </ul>
            <router-view 
            :emails="emailsToShow" 
            @remove="removeEmail" 
            @save="loadEmails" 
            @filtered="setFilter" 
            @read="updateEmail" 
            @starred="updateEmail"/>
        </div>
    </section>
    `,
    data() {
        return {
            emails: [],
            filterBy: {
                byName: '',
                kind: '',

            },
            currMenu: 'inbox'
        }
    },
    methods: {
        loadEmails() {
            emailService.query()
                .then(emails => this.emails = emails);
        },
        setFilter(filterBy) {
            this.filterBy = filterBy
        },
        removeEmail(emailId) {
            emailService.remove(emailId)
                .then(this.loadEmails)
                .then(() => {
                    const id = this.$route.params.emailId;
                    if (id) this.$router.push('/email');
                })
        },
        updateEmail(updatedEmail) {
            emailService.update(updatedEmail)
                .then(() => this.loadEmails())
        }
    },
    computed: {
        emailsToShow() {
            if (this.currMenu === 'inbox') {
                var emailsToShow = this.emails.filter(email => {
                    return email.to === 'appsus@ca.com'
                })
            } else if (this.currMenu === 'sent') {
                var emailsToShow = this.emails.filter(email => {
                    return email.to !== 'appsus@ca.com'
                })
            } else if (this.currMenu === 'starred') {
                var emailsToShow = this.emails.filter(email => {
                    return email.isStarred === true
                })
            } else if (this.currMenu === 'drafts') { }

            if (this.filterBy.kind === 'All') {
                const searchStr = this.filterBy.byName.toLowerCase()
                emailsToShow = this.emails.filter(email => { return email.subject.toLowerCase().includes(searchStr) || email.body.toLowerCase().includes(searchStr) })

            } else if (this.filterBy.kind === 'Unread') {
                const searchStr = this.filterBy.byName.toLowerCase()
                emailsToShow = this.emails.filter(email => { return (!email.isRead) && (email.subject.toLowerCase().includes(searchStr) || email.body.toLowerCase().includes(searchStr)) })

            } else if (this.filterBy.kind === 'Read') {
                const searchStr = this.filterBy.byName.toLowerCase()
                emailsToShow = this.emails.filter(email => { return (email.isRead) && (email.subject.toLowerCase().includes(searchStr) || email.body.toLowerCase().includes(searchStr)) })
            }
            return emailsToShow;
        },
        readPercentage() {
            let readCount = 0;
            for (let i = 0; i < this.emails.length; i++) {
                if (this.emails[i].isRead) readCount++
            }
            return Math.floor(readCount / this.emails.length * 100);
        }
    },
    created() {
        this.loadEmails()
    },
    components: {
        emailList,
        emailStatus
    }
}