const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MusicSchema = new Schema(
  {
    title: { type: String, required: true },
    artist: { type: String, required: true },
    poster: { type: String, required: true },
    songPath: { type: String, required: true },
    // songType: { type: String, required: true },
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

module.exports = mongoose.model("music", MusicSchema);
