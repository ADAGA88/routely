import type { ReactElement } from "react";
import { Text, View, useWindowDimensions } from "react-native";
import { designTokens, getFontFamily } from "@routely/design-tokens";
import { RoutelyButton } from "@routely/ui-mobile";
import { experienceDetails, type PublicExperience } from "./experience";
import { FirstLaunchFrame } from "./first-launch-frame";
import { RoleArtwork } from "./role-artwork";

const { colors, componentSizes, spacing, typography } = designTokens;

interface RoleWelcomeScreenProps {
  experience: PublicExperience;
  onContinue: () => void;
  onSwitch: () => void;
  onBack: () => void;
}

export function RoleWelcomeScreen({
  experience,
  onContinue,
  onSwitch,
  onBack,
}: RoleWelcomeScreenProps): ReactElement {
  const { width } = useWindowDimensions();
  const details = experienceDetails[experience];
  const wide = width >= designTokens.breakpoints.tablet;

  return (
    <FirstLaunchFrame
      leftLabel="Back"
      maxWidth={wide ? 980 : 560}
      onLeftPress={onBack}
      onRightPress={onSwitch}
      rightLabel="Switch"
    >
      <View
        style={{
          alignItems: wide ? "center" : "stretch",
          flex: 1,
          flexDirection: wide ? "row" : "column",
          gap: wide ? spacing.xl : spacing.lg,
          justifyContent: "center",
          paddingBottom: spacing.xl,
          paddingTop: wide ? spacing.lg : spacing.md,
        }}
      >
        <View style={{ alignSelf: "center" }}>
          <RoleArtwork experience={experience} />
        </View>
        <View style={{ flex: 1, maxWidth: wide ? 420 : undefined }}>
          <Text
            style={{
              color: colors.forest,
              fontFamily: getFontFamily("semibold"),
              fontSize: typography.sizes.eyebrow,
              fontWeight: typography.weights.semibold,
              letterSpacing: typography.letterSpacing.eyebrow,
              marginBottom: spacing.sm,
            }}
          >
            {details.label}
          </Text>
          <Text
            accessibilityRole="header"
            style={{
              color: colors.charcoal,
              fontFamily: getFontFamily("bold"),
              fontSize: typography.sizes.display,
              fontWeight: typography.weights.bold,
              letterSpacing: typography.letterSpacing.display,
              lineHeight: typography.lineHeights.compactHeading,
              maxWidth: componentSizes.welcomeHeadingMaxWidth,
            }}
          >
            {details.headline}
          </Text>
          <Text
            style={{
              color: colors.muted,
              fontFamily: getFontFamily("regular"),
              fontSize: typography.sizes.body,
              lineHeight: typography.lineHeights.body,
              marginTop: spacing.sm,
              maxWidth: componentSizes.welcomeDescriptionMaxWidth,
            }}
          >
            {details.supportingText}
          </Text>
          <View
            style={{
              alignSelf: "stretch",
              gap: spacing.sm,
              marginTop: spacing.xl,
              maxWidth: 440,
              width: "100%",
            }}
          >
            <RoutelyButton
              fullWidth
              label="Continue"
              onPress={onContinue}
              trailingIcon="arrowRight"
            />
            <RoutelyButton
              fullWidth
              label="Switch experience"
              onPress={onSwitch}
              variant="secondary"
            />
          </View>
        </View>
      </View>
    </FirstLaunchFrame>
  );
}
