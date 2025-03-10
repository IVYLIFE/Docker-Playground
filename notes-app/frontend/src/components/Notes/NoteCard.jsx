import './NoteCard.css';
import Card from '../Card/Card';
import NoteItem from '../NoteItem/NoteItem';

function NoteCard({ notes, onDeleteNote }) {
  const hasNoNote = !notes || notes.length === 0;

  return (
    <section id='notes'>
      <Card>
        <h2>Your Note</h2>
        {hasNoNote && <h2>No note found. Start adding some!</h2>}
        <ul>
          {notes.map((note) => (
            <NoteItem
              key={note.id}
              id={note.id}
              text={note.text}
              onDelete={onDeleteNote}
            />
          ))}
        </ul>
      </Card>
    </section>
  );
}

export default NoteCard;
