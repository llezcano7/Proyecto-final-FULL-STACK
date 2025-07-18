import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from 'bcrypt';
import { userModel } from "../schemes/user.js";


dotenv.config();

const connectionMongoDB = process.env.MONGO_URI;

mongoose.connect(connectionMongoDB) 
.then(() => {
      console.log('Connected to MongoDB');
    }).catch (error => {
      console.error('Error connecting to MongoDB:', error);
    });

export default class userLog {

  static async getUser () {
    const response = await userModel.find ({});
    
    return response;
  }

  /////////////////// REGISTER ///////////////////

   static async register (username, email, password) {
      const existingUser = await userModel.findOne ({ email });
      
      if (existingUser) throw new Error ("User already exist")
      
        const hashedPassword = await bcrypt.hash (password, 10);
        password = hashedPassword;

        const newUser = new userModel ({ username, email, password : hashedPassword, type: 'user' });

        const data = await newUser.save ();

        return (data)
   }

  /////////////////// LOGIN ///////////////////

   static async login (email, password) {
    const user = await userModel.findOne ({ email });
    
    if (!user) {
      throw new Error("User not found");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new Error("Invalid password");
    }
    return user
   }
}