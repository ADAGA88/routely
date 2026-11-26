import { useLocalSearchParams } from "expo-router";
import { DashboardSectionScreen } from "../../../../customer/src/features/dashboard/dashboard-section-screen";
import { isDashboardSectionId } from "../../../../customer/src/features/dashboard/dashboard-sections";

export default function CustomerDashboardSectionRoute() {
  const { section } = useLocalSearchParams<{ section?: string }>();
  return <DashboardSectionScreen section={isDashboardSectionId(section) ? section : null} />;
}
