import { Test, TestingModule } from '@nestjs/testing';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

describe('AuthModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [
        PassportModule,
        JwtModule.register({
          secret: 'secret_key',
          signOptions: { expiresIn: '60s' },
        }),
      ],
      providers: [JwtStrategy],
    }).compile();
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });

  it('should provide JwtService', () => {
    const jwtService = module.get<JwtService>(JwtService);
    expect(jwtService).toBeDefined();
  });

  it('should provide JwtStrategy', () => {
    const jwtStrategy = module.get<JwtStrategy>(JwtStrategy);
    expect(jwtStrategy).toBeDefined();
  });
});
