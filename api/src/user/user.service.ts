import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserDetails } from './user-details';
import { UserDocumnet } from './user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<UserDocumnet>) {}

  _getUserDetails(user: UserDocumnet): UserDetails {
    return {
      id: user._id.toString(),
      email: user.email,
      username: user.username,
      role: user.role,
    };
  }

  async create(createUserDto: CreateUserDto): Promise<UserDocumnet> {
    const newUser = new this.userModel(createUserDto);
    return newUser.save();
  }

  async find(): Promise<UserDetails[] | null> {
    return this.userModel.find();
  }

  async findByEmail(email: string): Promise<UserDocumnet> {
    return this.userModel.findOne({ email });
  }

  async findById(id: string): Promise<UserDetails> {
    return this.userModel.findById(id);
  }
}
