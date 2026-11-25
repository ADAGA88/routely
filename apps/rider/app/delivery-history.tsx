import { useLocalSearchParams, useRouter } from "expo-router";
import { DeliveryHistoryDetailsScreen } from "../src/features/deliveries/delivery-history-details-screen";
import { getDeliveryHistoryPreview } from "../src/features/deliveries/delivery-history-preview";

export default function DeliveryHistoryRoute() {
  const router = useRouter();
  const { deliveryId } = useLocalSearchParams<{ deliveryId?: string | string[] }>();
  const delivery =
    typeof deliveryId === "string" ? getDeliveryHistoryPreview(deliveryId) : undefined;

  function goBack() {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/deliveries");
    }
  }

  return <DeliveryHistoryDetailsScreen delivery={delivery} onBack={goBack} />;
}
