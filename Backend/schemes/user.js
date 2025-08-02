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
  role: { 
    type: String, 
    enum: ['user', 'admin'], 
    default: 'user' }
},
  {
    timestamps: true,
    versionKey: false
  });

export const UserModel = mongoose.model('users', userSchema);
