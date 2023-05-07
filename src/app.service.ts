import { Injectable } from '@nestjs/common';
import { Genre } from './enums/genre';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getGenres(): Genre[] {
    return Object.values(Genre);
  }
}
