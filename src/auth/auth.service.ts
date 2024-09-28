import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Model } from 'mongoose';
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

    return newUser;
  }

  async login(loginDto: CreateAuthDto): Promise<{ access_token: string }> {
    const { email, password } = loginDto;
    const user = await this.userModel.findOne({ email });

    if (!user)
      throw new BadRequestException('Wrong combination of email and password');

    const isMatch = await bcrypt.compare(password, user.email);

    if (!isMatch)
      throw new BadRequestException('Wrong combination of email and password');

    const payload = { id: user.id, email: user.email };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async findAll(): Promise<User[]> {
    const users = await this.userModel.find();

    if (!users) throw new NotFoundException(`No users found`);

    return users;
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userModel.findById(id);

    if (!user) throw new NotFoundException(`No users found with the id ${id}`);

    return user;
  }

  async update(id: number, updateAuthDto: UpdateAuthDto): Promise<User> {
    const user = await this.userModel.findById(id);

    if (!user) throw new NotFoundException(`No user found with the id n°${id}`);

    const updatedUser = await this.userModel.findByIdAndUpdate(
      id,
      updateAuthDto,
      { new: true },
    );

    return updatedUser;
  }

  async remove(id: number): Promise<User> {
    const user = await this.userModel.findById(id);

    if (!user) throw new NotFoundException(`No user found with the id n°${id}`);

    const deletedUser = await this.userModel.findByIdAndDelete(id);

    return deletedUser;
  }
}
