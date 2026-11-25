import type { ReactElement } from "react";
import { Pressable, Text, View } from "react-native";
import { designTokens, getFontFamily } from "@routely/design-tokens";
import { RoutelyIcon } from "@routely/ui-mobile";
import { activeDeliveryPreview } from "./active-delivery-preview";

const { colors, componentSizes, radius, shadows, spacing, typography } = designTokens;

const stops = [
  {
    label: "Pickup",
    place: activeDeliveryPreview.pickup,
    details: activeDeliveryPreview.pickupDetails,
  },
  {
    label: "Drop-off",
    place: activeDeliveryPreview.drop,
    details: activeDeliveryPreview.dropDetails,
  },
] as const;

export function DeliveryStops(): ReactElement {
  return (
    <View style={{ gap: spacing.sm, marginTop: spacing.lg }}>
      <Text
        accessibilityRole="header"
        style={{
          color: colors.charcoal,
          fontFamily: getFontFamily("semibold"),
          fontSize: typography.sizes.sectionHeading,
          lineHeight: typography.lineHeights.sectionHeading,
          marginBottom: spacing.xs,
        }}
      >
        Your stops
      </Text>
      {stops.map((stop, index) => (
        <View
          key={stop.label}
          style={{
            backgroundColor: colors.white,
            borderColor: colors.border,
            borderRadius: radius.card,
            borderWidth: componentSizes.borderWidth,
            gap: spacing.md,
            padding: spacing.md,
            ...shadows.card,
          }}
        >
          <View style={{ alignItems: "center", flexDirection: "row", gap: spacing.sm }}>
            <View
              style={{
                alignItems: "center",
                backgroundColor: index === 0 ? colors.forest : colors.lime,
                borderRadius: radius.pill,
                height: componentSizes.touchTarget,
                justifyContent: "center",
                width: componentSizes.touchTarget,
              }}
            >
              <RoutelyIcon
                color={index === 0 ? colors.white : colors.charcoal}
                name="mapPin"
                size={componentSizes.icon}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  color: colors.forest,
                  fontFamily: getFontFamily("medium"),
                  fontSize: typography.sizes.caption,
                }}
              >
                {stop.label}
              </Text>
              <Text
                style={{
                  color: colors.charcoal,
                  fontFamily: getFontFamily("semibold"),
                  fontSize: typography.sizes.cardHeading,
                }}
              >
                {stop.place}
              </Text>
            </View>
          </View>
          <View style={{ gap: spacing.sm }}>
            <Text
              accessibilityLabel={`Sample ${stop.label.toLowerCase()} address: ${stop.details.address}.`}
              style={{
                color: colors.charcoal,
                fontFamily: getFontFamily("medium"),
                fontSize: typography.sizes.label,
                lineHeight: typography.lineHeights.supporting,
              }}
            >
              {stop.details.address}
            </Text>
            <View
              style={{
                backgroundColor: colors.container,
                borderRadius: radius.md,
                padding: spacing.sm,
              }}
            >
              <Text
                accessibilityLabel={`Sample ${stop.label.toLowerCase()} instruction: ${stop.details.instruction}`}
                style={{
                  color: colors.forest,
                  fontFamily: getFontFamily("regular"),
                  fontSize: typography.sizes.caption,
                  lineHeight: typography.lineHeights.footnote,
                }}
              >
                {stop.details.instruction}
              </Text>
            </View>
          </View>
          <View
            style={{
              alignItems: "center",
              borderColor: colors.border,
              borderTopWidth: componentSizes.borderWidth,
              flexDirection: "row",
              flexWrap: "wrap",
              gap: spacing.sm,
              paddingTop: spacing.sm,
            }}
          >
            <View style={{ flexGrow: 1 }}>
              <Text
                style={{
                  color: colors.charcoal,
                  fontFamily: getFontFamily("semibold"),
                  fontSize: typography.sizes.caption,
                }}
              >
                {stop.details.contact}
              </Text>
              <Text
                accessibilityLabel="Sample masked contact number."
                style={{
                  color: colors.forest,
                  fontFamily: getFontFamily("regular"),
                  fontSize: typography.sizes.caption,
                }}
              >
                {stop.details.phone}
              </Text>
            </View>
            {["Call", "Message"].map((action) => (
              <Pressable
                accessibilityLabel={`${action} ${stop.details.contact.toLowerCase()}. Contact is not connected yet.`}
                accessibilityRole="button"
                accessibilityState={{ disabled: true }}
                disabled
                key={action}
                style={{
                  alignItems: "center",
                  backgroundColor: colors.container,
                  borderRadius: radius.pill,
                  justifyContent: "center",
                  minHeight: componentSizes.touchTarget,
                  paddingHorizontal: spacing.md,
                }}
              >
                <Text
                  style={{
                    color: colors.forest,
                    fontFamily: getFontFamily("semibold"),
                    fontSize: typography.sizes.caption,
                  }}
                >
                  {action}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
      ))}
    </View>
  );
}
