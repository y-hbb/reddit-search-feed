import { Controller, Get } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppService } from './app.service';
import { RedditService } from './reddit/reddit.service';

@Controller()
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
}
