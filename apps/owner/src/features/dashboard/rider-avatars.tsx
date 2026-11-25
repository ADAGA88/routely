import type { ReactElement } from "react";
import { Image, StyleSheet, View } from "react-native";
import { designTokens } from "@routely/design-tokens";
import riderAvatar from "@routely/brand-assets/rider-avatar-reference.png";

const { colors, componentSizes, radius, shadows, spacing } = designTokens;

export function RiderAvatarExamples({ size }: { size: number }): ReactElement {
  return (
    <View
      accessibilityLabel="Example rider portraits. Indicators do not show live availability."
      accessible
      style={styles.portraits}
    >
      {[1, 2, 3, 4].map((item) => (
        <View key={item} style={{ height: size, width: size }}>
          <Image
            accessibilityElementsHidden
            importantForAccessibility="no-hide-descendants"
            resizeMode="cover"
            source={riderAvatar}
            style={[styles.avatar, { height: size, width: size }]}
          />
          <View style={styles.indicator} />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  portraits: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  avatar: {
    backgroundColor: colors.container,
    borderColor: colors.white,
    borderRadius: radius.pill,
    borderWidth: componentSizes.borderWidth * 2,
    ...shadows.card,
  },
  indicator: {
    backgroundColor: colors.lime,
    borderColor: colors.white,
    borderRadius: radius.pill,
    borderWidth: componentSizes.borderWidth * 2,
    bottom: 0,
    height: componentSizes.indicator + spacing.sm,
    position: "absolute",
    right: 0,
    width: componentSizes.indicator + spacing.sm,
  },
});
