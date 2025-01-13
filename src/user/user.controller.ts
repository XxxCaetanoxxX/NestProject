import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from 'src/authorization/roles.decorator';
import { RolesGuard } from 'src/authorization/roles.guard';
import { Role } from 'src/authorization/role.enum';
import { FindAllUsersDto } from './dto/find-all-users.dto';
import { ApiBearerAuth, ApiOkResponse, ApiQuery } from '@nestjs/swagger';
import { ResponseUserDto } from './dto/response-user.dto'
import { ResponseDeleteUserDto } from './dto/response-delete-user.dto';


@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  @ApiOkResponse({
    description: 'Returns the creted user ',
    type: ResponseUserDto,
  })
  @UseGuards(RolesGuard)
  @Roles(Role.MANAGER, Role.ADMIN)
  create(@Body() createUserDto: CreateUserDto) {
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
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({
    description: 'Returns an updated user',
    type: ResponseUserDto,
  })
  @UseGuards(RolesGuard)
  @Roles(Role.MANAGER, Role.ADMIN)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOkResponse({
    description: 'Delete a user',
    type: ResponseDeleteUserDto,
  })
  @UseGuards(RolesGuard)
  @Roles(Role.MANAGER, Role.ADMIN)
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
