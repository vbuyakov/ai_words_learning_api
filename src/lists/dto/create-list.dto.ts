import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateListDto {
  @ApiProperty({
    example: 'My French Words',
    description: 'The name of the list',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
