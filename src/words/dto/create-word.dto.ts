import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsOptional, IsNumber } from 'class-validator';

export class CreateWordDto {
  @ApiProperty({
    description: 'Array of words or phrases to be added.',
    example: ['discrétion', 'liberté'],
    type: [String],
  })
  @IsArray()
  words: string[];

  @ApiPropertyOptional({
    description: 'Optional ID of the list to associate the words with.',
    example: 1,
    type: Number,
  })
  @IsOptional()
  @IsNumber()
  listId?: number;
}
