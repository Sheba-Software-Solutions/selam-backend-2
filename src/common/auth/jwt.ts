import jwt from 'jsonwebtoken';
import { config } from '../../infra/config';

const ACCESS_SECRET = config.JWT_ACCESS_SECRET || 'access_secret';
const REFRESH_SECRET = config.JWT_REFRESH_SECRET || 'refresh_secret';

export function signAccessToken(payload: string | object, expiresIn: string = '15m') {
  return jwt.sign(payload, ACCESS_SECRET as jwt.Secret, { expiresIn } as jwt.SignOptions);
}

export function signRefreshToken(payload: string | object, expiresIn: string = '7d') {
  return jwt.sign(payload, REFRESH_SECRET as jwt.Secret, { expiresIn } as jwt.SignOptions);
}

export function verifyAccessToken(token: string) {
  return jwt.verify(token, ACCESS_SECRET);
}

export function verifyRefreshToken(token: string) {
  return jwt.verify(token, REFRESH_SECRET);
}
