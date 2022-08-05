import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from 'react';
import Note from './components/Note';
import noteService from './services/notes'
import Notification from './components/Notification'
import Footer from './components/Footer'
import loginService from './services/loginService'

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({
    text : "a new note...",
    important : false
  });
  const [userFields, setUserField] = useState({
    username: '', password: ''
  })
  const [user, setUser] = useState(null)
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    noteService.getAll()
      .then(response => setNotes(response));
  }, [])

  useEffect(() => {
    const myUser = window.localStorage.getItem('loggedNoteappUser')
    if(myUser){
      setUser(JSON.parse(myUser))
      noteService.setToken(myUser.token)
    }
  }, [])

  const notesToShow = showAll ? notes : notes.filter(note => note.important===true)

  const actualizaImportancia = event => {
    setNewNote({
      ...newNote, 
      important: event.target.checked
    })
  }

  const toggleImportance = id => {
    const note = notes.find(note => note.id === id)
    const changedNote = {
      ...note, 
      important: !note.important
    }
    noteService.update(id, changedNote)
          .then(response => 
            setNotes(notes.map(myNote => myNote.id === id ? response : myNote))
          ).catch(error => {
            // alert(`An error ocurred deleting the note: '${note.content}'`)
            setErrorMessage(`Note '${changedNote.content}' was already deleted from server`)
            setTimeout(() => setErrorMessage(null), 5000)
            setNotes(notes.filter(myNote => myNote.id !== id))
          })
  }

  const actualizarNewNote = event => {
    setNewNote({
      ...newNote,
      text : event.target.value
    });
  }
  const actualizaPreferencias = event => {
    event.preventDefault();
    setShowAll(!showAll);
  }
  const addNote = event => {
    event.preventDefault();
    const noteObj = {
      content: newNote.text,
      date: new Date().toString(),
      important: newNote.important,
    };
    noteService.create(noteObj)
        .then(response => setNotes(notes.concat(response)));
    setNewNote("a new note...");
  }

  const actualizarUserFields = tipo => event => setUserField({
    ...userFields, [tipo]: event.target.value
  })

  const handleLogin = async event => {
    event.preventDefault()
    try{
      const user = await loginService.login(userFields)
      noteService.setToken(user.token)
      setUser(user)
      setUserField({
        username: '', password: ''
      })
      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))
    }catch(exception){
      setErrorMessage('Username or password are invalid')
      setTimeout(() => setErrorMessage(null), 5000)
    }
    console.log(user)
  }
  

  const loginForm = () => (
    <form>
    <input type="text" value={userFields.username} onChange={actualizarUserFields('username')} placeholder="Username"/><br/>
    <input type="password" value={userFields.password} onChange={actualizarUserFields('password')} placeholder="Password"/><br/>
    <button type="submit" onClick={handleLogin}>Login</button>
  </form>
  )

  const notesForm = () => (
    <>
    <ul>
      {
        notesToShow.map(note => <Note key={note.id} note={note} toggleImportance={() => toggleImportance(note.id)}/>)
      }
    </ul>
    <form>
    <input type="text" value={newNote.text} onChange={actualizarNewNote}/><br/>
    <label><input type="checkbox" onChange={actualizaImportancia}/>Importancia de la nota</label><br/>
    <button onClick={actualizaPreferencias}>{showAll ? ("Mostrar solo notas importantes") : ("Mostrar todas las notas")}</button><br/>
    <button type="submit" onClick={addNote}>Save</button>
    </form>
  </>
  )

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage}/>
      {user === null && loginForm()}
      {user !== null && notesForm()}
      <Footer/>
    </div>
  );
}

export default App;
