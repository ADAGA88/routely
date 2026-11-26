import { Redirect, Stack } from "expo-router";
import { isDemoApk } from "./demo";
import { useEntryPreferences } from "./entry-context";

export function DemoRoleLayout({ role }: { role: "customer" | "rider" }) {
  const { preferences } = useEntryPreferences();

  if (!isDemoApk || preferences.selectedExperience !== role) {
    return <Redirect href="/" />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
