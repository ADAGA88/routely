import Constants from "expo-constants";
import { Platform } from "react-native";

export const isDemoApk = Platform.OS === "android" && Constants.expoConfig?.extra?.demoApk === true;
