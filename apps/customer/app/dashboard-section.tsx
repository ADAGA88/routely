import { Redirect, useLocalSearchParams } from "expo-router";
import { DashboardSectionScreen } from "../src/features/dashboard/dashboard-section-screen";
import { isDashboardSectionId } from "../src/features/dashboard/dashboard-sections";

export default function DashboardSectionRoute() {
  const { section } = useLocalSearchParams<{ section?: string }>();
  if (!__DEV__) return <Redirect href="/" />;
  return <DashboardSectionScreen section={isDashboardSectionId(section) ? section : null} />;
}
