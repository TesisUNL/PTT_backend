import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TouristAttractionService } from './tourist-attraction.service';
import { CreateTouristAttractionDto } from './dto/create-tourist-attraction.dto';
import { UpdateTouristAttractionDto } from './dto/update-tourist-attraction.dto';

@Controller('tourist-attraction')
export class TouristAttractionController {
  constructor(
    private readonly touristAttractionService: TouristAttractionService,
  ) {}

  @Post()
  create(@Body() createTouristAttractionDto: CreateTouristAttractionDto) {
    return this.touristAttractionService.create(createTouristAttractionDto);
  }

  @Get()
  findAll() {
    return this.touristAttractionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.touristAttractionService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTouristAttractionDto: UpdateTouristAttractionDto,
  ) {
    return this.touristAttractionService.update(
      +id,
      updateTouristAttractionDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.touristAttractionService.remove(+id);
  }
}
