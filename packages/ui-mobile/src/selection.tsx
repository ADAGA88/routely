import type { KeyboardEvent, ReactElement } from "react";
import { Platform, Pressable, Text, View } from "react-native";
import { designTokens, getFontFamily } from "@routely/design-tokens";
import { RoutelyIcon, type RoutelyIconName } from "./icons";
import { useAppearance } from "./appearance";

const { colors, componentSizes, radius, spacing, typography } = designTokens;

export interface RoleSelectionItemProps {
  label: string;
  description: string;
  icon: RoutelyIconName;
  selected: boolean;
  surfaceTone: "lime" | "white";
  compact?: boolean;
  onSelect: () => void;
}

export function SelectionIndicator({
  selected,
  onDark = false,
}: {
  selected: boolean;
  onDark?: boolean;
}): ReactElement {
  return (
    <View
      accessibilityLabel={selected ? "Selected" : undefined}
      style={{
        alignItems: "center",
        borderColor: onDark ? colors.white : selected ? colors.forest : colors.muted,
        borderRadius: radius.pill,
        borderWidth: selected ? 2 : componentSizes.borderWidth,
        height: 24,
        justifyContent: "center",
        width: 24,
      }}
    >
      {selected ? (
        <View
          style={{
            backgroundColor: onDark ? colors.white : colors.forest,
            borderRadius: radius.pill,
            height: 12,
            width: 12,
          }}
        />
      ) : null}
    </View>
  );
}

export function RoleSelectionItem({
  label,
  description,
  icon,
  selected,
  surfaceTone,
  compact = false,
  onSelect,
}: RoleSelectionItemProps): ReactElement {
  const { mode } = useAppearance();
  const limeSurface = surfaceTone === "lime";
  const onDark = limeSurface && mode === "emerald";
  const keyboardProps =
    Platform.OS === "web"
      ? {
          onKeyDown: (event: KeyboardEvent<HTMLDivElement>) => {
            if (event.key === " " || event.key === "Enter") {
              event.preventDefault();
              onSelect();
            }
          },
        }
      : {};

  return (
    <Pressable
      {...keyboardProps}
      aria-checked={Platform.OS === "web" ? selected : undefined}
      accessibilityLabel={`${label}. ${description}`}
      accessibilityRole="radio"
      accessibilityState={{ checked: selected, selected }}
      onPress={onSelect}
      style={({ pressed }) => ({
        alignItems: "center",
        backgroundColor: limeSurface ? designTokens.appearance[mode].primary : colors.white,
        borderColor: colors.border,
        borderRadius: radius.card,
        borderWidth: componentSizes.borderWidth,
        flexDirection: "row",
        height: compact ? 76 : 80,
        opacity: pressed ? 0.86 : 1,
        paddingHorizontal: compact ? spacing.sm + spacing.xs : spacing.md,
        shadowColor: designTokens.shadows.card.shadowColor,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: selected ? 0.07 : 0.04,
        shadowRadius: 16,
        elevation: 1,
      })}
    >
      <View
        style={{
          alignItems: "center",
          backgroundColor: limeSurface ? colors.white : colors.container,
          borderColor: colors.border,
          borderRadius: radius.lg,
          borderWidth: componentSizes.borderWidth,
          height: compact ? 44 : 48,
          justifyContent: "center",
          width: compact ? 44 : 48,
        }}
      >
        <RoutelyIcon color={colors.forest} name={icon} size={componentSizes.iconLarge} />
      </View>
      <View
        style={{ flex: 1, marginLeft: compact ? spacing.sm + spacing.xs : spacing.md, minWidth: 0 }}
      >
        <Text
          accessibilityLabel={`${label}: ${description}`}
          style={{
            color: onDark ? colors.white : colors.charcoal,
            fontFamily: getFontFamily("medium"),
            fontSize: typography.sizes.navigation,
            lineHeight: typography.lineHeights.body - spacing.xs,
            fontWeight: typography.weights.medium,
          }}
        >
          {description}
        </Text>
      </View>
      <View style={{ alignItems: "center", marginLeft: spacing.sm }}>
        <SelectionIndicator selected={selected} onDark={onDark} />
      </View>
    </Pressable>
  );
}
