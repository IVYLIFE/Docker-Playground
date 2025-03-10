import './NoteItem.css';

function NoteItem(props) {
  return <li className="note-item" onClick={props.onDelete.bind(null, props.id)}>{props.text}</li>;
}

export default NoteItem;
