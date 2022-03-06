import { emailService } from '../services/email.service.js';

export default {
    template: `
    <section class="email-details" v-if="email">
        <h4 class="subject">{{email.subject}}</h4>
        <div class="address-details">
            <p>From: {{email.from}}</p>
            <p>To: {{email.to}}</p>
        </div>
        <div class="emailBody" >
            <p>{{email.body}}</p>
        </div>
        <p class="details-timestamp">Sent at {{formattedTime}}</p>
        <div class="details-button-container">
        <div class="delete-mail">
         <button @click="removeEmail(email.id)" title="Delete mail">
               <i class="fas fa-trash"></i>
           </button>
         </div>
         <section class="bottom-buttons" >
              <div class="back">
                <router-link to="/email">
                🠔 Back
                </router-link>
        </div>
         <div class="reply">  
              <router-link :to="'/email/compose/'+email.id" class="back">
               <i class="fas fa-reply"></i>
               </router-link> </div>
             </section> 
       </div>
    </section>
    `,
    data() {
        return {
            email: null
        }
    },
    methods: {
        loadEmails() {
            emailService.query()
                .then(emails => this.emails = emails)
        },
        removeEmail(emailId) {
            this.$emit('remove', emailId);
        }
    },
    computed: {
        formattedTime() {
            const date = new Date(this.email.sentAt).toLocaleDateString();
            const time = new Date(this.email.sentAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            return date + ' ' + time;
        }
    },
    created() {
        const id = this.$route.params.emailId
        emailService.getById(id)
            .then(email => this.email = email)
    }
}