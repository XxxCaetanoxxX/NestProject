import { Test, TestingModule } from '@nestjs/testing';
import { CarrosService } from './carros.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCarroDto } from './dto/create-carro.dto';
import { FindAlLCarsDto } from './dto/find-all-cars.dto';


describe('CarrosService', () => {
  let service: CarrosService;
  let prisma: PrismaService;
  let carro: CreateCarroDto;
  let insertedCar: any;
  const findAllCarsFto: FindAlLCarsDto = {
    limit: 10,
    offset: 0
  }

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CarrosService, PrismaService],
    }).compile();

    service = module.get<CarrosService>(CarrosService);
    prisma = module.get<PrismaService>(PrismaService);

    carro = {
      nome: 'Carro teste',
      userId: '6758bd5df24a525157856fe5',
    };

    insertedCar = await service.create(carro);
  });

  it('deve retronar uma lista de carros', async () => {
    const result = await service.findAll(findAllCarsFto);
    expect(result).toBeDefined();
  });

  it('deve retornar mais de 2 carros', async () => {
    const result = await service.findAll(findAllCarsFto);
    expect(result.length).toBeGreaterThan(6);
  });

  it('deve ter um "dodge" como primeiro carro', async () => {
    const result = await service.findAll(findAllCarsFto);
    expect(result[0].nome).toBe('dodge');
  });

  it('deve verificar se o carro foi inserido', async () => {

    const result = await prisma.carro.findUnique({
      where: { id: insertedCar.id },
    });
    expect(result).toBeDefined();
    expect(result?.nome).toBe(carro.nome);
    expect(result?.userId).toBe(carro.userId);
  })

  afterAll(async () => {

    await service.remove(insertedCar.id);

  });

});
