import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Axios } from 'axios'

export default async (request: VercelRequest, response: VercelResponse) => {
    const data = new FormData();
    data.append("grant_type", "authorization_code")
    data.append("duration", "permanent")

    let authData = {};
    const axios = new Axios({});
    try {
        const result = await axios.post("https://www.reddit.com/api/v1/access_token", data, {
            auth: {
                username: process.env.VITE_REDDIT_CLIENT_ID,
                password: process.env.VITE_REDDIT_SECRET_KEY
            },
            responseType: 'json'
        })
        return authData = JSON.parse(result.data)
    } catch (error) {
        return { "message": "Error aquiring access token" }
    }
};
