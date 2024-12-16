import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { prisma } from '../prisma/prisma.class'
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';



@Injectable()
export class UserService {
  async findByName(name: string) {
    const user = await prisma.user.findFirst({
      where: {name},
      include: {
        carros: true,
      }
    })
    return user;
  }

  async create(createUserDto: CreateUserDto) {
    const user = await prisma.user.create({
      data: {
        name: createUserDto.name,
        perfil: createUserDto.perfil,
        senha: createUserDto.senha
      }
    })
    return user;
  }

  async findAll() {
    const users = await prisma.user.findMany({
      include: {
        carros: true,
      }
    });
    return users;
  }

  async findOne(id: string) {
    const user = await prisma.user.findFirst({
      where: { id },
      include: {
        carros: true,
      }
    })
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await prisma.user.update({
      where: { id },
      data: updateUserDto

    })
    return `This action updates a #${user.name} user`;
  }

  async remove(id: string) {
    const user = await prisma.user.findFirst({
      where: { id }
    })

    await prisma.user.delete({
      where: { id }
    })

    return `Usuário ${user.name} foi excluido`;
  }
}
