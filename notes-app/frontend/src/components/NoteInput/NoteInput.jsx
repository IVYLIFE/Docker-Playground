import './NoteInput.css';
import Card from '../Card/Card';
import { useState } from 'react';

function NoteInput({ onAddNote }) {
  const [enteredNoteText, setEnteredNoteText] = useState('');

  function updateNoteTextHandler(event) {
    setEnteredNoteText(event.target.value);
  }

  function noteSubmitHandler(event) {
    event.preventDefault();

    if (enteredNoteText.trim().length === 0) {
      alert('Invalid text - please enter a longer one!');
      return;
    }

    onAddNote(enteredNoteText);

    setEnteredNoteText('');
  }

  return (
    <section id='note-input'>
      <Card>
        <form onSubmit={noteSubmitHandler}>
          <div className="inputContainer">
            <label htmlFor='text'>New Note</label>
            <input
              type='text'
              id='text'
              name='text'
              value={enteredNoteText}
              onChange={updateNoteTextHandler}
              placeholder='Enter your note here'
            />
          </div>
          <button>Add Note</button>
        </form>
      </Card>
    </section>
  );
}

export default NoteInput;
