import { useState, type ReactElement } from "react";
import { Image, Pressable, StyleSheet, Text, View, useWindowDimensions } from "react-native";
import Svg, { Circle } from "react-native-svg";
import { designTokens, getFontFamily } from "@routely/design-tokens";
import {
  AppearanceSwitch,
  DashboardPreviewFrame,
  PageContainer,
  RoutelyIcon,
  RoutelyLogo,
  useAppearance,
  type RoutelyIconName,
} from "@routely/ui-mobile";
import motorcycle from "@routely/brand-assets/owner-motorcycle-preview.png";
import ownerProfile from "@routely/brand-assets/owner-profile-reference.png";
import { RiderAvatarExamples } from "./rider-avatars";

const { colors, componentSizes, radius, shadows, spacing, typography } = designTokens;
const bars = [5, 7, 9, 12, 16, 21, 28, 36, 44] as const;
const metrics: { icon: RoutelyIconName; value: string; label: string }[] = [
  { icon: "fleetMotorcycle", value: "4", label: "Total bikes" },
  { icon: "fleetActive", value: "3", label: "Active" },
  { icon: "fleetMaintenance", value: "1", label: "In maintenance" },
];

function UnavailableLink({ label }: { label: string }): ReactElement {
  return (
    <Pressable
      accessibilityLabel={`${label} unavailable`}
      accessibilityRole="button"
      accessibilityState={{ disabled: true }}
      disabled
      style={styles.link}
    >
      <Text style={styles.linkText}>{label}</Text>
      <RoutelyIcon name="chevronRight" size={componentSizes.iconSmall} color={colors.muted} />
    </Pressable>
  );
}

export function OwnerDashboardScreen(): ReactElement {
  const { mode } = useAppearance();
  const accent = designTokens.appearance[mode];
  const heroText = mode === "lime" ? colors.forest : colors.white;
  const [summaryHeight, setSummaryHeight] = useState(componentSizes.buttonHeight * 2);
  const { width } = useWindowDimensions();
  const portraitSize = Math.min(
    componentSizes.buttonHeight + spacing.xs,
    (width - spacing.lg * 2 - spacing.sm * 4) / 5,
  );

  return (
    <DashboardPreviewFrame
      role="Owner"
      notice="Example figures · Not connected"
      header={
        <View style={styles.profileHeader}>
          <View style={{ backgroundColor: accent.primary }}>
            <AppearanceSwitch
              accentBackground
              iconSurface
              leading={
                <View style={styles.logoPill}>
                  <RoutelyLogo width={96} />
                </View>
              }
              actions={
                <Pressable
                  accessibilityLabel="Notifications unavailable"
                  accessibilityRole="button"
                  accessibilityState={{ disabled: true }}
                  disabled
                  style={styles.notificationAction}
                >
                  <View style={styles.notification}>
                    <RoutelyIcon
                      name="bell"
                      color={colors.forest}
                      size={componentSizes.iconSmall + 2}
                    />
                  </View>
                </Pressable>
              }
            />
            <PageContainer maxWidth={componentSizes.appShellMaxWidth}>
              <View style={[styles.profile, { paddingBottom: spacing.lg + summaryHeight / 2 }]}>
                <Image
                  accessibilityLabel="Example profile portrait"
                  source={ownerProfile}
                  style={styles.profileAvatar}
                />
                <View style={styles.flex}>
                  <Text
                    accessibilityRole="header"
                    style={[styles.profileName, { color: accent.onPrimary }]}
                  >
                    <Text style={styles.greetingIntro}>Good morning,{"\n"}</Text>
                    Emeka!
                  </Text>
                  <Text style={[styles.greeting, { color: accent.onPrimary }]}>
                    Your fleet at a glance.
                  </Text>
                </View>
              </View>
            </PageContainer>
          </View>
          <PageContainer
            maxWidth={componentSizes.appShellMaxWidth}
            style={{ marginTop: -summaryHeight / 2 }}
          >
            <View
              onLayout={(event) => setSummaryHeight(event.nativeEvent.layout.height)}
              style={styles.metrics}
            >
              {metrics.map((metric) => (
                <View key={metric.label} style={styles.metric}>
                  <RoutelyIcon
                    name={metric.icon}
                    color={colors.forest}
                    size={componentSizes.touchTarget}
                  />
                  <Text style={styles.metricValue}>{metric.value}</Text>
                  <Text style={styles.metricLabel}>{metric.label}</Text>
                </View>
              ))}
            </View>
          </PageContainer>
        </View>
      }
      navigation={[
        { label: "Home", icon: "home" },
        { label: "Fleet", icon: "motorcycle" },
        { label: "Reports", icon: "chart" },
        { label: "Profile", icon: "user" },
      ]}
    >
      <View style={[styles.hero, mode === "emerald" && { backgroundColor: accent.primary }]}>
        {mode === "lime" ? <View pointerEvents="none" style={styles.heroTint} /> : null}
        <View style={styles.heroCopy}>
          <Text accessibilityRole="header" style={[styles.heroTitle, { color: heroText }]}>
            Your fleet{"\n"}is in great shape!
          </Text>
          <View
            style={[
              styles.heroBadge,
              { backgroundColor: mode === "lime" ? colors.forest : colors.white },
            ]}
          >
            <Text
              style={[
                styles.heroBadgeText,
                { color: mode === "lime" ? colors.white : colors.forest },
              ]}
            >
              FLEET OVERVIEW
            </Text>
          </View>
        </View>
        <Image
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
          resizeMode="contain"
          source={motorcycle}
          style={styles.motorcycle}
        />
      </View>

      <View style={styles.card}>
        <View style={styles.earningsRow}>
          <View style={[styles.walletIcon, { backgroundColor: accent.primary }]}>
            <RoutelyIcon name="wallet" color={accent.onPrimary} size={componentSizes.iconLarge} />
          </View>
          <View style={styles.flex}>
            <View style={styles.cardHeader}>
              <Text accessibilityRole="header" style={styles.cardTitle}>
                Fleet earnings
              </Text>
              <Text style={styles.caption}>This month</Text>
            </View>
            <View style={styles.earningsLine}>
              <Text style={styles.earnings}>₦248,750</Text>
              <View style={styles.growthRow}>
                <RoutelyIcon
                  name="trendingUp"
                  color={colors.forest}
                  size={componentSizes.iconSmall}
                />
                <Text style={styles.growth}>12%</Text>
              </View>
            </View>
          </View>
        </View>
        <View accessibilityLabel="Illustrative earnings chart" accessible style={styles.bars}>
          {bars.map((height, index) => (
            <View
              key={height}
              style={[
                styles.bar,
                { height, backgroundColor: accent.primary, opacity: (index + 2) / 10 },
              ]}
            />
          ))}
        </View>
      </View>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.performanceHeading}>
            <View style={styles.performanceIcon}>
              <RoutelyIcon name="chart" color={colors.forest} size={componentSizes.iconSmall} />
            </View>
            <Text accessibilityRole="header" style={styles.cardTitle}>
              Fleet performance
            </Text>
          </View>
          <UnavailableLink label="View details" />
        </View>
        <View style={styles.performance}>
          <View accessible accessibilityLabel="Example performance 92 percent" style={styles.chart}>
            <Svg height="80" viewBox="0 0 80 80" width="80">
              <Circle cx="40" cy="40" r="32" fill="none" stroke={colors.border} strokeWidth="8" />
              <Circle
                cx="40"
                cy="40"
                r="32"
                fill="none"
                stroke={accent.primary}
                strokeWidth="8"
                strokeDasharray="185 201"
              />
            </Svg>
            <Text style={styles.chartValue}>92%</Text>
          </View>
          <View style={styles.stats}>
            {[
              { label: "Active deliveries", value: "86", color: accent.primary },
              { label: "Completed", value: "72", color: colors.lime },
              { label: "On hold", value: "14", color: colors.border },
            ].map((item) => (
              <View key={item.label} style={styles.statRow}>
                <View style={[styles.statDot, { backgroundColor: item.color }]} />
                <Text style={styles.statLabel}>{item.label}</Text>
                <Text style={styles.statValue}>{item.value}</Text>
              </View>
            ))}
          </View>
          <View style={styles.rating}>
            <RoutelyIcon name="star" color={colors.forest} size={componentSizes.iconLarge} />
            <Text style={styles.ratingValue}>4.8</Text>
            <Text style={styles.caption}>Rating</Text>
          </View>
        </View>
      </View>

      <View style={styles.ridersHeading}>
        <Text accessibilityRole="header" style={styles.sectionTitle}>
          Your Riders
        </Text>
        <UnavailableLink label="View all" />
      </View>
      <View style={styles.riders}>
        <RiderAvatarExamples size={portraitSize} />
        <Pressable
          accessibilityLabel="Add rider unavailable"
          accessibilityRole="button"
          accessibilityState={{ disabled: true }}
          disabled
          style={[styles.addRider, { height: portraitSize, width: portraitSize }]}
        >
          <View pointerEvents="none" style={styles.addRiderTint} />
          <RoutelyIcon name="plus" color={colors.forest} />
        </Pressable>
      </View>
    </DashboardPreviewFrame>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, minWidth: 0 },
  profileHeader: { backgroundColor: colors.white, zIndex: 1 },
  logoPill: {
    alignSelf: "flex-start",
    backgroundColor: colors.white,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  profile: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.md,
    paddingTop: spacing.sm,
  },
  profileAvatar: {
    borderColor: colors.white,
    borderRadius: radius.pill,
    borderWidth: componentSizes.borderWidth * 2,
    height: componentSizes.buttonHeight + spacing.xl,
    width: componentSizes.buttonHeight + spacing.xl,
  },
  greeting: {
    fontFamily: getFontFamily("regular"),
    fontSize: typography.sizes.label,
    lineHeight: typography.lineHeights.supporting,
  },
  profileName: {
    fontFamily: getFontFamily("semibold"),
    fontSize: typography.sizes.sectionHeading,
    lineHeight: typography.lineHeights.sectionHeading,
  },
  greetingIntro: {
    fontFamily: getFontFamily("medium"),
    fontSize: typography.sizes.label,
    lineHeight: typography.lineHeights.supporting,
  },
  notificationAction: {
    alignItems: "center",
    justifyContent: "center",
    minHeight: componentSizes.touchTarget,
    minWidth: componentSizes.touchTarget,
  },
  notification: {
    alignItems: "center",
    backgroundColor: colors.white,
    borderColor: colors.border,
    borderRadius: radius.pill,
    borderWidth: componentSizes.borderWidth,
    height: componentSizes.iconLarge + spacing.sm,
    justifyContent: "center",
    width: componentSizes.iconLarge + spacing.sm,
  },
  hero: {
    alignItems: "center",
    backgroundColor: colors.background,
    borderColor: colors.border,
    borderRadius: radius.card,
    borderWidth: componentSizes.borderWidth,
    flexDirection: "row",
    marginTop: spacing.sm,
    minHeight: componentSizes.routeHeight,
    overflow: "hidden",
    padding: spacing.md,
  },
  heroTint: { ...StyleSheet.absoluteFillObject, backgroundColor: colors.lime, opacity: 0.26 },
  heroCopy: { alignItems: "flex-start", flex: 1, gap: spacing.sm, zIndex: 1 },
  heroTitle: {
    fontFamily: getFontFamily("bold"),
    fontSize: typography.sizes.cardHeading,
    lineHeight: typography.lineHeights.cardHeading,
  },
  heroBadge: {
    borderRadius: radius.md,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  heroBadgeText: { fontFamily: getFontFamily("semibold"), fontSize: typography.sizes.caption },
  motorcycle: {
    height: componentSizes.routeHeight - spacing.md,
    width: componentSizes.routeHeight - spacing.sm,
  },
  metrics: {
    backgroundColor: colors.white,
    borderColor: colors.border,
    borderRadius: radius.card,
    borderWidth: componentSizes.borderWidth,
    flexDirection: "row",
    gap: spacing.xs,
    minHeight: componentSizes.buttonHeight * 2,
    padding: spacing.sm,
    ...shadows.card,
  },
  metric: {
    alignItems: "center",
    backgroundColor: colors.background,
    borderRadius: radius.md,
    flex: 1,
    gap: spacing.xs,
    justifyContent: "center",
    paddingHorizontal: spacing.xs,
    paddingVertical: spacing.sm,
  },
  metricValue: {
    color: colors.charcoal,
    fontFamily: getFontFamily("bold"),
    fontSize: typography.sizes.numeric,
    lineHeight: typography.lineHeights.cardHeading,
  },
  metricLabel: {
    color: colors.charcoal,
    fontFamily: getFontFamily("medium"),
    fontSize: typography.sizes.caption,
    lineHeight: typography.lineHeights.caption,
    textAlign: "center",
  },
  card: {
    backgroundColor: colors.white,
    borderColor: colors.border,
    borderRadius: radius.card,
    borderWidth: componentSizes.borderWidth,
    marginTop: spacing.md,
    padding: spacing.md,
    ...shadows.card,
  },
  earningsRow: { alignItems: "center", flexDirection: "row", gap: spacing.sm },
  walletIcon: {
    alignItems: "center",
    borderRadius: radius.pill,
    height: componentSizes.touchTarget,
    justifyContent: "center",
    width: componentSizes.touchTarget,
  },
  cardHeader: { alignItems: "center", flexDirection: "row", justifyContent: "space-between" },
  cardTitle: {
    color: colors.charcoal,
    fontFamily: getFontFamily("semibold"),
    fontSize: typography.sizes.label,
  },
  caption: {
    color: colors.muted,
    fontFamily: getFontFamily("regular"),
    fontSize: typography.sizes.caption,
    lineHeight: typography.lineHeights.caption,
  },
  earningsLine: { alignItems: "center", flexDirection: "row", flexWrap: "wrap", gap: spacing.sm },
  earnings: {
    color: colors.charcoal,
    fontFamily: getFontFamily("bold"),
    fontSize: typography.sizes.numeric,
  },
  growth: {
    color: colors.forest,
    fontFamily: getFontFamily("semibold"),
    fontSize: typography.sizes.caption,
  },
  growthRow: { alignItems: "center", flexDirection: "row", gap: spacing.xs },
  performanceHeading: { alignItems: "center", flexDirection: "row", gap: spacing.sm },
  performanceIcon: {
    alignItems: "center",
    backgroundColor: colors.background,
    borderRadius: radius.md,
    height: componentSizes.iconLarge + spacing.sm,
    justifyContent: "center",
    width: componentSizes.iconLarge + spacing.sm,
  },
  bars: {
    alignItems: "flex-end",
    flexDirection: "row",
    gap: spacing.xs,
    height: componentSizes.touchTarget,
    justifyContent: "flex-end",
  },
  bar: { borderTopLeftRadius: radius.sm, borderTopRightRadius: radius.sm, width: spacing.md },
  link: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-end",
    minHeight: componentSizes.touchTarget,
  },
  linkText: {
    color: colors.muted,
    fontFamily: getFontFamily("medium"),
    fontSize: typography.sizes.caption,
  },
  performance: { alignItems: "center", flexDirection: "row", gap: spacing.sm },
  chart: { alignItems: "center", height: 80, justifyContent: "center", width: 80 },
  chartValue: {
    color: colors.charcoal,
    fontFamily: getFontFamily("bold"),
    fontSize: typography.sizes.label,
    position: "absolute",
  },
  stats: { flex: 1, gap: spacing.xs, minWidth: 0 },
  statRow: { alignItems: "center", flexDirection: "row", gap: spacing.xs },
  statDot: { borderRadius: radius.pill, height: spacing.sm, width: spacing.sm },
  statLabel: {
    color: colors.charcoal,
    flex: 1,
    fontFamily: getFontFamily("regular"),
    fontSize: typography.sizes.caption,
  },
  statValue: {
    color: colors.charcoal,
    fontFamily: getFontFamily("semibold"),
    fontSize: typography.sizes.caption,
  },
  rating: {
    alignItems: "center",
    borderLeftColor: colors.border,
    borderLeftWidth: componentSizes.borderWidth,
    paddingLeft: spacing.sm,
  },
  ratingValue: {
    color: colors.charcoal,
    fontFamily: getFontFamily("bold"),
    fontSize: typography.sizes.numeric,
  },
  ridersHeading: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: spacing.sm,
  },
  sectionTitle: {
    color: colors.charcoal,
    fontFamily: getFontFamily("semibold"),
    fontSize: typography.sizes.cardHeading,
  },
  riders: { alignItems: "center", flexDirection: "row", gap: spacing.sm },
  addRider: {
    alignItems: "center",
    backgroundColor: colors.background,
    borderRadius: radius.pill,
    justifyContent: "center",
    overflow: "hidden",
  },
  addRiderTint: { ...StyleSheet.absoluteFillObject, backgroundColor: colors.lime, opacity: 0.2 },
});
