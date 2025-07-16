import userLog from '../models/user.js';
import dotenv from 'dotenv';
import tokenAndCookie from '../utils/jwt.js';
import response from '../utils/response.js';
import authenticator from '../utils/authenticator.js';
import cookieParser from 'cookie-parser';

dotenv.config();

export class userController {
  static async getUser(req, res) {
    try {
      const data = await userLog.getUser();
      return res.status(200).json(response({
        success: true,
        status:200,
        message: 'Users retrieved successfully',
        data,
      }));
    } catch (error) {
      return res.status(500).json(response({
        success: false,
        status: 500,
        message: 'Failed to get users',
        error: error.message,
      }));
    }
  }

  /////////////////// REGISTER ///////////////////

  static async register(req, res) {
    try {
      const { username, email, password } = req.body;
      const registeredUser = await userLog.register(username, email, password);
      const result = tokenAndCookie(res, registeredUser);

      return res.status(201).json(response({
        success: true,
        status: 201,
        message: 'User registered successfully',
        data: result,
      }));
    } catch (error) {
      return res.status(400).json(response({
        success: false,
        status: 400,
        message: 'Registration failed',
        error: error.message,
      }));
    }
  }

  /////////////////// LOGIN ///////////////////

  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const loggedUser = await userLog.login(email, password);
      const result = tokenAndCookie(res, loggedUser);

      return res.status(200).json(response({
        success: true,
        status: 200,
        message: 'Login successful',
        data: result,
      }));
    } catch (error) {
      return res.status(401).json(response({
        success: false,
        status: 401,
        message: 'Login failed',
        error: error.message,
      }));
    }
  }

  /////////////////// LOGOUT ///////////////////

  static async logout (req, res) {
  res.cookie ('token', '', {
  expires: new Date (0) 
  });
  return res.status(200).json(response({
    success: true,
    status: 200,
    message: "Logout DONE!"
  }));
}

  /////////////////// PROFILE ///////////////////

static async profile(req, res) {
  try {
    const userFound = await userLog.findByID(req.user.id);

    if (!userFound) {
      return res.status(404).json(response({
        success: false,
        status: 404,
        message: 'User not found'
      }));
    }

    return(userFound) 

  } catch (error) {
    return res.status(500).json(response({
      success: false,
      status: 500,
      message: 'Failed to retrieve user profile',
      error: error.message
    }));
  }
}
}






