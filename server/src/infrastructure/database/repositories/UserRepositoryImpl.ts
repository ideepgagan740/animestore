import { injectable } from 'inversify';
import { UserModel, IUserDocument } from '../models/UserModel';
import { IUserRepository } from '../../../domain/repositories/IUserRepository';
import { UserEntity, UserRole } from '../../../domain/entities/User';

@injectable()
export class UserRepositoryImpl implements IUserRepository {
  async findById(id: string): Promise<UserEntity | null> {
    const userDoc = await UserModel.findById(id);
    if (!userDoc) return null;
    return this.toEntity(userDoc);
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const userDoc = await UserModel.findOne({ email });
    if (!userDoc) return null;
    return this.toEntity(userDoc);
  }

  async create(user: UserEntity): Promise<UserEntity> {
    const userDoc = new UserModel({
      email: user.email,
      password: user.password,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      isActive: user.isActive,
    });
    const savedDoc = await userDoc.save();
    return this.toEntity(savedDoc);
  }

  async update(user: UserEntity): Promise<UserEntity> {
    const updatedDoc = await UserModel.findByIdAndUpdate(
      user.id,
      {
        email: user.email,
        password: user.password,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        isActive: user.isActive,
      },
      { new: true }
    );
    if (!updatedDoc) throw new Error('User not found');
    return this.toEntity(updatedDoc);
  }

  async delete(id: string): Promise<void> {
    await UserModel.findByIdAndDelete(id);
  }

  async findAll(page: number, limit: number): Promise<UserEntity[]> {
    const users = await UserModel.find()
      .skip((page - 1) * limit)
      .limit(limit);
    return users.map(this.toEntity);
  }

  async count(): Promise<number> {
    return UserModel.countDocuments();
  }

  private toEntity(doc: IUserDocument): UserEntity {
    return new UserEntity(
      doc._id.toString(),
      doc.email,
      doc.password,
      doc.firstName,
      doc.lastName,
      doc.role,
      doc.isActive,
      doc.createdAt,
      doc.updatedAt,
    );
  }
}