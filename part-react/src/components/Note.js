import noteService from '../services/notes'

const Note = ({note, toggleImportance}) => {
    note.important = note.important || false
    const label = note.important ? "Make NOT important" : "Make important"
    return (
        <li className='note'>
            {note.content}&nbsp;
            <button onClick={toggleImportance}>{label}</button>
        </li>
    )
}
export default Note;