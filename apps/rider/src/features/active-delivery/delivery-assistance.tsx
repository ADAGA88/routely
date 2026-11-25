import type { ReactElement } from "react";
import { Pressable, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { designTokens, getFontFamily } from "@routely/design-tokens";
import { RoutelyIcon, type RoutelyIconName } from "@routely/ui-mobile";

const { colors, componentSizes, radius, spacing, typography } = designTokens;

const sections: {
  title: string;
  description: string;
  icon: RoutelyIconName;
  actions: {
    label: string;
    route?: "/delivery-proof" | "/report-delivery-issue" | "/support";
  }[];
}[] = [
  {
    title: "Proof of delivery",
    description: "Add delivery proof when required.",
    icon: "clipboardList",
    actions: [{ label: "Add proof", route: "/delivery-proof" }, { label: "Complete delivery" }],
  },
  {
    title: "Need a hand?",
    description: "Get support or report a delivery issue.",
    icon: "shield",
    actions: [
      { label: "Get help", route: "/support" },
      { label: "Report issue", route: "/report-delivery-issue" },
    ],
  },
];

export function DeliveryAssistance({ completed }: { completed: boolean }): ReactElement {
  const router = useRouter();
  return (
    <View style={{ gap: spacing.md, marginTop: spacing.lg }}>
      {sections.map((section) => (
        <View
          key={section.title}
          style={{
            backgroundColor: colors.container,
            borderRadius: radius.card,
            gap: spacing.md,
            padding: spacing.md,
          }}
        >
          <View style={{ alignItems: "center", flexDirection: "row", gap: spacing.sm }}>
            <View
              style={{
                alignItems: "center",
                backgroundColor: colors.white,
                borderRadius: radius.pill,
                height: componentSizes.touchTarget,
                justifyContent: "center",
                width: componentSizes.touchTarget,
              }}
            >
              <RoutelyIcon color={colors.forest} name={section.icon} size={componentSizes.icon} />
            </View>
            <View style={{ flex: 1 }}>
              <Text
                accessibilityRole="header"
                style={{
                  color: colors.charcoal,
                  fontFamily: getFontFamily("semibold"),
                  fontSize: typography.sizes.cardHeading,
                }}
              >
                {section.title}
              </Text>
              <Text
                style={{
                  color: colors.forest,
                  fontFamily: getFontFamily("regular"),
                  fontSize: typography.sizes.caption,
                  lineHeight: typography.lineHeights.footnote,
                }}
              >
                {completed && section.title === "Proof of delivery"
                  ? "Proof details are unavailable."
                  : section.description}
              </Text>
            </View>
          </View>
          {completed && section.title === "Proof of delivery" ? null : (
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.sm }}>
              {section.actions.map(({ label, route }) => (
                <Pressable
                  accessibilityLabel={route ? label : `${label}. Not connected yet.`}
                  accessibilityRole="button"
                  accessibilityState={{ disabled: !route }}
                  disabled={!route}
                  key={label}
                  onPress={route ? () => router.push(route) : undefined}
                  style={{
                    alignItems: "center",
                    backgroundColor: colors.white,
                    borderRadius: radius.pill,
                    flexGrow: 1,
                    justifyContent: "center",
                    minHeight: componentSizes.touchTarget,
                    paddingHorizontal: spacing.md,
                  }}
                >
                  <Text
                    style={{
                      color: colors.forest,
                      fontFamily: getFontFamily("semibold"),
                      fontSize: typography.sizes.caption,
                    }}
                  >
                    {label}
                  </Text>
                </Pressable>
              ))}
            </View>
          )}
        </View>
      ))}
    </View>
  );
}
