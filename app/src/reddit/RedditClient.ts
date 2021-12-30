import { Axios } from "axios";

type AuthData = {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
};

export default class RedditClient {
  private http: Axios;
  private apiURL = "https://oauth.reddit.com";
  private authURL = "https://www.reddit.com/api/v1/access_token";
  private authData?: AuthData;
  private hasRefreshToken = false;
  constructor() {
    this.http = new Axios({});
    this.getAccessToken();
  }
  private async getAccessToken() {
    if (!localStorage.getItem("access-token")) {
      const result = await this.http.get("localhost:8080/getAccessToken");
      localStorage.setItem("access-token", result.data);
      this.authData = { ...this.authData, ...JSON.parse(result.data) };
    } else {
      this.authData = {
        ...this.authData,
        ...JSON.parse(localStorage.getItem("access-token")!),
      };
    }
  }

  private async refreshToken() {}

  async search(q: string) {
    try {
      const result = await this.http.get(
        this.apiURL + `/search.json?raw_json=1&q=${q}`,
        {
          headers: {
            Authorization: `Bearer${this.authData?.access_token}`,
          },
          responseType: "json",
        }
      );
      this.authData = { ...this.authData, ...JSON.parse(result.data) };
    } catch (error) {}
  }
}
