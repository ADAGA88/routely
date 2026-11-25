import { type ReactElement } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { designTokens, getFontFamily } from "@routely/design-tokens";
import { RoutelyIcon } from "@routely/ui-mobile";
import map from "../../../assets/illustrations/sender-map.png";

const { colors, componentSizes, radius, spacing, typography } = designTokens;

export function TrackingCard({ onTracking }: { onTracking: () => void }): ReactElement {
  return (
    <View style={styles.card}>
      <Image
        accessibilityLabel="Illustrative map, not live tracking"
        resizeMode="cover"
        source={map}
        style={styles.map}
      />
      <View style={styles.copy}>
        <Text style={styles.title}>Tracking unavailable</Text>
        <Text style={styles.description}>Live tracking is unavailable. View an example order.</Text>
        <Pressable
          accessibilityLabel="Track order"
          accessibilityRole="button"
          onPress={onTracking}
          style={styles.action}
        >
          <View style={styles.inline}>
            <Text style={styles.link}>Track Order</Text>
            <RoutelyIcon color={colors.forest} name="arrowRight" size={componentSizes.iconSmall} />
          </View>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: "center",
    backgroundColor: colors.white,
    borderColor: colors.border,
    borderRadius: radius.card,
    borderWidth: componentSizes.borderWidth,
    flexDirection: "row",
    gap: spacing.md,
    padding: spacing.sm,
  },
  map: {
    borderRadius: radius.md,
    height: componentSizes.routeDecorHeight,
    width: componentSizes.routeDecorHeight,
  },
  copy: { flex: 1, gap: spacing.xs },
  title: {
    color: colors.forest,
    fontFamily: getFontFamily("bold"),
    fontSize: typography.sizes.label,
  },
  description: {
    color: colors.charcoal,
    fontFamily: getFontFamily("regular"),
    fontSize: typography.sizes.caption,
    lineHeight: typography.lineHeights.caption,
  },
  action: {
    alignSelf: "flex-start",
    borderColor: colors.border,
    borderRadius: radius.pill,
    borderWidth: componentSizes.borderWidth,
    justifyContent: "center",
    minHeight: componentSizes.touchTarget,
    paddingHorizontal: spacing.sm,
  },
  inline: { alignItems: "center", flexDirection: "row", gap: spacing.xs },
  link: {
    color: colors.forest,
    fontFamily: getFontFamily("semibold"),
    fontSize: typography.sizes.caption,
  },
});
