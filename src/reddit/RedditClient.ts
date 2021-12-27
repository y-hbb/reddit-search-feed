import { Axios } from "axios";

type AuthData = {
    access_token: string
    token_type: string
    expires_in: number
    refresh_token: string
    scope: string
}

export default class RedditClient {

    private http: Axios
    private apiURL = "https://oauth.reddit.com"
    private authURL = "https://www.reddit.com/api/v1/access_token"
    private authData?: AuthData
    private hasRefreshToken = false
    constructor() {
        this.http = new Axios({})
        this.getAccessToken()
    }
    private async getAccessToken() {
        const data = new FormData();
        data.append("grant_type", "authorization_code")
        data.append("duration", "permanent")
        try {
            const result = await this.http.post(this.authURL, data, {
                auth: {
                    username: import.meta.env.VITE_REDDIT_CLIENT_ID,
                    password: import.meta.env.VITE_REDDIT_SECRET_KEY
                },
                responseType: 'json'
            })
            this.authData = JSON.parse(result.data)
            this.hasRefreshToken = true
        } catch (error) {

        }
    }

    private async refreshToken() {
        const data = new FormData();
        data.append("grant_type", "refresh_token")
        data.append("refresh_token", this.authData?.refresh_token!)
        try {
            const result = await this.http.post(this.authURL, data, {
                auth: {
                    username: import.meta.env.VITE_REDDIT_CLIENT_ID,
                    password: import.meta.env.VITE_REDDIT_SECRET_KEY
                },
                responseType: 'json'
            })
            this.authData = { ...this.authData, ...JSON.parse(result.data) }
        } catch (error) {

        }
    }

    async search(q: string) {
        try {
            const result = await this.http.get(this.apiURL + `/search.json?raw_json=1&q=${q}`, {
                headers: {
                    Authorization: `Bearer${this.authData?.access_token}`
                },
                responseType: 'json'
            })
            this.authData = { ...this.authData, ...JSON.parse(result.data) }
        } catch (error) {

        }
    }


}