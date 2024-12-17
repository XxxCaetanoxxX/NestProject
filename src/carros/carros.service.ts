import { Injectable } from '@nestjs/common';
import { CreateCarroDto } from './dto/create-carro.dto';
import { UpdateCarroDto } from './dto/update-carro.dto';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class CarrosService {
  constructor(private readonly prisma: PrismaService) { }


  async create(createCarroDto: CreateCarroDto) {
    const carro = await this.prisma.carro.create({
      data: {
        nome: createCarroDto.nome,
        userId: createCarroDto.userId
      }
    })
    return carro;
  }

  async findAll() {
    const carros = await this.prisma.carro.findMany()
    return carros;
  }

  async findOne(id: string) {
    const carro = await this.prisma.carro.findFirst({
      where: { id }
    })
    return carro;
  }

  async update(id: string, updateCarroDto: UpdateCarroDto) {
    const car = await this.prisma.carro.update({
      where: { id },
      data: updateCarroDto
    })
    return `carro ${car.nome} atualizado`
  }

  async remove(id: string) {
    await this.prisma.carro.delete({
      where: { id }
    })
  }
}
