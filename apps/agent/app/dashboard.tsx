import { Redirect } from "expo-router";
import { AgentDashboardScreen } from "../src/features/dashboard/dashboard-screen";

export default function AgentDashboardRoute() {
  if (!__DEV__) return <Redirect href="/" />;
  return <AgentDashboardScreen />;
}
