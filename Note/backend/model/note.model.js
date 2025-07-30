import mongoose from "mongoose";
import { UserModel } from "./user.model.js";

const noteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  status: { type: Boolean, required: true },
  userID: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { 
  versionKey: false,
  timestamps: true
});
  
 
const NoteModel = mongoose.model("Note", noteSchema)

export { NoteModel}; 