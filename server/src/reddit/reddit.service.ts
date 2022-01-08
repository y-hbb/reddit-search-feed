import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';

@Injectable()
export class RedditService {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}

  getAccessToken(): Observable<AxiosResponse<Object>> {
    return this.httpService.post(
      'https://www.reddit.com/api/v1/access_token',
      'grant_type=client_credentials&duration=permanent',
      {
        auth: {
          username: this.configService.get('REDDIT_CLIENT_ID'),
          password: this.configService.get('REDDIT_SECRET_KEY'),
        },
        responseType: 'json',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );
  }
}
