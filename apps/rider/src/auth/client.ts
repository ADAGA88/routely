import { createRoutelyAuthClient } from "@routely/auth";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

export const isAuthPreviewEnabled = __DEV__ && process.env.EXPO_PUBLIC_AUTH_PREVIEW === "true";
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

const secureStorage =
  Platform.OS === "web"
    ? undefined
    : {
        getItem: (key: string) => SecureStore.getItemAsync(key),
        removeItem: (key: string) => SecureStore.deleteItemAsync(key),
        setItem: (key: string, value: string) => SecureStore.setItemAsync(key, value),
      };

export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createRoutelyAuthClient(supabaseUrl, supabaseAnonKey, secureStorage)
    : null;
export const isPhoneAuthConfigured = supabase !== null;
