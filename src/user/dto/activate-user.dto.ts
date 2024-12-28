import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ActivateUserDto {
  @ApiProperty({
    example: 'exampleUser',
    description: 'Username of the user to activate',
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    example: 'abc123xyz',
    description: 'Confirmation code sent to the user',
  })
  @IsString()
  @IsNotEmpty()
  confirmationCode: string;
}
