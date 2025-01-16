import { Injectable } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { PrismaService } from '../prisma/prisma.service';
import { FindAllCarsDto } from './dto/find-all-cars.dto';
import { UpdateManyCarsDto } from './dto/update-many-cars.dto';

@Injectable()
export class CarsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createCarDto: CreateCarDto) {
    return this.prisma.car.create({
      data: createCarDto,
    });
  }

  async findAll({ limit, offset, isStocked, ...dto }: FindAllCarsDto) {
    const cars = await this.prisma.car.findMany({
      where: {
        id: { in: dto.ids },
        isStocked,
      },

      take: limit,
      skip: offset,
    });
    return cars;
  }

  async findOne(id: number) {
    const car = await this.prisma.car.findFirst({
      where: { id },
    });
    return car;
  }

  async update(id: number, updateCarDto: UpdateCarDto) {
    const car = await this.prisma.car.update({
      where: { id },
      data: updateCarDto,
    });
    return car;
  }

  updateMany({ ...updateManyCarDto }: UpdateManyCarsDto) {
    return this.prisma.car.updateMany({
      where: {
        id: {
          in: updateManyCarDto.ids,
        },
      },
      data: {
        isStocked: updateManyCarDto.isStocked,
      },
    });
  }

  remove(id: number) {
    return this.prisma.car.delete({
      where: { id },
    });
  }
}
