import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CarrosModule } from './carros/carros.module';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { CarrosController } from './carros/carros.controller';
import { CarrosService } from './carros/carros.service';

@Module({
  imports: [CarrosModule, UserModule],
  controllers: [AppController, UserController, CarrosController],
  providers: [AppService, UserService, CarrosService],
})
export class AppModule {}
