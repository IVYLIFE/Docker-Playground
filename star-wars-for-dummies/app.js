import express from "express";
import axios from "axios";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";


import Favorite from "./models/favorite.js";
dotenv.config(); // Load environment variables


const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

app.use(express.json());
app.use(cors());



// Get all favorites
app.get("/favorites", async (req, res) => {
  try {
    const favorites = await Favorite.find();
    res.status(200).json({ favorites });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
});


// Add a new favorite
app.post("/favorites", async (req, res) => {
  const { name, type, url } = req.body;

  try {
    if (!["movie", "character"].includes(type)) {
      return res.status(400).json({ message: '"type" should be "movie" or "character"!' });
    }

    const existingFav = await Favorite.findOne({ name });
    if (existingFav) {
      return res.status(400).json({ message: "Favorite already exists!" });
    }

    const favorite = new Favorite({ name, type, url });
    await favorite.save();

    res.status(201).json({ message: "Favorite saved!", favorite });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
});


// Get all movies
app.get("/movies", async (req, res) => {
  try {
    const response = await axios.get("https://swapi.dev/api/films");
    res.status(200).json({ movies: response.data });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
});


// Get all people
app.get("/people", async (req, res) => {
  try {
    const response = await axios.get("https://swapi.dev/api/people");
    res.status(200).json({ people: response.data });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
});


// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI); // No callbacks, use async/await
    console.log("✅ Connected to MongoDB");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1); // Exit if connection fails
  }
};

connectDB();


