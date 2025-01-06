import { Injectable, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
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
      include: {
        carros: true,
      }
    })
    return user;
  }

  async create(createUserDto: CreateUserDto) {
    const senhaCriptografada = await this.hashingService.hash(createUserDto.senha)

    const user = await this.prisma.user.create({
      data: {
        name: createUserDto.name,
        perfil: createUserDto.perfil,
        senha: senhaCriptografada
      }
    })
    return user;
  }

  async findAll(findAllUsersDto? : FindAllUsersDto) {

    const {limit = 10, offset =0} = findAllUsersDto // caso não receba um dto, esse sera o valor padrao

    const users = await this.prisma.user.findMany({
      take: limit,
      skip: offset,
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
    const user = await this.prisma.user.findFirst({
      where: { id },
      include: {
        carros: true,
      }
    })

    const senhaCriptografada = await  this.hashingService.hash(updateUserDto.senha);

    await this.prisma.user.update({
      where: { id },
      data: {
        name: updateUserDto.name,
        perfil: updateUserDto.perfil,
        senha: senhaCriptografada
      }

    })
    return `This action updates a ${user.name} user`;
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
