import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';


@Module({
  controllers: [UserController],
  providers: [UserService],
  //para que ele fique visível fora deste módulo
  exports: [UserService]
})
export class UserModule { }
