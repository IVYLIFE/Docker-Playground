import { Schema, model } from 'mongoose';

const NoteSchema = new Schema({
  text: String
});

const NoteModel = model('Note', NoteSchema);

export default NoteModel;