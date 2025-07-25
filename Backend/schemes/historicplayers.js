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
    enum: ['arquero', 'defensor', 'mediocampista', 'delantero'],

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
  teams: {
    type: [String],
    required: true,
    lowercase: true,
    trim: true,
  },
  world_cup: {
    type: [String],
    required: true,
    lowercase: true,
    trim: true,
  },
  data: {
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

export const HistoricPlayersModel = mongoose.model(
  "historicplayers", historicPlayersSchema
); 
