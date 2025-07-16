import mongoose from "mongoose";
import { transformPlayer } from "../utils/transform.js";

export const historicPlayersSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    trim: true,
  },
    position: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        enum: ['goalkeeper', 'defender', 'midfielder', 'forward'],

      },
        nationality: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  region: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
}, {
  timestamps: true,
  versionKey: false,
  });
historicPlayersSchema.set("toJSON", {
  transform: transformPlayer,
  },
);

export const historicPlayersModel = mongoose.model(
  "historicplayers", historicPlayersSchema
); 
