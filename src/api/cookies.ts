import { parse, serialize } from 'cookie';
import Cookies from 'js-cookie';

export const setToken = (token: string, res?: any) => {
  const cookie = serialize('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development', // Use HTTPS in production
    sameSite: 'strict', // Send the cookie only for same-site requests
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: '/',
  });

  if (res) {
    // Server-side
    res.setHeader('Set-Cookie', cookie);
  } else {
    // Client-side
    Cookies.set('token', token, { expires: 7 }); // 1 week
  }
};

export const getToken = (req?: any) => {
  if (req) {
    // Server-side
    const cookies = parse(req.headers.cookie || '');
    return cookies.token;
  }
  // Client-side
  return Cookies.get('token');
};
