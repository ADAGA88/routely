import { Stack, usePathname } from "expo-router";
import {
  AppearanceFrame,
  AppearanceProvider,
  AppShell,
  useRoutelyFonts,
  WebBaseStyles,
} from "@routely/ui-mobile";

function CustomerNavigation() {
  const pathname = usePathname();
  const hasOwnHeader =
    pathname === "/dashboard" ||
    pathname === "/dashboard-section" ||
    pathname === "/send-package" ||
    pathname === "/delivery-journey" ||
    pathname === "/tracking-order";
  return (
    <AppearanceFrame showSwitch={!hasOwnHeader}>
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
      <AppearanceProvider appName="customer">
        <CustomerNavigation />
      </AppearanceProvider>
    </>
  );
}
