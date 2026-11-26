import Constants from "expo-constants";
import { Stack, usePathname } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import {
  AppearanceFrame,
  AppearanceProvider,
  useRoutelyFonts,
  WebBaseStyles,
} from "@routely/ui-mobile";
import { EntryPreferencesProvider } from "../src/features/first-launch/entry-context";
import {
  clearEntryPreferences,
  readEntryPreferences,
  type EntryPreferences,
} from "../src/features/first-launch/storage";
import { SplashScreen } from "../src/features/first-launch/splash-screen";
import { isDemoApk } from "../src/features/first-launch/demo";

type StartupState =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "ready"; preferences: EntryPreferences };

function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : "Routely could not finish initialization.";
}

export default function RootLayout() {
  const pathname = usePathname();
  const [fontsLoaded, fontError] = useRoutelyFonts();
  const [startup, setStartup] = useState<StartupState>({ status: "loading" });
  const [splashEntranceComplete, setSplashEntranceComplete] = useState(false);

  const initialize = useCallback(async () => {
    setSplashEntranceComplete(false);
    setStartup({ status: "loading" });
    try {
      if (Constants.expoConfig?.scheme !== (isDemoApk ? "routely-demo" : "routely")) {
        throw new Error("The Routely entry app configuration is incomplete.");
      }
      const preferences = await readEntryPreferences();
      setStartup({ status: "ready", preferences });
    } catch (error) {
      setStartup({ status: "error", message: errorMessage(error) });
    }
  }, []);

  useEffect(() => {
    if (fontError) {
      setStartup({
        status: "error",
        message: "Poppins could not be loaded. Restart the app to retry.",
      });
      return;
    }
    if (fontsLoaded) {
      void initialize();
    }
  }, [fontError, fontsLoaded, initialize]);

  const resetPreferences = useCallback(async () => {
    try {
      await clearEntryPreferences();
      await initialize();
    } catch (error) {
      setStartup({ status: "error", message: errorMessage(error) });
    }
  }, [initialize]);
  const completeSplashEntrance = useCallback(() => {
    setSplashEntranceComplete(true);
  }, []);

  if (startup.status === "error") {
    return (
      <SplashScreen
        error={startup.message}
        key="error"
        onReset={fontError ? undefined : () => void resetPreferences()}
        onRetry={fontError ? undefined : () => void initialize()}
      />
    );
  }
  if (!fontsLoaded || startup.status === "loading" || !splashEntranceComplete) {
    return <SplashScreen key="loading" onEntranceComplete={completeSplashEntrance} />;
  }

  const previewHasHeader =
    isDemoApk &&
    [
      "/demo/customer",
      "/demo/rider",
      "/dashboard-section",
      "/send-package",
      "/delivery-journey",
      "/tracking-order",
    ].includes(pathname);

  return (
    <SafeAreaProvider>
      <WebBaseStyles />
      <StatusBar style="dark" />
      <EntryPreferencesProvider initialPreferences={startup.preferences}>
        <AppearanceProvider appName="entry">
          <AppearanceFrame
            accentBackground={isDemoApk && pathname === "/demo/rider"}
            showSwitch={!previewHasHeader}
          >
            <Stack screenOptions={{ headerShown: false }} />
          </AppearanceFrame>
        </AppearanceProvider>
      </EntryPreferencesProvider>
    </SafeAreaProvider>
  );
}
