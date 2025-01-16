import { PrismaService } from 'src/prisma/prisma.service';
import { Test, TestingModule } from '@nestjs/testing';
import { randomInt } from 'crypto';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';

describe('CarService', () => {
  let service: CarsService;
  let id: number;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CarsService, PrismaService],
    }).compile();

    service = module.get<CarsService>(CarsService);

    const payload: CreateCarDto = {
      name: 'hb20',
      isStocked: false,
      userId: 1,
    };

    const res = await service.create(payload);
    id = res.id;
    expect(res).toMatchObject(payload);
  });

  afterAll(async () => {
    await service.remove(id);
  });

  it('find all', async () => {
    const res = await service.findAll({});
    expect(Object.keys(res[0])).toEqual(['id', 'name', 'userId', 'isStocked']);

    expect(res).not.toBeNull();
  });

  it('findOne', async () => {
    const res = await service.findOne(id);

    const properties = ['id', 'name'];

    for (const property of properties) {
      expect(res).toHaveProperty(property);
    }
  });

  it('update', async () => {
    const name = `h${randomInt(50)}`;

    const res = await service.update(id, {
      name,
    });

    expect(res).toMatchObject({
      name,
    });
  });

  it('update many', async () => {
    const ids = [id];

    const res = await service.updateMany({
      ids,
      isStocked: true,
    });

    expect(res).toMatchObject({
      count: 1,
    });

    const car = await service.findOne(id);
    expect(car.isStocked).toBe(true);
  });
});
