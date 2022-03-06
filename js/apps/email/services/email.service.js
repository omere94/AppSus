import { utilitiesService } from '../../../services/utilities.service.js';
import { storageService } from '../../../services/async-storage-service.js';

export const emailService = {
    query,
    remove,
    getEmptyEmail,
    getById,
    addEmail,
    update,
    toggleRead
}

const STORAGE_KEY = 'emailApp';
const emailsDB = _createEmails();

function query() {
    return storageService.query(STORAGE_KEY)
}

function update(updatedEmail) {
    return storageService.put(STORAGE_KEY, updatedEmail)
}

function remove(emailId) {
    return storageService.remove(STORAGE_KEY, emailId)
}

function getById(id) {
    return storageService.get(STORAGE_KEY, id)
}

function getEmailById(id) {
    let email = emails.find(email => email.id === id);
    return Promise.resolve(email);
}

function toggleRead(id, isRead) {
    getEmailById(id)
        .then(email => {
            email.isRead = isRead;
            saveEmails()
        })
}

function addEmail(emailToAdd) {
    return storageService.post(STORAGE_KEY, emailToAdd)
}

function getEmptyEmail() {
    return {
        id: utilitiesService.makeId(),
        subject: '',
        body: '',
        isRead: false,
        sentAt: 1551133930594,
        from: 'appsus@cajan.com',
        to: '',
        isStarred: false,
    }
}

function _createEmails() {
    let emails = utilitiesService.loadFromStorage(STORAGE_KEY)
    if (!emails || !emails.length) {
        const emails = [{
            id: utilitiesService.makeId(),
            subject: `GoodJob!!!!!`,
            body: `My money's in that office, right? If she start giving me some bullshit about it ain't there, and we got to go someplace else and get it, I'm gonna shoot you in the head then and there. Then I'm gonna shoot that bitch in the kneecaps, find out where my goddamn money is.  She gonna tell me too. Hey, look at me when I'm talking to you, motherfucker. You listen: we go in there, and that nigga Winston or anybody else is in there, you the first motherfucker to get shot. You understand?
            `,
            isRead: false,
            sentAt: 1151139930694,
            from: 'welcome@workona.com',
            to: 'appsus@cajan.com',
            isStarred: false
        },
        {
            id: utilitiesService.makeId(),
            subject: 'Thanks for everything!!!',
            body: `Zoom Chat can be used for instant collaboration, file sharing, group messaging, and much more! In this webinar, your Zoom host will walk through the key Zoom Chat features and tips for successful team collaboration. `,
            isRead: false,
            sentAt: 1451133635584,
            from: 'invitations@linkedin.com',
            to: 'appsus@cajan.com',
            isStarred: false
        },
        {
            id: utilitiesService.makeId(),
            subject: 'GoodJob',
            body: `'Hi! this would be ou email`,
            isRead: false,
            sentAt: 1451133635584,
            from: 'invitations@linkedin.com',
            to: 'appsus@cajan.com',
            isStarred: false
        },
        {
            id: utilitiesService.makeId(),
            subject: 'Hi!!!!',
            body: `ok the is a nee email you can see ok the is a nee email you can see ok the is a nee email you can see ok the is a nee email you can see ok the is a nee email you can see`,
            isRead: false,
            sentAt: 1451133635584,
            from: 'invitations@linkedin.com',
            to: 'appsus@cajan.com',
            isStarred: false
        },
        {
            id: utilitiesService.makeId(),
            subject: 'Hi!!!!',
            body: `ok the is a new email you can see ok the is a new email you can see ok the is a new email you can see ok the is a new email you can see`,
            isRead: false,
            sentAt: 1451133635584,
            from: 'invitations@linkedin.com',
            to: 'appsus@cajan.com',
            isStarred: false
        },
        {
            id: utilitiesService.makeId(),
            subject: 'Hi!!!!',
            body: `ok the is a neq email you can see ok the is a neq email you can see ok the is a neq email you can see ok the is a neq email you can see`,
            isRead: false,
            sentAt: 1451133635584,
            from: 'invitations@linkedin.com',
            to: 'appsus@cajan.com',
            isStarred: false
        },
        {
            id: utilitiesService.makeId(),
            subject: 'Hi!!!!',
            body: `ok the is a nes email you can see k the is a nes email you can see k the is a nes email you can see k the is a nes email you can see`,
            isRead: false,
            sentAt: 1451133635584,
            from: 'invitations@linkedin.com',
            to: 'appsus@cajan.com',
            isStarred: false
        },
        {
            id: utilitiesService.makeId(),
            subject: 'Hi!!!!',
            body: `ok the is a ne email you can see ok the is a ne email you can see ok the is a ne email you can see ok the is a ne email you can see`,
            isRead: false,
            sentAt: 1451133635584,
            from: 'invitations@linkedin.com',
            to: 'appsus@cajan.com',
            isStarred: false
        }
        ]
        utilitiesService.saveToStorage(STORAGE_KEY, emails)
    }
    return emails;
}