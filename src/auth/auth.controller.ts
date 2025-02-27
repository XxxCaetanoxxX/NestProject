import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  HttpCode,
  HttpStatus,
  UseGuards,
  UseInterceptors,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signin.dto';
import { AuthGuard } from './auth.guard';
import { AuthenticatedRequest } from './authenticated-request';
import { Public } from './public-route';
import { UserService } from 'src/user/user.service';
import { ApiOkResponse } from '@nestjs/swagger';
import { ResponseUserDto } from 'src/user/dto/response-user.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { InterceptorTimeInterceptor } from 'src/interceptors/creation.interceptor';
import { sign } from 'crypto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) { }

  @Public()
  @ApiOkResponse({
    description: 'Returns a token if logged',
    type: LoginResponseDto,
  })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @ApiOkResponse({
    description: 'Returns logged user',
    type: ResponseUserDto,
  })
  @Get('profile')
  @UseGuards(AuthGuard)
  getProfile(@Request() req: AuthenticatedRequest) {
    return this.userService.findOne(req.user['userId']);
  }
}
