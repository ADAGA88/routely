import type { ReactElement } from "react";
import { useRouter } from "expo-router";
import {
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { designTokens, getFontFamily } from "@routely/design-tokens";
import {
  PageContainer,
  AppearanceSwitch,
  RoutelyIcon,
  RoutelyLogo,
  useAppearance,
  type RoutelyIconName,
} from "@routely/ui-mobile";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import parcels from "../../../assets/illustrations/sender-parcels.png";
import gift from "../../../assets/illustrations/sender-gift.png";
import quickSend from "../../../assets/illustrations/quick-send.png";
import quickSchedule from "../../../assets/illustrations/quick-schedule.png";
import quickAddress from "../../../assets/illustrations/quick-address.png";
import quickSupport from "../../../assets/illustrations/quick-support.png";
import type { DashboardSectionId } from "./dashboard-sections";
import { TrackingCard } from "./tracking-card";

const { colors, componentSizes, radius, shadows, spacing, typography } = designTokens;

const quickActions = [
  { illustration: quickSend, label: "Send package", section: null },
  { illustration: quickSchedule, label: "Schedule delivery", section: "schedule" },
  { illustration: quickAddress, label: "Saved addresses", section: "addresses" },
  { illustration: quickSupport, label: "Help & support", section: "support" },
] as const satisfies readonly {
  illustration: number;
  label: string;
  section: DashboardSectionId | null;
}[];

const navigation: { icon: RoutelyIconName; label: string; section: DashboardSectionId | null }[] = [
  { icon: "home", label: "Home", section: null },
  { icon: "package", label: "My deliveries", section: "deliveries" },
  { icon: "wallet", label: "Wallet", section: "wallet" },
  { icon: "user", label: "Profile", section: "profile" },
];

function QuickActionContent({
  action,
  available,
}: {
  action: (typeof quickActions)[number];
  available: boolean;
}): ReactElement {
  return (
    <View style={styles.quickContent}>
      <Image
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
        resizeMode="contain"
        source={action.illustration}
        style={styles.quickIllustration}
      />
      <Text style={styles.quickText}>{action.label}</Text>
      <Text style={styles.quickNote}>{available ? "Plan a delivery" : "Explore"}</Text>
    </View>
  );
}

function UnavailableAction({
  label,
  children,
  style,
}: {
  label: string;
  children: ReactElement;
  style?: StyleProp<ViewStyle>;
}): ReactElement {
  return (
    <Pressable
      accessibilityLabel={`${label}. Not connected yet.`}
      accessibilityRole="button"
      accessibilityState={{ disabled: true }}
      disabled
      style={style}
    >
      {children}
    </Pressable>
  );
}

export function SenderDashboardScreen({
  onPreviewUnavailable,
}: {
  onPreviewUnavailable?: () => void;
} = {}): ReactElement {
  const router = useRouter();
  const { mode } = useAppearance();
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const accent = designTokens.appearance[mode];
  const compact = width < 360;
  const artworkSize = compact ? componentSizes.touchTarget * 2 : componentSizes.routeDecorHeight;

  function openSection(section: DashboardSectionId) {
    if (onPreviewUnavailable) return onPreviewUnavailable();
    router.push({ pathname: "/dashboard-section", params: { section } });
  }

  function openPreviewRoute(path: "/send-package" | "/tracking-order") {
    if (onPreviewUnavailable) return onPreviewUnavailable();
    router.push(path);
  }

  return (
    <View style={styles.page}>
      <View style={styles.header}>
        <AppearanceSwitch
          leading={<RoutelyLogo width={112} />}
          actions={
            <UnavailableAction label="Notifications" style={styles.headerAction}>
              <RoutelyIcon color={colors.forest} name="bell" size={componentSizes.iconLarge} />
            </UnavailableAction>
          }
        />
      </View>
      <ScrollView
        accessibilityLabel="Dashboard content"
        contentContainerStyle={styles.scrollContent}
        focusable={Platform.OS === "web" ? true : undefined}
        style={styles.scroll}
      >
        <PageContainer maxWidth={componentSizes.appShellMaxWidth}>
          <Text accessibilityRole="header" style={styles.greeting}>
            Hello there
          </Text>
          <Text style={styles.intro}>Send, track and receive with Routely.</Text>

          <Pressable
            accessibilityLabel="Current location"
            accessibilityRole="button"
            onPress={() => openSection("location")}
            style={styles.locationCard}
          >
            <View style={styles.locationContent}>
              <View style={[styles.locationIcon, { backgroundColor: accent.primary }]}>
                <RoutelyIcon color={accent.onPrimary} name="mapPin" size={componentSizes.icon} />
              </View>
              <View style={styles.flex}>
                <Text style={styles.locationLabel}>Current location</Text>
                <Text style={styles.locationValue}>Location unavailable</Text>
              </View>
              <RoutelyIcon color={colors.forest} name="chevronRight" />
            </View>
          </Pressable>

          <View style={[styles.hero, { backgroundColor: accent.primary }]}>
            {mode === "lime" ? <View pointerEvents="none" style={styles.heroTint} /> : null}
            <View style={styles.heroCopy}>
              <Text
                accessibilityRole="header"
                style={[styles.heroTitle, { color: accent.onPrimary }]}
              >
                Send a Package{"\n"}in Seconds
              </Text>
              <Text style={[styles.heroSubtitle, { color: accent.onPrimary }]}>
                Plan your delivery details.
              </Text>
              <Pressable
                accessibilityLabel="Send a package"
                accessibilityRole="button"
                onPress={() => openPreviewRoute("/send-package")}
                style={[
                  styles.heroButton,
                  { backgroundColor: mode === "lime" ? colors.forest : colors.white },
                ]}
              >
                <View style={styles.inline}>
                  <Text
                    style={[
                      styles.heroButtonText,
                      { color: mode === "lime" ? colors.white : colors.forest },
                    ]}
                  >
                    Send a Package
                  </Text>
                  <RoutelyIcon
                    color={mode === "lime" ? colors.white : colors.forest}
                    name="arrowRight"
                    size={componentSizes.iconSmall}
                  />
                </View>
              </Pressable>
            </View>
            <Image
              accessibilityElementsHidden
              importantForAccessibility="no-hide-descendants"
              resizeMode="contain"
              source={parcels}
              style={{ height: artworkSize, width: artworkSize }}
            />
          </View>

          <View style={styles.sectionHeader}>
            <Text accessibilityRole="header" style={styles.sectionTitle}>
              Track Your Delivery
            </Text>
            <Pressable
              accessibilityLabel="View all deliveries"
              accessibilityRole="button"
              onPress={() => openSection("deliveries")}
              style={styles.headerLink}
            >
              <View style={styles.inline}>
                <Text style={styles.linkText}>View all</Text>
                <RoutelyIcon
                  color={colors.forest}
                  name="arrowRight"
                  size={componentSizes.iconSmall}
                />
              </View>
            </Pressable>
          </View>

          <TrackingCard onTracking={() => openPreviewRoute("/tracking-order")} />

          <Text accessibilityRole="header" style={[styles.sectionTitle, styles.quickTitle]}>
            Quick Actions
          </Text>
          <View style={styles.quickGrid}>
            {quickActions.map((action) => (
              <Pressable
                accessibilityLabel={action.label}
                accessibilityRole="button"
                key={action.label}
                onPress={() =>
                  action.section ? openSection(action.section) : openPreviewRoute("/send-package")
                }
                style={styles.quickCard}
              >
                <QuickActionContent action={action} available={!action.section} />
              </Pressable>
            ))}
          </View>

          <View style={styles.sectionHeader}>
            <Text accessibilityRole="header" style={styles.sectionTitle}>
              Recent activity
            </Text>
            <Pressable
              accessibilityLabel="View delivery history"
              accessibilityRole="button"
              onPress={() => openSection("deliveries")}
              style={styles.headerLink}
            >
              <View style={styles.inline}>
                <Text style={styles.linkText}>View all</Text>
                <RoutelyIcon
                  color={colors.forest}
                  name="arrowRight"
                  size={componentSizes.iconSmall}
                />
              </View>
            </Pressable>
          </View>
          <View style={styles.activityCard}>
            <View style={[styles.activityIcon, { backgroundColor: accent.primary }]}>
              <RoutelyIcon
                color={accent.onPrimary}
                name="history"
                size={componentSizes.iconLarge}
              />
            </View>
            <View style={styles.flex}>
              <Text style={styles.activityTitle}>Delivery activity unavailable</Text>
              <Text style={styles.activityDescription}>
                Recent deliveries will appear here when history is connected.
              </Text>
            </View>
          </View>

          <View style={styles.offerCard}>
            <Image
              accessibilityElementsHidden
              importantForAccessibility="no-hide-descendants"
              resizeMode="contain"
              source={gift}
              style={styles.giftImage}
            />
            <View style={styles.offerCopy}>
              <Text style={styles.offerTitle}>Offers and rewards</Text>
              <Text style={styles.offerSubtitle}>Offers are not connected yet.</Text>
            </View>
            <Pressable
              accessibilityLabel="View offers"
              accessibilityRole="button"
              onPress={() => openSection("offers")}
              style={styles.offerButton}
            >
              <Text style={styles.offerButtonText}>View Offers</Text>
            </Pressable>
          </View>
        </PageContainer>
      </ScrollView>

      <View accessibilityRole="tablist" style={styles.navigation}>
        <View
          style={[styles.navigationItems, { paddingBottom: Math.max(insets.bottom, spacing.sm) }]}
        >
          {navigation.map((item) => {
            const selected = item.label === "Home";
            return (
              <Pressable
                accessibilityLabel={item.label}
                accessibilityRole="tab"
                accessibilityState={{ selected }}
                aria-selected={selected}
                key={item.label}
                onPress={() => {
                  if (item.section) openSection(item.section);
                }}
                style={styles.navItem}
              >
                <RoutelyIcon
                  color={selected ? colors.forest : colors.muted}
                  name={item.icon}
                  size={componentSizes.iconLarge}
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

const styles = StyleSheet.create({
  page: { backgroundColor: colors.white, flex: 1 },
  scroll: { flex: 1, minHeight: 0 },
  scrollContent: { flexGrow: 1, paddingBottom: spacing.lg },
  flex: { flex: 1 },
  inline: { alignItems: "center", flexDirection: "row", gap: spacing.xs },
  header: { alignSelf: "center", maxWidth: componentSizes.appShellMaxWidth, width: "100%" },
  headerAction: {
    alignItems: "center",
    justifyContent: "center",
    minHeight: componentSizes.touchTarget,
    minWidth: componentSizes.touchTarget,
    opacity: 0.65,
  },
  greeting: {
    color: colors.charcoal,
    fontFamily: getFontFamily("bold"),
    fontSize: typography.sizes.heading,
    lineHeight: typography.lineHeights.heading,
    marginTop: spacing.md,
  },
  intro: {
    color: colors.charcoal,
    fontFamily: getFontFamily("regular"),
    fontSize: typography.sizes.label,
    lineHeight: typography.lineHeights.supporting,
  },
  locationCard: {
    backgroundColor: colors.white,
    borderColor: colors.border,
    borderRadius: radius.card,
    borderWidth: componentSizes.borderWidth,
    marginTop: spacing.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  locationContent: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.md,
    minHeight: componentSizes.touchTarget,
  },
  locationIcon: {
    alignItems: "center",
    borderRadius: radius.pill,
    height: componentSizes.touchTarget,
    justifyContent: "center",
    width: componentSizes.touchTarget,
  },
  locationLabel: {
    color: colors.charcoal,
    fontFamily: getFontFamily("regular"),
    fontSize: typography.sizes.caption,
  },
  locationValue: {
    color: colors.charcoal,
    fontFamily: getFontFamily("semibold"),
    fontSize: typography.sizes.label,
  },
  hero: {
    alignItems: "center",
    borderRadius: radius.panel,
    flexDirection: "row",
    marginTop: spacing.md,
    overflow: "hidden",
    padding: spacing.md,
    ...shadows.card,
  },
  heroTint: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.white,
    opacity: 0.35,
  },
  heroCopy: { flex: 1, gap: spacing.sm },
  heroTitle: {
    fontFamily: getFontFamily("bold"),
    fontSize: typography.sizes.sectionHeading,
    lineHeight: typography.lineHeights.sectionHeading,
  },
  heroSubtitle: {
    fontFamily: getFontFamily("medium"),
    fontSize: typography.sizes.caption,
    lineHeight: typography.lineHeights.footnote,
  },
  heroButton: {
    alignItems: "center",
    alignSelf: "flex-start",
    borderRadius: radius.pill,
    justifyContent: "center",
    minHeight: componentSizes.touchTarget,
    paddingHorizontal: spacing.md,
  },
  heroButtonText: { fontFamily: getFontFamily("semibold"), fontSize: typography.sizes.caption },
  sectionHeader: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.sm,
    justifyContent: "space-between",
    marginTop: spacing.lg,
  },
  sectionTitle: {
    color: colors.charcoal,
    flexShrink: 1,
    fontFamily: getFontFamily("bold"),
    fontSize: typography.sizes.cardHeading,
    lineHeight: typography.lineHeights.cardHeading,
  },
  headerLink: { justifyContent: "center", minHeight: componentSizes.touchTarget },
  linkText: {
    color: colors.forest,
    fontFamily: getFontFamily("semibold"),
    fontSize: typography.sizes.caption,
  },
  quickTitle: { marginTop: spacing.lg },
  quickGrid: { flexDirection: "row", flexWrap: "wrap", gap: spacing.md, marginTop: spacing.sm },
  quickCard: {
    backgroundColor: colors.white,
    borderColor: colors.border,
    borderRadius: radius.card,
    borderWidth: componentSizes.borderWidth,
    flex: 1,
    flexBasis: "45%",
    minHeight: componentSizes.routeHeight,
    padding: spacing.sm,
    ...shadows.card,
  },
  quickContent: { alignItems: "center", flex: 1, justifyContent: "center" },
  quickIllustration: {
    height: componentSizes.routeDecorHeight,
    maxWidth: componentSizes.routeDecorHeight,
    width: "100%",
  },
  quickText: {
    color: colors.charcoal,
    fontFamily: getFontFamily("semibold"),
    fontSize: typography.sizes.label,
    lineHeight: typography.lineHeights.footnote,
    textAlign: "center",
  },
  quickNote: {
    color: colors.forest,
    fontFamily: getFontFamily("regular"),
    fontSize: typography.sizes.caption,
    marginTop: spacing.xs,
    textAlign: "center",
  },
  activityCard: {
    alignItems: "center",
    backgroundColor: colors.white,
    borderColor: colors.border,
    borderRadius: radius.card,
    borderWidth: componentSizes.borderWidth,
    flexDirection: "row",
    gap: spacing.md,
    padding: spacing.md,
    ...shadows.card,
  },
  activityIcon: {
    alignItems: "center",
    borderRadius: radius.lg,
    height: componentSizes.buttonHeight,
    justifyContent: "center",
    width: componentSizes.buttonHeight,
  },
  activityTitle: {
    color: colors.charcoal,
    fontFamily: getFontFamily("semibold"),
    fontSize: typography.sizes.label,
    lineHeight: typography.lineHeights.footnote,
  },
  activityDescription: {
    color: colors.muted,
    fontFamily: getFontFamily("regular"),
    fontSize: typography.sizes.caption,
    lineHeight: typography.lineHeights.footnote,
    marginTop: spacing.xs,
  },
  offerCard: {
    alignItems: "center",
    backgroundColor: colors.forest,
    borderRadius: radius.lg,
    flexDirection: "row",
    gap: spacing.sm,
    marginTop: spacing.lg,
    overflow: "hidden",
    padding: spacing.sm,
    ...shadows.card,
  },
  giftImage: { height: spacing["3xl"], width: spacing["3xl"] },
  offerCopy: { flex: 1 },
  offerTitle: {
    color: colors.white,
    fontFamily: getFontFamily("semibold"),
    fontSize: typography.sizes.label,
  },
  offerSubtitle: {
    color: colors.white,
    fontFamily: getFontFamily("regular"),
    fontSize: typography.sizes.caption,
    lineHeight: typography.lineHeights.caption,
  },
  offerButton: {
    alignItems: "center",
    backgroundColor: colors.lime,
    borderRadius: radius.pill,
    justifyContent: "center",
    minHeight: componentSizes.touchTarget,
    paddingHorizontal: spacing.sm,
  },
  offerButtonText: {
    color: colors.charcoal,
    fontFamily: getFontFamily("semibold"),
    fontSize: typography.sizes.caption,
  },
  navigation: {
    backgroundColor: colors.white,
    borderColor: colors.border,
    borderTopWidth: componentSizes.borderWidth,
  },
  navigationItems: {
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    maxWidth: componentSizes.appShellMaxWidth,
    paddingBottom: spacing.sm,
    paddingTop: spacing.sm,
    width: "100%",
  },
  navItem: {
    alignItems: "center",
    gap: spacing.xs,
    justifyContent: "center",
    minHeight: componentSizes.touchTarget,
    minWidth: componentSizes.touchTarget,
  },
  navText: {
    color: colors.muted,
    fontFamily: getFontFamily("medium"),
    fontSize: typography.sizes.caption,
    textAlign: "center",
  },
  navSelected: { color: colors.forest, fontFamily: getFontFamily("semibold") },
});
