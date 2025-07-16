import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { historicPlayersModel } from '../schemes/historicplayers.js';

dotenv.config();

const connectionMongoDB = process.env.MONGO_URI;

 
mongoose.connect(connectionMongoDB) 
.then(() => {
      console.log('Connected to MongoDB');
    }).catch (error => {
      console.error('Error connecting to MongoDB:', error);
    });


export class MongooseConnection {

  static async getHistoricPlayers() {
    const getHistoricPlayers = await historicPlayersModel.find();
    return getHistoricPlayers;
  }

  static async getHistoricPlayersById(id) {
    const getHistoricPlayersById = await historicPlayersModel.findById(id);
    return getHistoricPlayersById;
  }

  static async getHistoricPlayersByName(name) {
    const getHistoricPlayersByName = await historicPlayersModel.findOne({ name: { $regex: new RegExp(`^${name.trim()}$`, 'i') } });
    return getHistoricPlayersByName;
  }

  //////////////////// POST ////////////////////

  static async createHistoricPlayer(data) {
    const existingPlayer = await historicPlayersModel.findOne({ name: data.name });
    if (existingPlayer) {
      const error = new Error(' Historic player already exists');
      error.code = 11000;
      throw error;
    }
    const newHistoricPlayer = new historicPlayersModel({
      name: data.name,
      position: data.position,
      nationality: data.nationality,
      region: data.region,
    });
    const newPlayer = await newHistoricPlayer.save();
    return newPlayer;
  }

  //////////////////// PUT ////////////////////

  static async replaceHistoricPlayer(id, data) {
    const replacedHistoricPlayer = await historicPlayersModel.findOneAndReplace({ _id: id }, data, { new: true });
    return replacedHistoricPlayer;
  }

  //////////////////// PATCH ////////////////////

  static async updateHistoricPlayer(id, data) {
    const updatedHistoricPlayer = await historicPlayersModel.findOneAndUpdate({ _id: id }, data, { new: true, runValidators: true });
    return updatedHistoricPlayer;
  }

  //////////////////// DELETE BY ID ////////////////////

  static async deleteHistoricPlayerById(id) {
    const deletedHistoricPlayerById = await historicPlayersModel.findByIdAndDelete(id);
    return deletedHistoricPlayerById;
  }

  //////////////////// DELTE BY NAME ////////////////////

  static async deleteHistoricPlayerByName(name) {
    const deletedHistoricPlayerByName = await historicPlayersModel.findOneAndDelete({ name });
    return deletedHistoricPlayerByName;
  }
};
 

