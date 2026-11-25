import { Redirect } from "expo-router";
import { TrackingOrderScreen } from "../src/features/delivery-journey/tracking-order-screen";

export default function TrackingOrderRoute() {
  if (!__DEV__) return <Redirect href="/" />;
  return <TrackingOrderScreen />;
}
