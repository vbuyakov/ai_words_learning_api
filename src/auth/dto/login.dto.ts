import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'exampleUser', description: 'Username of the user' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    example: 'securePassword123',
    description: 'Password of the user',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
