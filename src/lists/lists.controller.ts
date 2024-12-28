import { Controller, Get, Post, Patch, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ListsService } from './lists.service';
import { CreateListDto } from './dto/create-list.dto';
import { AddWordsDto } from './dto/add-words.dto';
import { ArchiveListDto } from './dto/archive-list.dto';
import { List } from './entities/list.entity';

@ApiTags('Lists')
@Controller('lists')
export class ListsController {
  constructor(private readonly listsService: ListsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all learning lists' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved all lists',
    type: [List],
  })
  async findAll(): Promise<List[]> {
    return this.listsService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Create a new list' })
  @ApiResponse({
    status: 201,
    description: 'Successfully created a new list',
    type: List,
  })
  async create(@Body() createListDto: CreateListDto): Promise<List> {
    return this.listsService.create(createListDto);
  }

  @Post(':id/add-words')
  @ApiOperation({ summary: 'Add words to a list' })
  @ApiResponse({
    status: 200,
    description: 'Successfully added words to the list',
    type: List,
  })
  async addWords(
    @Param('id') id: number,
    @Body() addWordsDto: AddWordsDto,
  ): Promise<List> {
    return this.listsService.addWords(id, addWordsDto);
  }

  @Patch(':id/archive')
  @ApiOperation({ summary: 'Archive or unarchive a list' })
  @ApiResponse({
    status: 200,
    description: 'Successfully archived/unarchived the list',
    type: List,
  })
  async archiveList(
    @Param('id') id: number,
    @Body() archiveListDto: ArchiveListDto,
  ): Promise<List> {
    return this.listsService.archiveList(id, archiveListDto);
  }
}
