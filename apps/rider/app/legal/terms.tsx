import { useRouter } from "expo-router";
import { RiderDestinationScreen } from "@routely/ui-mobile";

export default function TermsScreen() {
  const router = useRouter();

  return (
    <RiderDestinationScreen
      description="Terms of Service content has not been published yet."
      onBack={() => {
        if (router.canGoBack()) {
          router.back();
        } else {
          router.replace("/");
        }
      }}
      title="Terms of Service"
    />
  );
}
