import React from "react";
import RedditClient from "./reddit/RedditClient";

export const defaultApp = {
    reddit: new RedditClient(),
    title: "Untitled"
}

export const appContext = React.createContext(defaultApp)

export const AppProvider = appContext.Provider;
