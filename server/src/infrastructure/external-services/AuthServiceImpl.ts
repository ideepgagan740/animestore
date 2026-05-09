import { injectable } from 'inversify';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { IAuthService, TokenPair } from '../../application/services/IAuthService';
import { User } from '../../domain/entities/User';

@injectable()
export class AuthServiceImpl implements IAuthService {
  private readonly jwtSecret: string;
  private readonly jwtRefreshSecret: string;
  private readonly jwtExpiresIn: string;
  private readonly jwtRefreshExpiresIn: string;

  constructor() {
    this.jwtSecret = process.env.JWT_SECRET || 'default_secret';
    this.jwtRefreshSecret = process.env.JWT_REFRESH_SECRET || 'default_refresh_secret';
    this.jwtExpiresIn = process.env.JWT_EXPIRES_IN || '15m';
    this.jwtRefreshExpiresIn = process.env.JWT_REFRESH_EXPIRES_IN || '7d';
  }

  async generateTokens(user: User): Promise<TokenPair> {
    const payload = {
      userId: user.id,
      email: user.email,
      role: user.role,
    };

    const accessToken = jwt.sign(payload, this.jwtSecret, {
      expiresIn: this.jwtExpiresIn,
    });

    const refreshToken = jwt.sign(payload, this.jwtRefreshSecret, {
      expiresIn: this.jwtRefreshExpiresIn,
    });

    return { accessToken, refreshToken };
  }

  async verifyAccessToken(token: string): Promise<any> {
    return jwt.verify(token, this.jwtSecret);
  }

  async verifyRefreshToken(token: string): Promise<any> {
    return jwt.verify(token, this.jwtRefreshSecret);
  }

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }

  async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}