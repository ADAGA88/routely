import { useEffect, useRef, useState, type ReactElement } from "react";
import { Animated, Platform, Pressable, Text, View, useWindowDimensions } from "react-native";
import { designTokens, getFontFamily } from "@routely/design-tokens";
import { RoutelyButton, RoutelyIcon } from "@routely/ui-mobile";
import { experienceDetails, introductorySteps, type PublicExperience } from "./experience";
import { FirstLaunchFrame } from "./first-launch-frame";
import { RoleArtwork } from "./role-artwork";

const { colors, componentSizes, radius, spacing, typography } = designTokens;

interface IntroductoryOnboardingScreenProps {
  experience: PublicExperience;
  onComplete: () => Promise<void>;
  onBack: () => void;
  onSwitch: () => void;
  error?: string;
}

export function IntroductoryOnboardingScreen({
  experience,
  onComplete,
  onBack,
  onSwitch,
  error,
}: IntroductoryOnboardingScreenProps): ReactElement {
  const { width } = useWindowDimensions();
  const [stepIndex, setStepIndex] = useState(0);
  const [pending, setPending] = useState(false);
  const slideTransition = useRef(new Animated.Value(1)).current;
  const steps = introductorySteps[experience];
  const step = steps[stepIndex]!;
  const details = experienceDetails[experience];
  const wide = width >= designTokens.breakpoints.tablet;

  useEffect(() => {
    slideTransition.setValue(0.7);
    const animation = Animated.timing(slideTransition, {
      toValue: 1,
      duration: designTokens.motion.standard,
      useNativeDriver: Platform.OS !== "web",
    });
    animation.start();
    return () => animation.stop();
  }, [slideTransition, stepIndex]);

  async function finish(): Promise<void> {
    if (pending) {
      return;
    }
    setPending(true);
    try {
      await onComplete();
    } finally {
      setPending(false);
    }
  }

  return (
    <FirstLaunchFrame
      leftLabel={stepIndex > 0 ? "Back" : "Welcome"}
      maxWidth={wide ? 980 : 560}
      onLeftPress={() => {
        if (stepIndex > 0) {
          setStepIndex((current) => current - 1);
        } else {
          onBack();
        }
      }}
      onRightPress={() => void finish()}
      rightLabel="Skip"
    >
      <View
        style={{
          alignItems: wide ? "center" : "stretch",
          flex: 1,
          flexDirection: wide ? "row" : "column",
          gap: wide ? spacing.xl : spacing.lg,
          justifyContent: "center",
          paddingBottom: spacing.xl,
          paddingTop: spacing.md,
        }}
      >
        <View style={{ alignSelf: "center" }}>
          <RoleArtwork experience={experience} />
        </View>
        <View style={{ flex: 1, maxWidth: wide ? 420 : undefined }}>
          <Animated.View
            style={{
              opacity: slideTransition,
              transform: [
                {
                  translateY: slideTransition.interpolate({
                    inputRange: [0.7, 1],
                    outputRange: [6, 0],
                  }),
                },
              ],
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
              {details.label} · STEP {stepIndex + 1} OF {steps.length}
            </Text>
            <View
              accessibilityLabel={`Step ${stepIndex + 1} of ${steps.length}`}
              accessibilityRole="progressbar"
              style={{
                flexDirection: "row",
                gap: spacing.xs,
                marginTop: spacing.md,
                maxWidth: 440,
                width: "100%",
              }}
            >
              {steps.map((item, index) => (
                <View
                  key={item.title}
                  style={{
                    backgroundColor: index <= stepIndex ? colors.forest : colors.border,
                    borderRadius: radius.pill,
                    flex: 1,
                    height: componentSizes.indicator,
                  }}
                />
              ))}
            </View>
            <View
              style={{
                alignItems: "center",
                alignSelf: "flex-start",
                backgroundColor: colors.container,
                borderRadius: radius.iconContainer,
                height: 48,
                justifyContent: "center",
                marginTop: spacing.xl,
                width: 48,
              }}
            >
              <RoutelyIcon color={colors.forest} name={step.icon} size={componentSizes.iconLarge} />
            </View>
            <Text
              accessibilityRole="header"
              style={{
                color: colors.charcoal,
                fontFamily: getFontFamily("bold"),
                fontSize: typography.sizes.heading,
                fontWeight: typography.weights.bold,
                lineHeight: typography.lineHeights.heading,
                marginTop: spacing.md,
              }}
            >
              {step.title}
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
              {step.description}
            </Text>
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
            <View
              style={{
                alignSelf: "stretch",
                marginTop: spacing.xl,
                maxWidth: 440,
                width: "100%",
              }}
            >
              <RoutelyButton
                disabled={pending}
                fullWidth
                label={
                  pending
                    ? "Saving…"
                    : stepIndex === steps.length - 1
                      ? "Continue to account access"
                      : "Continue"
                }
                onPress={() => {
                  if (stepIndex === steps.length - 1) {
                    void finish();
                  } else {
                    setStepIndex((current) => current + 1);
                  }
                }}
                trailingIcon={stepIndex === steps.length - 1 ? undefined : "arrowRight"}
              />
            </View>
            <Pressable
              accessibilityRole="button"
              onPress={onSwitch}
              style={{
                alignSelf: "center",
                justifyContent: "center",
                marginTop: spacing.md,
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
          </Animated.View>
        </View>
      </View>
    </FirstLaunchFrame>
  );
}
