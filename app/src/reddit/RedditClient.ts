import { Axios } from "axios";
import { SearchOptions } from "../components/SearchComponent";
import { v4 as uuidv4 } from "uuid";

type AuthData = {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  device_id: string;
};

class RedditClient {
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
        const formData = new FormData();

        formData.append(
          "grant_type",
          "https://oauth.reddit.com/grants/installed_client"
        );
        formData.append("device_id", uuidv4());
        formData.append("duration", "permanent");
        const result = await this.http.post(this.authURL, formData, {
          auth: {
            username: import.meta.env.VITE_REDDIT_CLIENT_ID,
            password: "",
          },
        });
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
    let url =
      this.apiURL +
      `/search.json?q=${s.q.replaceAll(" ", "+")}&include_over_18=${
        s.includeOver18 ? 1 : 0
      }&raw_json=1&sort=${s.sort}&t=${s.t}&after=${s.after ? s.after : ""}`;

    try {
      const result = await this.http.get(url, {
        headers: {
          Authorization: `Bearer${this.authData?.access_token}`,
        },
        responseType: "json",
      });
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

export const reddit = new RedditClient();
