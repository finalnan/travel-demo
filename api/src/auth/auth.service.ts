import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/user/dtos/create-user.dto';
import { UserDetails } from 'src/user/user-details';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 12);
  }

  async isMatch(password: string, hashPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashPassword);
  }

  async validateUser(email: string, password: string): Promise<UserDetails> {
    const user = await this.userService.findByEmail(email);

    if (!!!user) return null;

    const isMatch = await this.isMatch(password, user.password);

    if (!isMatch) return null;

    return this.userService._getUserDetails(user);
  }

  async register(
    createUserDto: CreateUserDto,
  ): Promise<{ token: string; user: UserDetails } | null> {
    const existingUser = await this.userService.findByEmail(
      createUserDto.email,
    );

    if (!!existingUser) throw new BadRequestException('Email has been used');

    const hashedPassword = await this.hashPassword(createUserDto.password);

    const newUser = await this.userService.create({
      ...createUserDto,
      password: hashedPassword,
    });

    const user = this.userService._getUserDetails(newUser);

    const jwt = await this.jwtService.signAsync({ user });
    return { token: jwt, user };
  }

  async login(
    email: string,
    password: string,
  ): Promise<{ token: string; user: UserDetails } | null> {
    const user = await this.validateUser(email, password);

    if (!user) throw new UnauthorizedException('Invalid Credentials!');

    const jwt = await this.jwtService.signAsync({ user });

    return { token: jwt, user };
  }

  async verifyJwt(jwt: string): Promise<{ exp: number }> {
    try {
      const { exp } = await this.jwtService.verifyAsync(jwt);
      return { exp };
    } catch (error) {
      throw new BadRequestException('Invalid Jwt');
    }
  }
}
