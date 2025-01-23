import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as jwt from 'jsonwebtoken';
import { HashingService } from 'src/hashing/hashing.service';
import { SignInDto } from './dto/signin.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private hashingService: HashingService,
  ) { }

  async signIn(signInDto: SignInDto,): Promise<any> {
    const user = await this.userService.findByName(signInDto.name);
    const isPasswordValid =
      user && await this.hashingService.compare(signInDto.password, user.password); //se o usuario existir e a comparação das senhas retornar true

    if (!user || !isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials!');
    }

    // Gera o token JWT
    const token = jwt.sign(
      { userId: user.id, profile: user.profile },
      process.env.JWT_SECRETY,
      { expiresIn: '24h' },
    );

    return { token }; // Retorna o token
  }
}
