import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect, useRef} from 'react';
import Note from './components/Note';
import noteService from './services/notes'
import Notification from './components/Notification'
import Footer from './components/Footer'
import loginService from './services/loginService'
import LoginForm from './components/LoginForm';
import Togglable from './components/Togglable';
import NoteForm from './components/NoteForm';
import LoggedOption from './components/LoggedOption';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [userFields, setUserField] = useState({
    username: '', password: ''
  })
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [showAll, setShowAll] = useState(true);
  const [loginVisible, setLoginVisible] = useState(false)


  useEffect(() => {
    const myUser = window.localStorage.getItem('loggedNoteappUser')
    if(myUser){
      const usuario = JSON.parse(myUser)
      setUser(usuario)
      noteService.setToken(usuario.token)
      console.log(usuario.token)
    }
  }, [])

  const getAllNotes = () => {
    noteService.getAll()
    .then(response => setNotes(response));
  }

  useEffect(() => {
    getAllNotes()
  }, [])

  const notesToShow = showAll ? notes : notes.filter(note => note.important===true)

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

  const actualizaPreferencias = event => {
    setShowAll(!showAll)
  }

  const noteFormRef = useRef()

  const createNote = async note => {
    await noteService.create(note)
    getAllNotes()
    noteFormRef.current.toggleVisible()
  }

  const loginForm = () => {
    const showLoginForm = {display: loginVisible ? '' : 'none'}

    return (
            
      <Togglable buttonLabel="login">
        <LoginForm actualizarUserFields={actualizarUserFields} 
                  handleLogin={handleLogin} 
                  userFields={userFields}
        />
      </Togglable>
    )
  }

  const notesForm = () => (
    <>
    <ul>
      {
        notesToShow.map(note => <Note key={note.id} note={note} toggleImportance={() => toggleImportance(note.id)}/>)
      }
    </ul>
    <Togglable buttonLabel="new note" ref={noteFormRef}>
      <NoteForm 
        createNote={createNote}
      />
      <button onClick={actualizaPreferencias}>{showAll ? ("Mostrar solo notas importantes") : ("Mostrar todas las notas")}</button><br/>
    </Togglable>
  </>
  )

  const loggedForm = () => <LoggedOption user={user} setUser={setUser} />

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage}/>
      {user !== null && loggedForm()}
      {user === null && loginForm()}
      {user !== null && notesForm()}
      <Footer/>
    </div>
  );
}

export default App;
