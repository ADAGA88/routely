import { useRouter } from "expo-router";
import { RiderDestinationScreen } from "@routely/ui-mobile";

export default function PrivacyScreen() {
  const router = useRouter();

  return (
    <RiderDestinationScreen
      description="Privacy Policy content has not been published yet."
      onBack={() => {
        if (router.canGoBack()) {
          router.back();
        } else {
          router.replace("/");
        }
      }}
      title="Privacy Policy"
    />
  );
}
