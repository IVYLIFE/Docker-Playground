import React, { useState, useEffect } from 'react';
import './App.css'

import {
  NoteInput,
  NoteCard,
  ErrorAlert
} from './components'


function App() {

  const [loadedNotes, setLoadedNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = 'http://localhost:4000/notes/';


  useEffect(function () {
    async function fetchData() {
      setIsLoading(true);

      try {
        const response = await fetch(API_URL);

        const resData = await response.json();

        if (!response.ok) {
          throw new Error(resData.message || 'Fetching the notes failed.');
        }

        setLoadedNotes(resData.notes);
      } catch (err) {
        setError(
          err.message ||
          'Fetching notes failed - the server responsed with an error.'
        );
      }
      setIsLoading(false);
    }

    fetchData();
  }, []);

  async function addNoteHandler(noteText) {
    setIsLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify({
          text: noteText,
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const resData = await response.json();

      if (!response.ok) {
        throw new Error(resData.message || 'Adding the note failed.');
      }

      setLoadedNotes((prevNotes) => {
        const updatedNotes = [
          {
            id: resData.note.id,
            text: noteText,
          },
          ...prevNotes,
        ];
        return updatedNotes;
      });
    } catch (err) {
      setError(
        err.message ||
          'Adding a note failed - the server responsed with an error.'
      );
    }
    setIsLoading(false);
  }

  async function deleteNoteHandler(noteId) {
    setIsLoading(true);

    try {
      const response = await fetch(API_URL + noteId, {
        method: 'DELETE',
      });

      const resData = await response.json();

      if (!response.ok) {
        throw new Error(resData.message || 'Deleting the note failed.');
      }

      setLoadedNotes((prevNotes) => {
        const updatedNotes = prevNotes.filter((note) => note.id !== noteId);
        return updatedNotes;
      });
    } catch (err) {
      setError(
        err.message ||
          'Deleting the note failed - the server responsed with an error.'
      );
    }
    setIsLoading(false);
  }




  return (
    <>
      {error && <ErrorAlert errorText={error} />}
      <NoteInput onAddNote={addNoteHandler} />
      {!isLoading && (
        <NoteCard notes={loadedNotes} onDeleteNote={deleteNoteHandler} />
      )}
    </>
  );
}

export default App
