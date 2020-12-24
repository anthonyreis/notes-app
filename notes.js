const fs = require('fs')
const chalk = require('chalk')

const getNotes = () => {
    return 'Your notes...'
}

const addNote = (title, body) =>{
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title)

    if (!duplicateNote){
        notes.push({
            title: title,
            body: body
        })
    
        saveNotes(notes)
        console.log(chalk.green.inverse('New note added'))
    } else {
        console.log(chalk.red.inverse('Note title taken'))
    }
}

const removeNote = (title) => {
    const notes = loadNotes()
    const resultNotes = notes.filter((note) => note.title !== title)

    if(resultNotes.length  < notes.length){
        saveNotes(resultNotes)
        console.log(chalk.green.inverse('Note removed'))
    } else {
        console.log(chalk.red.inverse('No note found'))
    }
}

const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.blue.bold('Your notes'));
    notes.forEach(note => {
        console.log(note.title);
    })
}

const readNote = (title) => {
    const notes = loadNotes()
    const noteFound = notes.find((note) => note.title === title)

    if (noteFound){
        console.log(chalk.blue.bold(noteFound.title) +'\n' + noteFound.body)
    } else {
        console.log(chalk.red.inverse('Note not found'));
    }
}

const loadNotes = () => {
    try{
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

module.exports = {
    getNotes,
    addNote,
    removeNote,
    listNotes,
    readNote
}