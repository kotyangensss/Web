import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  Body,
  Controller,
  Get,
  NotImplementedException,
  Param,
  Post,
} from '@nestjs/common';
import { HistoryInfoDto } from './dto/history.info.dto';
import { HistoryCreateDto } from './dto/history.create.dto';

@ApiBearerAuth()
@ApiTags('history')
@Controller('history')
export class HistoryController {
  @ApiOperation({
    summary: 'Получить историю пользователя',
  })
  @ApiResponse({
    status: 200,
    description: 'История найдена',
  })
  @Get('user/:id')
  async getUsersHistory(
    @Param('id') id: number,
    @Param('offset') offset: number,
    @Param('limit') limit: number,
    @Param('since') since: Date,
  ): Promise<HistoryInfoDto[]> {
    throw new NotImplementedException();
  }

  @ApiOperation({
    summary: 'Получить историю трека',
  })
  @ApiResponse({
    status: 200,
    description: 'История найдена',
  })
  @Get('track/:id')
  async getTracksHistory(
    @Param('id') id: number,
    @Param('offset') offset: number,
    @Param('limit') limit: number,
    @Param('since') since: Date,
  ): Promise<HistoryInfoDto[]> {
    throw new NotImplementedException();
  }

  @ApiOperation({
    summary: 'Получить историю плейлиста',
  })
  @ApiResponse({
    status: 200,
    description: 'История найдена',
  })
  @Get('playlist/:id')
  async getPlaylistHistory(
    @Param('id') id: number,
    @Param('offset') offset: number,
    @Param('limit') limit: number,
    @Param('since') since: Date,
  ): Promise<HistoryInfoDto[]> {
    throw new NotImplementedException();
  }

  @ApiOperation({
    summary: 'Добавить историю прослушивания',
  })
  @ApiResponse({
    status: 200,
    description: 'История добавлена',
  })
  @Post('')
  async createHistory(
    @Body() history: HistoryCreateDto,
  ): Promise<HistoryInfoDto[]> {
    throw new NotImplementedException();
  }

  @ApiOperation({
    summary: 'Удалить историю прослушивания трека',
  })
  @ApiResponse({
    status: 200,
    description: 'История удалена',
  })
  @Post(':trackId')
  async deleteHistory(
    @Param('trackId') trackId: number,
  ): Promise<HistoryInfoDto[]> {
    throw new NotImplementedException();
  }
}
