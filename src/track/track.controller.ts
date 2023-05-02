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
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
} from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackInfoDto } from './dto/track.info.dto';
import { TrackCreateDto } from './dto/track.create.dto';
import { TrackUpdateDto } from './dto/track.update.dto';
import { form } from '../main';

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
    status: 400,
    description: 'Плохой запрос',
  })
  @ApiResponse({
    status: 404,
    description: 'Трек не найден',
  })
  @Get(':id')
  async getTrack(@Param('id', ParseIntPipe) id: number): Promise<TrackInfoDto> {
    return await this.trackService.getTrack(id);
  }

  @ApiOperation({
    summary: 'Получить список треков по имени',
  })
  @ApiResponse({
    status: 200,
    description: 'Треки найдены',
  })
  @Get('/search/:name')
  async getTracks(
    @Param('name') name: string,
    @Query('limit') limit = 10,
    @Query('offset') offset = 0,
  ): Promise<TrackInfoDto[]> {
    return await this.trackService.getTracksByName(name, limit, offset);
  }

  @ApiOperation({
    summary: 'Добавить трек',
  })
  @ApiResponse({
    status: 200,
    description: 'Трек создан',
  })
  @ApiResponse({
    status: 400,
    description: 'Неправильный ввод',
  })
  @Post('/upload')
  @ApiConsumes('multipart/form-data')
  async createTrack(
    @Req() req,
    @Body() track: TrackCreateDto,
  ): Promise<TrackInfoDto> {
    const formFields = await new Promise(function (resolve) {
      form.parse(req, (err, fields, files) => {
        resolve([fields, files]);
      });
    });

    return this.trackService.createTrack(formFields[0], formFields[1]);
  }

  @ApiOperation({
    summary: 'Обновить трек',
  })
  @ApiResponse({
    status: 200,
    description: 'Трек обновлен',
  })
  @ApiResponse({
    status: 400,
    description: 'Плохой запрос',
  })
  @ApiResponse({
    status: 404,
    description: 'Трек не найден',
  })
  @Put('/update/:id')
  @ApiConsumes('multipart/form-data')
  async updateTrack(
    @Req() req,
    @Param('id', ParseIntPipe) id: number,
    @Body() track?: TrackUpdateDto,
  ): Promise<TrackInfoDto> {
    const formFields = await new Promise(function (resolve) {
      form.parse(req, (err, fields, files) => {
        resolve([fields, files]);
      });
    });

    return this.trackService.updateTrack(id, formFields[0], formFields[1]);
  }

  @ApiOperation({
    summary: 'Удалить трек',
  })
  @ApiResponse({
    status: 200,
    description: 'Трек удален',
  })
  @ApiResponse({
    status: 400,
    description: 'Плохой запрос',
  })
  @ApiResponse({
    status: 404,
    description: 'Трек не найден',
  })
  @Delete('/delete/:id')
  async deleteTrack(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<TrackInfoDto> {
    return this.trackService.deleteTrack(id);
  }
}
