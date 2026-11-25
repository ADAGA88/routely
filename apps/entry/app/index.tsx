import { useRouter } from "expo-router";
import { GeneralWelcomeScreen } from "../src/features/first-launch/general-welcome-screen";
import { GeneralIntroScreen } from "../src/features/first-launch/general-intro-screen";
import { useEntryPreferences } from "../src/features/first-launch/entry-context";

export default function IndexRoute() {
  const router = useRouter();
  const { preferences } = useEntryPreferences();

  if (preferences.generalIntroCompletedAt === null) {
    return <GeneralIntroScreen />;
  }

  function getStarted(): void {
    router.push("/select-experience");
  }

  return <GeneralWelcomeScreen onGetStarted={getStarted} />;
}
