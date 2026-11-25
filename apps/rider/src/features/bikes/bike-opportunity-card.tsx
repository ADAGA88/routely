import type { ReactElement } from "react";
import { Image, Pressable, Text, View, useWindowDimensions } from "react-native";
import { designTokens, getFontFamily } from "@routely/design-tokens";
import { RoutelyIcon, useAppearance } from "@routely/ui-mobile";
import deliveryRequestArtwork from "@routely/brand-assets/delivery-request-sample.png";

const { componentSizes, radius, shadows, spacing, typography } = designTokens;

export function BikeOpportunityCard({ onPress }: { onPress: () => void }): ReactElement {
  const { mode } = useAppearance();
  const { width } = useWindowDimensions();
  const compact = width < 380;
  const imageSize = width < 340 ? 88 : compact ? 96 : width < 400 ? 120 : 132;
  const accent = designTokens.appearance[mode];

  return (
    <Pressable
      accessibilityLabel="Explore sample motorcycle options and hire purchase interest"
      accessibilityRole="button"
      onPress={onPress}
      style={{
        backgroundColor: accent.primary,
        borderRadius: radius.card,
        marginTop: spacing.xl,
        overflow: "hidden",
        padding: compact ? spacing.sm : spacing.md,
        ...shadows.card,
      }}
    >
      <View style={{ alignItems: "center", flexDirection: "row", gap: spacing.xs }}>
        <View style={{ flex: 1, gap: spacing.sm }}>
          <View
            style={{
              alignItems: "center",
              alignSelf: "flex-start",
              backgroundColor: accent.onPrimary,
              borderRadius: radius.pill,
              flexDirection: "row",
              gap: spacing.sm,
              paddingHorizontal: spacing.sm,
              paddingVertical: spacing.xs,
            }}
          >
            <View
              style={{
                backgroundColor: accent.primary,
                borderRadius: radius.pill,
                height: spacing.sm,
                width: spacing.sm,
              }}
            />
            <Text
              style={{
                color: accent.primary,
                fontFamily: getFontFamily("medium"),
                fontSize: typography.sizes.caption,
              }}
            >
              Explore bikes
            </Text>
          </View>
          <Text
            accessibilityRole="header"
            style={{
              color: accent.onPrimary,
              fontFamily: getFontFamily("bold"),
              fontSize: typography.sizes.cardHeading,
              lineHeight: typography.lineHeights.cardHeading,
            }}
          >
            Need a bike?
          </Text>
          <Text
            style={{
              color: accent.onPrimary,
              fontFamily: getFontFamily("regular"),
              fontSize: typography.sizes.label,
              lineHeight: typography.lineHeights.supporting,
            }}
          >
            See sample bikes and hire purchase options.
          </Text>
          <View
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
                backgroundColor: accent.onPrimary,
                borderRadius: radius.pill,
                flexDirection: "row",
                gap: spacing.xs,
                minHeight: spacing.xl,
                paddingHorizontal: spacing.sm,
              }}
            >
              <Text
                style={{
                  color: accent.primary,
                  fontFamily: getFontFamily("semibold"),
                  fontSize: typography.sizes.caption,
                }}
              >
                Explore bikes
              </Text>
              <RoutelyIcon
                color={accent.primary}
                name="arrowRight"
                size={componentSizes.iconSmall}
              />
            </View>
          </View>
        </View>
        <Image
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
          resizeMode="contain"
          source={deliveryRequestArtwork}
          style={{ height: imageSize, width: imageSize }}
        />
      </View>
    </Pressable>
  );
}
