import UserLog from '../models/user.js';
import response from '../utils/response.js';

export class UserController {
  static async getAllUsers() {
    try {
      const users = await UserLog.getAllUsers();
      return response({
        success: true,
        status: 200,
        message: "Usuario conectado",
        data: users
      });
    } catch (error) {
      return response({
        success: false,
        status: 404,
        message: "Usuario no encontrado",
        error: error.message
      });
    }
  }
  /////////////////// POST ///////////////////

  static async register({ username, email, password }) {
    try {
      const newUser = await UserLog.register(username, email, password);
      return response({
        success: true,
        status: 201,
        message: "Usuario registrado exitosamente",
        data: newUser
      });
    } catch (error) {
      return response({
        success: false,
        status: 400,
        message: "Registro ERROR",
        error: error.message
      });
    }
  }

  /////////////////// POST ///////////////////

  static async login({ email, password }) {
    try {
      const user = await UserLog.login(email, password);
      return response({
        success: true,
        status: 200,
        message: "Bienvenido/a",
        data: user
      });
    } catch (error) {
      return response({
        success: false,
        status: 401,
        message: "Login failed",
        error: error.message
      });
    }
  }

    /////////////////// GET ///////////////////

  static async findUserById(id) {
    try {
      const user = await UserLog.findUserById(id);
      if (!user) throw new Error("User not found");
      return response({
        success: true,
        status: 200,
        message: "User founded",
        data: user
      });
    } catch (error) {
      return response({
        success: false,
        status: 404,
        message: "User not found",
        error: error.message
      });
    }
  }
}