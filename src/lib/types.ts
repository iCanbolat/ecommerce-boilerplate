declare namespace NodeJS {
  export interface ProcessEnv {
    NEXT_PUBLIC_SUPABASE_URL: string;
    NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
  }
}

export interface Variant {
  options: string[];
  type: string;
}
