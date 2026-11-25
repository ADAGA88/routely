import type { ReactElement } from "react";
import { Pressable, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { designTokens, getFontFamily } from "@routely/design-tokens";
import { RoutelyIcon, useAppearance, type RoutelyIconName } from "@routely/ui-mobile";
import { dashboardPreview } from "../dashboard/dashboard-preview";
import { earningsPreview } from "../earnings/earnings-preview";

const { colors, componentSizes, radius, shadows, spacing, typography } = designTokens;

function SectionTitle({ children }: { children: string }): ReactElement {
  return (
    <Text
      accessibilityRole="header"
      style={{
        color: colors.charcoal,
        fontFamily: getFontFamily("semibold"),
        fontSize: typography.sizes.sectionHeading,
        lineHeight: typography.lineHeights.sectionHeading,
        marginTop: spacing.xl,
      }}
    >
      {children}
    </Text>
  );
}

export function ProfileActivity(): ReactElement {
  const { mode } = useAppearance();
  const accent = designTokens.appearance[mode];

  return (
    <>
      <SectionTitle>Your day at a glance</SectionTitle>
      <View style={{ flexDirection: "row", gap: spacing.sm, marginTop: spacing.md }}>
        {(
          [
            { icon: "package", label: "Deliveries today", value: dashboardPreview.deliveriesToday },
            { icon: "wallet", label: "Earned today", value: earningsPreview.today },
          ] as const
        ).map((item, index) => (
          <View
            accessibilityLabel={`Sample ${item.label.toLowerCase()}: ${item.value}.`}
            accessible
            key={item.label}
            style={{
              backgroundColor: index === 0 ? accent.primary : colors.container,
              borderRadius: radius.card,
              flex: 1,
              gap: spacing.sm,
              padding: spacing.md,
            }}
          >
            <RoutelyIcon
              color={index === 0 ? accent.onPrimary : colors.forest}
              name={item.icon}
              size={componentSizes.icon}
            />
            <Text
              adjustsFontSizeToFit
              numberOfLines={1}
              style={{
                color: index === 0 ? accent.onPrimary : colors.charcoal,
                fontFamily: getFontFamily("bold"),
                fontSize: typography.sizes.sectionHeading,
                lineHeight: typography.lineHeights.sectionHeading,
              }}
            >
              {item.value}
            </Text>
            <Text
              style={{
                color: index === 0 ? accent.onPrimary : colors.forest,
                fontFamily: getFontFamily("medium"),
                fontSize: typography.sizes.caption,
              }}
            >
              {item.label}
            </Text>
          </View>
        ))}
      </View>
    </>
  );
}

export function ProfileMotorcycle(): ReactElement {
  const { mode } = useAppearance();
  const accent = designTokens.appearance[mode];

  return (
    <>
      <SectionTitle>My motorcycle</SectionTitle>
      <View
        style={{
          alignItems: "center",
          backgroundColor: colors.container,
          borderRadius: radius.card,
          flexDirection: "row",
          gap: spacing.md,
          marginTop: spacing.md,
          padding: spacing.md,
        }}
      >
        <View
          style={{
            alignItems: "center",
            backgroundColor: accent.primary,
            borderRadius: radius.lg,
            height: componentSizes.buttonHeight,
            justifyContent: "center",
            width: componentSizes.buttonHeight,
          }}
        >
          <RoutelyIcon color={accent.onPrimary} name="motorcycle" size={componentSizes.iconLarge} />
        </View>
        <View style={{ flex: 1 }}>
          <Text
            style={{
              color: colors.charcoal,
              fontFamily: getFontFamily("semibold"),
              fontSize: typography.sizes.label,
            }}
          >
            Motorcycle details
          </Text>
          <Text
            style={{
              color: colors.forest,
              fontFamily: getFontFamily("regular"),
              fontSize: typography.sizes.caption,
              lineHeight: typography.lineHeights.footnote,
            }}
          >
            Unavailable
          </Text>
        </View>
      </View>
    </>
  );
}

export function ProfileShortcuts(): ReactElement {
  const router = useRouter();
  const shortcuts: {
    icon: RoutelyIconName;
    label: string;
    description: string;
    route: "/deliveries" | "/earnings";
  }[] = [
    {
      icon: "package",
      label: "My deliveries",
      description: "Current and past rides",
      route: "/deliveries",
    },
    {
      icon: "wallet",
      label: "Earnings & wallet",
      description: "See your earnings",
      route: "/earnings",
    },
  ];

  return (
    <>
      <SectionTitle>Quick links</SectionTitle>
      <View
        style={{
          backgroundColor: colors.white,
          borderColor: colors.border,
          borderRadius: radius.card,
          borderWidth: componentSizes.borderWidth,
          marginTop: spacing.md,
          paddingHorizontal: spacing.md,
          ...shadows.card,
        }}
      >
        {shortcuts.map((item, index) => (
          <Pressable
            accessibilityLabel={`${item.label}. ${item.description}.`}
            accessibilityRole="button"
            key={item.route}
            onPress={() => router.replace(item.route)}
            style={{
              alignItems: "center",
              borderBottomWidth: index === 0 ? componentSizes.borderWidth : 0,
              borderColor: colors.border,
              flexDirection: "row",
              gap: spacing.md,
              minHeight: componentSizes.touchTarget,
              paddingVertical: spacing.md,
            }}
          >
            <View
              style={{
                alignItems: "center",
                backgroundColor: colors.container,
                borderRadius: radius.pill,
                height: componentSizes.touchTarget,
                justifyContent: "center",
                width: componentSizes.touchTarget,
              }}
            >
              <RoutelyIcon color={colors.forest} name={item.icon} size={componentSizes.icon} />
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  color: colors.charcoal,
                  fontFamily: getFontFamily("semibold"),
                  fontSize: typography.sizes.label,
                }}
              >
                {item.label}
              </Text>
              <Text
                style={{
                  color: colors.forest,
                  fontFamily: getFontFamily("regular"),
                  fontSize: typography.sizes.caption,
                }}
              >
                {item.description}
              </Text>
            </View>
            <RoutelyIcon color={colors.forest} name="chevronRight" size={componentSizes.icon} />
          </Pressable>
        ))}
      </View>
    </>
  );
}
