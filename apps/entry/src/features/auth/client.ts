import { createRoutelyAuthClient } from "@routely/auth";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";
import { isDemoApk } from "../first-launch/demo";

const url = process.env.EXPO_PUBLIC_SUPABASE_URL;
const anonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

const storage =
  Platform.OS === "web"
    ? undefined
    : {
        getItem: (key: string) => SecureStore.getItemAsync(key),
        removeItem: (key: string) => SecureStore.deleteItemAsync(key),
        setItem: (key: string, value: string) => SecureStore.setItemAsync(key, value),
      };

export const supabase =
  !isDemoApk && url && anonKey ? createRoutelyAuthClient(url, anonKey, storage) : null;
