import { useRouter } from "expo-router";
import { BikePreferencesScreen } from "../src/features/bikes/bike-preferences-screen";

export default function BikePreferencesRoute() {
  const router = useRouter();

  function goBack() {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/auth/phone");
    }
  }

  return <BikePreferencesScreen onExit={goBack} />;
}
