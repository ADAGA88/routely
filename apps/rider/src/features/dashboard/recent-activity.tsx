import type { ReactElement } from "react";
import { Pressable, Text, View } from "react-native";
import { designTokens, getFontFamily } from "@routely/design-tokens";
import { RoutelyIcon, useAppearance } from "@routely/ui-mobile";
import { deliveryHistoryPreview } from "../deliveries/delivery-history-preview";

const { colors, componentSizes, radius, shadows, spacing, typography } = designTokens;

export function RecentActivity({
  onOpenAll,
  onOpenDetail,
}: {
  onOpenAll: () => void;
  onOpenDetail: (deliveryId: string) => void;
}): ReactElement {
  const { mode } = useAppearance();
  const accent = designTokens.appearance[mode];

  return (
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
          Recent activity
        </Text>
        <Pressable
          accessibilityLabel="View all delivery history"
          accessibilityRole="button"
          onPress={onOpenAll}
          style={{ justifyContent: "center", minHeight: componentSizes.touchTarget }}
        >
          <Text
            style={{
              color: colors.forest,
              fontFamily: getFontFamily("semibold"),
              fontSize: typography.sizes.label,
            }}
          >
            View all
          </Text>
        </Pressable>
      </View>
      <Text
        style={{
          color: colors.forest,
          fontFamily: getFontFamily("regular"),
          fontSize: typography.sizes.caption,
          lineHeight: typography.lineHeights.footnote,
          marginBottom: spacing.md,
        }}
      >
        Sample deliveries, not live activity.
      </Text>
      <View
        style={{
          backgroundColor: colors.white,
          borderColor: colors.border,
          borderRadius: radius.card,
          borderWidth: componentSizes.borderWidth,
          overflow: "hidden",
          ...shadows.card,
        }}
      >
        {deliveryHistoryPreview.map((delivery, index) => (
          <Pressable
            accessibilityLabel={`View sample ${delivery.status.toLowerCase()} delivery, ${delivery.pickup} to ${delivery.drop}, ${delivery.date}`}
            accessibilityRole="button"
            key={delivery.id}
            onPress={() => onOpenDetail(delivery.id)}
            style={{
              alignItems: "center",
              borderColor: colors.border,
              borderTopWidth: index === 0 ? 0 : componentSizes.borderWidth,
              flexDirection: "row",
              gap: spacing.sm,
              minHeight: componentSizes.touchTarget,
              padding: spacing.md,
            }}
          >
            <View
              style={{
                alignItems: "center",
                backgroundColor: accent.primary,
                borderRadius: radius.iconContainer,
                height: componentSizes.touchTarget,
                justifyContent: "center",
                width: componentSizes.touchTarget,
              }}
            >
              <RoutelyIcon color={accent.onPrimary} name="package" />
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  color: colors.charcoal,
                  fontFamily: getFontFamily("semibold"),
                  fontSize: typography.sizes.label,
                }}
              >
                {delivery.pickup} to {delivery.drop}
              </Text>
              <Text
                style={{
                  color: colors.forest,
                  fontFamily: getFontFamily("regular"),
                  fontSize: typography.sizes.caption,
                  marginTop: spacing.xs,
                }}
              >
                {delivery.status} · {delivery.date}
              </Text>
            </View>
            <View style={{ alignItems: "flex-end", gap: spacing.xs }}>
              {delivery.earnings ? (
                <Text
                  style={{
                    color: colors.charcoal,
                    fontFamily: getFontFamily("bold"),
                    fontSize: typography.sizes.label,
                  }}
                >
                  {delivery.earnings}
                </Text>
              ) : null}
              <RoutelyIcon
                color={colors.forest}
                name="chevronRight"
                size={componentSizes.iconSmall}
              />
            </View>
          </Pressable>
        ))}
      </View>
    </View>
  );
}
