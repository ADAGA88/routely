import { Alert, Pressable, Text, View } from "react-native";
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

  const unavailable = () =>
    Alert.alert("Demo preview", "This action is not available in the combined demo.");

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
          Demo only · Switch experience
        </Text>
      </Pressable>
      {role === "customer" ? <SenderDashboardScreen onPreviewUnavailable={unavailable} /> : null}
      {role === "owner" ? <OwnerDashboardScreen /> : null}
      {role === "agent" ? <AgentDashboardScreen /> : null}
      {role === "rider" ? (
        <DashboardScreen
          currentDelivery={activeDeliveryPreview}
          onOpenRequest={unavailable}
          onOpenDeliveries={unavailable}
          onOpenBikes={unavailable}
          onOpenDeliveryHistory={unavailable}
          onOpenHistoryDetail={unavailable}
          onOpenEarnings={unavailable}
          onOpenProfile={unavailable}
          onOpenSupport={unavailable}
          onOpenVerification={unavailable}
          onOpenDeliveryRequests={unavailable}
          onOpenCurrentDelivery={unavailable}
          onOpenTopUp={unavailable}
        />
      ) : null}
    </View>
  );
}
