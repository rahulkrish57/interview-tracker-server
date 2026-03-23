import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Interview } from './interviews/interviews.entity';
import { User } from './auth/user.entity';
import { Comment } from './comments/comment.entity';
import { History } from './history/history.entity';
import { InterviewsModule } from './interviews/interviews.module';
import { AuthModule } from './auth/auth.module';
import { DbViewerModule } from './db-viewer/db-viewer.module';
import { CommentsModule } from './comments/comments.module';
import { HistoryModule } from './history/history.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get('DB_USERNAME'),
        password: config.get('DB_PASSWORD'),
        database: config.get('DB_NAME'),
        entities: [Interview, User, Comment, History],
        synchronize: true,
      }),
    }),

    InterviewsModule,
    AuthModule,
    DbViewerModule,
    CommentsModule,
    HistoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
