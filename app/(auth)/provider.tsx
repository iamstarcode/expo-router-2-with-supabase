import { useContext, useEffect, useState } from 'react';
import { createContext } from 'react';
import React from 'react';

import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { AuthSession } from '@supabase/supabase-js';
import {
  useRootNavigation,
  useRouter,
  useSegments,
  usePathname,
  useRootNavigationState,
} from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
//import { SUPABASE_STORAGE_KEY } from "../../config/constants";
import { supabaseClient } from '@/libs/supabase';

export interface IAuthState {
  accessToken: string;
  authenticated: boolean;
}

export interface AuthContextType {
  session: AuthSession | null | undefined;
  authInitialized: boolean;
}

interface Props {
  children?: React.ReactNode;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function AuthProvider({ children }: Props) {
  //const supabase = useSupabaseClient();
  const segments = useSegments();
  const router = useRouter();

  console.log(segments);

  const [session, setSession] = useState<AuthSession | null>(null);
  const [authInitialized, setAuthInitialized] = useState(false);

  const navigationState = useRootNavigationState();

  useEffect(() => {
    console.log(authInitialized);
    if (!navigationState?.key || !authInitialized) return;

    const inAuthGroup = segments[0] === '(auth)';

    if (
      // If the user is not signed in and the initial segment is not anything in the auth group.
      !session?.user &&
      !inAuthGroup
    ) {
      router.replace('/(auth)/sign-in/');
    } else if (session?.user && inAuthGroup) {
      // Redirect away from the sign-in page.
      router.replace('/(tabs)/'); // to tabs
      //console.log('no session');
      //router.replace('/');
      /*   if (Platform.OS === "ios") {
          setTimeout(() => {
            router.replace("/");
          }, 1)
        } else {
          setImmediate(() => {
            router.replace("/");
          });
        } */
    }
  }, [session, segments, authInitialized, navigationState?.key]);

  useEffect(() => {
    if (authInitialized) return;

    supabaseClient.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: authListner } = supabaseClient.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);
        setAuthInitialized(true);
        if (_event == 'TOKEN_REFRESHED') {
          //Handle Accordinngly
        }
      }
    );

    return () => {
      authListner.subscription;
    };
  }, []);

  return (
    <AuthContext.Provider value={{ session, authInitialized }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error(`useAuth must be used within a MyUserContextProvider.`);
  }
  return context;
};
