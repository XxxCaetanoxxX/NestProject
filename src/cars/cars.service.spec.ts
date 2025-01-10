import { Test, TestingModule } from '@nestjs/testing';
import { CarsService } from './cars.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCarDto } from './dto/create-car.dto';
import { FindAllCarsDto } from './dto/find-all-cars.dto';


describe('CarsService', () => {
  let service: CarsService;
  let prisma: PrismaService;
  let car: CreateCarDto;
  let insertedCar: any;
  const findAllCarsFto: FindAllCarsDto = {
    limit: 10,
    offset: 0
  }

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CarsService, PrismaService],
    }).compile();

    service = module.get<CarsService>(CarsService);
    prisma = module.get<PrismaService>(PrismaService);

    car = {
      name: 'test car',
      userId: '6758bd5df24a525157856fe5',
    };

    insertedCar = await service.create(car);
  });

  it('should return a car list', async () => {
    const result = await service.findAll(findAllCarsFto);
    expect(result).toBeDefined();
  });

  it('should return more than two cars', async () => {
    const result = await service.findAll(findAllCarsFto);
    expect(result.length).toBeGreaterThan(6);
  });

  it('should have a "dodge" as first car', async () => {
    const result = await service.findAll(findAllCarsFto);
    expect(result[0].name).toBe('dodge');
  });

  it('must check whether the car has been inserted', async () => {

    const result = await prisma.car.findUnique({
      where: { id: insertedCar.id },
    });
    expect(result).toBeDefined();
    expect(result?.name).toBe(car.name);
    expect(result?.userId).toBe(car.userId);
  })

  afterAll(async () => {

    await service.remove(insertedCar.id);

  });

});
