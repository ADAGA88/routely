import { useRouter } from "expo-router";
import { RiderWelcomeScreen } from "@routely/ui-mobile";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <RiderWelcomeScreen
      onGetStarted={() => router.push("/auth/phone")}
      onLogin={() => router.push("/login")}
      onPrivacy={() => router.push("/legal/privacy")}
      onTerms={() => router.push("/legal/terms")}
    />
  );
}
