import { storageService } from '../../../services/async-storage-service.js'
import { utilitiesService } from '../../../services/utilities.service.js';

const KEEP_KEY = 'keepCache';
export const keepService = {
    query,
    addNote,
    editNote,
    editTodo,
    removeNote,
}
const defaultNotes = [{
    id: utilitiesService.makeId(),
    type: 'noteTxt',
    isPinned: true,
    info: {
        txt: 'Fullstack Me Baby CaJan!'
    },
    style: {
        backgroundColor: 'lightgrey',
        color: '#333'
    }
},
{
    id: utilitiesService.makeId(),
    type: 'noteImg',
    isPinned: true,
    info: {
        url: 'https://fscl01.fonpit.de/userfiles/7687254/image/Best_Android_Apps_2021.jpg',
        title: 'App-Sus'
    },
    style: {
        backgroundColor: 'lightseagreen',
        color: '#333'
    }
},
{
    id: utilitiesService.makeId(),
    type: 'noteImg',
    isPinned: true,
    info: {
        url: 'https://oceanview4luz.files.wordpress.com/2013/01/sunset-for-front-room-i.jpg',
        title: 'Nature'
    },
    style: {
        backgroundColor: 'lightskyblue',
        color: '#333'
    }
},
{
    id: utilitiesService.makeId(),
    type: 'noteTodos',
    isPinned: true,
    info: {
        title: 'How was it:',
        todos: [
            { id: utilitiesService.makeId(), txt: 'Do that', doneAt: null },
            { id: utilitiesService.makeId(), txt: 'Do this', doneAt: 187111111 }
        ]
    },
    style: {
        backgroundColor: 'lightblue',
        color: '#333'
    }
},
{
    id: utilitiesService.makeId(),
    type: 'noteTodos',
    info: {
        label: "Get my stuff together",
        todos: [
            { txt: "Driving liscence", doneAt: null },
            { txt: "Coding power", doneAt: 187111111 }
        ]
    },
    style: {
        backgroundColor: 'lightsalmon',
        color: '#333'
    }
},
{
    id: utilitiesService.makeId(),
    type: 'noteVideo',
    isPinned: true,
    info: {
        url: 'https://www.youtube.com/watch?v=0fcRa5Z6LmU',
        title: 'Songs'
    },
    style: {
        backgroundColor: 'lightcoral',
        color: '#333'
    }
},
];

function query() {
    return storageService.query(KEEP_KEY)
        .then(notes => {
            if (!notes.length) {
                const defNotes = defaultNotes;
                storageService.postMany(KEEP_KEY, defNotes)
                return defNotes;
            }
            return notes;
        })
}

function addNote(note) {
    const newNote = _formatNewNote(note.type, note.info);
    return storageService.post(KEEP_KEY, newNote)
        .then(note => note);
}

function editNote(noteId, newSetting) {
    return _getNoteById(noteId)
        .then(note => {

            const modifiedNote = _formatNote(note, newSetting);
            return storageService.put(KEEP_KEY, modifiedNote);
        })
}

function editTodo(noteId, todoId) {
    return _getNoteById(noteId)
        .then(note => {
            if (!note.info.todos) return Promise.reject('error finding todos');
            const todo = note.info.todos.find(todo => todo.id === todoId);
            if (todo.doneAt) todo.doneAt = null;
            else todo.doneAt = Date.now();
            return storageService.put(KEEP_KEY, note);
        })
}

function removeNote(noteId) {
    return storageService.remove(KEEP_KEY, noteId);
}

function _getNoteById(noteId) {
    return storageService.get(KEEP_KEY, noteId);
}

function _formatNewNote(type, setting) {
    const info = {}
    switch (type) {
        case 'noteTxt':
            info.txt = setting.value;
            break;
        case 'noteImg':
        case 'noteVideo':
            info.title = 'New note'
            info.url = setting.value
            break;
        case 'noteTodos':
            info.title = 'New note';
            info.todos = setting.value.split(',').map(txt => {
                const todo = {
                    id: setting.id || utilitiesService.makeId(),
                    txt,
                    doneAt: setting.doneAt
                }
                return todo;
            })
            break;
    }
    const style = { color: 'white', backgroundColor: '#333' };
    const newNote = {
        type,
        isPinned: true,
        info,
        style
    };
    return newNote;
}

//Sorting out the note info
function _formatNote(note, setting) {

    note.isPinned = setting.isPinned;
    const { color, backgroundColor } = setting.style;
    note.style = { color, backgroundColor };
    switch (note.type) {
        case 'noteTxt':
            note.info.txt = setting.txt
            break;
        case 'noteImg':
        case 'noteVideo':
            note.info.title = setting.title,
                note.info.url = setting.url
            break;
        case 'noteTodos':
            note.info.title = setting.title,
                note.info.todos = setting.todos.split(',').map((txt, idx) => {
                    let doneAt = null;
                    const currTodo = note.info.todos[idx];
                    if (currTodo) doneAt = currTodo.doneAt;
                    const todo = {
                        id: (currTodo) ? currTodo.id : utilitiesService.makeId(),
                        txt,
                        doneAt
                    }
                    return todo;
                })
            break;
    }
    return note;
}