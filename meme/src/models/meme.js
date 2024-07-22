const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MemeSchema = new Schema(
  {
    title: { type: String, required: true },
    imgPath: { type: String },
    imgSize: { type: String, required: true },
    videoPath: { type: String },
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

module.exports = mongoose.model("meme", MemeSchema);
