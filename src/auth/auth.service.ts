import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as jwt from 'jsonwebtoken';


@Injectable()
export class AuthService {
  constructor(private userService: UserService) { }

  async signIn(name: string, senha: string): Promise<any> {
    const user = await this.userService.findByName(name);
    if (user?.senha !== senha) {
      return console.log('Credenciais inválidas')
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
