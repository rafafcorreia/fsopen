import { useEffect, useState } from 'react';
import Note from './components/Note';
import notesService from './services/notes';
import Notification from './components/Notification';
import Footer from './components/Footer';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('a new note...');
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    notesService.getAll().then((initialNotes) => {
      setNotes(initialNotes);
    });
  }, []);

  console.log('render', notes.length, 'notes');

  const addNote = (event) => {
    event.preventDefault();
    const noteObject = { content: newNote, important: Math.random() < 0.5 };

    notesService.create(noteObject).then((newNote) => {
      setNotes(notes.concat(newNote));
      setNewNote('');
    });
  };

  const handleNoteChange = (event) => {
    setNewNote(event.target.value);
  };

  const handleToogleImportance = (id) => {
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };

    notesService
      .update(changedNote)
      .then((updatedNote) => {
        setNotes((notes) =>
          notes.map((note) => (note.id === id ? updatedNote : note)),
        );
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage(
          `Note '${note.content}' was already removed from server`,
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 5_000);
        setNotes(notes.filter((note) => note.id !== id));
      });
  };

  const notesToShow = showAll ? notes : notes.filter((note) => note.important);

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toogleImportance={() => handleToogleImportance(note.id)}
          />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">Save</button>
      </form>
      <Footer />
    </div>
  );
};

export default App;
