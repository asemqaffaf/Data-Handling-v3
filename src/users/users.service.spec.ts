import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Users } from './entities/user.entity';
import { Repository } from 'typeorm';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

describe('UsersService', () => {
  let service: UsersService;
  let repository: Repository<Users>;

  beforeEach(async () => {
    const mockRepository = {
      create: jest.fn(),
      save: jest.fn(),
      find: jest.fn(),
      findOne: jest.fn(),
      delete: jest.fn(),
      update: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(Users),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<Users>>(getRepositoryToken(Users));
  });

  describe('create', () => {
    const userDto: CreateUserDto = {
      name: 'Selena',
      email: 'Selena.Pham@hays.co.jp',
      password: 'password',
    };

    it('should successfully create a user', async () => {
      (repository.create as jest.Mock).mockResolvedValue(userDto);
      (repository.save as jest.Mock).mockResolvedValue(userDto);

      expect(await service.create(userDto)).toEqual({
        email: userDto.email,
        name: userDto.name,
      });
    });

    it('should throw a conflict exception for duplicate users', async () => {
      (repository.create as jest.Mock).mockResolvedValue(userDto);
      (repository.save as jest.Mock).mockRejectedValue({ code: '23505' });

      await expect(service.create(userDto)).rejects.toThrow(ConflictException);
    });

    it('should throw an internal server error exception for unexpected errors', async () => {
      (repository.create as jest.Mock).mockResolvedValue(userDto);
      (repository.save as jest.Mock).mockRejectedValue({
        code: 'test error code not exist',
      });

      await expect(service.create(userDto)).rejects.toEqual({
        code: 'test error code not exist',
      });
    });
  });

  describe('findOne', () => {
    it('should return a user if found', async () => {
      const user = new Users();
      user.name = 'Selena';
      user.email = 'Selena.Pham@hays.co.jp';
      user.password = 'password';

      (repository.findOne as jest.Mock).mockResolvedValue(user);

      const result = await service.findOne(1);
      expect(result).toEqual(user);
    });

    it('should throw a NotFoundException if no user is found', async () => {
      (repository.findOne as jest.Mock).mockResolvedValue(undefined);

      await expect(service.findOne(0)).rejects.toThrow(NotFoundException);
    });
  });

  describe('findAll', () => {
    it('should return a user if found', async () => {
      const usersArray = [
        {
          name: 'Selena',
          email: 'Selena.Pham@hays.co.jp',
          password: 'password',
        },
        {
          name: 'Selena second',
          email: 'Selena.Pham2@hays.co.jp',
          password: 'password',
        },
      ];

      (repository.find as jest.Mock).mockResolvedValue(usersArray);

      expect(await service.findAll()).toEqual(usersArray);
    });

    it('should throw a NotFoundException if no user is found', async () => {
      (repository.findOne as jest.Mock).mockResolvedValue(undefined);

      await expect(service.findOne(0)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should successfully update a user', async () => {
      const updateUserDto = { name: 'new name' } as Users;
      const updatedUser = {
        name: 'Selena',
        email: 'Selena.Pham@hays.co.jp',
        password: 'password',
      };
      (repository.findOne as jest.Mock).mockResolvedValue(updatedUser);
      (repository.save as jest.Mock).mockResolvedValue(updatedUser);

      expect(await service.update(1, updateUserDto)).toBeUndefined();
    });

    it('should throw a NotFoundException if no user is found', async () => {
      (repository.findOne as jest.Mock).mockResolvedValue(undefined);

      await expect(service.update(1, {} as Users)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('delete', () => {
    it('should successfully remove a user', async () => {
      (repository.delete as jest.Mock).mockResolvedValue({ affected: 1 });

      expect(await service.remove(1)).toEqual(
        'User with ID 1 successfully deleted.',
      );
    });

    it('should throw a NotFoundException if no user is found', async () => {
      (repository.delete as jest.Mock).mockResolvedValue({ affected: 0 });

      await expect(service.remove(1)).rejects.toThrow(NotFoundException);
    });
  });
});
