import type { ReactElement } from "react";
import { Pressable, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { designTokens, getFontFamily } from "@routely/design-tokens";
import { RoutelyIcon, type RoutelyIconName } from "@routely/ui-mobile";

const { colors, componentSizes, spacing, typography } = designTokens;

const navItems: {
  icon: RoutelyIconName;
  label: string;
  route?: "/dashboard" | "/deliveries" | "/earnings" | "/profile";
}[] = [
  { icon: "home", label: "Home", route: "/dashboard" },
  { icon: "package", label: "Deliveries", route: "/deliveries" },
  { icon: "wallet", label: "Earnings", route: "/earnings" },
  { icon: "user", label: "Profile", route: "/profile" },
];

export function DashboardNavigation({
  active,
}: {
  active: "Home" | "Deliveries" | "Earnings" | "Profile";
}): ReactElement {
  const router = useRouter();
  return (
    <View
      accessibilityRole="tablist"
      style={{
        backgroundColor: colors.white,
        borderColor: colors.border,
        borderTopWidth: componentSizes.borderWidth,
        flexDirection: "row",
        justifyContent: "space-around",
        paddingBottom: spacing.sm,
        paddingTop: spacing.sm,
      }}
    >
      {navItems.map((item) => {
        const selected = item.label === active;
        const route = item.route;
        const available = route !== undefined;
        return (
          <Pressable
            accessibilityLabel={item.label}
            accessibilityRole="tab"
            accessibilityState={{ disabled: !available, selected }}
            disabled={!available}
            key={item.label}
            onPress={selected || !route ? undefined : () => router.replace(route)}
            style={{
              alignItems: "center",
              gap: 2,
              justifyContent: "center",
              minHeight: componentSizes.touchTarget,
              minWidth: componentSizes.touchTarget,
              opacity: selected ? 1 : 0.5,
            }}
          >
            <RoutelyIcon
              color={selected ? colors.charcoal : colors.muted}
              name={item.icon}
              size={componentSizes.iconSmall + 4}
            />
            <Text
              style={{
                color: selected ? colors.charcoal : colors.muted,
                fontFamily: getFontFamily(selected ? "semibold" : "medium"),
                fontSize: typography.sizes.caption,
              }}
            >
              {item.label}
            </Text>
            <View
              style={{
                backgroundColor: selected ? colors.charcoal : "transparent",
                height: 2,
                width: 20,
              }}
            />
          </Pressable>
        );
      })}
    </View>
  );
}
