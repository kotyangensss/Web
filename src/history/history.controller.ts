import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { HistoryCreateDto } from './dto/history.create.dto';
import { HistoryService } from './history.service';
import { history } from '@prisma/client';
import { form } from '../main';

@ApiBearerAuth()
@ApiTags('history')
@Controller('history')
export class HistoryController {
  private readonly historyService: HistoryService;
  constructor(historyService: HistoryService) {
    this.historyService = historyService;
  }
  @ApiOperation({
    summary: 'Получить историю пользователя',
  })
  @ApiResponse({
    status: 200,
    description: 'История найдена',
  })
  @ApiResponse({
    status: 404,
    description: 'История не найдена',
  })
  @Get('user/:id')
  async getUsersHistory(
    @Param('id') id: number,
    @Param('offset') offset = 0,
    @Param('limit') limit = 10,
    @Param('since') since?: Date,
  ): Promise<history[]> {
    return this.historyService.getHistoryByUser(id, limit, offset, since);
  }

  @ApiOperation({
    summary: 'Получить историю трека',
  })
  @ApiResponse({
    status: 200,
    description: 'История найдена',
  })
  @ApiResponse({
    status: 404,
    description: 'История не найдена',
  })
  @Get('track/:id')
  async getTracksHistory(
    @Param('id') id: number,
    @Param('offset') offset = 0,
    @Param('limit') limit = 10,
    @Param('since') since: Date,
  ): Promise<history[]> {
    return this.historyService.getHistoryByTrack(id, limit, offset, since);
  }

  @ApiOperation({
    summary: 'Получить историю плейлиста',
  })
  @ApiResponse({
    status: 200,
    description: 'История найдена',
  })
  @ApiResponse({
    status: 404,
    description: 'История не найдена',
  })
  @Get('playlist/:id')
  async getPlaylistHistory(
    @Param('id') id: number,
    @Param('offset') offset = 0,
    @Param('limit') limit = 10,
    @Param('since') since: Date,
  ): Promise<history[]> {
    return this.historyService.getHistoryByPlaylist(id, limit, offset, since);
  }

  @ApiOperation({
    summary: 'Добавить историю прослушивания',
  })
  @ApiResponse({
    status: 200,
    description: 'История добавлена',
  })
  @ApiResponse({
    status: 400,
    description: 'Плохой ввод',
  })
  @Post('')
  @ApiConsumes('multipart/form-data')
  async createHistory(
    @Req() req,
    @Body() history: HistoryCreateDto,
  ): Promise<history> {
    const formFields = await new Promise(function (resolve) {
      form.parse(req, (err, fields, files) => {
        resolve(fields);
      });
    });

    return this.historyService.createHistory(formFields);
  }
}
