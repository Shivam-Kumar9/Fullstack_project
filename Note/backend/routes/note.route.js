import express from "express";
import { NoteModel } from "../model/note.model.js";

const noteRouter = express.Router();

noteRouter.post("/create", async (req, res) => {
  /* console.log(req.body, req.user) */ const { title, content, status } =
    req.body;
  const userId = req.user._id;
  //console.log("----", userId); //--------
  try {
    const note = new NoteModel({
      title,
      content,
      status,
      userID: userId,
    });

    await note.save();
    res.status(201).json({
      message: "Note created successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error  note making failed",
      error: error.message,
    });
  }
});

noteRouter.get("/", async (req, res) => {
  const userId = req.user._id;
  console.log("objectId", userId); //---
  try {
    const notes = await NoteModel.find({
      userID: userId,
    });
    console.log(notes);
    res.status(200).json({ notes });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching notes",
      error: error.message,
    });
  }
});

noteRouter.patch("/update/:id", async (req, res) => {
  let payload = req.body;
  let noteId = req.params.id;
  let userId = req.user._id;
  try {
    const note = await NoteModel.findOne({_id:noteId})
    console.log(note.userID.toString() , userId.toString()); //---
    if(note.userID.toString() == userId.toString()){
       await NoteModel.findByIdAndUpdate({_id : noteId},payload)
       return res.status(200).json({message : "Note updated successfully"})
    }
    else {
      return res.status(401).json({message : "Unauthorized u can't update"})
    }
  } catch (error) {
      res.status(500).json({message : `Error while update note ${error}`});
  }
});

noteRouter.delete("/delete/:id", async (req, res) => {
  const noteId =  req.params.id
  const userId = req.user._id
  try {
     const note = await NoteModel.findOne({_id : noteId})
     if(note.userID.toString() == userId.toString()){
      await NoteModel.findByIdAndDelete({_id : noteId})
      res.status(200).json({message : `Note deleted successfully`})
     }
     else {
       res.status(401).json({message : `Unauthorized u can't delete`})
     }
  } catch (error) {
     res.status(500).json({message : `Error while deleting note ${error}`})
  }
});
  

export default noteRouter ;
 