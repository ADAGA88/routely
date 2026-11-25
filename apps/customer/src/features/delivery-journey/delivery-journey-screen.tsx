import { useState, type ReactElement } from "react";
import { Image, Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { designTokens, getFontFamily } from "@routely/design-tokens";
import {
  AppearanceSwitch,
  PageContainer,
  RoutelyIcon,
  useAppearance,
  type RoutelyIconName,
} from "@routely/ui-mobile";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import map from "../../../assets/illustrations/sender-map.png";
import packageArtwork from "../../../assets/illustrations/quick-send.png";

const { colors, componentSizes, radius, shadows, spacing, typography } = designTokens;

const scenes = [
  {
    id: "finding",
    label: "Finding",
    title: "Finding your rider",
    detail: "See how a rider search could look after a request.",
    icon: "search",
  },
  {
    id: "unavailable",
    label: "No riders",
    title: "No riders available",
    detail: "A request may need another try when riders are unavailable.",
    icon: "bike",
  },
  {
    id: "matched",
    label: "Matched",
    title: "A rider is matched",
    detail: "Your rider and pickup details would appear here.",
    icon: "user",
  },
  {
    id: "transit",
    label: "On the way",
    title: "Your parcel is on the way",
    detail: "Follow each stage of the delivery journey in one place.",
    icon: "package",
  },
] as const satisfies readonly {
  id: string;
  label: string;
  title: string;
  detail: string;
  icon: RoutelyIconName;
}[];

export function DeliveryJourneyScreen(): ReactElement {
  const router = useRouter();
  const { mode } = useAppearance();
  const accent = designTokens.appearance[mode];
  const insets = useSafeAreaInsets();
  const [current, setCurrent] = useState<(typeof scenes)[number]>(scenes[0]);

  function exit() {
    if (router.canGoBack()) router.back();
    else router.replace("/send-package");
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
        accessibilityLabel="Delivery journey content"
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: Math.max(insets.bottom, spacing.lg) },
        ]}
        focusable={Platform.OS === "web" ? true : undefined}
        style={styles.scroll}
      >
        <PageContainer maxWidth={componentSizes.appShellMaxWidth}>
          <Text style={styles.eyebrow}>YOUR DELIVERY JOURNEY</Text>
          <Text accessibilityRole="header" style={styles.title}>
            Every step,{"\n"}in the know.
          </Text>
          <Text style={styles.intro}>
            Explore example states. No delivery has been booked or tracked.
          </Text>

          <View style={styles.sceneOptions}>
            {scenes.map((item) => {
              const selected = item.id === current.id;
              return (
                <Pressable
                  accessibilityLabel={`Example state: ${item.label}`}
                  accessibilityRole="button"
                  accessibilityState={{ selected }}
                  aria-pressed={selected}
                  key={item.id}
                  onPress={() => setCurrent(item)}
                  style={[styles.sceneOption, selected && { backgroundColor: accent.primary }]}
                >
                  <Text
                    style={[
                      styles.sceneText,
                      selected && {
                        color: accent.onPrimary,
                        fontFamily: getFontFamily("semibold"),
                      },
                    ]}
                  >
                    {item.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          <View style={[styles.statusCard, { backgroundColor: accent.primary }]}>
            <View style={styles.statusTop}>
              <View style={[styles.statusIcon, { backgroundColor: accent.onPrimary }]}>
                <RoutelyIcon
                  color={accent.primary}
                  name={current.icon}
                  size={componentSizes.iconLarge}
                />
              </View>
              <Image
                accessibilityElementsHidden
                importantForAccessibility="no-hide-descendants"
                resizeMode="contain"
                source={packageArtwork}
                style={styles.packageArt}
              />
            </View>
            <Text
              accessibilityRole="header"
              style={[styles.statusTitle, { color: accent.onPrimary }]}
            >
              {current.title}
            </Text>
            <Text style={[styles.statusDescription, { color: accent.onPrimary }]}>
              {current.detail}
            </Text>
          </View>

          {current.id === "finding" || current.id === "unavailable" ? (
            <View style={styles.card}>
              <View style={styles.cardHeading}>
                <View style={styles.cardIcon}>
                  <RoutelyIcon name={current.id === "finding" ? "mapPin" : "history"} />
                </View>
                <View style={styles.flex}>
                  <Text style={styles.cardTitle}>
                    {current.id === "finding" ? "Looking nearby" : "When no rider is found"}
                  </Text>
                  <Text style={styles.cardSubtitle}>Illustrative experience</Text>
                </View>
              </View>
              <Text style={styles.bodyText}>
                {current.id === "finding"
                  ? "Routely would search for available riders after a delivery request is placed."
                  : "This example shows the empty state. There is no live rider availability to check yet."}
              </Text>
            </View>
          ) : (
            <>
              <View style={styles.card}>
                <View style={styles.cardHeading}>
                  <View style={styles.cardIcon}>
                    <RoutelyIcon name="user" />
                  </View>
                  <View style={styles.flex}>
                    <Text style={styles.cardTitle}>Your rider</Text>
                    <Text style={styles.cardSubtitle}>Rider details are not connected</Text>
                  </View>
                </View>
                <View style={styles.divider} />
                <Text style={styles.bodyText}>
                  A rider profile and delivery details would appear after a real assignment.
                </Text>
              </View>
              <View style={styles.card}>
                <View style={styles.mapRow}>
                  <Image
                    accessibilityLabel="Illustrative map, not live tracking"
                    resizeMode="cover"
                    source={map}
                    style={styles.map}
                  />
                  <View style={styles.flex}>
                    <Text style={styles.cardTitle}>Delivery progress</Text>
                    <Text style={styles.bodyText}>
                      Example route only. Location and tracking are not connected.
                    </Text>
                  </View>
                </View>
                {current.id === "transit" ? (
                  <View style={styles.timeline}>
                    {["Request placed", "Rider matched", "On the way", "Delivered"].map(
                      (item, index) => (
                        <View key={item} style={styles.timelineRow}>
                          <View
                            style={[
                              styles.timelineDot,
                              { backgroundColor: index <= 2 ? accent.primary : colors.border },
                            ]}
                          />
                          <Text
                            style={[styles.timelineText, index === 2 && styles.currentTimeline]}
                          >
                            {item}
                          </Text>
                        </View>
                      ),
                    )}
                    <Text style={styles.cardSubtitle}>
                      These stages are examples, not delivery events.
                    </Text>
                  </View>
                ) : null}
              </View>
            </>
          )}

          <View style={styles.notice}>
            <RoutelyIcon color={colors.forest} name="shield" />
            <Text style={styles.noticeText}>
              Examples only. No request has been sent and no rider or delivery is being tracked.
            </Text>
          </View>
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
    marginTop: spacing.sm,
  },
  sceneOptions: {
    backgroundColor: colors.container,
    borderRadius: radius.lg,
    flexDirection: "row",
    gap: spacing.xs,
    marginTop: spacing.lg,
    padding: spacing.xs,
  },
  sceneOption: {
    alignItems: "center",
    borderRadius: radius.md,
    flex: 1,
    justifyContent: "center",
    minHeight: componentSizes.touchTarget,
    paddingHorizontal: spacing.xs,
  },
  sceneText: {
    color: colors.muted,
    fontFamily: getFontFamily("medium"),
    fontSize: typography.sizes.caption,
    textAlign: "center",
  },
  statusCard: {
    borderRadius: radius.panel,
    gap: spacing.sm,
    marginTop: spacing.lg,
    overflow: "hidden",
    padding: spacing.lg,
    ...shadows.card,
  },
  statusTop: { alignItems: "flex-start", flexDirection: "row", justifyContent: "space-between" },
  statusIcon: {
    alignItems: "center",
    borderRadius: radius.lg,
    height: componentSizes.buttonHeight,
    justifyContent: "center",
    width: componentSizes.buttonHeight,
  },
  packageArt: {
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    height: componentSizes.routeDecorHeight,
    width: componentSizes.routeDecorHeight,
  },
  statusTitle: {
    fontFamily: getFontFamily("bold"),
    fontSize: typography.sizes.sectionHeading,
    lineHeight: typography.lineHeights.sectionHeading,
  },
  statusDescription: {
    fontFamily: getFontFamily("regular"),
    fontSize: typography.sizes.label,
    lineHeight: typography.lineHeights.supporting,
  },
  card: {
    backgroundColor: colors.white,
    borderColor: colors.border,
    borderRadius: radius.card,
    borderWidth: componentSizes.borderWidth,
    gap: spacing.md,
    marginTop: spacing.md,
    padding: spacing.md,
    ...shadows.card,
  },
  cardHeading: { alignItems: "center", flexDirection: "row", gap: spacing.md },
  cardIcon: {
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
  cardSubtitle: {
    color: colors.muted,
    fontFamily: getFontFamily("regular"),
    fontSize: typography.sizes.caption,
    lineHeight: typography.lineHeights.footnote,
  },
  bodyText: {
    color: colors.muted,
    fontFamily: getFontFamily("regular"),
    fontSize: typography.sizes.label,
    lineHeight: typography.lineHeights.supporting,
  },
  divider: { backgroundColor: colors.border, height: componentSizes.borderWidth },
  mapRow: { alignItems: "center", flexDirection: "row", gap: spacing.md },
  map: {
    borderRadius: radius.md,
    height: componentSizes.routeDecorHeight,
    width: componentSizes.routeDecorHeight,
  },
  timeline: { gap: spacing.sm },
  timelineRow: { alignItems: "center", flexDirection: "row", gap: spacing.sm },
  timelineDot: {
    borderRadius: radius.pill,
    height: componentSizes.innerDot,
    width: componentSizes.innerDot,
  },
  timelineText: {
    color: colors.muted,
    fontFamily: getFontFamily("medium"),
    fontSize: typography.sizes.label,
  },
  currentTimeline: { color: colors.forest, fontFamily: getFontFamily("semibold") },
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
});
