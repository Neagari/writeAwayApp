const { Schema, model } = require("mongoose");

const NoteSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    content: {
      type: String,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
);

const Note = model("Note", NoteSchema);

module.exports = Note;
