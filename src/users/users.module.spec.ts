import { Test, TestingModule } from '@nestjs/testing';
import { UsersModule } from './users.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Users } from './entities/user.entity';

describe('UsersModule', () => {
  let usersModule: UsersModule;
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UsersModule],
    })
      .overrideProvider(getRepositoryToken(Users))
      .useValue({})
      .compile();

    usersModule = module.get<UsersModule>(UsersModule);
    usersController = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(Users).toBeDefined();
    expect(usersModule).toBeDefined();
    expect(usersController).toBeDefined();
    expect(usersService).toBeDefined();
  });
});
