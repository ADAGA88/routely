import { useLocalSearchParams, useRouter, Redirect } from "expo-router";
import { useState } from "react";
import { IntroductoryOnboardingScreen } from "../../src/features/first-launch/onboarding-screen";
import { useEntryPreferences } from "../../src/features/first-launch/entry-context";
import { isPublicExperience } from "../../src/features/first-launch/experience";

export default function IntroductoryOnboardingRoute() {
  const router = useRouter();
  const { role } = useLocalSearchParams<{ role: string }>();
  const { completeIntro } = useEntryPreferences();
  const [error, setError] = useState<string>();

  if (!isPublicExperience(role)) {
    return <Redirect href="/select-experience" />;
  }
  const experience = role;

  async function finishOnboarding(): Promise<void> {
    setError(undefined);
    try {
      await completeIntro(experience);
      router.replace({ pathname: "/access/[role]", params: { role: experience } });
    } catch {
      setError("Onboarding progress could not be saved. Try again.");
    }
  }

  return (
    <IntroductoryOnboardingScreen
      error={error}
      experience={experience}
      onBack={() => router.replace({ pathname: "/welcome/[role]", params: { role: experience } })}
      onComplete={finishOnboarding}
      onSwitch={() => router.replace("/select-experience")}
    />
  );
}
