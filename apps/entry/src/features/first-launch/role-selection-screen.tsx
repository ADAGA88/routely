import { useState, type ReactElement } from "react";
import { Image, Text, View, useWindowDimensions } from "react-native";
import roleIllustration from "../../../assets/illustrations/routely-role-selection-illustration.png";
import { designTokens, getFontFamily } from "@routely/design-tokens";
import { RoleSelectionItem, RoutelyButton } from "@routely/ui-mobile";
import { experienceDetails, publicExperiences, type PublicExperience } from "./experience";
import { FirstLaunchFrame } from "./first-launch-frame";

const { colors, spacing, typography } = designTokens;

interface RoleSelectionScreenProps {
  error?: string;
  onContinue: (experience: PublicExperience) => Promise<void>;
}

export function RoleSelectionScreen({ error, onContinue }: RoleSelectionScreenProps): ReactElement {
  const { height, width } = useWindowDimensions();
  const [selectedExperience, setSelectedExperience] = useState<PublicExperience | null>(null);
  const [pending, setPending] = useState(false);
  const compact = height < 700 || width < 380;
  const illustrationWidth = Math.min(width - spacing.lg * 2, compact ? 420 : 480);

  async function continueSelection(): Promise<void> {
    if (!selectedExperience || pending) {
      return;
    }
    setPending(true);
    try {
      await onContinue(selectedExperience);
    } finally {
      setPending(false);
    }
  }

  return (
    <FirstLaunchFrame maxWidth={560}>
      <View
        style={{
          alignItems: "stretch",
          justifyContent: "flex-start",
          flexGrow: 1,
          paddingBottom: spacing.lg,
          paddingTop: compact ? spacing.xs : spacing.sm,
        }}
      >
        <View
          style={{
            alignSelf: "center",
            aspectRatio: 1229 / 850,
            marginBottom: compact ? spacing.sm : spacing.md,
            maxWidth: 480,
            width: illustrationWidth,
          }}
        >
          <Image
            accessibilityLabel="Routely delivery ecosystem with a customer, rider and delivery van"
            accessible
            resizeMode="contain"
            source={roleIllustration}
            style={{ height: "100%", width: "100%" }}
          />
        </View>
        <Text
          accessibilityRole="header"
          style={{
            color: colors.charcoal,
            fontFamily: getFontFamily("bold"),
            fontSize: typography.sizes.sectionHeading,
            fontWeight: typography.weights.bold,
            lineHeight: typography.lineHeights.compactHeading,
          }}
        >
          Choose your experience.
        </Text>
        <Text
          style={{
            color: colors.muted,
            fontFamily: getFontFamily("regular"),
            fontSize: typography.sizes.body,
            lineHeight: typography.lineHeights.body,
            marginTop: spacing.xs,
          }}
        >
          What brings you to Routely?
        </Text>
        <View
          accessibilityRole="radiogroup"
          style={{
            gap: compact ? spacing.sm : spacing.md,
            marginTop: compact ? spacing.md : spacing.lg,
          }}
        >
          {publicExperiences.map((experience) => {
            const details = experienceDetails[experience];
            const selected = selectedExperience === experience;
            return (
              <RoleSelectionItem
                compact={compact}
                description={details.description}
                icon={details.icon}
                key={experience}
                label={details.label}
                onSelect={() => setSelectedExperience(experience)}
                selected={selected}
                surfaceTone={experience === "customer" || experience === "owner" ? "lime" : "white"}
              />
            );
          })}
        </View>
        {error ? (
          <Text
            accessibilityLiveRegion="polite"
            style={{
              color: colors.error,
              fontFamily: getFontFamily("medium"),
              fontSize: typography.sizes.label,
              marginTop: spacing.md,
            }}
          >
            {error}
          </Text>
        ) : null}
        <View style={{ alignSelf: "stretch", marginTop: compact ? spacing.md : spacing.lg }}>
          <RoutelyButton
            disabled={!selectedExperience || pending}
            fullWidth
            label={pending ? "Saving…" : "Continue"}
            onPress={() => void continueSelection()}
            style={{ opacity: selectedExperience ? 1 : 0.45 }}
            trailingIcon="arrowRight"
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
            Choosing an experience does not grant account access.
          </Text>
        </View>
      </View>
    </FirstLaunchFrame>
  );
}
