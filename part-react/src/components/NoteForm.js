import React, {useState} from 'react'

const NoteForm = ({createNote}) => {
    const [newNote, setNewNote] = useState({
        text : "a new note...",
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
        const noteObj = {
          content: newNote.text,
          date: new Date().toString(),
          important: newNote.important || false,
        };
        createNote(noteObj)
        setNewNote("a new note...");
      }

    return (
        <form onSubmit={addNote}>
            <input type="text" value={newNote.text} onChange={actualizarNewNote}/><br/>
            <label><input type="checkbox" onChange={actualizaImportancia}/>Importancia de la nota</label><br/>
            <button type="submit">Save</button>
        </form>
    )
}

export default NoteForm