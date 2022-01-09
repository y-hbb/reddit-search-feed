import React from "react";
import RedditClient from "./reddit/RedditClient";

export const app = {
    reddit: new RedditClient()
}

export const appContext = React.createContext(app)

export const AppProvider = appContext.Provider;
