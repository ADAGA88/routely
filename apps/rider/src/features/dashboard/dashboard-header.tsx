import type { ReactElement } from "react";
import { Pressable, View } from "react-native";
import { useRouter } from "expo-router";
import { designTokens } from "@routely/design-tokens";
import {
  AppearanceSwitch,
  RoutelyIcon,
  RoutelyLogo,
  type RoutelyIconName,
} from "@routely/ui-mobile";

const { colors, componentSizes, radius, spacing } = designTokens;

function HeaderAction({
  label,
  icon,
  onPress,
}: {
  label: string;
  icon: RoutelyIconName;
  onPress?: () => void;
}): ReactElement {
  return (
    <Pressable
      accessibilityLabel={label}
      accessibilityRole="button"
      accessibilityState={{ disabled: !onPress }}
      disabled={!onPress}
      onPress={onPress}
      style={{
        alignItems: "center",
        justifyContent: "center",
        minHeight: componentSizes.touchTarget,
        minWidth: componentSizes.touchTarget,
      }}
    >
      <View
        style={{
          alignItems: "center",
          backgroundColor: colors.white,
          borderColor: colors.border,
          borderRadius: radius.pill,
          borderWidth: componentSizes.borderWidth,
          height: componentSizes.iconLarge + spacing.sm,
          justifyContent: "center",
          width: componentSizes.iconLarge + spacing.sm,
        }}
      >
        <RoutelyIcon color={colors.forest} name={icon} size={componentSizes.iconSmall + 2} />
      </View>
    </Pressable>
  );
}

export function DashboardHeader(): ReactElement {
  const router = useRouter();

  return (
    <AppearanceSwitch
      accentBackground
      iconSurface
      leading={
        <View
          style={{
            alignSelf: "flex-start",
            backgroundColor: colors.white,
            borderRadius: radius.pill,
            paddingHorizontal: spacing.sm,
            paddingVertical: spacing.xs,
          }}
        >
          <RoutelyLogo width={96} />
        </View>
      }
      actions={
        <>
          <HeaderAction
            icon="shield"
            label="Open rider verification"
            onPress={() => router.push("/verification")}
          />
          <HeaderAction
            icon="bell"
            label="Notifications"
            onPress={() => router.push("/notifications")}
          />
        </>
      }
    />
  );
}
