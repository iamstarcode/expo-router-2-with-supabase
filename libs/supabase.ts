import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
//import { SUPABASE_STORAGE_KEY } from '../config/constants';
import { Database } from './database.types';

import * as SecureStore from 'expo-secure-store';

const ExpoSecureStoreAdapter = {
  getItem: (key: string) => {
    return SecureStore.getItemAsync(key);
  },
  setItem: (key: string, value: string) => {
    SecureStore.setItemAsync(key, value);
  },
  removeItem: (key: string) => {
    SecureStore.deleteItemAsync(key);
  },
};

export const supabaseClient = createClient<Database>(
  //Env.SUPABASE_URL ?? '',
  //Env.SUPABASE_ANON_KEY ?? '',
  process.env.EXPO_PUBLIC_SUPABASE_URL ?? '',
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ?? '',
  {
    auth: {
      /* storage: AsyncStorage as any,
      storageKey: SUPABASE_STORAGE_KEY,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false, */
      storage: ExpoSecureStoreAdapter as any,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  }
);

export const getProfileByUsername = async (args: string[]) =>
  supabaseClient
    .from('profiles')
    .select('*')
    .eq('username', args[1])
    .single()
    .then((res) => res);

export const getProfileByById = async (args: string[]) =>
  supabaseClient
    .from('profiles')
    .select('*')
    .eq('id', args[1])
    .single()
    .then((res) => res);

export const getProducts = async () =>
  supabaseClient
    .from('products')
    .select(`*`)
    .eq('editable', true)
    .then((res) => res);

export const getSingleProduct = async (args: any) =>
  supabaseClient
    .from('products')
    .select(`*`)
    .eq('id', args[1])
    .eq('editable', args[2])
    .single()
    .then((res) => res);

type ProductSeResponse = Awaited<ReturnType<typeof getSingleProduct>>;
export type ProductResponseSuccess = ProductSeResponse['data'];

type ProductsRsesponse = Awaited<ReturnType<typeof getProducts>>;
export type ProductsResponseSuccess = ProductsRsesponse['data'];
