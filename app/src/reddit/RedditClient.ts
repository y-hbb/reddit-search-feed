import { Axios } from "axios";
import { SearchOptions } from "../components/SearchComponent";

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
  private customAuthURL = import.meta.env.VITE_REDDIT_AUTH_SITE;
  constructor() {
    this.http = new Axios({});
    this.getAccessToken();
  }
  private async getAccessToken() {
    if (!localStorage.getItem("reddit-access-token")) {
      try {
        const result = await this.http.get(
          this.customAuthURL + "/getAccessToken"
        );
        if (validateAccessToken(JSON.parse(result.data))) {
          localStorage.setItem("reddit-access-token", result.data);
          this.authData = { ...this.authData, ...JSON.parse(result.data) };
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      this.authData = {
        ...this.authData,
        ...JSON.parse(localStorage.getItem("reddit-access-token")!),
      };
    }
  }

  private async refreshToken() {}

  async search(s: SearchOptions) {
    try {
      const result = await this.http.get(
        this.apiURL +
          `/search.json?q=${s.q.replaceAll(" ", "+")}&include_over_18=${
            s.includeOver18 ? 1 : 0
          }&raw_json=1&sort=${s.sort}&t=${s.t}`,
        {
          headers: {
            Authorization: `Bearer${this.authData?.access_token}`,
          },
          responseType: "json",
        }
      );
      return JSON.parse(result.data);
    } catch (error) {
      console.log(error);
    }
  }
}
function validateAccessToken(response: any) {
  if (response.access_token) return true;
  return false;
}
