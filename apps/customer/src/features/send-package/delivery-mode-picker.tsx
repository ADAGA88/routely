import type { ReactElement } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { designTokens, getFontFamily } from "@routely/design-tokens";
import { RoutelyIcon, useAppearance } from "@routely/ui-mobile";
import sendIllustration from "../../../assets/illustrations/quick-send.png";
import routeIllustration from "../../../assets/illustrations/quick-address.png";

const { colors, componentSizes, radius, shadows, spacing, typography } = designTokens;
export type DeliveryMode = "simple" | "custom";

export function DeliveryModePicker({
  onSelect,
}: {
  onSelect: (mode: DeliveryMode) => void;
}): ReactElement {
  const { mode } = useAppearance();
  const accent = designTokens.appearance[mode];

  return (
    <View style={styles.content}>
      <View style={styles.intro}>
        <Text style={styles.eyebrow}>SEND A PACKAGE</Text>
        <Text accessibilityRole="header" style={styles.title}>
          Your delivery,{"\n"}your way.
        </Text>
        <Text style={styles.subtitle}>
          Choose an example journey. Booking and rider assignment are not connected yet.
        </Text>
      </View>

      <Pressable
        accessibilityLabel="Simple sending. Choose an example price and let Routely handle rider assignment."
        accessibilityRole="button"
        onPress={() => onSelect("simple")}
        style={[styles.card, styles.simpleCard, { backgroundColor: accent.primary }]}
      >
        <View style={styles.cardTop}>
          <View style={[styles.badge, { backgroundColor: accent.onPrimary }]}>
            <RoutelyIcon color={accent.primary} name="send" size={componentSizes.iconSmall} />
            <Text style={[styles.badgeText, { color: accent.primary }]}>EASY &amp; GUIDED</Text>
          </View>
          <View style={[styles.arrow, { backgroundColor: accent.onPrimary }]}>
            <RoutelyIcon color={accent.primary} name="arrowRight" />
          </View>
        </View>
        <View style={styles.cardMain}>
          <View style={styles.cardCopy}>
            <Text style={[styles.cardTitle, { color: accent.onPrimary }]}>Simple sending</Text>
            <Text style={[styles.cardDescription, { color: accent.onPrimary }]}>
              Choose a price and let Routely handle rider assignment.
            </Text>
          </View>
          <Image
            accessibilityElementsHidden
            importantForAccessibility="no-hide-descendants"
            resizeMode="contain"
            source={sendIllustration}
            style={styles.illustration}
          />
        </View>
        <Text style={[styles.cardFooter, { color: accent.onPrimary }]}>
          PICK A PRICE / ROUTELY ASSIGNS
        </Text>
      </Pressable>

      <Pressable
        accessibilityLabel="Custom sending. Set an example offer, explore rider offers and bargain."
        accessibilityRole="button"
        onPress={() => onSelect("custom")}
        style={[styles.card, styles.customCard]}
      >
        <View style={styles.cardTop}>
          <View style={[styles.badge, { backgroundColor: accent.primary }]}>
            <RoutelyIcon color={accent.onPrimary} name="settings" size={componentSizes.iconSmall} />
            <Text style={[styles.badgeText, { color: accent.onPrimary }]}>MORE CONTROL</Text>
          </View>
          <View style={styles.customArrow}>
            <RoutelyIcon color={colors.forest} name="arrowRight" />
          </View>
        </View>
        <View style={styles.cardMain}>
          <View style={styles.cardCopy}>
            <Text style={[styles.cardTitle, styles.customTitle]}>Custom sending</Text>
            <Text style={[styles.cardDescription, styles.customDescription]}>
              Set your offer, explore riders and bargain your way.
            </Text>
          </View>
          <Image
            accessibilityElementsHidden
            importantForAccessibility="no-hide-descendants"
            resizeMode="contain"
            source={routeIllustration}
            style={styles.illustration}
          />
        </View>
        <Text style={[styles.cardFooter, styles.customFooter]}>YOUR OFFER / YOUR CHOICE</Text>
      </Pressable>

      <View style={styles.notice}>
        <RoutelyIcon color={colors.forest} name="shield" size={componentSizes.icon} />
        <Text style={styles.noticeText}>
          Example journey only. Booking, prices and rider assignment are not connected.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: { gap: spacing.md, paddingBottom: spacing.lg },
  intro: { gap: spacing.sm, marginBottom: spacing.sm, marginTop: spacing.md },
  eyebrow: {
    color: colors.forest,
    fontFamily: getFontFamily("semibold"),
    fontSize: typography.sizes.eyebrow,
    letterSpacing: typography.letterSpacing.eyebrow,
  },
  title: {
    color: colors.charcoal,
    fontFamily: getFontFamily("bold"),
    fontSize: typography.sizes.heading,
    lineHeight: typography.lineHeights.heading,
  },
  subtitle: {
    color: colors.muted,
    fontFamily: getFontFamily("regular"),
    fontSize: typography.sizes.label,
    lineHeight: typography.lineHeights.supporting,
  },
  card: {
    borderRadius: radius.panel,
    gap: spacing.md,
    overflow: "hidden",
    padding: spacing.md,
    ...shadows.card,
  },
  simpleCard: { borderWidth: componentSizes.borderWidth, borderColor: "transparent" },
  customCard: {
    backgroundColor: colors.white,
    borderColor: colors.border,
    borderWidth: componentSizes.borderWidth,
  },
  cardTop: { alignItems: "center", flexDirection: "row", justifyContent: "space-between" },
  badge: {
    alignItems: "center",
    alignSelf: "flex-start",
    borderRadius: radius.pill,
    flexDirection: "row",
    gap: spacing.xs,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  badgeText: {
    fontFamily: getFontFamily("semibold"),
    fontSize: typography.sizes.eyebrow,
    letterSpacing: typography.letterSpacing.brand,
  },
  arrow: {
    alignItems: "center",
    borderRadius: radius.pill,
    height: componentSizes.touchTarget,
    justifyContent: "center",
    width: componentSizes.touchTarget,
  },
  customArrow: {
    alignItems: "center",
    backgroundColor: colors.container,
    borderRadius: radius.pill,
    height: componentSizes.touchTarget,
    justifyContent: "center",
    width: componentSizes.touchTarget,
  },
  cardMain: { alignItems: "center", flexDirection: "row", gap: spacing.sm },
  cardCopy: { flex: 1, gap: spacing.xs },
  cardTitle: {
    fontFamily: getFontFamily("bold"),
    fontSize: typography.sizes.sectionHeading,
    lineHeight: typography.lineHeights.sectionHeading,
  },
  cardDescription: {
    fontFamily: getFontFamily("regular"),
    fontSize: typography.sizes.caption,
    lineHeight: typography.lineHeights.footnote,
  },
  illustration: {
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    height: componentSizes.routeDecorHeight,
    width: componentSizes.routeDecorHeight,
  },
  cardFooter: {
    fontFamily: getFontFamily("semibold"),
    fontSize: typography.sizes.caption,
    letterSpacing: typography.letterSpacing.brand,
  },
  customTitle: { color: colors.charcoal },
  customDescription: { color: colors.muted },
  customFooter: { color: colors.forest },
  notice: {
    alignItems: "flex-start",
    backgroundColor: colors.container,
    borderRadius: radius.lg,
    flexDirection: "row",
    gap: spacing.sm,
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
