import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { HashingService } from 'src/hashing/hashing.service';
import { UserService } from 'src/user/user.service';
import { PrismaService } from 'src/prisma/prisma.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, HashingService, UserService, PrismaService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('singIn', async () => {
    const res = await service.signIn('mango', 'dpmg123');
    expect(res).toHaveProperty('token');
  });
});
