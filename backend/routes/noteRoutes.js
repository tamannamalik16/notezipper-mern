const express = require("express");
const {
  getNotes,
  createNote,
  getSingleNote,
  updateNote,
  deleteNote,
} = require("../controllers/noteController");
const { protect } = require("../middlewares/authMiddleware");
const router = express.Router();

//creating api routes for notes
router.route("/").get(protect, getNotes); //to fetch all the notes
router.route("/create").post(protect, createNote); //to create a new note
router
  .route("/:id")
  .get(getSingleNote)
  .put(protect, updateNote)
  .delete(protect, deleteNote); //to get single note
//put -to update note
//delete - to delete note

module.exports = router;
