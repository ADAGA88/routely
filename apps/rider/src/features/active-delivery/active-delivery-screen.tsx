import { useState, type ReactElement } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { designTokens, getFontFamily } from "@routely/design-tokens";
import { PageContainer, RoutelyIcon, useAppearance } from "@routely/ui-mobile";
import { activeDeliveryPreview } from "./active-delivery-preview";
import { DeliveryAssistance } from "./delivery-assistance";
import { DeliveryStops } from "./delivery-stops";
import { journeyStages } from "./journey-preview";
import { RouteIllustration } from "./route-illustration";

const { colors, componentSizes, radius, shadows, spacing, typography } = designTokens;

export function ActiveDeliveryScreen({ onBack }: { onBack: () => void }): ReactElement {
  const { mode } = useAppearance();
  const accent = designTokens.appearance[mode];
  const [stage, setStage] = useState<(typeof journeyStages)[number]>(journeyStages[0]);

  return (
    <View style={{ backgroundColor: colors.white, flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: spacing.xl }}>
        <PageContainer maxWidth={720}>
          <View style={{ alignItems: "center", flexDirection: "row", gap: spacing.sm }}>
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
            <Text
              accessibilityRole="header"
              style={{
                color: colors.charcoal,
                flex: 1,
                fontFamily: getFontFamily("semibold"),
                fontSize: typography.sizes.sectionHeading,
                lineHeight: typography.lineHeights.sectionHeading,
              }}
            >
              {stage.id === "complete" ? "Delivery summary" : "Active delivery"}
            </Text>
          </View>

          <View style={{ marginTop: spacing.lg }}>
            <RouteIllustration stage={stage.id} />
            <View
              style={{
                alignItems: "center",
                backgroundColor: colors.white,
                borderRadius: radius.pill,
                flexDirection: "row",
                gap: spacing.xs,
                left: spacing.md,
                paddingHorizontal: spacing.sm,
                paddingVertical: spacing.xs,
                position: "absolute",
                top: spacing.md,
              }}
            >
              <RoutelyIcon color={colors.forest} name="mapPin" size={componentSizes.iconSmall} />
              <Text
                style={{
                  color: colors.forest,
                  fontFamily: getFontFamily("medium"),
                  fontSize: typography.sizes.caption,
                }}
              >
                Your route
              </Text>
            </View>
          </View>
          <Text
            style={{
              color: colors.forest,
              fontFamily: getFontFamily("regular"),
              fontSize: typography.sizes.caption,
              lineHeight: typography.lineHeights.footnote,
              marginTop: spacing.sm,
            }}
          >
            Live tracking and navigation are not connected yet.
          </Text>

          <View
            style={{
              backgroundColor: colors.white,
              borderColor: colors.border,
              borderRadius: radius.panel,
              borderWidth: componentSizes.borderWidth,
              gap: spacing.md,
              marginTop: spacing.lg,
              padding: spacing.md,
              ...shadows.card,
            }}
          >
            <View
              style={{
                alignItems: "center",
                flexDirection: "row",
                flexWrap: "wrap",
                gap: spacing.sm,
              }}
            >
              <View
                style={{
                  backgroundColor: accent.primary,
                  borderRadius: radius.pill,
                  paddingHorizontal: spacing.sm,
                  paddingVertical: spacing.xs,
                }}
              >
                <Text
                  accessibilityLiveRegion="polite"
                  style={{
                    color: accent.onPrimary,
                    fontFamily: getFontFamily("semibold"),
                    fontSize: typography.sizes.caption,
                  }}
                >
                  {stage.status}
                </Text>
              </View>
              {stage.id !== "complete" ? (
                <Text
                  style={{
                    color: colors.forest,
                    fontFamily: getFontFamily("medium"),
                    fontSize: typography.sizes.caption,
                  }}
                >
                  Est. trip {activeDeliveryPreview.distance} · {activeDeliveryPreview.duration}
                </Text>
              ) : null}
            </View>
            <View
              accessibilityRole="tablist"
              accessibilityLabel="Delivery stage preview"
              style={{ flexDirection: "row", gap: spacing.sm }}
            >
              {journeyStages.map((item, index) => (
                <Pressable
                  accessibilityLabel={`View ${item.label} stage`}
                  accessibilityRole="tab"
                  accessibilityState={{ selected: item.id === stage.id }}
                  aria-selected={item.id === stage.id}
                  key={item.id}
                  onPress={() => setStage(item)}
                  style={{
                    alignItems: "center",
                    flex: 1,
                    gap: spacing.xs,
                    minHeight: componentSizes.touchTarget,
                  }}
                >
                  <View
                    style={{
                      alignItems: "center",
                      backgroundColor: item.id === stage.id ? accent.primary : colors.container,
                      borderRadius: radius.pill,
                      height: spacing.xl,
                      justifyContent: "center",
                      width: spacing.xl,
                    }}
                  >
                    <Text
                      style={{
                        color: item.id === stage.id ? accent.onPrimary : colors.forest,
                        fontFamily: getFontFamily("semibold"),
                        fontSize: typography.sizes.caption,
                      }}
                    >
                      {index + 1}
                    </Text>
                  </View>
                  <Text
                    style={{
                      color: colors.forest,
                      fontFamily: getFontFamily("medium"),
                      fontSize: typography.sizes.caption,
                      textAlign: "center",
                    }}
                  >
                    {item.label}
                  </Text>
                </Pressable>
              ))}
            </View>
            <Text
              style={{
                color: colors.forest,
                fontFamily: getFontFamily("regular"),
                fontSize: typography.sizes.caption,
                lineHeight: typography.lineHeights.footnote,
              }}
            >
              Tap a stage to view it. No delivery updates are sent.
            </Text>
          </View>

          {stage.action ? (
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                gap: spacing.sm,
                marginTop: spacing.md,
              }}
            >
              {["Open navigation", stage.action].map((label) => (
                <Pressable
                  accessibilityLabel={`${label}. Not connected yet.`}
                  accessibilityRole="button"
                  accessibilityState={{ disabled: true }}
                  disabled
                  key={label}
                  style={{
                    alignItems: "center",
                    backgroundColor: label === stage.action ? accent.primary : colors.container,
                    borderRadius: radius.pill,
                    flexGrow: 1,
                    justifyContent: "center",
                    minHeight: componentSizes.touchTarget,
                    opacity: label === stage.action ? 0.6 : 1,
                    paddingHorizontal: spacing.md,
                  }}
                >
                  <Text
                    style={{
                      color: label === stage.action ? accent.onPrimary : colors.forest,
                      fontFamily: getFontFamily("semibold"),
                      fontSize: typography.sizes.caption,
                    }}
                  >
                    {label}
                  </Text>
                </Pressable>
              ))}
            </View>
          ) : null}
          {stage.action ? (
            <Text
              style={{
                color: colors.forest,
                fontFamily: getFontFamily("regular"),
                fontSize: typography.sizes.caption,
                lineHeight: typography.lineHeights.footnote,
                marginTop: spacing.xs,
              }}
            >
              Delivery actions are not available yet.
            </Text>
          ) : null}

          <DeliveryStops />

          <View
            style={{
              backgroundColor: colors.container,
              borderRadius: radius.card,
              flexDirection: "row",
              flexWrap: "wrap",
              gap: spacing.lg,
              marginTop: spacing.md,
              padding: spacing.md,
            }}
          >
            {[
              { label: "Package", value: activeDeliveryPreview.package },
              { label: "Estimated earnings", value: activeDeliveryPreview.earnings },
            ].map((item) => (
              <View key={item.label} style={{ flexGrow: 1 }}>
                <Text
                  style={{
                    color: colors.forest,
                    fontFamily: getFontFamily("regular"),
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
                  }}
                >
                  {item.value}
                </Text>
              </View>
            ))}
          </View>

          <DeliveryAssistance completed={stage.id === "complete"} />
        </PageContainer>
      </ScrollView>
    </View>
  );
}
