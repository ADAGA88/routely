import { useState, type ReactElement } from "react";
import { Pressable, Text, View, useWindowDimensions } from "react-native";
import { designTokens, getFontFamily } from "@routely/design-tokens";
import { RoutelyButton, RoutelyIcon } from "@routely/ui-mobile";
import { useEntryPreferences } from "./entry-context";
import { FirstLaunchFrame } from "./first-launch-frame";
import { GeneralIntroArtwork } from "./general-intro-artwork";

const { colors, spacing, typography, radius, componentSizes } = designTokens;

const slides = [
  {
    title: "Ride with purpose.",
    description:
      "Join Routely as a rider and discover delivery opportunities when you're approved.",
  },
  {
    title: "Send with confidence.",
    description: "Connect with Routely to send and track the things that matter.",
  },
  {
    title: "Keep your fleet moving.",
    description: "Bring your motorcycles into the Routely ecosystem and keep activity in view.",
  },
] as const;

export function GeneralIntroScreen(): ReactElement {
  const { preferences, setGeneralIntroStep, completeGeneralIntro } = useEntryPreferences();
  const { width, height } = useWindowDimensions();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string>();
  const step = preferences.generalIntroStep;
  const slide = slides[step]!;
  const artworkSize = Math.min(width - spacing.xl * 2, height * 0.38, 340);

  async function changeStep(nextStep: number): Promise<void> {
    if (pending) return;
    setPending(true);
    setError(undefined);
    try {
      if (nextStep === slides.length) {
        await completeGeneralIntro();
      } else {
        await setGeneralIntroStep(nextStep);
      }
    } catch {
      setError("Your progress could not be saved. Check storage access and try again.");
    } finally {
      setPending(false);
    }
  }

  return (
    <FirstLaunchFrame maxWidth={520} showHeader={false}>
      <View style={{ flex: 1, paddingBottom: spacing.lg }}>
        <View style={{ minHeight: componentSizes.touchTarget }}>
          {step > 0 ? (
            <Pressable
              accessibilityLabel="Previous slide"
              accessibilityRole="button"
              disabled={pending}
              onPress={() => void changeStep(step - 1)}
              style={{
                alignItems: "center",
                alignSelf: "flex-start",
                justifyContent: "center",
                minHeight: componentSizes.touchTarget,
                minWidth: componentSizes.touchTarget,
              }}
            >
              <RoutelyIcon name="arrowLeft" />
            </Pressable>
          ) : null}
        </View>
        <View
          style={{
            alignItems: "center",
            flexGrow: 1,
            justifyContent: "center",
            paddingVertical: spacing.md,
          }}
        >
          <View
            accessibilityElementsHidden
            importantForAccessibility="no-hide-descendants"
            style={{ height: artworkSize, width: artworkSize }}
          >
            <GeneralIntroArtwork step={step} />
          </View>
          <Text
            accessibilityRole="header"
            style={{
              color: colors.charcoal,
              fontFamily: getFontFamily("bold"),
              fontSize: typography.sizes.heading,
              lineHeight: typography.lineHeights.heading,
              marginTop: spacing.lg,
              textAlign: "center",
            }}
          >
            {slide.title}
          </Text>
          <Text
            style={{
              color: colors.charcoal,
              fontFamily: getFontFamily("regular"),
              fontSize: typography.sizes.body,
              lineHeight: typography.lineHeights.body,
              marginTop: spacing.sm,
              maxWidth: 400,
              textAlign: "center",
            }}
          >
            {slide.description}
          </Text>
        </View>
        {error ? (
          <Text
            accessibilityLiveRegion="polite"
            style={{
              color: colors.error,
              fontFamily: getFontFamily("medium"),
              marginBottom: spacing.md,
              textAlign: "center",
            }}
          >
            {error}
          </Text>
        ) : null}
        <RoutelyButton
          fullWidth
          label={step === slides.length - 1 ? "Get started" : "Next"}
          loading={pending}
          onPress={() => void changeStep(step + 1)}
        />
        <View
          accessibilityLabel={`Slide ${step + 1} of ${slides.length}`}
          accessibilityRole="progressbar"
          accessibilityValue={{ min: 1, max: slides.length, now: step + 1 }}
          style={{
            alignItems: "center",
            flexDirection: "row",
            gap: spacing.sm,
            justifyContent: "center",
            marginTop: spacing.lg,
          }}
        >
          {slides.map((item, index) => (
            <View
              key={item.title}
              style={{
                backgroundColor: index === step ? colors.forest : colors.border,
                borderRadius: radius.pill,
                height: spacing.sm,
                width: index === step ? spacing.lg : spacing.sm,
              }}
            />
          ))}
        </View>
      </View>
    </FirstLaunchFrame>
  );
}
