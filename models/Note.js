const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var NoteSchema = new Schema({
    text: String,
});

var Note = mongoose.model("Note", NoteSchema);

module.exports = Note;