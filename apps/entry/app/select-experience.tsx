import { useRouter } from "expo-router";
import { useState } from "react";
import { RoleSelectionScreen } from "../src/features/first-launch/role-selection-screen";
import { useEntryPreferences } from "../src/features/first-launch/entry-context";

export default function SelectExperienceRoute() {
  const router = useRouter();
  const { selectExperience } = useEntryPreferences();
  const [error, setError] = useState<string>();

  async function continueWithExperience(experience: Parameters<typeof selectExperience>[0]) {
    setError(undefined);
    try {
      await selectExperience(experience);
      router.push({ pathname: "/login/[role]", params: { role: experience } });
    } catch {
      setError("Your experience could not be saved. Check storage access and try again.");
    }
  }

  return <RoleSelectionScreen error={error} onContinue={continueWithExperience} />;
}
