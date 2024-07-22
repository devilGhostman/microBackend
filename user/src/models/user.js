const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    userName: { type: String, required: true, min: 2, max: 50 },
    email: { type: String, required: true, unique: true, max: 50 },
    password: { type: String, required: true, minlength: 6 },
    salt: { type: String, require: true },
    phoneNumber: {
      type: String,
      required: true,
      minlength: [10, "Must be 10 digits"],
    },
    picturePath: { type: String, default: "avatar.png" },
    location: { type: String },
    friends: [{ type: Schema.Types.ObjectId, ref: "user" }],
    occupation: { type: String },
    viewedProfile: { type: Number, default: 0 },
    impressions: { type: Number, default: 0 },
    liked: [
      {
        postid: { type: mongoose.Schema.Types.ObjectId },
        postTitle: { type: String },
        postPic: { type: String },
      },
    ],
    savedPosts: [
      {
        postid: { type: mongoose.Schema.Types.ObjectId },
        postTitle: { type: String },
        postPic: { type: String },
      },
    ],
    commented: [
      {
        postid: { type: mongoose.Schema.Types.ObjectId },
        postTitle: { type: String },
        postPic: { type: String },
        comment: { type: String },
        commentid: { type: mongoose.Schema.Types.ObjectId },
      },
    ],
    isAdmin: { type: Boolean, default: false },
    role: { type: String, enums: ["user", "admin"], default: "user" },
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.__v;
        delete ret.$__;
        delete ret.$new;
        delete ret.__proto__;
        delete ret.ownerDocument;
        delete ret.save;
      },
    },
    timestamps: true,
  }
);

module.exports = mongoose.model("user", UserSchema);
