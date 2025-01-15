import { Test, TestingModule } from '@nestjs/testing';
import { CarsService } from './cars.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCarDto } from './dto/create-car.dto';
import { FindAllCarsDto } from './dto/find-all-cars.dto';



describe('UserService', () => {

  let carsService: CarsService;
  let createdTestCar;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CarsService,
        PrismaService
      ],
    }).compile();

    carsService = module.get<CarsService>(CarsService);
  });

  it('find all', async () => {
    const res = await carsService.findAll()

    expect(res).not.toBeNull()
  })

  it('find by id', async () => {
    const res = await carsService.findOne('6781811df83cc0877cfd9070')

    expect(res).toBeNull()
  })

  it('create car', async () => {
    const car: CreateCarDto = {
      name: "test car",
      userId: "6781482ea67dd130ec4ffad7"
    }

    createdTestCar = await carsService.create(car);

    expect(createdTestCar).not.toBeNull()
  })

  it('delete a car', async () => {
    const res = await carsService.remove(createdTestCar.id)

    expect(res.message).toBe('Car deleted successfully')
  })
})
