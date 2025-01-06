import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Test, TestingModule } from "@nestjs/testing";
import { HashingService } from 'src/hashing/hashing.service';
import { Perfil } from '@prisma/client';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('UserService', () => {

  let userService: UserService;
  let prismaService: PrismaService;
  let hashingService: HashingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              create: jest.fn().mockResolvedValue({
                name: 'Paula',
                senha: 'dpmg123',
                perfil: 'ADMIN'
              }),
              findFirst: jest.fn(),
              update: jest.fn(),
              delete: jest.fn()
            }
          }
        },
        {
          provide: HashingService,
          useValue: {
            hash: jest.fn()
          }
        }
      ]
    }).compile()
    userService = module.get<UserService>(UserService)
    prismaService = module.get<PrismaService>(PrismaService);
    hashingService = module.get<HashingService>(HashingService)
  })

  it('Deve ter instanciado a service', () => {
    expect(userService).toBeDefined();
  })

  describe('Testes de criação de usuário', () => {
    it('deve criar um usuario', async () => {

      const createUserDto: CreateUserDto = {
        name: 'Paula',
        senha: 'dpmg123',
        perfil: 'ADMIN'
      }

      jest.spyOn(hashingService, 'hash').mockResolvedValue("hash_mock")

      const result = await userService.create(createUserDto)
      console.log(result)

      expect(hashingService.hash).toHaveBeenCalled()

      expect(prismaService.user.create).toHaveBeenCalledWith({
        data: {
          name: createUserDto.name,
          perfil: createUserDto.perfil,
          senha: 'hash_mock'
        }
      })

    })

    it('deve lançar um erro quando criar um usuario', async ()=>{
      const createUserDto: CreateUserDto = {
        name: 'Paula',
        senha: 'dpmg123',
        perfil: 'ADMIN'
      }

      jest.spyOn(hashingService, 'hash').mockResolvedValue("hash_mock")
      jest.spyOn(prismaService.user, 'create').mockRejectedValue(new Error ("Usuário inválido!"))

      await expect(userService.create(createUserDto)).rejects.toThrow(
        new HttpException('Usuário inválido!', HttpStatus.BAD_REQUEST)
      )
      expect(prismaService.user.create).toHaveBeenCalledWith({
        data: {
          name: createUserDto.name,
          perfil: createUserDto.perfil,
          senha: "hash_mock"
        }
      })
    })
  })

  describe('Testes de achar um usuário', () => {

    it('deve lançar um erro quando o usuario nao é encontrado', async () => {
      jest.spyOn(prismaService.user, 'findFirst').mockResolvedValue(null)

      await expect(userService.remove("676d7947c693027d8298c5ab")).rejects.toThrow(
        new Error('Cannot read properties of null (reading \'name\')')
      )

      expect(prismaService.user.findFirst).toHaveBeenCalledWith({
        where:{
          id: "676d7947c693027d8298c5ab"
        },
      })
    })

    it('deve retornar um usuario', async () => {

      const mockUser = {
        name: "carlos",
        id: "676d7947c693027d8298c5ab",
        perfil: Perfil.PADRAO,
        senha: "$2b$10$jlFekbhJdI5oMdiTWWzzbu6d.y9jH03mZuOaRAxGr19jmOo13IkI6"
      }

      jest.spyOn(prismaService.user, 'findFirst').mockResolvedValue(mockUser)
      const result = await userService.findOne("676d7947c693027d8298c5ab")
      console.log(result)


      expect(prismaService.user.findFirst).toHaveBeenCalledWith({
        where: { id: mockUser.id },
        include: {
          carros: true,
        }
      })

      expect(result).toEqual(mockUser);
    })
  })

  describe('testes de deletar usuario', () => {

    it('deve lançar um erro quando o usuario nao é encontrado', async () => {
      jest.spyOn(prismaService.user, 'findFirst').mockResolvedValue(null)

      await expect(userService.remove("676d7947c693027d8298c5ab")).rejects.toThrow(
        new Error('Cannot read properties of null (reading \'name\')')
      )
    })

    it('deve deletar um usuario', async () => {
      const mockUser = {
        name: "carlos",
        id: "676d7947c693027d8298c5ab",
        perfil: Perfil.PADRAO,
        senha: "$2b$10$jlFekbhJdI5oMdiTWWzzbu6d.y9jH03mZuOaRAxGr19jmOo13IkI6"
      }

      jest.spyOn(prismaService.user, 'findFirst').mockResolvedValue(mockUser)
      jest.spyOn(prismaService.user, 'delete').mockResolvedValue(mockUser)

      const result = await userService.remove("676d7947c693027d8298c5ab")
      console.log(result)


      expect(prismaService.user.delete).toHaveBeenCalledWith({
        where: { id: "676d7947c693027d8298c5ab" }
      })

      expect(result).toEqual(`Usuário ${mockUser.name} foi excluido`)

    })
  })
});
