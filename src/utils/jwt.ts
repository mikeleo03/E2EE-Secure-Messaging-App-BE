import * as jwt from 'jsonwebtoken';
import config from '../config';


export interface Payload {
    username: string;
    email: string;
}

export function signToken(payload: Payload, expiresIn: string = '1h'): string {
    return jwt.sign(payload, config.jwtSecret, { expiresIn });
}

export function verifyToken(token: string): Payload {
    return jwt.verify(token, config.jwtSecret) as Payload;
}