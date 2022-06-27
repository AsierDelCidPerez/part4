import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from 'react';
import Note from './components/Note';
import noteService from './services/notes'
import Notification from './components/Notification'
import Footer from './components/Footer'

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({
    text : "a new note...",
    important : false
  });
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    noteService.getAll()
      .then(response => setNotes(response));
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
  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage}/>
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
      <Footer/>
    </div>
  );
}

export default App;
