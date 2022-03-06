import { emailService } from '../services/email.service.js';
import { eventBus } from '../../../services/event-bus-service.js';

export default {
    name: 'email-compose',
    template: `
    <section v-if="email" class="email-compose">
        <h4>{{title}}</h4>
        <form @submit.prevent.stop="save(email.id)" class="email-compose-form">
            <div class="compose-form-fields">
            <div>
                <label for="email-address">Email Address: </label>
                <input id="email-address" placeholder="Email Address" type="email" v-model="email.to">
            </div>
            <div>
                <label for="subject">Subject: </label>
                <input id="subject" placeholder="Subject" type="text" v-model="email.subject">
            </div>

            <div>
                <textarea class="textArea" rows="10" cols="30" id="body" placeholder="Type in your words" type="text" v-model="email.body" wrap="hard" >
                </textarea>
                <!-- <pre>{{email.body}}</pre> -->
            </div>

            </div>
            <div class="compose-button-container">
                <button type="submit" class="save">Send</button>
                <router-link to="/email">Back to inbox</router-link>
            </div>
        </form>
    </section>
    `,
    data() {
        return {
            email: null,
        }
    },
    methods: {
        save(emailId) {
            this.email.sentAt = Date.now()
            emailService.addEmail(this.email)
                .then(email => {
                    const msg = {
                        txt: 'Email saved succesfully',
                        type: 'success'
                    }
                    eventBus.$emit('show-msg', msg)
                    this.$router.push('/email')
                    this.$emit('save', emailId);
                })
                .catch(err => {
                    const msg = {
                        txt: 'Error, please try again later',
                        type: 'error'
                    }
                    eventBus.$emit('show-msg', msg)
                })
        }
    },
    computed: {
        title() {
            return this.emailId ? 'Reply' : 'Compose a new email'
        },
        emailId() {
            return this.$route.params.emailId
        },
        noteTxt() {
            return this.$route.params.noteTxt
        }
    },
    created() {
        if (this.emailId) {
            console.log(this.emailId);
            emailService.getById(this.emailId)
                .then(email => {
                    email.to = email.from
                    email.from = 'appsus@ca.com'
                    email.isRead = false;
                    email.isStarred = false;
                    email.subject = 'Re: ' + email.subject
                    email.body = email.body
                    this.email = email
                })
        } else this.email = emailService.getEmptyEmail()
    },
}