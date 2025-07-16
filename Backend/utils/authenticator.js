import jwt from "jsonwebtoken";
import response from '../utils/response.js';
import dotenv from 'dotenv';
dotenv.config()

export default function authenticator(req, res, next) {
  const token = req.cookies.user_token;

  if (!token) {
    return res.status(401).json(response({
      success: false,
      status: 401,
      message: "Unauthorized" 
    }));
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json(response({
        success: false,
        status: 401,
        message: "Invalid token"
      }));
    }
    res.status(200).json(response({
      success: true,
      status: 200,
      data: decoded
    }));
    req.user = user
    next()
  });
}
 