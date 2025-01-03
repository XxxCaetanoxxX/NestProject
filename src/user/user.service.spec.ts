import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

describe('UserService', () => {
  let service: UserService;
  let createdUserId: string;


  beforeAll(async () => {
    const createUserDto: CreateUserDto = {
      name: 'test user',
      perfil: 'ADMIN',
      senha: 'dpmg123'
    };

    const createdUser = await service.create(createUserDto);
    createdUserId = createdUser.id;
  });

  afterAll(async () => {
    if (createdUserId) {
      await service.remove(createdUserId)
    }
  })

  describe('getUsers', () => {
    it.only('deve retornar usuarios', async () => {

    })
  })

  //beforeEach(async () => {
  // const module: TestingModule = await Test.createTestingModule({
  //  providers: [UserService],
  //}).compile();

  // service = module.get<UserService>(UserService);
  //});

  //it('should be defined', () => {
  // expect(service).toBeDefined();
  //});
});
