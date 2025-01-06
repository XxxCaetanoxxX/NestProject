import { Injectable, HttpException, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { HashingService } from 'src/hashing/hashing.service';


@Injectable()
export class AuthService {
  constructor(private userService: UserService,
    private hashingService: HashingService) { }

  async signIn(name: string, senha: string): Promise<any> {

    const user = await this.userService.findByName(name); 
    const isSenhaValida = user && this.hashingService.compare(senha, user.senha) //se o usuario existir e a comparação das senhas retornar true

    if (!user || !isSenhaValida) {
      throw new UnauthorizedException("Credenciais inválidas!");
    }

    // Gera o token JWT
    const token = jwt.sign(
      { userId: user.id, perfil: user.perfil },
      process.env.JWT_SECRETY,
      { expiresIn: '2h' }
    );

    return { token }; // Retorna o token

  }
}
