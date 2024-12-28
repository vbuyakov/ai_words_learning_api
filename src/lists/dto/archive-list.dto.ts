import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class ArchiveListDto {
  @ApiProperty({
    example: true,
    description: 'Whether the list should be archived',
  })
  @IsBoolean()
  isArchived: boolean;
}
