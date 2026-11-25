import { useLocalSearchParams, useRouter } from "expo-router";
import {
  DeliveryRequestNotFoundScreen,
  DeliveryRequestScreen,
} from "../src/features/delivery-request/delivery-request-screen";
import {
  getDeliveryRequestPreview,
  requestPreview,
} from "../src/features/delivery-request/request-preview";

export default function DeliveryRequestRoute() {
  const router = useRouter();
  const { requestId } = useLocalSearchParams<{ requestId?: string | string[] }>();
  const request =
    requestId === undefined
      ? requestPreview
      : typeof requestId === "string"
        ? getDeliveryRequestPreview(requestId)
        : undefined;

  function goBack() {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/dashboard");
    }
  }

  if (!request) {
    return (
      <DeliveryRequestNotFoundScreen onViewMoreRequests={() => router.push("/delivery-requests")} />
    );
  }

  return (
    <DeliveryRequestScreen
      onBack={goBack}
      onViewMoreRequests={() => router.push("/delivery-requests")}
      request={request}
    />
  );
}
