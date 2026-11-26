import { Pressable, Text, View } from "react-native";
import { Redirect, useLocalSearchParams, useRouter } from "expo-router";
import { designTokens, getFontFamily } from "@routely/design-tokens";
import { SenderDashboardScreen } from "../../../customer/src/features/dashboard/sender-dashboard-screen";
import { DashboardScreen } from "../../../rider/src/features/dashboard/dashboard-screen";
import { activeDeliveryPreview } from "../../../rider/src/features/active-delivery/active-delivery-preview";
import { OwnerDashboardScreen } from "../../../owner/src/features/dashboard/dashboard-screen";
import { AgentDashboardScreen } from "../../../agent/src/features/dashboard/dashboard-screen";
import { isDemoApk } from "../../src/features/first-launch/demo";
import { isPublicExperience } from "../../src/features/first-launch/experience";

const { colors, spacing, typography } = designTokens;

export default function DemoDashboardRoute() {
  const router = useRouter();
  const { role } = useLocalSearchParams<{ role: string }>();

  if (!isDemoApk || !isPublicExperience(role)) return <Redirect href="/" />;

  return (
    <View style={{ flex: 1 }}>
      <Pressable
        accessibilityRole="button"
        onPress={() => router.replace("/select-experience")}
        style={{ backgroundColor: colors.container, padding: spacing.sm }}
      >
        <Text
          style={{
            color: colors.forest,
            fontFamily: getFontFamily("semibold"),
            fontSize: typography.sizes.label,
            textAlign: "center",
          }}
        >
          Switch experience
        </Text>
      </Pressable>
      {role === "customer" ? <SenderDashboardScreen /> : null}
      {role === "owner" ? <OwnerDashboardScreen /> : null}
      {role === "agent" ? <AgentDashboardScreen /> : null}
      {role === "rider" ? (
        <DashboardScreen
          currentDelivery={activeDeliveryPreview}
          onOpenRequest={() => router.push("/delivery-request")}
          onOpenDeliveries={() => router.replace("/deliveries")}
          onOpenBikes={() => router.push("/bikes")}
          onOpenDeliveryHistory={() =>
            router.push({ pathname: "/deliveries", params: { tab: "history" } })
          }
          onOpenHistoryDetail={(deliveryId) =>
            router.push({ pathname: "/delivery-history", params: { deliveryId } })
          }
          onOpenEarnings={() => router.replace("/earnings")}
          onOpenProfile={() => router.replace("/profile")}
          onOpenSupport={() => router.push("/support")}
          onOpenVerification={() => router.push("/verification")}
          onOpenDeliveryRequests={() => router.push("/delivery-requests")}
          onOpenCurrentDelivery={(hasDelivery) =>
            router.push(hasDelivery ? "/active-delivery" : "/delivery-requests")
          }
          onOpenTopUp={() => router.push("/wallet-top-up")}
        />
      ) : null}
    </View>
  );
}
