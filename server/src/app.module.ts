import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedditService } from './reddit/reddit.service';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ['.env.local'] }),
  ],
  controllers: [AppController],
  providers: [AppService, RedditService],
})
export class AppModule {}
