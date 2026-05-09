export class Password {
  private readonly hashedValue: string;

  constructor(hashedValue: string) {
    if (!hashedValue || hashedValue.length < 60) { // bcrypt hash length
      throw new Error('Invalid password hash');
    }
    this.hashedValue = hashedValue;
  }

  getHashedValue(): string {
    return this.hashedValue;
  }

  static async create(plainPassword: string): Promise<Password> {
    if (plainPassword.length < 8) {
      throw new Error('Password must be at least 8 characters long');
    }
    // Note: Actual hashing will be done in infrastructure layer
    // This is just the value object
    const bcrypt = require('bcryptjs');
    const hashed = await bcrypt.hash(plainPassword, 12);
    return new Password(hashed);
  }

  async compare(plainPassword: string): Promise<boolean> {
    const bcrypt = require('bcryptjs');
    return bcrypt.compare(plainPassword, this.hashedValue);
  }
}