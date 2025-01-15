import { Injectable } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { PrismaService } from '../prisma/prisma.service';
import { FindAllCarsDto } from './dto/find-all-cars.dto';

@Injectable()
export class CarsService {
  constructor(private readonly prisma: PrismaService) { }


  create(createCarDto: CreateCarDto) {
    return this.prisma.car.create({
      data: createCarDto
    });
  }

  async findAll(findAllCarsDto?: FindAllCarsDto) {
    const cars = await this.prisma.car.findMany({
      take: findAllCarsDto?.limit,
      skip: findAllCarsDto?.offset
    })
    return cars;
  }

  async findOne(id: number) {
    const car = await this.prisma.car.findFirst({
      where: { id }
    })
    return car;
  }

  async update(id: number, updateCarDto: UpdateCarDto) {
    const car = await this.prisma.car.update({
      where: { id },
      data: updateCarDto
    })
    return car
  }

  remove(id: number) {
    return this.prisma.car.delete({
      where: { id }
    })
  }
}
