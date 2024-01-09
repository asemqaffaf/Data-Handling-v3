import { JwtStrategy } from './jwt.strategy';
import { Test } from '@nestjs/testing';

describe('JwtStrategy', () => {
  let jwtStrategy: JwtStrategy;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [JwtStrategy],
    }).compile();

    jwtStrategy = module.get<JwtStrategy>(JwtStrategy);
  });

  it('should be defined', () => {
    expect(jwtStrategy).toBeDefined();
  });

  describe('validate', () => {
    it('should return user object on successful validation', async () => {
      const payload = { sub: 123, username: 'testuser' };
      expect(await jwtStrategy.validate(payload)).toEqual({
        userId: 123,
        username: 'testuser',
      });
    });
  });
});
