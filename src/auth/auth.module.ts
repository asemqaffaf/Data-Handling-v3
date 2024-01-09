import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'secret_key',
      signOptions: { expiresIn: '365d' },
    }),
  ],
  providers: [JwtStrategy],
})
export class AuthModule {}
