import React, {useState} from 'react'

const NoteForm = ({createNote}) => {
    const [newNote, setNewNote] = useState({
        text : "",
        important : false
    });

    const actualizaImportancia = event => {
        setNewNote({
          ...newNote, 
          important: event.target.checked
        })
    }

    const actualizarNewNote = event => {
        setNewNote({
          ...newNote,
          text : event.target.value
        });
    }

    const addNote = async event => {
        event.preventDefault();
        console.log(newNote.text)
        const noteObj = {
          content: newNote.text,
          date: new Date().toString(),
          important: newNote.important || false,
        };
        await createNote(noteObj)
        setNewNote("");
      }

    return (
        <form onSubmit={addNote}>
            <input type="text" value={newNote.text} placeholder="a new note..." onChange={actualizarNewNote} id="textFieldNoteForm"/><br/>
            <label><input type="checkbox" onChange={actualizaImportancia}/>Importancia de la nota</label><br/>
            <button type="submit" id="buttonSubmitNoteForm">Save</button>
        </form>
    )
}

export default NoteForm