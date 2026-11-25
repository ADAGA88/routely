import { Stack, usePathname } from "expo-router";
import {
  AppearanceFrame,
  AppearanceProvider,
  AppShell,
  useRoutelyFonts,
  WebBaseStyles,
} from "@routely/ui-mobile";

function AgentNavigation() {
  const pathname = usePathname();
  return (
    <AppearanceFrame showSwitch={pathname !== "/dashboard"}>
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
      <AppearanceProvider appName="agent">
        <AgentNavigation />
      </AppearanceProvider>
    </>
  );
}
