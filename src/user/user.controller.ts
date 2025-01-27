import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  ParseIntPipe,
  Request,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from 'src/authorization/roles.decorator';
import { RolesGuard } from 'src/authorization/roles.guard';
import { Role } from 'src/authorization/role.enum';
import { FindAllUsersDto } from './dto/find-all-users.dto';
import { ApiBearerAuth, ApiOkResponse, ApiParam } from '@nestjs/swagger';
import { ResponseUserDto } from './dto/response-user.dto';
import { ResponseDeleteUserDto } from './dto/response-delete-user.dto';
import { AuthenticatedRequest } from 'src/auth/authenticated-request';
import { InterceptorTimeInterceptor } from 'src/interceptors/interceptor_time.interceptor';
import { UpdateInterceptor } from 'src/interceptors/update.interceptor';

@ApiBearerAuth()
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  @ApiOkResponse({
    description: 'Returns the creted user ',
    type: ResponseUserDto,
  })
  @UseGuards(RolesGuard)
  @Roles(Role.MANAGER, Role.ADMIN)
  @UseInterceptors(InterceptorTimeInterceptor)
  create(
    @Body() createUserDto: CreateUserDto,
    @Request() req: AuthenticatedRequest) {
    createUserDto.creationDate = req['creationDate'];
    createUserDto.userCreatorId = req.user['userId'];
    createUserDto.updateDate = req['creationDate'];
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiOkResponse({
    description: 'Returns a list of users',
    type: [ResponseUserDto],
  })
  findAll(@Query() findAllUsersDto?: FindAllUsersDto) {
    return this.userService.findAll(findAllUsersDto);
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Returns one user',
    type: ResponseUserDto,
  })
  @ApiParam({ name: 'id', type: Number, required: true })
  findOne(@Param('id', ParseIntPipe) id: number) {
    console.log(typeof id);
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({
    description: 'Returns an updated user',
    type: ResponseUserDto,
  })
  @ApiParam({ name: 'id', type: Number })
  @UseGuards(RolesGuard)
  @Roles(Role.MANAGER, Role.ADMIN)
  @UseInterceptors(UpdateInterceptor)
  @ApiParam({ name: 'id', type: Number, required: true })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
    @Request() req: AuthenticatedRequest
  ) {
    updateUserDto.updateDate = req['updateDate'];
    return this.userService.update(id, updateUserDto);
  }

  //somente esse endpoint cai n prismaError 2025, não sei o motivo
  @Delete(':id')
  @ApiOkResponse({
    description: 'Delete a user',
    type: ResponseDeleteUserDto,
  })
  @ApiParam({ name: 'id', type: Number, required: true })
  @UseGuards(RolesGuard)
  @Roles(Role.MANAGER, Role.ADMIN)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.remove(id);
  }
}
