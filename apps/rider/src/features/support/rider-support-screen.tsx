import type { ReactElement } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { designTokens, getFontFamily } from "@routely/design-tokens";
import {
  PageContainer,
  RoutelyIcon,
  useAppearance,
  type RoutelyIconName,
} from "@routely/ui-mobile";

const { colors, componentSizes, radius, shadows, spacing, typography } = designTokens;

const supportTopics: {
  description: string;
  icon: RoutelyIconName;
  label: string;
  route: "/report-delivery-issue" | "/delivery-proof" | "/verification" | "/earnings";
  title: string;
}[] = [
  {
    description: "Preview the delivery issue reporting flow.",
    icon: "package",
    label: "Report an issue",
    route: "/report-delivery-issue",
    title: "Delivery help",
  },
  {
    description: "Review the available proof options.",
    icon: "clipboardList",
    label: "View proof options",
    route: "/delivery-proof",
    title: "Proof of delivery",
  },
  {
    description: "View account status and verification areas.",
    icon: "shield",
    label: "Open verification",
    route: "/verification",
    title: "Account & verification",
  },
  {
    description: "See the rider earnings and wallet preview.",
    icon: "wallet",
    label: "View earnings",
    route: "/earnings",
    title: "Earnings & wallet",
  },
];

export function RiderSupportScreen(): ReactElement {
  const router = useRouter();
  const { mode } = useAppearance();
  const accent = designTokens.appearance[mode];

  return (
    <View style={{ backgroundColor: colors.white, flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: spacing.xl }}>
        <PageContainer maxWidth={720}>
          <View
            style={{
              alignItems: "center",
              flexDirection: "row",
              gap: spacing.sm,
              marginTop: spacing.sm,
            }}
          >
            <Pressable
              accessibilityLabel="Go back"
              accessibilityRole="button"
              onPress={() => (router.canGoBack() ? router.back() : router.replace("/dashboard"))}
              style={{
                alignItems: "center",
                backgroundColor: colors.container,
                borderRadius: radius.pill,
                height: componentSizes.touchTarget,
                justifyContent: "center",
                width: componentSizes.touchTarget,
              }}
            >
              <RoutelyIcon color={colors.forest} name="arrowLeft" />
            </Pressable>
            <View style={{ flex: 1 }}>
              <Text
                accessibilityRole="header"
                style={{
                  color: colors.charcoal,
                  fontFamily: getFontFamily("bold"),
                  fontSize: typography.sizes.heading,
                  lineHeight: typography.lineHeights.heading,
                }}
              >
                Support &amp; safety
              </Text>
              <Text
                style={{
                  color: colors.forest,
                  fontFamily: getFontFamily("regular"),
                  fontSize: typography.sizes.caption,
                  marginTop: spacing.xs,
                }}
              >
                Help and rider guidance in one place.
              </Text>
            </View>
          </View>

          <View
            style={{
              backgroundColor: accent.primary,
              borderRadius: radius.panel,
              marginTop: spacing.lg,
              overflow: "hidden",
              padding: spacing.lg,
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
                  name="shieldCheck"
                  size={componentSizes.iconLarge}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    color: accent.onPrimary,
                    fontFamily: getFontFamily("medium"),
                    fontSize: typography.sizes.caption,
                    letterSpacing: typography.letterSpacing.brand,
                  }}
                >
                  RIDER CARE
                </Text>
                <Text
                  style={{
                    color: accent.onPrimary,
                    fontFamily: getFontFamily("bold"),
                    fontSize: typography.sizes.sectionHeading,
                    lineHeight: typography.lineHeights.sectionHeading,
                    marginTop: spacing.xs,
                  }}
                >
                  Find the right help.
                </Text>
              </View>
            </View>
            <Text
              style={{
                color: accent.onPrimary,
                fontFamily: getFontFamily("regular"),
                fontSize: typography.sizes.label,
                lineHeight: typography.lineHeights.supporting,
                marginTop: spacing.md,
              }}
            >
              Browse rider support topics and preview the help available in Routely.
            </Text>
          </View>

          <View
            style={{
              alignItems: "center",
              backgroundColor: colors.container,
              borderRadius: radius.card,
              flexDirection: "row",
              gap: spacing.md,
              marginTop: spacing.lg,
              padding: spacing.md,
            }}
          >
            <View
              style={{
                alignItems: "center",
                backgroundColor: colors.white,
                borderRadius: radius.pill,
                height: componentSizes.touchTarget,
                justifyContent: "center",
                width: componentSizes.touchTarget,
              }}
            >
              <RoutelyIcon color={colors.forest} name="mail" />
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  color: colors.charcoal,
                  fontFamily: getFontFamily("semibold"),
                  fontSize: typography.sizes.label,
                }}
              >
                Contact support
              </Text>
              <Text
                style={{
                  color: colors.forest,
                  fontFamily: getFontFamily("regular"),
                  fontSize: typography.sizes.caption,
                  lineHeight: typography.lineHeights.supporting,
                  marginTop: spacing.xs,
                }}
              >
                Support channels are not connected yet.
              </Text>
            </View>
            <Pressable
              accessibilityLabel="Contact support. Support channels are not connected yet."
              accessibilityRole="button"
              accessibilityState={{ disabled: true }}
              disabled
              style={{
                alignItems: "center",
                backgroundColor: colors.white,
                borderRadius: radius.pill,
                justifyContent: "center",
                minHeight: componentSizes.touchTarget,
                paddingHorizontal: spacing.md,
              }}
            >
              <Text
                style={{
                  color: colors.muted,
                  fontFamily: getFontFamily("semibold"),
                  fontSize: typography.sizes.caption,
                }}
              >
                Unavailable
              </Text>
            </Pressable>
          </View>

          <View
            style={{
              alignItems: "flex-start",
              borderColor: colors.border,
              borderRadius: radius.card,
              borderWidth: componentSizes.borderWidth,
              flexDirection: "row",
              gap: spacing.md,
              marginTop: spacing.md,
              padding: spacing.md,
            }}
          >
            <RoutelyIcon color={colors.forest} name="shield" size={componentSizes.icon} />
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  color: colors.charcoal,
                  fontFamily: getFontFamily("semibold"),
                  fontSize: typography.sizes.label,
                }}
              >
                Immediate safety concern?
              </Text>
              <Text
                style={{
                  color: colors.forest,
                  fontFamily: getFontFamily("regular"),
                  fontSize: typography.sizes.caption,
                  lineHeight: typography.lineHeights.supporting,
                  marginTop: spacing.xs,
                }}
              >
                Contact local emergency services directly. This preview cannot place emergency
                calls.
              </Text>
            </View>
          </View>

          <View
            style={{
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: spacing.xl,
            }}
          >
            <View>
              <Text
                accessibilityRole="header"
                style={{
                  color: colors.charcoal,
                  fontFamily: getFontFamily("semibold"),
                  fontSize: typography.sizes.sectionHeading,
                  lineHeight: typography.lineHeights.sectionHeading,
                }}
              >
                Browse help topics
              </Text>
              <Text
                style={{
                  color: colors.muted,
                  fontFamily: getFontFamily("regular"),
                  fontSize: typography.sizes.caption,
                  marginTop: spacing.xs,
                }}
              >
                Choose an area to explore.
              </Text>
            </View>
            <View
              style={{
                alignItems: "center",
                backgroundColor: colors.container,
                borderRadius: radius.pill,
                height: componentSizes.touchTarget,
                justifyContent: "center",
                width: componentSizes.touchTarget,
              }}
            >
              <RoutelyIcon color={colors.forest} name="clipboardList" />
            </View>
          </View>

          <View style={{ gap: spacing.sm, marginTop: spacing.md }}>
            {supportTopics.map((topic) => (
              <Pressable
                accessibilityLabel={`${topic.label}`}
                accessibilityRole="button"
                key={topic.title}
                onPress={() => router.push(topic.route)}
                style={{
                  alignItems: "center",
                  backgroundColor: colors.white,
                  borderColor: colors.border,
                  borderRadius: radius.card,
                  borderWidth: componentSizes.borderWidth,
                  flexDirection: "row",
                  gap: spacing.md,
                  minHeight: componentSizes.buttonHeight,
                  padding: spacing.md,
                  ...shadows.card,
                }}
              >
                <View
                  style={{
                    alignItems: "center",
                    backgroundColor: colors.container,
                    borderRadius: radius.lg,
                    height: componentSizes.buttonHeight,
                    justifyContent: "center",
                    width: componentSizes.buttonHeight,
                  }}
                >
                  <RoutelyIcon color={colors.forest} name={topic.icon} size={componentSizes.icon} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      color: colors.charcoal,
                      fontFamily: getFontFamily("semibold"),
                      fontSize: typography.sizes.label,
                    }}
                  >
                    {topic.title}
                  </Text>
                  <Text
                    style={{
                      color: colors.forest,
                      fontFamily: getFontFamily("regular"),
                      fontSize: typography.sizes.caption,
                      lineHeight: typography.lineHeights.supporting,
                      marginTop: spacing.xs,
                    }}
                  >
                    {topic.description}
                  </Text>
                </View>
                <RoutelyIcon
                  color={colors.muted}
                  name="arrowRight"
                  size={componentSizes.iconSmall}
                />
              </Pressable>
            ))}
          </View>

          <Text
            style={{
              color: colors.muted,
              fontFamily: getFontFamily("regular"),
              fontSize: typography.sizes.caption,
              lineHeight: typography.lineHeights.supporting,
              marginTop: spacing.lg,
              textAlign: "center",
            }}
          >
            Support messaging and emergency assistance are not connected in this preview.
          </Text>
        </PageContainer>
      </ScrollView>
    </View>
  );
}
