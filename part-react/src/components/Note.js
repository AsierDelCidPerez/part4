import noteService from '../services/notes'

const Note = ({note, toggleImportance}) => {
    const label = note.important ? "Make NOT important" : "Make important"
    return (
        <li>
            {note.content}&nbsp;
            <button onClick={toggleImportance}>{label}</button>
        </li>
    )
}
export default Note;