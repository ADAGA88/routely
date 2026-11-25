import type { ReactElement } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { designTokens, getFontFamily } from "@routely/design-tokens";
import { PageContainer, RoutelyIcon, useAppearance } from "@routely/ui-mobile";
import type { DeliveryHistoryPreview } from "./delivery-history-preview";

const { colors, componentSizes, radius, shadows, spacing, typography } = designTokens;

export function DeliveryHistoryDetailsScreen({
  delivery,
  onBack,
}: {
  delivery: DeliveryHistoryPreview | undefined;
  onBack: () => void;
}): ReactElement {
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
              onPress={onBack}
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
                Delivery details
              </Text>
              <Text
                style={{
                  color: colors.forest,
                  fontFamily: getFontFamily("regular"),
                  fontSize: typography.sizes.caption,
                }}
              >
                A closer look at a past delivery.
              </Text>
            </View>
          </View>

          {delivery ? (
            <>
              <View
                style={{
                  backgroundColor: accent.primary,
                  borderRadius: radius.panel,
                  gap: spacing.md,
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
                <View
                  style={{
                    alignItems: "center",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{
                      color: accent.onPrimary,
                      fontFamily: getFontFamily("semibold"),
                      fontSize: typography.sizes.caption,
                      letterSpacing: typography.letterSpacing.brand,
                    }}
                  >
                    DELIVERY HISTORY
                  </Text>
                  <RoutelyIcon color={accent.onPrimary} name="history" />
                </View>
                <View
                  style={{
                    alignSelf: "flex-start",
                    backgroundColor: accent.onPrimary,
                    borderRadius: radius.pill,
                    paddingHorizontal: spacing.md,
                    paddingVertical: spacing.xs,
                  }}
                >
                  <Text
                    style={{
                      color: accent.primary,
                      fontFamily: getFontFamily("bold"),
                      fontSize: typography.sizes.caption,
                    }}
                  >
                    {delivery.status}
                  </Text>
                </View>
                <Text
                  style={{
                    color: accent.onPrimary,
                    fontFamily: getFontFamily("bold"),
                    fontSize: typography.sizes.sectionHeading,
                    lineHeight: typography.lineHeights.sectionHeading,
                  }}
                >
                  {delivery.pickup} to {delivery.drop}
                </Text>
                <Text
                  style={{
                    color: accent.onPrimary,
                    fontFamily: getFontFamily("medium"),
                    fontSize: typography.sizes.label,
                  }}
                >
                  {delivery.date} · Sample delivery
                </Text>
              </View>

              <Text
                accessibilityRole="header"
                style={{
                  color: colors.charcoal,
                  fontFamily: getFontFamily("semibold"),
                  fontSize: typography.sizes.sectionHeading,
                  marginTop: spacing.xl,
                }}
              >
                Your route
              </Text>
              <View
                style={{
                  backgroundColor: colors.white,
                  borderColor: colors.border,
                  borderRadius: radius.panel,
                  borderWidth: componentSizes.borderWidth,
                  gap: spacing.lg,
                  marginTop: spacing.md,
                  padding: spacing.lg,
                  ...shadows.card,
                }}
              >
                {[
                  { label: "PICKUP", place: delivery.pickup, marker: "A" },
                  { label: "DROP-OFF", place: delivery.drop, marker: "B" },
                ].map((stop) => (
                  <View
                    key={stop.label}
                    style={{ alignItems: "center", flexDirection: "row", gap: spacing.md }}
                  >
                    <View
                      style={{
                        alignItems: "center",
                        backgroundColor: stop.marker === "A" ? accent.primary : colors.white,
                        borderColor: stop.marker === "A" ? accent.primary : colors.forest,
                        borderRadius: radius.pill,
                        borderWidth: componentSizes.borderWidth * 2,
                        height: componentSizes.touchTarget,
                        justifyContent: "center",
                        width: componentSizes.touchTarget,
                      }}
                    >
                      <Text
                        style={{
                          color: stop.marker === "A" ? accent.onPrimary : colors.forest,
                          fontFamily: getFontFamily("bold"),
                          fontSize: typography.sizes.label,
                        }}
                      >
                        {stop.marker}
                      </Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text
                        style={{
                          color: colors.forest,
                          fontFamily: getFontFamily("medium"),
                          fontSize: typography.sizes.caption,
                          letterSpacing: typography.letterSpacing.brand,
                        }}
                      >
                        {stop.label}
                      </Text>
                      <Text
                        style={{
                          color: colors.charcoal,
                          fontFamily: getFontFamily("semibold"),
                          fontSize: typography.sizes.body,
                          marginTop: spacing.xs,
                        }}
                      >
                        {stop.place}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>

              <Text
                accessibilityRole="header"
                style={{
                  color: colors.charcoal,
                  fontFamily: getFontFamily("semibold"),
                  fontSize: typography.sizes.sectionHeading,
                  marginTop: spacing.xl,
                }}
              >
                Delivery summary
              </Text>
              <View
                style={{
                  backgroundColor: colors.container,
                  borderRadius: radius.panel,
                  gap: spacing.md,
                  marginTop: spacing.md,
                  padding: spacing.lg,
                }}
              >
                {[
                  { label: "Date", value: delivery.date },
                  { label: "Status", value: delivery.status },
                  { label: "Earnings", value: delivery.earnings ?? "Unavailable" },
                ].map((item) => (
                  <View
                    key={item.label}
                    style={{
                      flexDirection: "row",
                      flexWrap: "wrap",
                      gap: spacing.sm,
                      justifyContent: "space-between",
                    }}
                  >
                    <Text
                      style={{
                        color: colors.forest,
                        fontFamily: getFontFamily("regular"),
                        fontSize: typography.sizes.label,
                      }}
                    >
                      {item.label}
                    </Text>
                    <Text
                      style={{
                        color: colors.charcoal,
                        fontFamily: getFontFamily("semibold"),
                        fontSize: typography.sizes.label,
                      }}
                    >
                      {item.value}
                    </Text>
                  </View>
                ))}
              </View>
              <Text
                style={{
                  color: colors.forest,
                  fontFamily: getFontFamily("regular"),
                  fontSize: typography.sizes.caption,
                  lineHeight: typography.lineHeights.supporting,
                  marginTop: spacing.md,
                }}
              >
                Preview only. This is sample data, not a live delivery record. Further details and
                event history are unavailable.
              </Text>
            </>
          ) : (
            <View
              style={{
                backgroundColor: colors.container,
                borderRadius: radius.panel,
                gap: spacing.sm,
                marginTop: spacing.lg,
                padding: spacing.lg,
              }}
            >
              <Text
                accessibilityRole="header"
                style={{
                  color: colors.charcoal,
                  fontFamily: getFontFamily("bold"),
                  fontSize: typography.sizes.sectionHeading,
                }}
              >
                Delivery not found
              </Text>
              <Text
                style={{
                  color: colors.forest,
                  fontFamily: getFontFamily("regular"),
                  fontSize: typography.sizes.label,
                  lineHeight: typography.lineHeights.supporting,
                }}
              >
                This sample delivery is unavailable. Go back to view deliveries.
              </Text>
            </View>
          )}
        </PageContainer>
      </ScrollView>
    </View>
  );
}
