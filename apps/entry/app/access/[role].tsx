import { Linking, Platform } from "react-native";
import { useLocalSearchParams, useRouter, Redirect } from "expo-router";
import { useState } from "react";
import { AccountAccessScreen } from "../../src/features/first-launch/account-access-screen";
import { isDemoApk } from "../../src/features/first-launch/demo";
import {
  experienceAppTargets,
  experienceDetails,
  isDashboardPreviewAvailable,
  isPublicExperience,
  openDashboardPreview,
} from "../../src/features/first-launch/experience";

export default function AccountAccessRoute() {
  const router = useRouter();
  const { role, returnTo } = useLocalSearchParams<{ role: string; returnTo?: string }>();
  const [message, setMessage] = useState<string>();

  if (!isPublicExperience(role)) {
    return <Redirect href="/select-experience" />;
  }
  const experience = role;

  async function openExperience(login = false): Promise<void> {
    setMessage(undefined);
    const target = experienceAppTargets[experience];
    try {
      if (Platform.OS === "web") {
        const webUrl =
          login && experience === "rider"
            ? process.env.EXPO_PUBLIC_RIDER_LOGIN_URL ||
              (__DEV__ ? "http://localhost:8082/login" : null)
            : target.webUrl;
        if (!webUrl) {
          setMessage(
            `${experienceDetails[experience].title} browser access is not configured. No action was performed.`,
          );
          return;
        }
        window.location.assign(webUrl);
      } else {
        await Linking.openURL(
          login && experience === "rider" ? "routely-rider:///login" : target.schemeUrl,
        );
      }
    } catch {
      setMessage(
        `${experienceDetails[experience].title} app could not be opened. Install its app target or use its browser preview.`,
      );
    }
  }

  function continueToAccountAccess(): void {
    if (isDemoApk) {
      router.push({ pathname: "/login/[role]", params: { role: experience } });
      return;
    }
    if (experience === "rider") {
      void openExperience();
      return;
    }
    setMessage(
      experience === "agent"
        ? "Agent access must be provisioned or authorized by Routely operations. No access was granted."
        : `${experienceDetails[experience].title} authentication is not configured. No account was created.`,
    );
  }

  function continueToLogin(): void {
    if (isDemoApk) {
      router.push({ pathname: "/login/[role]", params: { role: experience } });
      return;
    }
    if (experience === "rider") {
      void openExperience(true);
      return;
    }
    continueToAccountAccess();
  }

  return (
    <AccountAccessScreen
      experience={experience}
      demoApk={isDemoApk}
      message={message}
      onBack={() => {
        if (returnTo === "general") {
          router.replace("/");
        } else if (returnTo === "selection") {
          router.replace({ pathname: "/select-experience", params: { intent: "account" } });
        } else {
          router.replace({ pathname: "/welcome/[role]", params: { role: experience } });
        }
      }}
      onCreateAccount={continueToAccountAccess}
      onLogin={continueToLogin}
      onOpenPreview={() => void openExperience()}
      onOpenDashboardPreview={
        isDemoApk
          ? () => router.push({ pathname: "/demo/[role]", params: { role: experience } })
          : isDashboardPreviewAvailable
            ? () => {
                try {
                  setMessage(undefined);
                  openDashboardPreview(experience);
                } catch {
                  setMessage("The dashboard preview could not be opened. Please try again.");
                }
              }
            : undefined
      }
      onSwitch={() => router.replace("/select-experience")}
    />
  );
}
