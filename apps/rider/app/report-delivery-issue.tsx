import { useRouter } from "expo-router";
import { ReportIssueScreen } from "../src/features/active-delivery/report-issue-screen";

export default function ReportDeliveryIssueRoute() {
  const router = useRouter();

  function goBack() {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/active-delivery");
    }
  }

  return <ReportIssueScreen onBack={goBack} />;
}
