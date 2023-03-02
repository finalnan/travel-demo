import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dtos/create-user.dto';
import { UserDetails } from 'src/user/user-details';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(
    @Body() createUserDto: CreateUserDto,
  ): Promise<{ token: string; user: UserDetails } | null> {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(
    @Body('email') email: string,
    @Body('password') password: string,
  ): Promise<{ token: string; user: UserDetails } | null> {
    return this.authService.login(email, password);
  }
}
