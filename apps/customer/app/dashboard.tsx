import { Redirect } from "expo-router";
import { SenderDashboardScreen } from "../src/features/dashboard/sender-dashboard-screen";

export default function CustomerDashboardRoute() {
  if (!__DEV__) return <Redirect href="/" />;
  return <SenderDashboardScreen />;
}
