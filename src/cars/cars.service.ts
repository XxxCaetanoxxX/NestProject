import { Injectable } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { PrismaService } from '../prisma/prisma.service';
import { FindAllCarsDto } from './dto/find-all-cars.dto';

@Injectable()
export class CarsService {
  constructor(private readonly prisma: PrismaService) { }


  async create(createCarDto: CreateCarDto) {
    const car = await this.prisma.car.create({
      data: {
        name: createCarDto.name,
        userId: createCarDto.userId
      }
    })
    return car;
  }

  async findAll(findAllCarsDto?: FindAllCarsDto) {
    const cars = await this.prisma.car.findMany({
      take: findAllCarsDto?.limit,
      skip: findAllCarsDto?.offset
    })
    return cars;
  }

  async findOne(id: string) {
    const car = await this.prisma.car.findFirst({
      where: { id }
    })
    return car;
  }

  async update(id: string, updateCarDto: UpdateCarDto) {
    const car = await this.prisma.car.update({
      where: { id },
      data: updateCarDto
    })
    return car
  }

  async remove(id: string) {
    await this.prisma.car.delete({
      where: { id }
    })
    return {
      message: 'Car deleted successfully',
    };
  }
}
