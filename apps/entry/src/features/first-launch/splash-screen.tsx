import { useEffect, useRef, type ReactElement } from "react";
import { ActivityIndicator, Animated, Easing, Platform, Text, View } from "react-native";
import { designTokens, getFontFamily } from "@routely/design-tokens";
import { RoutelyButton, RoutelyLogo } from "@routely/ui-mobile";

const { colors, spacing, typography } = designTokens;

interface SplashScreenProps {
  error?: string;
  onRetry?: () => void;
  onReset?: () => void;
  onEntranceComplete?: () => void;
}

export function SplashScreen({
  error,
  onRetry,
  onReset,
  onEntranceComplete,
}: SplashScreenProps): ReactElement {
  const entrance = useRef(new Animated.Value(0.9)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.sequence([
      Animated.parallel([
        Animated.timing(entrance, {
          toValue: 1,
          duration: 1600,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: Platform.OS !== "web",
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 1300,
          easing: Easing.out(Easing.quad),
          useNativeDriver: Platform.OS !== "web",
        }),
      ]),
      Animated.delay(600),
    ]);
    animation.start(({ finished }) => {
      if (finished) {
        onEntranceComplete?.();
      }
    });
    return () => animation.stop();
  }, [entrance, onEntranceComplete, opacity]);

  return (
    <View
      accessibilityLiveRegion={error ? "assertive" : "polite"}
      style={{
        alignItems: "center",
        backgroundColor: colors.white,
        flex: 1,
        justifyContent: "center",
        padding: spacing.xl,
      }}
    >
      <Animated.View
        style={{
          alignItems: "center",
          opacity,
          transform: [{ scale: entrance }],
        }}
      >
        <RoutelyLogo accessibilityLabel="Routely" width={236} />
        {error ? (
          <View style={{ alignItems: "center", marginTop: spacing.xl, maxWidth: 360 }}>
            <Text
              accessibilityRole="header"
              style={{
                color: colors.charcoal,
                fontFamily: getFontFamily("semibold"),
                fontSize: typography.sizes.sectionHeading,
                fontWeight: typography.weights.semibold,
                textAlign: "center",
              }}
            >
              Could not start Routely
            </Text>
            <Text
              style={{
                color: colors.muted,
                fontFamily: getFontFamily("regular"),
                fontSize: typography.sizes.body,
                lineHeight: typography.lineHeights.body,
                marginTop: spacing.sm,
                textAlign: "center",
              }}
            >
              {error}
            </Text>
            {onRetry ? (
              <RoutelyButton
                fullWidth
                label="Try again"
                onPress={onRetry}
                style={{ marginTop: spacing.lg }}
              />
            ) : null}
            {onReset ? (
              <RoutelyButton
                fullWidth
                label="Clear first-launch preferences"
                onPress={onReset}
                style={{ marginTop: spacing.sm }}
                variant="secondary"
              />
            ) : null}
          </View>
        ) : (
          <View style={{ alignItems: "center", marginTop: spacing.xl }}>
            <ActivityIndicator
              accessibilityLabel="Starting Routely"
              color={colors.forest}
              size="small"
            />
            <Text
              style={{
                color: colors.muted,
                fontFamily: getFontFamily("medium"),
                fontSize: typography.sizes.label,
                fontWeight: typography.weights.medium,
                marginTop: spacing.md,
              }}
            >
              Getting things ready
            </Text>
          </View>
        )}
      </Animated.View>
    </View>
  );
}
