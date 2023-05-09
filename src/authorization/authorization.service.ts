import { Injectable } from '@nestjs/common';
import { AuthorizationDao } from './authorization.dao';

@Injectable()
export class AuthorizationService {
  private readonly authorizationDao: AuthorizationDao;
  constructor(authorizationDao: AuthorizationDao) {
    this.authorizationDao = authorizationDao;
  }

  async create(id: number, login: string, password: string): Promise<string> {
    try {
      const user = await this.authorizationDao.create(id, login, password);
      return user.login;
    } catch (e) {
      throw e;
    }
  }

  async delete(login: string): Promise<string> {
    try {
      const user = await this.authorizationDao.delete(login);
      return user.login;
    } catch (e) {
      throw e;
    }
  }

  async update(old: string, login: string, password: string): Promise<string> {
    try {
      const user = await this.authorizationDao.update(old, login, password);
      return user.login;
    } catch (e) {
      throw e;
    }
  }

  async check(id: string): Promise<number> {
    try {
      return this.authorizationDao.check(id);
    } catch (e) {
      throw e;
    }
  }
}
