import { useRouter } from "expo-router";
import { View } from "react-native";
import { designTokens } from "@routely/design-tokens";
import { RoutelyButton, WelcomeScreen } from "@routely/ui-mobile";

export default function HomeScreen() {
  const router = useRouter();
  return (
    <View style={{ flex: 1 }}>
      <WelcomeScreen
        appName="Customer"
        headline="Deliveries, made more considered."
        description="A clear, calm starting point for the Routely customer experience. This preview is visual only; no deliveries or accounts are connected."
      />
      {__DEV__ ? (
        <View style={{ padding: designTokens.spacing.lg }}>
          <RoutelyButton
            fullWidth
            label="Open sender dashboard"
            onPress={() => router.push("/dashboard")}
          />
        </View>
      ) : null}
    </View>
  );
}
