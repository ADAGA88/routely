import type { ReactElement } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { Path, Svg } from "react-native-svg";
import routelyPrimaryLogo from "@routely/brand-assets/routely-logo.png";
import { designTokens, getFontFamily } from "@routely/design-tokens";

const { colors, spacing, typography } = designTokens;
const logoAspectRatio = 1729 / 296;

export interface RoutelyLogoProps {
  width?: number;
  accessibilityLabel?: string;
}

export function RoutelyLogo({
  width = 148,
  accessibilityLabel = "Routely logo",
}: RoutelyLogoProps): ReactElement {
  const height = width / logoAspectRatio;

  return (
    <Image
      accessible
      accessibilityLabel={accessibilityLabel}
      resizeMode="contain"
      source={routelyPrimaryLogo}
      style={{ height, width }}
    />
  );
}

export interface RoutelyBrandProps {
  width?: number;
}

export function RoutelyBrand({ width = 148 }: RoutelyBrandProps): ReactElement {
  return <RoutelyLogo width={width} />;
}

interface AppHeaderActionProps {
  label: string;
  onPress: () => void;
  leading?: boolean;
}

function AppHeaderAction({ label, onPress, leading = false }: AppHeaderActionProps): ReactElement {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={{
        alignItems: "center",
        flexDirection: "row",
        gap: spacing.xs,
        justifyContent: "center",
        minHeight: designTokens.componentSizes.touchTarget,
        paddingHorizontal: spacing.xs,
      }}
    >
      {leading ? (
        <Svg height={16} viewBox="0 0 24 24" width={16}>
          <Path
            d="m15 18-6-6 6-6M9 12h12"
            fill="none"
            stroke={colors.muted}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
          />
        </Svg>
      ) : null}
      <Text
        style={{
          color: leading ? colors.muted : colors.forest,
          fontFamily: getFontFamily(leading ? "medium" : "semibold"),
          fontSize: typography.sizes.label,
          fontWeight: leading ? typography.weights.medium : typography.weights.semibold,
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
}

export interface AppHeaderProps {
  leftLabel?: string;
  onLeftPress?: () => void;
  rightLabel?: string;
  onRightPress?: () => void;
}

export function AppHeader({
  leftLabel,
  onLeftPress,
  rightLabel,
  onRightPress,
}: AppHeaderProps): ReactElement {
  return (
    <View
      style={{
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        minHeight: 56,
      }}
    >
      <RoutelyLogo width={148} />
      <View style={{ alignItems: "center", flexDirection: "row", gap: spacing.xs }}>
        {leftLabel && onLeftPress ? (
          <AppHeaderAction label={leftLabel} leading onPress={onLeftPress} />
        ) : null}
        {rightLabel && onRightPress ? (
          <AppHeaderAction label={rightLabel} onPress={onRightPress} />
        ) : null}
      </View>
    </View>
  );
}
