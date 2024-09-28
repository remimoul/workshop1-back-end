import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signup(signupDto: CreateAuthDto): Promise<User> {
    const { email, password } = signupDto;
    const user = await this.userModel.findOne({ email });

    if (user) throw new BadRequestException('Unable to create the user');

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new this.userModel({ email, password: hashedPassword });

    if (!newUser) throw new BadRequestException('Unable to create the user');

    return newUser.save();
  }

  async login(loginDto: CreateAuthDto): Promise<{ access_token: string }> {
    const { email, password } = loginDto;
    const user = await this.userModel.findOne({ email });

    if (!user)
      throw new BadRequestException('Wrong combination of email and password');

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      throw new BadRequestException('Wrong combination of email and password');

    const payload = { id: user._id.toString(), email: user.email };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async findAll(): Promise<User[]> {
    const users = await this.userModel.find();

    if (!users) throw new NotFoundException(`No users found`);

    return users;
  }

  async findOne(id: string): Promise<User> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid user ID');
    }

    const user = await this.userModel.findById(new Types.ObjectId(id));

    if (!user) throw new NotFoundException(`No users found with the id ${id}`);

    return user;
  }

  async update(id: string, updateAuthDto: UpdateAuthDto): Promise<User> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid user ID');
    }

    const user = await this.userModel.findById(new Types.ObjectId(id));

    if (!user) throw new NotFoundException(`No user found with the id n°${id}`);

    const updatedUser = await this.userModel.findByIdAndUpdate(
      new Types.ObjectId(id),
      updateAuthDto,
      { new: true },
    );

    return updatedUser;
  }

  async remove(id: string): Promise<User> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid user ID');
    }

    const user = await this.userModel.findById(new Types.ObjectId(id));

    if (!user) throw new NotFoundException(`No user found with the id n°${id}`);

    const deletedUser = await this.userModel.findByIdAndDelete(
      new Types.ObjectId(id),
    );

    return deletedUser;
  }
}
