import { useLocalSearchParams } from "expo-router";
import { DeliveriesScreen } from "../src/features/deliveries/deliveries-screen";

export default function DeliveriesRoute() {
  const { tab } = useLocalSearchParams<{ tab?: string | string[] }>();
  return <DeliveriesScreen initialTab={tab === "history" ? "History" : "Current"} />;
}
