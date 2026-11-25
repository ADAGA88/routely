import type { PropsWithChildren, ReactElement } from "react";
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, View } from "react-native";
import { designTokens, getFontFamily } from "@routely/design-tokens";
import { PageContainer, RoutelyIcon, RoutelyLogo } from "@routely/ui-mobile";

const { colors, componentSizes, radius, spacing, typography } = designTokens;

interface AuthScreenFrameProps extends PropsWithChildren {
  title: string;
  description: string;
  onBack: () => void;
}

export function AuthScreenFrame({
  title,
  description,
  onBack,
  children,
}: AuthScreenFrameProps): ReactElement {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ backgroundColor: colors.white, flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={{ backgroundColor: colors.white, flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        style={{ backgroundColor: colors.white, flex: 1 }}
      >
        <PageContainer
          maxWidth={520}
          style={{ flex: 1, minHeight: 640, paddingBottom: spacing.xl }}
        >
          <View
            style={{
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "space-between",
              minHeight: componentSizes.headerHeight,
            }}
          >
            <Pressable
              accessibilityLabel="Go back"
              accessibilityRole="button"
              onPress={onBack}
              style={{
                alignItems: "center",
                flexDirection: "row",
                gap: spacing.sm,
                minHeight: componentSizes.touchTarget,
                paddingRight: spacing.md,
              }}
            >
              <RoutelyIcon name="arrowLeft" size={componentSizes.iconSmall} />
              <Text
                style={{
                  color: colors.charcoal,
                  fontFamily: getFontFamily("semibold"),
                  fontSize: typography.sizes.label,
                  fontWeight: typography.weights.semibold,
                }}
              >
                Back
              </Text>
            </Pressable>
            <View
              style={{
                alignItems: "center",
                flexDirection: "row",
                gap: spacing.sm,
              }}
            >
              <RoutelyLogo width={112} />
              <View
                style={{
                  backgroundColor: colors.container,
                  borderRadius: radius.pill,
                  paddingHorizontal: spacing.sm,
                  paddingVertical: spacing.xs,
                }}
              >
                <Text
                  style={{
                    color: colors.charcoal,
                    fontFamily: getFontFamily("semibold"),
                    fontSize: typography.sizes.eyebrow,
                    fontWeight: typography.weights.semibold,
                  }}
                >
                  RIDER
                </Text>
              </View>
            </View>
          </View>

          <View style={{ flex: 1, justifyContent: "center", paddingVertical: spacing.xl }}>
            <Text
              accessibilityRole="header"
              style={{
                color: colors.charcoal,
                fontFamily: getFontFamily("bold"),
                fontSize: typography.sizes.heading,
                fontWeight: typography.weights.bold,
                lineHeight: typography.lineHeights.heading,
              }}
            >
              {title}
            </Text>
            <Text
              style={{
                color: colors.muted,
                fontFamily: getFontFamily("regular"),
                fontSize: typography.sizes.body,
                fontWeight: typography.weights.regular,
                lineHeight: typography.lineHeights.body,
                marginTop: spacing.sm,
                maxWidth: componentSizes.welcomeDescriptionMaxWidth,
              }}
            >
              {description}
            </Text>
            <View style={{ marginTop: spacing.xl }}>{children}</View>
          </View>
        </PageContainer>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export function AuthInlineMessage({
  children,
  tone = "error",
}: PropsWithChildren<{ tone?: "error" | "notice" | "success" }>): ReactElement {
  const color =
    tone === "error" ? colors.error : tone === "success" ? colors.forest : colors.charcoal;

  return (
    <Text
      accessibilityLiveRegion="polite"
      style={{
        color,
        fontFamily: getFontFamily("medium"),
        fontSize: typography.sizes.label,
        fontWeight: typography.weights.medium,
        lineHeight: typography.lineHeights.footnote,
        marginTop: spacing.sm,
      }}
    >
      {children}
    </Text>
  );
}
