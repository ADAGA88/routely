import type { ReactElement } from "react";
import { Pressable, Text, View } from "react-native";
import { designTokens, getFontFamily } from "@routely/design-tokens";
import { RoutelyIcon, useAppearance } from "@routely/ui-mobile";
import { activeDeliveryPreview } from "./active-delivery-preview";

const { colors, componentSizes, radius, shadows, spacing, typography } = designTokens;

export function ActiveDeliveryCard({ onOpen }: { onOpen: () => void }): ReactElement {
  const { mode } = useAppearance();
  const accent = designTokens.appearance[mode];

  return (
    <Pressable
      accessibilityLabel={`View sample active delivery. Pickup ${activeDeliveryPreview.pickup}, drop-off ${activeDeliveryPreview.drop}.`}
      accessibilityRole="button"
      onPress={onOpen}
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
      <View style={{ alignItems: "center", flexDirection: "row", gap: spacing.sm }}>
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
          <RoutelyIcon color={accent.onPrimary} name="motorcycle" size={componentSizes.iconLarge} />
        </View>
        <View style={{ flex: 1 }}>
          <Text
            style={{
              color: colors.charcoal,
              fontFamily: getFontFamily("semibold"),
              fontSize: typography.sizes.cardHeading,
            }}
          >
            Active delivery
          </Text>
          <Text
            style={{
              color: colors.forest,
              fontFamily: getFontFamily("regular"),
              fontSize: typography.sizes.caption,
            }}
          >
            Heading to pickup
          </Text>
        </View>
      </View>
      <View
        style={{
          backgroundColor: colors.container,
          borderRadius: radius.lg,
          gap: spacing.sm,
          padding: spacing.md,
        }}
      >
        {[
          { label: "Pickup", place: activeDeliveryPreview.pickup },
          { label: "Drop-off", place: activeDeliveryPreview.drop },
        ].map((stop) => (
          <View
            key={stop.label}
            style={{ alignItems: "center", flexDirection: "row", gap: spacing.sm }}
          >
            <RoutelyIcon color={colors.forest} name="mapPin" size={componentSizes.iconSmall} />
            <Text
              style={{
                color: colors.forest,
                fontFamily: getFontFamily("regular"),
                fontSize: typography.sizes.caption,
                width: spacing["3xl"],
              }}
            >
              {stop.label}
            </Text>
            <Text
              style={{
                color: colors.charcoal,
                flex: 1,
                fontFamily: getFontFamily("semibold"),
                fontSize: typography.sizes.label,
              }}
            >
              {stop.place}
            </Text>
          </View>
        ))}
      </View>
      <View style={{ alignItems: "center", flexDirection: "row", justifyContent: "space-between" }}>
        <Text
          style={{
            color: colors.forest,
            fontFamily: getFontFamily("medium"),
            fontSize: typography.sizes.caption,
          }}
        >
          Est. {activeDeliveryPreview.distance} · {activeDeliveryPreview.duration}
        </Text>
        <View style={{ alignItems: "center", flexDirection: "row", gap: spacing.xs }}>
          <Text
            style={{
              color: colors.forest,
              fontFamily: getFontFamily("semibold"),
              fontSize: typography.sizes.caption,
            }}
          >
            View route
          </Text>
          <RoutelyIcon color={colors.forest} name="arrowRight" size={componentSizes.iconSmall} />
        </View>
      </View>
    </Pressable>
  );
}
