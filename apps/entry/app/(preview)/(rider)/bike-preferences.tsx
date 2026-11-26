import { useRouter } from "expo-router";
import { BikePreferencesScreen } from "../../../../rider/src/features/bikes/bike-preferences-screen";

export default function BikePreferencesRoute() {
  const router = useRouter();

  return (
    <BikePreferencesScreen
      onExit={() => (router.canGoBack() ? router.back() : router.replace("/bikes"))}
    />
  );
}
