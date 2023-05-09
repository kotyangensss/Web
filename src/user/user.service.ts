import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UserDao } from './user.dao';
import { UserTransformer } from './user.transformer';
import { UserInfoDto } from './dto/userInfoDto';
import { dropbox } from '../dropbox';

@Injectable()
export class UserService {
  private readonly userDao: UserDao;
  private readonly defaultCover =
    'https://dl.dropbox.com/s/mwuu3pchiwdf3w0/3408770da2d455ed292d62303ok.png?dl=0';
  constructor(userDao: UserDao) {
    this.userDao = userDao;
  }

  async getUser(id: number): Promise<UserInfoDto> {
    const user = await this.userDao.getUser(id).then();
    if (user != null) {
      return UserTransformer.userToUserInfoDto(user);
    } else {
      throw new NotFoundException('Пользователь не найден');
    }
  }

  async getUsersByName(
    name: string,
    limit: number,
    offset: number,
  ): Promise<UserInfoDto[]> {
    const users = await this.userDao.getUsersByName(name, limit, offset).then();
    const ans = [];
    users.forEach((user) => ans.push(UserTransformer.userToUserInfoDto(user)));
    return ans;
  }

  async createUser(fields: any, files: any): Promise<UserInfoDto> {
    if (fields.name == null || fields.email == null || fields.type == null) {
      throw new BadRequestException('не указаны имя, тип или почта');
    }

    let profilePic = await dropbox
      .newUpload(Folder.profiles, files.profilePic)
      .then();
    if (profilePic == undefined) {
      profilePic = this.defaultCover;
    }

    const user = UserTransformer.fieldsToUserCreateDto(fields, profilePic);
    try {
      const created = await this.userDao.createUser(user).then();
      if (created != null) {
        return UserTransformer.userToUserInfoDto(created);
      } else {
        throw new InternalServerErrorException(
          'не получилось создать пользователя',
        );
      }
    } catch (e) {
      throw new BadRequestException('неуникальный email');
    }
  }

  async updateUser(id: number, fields: any, files: any): Promise<UserInfoDto> {
    const profilePic = await dropbox
      .newUpload(Folder.profiles, files.profilePic)
      .then();

    if (fields.name == '') {
      fields.name = undefined;
    }
    if (fields.email == '') {
      fields.email = undefined;
    }
    if (fields.bio == '') {
      fields.bio = undefined;
    }

    const user = UserTransformer.fieldsToUserCreateDto(fields, profilePic);
    try {
      const created = await this.userDao.updateUser(id, user).then();
      if (created != null) {
        return UserTransformer.userToUserInfoDto(created);
      } else {
        throw new InternalServerErrorException(
          'не получилось обновить пользователя',
        );
      }
    } catch (e) {
      throw new NotFoundException('не найден');
    }
  }

  async deleteUser(id: number): Promise<UserInfoDto> {
    try {
      const created = await this.userDao.deleteUser(id).then();

      if (created.profilePic != this.defaultCover) {
        await dropbox.delete(created.profilePic, Folder.cover);
      }

      return UserTransformer.userToUserInfoDto(created);
    } catch (e) {
      throw new BadRequestException('не найден или неправильный email');
    }
  }
}
