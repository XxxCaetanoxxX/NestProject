import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { FindAllUsersDto } from './dto/find-all-users.dto';
import { HashingService } from 'src/hashing/hashing.service';
import { request } from 'express';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly hashingService: HashingService,
  ) { }

  async findByName(name: string) {
    const user = await this.prisma.user.findFirst({
      where: { name },
      include: {
        cars: true,
      },
    });
    return user;
  }

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await this.hashingService.hash(
      createUserDto.password,
    );

    const user = await this.prisma.user.create({
      data: {
        name: createUserDto.name,
        profile: createUserDto.profile,
        password: hashedPassword,
        userCreatorId: createUserDto.userCreatorId,
        creationDate: createUserDto.creationDate,
        updateDate: createUserDto.creationDate,
        version: 1
      },
      select: {
        id: true,
        name: true,
        profile: true,
        creationDate: true,
      },
    });
    return user;
  }

  findAll({ limit, offset, ...dto }: FindAllUsersDto) {
    return this.prisma.user.findMany({
      where: {
        ...dto,
        //filtra por todos os atributos, exceto limit e offset que ja foram retirados
        //e pelo nome, que esta sendo filtrado abaixo
        name: {
          contains: dto.name,
        },
      },
      take: limit,
      skip: offset,
      select: {
        id: true,
        name: true,
        profile: true,
        cars: true,
        creationDate: true,
        updateDate: true,
        userCreator: {
          select:
          {
            id: true,
            name: true
          }
        },
      },
    });
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findFirst({
      where: { id },
      select: {
        id: true,
        name: true,
        profile: true,
        cars: true,
        creationDate: true,
        updateDate: true,
        userCreator: {
          select:
          {
            id: true,
            name: true
          }
        },
        version: true,
      },
    });

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.prisma.user.findFirst({
      where: { id },
      include: { cars: true },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    let hashedPassword = user.password;

    // Caso haja uma senha válida no DTO, atualize a senha
    if (updateUserDto.password && updateUserDto.password !== '') {
      hashedPassword = await this.hashingService.hash(updateUserDto.password);
    }

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: {
        name: updateUserDto.name,
        profile: updateUserDto.profile,
        password: hashedPassword,
        version: user.version + 1,
        updateDate: new Date(),
      },
      select: {
        id: true,
        name: true,
        cars: true,
        profile: true,
        version: true,
        updateDate: true,
      },
    });

    return updatedUser;
  }

  remove(id: number) {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
