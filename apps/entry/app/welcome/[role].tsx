import { Redirect, useLocalSearchParams, useRouter } from "expo-router";
import { RoleWelcomeScreen } from "../../src/features/first-launch/welcome-screen";
import { isPublicExperience } from "../../src/features/first-launch/experience";
import { useEntryPreferences } from "../../src/features/first-launch/entry-context";

export default function RoleWelcomeRoute() {
  const router = useRouter();
  const { role } = useLocalSearchParams<{ role: string }>();
  const { preferences } = useEntryPreferences();

  if (!isPublicExperience(role)) {
    return <Redirect href="/select-experience" />;
  }

  return (
    <RoleWelcomeScreen
      experience={role}
      onBack={() => router.replace("/select-experience")}
      onContinue={() => {
        if (preferences.completedIntroExperiences.includes(role)) {
          router.replace({ pathname: "/access/[role]", params: { role } });
        } else {
          router.push({ pathname: "/onboarding/[role]", params: { role } });
        }
      }}
      onSwitch={() => router.replace("/select-experience")}
    />
  );
}
