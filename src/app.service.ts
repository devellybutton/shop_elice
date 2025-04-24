import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor() {}

  getHello(): any {
    const memes = [
      'Keep calm and code on 🧘‍♂️',
      'It compiles, ship it! 🚢',
      'Hello from the container side 🐳',
      'Nginx got your back 😎',
      'NestJS is flying high 🐥',
    ];

    return {
      status: 'OK',
      timestamp: new Date(),
      message: `🎉 NestJS + Docker + Nginx 연결 완료!\n ${memes[Math.floor(Math.random() * memes.length)]}`,
    };
  }
}
