import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  NotImplementedException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackInfoDto } from './dto/track.info.dto';
import { TrackCreateDto } from './dto/track.create.dto';
import { TrackUpdateDto } from './dto/track.update.dto';

@ApiBearerAuth()
@ApiTags('track')
@Controller('track')
export class TrackController {
  private readonly trackService: TrackService;
  constructor(trackService: TrackService) {
    this.trackService = trackService;
  }

  @ApiOperation({
    summary: 'Получить всю информацию о треке по id',
  })
  @ApiResponse({
    status: 200,
    description: 'Трек найден',
  })
  @ApiResponse({
    status: 404,
    description: 'Трек не найден',
  })
  @Get(':id')
  async getTrack(@Param('id') id: number): Promise<TrackInfoDto> {
    throw new NotImplementedException();
  }

  @ApiOperation({
    summary: 'Получить список треков по имени',
  })
  @ApiResponse({
    status: 200,
    description: 'Треки найдены',
  })
  @Get(':name')
  async getTracks(@Param('name') name: string): Promise<TrackInfoDto[]> {
    throw new NotImplementedException();
  }

  @ApiOperation({
    summary: 'Добавить трек',
  })
  @ApiResponse({
    status: 200,
    description: 'Трек создан',
  })
  @Post('')
  @ApiConsumes('multipart/form-data')
  async createTrack(@Body() track: TrackCreateDto): Promise<TrackInfoDto> {
    throw new NotImplementedException();
  }

  @ApiOperation({
    summary: 'Обновить трек',
  })
  @ApiResponse({
    status: 200,
    description: 'Трек обновлен',
  })
  @ApiResponse({
    status: 404,
    description: 'Трек не найден',
  })
  @Put(':id')
  async updateTrack(
    @Param('id') id: number,
    @Body() track?: TrackUpdateDto,
  ): Promise<number> {
    throw new NotImplementedException();
  }

  @ApiOperation({
    summary: 'Удалить трек',
  })
  @ApiResponse({
    status: 200,
    description: 'Трек удален',
  })
  @ApiResponse({
    status: 404,
    description: 'Трек не найден',
  })
  @Delete(':id')
  async deleteTrack(@Param('id') id: number): Promise<number> {
    throw new NotImplementedException();
  }
}
