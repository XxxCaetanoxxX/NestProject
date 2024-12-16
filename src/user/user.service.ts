import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {prisma} from '../prisma/prisma.class'

@Injectable()
export class UserService {
  async create(createUserDto: CreateUserDto) {
    const user = await prisma.user.create({
      data: {
        name: createUserDto.name,
        perfil : createUserDto.perfil,
        senha: createUserDto.senha     
      }
    })
    return user;
  }

  async findAll() {
    const users = await prisma.user.findMany({
      include : {
        carros: true,
      }
    });
    return users;
  }

  async findOne(id: string) {
    const user = await prisma.user.findFirst({
      where : {
        id : id
      },
      include:{
        carros: true,
      }
    })
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await prisma.user.update({
      where: {
        id: id
      },
      data: {
        name: updateUserDto.name,
        perfil: updateUserDto.perfil,
        senha: updateUserDto.senha
      }
    })
    return `This action updates a #${user.name} user`;
  }

  async remove(id: string) {
    const user = await prisma.user.findFirst({
      where : {
        id:id
      }
    })

    await prisma.user.delete({
      where : {
        id: id
      }
    })

    return `Usuário ${user.name} foi excluido`;
  }
}
