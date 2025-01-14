import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { FindAllUsersDto } from './dto/find-all-users.dto';
import { HashingService } from 'src/hashing/hashing.service';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly hashingService: HashingService) { }

  async findByName(name: string) {
    const user = await this.prisma.user.findFirst({
      where: { name },
      select: {
        id: true,
        name: true,
        profile: true,
        cars: true
      }
    })
    return user;
  }

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await this.hashingService.hash(createUserDto.password)

    const user = await this.prisma.user.create({
      data: {
        name: createUserDto.name,
        profile: createUserDto.profile,
        password: hashedPassword
      },
      select: {
        id: true,
        name: true,
        profile: true,
      }
    })
    return user;
  }

  async findAll(findAllUsersDto?: FindAllUsersDto) {
    const users = await this.prisma.user.findMany({

      where: findAllUsersDto?.name ? {
        name: findAllUsersDto.name
      } : {},
      //caso findalldto tenha um nome, busque pelos nome, caso contrario retorne todos do banco

      take: findAllUsersDto.limit,
      skip: findAllUsersDto.offset,
      select: {
        id: true,
        name: true,
        profile: true,
        cars: true
      }
    });
    return users;
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findFirst({
      where: { id },
      select: {
        id: true,
        name: true,
        profile: true,
        cars: true
      }
    })
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.prisma.user.findFirst({
      where: { id },
      select: {
        id: true,
        name: true,
        profile: true,
        cars: true
      }
    })

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const hashedPassword = await this.hashingService.hash(updateUserDto.password);

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: {
        name: updateUserDto.name,
        profile: updateUserDto.profile,
        password: hashedPassword
      }

    })
    return updateUserDto;
  }

  async remove(id: string) {
    await this.prisma.user.findFirst({
      where: { id }
    })

    await this.prisma.user.delete({
      where: { id }
    })

    return {
      message: 'User deleted successfully',
    };
  }
}
