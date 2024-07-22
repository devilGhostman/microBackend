const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema(
  {
    title: { type: String, required: [true, "Title is required"] },
    description: { type: String, required: [true, "Description is required"] },
    picturePath: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    userName: { type: String },
    userPicturePath: { type: String },
    location: { type: String },
    likes: [{ type: mongoose.Schema.Types.ObjectId }],
    savedBy: [{ type: mongoose.Schema.Types.ObjectId }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "comment" }],
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

module.exports = mongoose.model("post", PostSchema);
