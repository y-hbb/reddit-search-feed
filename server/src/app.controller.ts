import { Body, Controller, Get, Post } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppService } from './app.service';
import { RedditService } from './reddit/reddit.service';

interface RefreshDto {
  refresh_token: string;
}

@Controller('auth')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly redditService: RedditService,
  ) {}

  @Get('getAccessToken')
  getAccessToken(): Observable<Object> {
    const data = this.redditService.getAccessToken();
    const result = data.pipe(
      map((response) => {
        return response.data;
      }),
    );

    return result;
  }

  @Post('refreshToken')
  refreshToken(@Body() refreshDto: RefreshDto): Observable<Object> {
    const data = this.redditService.refreshToken(refreshDto.refresh_token);
    const result = data.pipe(
      map((response) => {
        return response.data;
      }),
    );

    return result;
  }
}
