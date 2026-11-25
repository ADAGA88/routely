import { useCallback, useState, type ReactElement } from "react";
import {
  BackHandler,
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { useFocusEffect, useRouter } from "expo-router";
import Svg, { Circle, Path, Rect } from "react-native-svg";
import { designTokens, getFontFamily } from "@routely/design-tokens";
import {
  AppearanceSwitch,
  PageContainer,
  RoutelyIcon,
  RoutelyLogo,
  useAppearance,
} from "@routely/ui-mobile";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import riderArtwork from "@routely/brand-assets/delivery-request-sample.png";
import riderAvatar from "@routely/brand-assets/rider-avatar-reference.png";
import locationArtwork from "../../../assets/illustrations/quick-address.png";

const { colors, componentSizes, radius, shadows, spacing, typography } = designTokens;

const exampleOrder = {
  parcel: "Document envelope",
  pickup: "Wuse 2, Abuja",
  dropoff: "Garki, Abuja",
};

const progress = [
  { label: "Rider assigned", state: "complete" },
  { label: "Picked up", state: "complete" },
  { label: "On the way", state: "current" },
  { label: "Delivered", state: "upcoming" },
] as const;

function ExampleMap({ expanded = false }: { expanded?: boolean }): ReactElement {
  return (
    <View
      accessible
      accessibilityLabel="Route illustration. Tracking is not connected."
      style={[styles.map, expanded && styles.expandedMap]}
    >
      <Svg height="100%" preserveAspectRatio="xMidYMid slice" viewBox="0 0 400 300" width="100%">
        <Rect fill={colors.container} height="300" width="400" />
        <Path
          d="M-20 35 L420 191 M-20 147 L420 303 M-20 256 L420 99 M-20 207 L420 50 M34 -20 L199 320 M157 -20 L322 320 M280 -20 L445 320"
          fill="none"
          stroke={colors.white}
          strokeLinecap="round"
          strokeWidth="12"
        />
        <Path
          d="M-20 82 L420 237 M-20 298 L420 141 M95 -20 L260 320 M220 -20 L385 320"
          fill="none"
          stroke={colors.border}
          strokeLinecap="round"
          strokeWidth="3"
        />
        <Path
          d="M13 180 L42 170 L53 192 L24 202 Z M286 13 L315 3 L326 25 L297 35 Z M306 231 L347 216 L358 240 L317 255 Z"
          fill={designTokens.map.marker}
          opacity="0.35"
        />
        <Path
          d="M98 22 L130 33 L120 53 L88 42 Z M346 120 L378 108 L388 128 L355 140 Z M126 255 L161 267 L151 288 L116 276 Z"
          fill={colors.border}
        />
        <Path
          d="M64 230 C100 210 106 155 150 153 S194 187 224 155 S270 82 340 66"
          fill="none"
          stroke={colors.white}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="13"
        />
        <Path
          d="M64 230 C100 210 106 155 150 153 S194 187 224 155 S270 82 340 66"
          fill="none"
          stroke={designTokens.map.route}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="5"
        />
        <Circle cx="64" cy="230" fill={colors.white} r="17" />
        <Circle cx="64" cy="230" fill={designTokens.map.route} r="10" />
        <Circle cx="64" cy="230" fill={colors.white} r="3" />
        <Circle cx="340" cy="66" fill={colors.white} r="19" />
        <Circle cx="340" cy="66" fill={designTokens.map.route} r="13" />
        <Circle cx="340" cy="66" fill={designTokens.map.marker} r="6" />
        <Circle cx="224" cy="155" fill={designTokens.map.accuracy} r="33" />
        <Circle cx="224" cy="155" fill={colors.white} r="23" />
        <Circle cx="224" cy="155" fill={designTokens.map.route} r="18" />
        <Path d="M217 160 L224 147 L231 160 L224 157 Z" fill={colors.white} />
      </Svg>
    </View>
  );
}

function RouteDetails(): ReactElement {
  const { mode } = useAppearance();
  const accent = designTokens.appearance[mode];

  return (
    <View style={styles.detailsCard}>
      <View style={styles.detailsHeading}>
        <View style={styles.flex}>
          <Text style={styles.sectionEyebrow}>THE JOURNEY</Text>
          <Text accessibilityRole="header" style={styles.cardTitle}>
            Pickup &amp; drop-off
          </Text>
        </View>
        <Image
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
          resizeMode="contain"
          source={locationArtwork}
          style={styles.detailsArtwork}
        />
      </View>
      <View style={styles.routeGroup}>
        <View style={styles.routeRow}>
          <View style={styles.routeIcon}>
            <RoutelyIcon name="mapPin" size={componentSizes.iconSmall} />
          </View>
          <View style={styles.flex}>
            <Text style={styles.caption}>Pickup</Text>
            <Text style={styles.routeText}>{exampleOrder.pickup}</Text>
          </View>
        </View>
        <View style={styles.routeDivider} />
        <View style={styles.routeRow}>
          <View style={[styles.routeIcon, { backgroundColor: accent.primary }]}>
            <RoutelyIcon name="package" color={accent.onPrimary} size={componentSizes.iconSmall} />
          </View>
          <View style={styles.flex}>
            <Text style={styles.caption}>Drop-off</Text>
            <Text style={styles.routeText}>{exampleOrder.dropoff}</Text>
          </View>
        </View>
      </View>
      <View style={styles.parcelRow}>
        <View style={styles.parcelIcon}>
          <RoutelyIcon name="package" size={componentSizes.iconSmall} />
        </View>
        <View style={styles.flex}>
          <Text style={styles.caption}>PARCEL</Text>
          <Text style={styles.parcelValue}>{exampleOrder.parcel}</Text>
        </View>
      </View>
    </View>
  );
}

export function TrackingOrderScreen(): ReactElement {
  const router = useRouter();
  const { mode } = useAppearance();
  const accent = designTokens.appearance[mode];
  const statusPillColor = mode === "lime" ? colors.forest : colors.lime;
  const statusPillTextColor = mode === "lime" ? colors.white : colors.charcoal;
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const compact = width < 360;
  const [mapExpanded, setMapExpanded] = useState(false);

  const exit = useCallback(() => {
    if (mapExpanded) setMapExpanded(false);
    else if (router.canGoBack()) router.back();
    else router.replace("/dashboard");
  }, [mapExpanded, router]);

  useFocusEffect(
    useCallback(() => {
      if (Platform.OS !== "android" || !mapExpanded) return;
      const subscription = BackHandler.addEventListener("hardwareBackPress", () => {
        setMapExpanded(false);
        return true;
      });
      return () => subscription.remove();
    }, [mapExpanded]),
  );

  return (
    <View style={styles.page}>
      <View style={styles.header}>
        <AppearanceSwitch
          leading={
            <View style={styles.headerLeading}>
              <Pressable
                accessibilityLabel="Go back"
                accessibilityRole="button"
                onPress={exit}
                style={styles.back}
              >
                <RoutelyIcon name="arrowLeft" />
              </Pressable>
              <View style={styles.headerBrand}>
                <RoutelyLogo width={112} />
              </View>
            </View>
          }
        />
      </View>
      <ScrollView
        accessibilityLabel={mapExpanded ? "Route content" : "Order content"}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: Math.max(insets.bottom, spacing.lg) },
        ]}
        focusable={Platform.OS === "web" ? true : undefined}
        style={styles.scroll}
      >
        <PageContainer maxWidth={componentSizes.appShellMaxWidth}>
          {mapExpanded ? (
            <>
              <Text style={styles.eyebrow}>DELIVERY ROUTE</Text>
              <Text accessibilityRole="header" style={styles.title}>
                Your package is on the way
              </Text>
              <Text style={styles.intro}>Tracking is not connected to an order.</Text>
              <View style={styles.mapSection}>
                <ExampleMap expanded />
              </View>
              <RouteDetails />
            </>
          ) : (
            <>
              <Text accessibilityRole="header" style={styles.title}>
                Track delivery
              </Text>
              <Text style={styles.intro}>Tracking is not connected to an order.</Text>

              <View style={[styles.statusBanner, { backgroundColor: accent.primary }]}>
                <View style={styles.artworkFrame}>
                  <Image
                    accessibilityElementsHidden
                    importantForAccessibility="no-hide-descendants"
                    resizeMode="cover"
                    source={riderArtwork}
                    style={[styles.bannerArtwork, compact && styles.compactBannerArtwork]}
                  />
                </View>
                <View style={styles.bannerCopy}>
                  <View style={[styles.statusPill, { backgroundColor: statusPillColor }]}>
                    <View style={[styles.statusDot, { backgroundColor: statusPillTextColor }]} />
                    <Text style={[styles.statusText, { color: statusPillTextColor }]}>
                      IN TRANSIT
                    </Text>
                  </View>
                  <Text style={[styles.statusHeading, { color: accent.onPrimary }]}>
                    Your package is on the way
                  </Text>
                  <Text style={[styles.bannerCaption, { color: accent.onPrimary }]}>
                    Delivery in progress
                  </Text>
                </View>
              </View>

              <View style={styles.mapSection}>
                <Pressable
                  accessibilityLabel="Open route map"
                  accessibilityRole="button"
                  onPress={() => setMapExpanded(true)}
                >
                  <ExampleMap />
                  <View pointerEvents="none" style={styles.mapOverlay}>
                    <View style={styles.mapTag}>
                      <RoutelyIcon name="mapPin" size={componentSizes.iconSmall} />
                      <Text style={styles.mapTagText}>Illustration</Text>
                    </View>
                    <View style={styles.mapExpand}>
                      <Text style={styles.mapExpandText}>View map</Text>
                      <RoutelyIcon name="arrowRight" size={componentSizes.iconSmall} />
                    </View>
                  </View>
                </Pressable>
              </View>

              <View style={styles.riderCard}>
                <Image
                  accessibilityElementsHidden
                  importantForAccessibility="no-hide-descendants"
                  source={riderAvatar}
                  style={styles.riderAvatar}
                />
                <View style={styles.flex}>
                  <Text style={styles.cardTitle}>Rider</Text>
                  <Text style={styles.caption}>Contact unavailable</Text>
                </View>
                <Pressable
                  accessibilityLabel="Call rider unavailable"
                  accessibilityRole="button"
                  accessibilityState={{ disabled: true }}
                  disabled
                  style={styles.contactIcon}
                >
                  <RoutelyIcon name="phone" color={colors.muted} />
                </Pressable>
                <Pressable
                  accessibilityLabel="Message rider unavailable"
                  accessibilityRole="button"
                  accessibilityState={{ disabled: true }}
                  disabled
                  style={styles.contactIcon}
                >
                  <RoutelyIcon name="message" color={colors.muted} />
                </Pressable>
              </View>

              <View style={styles.timeline}>
                <View style={styles.timelineHeader}>
                  <View style={styles.timelineHeaderIcon}>
                    <RoutelyIcon name="history" size={componentSizes.icon} />
                  </View>
                  <View style={styles.flex}>
                    <Text style={styles.sectionEyebrow}>YOUR DELIVERY</Text>
                    <Text accessibilityRole="header" style={styles.timelineTitle}>
                      Delivery progress
                    </Text>
                  </View>
                </View>
                <View style={styles.separator} />
                <View>
                  {progress.map((step, index) => (
                    <View key={step.label} style={styles.timelineRow}>
                      <View style={styles.timelineRail}>
                        {index > 0 ? (
                          <View
                            style={[
                              styles.timelineLineTop,
                              step.state !== "upcoming" && { backgroundColor: accent.primary },
                            ]}
                          />
                        ) : null}
                        {index < progress.length - 1 ? (
                          <View
                            style={[
                              styles.timelineLineBottom,
                              step.state === "complete" && { backgroundColor: accent.primary },
                            ]}
                          />
                        ) : null}
                        <View
                          style={[
                            styles.timelineMarker,
                            {
                              backgroundColor:
                                step.state === "upcoming" ? colors.container : accent.primary,
                            },
                          ]}
                        >
                          {step.state === "complete" ? (
                            <Text style={[styles.check, { color: accent.onPrimary }]}>✓</Text>
                          ) : step.state === "current" ? (
                            <RoutelyIcon
                              color={accent.onPrimary}
                              name="mapPin"
                              size={componentSizes.iconSmall}
                            />
                          ) : (
                            <RoutelyIcon
                              color={colors.muted}
                              name="package"
                              size={componentSizes.iconSmall}
                            />
                          )}
                        </View>
                      </View>
                      <Text
                        accessibilityLabel={`${step.label}${step.state === "current" ? ", current stage" : ""}`}
                        style={[
                          styles.timelineLabel,
                          step.state === "upcoming" && styles.upcomingLabel,
                        ]}
                      >
                        {step.label}
                      </Text>
                      {step.state !== "complete" ? (
                        <View
                          style={[
                            styles.timelinePill,
                            step.state === "current" && { backgroundColor: accent.primary },
                          ]}
                        >
                          <Text
                            style={[
                              styles.timelinePillText,
                              step.state === "current" && { color: accent.onPrimary },
                            ]}
                          >
                            {step.state === "current" ? "Current" : "Pending"}
                          </Text>
                        </View>
                      ) : null}
                    </View>
                  ))}
                </View>
              </View>

              <RouteDetails />
              <Pressable
                accessibilityLabel="Contact rider unavailable"
                accessibilityRole="button"
                accessibilityState={{ disabled: true }}
                disabled
                style={styles.contactButton}
              >
                <RoutelyIcon name="headphones" color={colors.muted} />
                <Text style={styles.contactText}>Contact rider unavailable</Text>
              </Pressable>
            </>
          )}
        </PageContainer>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { backgroundColor: colors.white, flex: 1 },
  header: { alignSelf: "center", maxWidth: componentSizes.appShellMaxWidth, width: "100%" },
  headerLeading: { alignItems: "center", flexDirection: "row" },
  headerBrand: { alignItems: "center", flex: 1, justifyContent: "center" },
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
    fontFamily: getFontFamily("semibold"),
    fontSize: typography.sizes.cardHeading,
    lineHeight: typography.lineHeights.cardHeading,
    marginTop: spacing.sm,
  },
  intro: {
    color: colors.muted,
    fontFamily: getFontFamily("regular"),
    fontSize: typography.sizes.caption,
    lineHeight: typography.lineHeights.footnote,
    marginTop: spacing.xs,
  },
  cardTitle: {
    color: colors.charcoal,
    fontFamily: getFontFamily("semibold"),
    fontSize: typography.sizes.label,
    lineHeight: typography.lineHeights.supporting,
  },
  caption: {
    color: colors.muted,
    fontFamily: getFontFamily("regular"),
    fontSize: typography.sizes.caption,
    lineHeight: typography.lineHeights.footnote,
  },
  statusBanner: {
    alignItems: "center",
    borderRadius: radius.panel,
    flexDirection: "row",
    gap: spacing.md,
    marginTop: spacing.md,
    overflow: "hidden",
    padding: spacing.md,
    ...shadows.card,
  },
  artworkFrame: {
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    overflow: "hidden",
  },
  bannerArtwork: {
    height: componentSizes.touchTarget * 2,
    width: componentSizes.touchTarget * 2,
  },
  compactBannerArtwork: {
    height: componentSizes.touchTarget + spacing.xl,
    width: componentSizes.touchTarget + spacing.xl,
  },
  bannerCopy: { alignItems: "flex-start", flex: 1, gap: spacing.xs },
  statusHeading: {
    fontFamily: getFontFamily("semibold"),
    fontSize: typography.sizes.label,
    lineHeight: typography.lineHeights.supporting,
  },
  bannerCaption: {
    fontFamily: getFontFamily("regular"),
    fontSize: typography.sizes.caption,
    lineHeight: typography.lineHeights.footnote,
  },
  statusPill: {
    alignItems: "center",
    alignSelf: "flex-start",
    borderRadius: radius.pill,
    flexDirection: "row",
    gap: spacing.xs,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  statusDot: {
    borderRadius: radius.pill,
    height: componentSizes.indicator,
    width: componentSizes.indicator,
  },
  statusText: {
    fontFamily: getFontFamily("semibold"),
    fontSize: typography.sizes.eyebrow,
  },
  check: {
    fontFamily: getFontFamily("bold"),
    fontSize: typography.sizes.caption,
    lineHeight: typography.lineHeights.caption,
  },
  mapSection: { marginTop: spacing.md },
  sectionEyebrow: {
    color: colors.forest,
    fontFamily: getFontFamily("semibold"),
    fontSize: typography.sizes.eyebrow,
    letterSpacing: typography.letterSpacing.eyebrow,
  },
  map: {
    backgroundColor: colors.container,
    borderRadius: radius.panel,
    height: componentSizes.compactIllustrationHeight,
    overflow: "hidden",
  },
  expandedMap: { height: componentSizes.illustrationHeight + componentSizes.touchTarget * 2 },
  mapOverlay: {
    alignItems: "flex-start",
    bottom: spacing.md,
    flexDirection: "row",
    justifyContent: "space-between",
    left: spacing.md,
    position: "absolute",
    right: spacing.md,
  },
  mapTag: {
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: radius.pill,
    flexDirection: "row",
    gap: spacing.xs,
    minHeight: componentSizes.touchTarget,
    paddingHorizontal: spacing.sm,
    ...shadows.card,
  },
  mapTagText: {
    color: colors.charcoal,
    fontFamily: getFontFamily("medium"),
    fontSize: typography.sizes.caption,
  },
  mapExpand: {
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: radius.pill,
    flexDirection: "row",
    gap: spacing.xs,
    minHeight: componentSizes.touchTarget,
    paddingHorizontal: spacing.md,
    ...shadows.card,
  },
  mapExpandText: {
    color: colors.forest,
    fontFamily: getFontFamily("semibold"),
    fontSize: typography.sizes.caption,
  },
  riderCard: {
    alignItems: "center",
    backgroundColor: colors.white,
    borderColor: colors.border,
    borderRadius: radius.card,
    borderWidth: componentSizes.borderWidth,
    flexDirection: "row",
    gap: spacing.xs,
    marginTop: spacing.md,
    padding: spacing.sm,
    ...shadows.card,
  },
  riderAvatar: {
    borderRadius: radius.pill,
    height: componentSizes.buttonHeight,
    width: componentSizes.buttonHeight,
  },
  contactIcon: {
    alignItems: "center",
    backgroundColor: colors.container,
    borderRadius: radius.pill,
    height: componentSizes.touchTarget,
    justifyContent: "center",
    width: componentSizes.touchTarget,
  },
  timeline: {
    backgroundColor: colors.white,
    borderColor: colors.border,
    borderRadius: radius.card,
    borderWidth: componentSizes.borderWidth,
    gap: spacing.sm,
    marginTop: spacing.md,
    padding: spacing.md,
    ...shadows.card,
  },
  timelineHeader: { alignItems: "center", flexDirection: "row", gap: spacing.sm },
  timelineHeaderIcon: {
    alignItems: "center",
    backgroundColor: colors.container,
    borderRadius: radius.lg,
    height: componentSizes.touchTarget,
    justifyContent: "center",
    width: componentSizes.touchTarget,
  },
  timelineTitle: {
    color: colors.charcoal,
    fontFamily: getFontFamily("semibold"),
    fontSize: typography.sizes.label,
    lineHeight: typography.lineHeights.supporting,
  },
  timelineRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.sm,
    minHeight: componentSizes.touchTarget,
  },
  timelineRail: {
    alignItems: "center",
    alignSelf: "stretch",
    justifyContent: "center",
    width: componentSizes.iconLarge,
  },
  timelineLineTop: {
    backgroundColor: colors.border,
    bottom: "50%",
    position: "absolute",
    top: 0,
    width: componentSizes.routeStroke,
  },
  timelineLineBottom: {
    backgroundColor: colors.border,
    bottom: 0,
    position: "absolute",
    top: "50%",
    width: componentSizes.routeStroke,
  },
  timelineMarker: {
    alignItems: "center",
    borderRadius: radius.pill,
    height: componentSizes.iconLarge,
    justifyContent: "center",
    width: componentSizes.iconLarge,
  },
  timelineLabel: {
    color: colors.charcoal,
    flex: 1,
    fontFamily: getFontFamily("medium"),
    fontSize: typography.sizes.caption,
    lineHeight: typography.lineHeights.footnote,
  },
  upcomingLabel: { color: colors.muted },
  timelinePill: {
    backgroundColor: colors.container,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  timelinePillText: {
    color: colors.muted,
    fontFamily: getFontFamily("medium"),
    fontSize: typography.sizes.caption,
  },
  detailsCard: {
    backgroundColor: colors.white,
    borderColor: colors.border,
    borderRadius: radius.card,
    borderWidth: componentSizes.borderWidth,
    gap: spacing.md,
    marginTop: spacing.md,
    padding: spacing.md,
    ...shadows.card,
  },
  detailsHeading: { alignItems: "center", flexDirection: "row", gap: spacing.sm },
  detailsArtwork: {
    borderRadius: radius.lg,
    height: componentSizes.buttonHeight,
    width: componentSizes.buttonHeight,
  },
  routeGroup: {
    backgroundColor: colors.background,
    borderRadius: radius.lg,
    gap: spacing.sm,
    padding: spacing.sm,
  },
  routeDivider: { backgroundColor: colors.border, height: componentSizes.borderWidth },
  routeRow: { alignItems: "center", flexDirection: "row", gap: spacing.sm },
  routeIcon: {
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: radius.pill,
    height: componentSizes.iconLarge + spacing.sm,
    justifyContent: "center",
    width: componentSizes.iconLarge + spacing.sm,
  },
  routeText: {
    color: colors.charcoal,
    fontFamily: getFontFamily("medium"),
    fontSize: typography.sizes.caption,
    lineHeight: typography.lineHeights.footnote,
  },
  separator: { backgroundColor: colors.border, height: componentSizes.borderWidth },
  parcelRow: { alignItems: "center", flexDirection: "row", gap: spacing.sm },
  parcelIcon: {
    alignItems: "center",
    backgroundColor: colors.container,
    borderRadius: radius.lg,
    height: componentSizes.iconLarge + spacing.sm,
    justifyContent: "center",
    width: componentSizes.iconLarge + spacing.sm,
  },
  parcelValue: {
    color: colors.charcoal,
    fontFamily: getFontFamily("medium"),
    fontSize: typography.sizes.caption,
    lineHeight: typography.lineHeights.footnote,
  },
  contactButton: {
    alignItems: "center",
    backgroundColor: colors.container,
    borderRadius: radius.pill,
    flexDirection: "row",
    gap: spacing.sm,
    justifyContent: "center",
    marginTop: spacing.lg,
    minHeight: componentSizes.buttonHeight,
  },
  contactText: {
    color: colors.muted,
    fontFamily: getFontFamily("semibold"),
    fontSize: typography.sizes.label,
  },
});
