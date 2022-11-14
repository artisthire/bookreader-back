import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateUserDto } from './dto/create-user.dto';
import { IReadableUser } from './interfaces/readable-user.interface';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async find(id: string): Promise<IReadableUser | null> {
    return await this.userModel.findById(id).lean();
  }

  async findByEmail(email: string): Promise<IReadableUser | null> {
    return await this.userModel.findOne({ email }).lean();
  }

  async update(id: string, data: Partial<IReadableUser>): Promise<boolean> {
    await this.userModel.findByIdAndUpdate(id, data).exec();
    return true;
  }

  async create(createUserDto: CreateUserDto): Promise<IReadableUser | null> {
    const { email } = createUserDto;

    if (await this.userModel.findOne({ email }).lean()) {
      return null;
    }

    const user = await this.userModel.create(createUserDto);
    return user;
  }
}
