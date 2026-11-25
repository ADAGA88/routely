import { useRouter } from "expo-router";
import { ActiveDeliveryScreen } from "../src/features/active-delivery/active-delivery-screen";

export default function ActiveDeliveryRoute() {
  const router = useRouter();

  function goBack() {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/deliveries");
    }
  }

  return <ActiveDeliveryScreen onBack={goBack} />;
}
