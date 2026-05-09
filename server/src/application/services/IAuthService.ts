import { User } from '../../domain/entities/User';

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

export interface IAuthService {
  generateTokens(user: User): Promise<TokenPair>;
  verifyAccessToken(token: string): Promise<any>;
  verifyRefreshToken(token: string): Promise<any>;
  hashPassword(password: string): Promise<string>;
  comparePassword(password: string, hashedPassword: string): Promise<boolean>;
}