import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtGuard } from './guards/jwt.guard';
import { JwtStrategy } from './guards/jwt.strategy';
import { UserModule } from 'src/user/user.module';
import { RolesGuard } from './guards/roles.guard';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: 60 * 60 },
      }),
    }),
    UserModule,
  ],

  controllers: [AuthController],
  providers: [AuthService, JwtGuard, JwtStrategy, RolesGuard],
})
export class AuthModule {}
