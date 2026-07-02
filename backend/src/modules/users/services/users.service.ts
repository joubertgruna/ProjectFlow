import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';
import { UsersRepository } from '../repositories/users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(name: string, email: string, passwordHash: string): Promise<User> {
    const normalizedEmail = email.trim().toLowerCase();
    const existing = await this.usersRepository.findByEmail(normalizedEmail);
    if (existing) {
      throw new ConflictException('E-mail já cadastrado');
    }

    return this.usersRepository.create({
      name: name.trim(),
      email: normalizedEmail,
      passwordHash,
    });
  }

  findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findByEmail(email.trim().toLowerCase());
  }

  async findById(id: string): Promise<User> {
    const user = await this.usersRepository.findById(id);
    if (!user) throw new NotFoundException('Usuário não encontrado');
    return user;
  }

  toResponse(user: User) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }
}
