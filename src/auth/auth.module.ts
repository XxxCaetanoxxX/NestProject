import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './auth.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports:[UserModule, JwtModule.register({
    global: true,
    secret: process.env.JWT_SECRETY,
    signOptions: {expiresIn: '2h'}
  })],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard], 
  exports: [AuthService, JwtModule]
})
export class AuthModule {}
