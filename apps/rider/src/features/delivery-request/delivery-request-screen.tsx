import type { ReactElement } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { designTokens, getFontFamily } from "@routely/design-tokens";
import { PageContainer, RoutelyButton, RoutelyIcon, useAppearance } from "@routely/ui-mobile";
import type { DeliveryRequestPreview } from "./request-preview";

const { colors, componentSizes, radius, shadows, spacing, typography } = designTokens;

export function DeliveryRequestScreen({
  onBack,
  onViewMoreRequests,
  request,
}: {
  onBack: () => void;
  onViewMoreRequests: () => void;
  request: DeliveryRequestPreview;
}): ReactElement {
  const { mode } = useAppearance();
  const accent = designTokens.appearance[mode];

  return (
    <View style={{ backgroundColor: colors.white, flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: spacing.xl }}>
        <PageContainer maxWidth={720}>
          <View style={{ alignItems: "center", flexDirection: "row", gap: spacing.sm }}>
            <Pressable
              accessibilityLabel="Back to dashboard"
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
              Delivery request
            </Text>
          </View>

          <View
            style={{
              backgroundColor: colors.container,
              borderRadius: radius.panel,
              marginTop: spacing.lg,
              overflow: "hidden",
              padding: spacing.lg,
            }}
          >
            <View
              pointerEvents="none"
              style={{
                backgroundColor: colors.lime,
                bottom: 0,
                left: 0,
                opacity: 0.18,
                position: "absolute",
                right: 0,
                top: 0,
              }}
            />
            <View
              style={{
                alignSelf: "flex-start",
                backgroundColor: colors.lime,
                borderRadius: radius.pill,
                paddingHorizontal: spacing.sm,
                paddingVertical: spacing.xs,
              }}
            >
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
            <View
              style={{
                alignItems: "center",
                flexDirection: "row",
                gap: spacing.md,
                justifyContent: "space-between",
                marginTop: spacing.md,
              }}
            >
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    color: colors.charcoal,
                    fontFamily: getFontFamily("regular"),
                    fontSize: typography.sizes.label,
                  }}
                >
                  Estimated earnings
                </Text>
                <Text
                  style={{
                    color: colors.charcoal,
                    fontFamily: getFontFamily("bold"),
                    fontSize: typography.sizes.heading,
                    lineHeight: typography.lineHeights.heading,
                  }}
                >
                  {request.earnings}
                </Text>
              </View>
              <View
                style={{
                  alignItems: "center",
                  backgroundColor: accent.primary,
                  borderRadius: radius.xl,
                  height: 56,
                  justifyContent: "center",
                  width: 56,
                }}
              >
                <RoutelyIcon
                  color={accent.onPrimary}
                  name="wallet"
                  size={componentSizes.iconLarge}
                />
              </View>
            </View>
          </View>

          <Text
            accessibilityRole="header"
            style={{
              color: colors.charcoal,
              fontFamily: getFontFamily("semibold"),
              fontSize: typography.sizes.sectionHeading,
              lineHeight: typography.lineHeights.sectionHeading,
              marginBottom: spacing.md,
              marginTop: spacing.xl,
            }}
          >
            Your route
          </Text>
          <View
            style={{
              backgroundColor: colors.white,
              borderColor: colors.border,
              borderRadius: radius.card,
              borderWidth: componentSizes.borderWidth,
              gap: spacing.lg,
              padding: spacing.lg,
              ...shadows.card,
            }}
          >
            {[
              { label: "Pickup", place: request.pickup, color: colors.forest },
              { label: "Drop-off", place: request.drop, color: colors.lime },
            ].map((stop) => (
              <View
                key={stop.label}
                style={{ alignItems: "center", flexDirection: "row", gap: spacing.md }}
              >
                <View
                  style={{
                    alignItems: "center",
                    backgroundColor: stop.color,
                    borderRadius: radius.pill,
                    height: componentSizes.touchTarget,
                    justifyContent: "center",
                    width: componentSizes.touchTarget,
                  }}
                >
                  <RoutelyIcon
                    color={stop.label === "Pickup" ? colors.white : colors.charcoal}
                    name="mapPin"
                    size={componentSizes.icon}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      color: colors.forest,
                      fontFamily: getFontFamily("regular"),
                      fontSize: typography.sizes.caption,
                    }}
                  >
                    {stop.label}
                  </Text>
                  <Text
                    style={{
                      color: colors.charcoal,
                      fontFamily: getFontFamily("semibold"),
                      fontSize: typography.sizes.body,
                      lineHeight: typography.lineHeights.body,
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
              lineHeight: typography.lineHeights.sectionHeading,
              marginBottom: spacing.md,
              marginTop: spacing.xl,
            }}
          >
            Trip details
          </Text>
          <View
            style={{
              backgroundColor: colors.container,
              borderRadius: radius.card,
              gap: spacing.md,
              padding: spacing.lg,
            }}
          >
            {(
              [
                { label: "Estimated distance", value: request.distance, icon: "mapPin" },
                { label: "Estimated time", value: request.duration, icon: "history" },
                { label: "Package", value: request.package, icon: "package" },
              ] as const
            ).map((detail) => (
              <View
                key={detail.label}
                style={{ alignItems: "center", flexDirection: "row", gap: spacing.sm }}
              >
                <RoutelyIcon color={colors.forest} name={detail.icon} size={componentSizes.icon} />
                <Text
                  style={{
                    color: colors.charcoal,
                    flex: 1,
                    fontFamily: getFontFamily("regular"),
                    fontSize: typography.sizes.label,
                  }}
                >
                  {detail.label}
                </Text>
                <Text
                  style={{
                    color: colors.charcoal,
                    fontFamily: getFontFamily("semibold"),
                    fontSize: typography.sizes.label,
                  }}
                >
                  {detail.value}
                </Text>
              </View>
            ))}
          </View>
        </PageContainer>
      </ScrollView>

      <SafeAreaView
        edges={["bottom"]}
        style={{
          backgroundColor: colors.white,
          borderColor: colors.border,
          borderTopWidth: componentSizes.borderWidth,
          paddingVertical: spacing.sm,
        }}
      >
        <PageContainer maxWidth={720}>
          <RoutelyButton
            accessibilityLabel="Accept delivery. Dispatch is not connected."
            disabled
            fullWidth
            label="Accept Delivery"
            trailingIcon="arrowRight"
          />
          <RoutelyButton
            fullWidth
            label="View more requests"
            onPress={onViewMoreRequests}
            style={{ marginTop: spacing.sm }}
            trailingIcon="arrowRight"
            variant="secondary"
          />
          <Text
            style={{
              color: colors.forest,
              fontFamily: getFontFamily("regular"),
              fontSize: typography.sizes.caption,
              lineHeight: typography.lineHeights.footnote,
              marginTop: spacing.xs,
              textAlign: "center",
            }}
          >
            Delivery acceptance is not available yet.
          </Text>
        </PageContainer>
      </SafeAreaView>
    </View>
  );
}

export function DeliveryRequestNotFoundScreen({
  onViewMoreRequests,
}: {
  onViewMoreRequests: () => void;
}): ReactElement {
  return (
    <View style={{ backgroundColor: colors.white, flex: 1, justifyContent: "center" }}>
      <PageContainer maxWidth={720}>
        <View
          style={{
            alignItems: "center",
            backgroundColor: colors.container,
            borderRadius: radius.panel,
            padding: spacing.xl,
          }}
        >
          <RoutelyIcon color={colors.forest} name="package" size={componentSizes.iconLarge} />
          <Text
            accessibilityRole="header"
            style={{
              color: colors.charcoal,
              fontFamily: getFontFamily("semibold"),
              fontSize: typography.sizes.sectionHeading,
              marginTop: spacing.md,
              textAlign: "center",
            }}
          >
            Request not found
          </Text>
          <Text
            style={{
              color: colors.forest,
              fontFamily: getFontFamily("regular"),
              fontSize: typography.sizes.caption,
              lineHeight: typography.lineHeights.supporting,
              marginTop: spacing.xs,
              textAlign: "center",
            }}
          >
            This request is no longer available in the preview.
          </Text>
          <RoutelyButton
            fullWidth
            label="View available requests"
            onPress={onViewMoreRequests}
            style={{ marginTop: spacing.lg }}
            trailingIcon="arrowRight"
          />
        </View>
      </PageContainer>
    </View>
  );
}
