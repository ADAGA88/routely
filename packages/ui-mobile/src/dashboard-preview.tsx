import type { PropsWithChildren, ReactElement, ReactNode } from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { designTokens, getFontFamily } from "@routely/design-tokens";
import riderArtwork from "@routely/brand-assets/delivery-request-sample.png";
import { AppearanceSwitch, useAppearance } from "./appearance";
import { RoutelyLogo } from "./brand";
import { RoutelyIcon, type RoutelyIconName } from "./icons";
import { PageContainer } from "./primitives";

const { colors, componentSizes, radius, shadows, spacing, typography } = designTokens;

export function DashboardPreviewFrame({
  role,
  navigation,
  header,
  notice = "Preview only · Example data, not connected",
  selectedIndex = 0,
  children,
}: PropsWithChildren<{
  role: string;
  navigation: { label: string; icon: RoutelyIconName; onPress?: () => void }[];
  header?: ReactNode;
  notice?: string;
  selectedIndex?: number;
}>): ReactElement {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.page}>
      <View style={styles.header}>
        {header ?? (
          <AppearanceSwitch
            leading={<RoutelyLogo width={112} />}
            actions={
              <Pressable
                accessibilityLabel="Notifications unavailable"
                accessibilityRole="button"
                accessibilityState={{ disabled: true }}
                disabled
                style={styles.headerButton}
              >
                <RoutelyIcon name="bell" color={colors.muted} />
              </Pressable>
            }
          />
        )}
      </View>
      <ScrollView
        accessibilityLabel={`${role} dashboard content`}
        contentContainerStyle={styles.scrollContent}
        style={styles.scroll}
      >
        <PageContainer maxWidth={componentSizes.appShellMaxWidth}>
          {!header ? (
            <View style={styles.greeting}>
              <View style={styles.avatar}>
                <RoutelyIcon name="user" size={componentSizes.iconLarge} />
              </View>
              <View style={styles.flex}>
                <Text style={styles.caption}>Welcome to Routely</Text>
                <Text accessibilityRole="header" style={styles.greetingTitle}>
                  {role} dashboard
                </Text>
              </View>
            </View>
          ) : null}
          <Text style={styles.notice}>{notice}</Text>
          {children}
        </PageContainer>
      </ScrollView>
      <View accessibilityRole="tablist" style={styles.navigation}>
        <View
          style={[styles.navigationItems, { paddingBottom: Math.max(insets.bottom, spacing.sm) }]}
        >
          {navigation.map((item, index) => {
            const selected = index === selectedIndex;
            const disabled = index !== 0 && !item.onPress;
            return (
              <Pressable
                accessibilityLabel={disabled ? `${item.label} unavailable` : item.label}
                accessibilityRole="tab"
                accessibilityState={{ selected, disabled }}
                aria-selected={selected}
                disabled={disabled}
                key={item.label}
                onPress={item.onPress}
                style={styles.navItem}
              >
                <RoutelyIcon
                  name={item.icon}
                  color={selected ? colors.forest : colors.muted}
                  size={componentSizes.icon}
                />
                <Text style={[styles.navText, selected && styles.navSelected]}>{item.label}</Text>
              </Pressable>
            );
          })}
        </View>
      </View>
    </View>
  );
}

export function DashboardPreviewMetrics({
  items,
}: {
  items: { icon: RoutelyIconName; value: string; label: string }[];
}): ReactElement {
  const { mode } = useAppearance();
  const accent = designTokens.appearance[mode];
  return (
    <View style={styles.metrics}>
      {items.map((item) => (
        <View key={item.label} style={styles.metric}>
          <View style={[styles.metricIcon, { backgroundColor: accent.primary }]}>
            <RoutelyIcon
              name={item.icon}
              color={accent.onPrimary}
              size={componentSizes.iconSmall}
            />
          </View>
          <Text style={styles.metricValue}>{item.value}</Text>
          <Text style={styles.metricLabel}>{item.label}</Text>
        </View>
      ))}
    </View>
  );
}

export function DashboardPreviewHero({
  title,
  description,
  artwork,
}: {
  title: string;
  description: string;
  artwork: "motorcycle" | "tasks";
}): ReactElement {
  const { mode } = useAppearance();
  const accent = designTokens.appearance[mode];
  return (
    <View style={[styles.hero, { backgroundColor: accent.primary }]}>
      <View style={styles.heroCopy}>
        <Text accessibilityRole="header" style={[styles.heroTitle, { color: accent.onPrimary }]}>
          {title}
        </Text>
        <Text style={[styles.heroDescription, { color: accent.onPrimary }]}>{description}</Text>
        <View style={[styles.heroBadge, { backgroundColor: accent.onPrimary }]}>
          <Text style={[styles.heroBadgeText, { color: accent.primary }]}>PREVIEW</Text>
        </View>
      </View>
      {artwork === "motorcycle" ? (
        <Image
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
          resizeMode="cover"
          source={riderArtwork}
          style={styles.heroImage}
        />
      ) : (
        <View
          style={styles.heroIllustration}
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
        >
          <View style={styles.illustrationCard}>
            <RoutelyIcon name="clipboardList" size={componentSizes.touchTarget + spacing.md} />
          </View>
          <View style={styles.illustrationPin}>
            <RoutelyIcon name="mapPin" color={colors.white} size={componentSizes.iconLarge} />
          </View>
        </View>
      )}
    </View>
  );
}

export function DashboardPreviewCard({ children }: PropsWithChildren): ReactElement {
  return <View style={styles.card}>{children}</View>;
}

export function DashboardPreviewHeading({
  title,
  trailing,
}: {
  title: string;
  trailing?: ReactNode;
}): ReactElement {
  return (
    <View style={styles.sectionHeading}>
      <Text accessibilityRole="header" style={styles.sectionTitle}>
        {title}
      </Text>
      {trailing}
    </View>
  );
}

const styles = StyleSheet.create({
  page: { backgroundColor: colors.white, flex: 1 },
  flex: { flex: 1 },
  header: { alignSelf: "center", maxWidth: componentSizes.appShellMaxWidth, width: "100%" },
  headerButton: {
    alignItems: "center",
    justifyContent: "center",
    minHeight: componentSizes.touchTarget,
    minWidth: componentSizes.touchTarget,
  },
  scroll: { flex: 1, minHeight: 0 },
  scrollContent: { flexGrow: 1, paddingBottom: spacing.lg },
  greeting: { alignItems: "center", flexDirection: "row", gap: spacing.sm, marginTop: spacing.sm },
  avatar: {
    alignItems: "center",
    backgroundColor: colors.container,
    borderRadius: radius.pill,
    height: componentSizes.buttonHeight,
    justifyContent: "center",
    width: componentSizes.buttonHeight,
  },
  caption: {
    color: colors.muted,
    fontFamily: getFontFamily("regular"),
    fontSize: typography.sizes.caption,
  },
  greetingTitle: {
    color: colors.charcoal,
    fontFamily: getFontFamily("semibold"),
    fontSize: typography.sizes.label,
  },
  notice: {
    color: colors.muted,
    fontFamily: getFontFamily("regular"),
    fontSize: typography.sizes.caption,
    marginTop: spacing.sm,
  },
  metrics: { flexDirection: "row", gap: spacing.sm, marginTop: spacing.md },
  metric: {
    backgroundColor: colors.background,
    borderColor: colors.border,
    borderRadius: radius.lg,
    borderWidth: componentSizes.borderWidth,
    flex: 1,
    gap: spacing.xs,
    padding: spacing.sm,
  },
  metricIcon: {
    alignItems: "center",
    borderRadius: radius.pill,
    height: componentSizes.iconLarge + spacing.sm,
    justifyContent: "center",
    width: componentSizes.iconLarge + spacing.sm,
  },
  metricValue: {
    color: colors.charcoal,
    fontFamily: getFontFamily("bold"),
    fontSize: typography.sizes.numeric,
  },
  metricLabel: {
    color: colors.muted,
    fontFamily: getFontFamily("medium"),
    fontSize: typography.sizes.caption,
    lineHeight: typography.lineHeights.caption,
  },
  hero: {
    alignItems: "center",
    borderRadius: radius.card,
    flexDirection: "row",
    gap: spacing.sm,
    marginTop: spacing.md,
    minHeight: componentSizes.routeHeight,
    overflow: "hidden",
    padding: spacing.md,
  },
  heroCopy: { alignItems: "flex-start", flex: 1, gap: spacing.xs },
  heroTitle: {
    fontFamily: getFontFamily("bold"),
    fontSize: typography.sizes.cardHeading,
    lineHeight: typography.lineHeights.cardHeading,
  },
  heroDescription: {
    fontFamily: getFontFamily("regular"),
    fontSize: typography.sizes.caption,
    lineHeight: typography.lineHeights.caption,
  },
  heroBadge: {
    borderRadius: radius.pill,
    marginTop: spacing.xs,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  heroBadgeText: { fontFamily: getFontFamily("semibold"), fontSize: typography.sizes.caption },
  heroImage: {
    borderRadius: radius.lg,
    height: componentSizes.routeDecorHeight,
    width: componentSizes.routeDecorHeight,
  },
  heroIllustration: {
    alignItems: "center",
    height: componentSizes.routeDecorHeight,
    justifyContent: "center",
    width: componentSizes.routeDecorHeight,
  },
  illustrationCard: {
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    height: componentSizes.routeDecorHeight - spacing.md,
    justifyContent: "center",
    transform: [{ rotate: "8deg" }],
    width: componentSizes.routeDecorHeight - spacing.lg,
  },
  illustrationPin: {
    alignItems: "center",
    backgroundColor: colors.forest,
    borderRadius: radius.pill,
    bottom: 0,
    height: componentSizes.touchTarget,
    justifyContent: "center",
    position: "absolute",
    right: 0,
    width: componentSizes.touchTarget,
  },
  card: {
    backgroundColor: colors.white,
    borderColor: colors.border,
    borderRadius: radius.card,
    borderWidth: componentSizes.borderWidth,
    gap: spacing.sm,
    marginTop: spacing.md,
    padding: spacing.md,
    ...shadows.card,
  },
  sectionHeading: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: spacing.md,
  },
  sectionTitle: {
    color: colors.charcoal,
    fontFamily: getFontFamily("semibold"),
    fontSize: typography.sizes.cardHeading,
  },
  navigation: {
    backgroundColor: colors.white,
    borderColor: colors.border,
    borderTopWidth: componentSizes.borderWidth,
  },
  navigationItems: {
    alignSelf: "center",
    flexDirection: "row",
    maxWidth: componentSizes.appShellMaxWidth,
    paddingTop: spacing.sm,
    width: "100%",
  },
  navItem: {
    alignItems: "center",
    flex: 1,
    gap: spacing.xs,
    justifyContent: "center",
    minHeight: componentSizes.touchTarget,
  },
  navText: {
    color: colors.muted,
    fontFamily: getFontFamily("medium"),
    fontSize: typography.sizes.caption,
  },
  navSelected: { color: colors.forest, fontFamily: getFontFamily("semibold") },
});
