import type { ReactElement } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { designTokens, getFontFamily } from "@routely/design-tokens";
import { PageContainer, RoutelyIcon, useAppearance } from "@routely/ui-mobile";
import { DashboardNavigation } from "../dashboard/dashboard-navigation";
import { earningsPreview } from "./earnings-preview";

const { colors, componentSizes, radius, shadows, spacing, typography } = designTokens;

export function EarningsScreen(): ReactElement {
  const router = useRouter();
  const { mode } = useAppearance();
  const accent = designTokens.appearance[mode];

  return (
    <View style={{ backgroundColor: colors.white, flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: spacing.xl }}>
        <PageContainer maxWidth={720}>
          <View style={{ marginTop: spacing.sm }}>
            <Text
              accessibilityRole="header"
              style={{
                color: colors.charcoal,
                fontFamily: getFontFamily("bold"),
                fontSize: typography.sizes.heading,
                lineHeight: typography.lineHeights.heading,
              }}
            >
              Earnings
            </Text>
            <Text
              style={{
                color: colors.forest,
                fontFamily: getFontFamily("regular"),
                fontSize: typography.sizes.label,
                lineHeight: typography.lineHeights.supporting,
                marginTop: spacing.xs,
              }}
            >
              Keep track of what you earn.
            </Text>
          </View>

          <View
            style={{
              backgroundColor: accent.primary,
              borderRadius: radius.panel,
              gap: spacing.md,
              marginTop: spacing.lg,
              padding: spacing.lg,
            }}
          >
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
                  fontFamily: getFontFamily("medium"),
                  fontSize: typography.sizes.label,
                }}
              >
                Wallet balance
              </Text>
              <RoutelyIcon color={accent.onPrimary} name="wallet" size={componentSizes.iconLarge} />
            </View>
            <Text
              accessibilityLabel={`Sample wallet balance ${earningsPreview.walletBalance}, not a real balance.`}
              style={{
                color: accent.onPrimary,
                fontFamily: getFontFamily("bold"),
                fontSize: typography.sizes.compactDisplay,
                lineHeight: typography.lineHeights.compactHeading,
              }}
            >
              {earningsPreview.walletBalance}
            </Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.sm }}>
              {["Withdraw", "Top up"].map((label) => (
                <Pressable
                  accessibilityLabel={`Explore ${label.toLowerCase()}. No transaction will be made.`}
                  accessibilityRole="button"
                  onPress={() =>
                    router.push(label === "Withdraw" ? "/wallet-withdrawal" : "/wallet-top-up")
                  }
                  key={label}
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
                      color: colors.forest,
                      fontFamily: getFontFamily("semibold"),
                      fontSize: typography.sizes.caption,
                    }}
                  >
                    {label}
                  </Text>
                </Pressable>
              ))}
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
            Wallet figures are examples. Payments and withdrawals are not connected.
          </Text>

          <Text
            accessibilityRole="header"
            style={{
              color: colors.charcoal,
              fontFamily: getFontFamily("semibold"),
              fontSize: typography.sizes.sectionHeading,
              lineHeight: typography.lineHeights.sectionHeading,
              marginTop: spacing.xl,
            }}
          >
            Earnings overview
          </Text>
          <View style={{ flexDirection: "row", gap: spacing.sm, marginTop: spacing.md }}>
            {[
              { label: "Today", value: earningsPreview.today },
              { label: "This week", value: earningsPreview.thisWeek },
            ].map((item) => (
              <View
                accessibilityLabel={`Sample earnings ${item.label}, ${item.value}.`}
                accessible
                key={item.label}
                style={{
                  backgroundColor: colors.container,
                  borderRadius: radius.card,
                  flex: 1,
                  gap: spacing.xs,
                  padding: spacing.md,
                }}
              >
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
                  adjustsFontSizeToFit
                  numberOfLines={1}
                  style={{
                    color: colors.charcoal,
                    fontFamily: getFontFamily("bold"),
                    fontSize: typography.sizes.sectionHeading,
                    lineHeight: typography.lineHeights.sectionHeading,
                  }}
                >
                  {item.value}
                </Text>
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
              marginTop: spacing.xl,
            }}
          >
            Recent earnings
          </Text>
          <View
            style={{
              backgroundColor: colors.white,
              borderColor: colors.border,
              borderRadius: radius.card,
              borderWidth: componentSizes.borderWidth,
              marginTop: spacing.md,
              paddingHorizontal: spacing.md,
              ...shadows.card,
            }}
          >
            {earningsPreview.recent.map((item, index) => (
              <View
                accessibilityLabel={`Sample delivery earnings, ${item.route}, ${item.date}, ${item.amount}.`}
                accessible
                key={`${item.date}-${item.route}`}
                style={{
                  alignItems: "center",
                  borderBottomWidth:
                    index < earningsPreview.recent.length - 1 ? componentSizes.borderWidth : 0,
                  borderColor: colors.border,
                  flexDirection: "row",
                  gap: spacing.sm,
                  paddingVertical: spacing.md,
                }}
              >
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
                  <RoutelyIcon color={colors.forest} name="package" size={componentSizes.icon} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      color: colors.charcoal,
                      fontFamily: getFontFamily("semibold"),
                      fontSize: typography.sizes.label,
                    }}
                  >
                    {item.route}
                  </Text>
                  <Text
                    style={{
                      color: colors.forest,
                      fontFamily: getFontFamily("regular"),
                      fontSize: typography.sizes.caption,
                    }}
                  >
                    {item.date}
                  </Text>
                </View>
                <Text
                  style={{
                    color: colors.charcoal,
                    fontFamily: getFontFamily("semibold"),
                    fontSize: typography.sizes.label,
                  }}
                >
                  {item.amount}
                </Text>
              </View>
            ))}
          </View>
        </PageContainer>
      </ScrollView>
      <DashboardNavigation active="Earnings" />
    </View>
  );
}
