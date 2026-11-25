import { useEffect, useRef, useState, type ReactElement } from "react";
import {
  AccessibilityInfo,
  Animated,
  Easing,
  Image,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { designTokens, getFontFamily } from "@routely/design-tokens";
import { PageContainer, RoutelyIcon, useAppearance } from "@routely/ui-mobile";
import deliveryRequestArtwork from "@routely/brand-assets/delivery-request-sample.png";
import riderAvatarExample from "@routely/brand-assets/rider-avatar-reference.png";
import { requestPreview } from "../delivery-request/request-preview";
import { earningsPreview } from "../earnings/earnings-preview";
import { DashboardHeader } from "./dashboard-header";
import { DashboardIllustration, type DashboardIllustrationName } from "./dashboard-illustrations";
import { DashboardNavigation } from "./dashboard-navigation";
import { SupportCard, TodaySummaryPreview } from "./dashboard-overview";
import { RecentActivity } from "./recent-activity";
import { BikeOpportunityCard } from "../bikes/bike-opportunity-card";
import type { activeDeliveryPreview } from "../active-delivery/active-delivery-preview";

const { colors, componentSizes, radius, shadows, spacing, typography } = designTokens;

interface QuickAction {
  illustration: DashboardIllustrationName;
  label: string;
}

const quickActions: QuickAction[] = [
  { illustration: "delivery", label: "Deliveries" },
  { illustration: "earnings", label: "Earnings" },
  { illustration: "verification", label: "Verification" },
  { illustration: "support", label: "Support" },
  { illustration: "requests", label: "Delivery requests" },
  { illustration: "profile", label: "Profile" },
];

const examplePerformance = [
  { day: "Mon", height: 32 },
  { day: "Tue", height: 44 },
  { day: "Wed", height: 40 },
  { day: "Thu", height: 30 },
  { day: "Fri", height: 42 },
  { day: "Sat", height: 60 },
  { day: "Sun", height: 40 },
] as const;

function Caption({ children, color = colors.muted }: { children: string; color?: string }) {
  return (
    <Text
      style={{
        color,
        fontFamily: getFontFamily("regular"),
        fontSize: typography.sizes.label,
        lineHeight: typography.lineHeights.supporting,
      }}
    >
      {children}
    </Text>
  );
}

function SectionHeader({ title }: { title: string }): ReactElement {
  return (
    <View
      style={{
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: spacing.md,
      }}
    >
      <Text
        accessibilityRole="header"
        style={{
          color: colors.charcoal,
          fontFamily: getFontFamily("semibold"),
          fontSize: typography.sizes.sectionHeading,
          lineHeight: typography.lineHeights.sectionHeading,
        }}
      >
        {title}
      </Text>
    </View>
  );
}

export function DashboardScreen({
  onOpenRequest,
  onOpenDeliveries,
  onOpenBikes,
  onOpenDeliveryHistory,
  onOpenHistoryDetail,
  onOpenEarnings,
  onOpenProfile,
  onOpenSupport,
  onOpenVerification,
  onOpenDeliveryRequests,
  onOpenCurrentDelivery,
  onOpenTopUp,
  currentDelivery,
}: {
  currentDelivery: typeof activeDeliveryPreview | null;
  onOpenRequest: () => void;
  onOpenDeliveries: () => void;
  onOpenBikes: () => void;
  onOpenDeliveryHistory: () => void;
  onOpenHistoryDetail: (deliveryId: string) => void;
  onOpenEarnings: () => void;
  onOpenProfile: () => void;
  onOpenSupport: () => void;
  onOpenVerification: () => void;
  onOpenDeliveryRequests: () => void;
  onOpenCurrentDelivery: (hasDelivery: boolean) => void;
  onOpenTopUp: () => void;
}): ReactElement {
  const { mode } = useAppearance();
  const { width } = useWindowDimensions();
  const compact = width < 380;
  const accent = designTokens.appearance[mode];
  const [availability, setAvailability] = useState<"offline" | "online">("offline");
  const [reduceMotion, setReduceMotion] = useState(true);
  const bikeScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    let active = true;
    const subscription = AccessibilityInfo.addEventListener("reduceMotionChanged", setReduceMotion);
    void AccessibilityInfo.isReduceMotionEnabled()
      .then((enabled) => {
        if (active) setReduceMotion(enabled);
      })
      .catch(() => {
        console.warn("Could not read the reduced-motion preference.");
      });
    return () => {
      active = false;
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    bikeScale.setValue(1);
    if (reduceMotion) return;
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(bikeScale, {
          toValue: 1.04,
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: Platform.OS !== "web",
        }),
        Animated.timing(bikeScale, {
          toValue: 1,
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: Platform.OS !== "web",
        }),
      ]),
    );
    animation.start();
    return () => animation.stop();
  }, [bikeScale, reduceMotion]);

  return (
    <View style={{ backgroundColor: accent.primary, flex: 1 }}>
      <View style={{ backgroundColor: accent.primary, zIndex: 2, ...shadows.card }}>
        <DashboardHeader />
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{ flex: 1 }}>
        <PageContainer maxWidth={720} style={{ paddingBottom: spacing.xl + spacing.md }}>
          <View
            style={{
              alignItems: "center",
              flexDirection: "row",
              gap: spacing.md,
              paddingTop: spacing.md,
            }}
          >
            <View
              accessible
              accessibilityLabel="Example rider portrait, not your profile photo"
              style={{
                backgroundColor: colors.white,
                borderColor: colors.white,
                borderRadius: radius.pill,
                borderWidth: componentSizes.borderWidth * 2,
                height: compact ? 96 : 104,
                overflow: "hidden",
                width: compact ? 96 : 104,
              }}
            >
              <Image
                accessibilityElementsHidden
                importantForAccessibility="no-hide-descendants"
                resizeMode="cover"
                source={riderAvatarExample}
                style={{ height: "100%", width: "100%" }}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text
                accessibilityRole="header"
                style={{
                  color: accent.onPrimary,
                  fontFamily: getFontFamily("semibold"),
                  fontSize:
                    width < 340 ? typography.sizes.heading - spacing.xs : typography.sizes.heading,
                  lineHeight:
                    width < 340
                      ? typography.lineHeights.heading - spacing.xs
                      : typography.lineHeights.heading,
                }}
              >
                Hello, Rider!
              </Text>
              <Caption color={accent.onPrimary}>Your next ride starts here.</Caption>
            </View>
          </View>

          <View
            accessibilityRole="tablist"
            style={{
              backgroundColor: colors.white,
              borderRadius: radius.pill,
              flexDirection: "row",
              marginTop: spacing.lg,
              padding: 4,
              ...shadows.card,
            }}
          >
            {(["offline", "online"] as const).map((value) => {
              const selected = availability === value;
              return (
                <Pressable
                  accessibilityRole="tab"
                  accessibilityState={{ selected }}
                  key={value}
                  onPress={() => setAvailability(value)}
                  style={{
                    alignItems: "center",
                    backgroundColor: selected ? accent.primary : "transparent",
                    borderRadius: radius.pill,
                    flex: 1,
                    justifyContent: "center",
                    minHeight: componentSizes.buttonHeight - 8,
                  }}
                >
                  <Text
                    style={{
                      color: selected ? accent.onPrimary : colors.charcoal,
                      fontFamily: getFontFamily("semibold"),
                      fontSize: typography.sizes.button,
                    }}
                  >
                    {value === "offline" ? "Offline" : "Online"}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </PageContainer>

        <View
          style={{
            backgroundColor: colors.white,
            borderTopLeftRadius: radius.panel + 8,
            borderTopRightRadius: radius.panel + 8,
            flexGrow: 1,
            marginTop: -spacing.lg,
          }}
        >
          <PageContainer
            maxWidth={720}
            style={{ paddingBottom: spacing.xl, paddingTop: spacing.lg }}
          >
            {availability === "online" ? (
              <View
                accessibilityLiveRegion="polite"
                style={{
                  backgroundColor: colors.container,
                  borderRadius: radius.card,
                  marginBottom: spacing.lg,
                  padding: spacing.md,
                }}
              >
                <Caption>
                  Online mode is not connected. An approved rider profile is required for real
                  availability.
                </Caption>
              </View>
            ) : null}

            <View
              style={{
                backgroundColor: colors.white,
                borderColor: colors.border,
                borderRadius: radius.panel,
                borderWidth: componentSizes.borderWidth,
                flexDirection: "row",
                gap: spacing.md,
                padding: spacing.lg,
                ...shadows.card,
              }}
            >
              <View style={{ flex: 1, gap: spacing.md }}>
                <View style={{ alignItems: "center", flexDirection: "row", gap: spacing.sm }}>
                  <RoutelyIcon color={colors.muted} name="mapPin" size={componentSizes.iconSmall} />
                  <View>
                    <Caption>Current area</Caption>
                    <Text
                      style={{
                        color: colors.charcoal,
                        fontFamily: getFontFamily("semibold"),
                        fontSize: typography.sizes.body,
                      }}
                    >
                      Not set
                    </Text>
                  </View>
                </View>
                <Pressable
                  accessibilityLabel={
                    currentDelivery
                      ? "View sample active delivery"
                      : "View sample delivery requests"
                  }
                  accessibilityRole="button"
                  onPress={() => onOpenCurrentDelivery(currentDelivery !== null)}
                  style={{ alignItems: "center", flexDirection: "row", gap: spacing.sm }}
                >
                  <RoutelyIcon
                    color={colors.muted}
                    name="clipboardList"
                    size={componentSizes.iconSmall}
                  />
                  <View>
                    <Caption>Active delivery</Caption>
                    <Text
                      style={{
                        color: colors.charcoal,
                        fontFamily: getFontFamily("semibold"),
                        fontSize: typography.sizes.body,
                      }}
                    >
                      {currentDelivery ? "Sample in progress" : "No sample delivery"}
                    </Text>
                  </View>
                </Pressable>
              </View>
              <Pressable
                accessibilityLabel={
                  currentDelivery ? "View sample active delivery" : "View sample delivery requests"
                }
                accessibilityRole="button"
                onPress={() => onOpenCurrentDelivery(currentDelivery !== null)}
                style={{
                  alignItems: "center",
                  alignSelf: "center",
                  backgroundColor: accent.primary,
                  borderRadius: radius.xl,
                  height: 72,
                  justifyContent: "center",
                  width: 72,
                }}
              >
                <RoutelyIcon color={accent.onPrimary} name="bike" size={36} />
              </Pressable>
            </View>

            <View
              style={{
                backgroundColor: colors.white,
                borderRadius: radius.card,
                gap: spacing.sm,
                marginTop: spacing.lg,
                overflow: "hidden",
                padding: compact ? spacing.sm : spacing.md,
                ...shadows.card,
              }}
            >
              <View
                pointerEvents="none"
                style={{
                  backgroundColor: colors.lime,
                  bottom: 0,
                  left: 0,
                  opacity: 0.3,
                  position: "absolute",
                  right: 0,
                  top: 0,
                }}
              />
              <View style={{ alignItems: "center", flexDirection: "row", gap: spacing.xs }}>
                <View style={{ flex: 1, gap: spacing.sm }}>
                  <Pressable
                    accessibilityLabel={`View delivery request details. Pickup ${requestPreview.pickup}, drop ${requestPreview.drop}.`}
                    accessibilityRole="button"
                    onPress={onOpenRequest}
                    style={{ gap: spacing.sm }}
                  >
                    <View
                      style={{
                        alignItems: "center",
                        alignSelf: "flex-start",
                        backgroundColor: colors.lime,
                        borderRadius: radius.pill,
                        flexDirection: "row",
                        gap: spacing.sm,
                        paddingHorizontal: spacing.sm,
                        paddingVertical: spacing.xs,
                      }}
                    >
                      <View
                        style={{
                          backgroundColor: colors.forest,
                          borderRadius: radius.pill,
                          height: spacing.sm,
                          width: spacing.sm,
                        }}
                      />
                      <Text
                        style={{
                          color: colors.charcoal,
                          fontFamily: getFontFamily("medium"),
                          fontSize: typography.sizes.caption,
                        }}
                      >
                        New Request
                      </Text>
                    </View>
                    <Text
                      accessibilityRole="header"
                      style={{
                        color: colors.charcoal,
                        fontFamily: getFontFamily("bold"),
                        fontSize: typography.sizes.cardHeading,
                        lineHeight: typography.lineHeights.cardHeading,
                      }}
                    >
                      Pickup: {requestPreview.pickup}
                    </Text>
                    <Text
                      style={{
                        color: colors.charcoal,
                        fontFamily: getFontFamily("regular"),
                        fontSize: typography.sizes.label,
                        lineHeight: typography.lineHeights.supporting,
                      }}
                    >
                      Drop: {requestPreview.drop}
                    </Text>
                  </Pressable>
                  <Pressable
                    accessibilityLabel="View delivery request details"
                    accessibilityRole="button"
                    onPress={onOpenRequest}
                    style={{
                      alignItems: "center",
                      alignSelf: "flex-start",
                      justifyContent: "center",
                      minHeight: componentSizes.touchTarget,
                    }}
                  >
                    <View
                      style={{
                        alignItems: "center",
                        backgroundColor: accent.primary,
                        borderRadius: radius.pill,
                        flexDirection: "row",
                        gap: spacing.xs,
                        minHeight: spacing.xl,
                        paddingHorizontal: spacing.sm,
                      }}
                    >
                      <Text
                        style={{
                          color: accent.onPrimary,
                          fontFamily: getFontFamily("semibold"),
                          fontSize: typography.sizes.caption,
                        }}
                      >
                        View details
                      </Text>
                      <RoutelyIcon
                        color={accent.onPrimary}
                        name="arrowRight"
                        size={componentSizes.iconSmall}
                      />
                    </View>
                  </Pressable>
                </View>
                <Pressable
                  accessibilityLabel="View delivery request details"
                  accessibilityRole="button"
                  onPress={onOpenRequest}
                >
                  <Animated.Image
                    accessibilityElementsHidden
                    importantForAccessibility="no-hide-descendants"
                    resizeMode="contain"
                    source={deliveryRequestArtwork}
                    style={{
                      height: width < 340 ? 88 : compact ? 96 : width < 400 ? 120 : 132,
                      transform: [{ scale: bikeScale }],
                      width: width < 340 ? 88 : compact ? 96 : width < 400 ? 120 : 132,
                    }}
                  />
                </Pressable>
              </View>
            </View>

            <TodaySummaryPreview />

            <View style={{ marginTop: spacing.xl }}>
              <SectionHeader title="Quick actions" />
              <Text
                style={{
                  color: colors.forest,
                  fontFamily: getFontFamily("regular"),
                  fontSize: typography.sizes.caption,
                  marginBottom: spacing.sm,
                }}
              >
                Scroll for more
              </Text>
              <ScrollView
                accessibilityLabel="Quick actions, scroll horizontally for more"
                contentContainerStyle={{ gap: spacing.md }}
                horizontal
                showsHorizontalScrollIndicator
              >
                {quickActions.map((action) => {
                  const onPress =
                    action.label === "Deliveries"
                      ? onOpenDeliveries
                      : action.label === "Earnings"
                        ? onOpenEarnings
                        : action.label === "Verification"
                          ? onOpenVerification
                          : action.label === "Support"
                            ? onOpenSupport
                            : action.label === "Delivery requests"
                              ? onOpenDeliveryRequests
                              : action.label === "Profile"
                                ? onOpenProfile
                                : undefined;
                  return (
                    <Pressable
                      accessibilityLabel={
                        onPress
                          ? `Open ${action.label.toLowerCase()}`
                          : `${action.label}. Not available yet.`
                      }
                      accessibilityRole="button"
                      accessibilityState={{ disabled: !onPress }}
                      disabled={!onPress}
                      key={action.label}
                      onPress={onPress}
                      style={{
                        alignItems: "center",
                        backgroundColor: colors.white,
                        borderColor: colors.border,
                        borderRadius: radius.card,
                        borderWidth: componentSizes.borderWidth,
                        gap: spacing.sm,
                        paddingHorizontal: spacing.sm,
                        paddingVertical: spacing.md,
                        width: 120,
                        ...shadows.card,
                      }}
                    >
                      <View
                        accessibilityElementsHidden
                        importantForAccessibility="no-hide-descendants"
                      >
                        <DashboardIllustration name={action.illustration} />
                      </View>
                      <Text
                        numberOfLines={2}
                        style={{
                          color: colors.charcoal,
                          fontFamily: getFontFamily("medium"),
                          fontSize: typography.sizes.label,
                          textAlign: "center",
                        }}
                      >
                        {action.label}
                      </Text>
                    </Pressable>
                  );
                })}
              </ScrollView>
            </View>

            <View style={{ marginTop: spacing.xl }}>
              <View
                style={{
                  alignItems: "center",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  accessibilityRole="header"
                  style={{
                    color: colors.charcoal,
                    fontFamily: getFontFamily("semibold"),
                    fontSize: typography.sizes.sectionHeading,
                    lineHeight: typography.lineHeights.sectionHeading,
                  }}
                >
                  Your performance
                </Text>
                <Pressable
                  accessibilityLabel="This week. Performance filters are not available yet."
                  accessibilityRole="button"
                  accessibilityState={{ disabled: true }}
                  disabled
                  style={{
                    alignItems: "center",
                    flexDirection: "row",
                    gap: spacing.xs,
                    minHeight: componentSizes.touchTarget,
                  }}
                >
                  <Text
                    style={{
                      color: colors.charcoal,
                      fontFamily: getFontFamily("medium"),
                      fontSize: typography.sizes.caption,
                    }}
                  >
                    This Week
                  </Text>
                  <View style={{ transform: [{ rotate: "90deg" }] }}>
                    <RoutelyIcon
                      color={colors.charcoal}
                      name="chevronRight"
                      size={componentSizes.iconSmall}
                    />
                  </View>
                </Pressable>
              </View>
              <View
                accessible
                accessibilityLabel="Example weekly performance chart, with Saturday highlighted at 16,200 naira. Not actual earnings."
                style={{
                  flexDirection: "row",
                  marginTop: spacing.sm,
                }}
              >
                {examplePerformance.map((item) => {
                  const highlighted = item.day === "Sat";
                  return (
                    <View key={item.day} style={{ alignItems: "center", flex: 1 }}>
                      <View
                        style={{
                          alignItems: "center",
                          height: 96,
                          justifyContent: "flex-end",
                          width: "100%",
                        }}
                      >
                        {highlighted ? (
                          <View
                            style={{
                              backgroundColor: colors.white,
                              borderColor: colors.forest,
                              borderRadius: radius.pill,
                              borderWidth: componentSizes.borderWidth,
                              marginBottom: spacing.xs,
                              paddingHorizontal: spacing.xs,
                            }}
                          >
                            <Text
                              style={{
                                color: colors.forest,
                                fontFamily: getFontFamily("semibold"),
                                fontSize: typography.sizes.caption,
                              }}
                            >
                              ₦16,200
                            </Text>
                          </View>
                        ) : null}
                        <View
                          style={{
                            backgroundColor: highlighted ? accent.primary : colors.lime,
                            borderTopLeftRadius: radius.sm,
                            borderTopRightRadius: radius.sm,
                            height: item.height,
                            opacity: highlighted ? 1 : 0.4,
                            width: spacing.lg,
                          }}
                        />
                      </View>
                      <Text
                        style={{
                          color: colors.charcoal,
                          fontFamily: getFontFamily(highlighted ? "semibold" : "regular"),
                          fontSize: typography.sizes.caption,
                          marginTop: spacing.sm,
                        }}
                      >
                        {item.day}
                      </Text>
                    </View>
                  );
                })}
              </View>
              <View
                style={{
                  alignItems: "center",
                  backgroundColor: colors.container,
                  borderColor: colors.border,
                  borderRadius: radius.card,
                  borderWidth: componentSizes.borderWidth,
                  flexDirection: "row",
                  gap: spacing.sm,
                  marginTop: spacing.md,
                  padding: spacing.md,
                }}
              >
                <RoutelyIcon color={colors.forest} name="wallet" size={componentSizes.iconLarge} />
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      color: colors.charcoal,
                      fontFamily: getFontFamily("regular"),
                      fontSize: typography.sizes.caption,
                    }}
                  >
                    Wallet balance
                  </Text>
                  <Text
                    style={{
                      color: colors.charcoal,
                      fontFamily: getFontFamily("bold"),
                      fontSize: typography.sizes.sectionHeading,
                      lineHeight: typography.lineHeights.sectionHeading,
                    }}
                  >
                    {earningsPreview.walletBalance}
                  </Text>
                </View>
                <Pressable
                  accessibilityLabel="Explore wallet top up. No payment will be made."
                  accessibilityRole="button"
                  onPress={onOpenTopUp}
                  style={{
                    alignItems: "center",
                    backgroundColor: accent.primary,
                    borderRadius: radius.pill,
                    justifyContent: "center",
                    minHeight: componentSizes.touchTarget,
                    paddingHorizontal: spacing.md,
                  }}
                >
                  <Text
                    style={{
                      color: accent.onPrimary,
                      fontFamily: getFontFamily("semibold"),
                      fontSize: typography.sizes.caption,
                    }}
                  >
                    Top Up
                  </Text>
                </Pressable>
              </View>
            </View>

            <SupportCard onPress={onOpenSupport} />

            <BikeOpportunityCard onPress={onOpenBikes} />

            <RecentActivity onOpenAll={onOpenDeliveryHistory} onOpenDetail={onOpenHistoryDetail} />
          </PageContainer>
        </View>
      </ScrollView>

      <DashboardNavigation active="Home" />
    </View>
  );
}
