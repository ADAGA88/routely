import type { ReactElement } from "react";
import { Text, View } from "react-native";
import { designTokens, getFontFamily } from "@routely/design-tokens";
import { RoutelyButton } from "@routely/ui-mobile";
import { AuthScreenFrame } from "./auth-screen-frame";

const { colors, spacing, typography } = designTokens;

interface AccountStatusScreenProps {
  onBack: () => void;
  onReturnToWelcome: () => void;
}

export function AccountStatusScreen({
  onBack,
  onReturnToWelcome,
}: AccountStatusScreenProps): ReactElement {
  return (
    <AuthScreenFrame
      description="Account access requires additional checks."
      onBack={onBack}
      title="Account status"
    >
      <View>
        <Text
          accessibilityLiveRegion="polite"
          style={{
            color: colors.muted,
            fontFamily: getFontFamily("regular"),
            fontSize: typography.sizes.body,
            lineHeight: typography.lineHeights.body,
          }}
        >
          Rider profile and approval checks are not configured yet. Operational access remains
          unavailable.
        </Text>
        <View style={{ marginTop: spacing.xl }}>
          <RoutelyButton fullWidth label="Return to welcome" onPress={onReturnToWelcome} />
        </View>
      </View>
    </AuthScreenFrame>
  );
}
