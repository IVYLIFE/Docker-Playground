import fs from 'fs';
import path from 'path';
import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cors from "cors";
import Note from './models/note.js';

dotenv.config();

const PORT = process.env.PORT || 4001;
const MONGODB_URI = "mongodb://127.0.0.1:27017/notes"; // ✅ Fixed URI (removed unnecessary @)

console.log(`\n\nUsing PORT: ${PORT}`);
console.log(`Using MONGODB_URI: ${MONGODB_URI}\n\n`);

// ✅ Ensure logs directory exists before writing logs
const logsDir = path.resolve('logs');
console.log('path.resolve:', path.resolve('logs'), '\n\n');
if (!fs.existsSync(logsDir)) fs.mkdirSync(logsDir, { recursive: true });

const accessLogStream = fs.createWriteStream(
  path.join(logsDir, 'access.log'),
  { flags: 'a' }
);

const app = express();
app.use(morgan('combined', { stream: accessLogStream }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());



// ✅ Function to format response data
const formatnote = (note) => ({ id: note.id, text: note.text });


// 1️⃣ Fetch notes
app.get('/notes', async (req, res) => {
  console.log('📌 Fetching notes...');
  try {
    const notes = await Note.find();
    res.status(200).json({ notes: notes.map(formatnote) });
    console.log('✅ notes fetched successfully.\n');
  } catch (err) {
    console.error('❌ Error fetching notes:', err.message, '\n');
    res.status(500).json({ message: 'Failed to load notes.' });
  }
});


// 2️⃣ Store a new note
app.post('/notes', async (req, res) => {
  console.log('📌 Storing a new note...');
  const noteText = req.body.text?.trim();

  if (!noteText) {
    console.log('⚠️ Invalid input - No text provided.\n');
    return res.status(422).json({ message: 'Invalid note text.' });
  }

  try {
    const note = await Note.create({ text: noteText }); // ✅ Simplified note creation
    res.status(201).json({ message: 'note saved', note: formatnote(note) });
    console.log('✅ note stored successfully.\n');
  } catch (err) {
    console.error('❌ Error saving note:', err.message, '\n');
    res.status(500).json({ message: 'Failed to save note.' });
  }
});

// 3️⃣ Delete a note
app.delete('/notes/:id', async (req, res) => {
  console.log(`📌 Deleting note with ID: ${req.params.id}`);
  try {
    const result = await Note.deleteOne({ _id: req.params.id });
    if (result.deletedCount === 0) {
      console.log('⚠️ note not found.\n');
      return res.status(404).json({ message: 'note not found.' });
    }
    res.status(200).json({ message: 'Deleted note!' });
    console.log('✅ note deleted successfully.\n');
  } catch (err) {
    console.error('❌ Error deleting note:', err.message), '\n';
    res.status(500).json({ message: 'Failed to delete note.' });
  }
});

// 🔗 Connect to MongoDB and Start Server
const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
};

connectDB();
