import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { generateConfirmationCode } from '../shared/utils/confirmation-code.util';
import { UserStatus } from './enums/user-status.enum';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      // Hash the password
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

      const user = this.userRepository.create({
        ...createUserDto,
        password: hashedPassword, // Save the hashed password
        confirmationCode: generateConfirmationCode(),
      });

      const savedUser = await this.userRepository.save(user);

      // vTODO: Send confirmation code to the user's email
      console.log(
        `Confirmation code for ${user.username}: ${user.confirmationCode}`,
      );

      return savedUser;
    } catch (err) {
      // Check if the error is a duplicate key error
      if (err.code === '23505') {
        // Postgres error code 23505: unique_violation
        throw new BadRequestException('Username already exists.');
      }
      throw err; // Re-throw other errors
    }
  }

  async activateUser(
    username: string,
    confirmationCode: string,
  ): Promise<User> {
    const user = await this.userRepository.findOne({ where: { username } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.status !== UserStatus.NON_CONFIRMED) {
      throw new BadRequestException('User is already active or blocked');
    }

    if (user.confirmationCode !== confirmationCode) {
      throw new BadRequestException('Invalid confirmation code');
    }

    user.status = UserStatus.ACTIVE;
    user.confirmedAt = new Date();
    user.confirmationCode = null; // Clear confirmation code after successful activation

    return this.userRepository.save(user);
  }

  async findByUsername(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { username } });
  }

  async findById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
