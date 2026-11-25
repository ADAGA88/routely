import { Redirect } from "expo-router";
import { DeliveryJourneyScreen } from "../src/features/delivery-journey/delivery-journey-screen";

export default function DeliveryJourneyRoute() {
  if (!__DEV__) return <Redirect href="/" />;
  return <DeliveryJourneyScreen />;
}
