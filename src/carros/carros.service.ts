import { Injectable } from '@nestjs/common';
import { CreateCarroDto } from './dto/create-carro.dto';
import { UpdateCarroDto } from './dto/update-carro.dto';
import { prisma } from '../prisma/prisma.class'


@Injectable()
export class CarrosService {
  async create(createCarroDto: CreateCarroDto) {
    const carro = await prisma.carro.create({
      data: {
        nome: createCarroDto.nome,
        userId: createCarroDto.userId
      }
    })
    return carro;
  }

  async findAll() {
    const carros = await prisma.carro.findMany()
    return carros;
  }

  async findOne(id: string) {
    const carro = await prisma.carro.findFirst({
      where: {
          id: id
      },
  })
  return carro;
  }

  async update(id: string, updateCarroDto: UpdateCarroDto) {
    const car = await prisma.carro.update({
      where : {
        id : id
      },
      data: {
        nome: updateCarroDto.nome
      }
    })
    return `carro ${car.nome} atualizado`
  }

  async remove(id: string) {
    await prisma.carro.delete({
      where: {
        id: id
      }
    })
  }
}
