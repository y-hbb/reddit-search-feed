import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { v4 as uuidv4 } from 'uuid';

interface AuthData {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  device_id: string;
}

export const redditTokenAPI = createApi({
  reducerPath: 'redditTokenAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://www.reddit.com/',
  }),
  endpoints: (builder) => ({
    getAccessToken: builder.query<AuthData, void>({
      query: () => {
        const formData = new FormData();

        formData.append(
          'grant_type',
          'https://oauth.reddit.com/grants/installed_client'
        );
        formData.append('device_id', uuidv4());
        formData.append('duration', 'permanent');
        return {
          url: 'api/v1/access_token',
          method: 'POST',
          body: formData,
          headers: {
            Authorization: `Basic ${btoa(
              `${import.meta.env.VITE_REDDIT_CLIENT_ID}:` // "username:"
            )}`,
          },
        };
      },
    }),
  }),
});

export const { useGetAccessTokenQuery } = redditTokenAPI;
