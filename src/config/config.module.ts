import { Module } from '@nestjs/common';
import {
  ConfigModule as NestJSConfigModule,
  ConfigService,
} from '@nestjs/config';
import configuration from './configuration';

@Module({
  imports: [
    NestJSConfigModule.forRoot({
      load: [configuration],
      validationSchema: configuration(),
      validationOptions: {
        abortEarly: false,
      },
    }),
  ],
  providers: [ConfigService],
})
export class ConfigModule {}
