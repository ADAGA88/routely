import { useEffect, useState, type ReactElement } from "react";
import { BackHandler, Pressable, Text, View } from "react-native";
import { designTokens, getFontFamily } from "@routely/design-tokens";
import { RoutelyButton, RoutelyIcon, useAppearance } from "@routely/ui-mobile";
import { AuthScreenFrame } from "../auth/auth-screen-frame";

const { colors, componentSizes, radius, shadows, spacing, typography } = designTokens;

const bikeOptions = [
  { value: "have", label: "I have a bike", description: "I already have a motorcycle to use." },
  { value: "need", label: "I need a bike", description: "I'd like to explore motorcycle options." },
] as const;
const financeOptions = [
  {
    value: "yes",
    label: "Yes, I'm interested",
    description: "I'd like to learn about hire purchase.",
  },
  { value: "no", label: "Not right now", description: "I'm not interested in hire purchase." },
] as const;

type BikeChoice = (typeof bikeOptions)[number]["value"];
type FinanceChoice = (typeof financeOptions)[number]["value"];

export function BikePreferencesScreen({ onExit }: { onExit: () => void }): ReactElement {
  const { mode } = useAppearance();
  const accent = designTokens.appearance[mode];
  const [step, setStep] = useState<0 | 1 | 2>(0);
  const [bikeChoice, setBikeChoice] = useState<BikeChoice | null>(null);
  const [financeChoice, setFinanceChoice] = useState<FinanceChoice | null>(null);

  useEffect(() => {
    const subscription = BackHandler.addEventListener("hardwareBackPress", () => {
      if (step === 2) {
        setStep(1);
        return true;
      }
      if (step === 1) {
        setStep(0);
        return true;
      }
      return false;
    });
    return () => subscription.remove();
  }, [step]);

  function goBack() {
    if (step === 2) setStep(1);
    else if (step === 1) setStep(0);
    else onExit();
  }

  const title =
    step === 0
      ? "Do you have a bike?"
      : step === 1
        ? "Interested in hire purchase?"
        : "Your choices";
  const description =
    step === 0
      ? "Choose the option that fits your motorcycle situation."
      : step === 1
        ? "Choose whether you're interested. Terms are not available yet."
        : "Review your selections before leaving this screen.";

  return (
    <AuthScreenFrame description={description} onBack={goBack} title={title}>
      <View
        style={{
          backgroundColor: accent.primary,
          borderRadius: radius.panel,
          overflow: "hidden",
          padding: spacing.md,
          ...shadows.card,
        }}
      >
        <View
          pointerEvents="none"
          style={{
            borderColor: accent.onPrimary,
            borderRadius: radius.pill,
            borderWidth: spacing.md,
            height: spacing["3xl"] * 2,
            opacity: 0.1,
            position: "absolute",
            right: -spacing.md,
            top: -spacing["3xl"],
            width: spacing["3xl"] * 2,
          }}
        />
        <View style={{ alignItems: "center", flexDirection: "row", gap: spacing.md }}>
          <View
            style={{
              alignItems: "center",
              backgroundColor: accent.onPrimary,
              borderRadius: radius.lg,
              height: componentSizes.buttonHeight,
              justifyContent: "center",
              width: componentSizes.buttonHeight,
            }}
          >
            <RoutelyIcon
              color={accent.primary}
              name={step === 1 ? "wallet" : "motorcycle"}
              size={componentSizes.iconLarge}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                color: accent.onPrimary,
                fontFamily: getFontFamily("semibold"),
                fontSize: typography.sizes.caption,
                letterSpacing: typography.letterSpacing.brand,
              }}
            >
              MOTORCYCLE PREFERENCES
            </Text>
            <Text
              style={{
                color: accent.onPrimary,
                fontFamily: getFontFamily("bold"),
                fontSize: typography.sizes.cardHeading,
                lineHeight: typography.lineHeights.cardHeading,
                marginTop: spacing.xs,
              }}
            >
              Step {step + 1} of 3
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", gap: spacing.xs, marginTop: spacing.md }}>
          {[0, 1, 2].map((item) => (
            <View
              key={item}
              style={{
                backgroundColor: accent.onPrimary,
                borderRadius: radius.pill,
                flex: 1,
                height: spacing.xs,
                opacity: item <= step ? 1 : 0.25,
              }}
            />
          ))}
        </View>
      </View>
      <View
        style={{
          alignItems: "flex-start",
          backgroundColor: colors.background,
          borderRadius: radius.md,
          flexDirection: "row",
          gap: spacing.sm,
          marginTop: spacing.md,
          padding: spacing.md,
        }}
      >
        <RoutelyIcon color={colors.forest} name="shield" size={componentSizes.iconSmall} />
        <Text
          style={{
            color: colors.forest,
            flex: 1,
            fontFamily: getFontFamily("regular"),
            fontSize: typography.sizes.caption,
            lineHeight: typography.lineHeights.footnote,
          }}
        >
          Choices are not saved or sent and do not submit a bike or financing request.
        </Text>
      </View>

      {step === 2 ? (
        <View
          style={{
            backgroundColor: colors.container,
            borderRadius: radius.card,
            gap: spacing.sm,
            marginTop: spacing.lg,
            padding: spacing.lg,
          }}
        >
          {[
            {
              icon: "motorcycle" as const,
              label: "Motorcycle access",
              value: bikeOptions.find((option) => option.value === bikeChoice)?.label,
            },
            {
              icon: "wallet" as const,
              label: "Hire purchase interest",
              value: financeChoice === "yes" ? "Interested" : "Not interested",
            },
          ].map((item) => (
            <View
              key={item.label}
              style={{
                alignItems: "center",
                backgroundColor: colors.white,
                borderRadius: radius.card,
                flexDirection: "row",
                gap: spacing.md,
                padding: spacing.md,
              }}
            >
              <View
                style={{
                  alignItems: "center",
                  backgroundColor: accent.primary,
                  borderRadius: radius.lg,
                  height: componentSizes.buttonHeight,
                  justifyContent: "center",
                  width: componentSizes.buttonHeight,
                }}
              >
                <RoutelyIcon color={accent.onPrimary} name={item.icon} />
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    color: colors.forest,
                    fontFamily: getFontFamily("medium"),
                    fontSize: typography.sizes.caption,
                  }}
                >
                  {item.label}
                </Text>
                <Text
                  style={{
                    color: colors.charcoal,
                    fontFamily: getFontFamily("semibold"),
                    fontSize: typography.sizes.label,
                    marginTop: spacing.xs,
                  }}
                >
                  {item.value}
                </Text>
              </View>
            </View>
          ))}
        </View>
      ) : (
        <View
          accessibilityLabel={title}
          accessibilityRole="radiogroup"
          style={{
            backgroundColor: colors.container,
            borderRadius: radius.panel,
            gap: spacing.sm,
            marginTop: spacing.lg,
            padding: spacing.md,
          }}
        >
          {(step === 0 ? bikeOptions : financeOptions).map((option) => {
            const selected =
              step === 0 ? bikeChoice === option.value : financeChoice === option.value;
            return (
              <Pressable
                accessibilityRole="radio"
                accessibilityState={{ checked: selected }}
                aria-checked={selected}
                key={option.value}
                onPress={() => {
                  if (option.value === "have" || option.value === "need") {
                    setBikeChoice(option.value);
                  } else {
                    setFinanceChoice(option.value);
                  }
                }}
                style={{
                  alignItems: "center",
                  backgroundColor: colors.white,
                  borderColor: selected ? accent.primary : colors.border,
                  borderRadius: radius.card,
                  borderWidth: componentSizes.borderWidth * 2,
                  flexDirection: "row",
                  gap: spacing.md,
                  minHeight: componentSizes.buttonHeight,
                  padding: spacing.md,
                }}
              >
                <View
                  style={{
                    alignItems: "center",
                    backgroundColor: selected ? accent.primary : colors.container,
                    borderRadius: radius.lg,
                    height: componentSizes.buttonHeight,
                    justifyContent: "center",
                    width: componentSizes.buttonHeight,
                  }}
                >
                  <RoutelyIcon
                    color={selected ? accent.onPrimary : colors.forest}
                    name={step === 0 ? "motorcycle" : "wallet"}
                    size={componentSizes.iconLarge}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      color: colors.charcoal,
                      fontFamily: getFontFamily("semibold"),
                      fontSize: typography.sizes.label,
                    }}
                  >
                    {option.label}
                  </Text>
                  <Text
                    style={{
                      color: colors.forest,
                      fontFamily: getFontFamily("regular"),
                      fontSize: typography.sizes.caption,
                      lineHeight: typography.lineHeights.footnote,
                      marginTop: spacing.xs,
                    }}
                  >
                    {option.description}
                  </Text>
                </View>
                <View
                  style={{
                    alignItems: "center",
                    borderColor: selected ? accent.primary : colors.forest,
                    borderRadius: radius.pill,
                    borderWidth: componentSizes.borderWidth * 2,
                    height: componentSizes.icon,
                    justifyContent: "center",
                    width: componentSizes.icon,
                  }}
                >
                  {selected ? (
                    <View
                      style={{
                        backgroundColor: accent.primary,
                        borderRadius: radius.pill,
                        height: spacing.sm,
                        width: spacing.sm,
                      }}
                    />
                  ) : null}
                </View>
              </Pressable>
            );
          })}
        </View>
      )}
      <View style={{ marginTop: spacing.xl }}>
        <RoutelyButton
          disabled={(step === 0 && !bikeChoice) || (step === 1 && !financeChoice)}
          fullWidth
          label={step === 2 ? "Done (not saved)" : "Continue"}
          onPress={() => {
            if (step === 0 && bikeChoice) setStep(1);
            else if (step === 1 && financeChoice) setStep(2);
            else if (step === 2) onExit();
          }}
        />
      </View>
    </AuthScreenFrame>
  );
}
