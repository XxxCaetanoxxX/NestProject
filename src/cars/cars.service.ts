import { Injectable } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { PrismaService } from '../prisma/prisma.service';
import { FindAllCarsDto } from './dto/find-all-cars.dto';
import { UpdateManyCarsDto } from './dto/update-many-cars.dto';

@Injectable()
export class CarsService {
  constructor(private readonly prisma: PrismaService) { }

  create(createCarDto: CreateCarDto, id: number) {
    return this.prisma.car.create({
      data: {
        ...createCarDto,
        createdById: id,
      }
    });
  }

  async findAll({ limit, offset, isStocked, ...dto }: FindAllCarsDto) {
    const cars = await this.prisma.car.findMany({
      where: {
        id: { in: dto.ids },
        isStocked,
      },
      select: {
        id: true,
        name: true,
        isStocked: true,
        user: {
          select: {
            id: true,
            name: true
          }
        },
        createdBy: {
          select: {
            id: true,
            name: true
          }
        },
        creationDate: true,
        updateDate: true,
        version: true,
      },
      take: limit,
      skip: offset,
    });
    return cars;
  }

  async findOne(id: number) {
    const car = await this.prisma.car.findFirst({
      where: { id },
      select: {
        id: true,
        name: true,
        isStocked: true,
        user: {
          select: {
            id: true,
            name: true
          }
        },
        createdBy: {
          select: {
            id: true,
            name: true
          }
        },
        creationDate: true,
        updateDate: true,
        version: true
      }
    });
    return car;
  }

  async update(id: number, updateCarDto: UpdateCarDto) {
    const car = await this.prisma.car.update({
      where: { id },
      data: {
        ...updateCarDto,
        version: { increment: 1 },
        updateDate: new Date(),
      },
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
