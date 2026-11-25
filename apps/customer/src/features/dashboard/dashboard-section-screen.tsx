import type { ReactElement } from "react";
import { Image, Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { designTokens, getFontFamily } from "@routely/design-tokens";
import {
  AppearanceSwitch,
  PageContainer,
  RoutelyButton,
  RoutelyIcon,
  useAppearance,
} from "@routely/ui-mobile";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import quickSend from "../../../assets/illustrations/quick-send.png";
import quickSchedule from "../../../assets/illustrations/quick-schedule.png";
import quickAddress from "../../../assets/illustrations/quick-address.png";
import quickSupport from "../../../assets/illustrations/quick-support.png";
import gift from "../../../assets/illustrations/sender-gift.png";
import map from "../../../assets/illustrations/sender-map.png";
import { dashboardSections, type DashboardSectionId } from "./dashboard-sections";

const { colors, componentSizes, radius, shadows, spacing, typography } = designTokens;
const illustrations: Partial<Record<DashboardSectionId, number>> = {
  tracking: map,
  deliveries: quickSend,
  schedule: quickSchedule,
  addresses: quickAddress,
  support: quickSupport,
  offers: gift,
  location: quickAddress,
};

export function DashboardSectionScreen({
  section,
}: {
  section: DashboardSectionId | null;
}): ReactElement {
  const router = useRouter();
  const { mode } = useAppearance();
  const accent = designTokens.appearance[mode];
  const insets = useSafeAreaInsets();
  const content = section ? dashboardSections[section] : null;
  const artwork = section ? illustrations[section] : undefined;

  function exit() {
    if (router.canGoBack()) router.back();
    else router.replace("/dashboard");
  }

  return (
    <View style={styles.page}>
      <View style={styles.header}>
        <AppearanceSwitch
          leading={
            <Pressable
              accessibilityLabel="Go back"
              accessibilityRole="button"
              onPress={exit}
              style={styles.back}
            >
              <RoutelyIcon name="arrowLeft" />
            </Pressable>
          }
        />
      </View>
      <ScrollView
        accessibilityLabel={content ? `${content.title} content` : "Unavailable section"}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: Math.max(insets.bottom, spacing.lg) },
        ]}
        focusable={Platform.OS === "web" ? true : undefined}
        style={styles.scroll}
      >
        <PageContainer maxWidth={componentSizes.appShellMaxWidth}>
          {content && section ? (
            <>
              <Text style={styles.eyebrow}>{content.eyebrow}</Text>
              <Text accessibilityRole="header" style={styles.title}>
                {content.title}
              </Text>
              <Text style={styles.intro}>{content.introduction}</Text>

              <View style={[styles.hero, { backgroundColor: accent.primary }]}>
                <View style={styles.heroTop}>
                  <View style={[styles.heroIcon, { backgroundColor: accent.onPrimary }]}>
                    <RoutelyIcon
                      color={accent.primary}
                      name={content.icon}
                      size={componentSizes.iconLarge}
                    />
                  </View>
                  {artwork ? (
                    <Image
                      accessibilityElementsHidden
                      importantForAccessibility="no-hide-descendants"
                      resizeMode="contain"
                      source={artwork}
                      style={styles.artwork}
                    />
                  ) : (
                    <View style={[styles.heroLargeIcon, { backgroundColor: accent.onPrimary }]}>
                      <RoutelyIcon
                        color={accent.primary}
                        name={content.icon}
                        size={componentSizes.iconLarge * 2}
                      />
                    </View>
                  )}
                </View>
                <Text style={[styles.heroTitle, { color: accent.onPrimary }]}>
                  {content.headline}
                </Text>
                <Text style={[styles.heroSubtitle, { color: accent.onPrimary }]}>
                  Designed for the way you move.
                </Text>
              </View>

              <View style={styles.statusCard}>
                <View style={styles.statusIcon}>
                  <RoutelyIcon name={content.icon} />
                </View>
                <View style={styles.flex}>
                  <Text style={styles.cardTitle}>{content.statusTitle}</Text>
                  <Text style={styles.description}>{content.statusDescription}</Text>
                </View>
              </View>

              {section === "tracking" || section === "deliveries" ? (
                <View style={styles.exampleCard}>
                  <View style={styles.exampleIcon}>
                    <RoutelyIcon name="bike" />
                  </View>
                  <View style={styles.flex}>
                    <Text style={styles.cardTitle}>See how a delivery journey works</Text>
                    <Text style={styles.description}>
                      Explore example states, not a live delivery.
                    </Text>
                  </View>
                  <Pressable
                    accessibilityLabel="Explore example delivery journey"
                    accessibilityRole="button"
                    onPress={() => router.push("/delivery-journey")}
                    style={styles.arrow}
                  >
                    <RoutelyIcon name="arrowRight" />
                  </Pressable>
                </View>
              ) : null}

              {content.actions.length ? (
                <View style={styles.actionGroup}>
                  <Text style={styles.groupTitle}>What you can do</Text>
                  {content.actions.map((action) => (
                    <Pressable
                      accessibilityLabel={`${action.label}. ${action.detail}.`}
                      accessibilityRole="button"
                      accessibilityState={{ disabled: true }}
                      disabled
                      key={action.label}
                      style={styles.actionRow}
                    >
                      <View style={styles.actionIcon}>
                        <RoutelyIcon name={action.icon} />
                      </View>
                      <View style={styles.flex}>
                        <Text style={styles.actionTitle}>{action.label}</Text>
                        <Text style={styles.actionDetail}>{action.detail}</Text>
                      </View>
                      <RoutelyIcon color={colors.muted} name="chevronRight" />
                    </Pressable>
                  ))}
                </View>
              ) : null}
              <View style={styles.notice}>
                <RoutelyIcon name="shield" />
                <Text style={styles.noticeText}>
                  This section is not connected to your account or live services.
                </Text>
              </View>
            </>
          ) : (
            <View style={styles.invalid}>
              <Text accessibilityRole="header" style={styles.title}>
                Section unavailable
              </Text>
              <Text style={styles.description}>This dashboard section could not be found.</Text>
              <RoutelyButton
                label="Back to dashboard"
                onPress={() => router.replace("/dashboard")}
              />
            </View>
          )}
        </PageContainer>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { backgroundColor: colors.white, flex: 1 },
  header: { alignSelf: "center", maxWidth: componentSizes.appShellMaxWidth, width: "100%" },
  back: {
    alignItems: "center",
    backgroundColor: colors.container,
    borderRadius: radius.pill,
    height: componentSizes.touchTarget,
    justifyContent: "center",
    width: componentSizes.touchTarget,
  },
  scroll: { flex: 1, minHeight: 0 },
  scrollContent: { flexGrow: 1 },
  flex: { flex: 1 },
  eyebrow: {
    color: colors.forest,
    fontFamily: getFontFamily("semibold"),
    fontSize: typography.sizes.eyebrow,
    letterSpacing: typography.letterSpacing.eyebrow,
    marginTop: spacing.md,
  },
  title: {
    color: colors.charcoal,
    fontFamily: getFontFamily("bold"),
    fontSize: typography.sizes.heading,
    lineHeight: typography.lineHeights.heading,
    marginTop: spacing.xs,
  },
  intro: {
    color: colors.muted,
    fontFamily: getFontFamily("regular"),
    fontSize: typography.sizes.label,
    lineHeight: typography.lineHeights.supporting,
    marginTop: spacing.xs,
  },
  hero: {
    borderRadius: radius.panel,
    gap: spacing.sm,
    marginTop: spacing.lg,
    overflow: "hidden",
    padding: spacing.lg,
    ...shadows.card,
  },
  heroTop: { alignItems: "flex-start", flexDirection: "row", justifyContent: "space-between" },
  heroIcon: {
    alignItems: "center",
    borderRadius: radius.lg,
    height: componentSizes.buttonHeight,
    justifyContent: "center",
    width: componentSizes.buttonHeight,
  },
  heroLargeIcon: {
    alignItems: "center",
    borderRadius: radius.panel,
    height: componentSizes.routeDecorHeight,
    justifyContent: "center",
    width: componentSizes.routeDecorHeight,
  },
  artwork: {
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    height: componentSizes.routeDecorHeight,
    width: componentSizes.routeDecorHeight,
  },
  heroTitle: {
    fontFamily: getFontFamily("bold"),
    fontSize: typography.sizes.sectionHeading,
    lineHeight: typography.lineHeights.sectionHeading,
  },
  heroSubtitle: {
    fontFamily: getFontFamily("regular"),
    fontSize: typography.sizes.caption,
    lineHeight: typography.lineHeights.footnote,
  },
  statusCard: {
    alignItems: "flex-start",
    backgroundColor: colors.white,
    borderColor: colors.border,
    borderRadius: radius.card,
    borderWidth: componentSizes.borderWidth,
    flexDirection: "row",
    gap: spacing.md,
    marginTop: spacing.lg,
    padding: spacing.md,
    ...shadows.card,
  },
  statusIcon: {
    alignItems: "center",
    backgroundColor: colors.container,
    borderRadius: radius.lg,
    height: componentSizes.touchTarget,
    justifyContent: "center",
    width: componentSizes.touchTarget,
  },
  cardTitle: {
    color: colors.charcoal,
    fontFamily: getFontFamily("semibold"),
    fontSize: typography.sizes.cardHeading,
    lineHeight: typography.lineHeights.cardHeading,
  },
  description: {
    color: colors.muted,
    fontFamily: getFontFamily("regular"),
    fontSize: typography.sizes.caption,
    lineHeight: typography.lineHeights.footnote,
  },
  exampleCard: {
    alignItems: "center",
    backgroundColor: colors.container,
    borderRadius: radius.card,
    flexDirection: "row",
    gap: spacing.sm,
    marginTop: spacing.md,
    padding: spacing.md,
  },
  exampleIcon: {
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    height: componentSizes.touchTarget,
    justifyContent: "center",
    width: componentSizes.touchTarget,
  },
  arrow: {
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: radius.pill,
    height: componentSizes.touchTarget,
    justifyContent: "center",
    width: componentSizes.touchTarget,
  },
  actionGroup: { gap: spacing.sm, marginTop: spacing.lg },
  groupTitle: {
    color: colors.charcoal,
    fontFamily: getFontFamily("semibold"),
    fontSize: typography.sizes.cardHeading,
  },
  actionRow: {
    alignItems: "center",
    backgroundColor: colors.white,
    borderColor: colors.border,
    borderRadius: radius.card,
    borderWidth: componentSizes.borderWidth,
    flexDirection: "row",
    gap: spacing.sm,
    padding: spacing.md,
  },
  actionIcon: {
    alignItems: "center",
    backgroundColor: colors.container,
    borderRadius: radius.lg,
    height: componentSizes.touchTarget,
    justifyContent: "center",
    width: componentSizes.touchTarget,
  },
  actionTitle: {
    color: colors.charcoal,
    fontFamily: getFontFamily("semibold"),
    fontSize: typography.sizes.label,
  },
  actionDetail: {
    color: colors.muted,
    fontFamily: getFontFamily("regular"),
    fontSize: typography.sizes.caption,
    lineHeight: typography.lineHeights.footnote,
  },
  notice: {
    alignItems: "flex-start",
    backgroundColor: colors.container,
    borderRadius: radius.lg,
    flexDirection: "row",
    gap: spacing.sm,
    marginTop: spacing.lg,
    padding: spacing.md,
  },
  noticeText: {
    color: colors.forest,
    flex: 1,
    fontFamily: getFontFamily("regular"),
    fontSize: typography.sizes.caption,
    lineHeight: typography.lineHeights.footnote,
  },
  invalid: { gap: spacing.md, marginTop: spacing.lg },
});
