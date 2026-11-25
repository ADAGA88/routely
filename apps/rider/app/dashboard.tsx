import { Redirect, useRouter } from "expo-router";
import { DashboardScreen } from "../src/features/dashboard/dashboard-screen";
import { activeDeliveryPreview } from "../src/features/active-delivery/active-delivery-preview";

export default function RiderDashboardRoute() {
  const router = useRouter();

  if (!__DEV__) return <Redirect href="/" />;

  return (
    <DashboardScreen
      currentDelivery={activeDeliveryPreview}
      onOpenDeliveries={() => router.replace("/deliveries")}
      onOpenBikes={() => router.push("/bikes")}
      onOpenDeliveryHistory={() =>
        router.push({ pathname: "/deliveries", params: { tab: "history" } })
      }
      onOpenHistoryDetail={(deliveryId) =>
        router.push({ pathname: "/delivery-history", params: { deliveryId } })
      }
      onOpenCurrentDelivery={(hasDelivery) =>
        router.push(hasDelivery ? "/active-delivery" : "/delivery-requests")
      }
      onOpenTopUp={() => router.push("/wallet-top-up")}
      onOpenEarnings={() => router.replace("/earnings")}
      onOpenProfile={() => router.replace("/profile")}
      onOpenSupport={() => router.push("/support")}
      onOpenVerification={() => router.push("/verification")}
      onOpenDeliveryRequests={() => router.push("/delivery-requests")}
      onOpenRequest={() => router.push("/delivery-request")}
    />
  );
}
