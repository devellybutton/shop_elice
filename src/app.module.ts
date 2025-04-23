import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './user/users.module';
import { ProductsModule } from './product/products.module';
import { CategoriesModule } from './categories/categories.module';
import { AuthModule } from './auth/auth.module';
import { EmailModule } from './email/email.module';
import { DatabaseModule } from './database/database.module';
import { RedisModule } from './redis/redis.module';
import { ConfigModule } from './config/config.module';
import { CommentModule } from './comment/comment.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [UsersModule, ProductsModule, CategoriesModule, AuthModule, EmailModule, DatabaseModule, RedisModule, ConfigModule, CommentModule, CommonModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
