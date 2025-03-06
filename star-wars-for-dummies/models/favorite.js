import { Schema, model } from "mongoose";


const favoriteSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    type: { type: String, required: true, enum: ["movie", "character"] },
    url: { type: String, required: true },
  },
  { timestamps: true } // Automatically adds createdAt & updatedAt fields
);

const Favorite = model("Favorite", favoriteSchema);

export default Favorite;
