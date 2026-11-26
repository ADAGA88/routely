import { Redirect } from "expo-router";
import { isDemoApk } from "../../src/features/first-launch/demo";
import { useEntryPreferences } from "../../src/features/first-launch/entry-context";

export default function PreviewDashboardRoute() {
  const { preferences } = useEntryPreferences();
  if (!isDemoApk || !preferences.selectedExperience) return <Redirect href="/" />;
  return (
    <Redirect
      href={{ pathname: "/demo/[role]", params: { role: preferences.selectedExperience } }}
    />
  );
}
