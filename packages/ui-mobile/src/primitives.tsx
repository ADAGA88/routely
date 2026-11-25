import type { PropsWithChildren, ReactElement } from "react";
import {
  ActivityIndicator,
  Pressable,
  Text,
  TextInput,
  View,
  useWindowDimensions,
  type PressableProps,
  type StyleProp,
  type TextInputProps,
  type ViewStyle,
} from "react-native";
import { designTokens, getFontFamily } from "@routely/design-tokens";
import { RoutelyIcon, type RoutelyIconName } from "./icons";
import { useAppearance } from "./appearance";

const { colors, componentSizes, radius, spacing, typography } = designTokens;

export interface RoutelyButtonProps extends Omit<PressableProps, "children" | "style"> {
  label: string;
  variant?: "primary" | "secondary" | "quiet" | "destructive" | "lime";
  trailingIcon?: RoutelyIconName;
  fullWidth?: boolean;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
}

export function RoutelyButton({
  label,
  variant = "primary",
  trailingIcon,
  fullWidth = false,
  loading = false,
  disabled = false,
  style,
  ...pressableProps
}: RoutelyButtonProps): ReactElement {
  const { mode } = useAppearance();
  const appearance = designTokens.appearance[mode];
  const isDisabled = Boolean(disabled || loading);
  const isPrimary = variant === "primary";
  const backgroundColor =
    variant === "primary"
      ? appearance.primary
      : variant === "lime"
        ? colors.lime
        : variant === "secondary"
          ? colors.container
          : "transparent";
  const foregroundColor = isPrimary
    ? appearance.onPrimary
    : variant === "lime"
      ? colors.charcoal
      : colors.forest;
  const buttonColor = variant === "destructive" ? colors.error : backgroundColor;
  const buttonForeground = variant === "destructive" ? colors.white : foregroundColor;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ busy: loading, disabled: isDisabled }}
      disabled={isDisabled}
      {...pressableProps}
      style={({ pressed }) => [
        {
          alignItems: "center",
          alignSelf: fullWidth ? "stretch" : "flex-start",
          backgroundColor: buttonColor,
          borderColor: variant === "secondary" ? colors.border : buttonColor,
          borderRadius:
            variant === "primary" || variant === "destructive" || variant === "lime"
              ? radius.pill
              : variant === "secondary"
                ? radius.secondary
                : radius.md,
          borderWidth: variant === "secondary" ? componentSizes.borderWidth : 0,
          minHeight: componentSizes.buttonHeight,
          justifyContent: "center",
          minWidth: componentSizes.touchTarget,
          opacity: isDisabled ? 0.52 : pressed ? 0.88 : 1,
          paddingHorizontal: spacing.lg,
          transform: [{ scale: pressed && !isDisabled ? 0.99 : 1 }],
        },
        style,
      ]}
    >
      <View style={{ alignItems: "center", flexDirection: "row", gap: spacing.sm }}>
        {loading ? <ActivityIndicator color={buttonForeground} size="small" /> : null}
        <Text
          style={{
            color: buttonForeground,
            fontFamily: getFontFamily("semibold"),
            fontSize: typography.sizes.button,
            fontWeight: typography.weights.semibold,
          }}
        >
          {label}
        </Text>
        {trailingIcon && !loading ? (
          <RoutelyIcon
            color={buttonForeground}
            name={trailingIcon}
            size={componentSizes.iconSmall}
          />
        ) : null}
      </View>
    </Pressable>
  );
}

export interface RoutelySurfaceProps extends PropsWithChildren {
  tone?: "default" | "muted";
  style?: StyleProp<ViewStyle>;
}

export function RoutelySurface({
  children,
  tone = "default",
  style,
}: RoutelySurfaceProps): ReactElement {
  return (
    <View
      style={[
        {
          backgroundColor: tone === "muted" ? colors.container : colors.white,
          borderColor: colors.border,
          borderRadius: radius.card,
          borderWidth: componentSizes.borderWidth,
          padding: spacing.lg,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

export interface RoutelyTextFieldProps extends TextInputProps {
  label: string;
  error?: string;
}

export function RoutelyTextField({
  label,
  error,
  style,
  accessibilityHint,
  ...inputProps
}: RoutelyTextFieldProps): ReactElement {
  const borderColor = error ? colors.error : colors.border;

  return (
    <View style={{ gap: spacing.xs }}>
      <Text
        style={{
          color: colors.charcoal,
          fontFamily: getFontFamily("medium"),
          fontSize: typography.sizes.label,
          fontWeight: typography.weights.medium,
        }}
      >
        {label}
      </Text>
      <TextInput
        accessibilityHint={error ?? accessibilityHint}
        accessibilityLabel={label}
        placeholderTextColor={colors.muted}
        {...inputProps}
        style={[
          {
            backgroundColor: colors.white,
            borderColor,
            borderRadius: radius.input,
            borderWidth: componentSizes.borderWidth,
            color: colors.charcoal,
            fontFamily: getFontFamily("regular"),
            fontSize: typography.sizes.body,
            minHeight: componentSizes.buttonHeight,
            paddingHorizontal: spacing.md,
          },
          style,
        ]}
      />
      {error ? (
        <Text
          accessibilityLiveRegion="polite"
          style={{
            color: colors.error,
            fontFamily: getFontFamily("regular"),
            fontSize: typography.sizes.label,
          }}
        >
          {error}
        </Text>
      ) : null}
    </View>
  );
}

export interface PageContainerProps extends PropsWithChildren {
  maxWidth?: number;
  style?: StyleProp<ViewStyle>;
}

export function PageContainer({
  children,
  maxWidth = componentSizes.contentMaxWidth,
  style,
}: PageContainerProps): ReactElement {
  const { width } = useWindowDimensions();
  const horizontalPadding = width >= designTokens.breakpoints.tablet ? spacing.xl : spacing.lg;

  return (
    <View
      style={[
        {
          alignSelf: "center",
          maxWidth,
          paddingHorizontal: horizontalPadding,
          width: "100%",
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}
