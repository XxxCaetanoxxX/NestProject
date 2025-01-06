import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { HashingModule } from 'src/hashing/hashing.module';
@Module({
  controllers: [UserController],
  providers: [UserService],
  imports:[HashingModule],
  //para que ele fique visível fora deste módulo
  exports: [UserService]
})
export class UserModule { }
