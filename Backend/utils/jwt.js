import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config()

export default function tokenAndCookie(res, user, secret = process.env.JWT_SECRET) {
  const token = jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
      type: user.type
    },
    secret,
    { expiresIn: '2h' }
  );

  res.cookie('user-token', token, {
     httpOnly: true,
     secure: false,
     maxAge: 2 * 60 * 60 * 1000 // 2 hours
   });
   return { token, user };
  }
