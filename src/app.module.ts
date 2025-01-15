import { Module } from '@nestjs/common';
import { CarsModule } from './cars/cars.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { HashingModule } from './hashing/hashing.module';

@Module({
  imports: [CarsModule, UserModule, AuthModule, PrismaModule, HashingModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    }
  ],
})
export class AppModule { }
