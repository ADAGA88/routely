import type { ReactElement } from "react";
import { Pressable, Text, View } from "react-native";
import { designTokens, getFontFamily } from "@routely/design-tokens";
import { RoutelyIcon } from "@routely/ui-mobile";
import { earningsPreview } from "../earnings/earnings-preview";
import { dashboardPreview } from "./dashboard-preview";

const { colors, componentSizes, radius, spacing, typography } = designTokens;

export function TodaySummaryPreview(): ReactElement {
  return (
    <View style={{ gap: spacing.md, marginTop: spacing.xl }}>
      <View
        style={{
          backgroundColor: colors.container,
          borderRadius: radius.card,
          gap: spacing.sm,
          padding: spacing.md,
        }}
      >
        <View
          style={{
            alignItems: "center",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: spacing.sm,
            justifyContent: "space-between",
          }}
        >
          <Text
            accessibilityRole="header"
            style={{
              color: colors.charcoal,
              fontFamily: getFontFamily("semibold"),
              fontSize: typography.sizes.cardHeading,
            }}
          >
            Today’s summary
          </Text>
        </View>
        <View style={{ flexDirection: "row", gap: spacing.md }}>
          {[
            { label: "Deliveries completed", value: dashboardPreview.deliveriesToday },
            { label: "Earnings", value: earningsPreview.today },
          ].map((item) => (
            <View key={item.label} style={{ flex: 1 }}>
              <Text
                style={{
                  color: colors.charcoal,
                  fontFamily: getFontFamily("bold"),
                  fontSize: typography.sizes.sectionHeading,
                  lineHeight: typography.lineHeights.sectionHeading,
                }}
              >
                {item.value}
              </Text>
              <Text
                style={{
                  color: colors.charcoal,
                  fontFamily: getFontFamily("regular"),
                  fontSize: typography.sizes.caption,
                }}
              >
                {item.label}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

export function SupportCard({ onPress }: { onPress: () => void }): ReactElement {
  return (
    <View
      style={{
        alignItems: "center",
        backgroundColor: colors.container,
        borderRadius: radius.card,
        flexDirection: "row",
        gap: spacing.sm,
        marginTop: spacing.xl,
        padding: spacing.md,
      }}
    >
      <RoutelyIcon color={colors.forest} name="shieldCheck" size={componentSizes.iconLarge} />
      <View style={{ flex: 1 }}>
        <Text
          accessibilityRole="header"
          style={{
            color: colors.charcoal,
            fontFamily: getFontFamily("semibold"),
            fontSize: typography.sizes.cardHeading,
          }}
        >
          Support &amp; safety
        </Text>
        <Text
          style={{
            color: colors.charcoal,
            fontFamily: getFontFamily("regular"),
            fontSize: typography.sizes.caption,
            lineHeight: typography.lineHeights.footnote,
          }}
        >
          Browse help topics; live support is unavailable.
        </Text>
      </View>
      <Pressable
        accessibilityLabel="Open support and safety"
        accessibilityRole="button"
        onPress={onPress}
        style={{
          alignItems: "center",
          borderColor: colors.forest,
          borderRadius: radius.pill,
          borderWidth: componentSizes.borderWidth,
          justifyContent: "center",
          minHeight: componentSizes.touchTarget,
          paddingHorizontal: spacing.sm,
        }}
      >
        <Text
          style={{
            color: colors.forest,
            fontFamily: getFontFamily("semibold"),
            fontSize: typography.sizes.caption,
          }}
        >
          Get help
        </Text>
      </Pressable>
    </View>
  );
}
