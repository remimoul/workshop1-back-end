import { RefreshTokenDto } from './dto/refresh-token.dto';
import { RefreshToken } from './schema/refresh-token.schema';
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
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(RefreshToken.name)
    private refreshTokenModel: Model<RefreshToken>,
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

  async login(loginDto: CreateAuthDto) {
    const { email, password } = loginDto;
    const user = await this.userModel.findOne({ email });

    if (!user)
      throw new BadRequestException('Wrong combination of email and password');

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      throw new BadRequestException('Wrong combination of email and password');

    const payload = { id: user._id.toString(), email: user.email };

    const refreshToken = uuidv4();

    await this.storeRefreshToken(refreshToken, user.id);

    return {
      access_token: await this.jwtService.signAsync(payload),
      RefreshToken,
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

  async storeRefreshToken(token: string, userId: string) {
    const date = new Date();
    const expiryDate = new Date(date.getDate() + 4);
    await this.refreshTokenModel.create({ token, userId, expiryDate });
  }

  async refreshTokens(refreshToken: string) {}
}
