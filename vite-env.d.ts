/// <reference types="vite/client" />
interface ImportMetaEnv {
    VITE_API_TOKEN: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}