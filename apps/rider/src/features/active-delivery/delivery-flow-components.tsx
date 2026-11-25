import type { ReactElement, ReactNode } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { designTokens, getFontFamily } from "@routely/design-tokens";
import { PageContainer, RoutelyIcon, useAppearance } from "@routely/ui-mobile";
import { activeDeliveryPreview } from "./active-delivery-preview";

const { colors, componentSizes, radius, spacing, typography } = designTokens;

export function DeliveryFlowLayout({
  title,
  description,
  onBack,
  children,
}: {
  title: string;
  description: string;
  onBack: () => void;
  children: ReactNode;
}): ReactElement {
  return (
    <View style={{ backgroundColor: colors.white, flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: spacing.xl }}>
        <PageContainer maxWidth={720}>
          <View style={{ alignItems: "center", flexDirection: "row", gap: spacing.sm }}>
            <Pressable
              accessibilityLabel="Go back"
              accessibilityRole="button"
              onPress={onBack}
              style={{
                alignItems: "center",
                backgroundColor: colors.container,
                borderRadius: radius.pill,
                height: componentSizes.touchTarget,
                justifyContent: "center",
                width: componentSizes.touchTarget,
              }}
            >
              <RoutelyIcon color={colors.forest} name="arrowLeft" />
            </Pressable>
            <Text
              accessibilityRole="header"
              style={{
                color: colors.charcoal,
                flex: 1,
                fontFamily: getFontFamily("semibold"),
                fontSize: typography.sizes.sectionHeading,
                lineHeight: typography.lineHeights.sectionHeading,
              }}
            >
              {title}
            </Text>
          </View>
          <Text
            style={{
              color: colors.forest,
              fontFamily: getFontFamily("regular"),
              fontSize: typography.sizes.label,
              lineHeight: typography.lineHeights.supporting,
              marginTop: spacing.md,
            }}
          >
            {description}
          </Text>
          <View
            accessible
            accessibilityLabel={`Sample delivery from ${activeDeliveryPreview.pickup} to ${activeDeliveryPreview.drop}.`}
            style={{
              alignItems: "center",
              backgroundColor: colors.container,
              borderRadius: radius.card,
              flexDirection: "row",
              gap: spacing.sm,
              marginTop: spacing.lg,
              padding: spacing.md,
            }}
          >
            <RoutelyIcon color={colors.forest} name="package" size={componentSizes.icon} />
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  color: colors.forest,
                  fontFamily: getFontFamily("regular"),
                  fontSize: typography.sizes.caption,
                }}
              >
                Delivery
              </Text>
              <Text
                style={{
                  color: colors.charcoal,
                  fontFamily: getFontFamily("semibold"),
                  fontSize: typography.sizes.label,
                }}
              >
                {activeDeliveryPreview.pickup} → {activeDeliveryPreview.drop}
              </Text>
            </View>
          </View>
          {children}
        </PageContainer>
      </ScrollView>
    </View>
  );
}

export function DeliveryChoice({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
}): ReactElement {
  const { mode } = useAppearance();
  const accent = designTokens.appearance[mode];

  return (
    <Pressable
      accessibilityLabel={label}
      accessibilityRole="radio"
      accessibilityState={{ checked: selected }}
      aria-checked={selected}
      onPress={onPress}
      style={{
        alignItems: "center",
        backgroundColor: colors.white,
        borderColor: selected ? accent.primary : colors.border,
        borderRadius: radius.card,
        borderWidth: selected ? componentSizes.borderWidth * 2 : componentSizes.borderWidth,
        flexDirection: "row",
        gap: spacing.md,
        minHeight: componentSizes.buttonHeight,
        padding: spacing.md,
      }}
    >
      <View
        style={{
          alignItems: "center",
          borderColor: selected ? accent.primary : colors.muted,
          borderRadius: radius.pill,
          borderWidth: componentSizes.borderWidth * 2,
          height: componentSizes.icon,
          justifyContent: "center",
          width: componentSizes.icon,
        }}
      >
        {selected ? (
          <View
            style={{
              backgroundColor: accent.primary,
              borderRadius: radius.pill,
              height: spacing.sm,
              width: spacing.sm,
            }}
          />
        ) : null}
      </View>
      <Text
        style={{
          color: colors.charcoal,
          flex: 1,
          fontFamily: getFontFamily(selected ? "semibold" : "medium"),
          fontSize: typography.sizes.label,
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
}
