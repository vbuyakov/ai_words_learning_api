import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';

export class AddWordsDto {
  @ApiProperty({
    example: [1, 2, 3],
    description: 'Array of word IDs to add to the list',
  })
  @IsArray()
  @IsNumber({}, { each: true })
  @IsNotEmpty()
  wordIds: number[];
}
