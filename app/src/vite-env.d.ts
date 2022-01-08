/// <reference types="vite/client" />

//env var name should start with VITE_
interface ImportMetaEnv {
    readonly VITE_REDDIT_AUTH_SITE: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
