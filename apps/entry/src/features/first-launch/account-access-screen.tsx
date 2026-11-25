import type { ReactElement } from "react";
import { Pressable, Text, View } from "react-native";
import { designTokens, getFontFamily } from "@routely/design-tokens";
import { RoutelyButton } from "@routely/ui-mobile";
import type { PublicExperience } from "./experience";
import { experienceDetails } from "./experience";
import { FirstLaunchFrame } from "./first-launch-frame";

const { colors, componentSizes, radius, spacing, typography } = designTokens;

interface AccountAccessScreenProps {
  experience: PublicExperience;
  message?: string;
  onBack: () => void;
  onSwitch: () => void;
  onLogin: () => void;
  onCreateAccount: () => void;
  onOpenPreview: () => void;
  onOpenDashboardPreview?: () => void;
  demoApk?: boolean;
}

function getAccessDescription(experience: PublicExperience): string {
  switch (experience) {
    case "rider":
      return "Continue with your phone number. Verification confirms number control, not rider approval.";
    case "agent":
      return "Agent access is provisioned or authorized through Routely operations.";
    case "owner":
      return "Owner authentication is not connected in this preview. No account is created.";
    case "customer":
      return "Customer authentication is not connected in this preview. No account is created.";
  }
}

export function AccountAccessScreen({
  experience,
  message,
  onBack,
  onSwitch,
  onLogin,
  onCreateAccount,
  onOpenPreview,
  onOpenDashboardPreview,
  demoApk = false,
}: AccountAccessScreenProps): ReactElement {
  const details = experienceDetails[experience];

  return (
    <FirstLaunchFrame
      leftLabel="Back"
      maxWidth={520}
      onLeftPress={onBack}
      onRightPress={onSwitch}
      rightLabel="Switch"
    >
      <View
        style={{
          alignItems: "stretch",
          flex: 1,
          justifyContent: "center",
          paddingBottom: spacing.xl,
        }}
      >
        <Text
          style={{
            color: colors.forest,
            fontFamily: getFontFamily("semibold"),
            fontSize: typography.sizes.eyebrow,
            fontWeight: typography.weights.semibold,
            letterSpacing: typography.letterSpacing.eyebrow,
          }}
        >
          {details.label}
        </Text>
        <Text
          accessibilityRole="header"
          style={{
            color: colors.charcoal,
            fontFamily: getFontFamily("bold"),
            fontSize: typography.sizes.heading,
            fontWeight: typography.weights.bold,
            lineHeight: typography.lineHeights.heading,
            marginTop: spacing.sm,
          }}
        >
          Welcome to Routely.
        </Text>
        <Text
          style={{
            color: colors.muted,
            fontFamily: getFontFamily("regular"),
            fontSize: typography.sizes.body,
            lineHeight: typography.lineHeights.body,
            marginTop: spacing.xs,
            maxWidth: 440,
          }}
        >
          {demoApk
            ? "Continue to the demo login. No account or operational access is created."
            : getAccessDescription(experience)}
        </Text>
        {experience === "agent" ? (
          <View
            style={{
              backgroundColor: colors.container,
              borderColor: colors.border,
              borderRadius: radius.card,
              borderWidth: componentSizes.borderWidth,
              marginTop: spacing.lg,
              maxWidth: 440,
              padding: spacing.md,
              width: "100%",
            }}
          >
            <Text
              style={{
                color: colors.charcoal,
                fontFamily: getFontFamily("medium"),
                fontSize: typography.sizes.label,
                fontWeight: typography.weights.medium,
                lineHeight: typography.lineHeights.supporting,
              }}
            >
              Selecting Agent does not create membership or grant permissions.
            </Text>
          </View>
        ) : null}
        <View
          style={{
            alignSelf: "stretch",
            gap: spacing.sm,
            marginTop: spacing.xl,
            maxWidth: 440,
            width: "100%",
          }}
        >
          <RoutelyButton fullWidth label="Log in" onPress={onLogin} />
          <RoutelyButton
            fullWidth
            label="Create account"
            onPress={onCreateAccount}
            variant="secondary"
          />
        </View>
        {demoApk ? null : experience === "rider" ? (
          <Text
            style={{
              color: colors.muted,
              fontFamily: getFontFamily("regular"),
              fontSize: typography.sizes.label,
              lineHeight: typography.lineHeights.supporting,
              marginTop: spacing.md,
            }}
          >
            Login uses your existing account. Registration and rider approval checks remain
            separate.
          </Text>
        ) : (
          <Pressable
            accessibilityRole="button"
            onPress={onOpenPreview}
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginTop: spacing.md,
              minHeight: componentSizes.touchTarget,
            }}
          >
            <Text
              style={{
                color: colors.forest,
                fontFamily: getFontFamily("semibold"),
                fontSize: typography.sizes.label,
                fontWeight: typography.weights.semibold,
              }}
            >
              Open {details.title.toLowerCase()} app preview
            </Text>
          </Pressable>
        )}
        {onOpenDashboardPreview ? (
          <View style={{ marginTop: spacing.md, maxWidth: 440 }}>
            <RoutelyButton
              fullWidth
              label="Open dashboard preview"
              onPress={onOpenDashboardPreview}
              variant="secondary"
            />
            <Text
              style={{
                color: colors.muted,
                fontFamily: getFontFamily("regular"),
                fontSize: typography.sizes.label,
                lineHeight: typography.lineHeights.supporting,
                marginTop: spacing.sm,
                textAlign: "center",
              }}
            >
              Preview only. No account or sign-in is created.
            </Text>
          </View>
        ) : null}
        {message ? (
          <Text
            accessibilityLiveRegion="polite"
            style={{
              color: colors.error,
              fontFamily: getFontFamily("medium"),
              fontSize: typography.sizes.label,
              lineHeight: typography.lineHeights.supporting,
              marginTop: spacing.md,
              textAlign: "center",
            }}
          >
            {message}
          </Text>
        ) : null}
        <Pressable
          accessibilityRole="button"
          onPress={onSwitch}
          style={{
            alignSelf: "center",
            justifyContent: "center",
            marginTop: spacing.lg,
            minHeight: 44,
          }}
        >
          <Text
            style={{
              color: colors.muted,
              fontFamily: getFontFamily("medium"),
              fontSize: typography.sizes.label,
              fontWeight: typography.weights.medium,
            }}
          >
            Switch experience
          </Text>
        </Pressable>
      </View>
    </FirstLaunchFrame>
  );
}
