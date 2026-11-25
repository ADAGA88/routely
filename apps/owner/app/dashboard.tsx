import { Redirect } from "expo-router";
import { OwnerDashboardScreen } from "../src/features/dashboard/dashboard-screen";

export default function OwnerDashboardRoute() {
  if (!__DEV__) return <Redirect href="/" />;
  return <OwnerDashboardScreen />;
}
