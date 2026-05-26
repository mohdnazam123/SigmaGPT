import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    Request: true,
    unique: true,
    trim: true
  },

  email: {
    type: String,
    require: true,
    unique: true,
    trim: true
  },

  password: {
    type: String,
    require: true
  }

}, {timestamp: true});

export default mongoose.model("User", userSchema);