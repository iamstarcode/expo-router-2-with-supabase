import Constants from "expo-constants";

const API_URL = Constants?.expoConfig?.extra?.API_URL;
const SUPABASE_URL = Constants?.expoConfig?.extra?.SUPABASE_URL;
const SUPABASE_ANON_KEY = Constants?.expoConfig?.extra?.SUPABASE_ANON_KEY;

export const Env = {
  API_URL,
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
};
