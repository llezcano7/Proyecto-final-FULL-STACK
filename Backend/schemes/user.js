import mongoose from "mongoose";

export const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  type: {
    type: String,
    lowercase: true,
    trim: true,
  }
}, 
{
  timestamps: true,
  versionKey: false
});

export const userModel = mongoose.model('users', userSchema);
