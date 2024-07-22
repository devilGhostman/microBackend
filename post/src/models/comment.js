const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema(
  {
    commentedby: { type: String },
    commentedbyPic: { type: String },
    commentedbyId: { type: mongoose.Schema.Types.ObjectId },
    commentedOnPostId: { type: mongoose.Schema.Types.ObjectId,ref:"post" },
    comment: { type: String },
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.__v;
      },
    },
    timestamps: true,
  }
);

module.exports = mongoose.model("comment", CommentSchema);
