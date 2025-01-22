import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Test, TestingModule } from '@nestjs/testing';
import { HashingService } from 'src/hashing/hashing.service';
import { Profile } from '@prisma/client';
import { randomInt } from 'crypto';
import { UpdateUserDto } from './dto/update-user.dto';

describe('UserService', () => {
  let service: UserService;
  let id: number;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, HashingService, PrismaService],
    }).compile();

    service = module.get<UserService>(UserService);

    const user: CreateUserDto = {
      name: 'teste user2',
      password: 'dpmg123',
      profile: Profile.DEFAULT,
    };

    const res = await service.create(user, 1);
    id = res.id;
    delete user.password;
    expect(res).toMatchObject(user);
  });

  afterAll(async () => {
    await service.remove(id);
  });

  it('find all', async () => {
    const res = await service.findAll({});
    expect(Object.keys(res[0])).toEqual(['id', 'name', 'profile', 'cars']);

    expect(res).not.toBeNull();
  });

  it('findOne', async () => {
    const res = await service.findOne(4);

    const properties = ['id', 'name', 'profile', 'cars'];

    for (const property of properties) {
      expect(res).toHaveProperty(property);
    }

    expect(res).not.toHaveProperty('password');
  });

  it('find by name - quando busco por lucas retorna erro', async () => {
    const res = await service.findAll({
      name: 'Lucas',
    });

    expect(res.length).not.toBeGreaterThan(1);
  });

  it.only('update', async () => {
    const user = await service.findOne(3);

    console.log(user.name)

    const res = await service.update(3, {
      name: 'jessica',
    },
    )
    console.log(res.name)

    expect(res.name).not.toEqual(user.name);
    expect(res.version).not.toEqual(user.version);
  });
});

//tests with mocks
// describe('UserService', () => {

//   let userService: UserService;
//   let prismaService: PrismaService;
//   let hashingService: HashingService;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [
//         UserService,
//         {
//           provide: PrismaService,
//           useValue: {
//             user: {
//               create: jest.fn().mockResolvedValue({
//                 name: 'Paula',
//                 password: 'dpmg123',
//                 profile: 'ADMIN'
//               }),
//               findFirst: jest.fn(),
//               update: jest.fn(),
//               delete: jest.fn()
//             }
//           }
//         },
//         {
//           provide: HashingService,
//           useValue: {
//             hash: jest.fn()
//           }
//         }
//       ]
//     }).compile()
//     userService = module.get<UserService>(UserService)
//     prismaService = module.get<PrismaService>(PrismaService);
//     hashingService = module.get<HashingService>(HashingService)
//   })

//   it('Deve ter instanciado a service', () => {
//     expect(userService).toBeDefined();
//   })

//   describe('Testes de criação de usuário', () => {
//     it('deve criar um usuario', async () => {

//       const createUserDto: CreateUserDto = {
//         name: 'Paula',
//         password: 'dpmg123',
//         profile: 'ADMIN'
//       }

//       jest.spyOn(hashingService, 'hash').mockResolvedValue("hash_mock")

//       const result = await userService.create(createUserDto)
//       console.log(result)

//       expect(hashingService.hash).toHaveBeenCalled()

//       expect(prismaService.user.create).toHaveBeenCalledWith({
//         data: {
//           name: createUserDto.name,
//           profile: createUserDto.profile,
//           password: 'hash_mock'
//         }
//       })

//     })

//     it('deve lançar um erro quando criar um usuario', async () => {
//       const createUserDto: CreateUserDto = {
//         name: 'Paula',
//         password: 'dpmg123',
//         profile: 'ADMIN'
//       }

//       jest.spyOn(hashingService, 'hash').mockResolvedValue("hash_mock")
//       jest.spyOn(prismaService.user, 'create').mockRejectedValue(new Error("Usuário inválido!"))

//       await expect(userService.create(createUserDto)).rejects.toThrow(
//         new HttpException('Usuário inválido!', HttpStatus.BAD_REQUEST)
//       )
//       expect(prismaService.user.create).toHaveBeenCalledWith({
//         data: {
//           name: createUserDto.name,
//           profile: createUserDto.profile,
//           password: "hash_mock"
//         }
//       })
//     })
//   })

//   describe('Testes de achar um usuário', () => {

//     it('deve lançar um erro quando o usuario nao é encontrado', async () => {
//       jest.spyOn(prismaService.user, 'findFirst').mockResolvedValue(null)

//       await expect(userService.remove("676d7947c693027d8298c5ab")).rejects.toThrow(
//         new Error('Cannot read properties of null (reading \'name\')')
//       )

//       expect(prismaService.user.findFirst).toHaveBeenCalledWith({
//         where: {
//           id: "676d7947c693027d8298c5ab"
//         },
//       })
//     })

//     it('deve retornar um usuario', async () => {

//       const mockUser = {
//         name: "carlos",
//         id: "676d7947c693027d8298c5ab",
//         profile: Profile.DEFAULT,
//         password: "$2b$10$jlFekbhJdI5oMdiTWWzzbu6d.y9jH03mZuOaRAxGr19jmOo13IkI6"
//       }

//       jest.spyOn(prismaService.user, 'findFirst').mockResolvedValue(mockUser)
//       const result = await userService.findOne("676d7947c693027d8298c5ab")
//       console.log(result)

//       expect(prismaService.user.findFirst).toHaveBeenCalledWith({
//         where: { id: mockUser.id },
//         include: {
//           cars: true,
//         }
//       })

//       expect(result).toEqual(mockUser);
//     })
//   })

//   describe('testes de atualizar usuário', () => {
//     it('deve atualizar um usuário', async () => {
//       const updateUserDto: UpdateUserDto = { name: 'Paula' };
//       const mockUser = {
//         name: "Paulo",
//         id: "676d7947c693027d8298c5ab",
//         profile: Profile.DEFAULT,
//         password: "$2b$10$jlFekbhJdI5oMdiTWWzzbu6d.y9jH03mZuOaRAxGr19jmOo13IkI6"
//       }

//       const updatedUser = {
//         name: "Paula",
//         id: "676d7947c693027d8298c5ab",
//         profile: Profile.DEFAULT,
//         password: "$2b$10$jlFekbhJdI5oMdiTWWzzbu6d.y9jH03mZuOaRAxGr19jmOo13IkI6"
//       }

//       jest.spyOn(prismaService.user, 'findFirst').mockResolvedValue(mockUser)
//       jest.spyOn(prismaService.user, 'update').mockResolvedValue(updatedUser)

//       const result = await userService.update(mockUser.id, updateUserDto)
//       console.log(result)

//       expect(result).toEqual(updatedUser)

//     })

//     it('deve lançar um erro quando usuario nao for encontrado', async () => {
//       const updateUserDto: UpdateUserDto = { name: 'Gilson' };

//       jest.spyOn(prismaService.user, 'findFirst').mockResolvedValue(null)

//       await expect(userService.update("676d7947c693027d8", updateUserDto)).rejects.toThrow(
//         new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND)
//       )
//     })
//   })

//   describe('testes de deletar usuario', () => {

//     it('deve lançar um erro quando o usuario nao é encontrado', async () => {
//       jest.spyOn(prismaService.user, 'findFirst').mockResolvedValue(null)

//       await expect(userService.remove("676d7947c693027d8298c5ab")).rejects.toThrow(
//         new Error('Cannot read properties of null (reading \'name\')')
//       )
//     })

//     it('deve deletar um usuario', async () => {
//       const mockUser = {
//         name: "carlos",
//         id: "676d7947c693027d8298c5ab",
//         profile: Profile.DEFAULT,
//         password: "$2b$10$jlFekbhJdI5oMdiTWWzzbu6d.y9jH03mZuOaRAxGr19jmOo13IkI6"
//       }

//       jest.spyOn(prismaService.user, 'findFirst').mockResolvedValue(mockUser)
//       jest.spyOn(prismaService.user, 'delete').mockResolvedValue(mockUser)

//       const result = await userService.remove("676d7947c693027d8298c5ab")
//       console.log(result)

//       expect(prismaService.user.delete).toHaveBeenCalledWith({
//         where: { id: "676d7947c693027d8298c5ab" }
//       })

//       expect(result).toEqual(`Usuário ${mockUser.name} foi excluido`)

//     })
//   })
// });
