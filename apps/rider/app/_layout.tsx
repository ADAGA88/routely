import { Stack, usePathname } from "expo-router";
import { StatusBar } from "react-native";
import {
  AppearanceFrame,
  AppearanceProvider,
  AppShell,
  useAppearance,
  useRoutelyFonts,
  WebBaseStyles,
} from "@routely/ui-mobile";

function RiderNavigation() {
  const isDashboard = usePathname() === "/dashboard";
  const { mode } = useAppearance();

  return (
    <AppearanceFrame accentBackground={isDashboard} showSwitch={!isDashboard}>
      {isDashboard ? (
        <StatusBar barStyle={mode === "lime" ? "dark-content" : "light-content"} />
      ) : null}
      <Stack screenOptions={{ headerShown: false }} />
    </AppearanceFrame>
  );
}

export default function RootLayout() {
  const [fontsLoaded, fontError] = useRoutelyFonts();

  if (fontError) {
    return (
      <>
        <WebBaseStyles />
        <AppShell appName="Routely" description="" fontReady={fontsLoaded} status="error" />
      </>
    );
  }
  if (!fontsLoaded) {
    return (
      <>
        <WebBaseStyles />
        <AppShell appName="Routely" description="" fontReady={fontsLoaded} status="loading" />
      </>
    );
  }

  return (
    <>
      <WebBaseStyles />
      <AppearanceProvider appName="rider">
        <RiderNavigation />
      </AppearanceProvider>
    </>
  );
}
