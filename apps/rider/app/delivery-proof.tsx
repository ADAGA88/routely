import { useRouter } from "expo-router";
import { DeliveryProofScreen } from "../src/features/active-delivery/delivery-proof-screen";

export default function DeliveryProofRoute() {
  const router = useRouter();

  function goBack() {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/active-delivery");
    }
  }

  return <DeliveryProofScreen onBack={goBack} />;
}
