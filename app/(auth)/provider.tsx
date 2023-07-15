import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import React from "react";


import { useSupabaseClient } from "@supabase/auth-helpers-react";
import {
  AuthSession,
} from "@supabase/supabase-js";
import { useRootNavigation, useRouter, useSegments, usePathname } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";
//import { SUPABASE_STORAGE_KEY } from "../../config/constants";

export interface IAuthState {
  accessToken: string;
  authenticated: boolean;
}

export interface AuthContextType {
  session: AuthSession | null | undefined;
}

interface Props {
  children?: React.ReactNode;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function AuthProvider({ children }: Props) {
  const supabase = useSupabaseClient();
  const segments = useSegments();
  const router = useRouter();
  const path = usePathname();

  const [isNavigationReady, setNavigationReady] = useState(false);
  const rootNavigation = useRootNavigation();


  const [session, setSession] = useState<AuthSession | null | undefined>(null);

  useEffect(() => {
    const unsubscribe = rootNavigation?.addListener("state", (event) => {
      setNavigationReady(true);
    });
    return function cleanup() {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [rootNavigation]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: authListner } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);
        if (_event == "TOKEN_REFRESHED") {
          //Handle Accordinngly
        }
      }
    );

    return () => {
      authListner.subscription;
    };
  }, []);

  useEffect(() => {

    if (!isNavigationReady) {
      return;
    }
    const inAuthGroup = segments[0] === "(auth)";

    if (
      // If the user is not signed in and the initial segment is not anything in the auth group.
      !session?.user &&
      !inAuthGroup
    ) {

      router.replace('/(auth)/sign-in');


    } else if (session?.user && inAuthGroup) {
      // Redirect away from the sign-in page.
      //  router.replace('/'); to tabs 
      console.log("no session")
      router.replace("/");
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
  }, [session, segments]);

  return (
    <AuthContext.Provider value={{ session }}>{children}</AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error(`useAuth must be used within a MyUserContextProvider.`);
  }
  return context;
};
