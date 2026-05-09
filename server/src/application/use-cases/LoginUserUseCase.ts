import { inject, injectable } from 'inversify';
import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { Password } from '../../domain/value-objects/Password';
import { LoginUserDTO, AuthResponseDTO } from '../dtos/AuthDTOs';
import { IAuthService } from '../services/IAuthService';

@injectable()
export class LoginUserUseCase {
  constructor(
    @inject('IUserRepository') private userRepository: IUserRepository,
    @inject('IAuthService') private authService: IAuthService,
  ) {}

  async execute(dto: LoginUserDTO): Promise<AuthResponseDTO> {
    // Find user by email
    const user = await this.userRepository.findByEmail(dto.email);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    // Verify password
    const password = new Password(user.password);
    const isValidPassword = await password.compare(dto.password);
    if (!isValidPassword) {
      throw new Error('Invalid credentials');
    }

    // Check if user is active
    if (!user.isActive) {
      throw new Error('Account is deactivated');
    }

    // Generate tokens
    const tokens = await this.authService.generateTokens(user);

    return {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }
}