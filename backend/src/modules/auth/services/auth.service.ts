import { UnauthorizedException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../../users/services/users.service';
import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const passwordHash = await bcrypt.hash(dto.password, 10);
    const user = await this.usersService.create(dto.name, dto.email, passwordHash);
    return this.buildAuthResponse(user);
  }

  async login(dto: LoginDto) {
    const user = await this.usersService.findByEmail(dto.email);
    if (!user) throw new UnauthorizedException('Credenciais inválidas');

    const validPassword = await bcrypt.compare(dto.password, user.passwordHash);
    if (!validPassword) throw new UnauthorizedException('Credenciais inválidas');

    return this.buildAuthResponse(user);
  }

  async me(userId: string) {
    return this.usersService.toResponse(await this.usersService.findById(userId));
  }

  private buildAuthResponse(user: { id: string; name: string; email: string }) {
    return {
      accessToken: this.jwtService.sign({
        sub: user.id,
        name: user.name,
        email: user.email,
      }),
      user: this.usersService.toResponse({
        ...user,
        passwordHash: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
    };
  }
}
