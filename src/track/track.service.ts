import { TrackInfoDto } from './dto/track.info.dto';
import { TrackDao } from './dao/track.dao';
import { TrackTransformer } from './transformers/track.transformer';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { dropbox } from '../dropbox';
import getAudioDurationInSeconds from 'get-audio-duration';

@Injectable()
export class TrackService {
  private readonly trackDao: TrackDao;
  private readonly defaultCover =
    'https://dl.dropbox.com/s/zn4jhe31de3454j/xdd.png?dl=0';
  constructor(trackDao: TrackDao) {
    this.trackDao = trackDao;
  }

  async getTrack(id: number): Promise<TrackInfoDto> {
    const track = await this.trackDao.getTrack(id).then();
    if (track != null) {
      return TrackTransformer.trackToTrackInfoDto(track);
    } else {
      throw new NotFoundException('Трек не найден');
    }
  }

  async getTracksByName(
    name: string,
    limit: number,
    offset: number,
  ): Promise<TrackInfoDto[]> {
    const tracks = await this.trackDao
      .getTracksByName(name, limit, offset)
      .then();
    const ans = [];
    tracks.forEach((track) =>
      ans.push(TrackTransformer.trackToTrackInfoDto(track)),
    );
    return ans;
  }

  async createTrack(fields: any, files: any): Promise<TrackInfoDto> {
    if (fields.name == null || fields.id == null) {
      throw new BadRequestException('не указаны имя или id');
    }

    const source = await dropbox.newUpload(Folder.source, files.source).then();
    if (source == undefined) {
      throw new BadRequestException('нет источника');
    }

    let cover = await dropbox.newUpload(Folder.cover, files.cover).then();
    if (cover == undefined) {
      cover = this.defaultCover;
    }

    const lyrics = await dropbox.newUpload(Folder.lyrics, files.lyrics).then();

    const length = await getAudioDurationInSeconds(
      files.source.filepath,
    ).then();

    const track = TrackTransformer.fieldsToTrackCreateDto(
      fields,
      cover,
      source,
      lyrics,
      length,
    );
    const created = await this.trackDao.createTrack(track).then();
    if (created != null) {
      return TrackTransformer.trackToTrackInfoDto(created);
    } else {
      throw new InternalServerErrorException('не получилось создать трек');
    }
  }

  async updateTrack(
    id: number,
    fields: any,
    files: any,
  ): Promise<TrackInfoDto> {
    const source = await dropbox.newUpload(Folder.source, files.source).then();
    const cover = await dropbox.newUpload(Folder.cover, files.cover).then();
    const lyrics = await dropbox.newUpload(Folder.lyrics, files.lyrics).then();

    let length = undefined;
    if (source != undefined) {
      length = await getAudioDurationInSeconds(files.source.filepath).then();
    }

    if (fields.names == '') {
      fields.names = undefined;
    }
    if (fields.genres == '') {
      fields.genres = undefined;
    }
    if (fields.featIds == '') {
      fields.featIds = undefined;
    }
    if (fields.featNames == '') {
      fields.featNames = undefined;
    }

    const track = TrackTransformer.fieldsToTrackCreateDto(
      fields,
      cover,
      source,
      lyrics,
      length,
    );

    try {
      const created = await this.trackDao.updateTrack(id, track).then();
      if (created != null) {
        return TrackTransformer.trackToTrackInfoDto(created);
      } else {
        throw new InternalServerErrorException('не получилось обновить трек');
      }
    } catch (e) {
      throw new NotFoundException('не найден');
    }
  }

  async deleteTrack(id: number): Promise<TrackInfoDto> {
    try {
      const created = await this.trackDao.deleteTrack(id).then();

      if (created.cover != this.defaultCover) {
        await dropbox.delete(created.cover, Folder.cover);
      }
      await dropbox.delete(created.source, Folder.source);
      await dropbox.delete(created.lyrics, Folder.lyrics);

      return TrackTransformer.trackToTrackInfoDto(created);
    } catch (e) {
      throw new NotFoundException('не найден');
    }
  }
}
