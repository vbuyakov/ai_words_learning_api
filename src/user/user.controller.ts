import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ActivateUserDto } from './dto/activate-user.dto';
import { User } from './entities/user.entity';

@ApiTags('User') // Groups these endpoints under "User" in Swagger
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' }) // Description of the endpoint
  @ApiResponse({
    status: 201,
    description: 'User successfully created',
    type: User,
  })
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Post('activate')
  @ApiOperation({
    summary: 'Activate a user by username and confirmation code',
  })
  @ApiResponse({
    status: 200,
    description: 'User successfully activated',
    type: User,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid confirmation code or user already active',
  })
  activateUser(@Body() activateUserDto: ActivateUserDto): Promise<User> {
    const { username, confirmationCode } = activateUserDto;
    return this.userService.activateUser(username, confirmationCode);
  }
}
