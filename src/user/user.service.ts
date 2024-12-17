import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User, Prisma } from '@prisma/client'
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';



@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) { }

  async findByName(name: string) {
    const user = await this.prisma.user.findFirst({
      where: { name },
      include: {
        carros: true,
      }
    })
    return user;
  }

  async create(createUserDto: CreateUserDto) {
    const user = await this.prisma.user.create({
      data: {
        name: createUserDto.name,
        perfil: createUserDto.perfil,
        senha: createUserDto.senha
      }
    })
    return user;
  }

  async findAll() {
    const users = await this.prisma.user.findMany({
      include: {
        carros: true,
      }
    });
    return users;
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findFirst({
      where: { id },
      include: {
        carros: true,
      }
    })
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.prisma.user.update({
      where: { id },
      data: updateUserDto

    })
    return `This action updates a #${user.name} user`;
  }

  async remove(id: string) {
    const user = await this.prisma.user.findFirst({
      where: { id }
    })

    await this.prisma.user.delete({
      where: { id }
    })

    return `Usuário ${user.name} foi excluido`;
  }
}
