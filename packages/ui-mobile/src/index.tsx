import { useEffect, useRef, type ReactElement } from "react";
import {
  ActivityIndicator,
  Animated,
  Easing,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { Circle, Path, Svg } from "react-native-svg";
import { designTokens, getFontFamily, type FontWeight } from "@routely/design-tokens";
import { RoutelyLogo } from "./brand";
import { RoutelyButton, PageContainer } from "./primitives";
import { RoutelyIcon } from "./icons";

export { PageContainer, RoutelyButton, RoutelySurface, RoutelyTextField } from "./primitives";
export { RoutelyIcon, type RoutelyIconName, type RoutelyIconProps } from "./icons";
export { AppHeader, RoutelyBrand, RoutelyLogo, type AppHeaderProps } from "./brand";
export { RoleSelectionItem, SelectionIndicator, type RoleSelectionItemProps } from "./selection";
export { useRoutelyFonts } from "./fonts";
export { LoginScreen, type LoginCountry, type LoginScreenProps } from "./login";
export { AppearanceFrame, AppearanceProvider, AppearanceSwitch, useAppearance } from "./appearance";
export {
  DashboardPreviewFrame,
  DashboardPreviewMetrics,
  DashboardPreviewHero,
  DashboardPreviewCard,
  DashboardPreviewHeading,
} from "./dashboard-preview";

export type AppShellStatus = "ready" | "loading" | "error";

export function WebBaseStyles(): null {
  useEffect(() => {
    if (Platform.OS !== "web" || typeof document === "undefined") {
      return;
    }

    const rootElements = [
      document.documentElement,
      document.body,
      document.getElementById("root"),
    ].filter((element): element is HTMLElement => element !== null);
    const previousRootFonts = rootElements.map((element) => element.style.fontFamily);
    const controlFontStyles = document.createElement("style");
    controlFontStyles.dataset.routelyControlFonts = "true";
    controlFontStyles.textContent = `
      button,
      input,
      select,
      textarea {
        font-family: ${getFontFamily("regular")};
      }
    `;

    for (const element of rootElements) {
      element.style.fontFamily = getFontFamily("regular");
    }
    document.head.append(controlFontStyles);

    return () => {
      rootElements.forEach((element, index) => {
        element.style.fontFamily = previousRootFonts[index] ?? "";
      });
      controlFontStyles.remove();
    };
  }, []);

  return null;
}

export interface AppShellProps {
  appName: string;
  description: string;
  status?: AppShellStatus;
  fontReady?: boolean;
}

export interface WelcomeScreenProps {
  appName: string;
  headline: string;
  description: string;
}

export interface RiderWelcomeScreenProps {
  onGetStarted: () => void;
  onLogin: () => void;
  onTerms: () => void;
  onPrivacy: () => void;
}

export interface RiderDestinationScreenProps {
  title: string;
  description: string;
  onBack: () => void;
}

const { colors, componentSizes, radius, spacing, typography } = designTokens;

function textStyle(weight: FontWeight, fontReady = true) {
  return {
    color: colors.charcoal,
    fontFamily: fontReady ? getFontFamily(weight) : typography.fontFallback,
    fontWeight: typography.weights[weight],
  } as const;
}

export function AppShell({
  appName,
  description,
  status = "ready",
  fontReady = false,
}: AppShellProps): ReactElement {
  const isLoading = status === "loading";
  const isError = status === "error";

  return (
    <View
      accessibilityLiveRegion={isError ? "assertive" : "polite"}
      style={{
        backgroundColor: colors.white,
        flex: 1,
        justifyContent: "center",
        minHeight: "100%",
      }}
    >
      <PageContainer maxWidth={componentSizes.statusCardMaxWidth}>
        <RoutelyLogo accessibilityLabel="Routely" width={156} />
        <View style={{ marginTop: spacing.xl }}>
          {isLoading ? (
            <ActivityIndicator
              accessibilityLabel="Loading Routely"
              color={colors.forest}
              size="small"
            />
          ) : null}
          <Text
            accessibilityRole="header"
            style={{
              ...textStyle("bold", fontReady),
              fontSize: typography.sizes.heading,
              lineHeight: typography.lineHeights.heading,
              marginTop: isLoading ? spacing.md : 0,
            }}
          >
            {isLoading ? "Starting Routely" : isError ? "Could not start" : appName}
          </Text>
          <Text
            style={{
              ...textStyle("regular", fontReady),
              color: isError ? colors.error : colors.charcoal,
              fontSize: typography.sizes.body,
              lineHeight: typography.lineHeights.body,
              marginTop: spacing.sm,
            }}
          >
            {isLoading
              ? "Loading your preview."
              : isError
                ? "Restart the app to try again."
                : description}
          </Text>
        </View>
      </PageContainer>
    </View>
  );
}

function RouteIllustration({ wide }: { wide: boolean }): ReactElement {
  return (
    <View
      accessibilityLabel="Rider journey illustration, not live navigation"
      accessible
      style={{
        backgroundColor: colors.container,
        borderColor: colors.border,
        borderRadius: radius.xl,
        borderWidth: componentSizes.borderWidth,
        height: wide ? componentSizes.illustrationHeight : componentSizes.compactIllustrationHeight,
        justifyContent: "center",
        overflow: "hidden",
        position: "relative",
        width: wide ? "48%" : "100%",
      }}
    >
      <View
        style={{
          borderColor: `${colors.forest}50`,
          borderRadius: radius.pill,
          borderStyle: "dashed",
          borderWidth: componentSizes.routeStroke,
          height: componentSizes.routeHeight,
          left: "18%",
          position: "absolute",
          top: "23%",
          transform: [{ rotate: "34deg" }],
          width: "64%",
        }}
      />
      <View
        style={{
          alignItems: "center",
          backgroundColor: colors.forest,
          borderColor: colors.white,
          borderRadius: radius.pill,
          borderWidth: componentSizes.markerBorder,
          height: componentSizes.markerStart,
          justifyContent: "center",
          left: "18%",
          position: "absolute",
          top: "29%",
          width: componentSizes.markerStart,
        }}
      >
        <View
          style={{
            backgroundColor: colors.lime,
            borderRadius: radius.pill,
            height: componentSizes.innerDot,
            width: componentSizes.innerDot,
          }}
        />
      </View>
      <View
        style={{
          alignItems: "center",
          backgroundColor: colors.lime,
          borderColor: colors.white,
          borderRadius: radius.pill,
          borderWidth: componentSizes.markerBorder,
          height: componentSizes.markerEnd,
          justifyContent: "center",
          position: "absolute",
          right: "17%",
          top: "60%",
          width: componentSizes.markerEnd,
        }}
      >
        <RoutelyIcon color={colors.forest} name="mapPin" size={componentSizes.iconSmall} />
      </View>
      <View
        style={{
          alignItems: "center",
          alignSelf: "center",
          backgroundColor: colors.white,
          borderColor: colors.border,
          borderRadius: radius.pill,
          borderWidth: componentSizes.borderWidth,
          height: componentSizes.markerStart + spacing.md,
          justifyContent: "center",
          width: componentSizes.markerStart + spacing.md,
        }}
      >
        <RoutelyIcon color={colors.forest} name="bike" size={componentSizes.iconLarge} />
      </View>
    </View>
  );
}

export function RiderRouteIllustration({
  height,
  width,
}: {
  height: number;
  width: number;
}): ReactElement {
  const markerGlow = useRef(new Animated.Value(0)).current;
  const motorcycleMotion = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(markerGlow, {
          toValue: 1,
          duration: 1300,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: false,
        }),
        Animated.timing(markerGlow, {
          toValue: 0,
          duration: 1300,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: false,
        }),
      ]),
    );
    animation.start();

    const motorcycleAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(motorcycleMotion, {
          toValue: 1,
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: false,
        }),
        Animated.timing(motorcycleMotion, {
          toValue: 0,
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: false,
        }),
      ]),
    );
    motorcycleAnimation.start();

    return () => {
      animation.stop();
      motorcycleAnimation.stop();
    };
  }, [markerGlow, motorcycleMotion]);

  const glowOpacity = markerGlow.interpolate({
    inputRange: [0, 1],
    outputRange: [0.12, 0.34],
  });
  const glowScale = markerGlow.interpolate({
    inputRange: [0, 1],
    outputRange: [0.9, 1.16],
  });
  const motorcycleTranslateY = motorcycleMotion.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -2],
  });
  const motorcycleRotation = motorcycleMotion.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "-2deg"],
  });

  return (
    <View
      accessible
      accessibilityLabel="Illustration of a rider following a curved route"
      style={{
        backgroundColor: colors.background,
        borderColor: colors.border,
        borderRadius: radius.xl,
        borderWidth: componentSizes.borderWidth,
        height,
        overflow: "hidden",
        position: "relative",
        width,
      }}
    >
      <Svg height="100%" preserveAspectRatio="xMidYMid meet" viewBox="0 0 342 300" width="100%">
        <Circle cx="286" cy="38" fill={colors.lime} opacity={0.2} r="66" />
        <Circle cx="20" cy="276" fill={colors.forest} opacity={0.045} r="88" />
        <Path
          d="M 28 246 C 76 212 120 258 145 202 C 169 147 111 125 141 82 C 171 38 216 79 247 46 C 263 28 276 18 305 16"
          fill="none"
          stroke={colors.white}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="56"
        />
        <Path
          d="M 28 246 C 76 212 120 258 145 202 C 169 147 111 125 141 82 C 171 38 216 79 247 46 C 263 28 276 18 305 16"
          fill="none"
          stroke={colors.forest}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="40"
        />
        <Path
          d="M 28 246 C 76 212 120 258 145 202 C 169 147 111 125 141 82 C 171 38 216 79 247 46 C 263 28 276 18 305 16"
          fill="none"
          stroke={colors.lime}
          strokeDasharray="2 13"
          strokeLinecap="round"
          strokeWidth="2"
        />
        <Circle
          cx="28"
          cy="246"
          fill={colors.forest}
          r="21"
          stroke={colors.white}
          strokeWidth="5"
        />
        <Circle cx="28" cy="246" fill={colors.lime} r="5" />
        <Circle cx="305" cy="16" fill={colors.lime} r="21" stroke={colors.white} strokeWidth="5" />
      </Svg>
      <Animated.View
        style={[
          styles.riderArtworkBadge,
          {
            left: "42%",
            top: "52%",
            height: componentSizes.touchTarget + spacing.md,
            width: componentSizes.touchTarget + spacing.md,
            transform: [{ translateY: motorcycleTranslateY }, { rotate: motorcycleRotation }],
          },
        ]}
      >
        <Svg height={39} viewBox="0 0 48 36" width={52}>
          <Circle cx="8" cy="28" fill="none" r="5.5" stroke={colors.forest} strokeWidth="2" />
          <Circle cx="39" cy="28" fill="none" r="5.5" stroke={colors.forest} strokeWidth="2" />
          <Path
            d="M8 28l7-10h9l7 10h8l-4-14m-20 4 7 10h10m-17-10 4-6h9l4 6m-13-6-3-3h-5m24 3 4-4h4m-7 14h10"
            fill="none"
            stroke={colors.forest}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.2"
          />
          <Path d="M16 18l3-6h9l4 6-4 3h-9z" fill={colors.forest} />
          <Path d="M18 22h7l3 5h-9z" fill={colors.forest} opacity={0.9} />
        </Svg>
      </Animated.View>
      <Animated.View
        pointerEvents="none"
        style={{
          backgroundColor: colors.lime,
          borderRadius: radius.pill,
          height: componentSizes.touchTarget + spacing.sm + spacing.md,
          opacity: glowOpacity,
          position: "absolute",
          right: "5%",
          top: 0,
          transform: [{ translateX: spacing.sm }, { scale: glowScale }],
          width: componentSizes.touchTarget + spacing.sm + spacing.md,
        }}
      />
      <View
        style={[
          styles.riderArtworkBadge,
          {
            backgroundColor: colors.lime,
            right: "5%",
            top: "0%",
          },
        ]}
      >
        <RoutelyIcon color={colors.forest} name="mapPin" size={componentSizes.iconSmall} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  riderArtworkBadge: {
    alignItems: "center",
    backgroundColor: colors.white,
    borderColor: colors.border,
    borderRadius: radius.pill,
    borderWidth: componentSizes.borderWidth,
    height: componentSizes.touchTarget + spacing.sm,
    justifyContent: "center",
    position: "absolute",
    width: componentSizes.touchTarget + spacing.sm,
  },
});

export function RiderWelcomeScreen({
  onGetStarted,
  onLogin,
  onTerms,
  onPrivacy,
}: RiderWelcomeScreenProps): ReactElement {
  const { height, width } = useWindowDimensions();
  const horizontalPadding = width >= designTokens.breakpoints.tablet ? spacing.xl : spacing.lg;
  const illustrationWidth = Math.min(
    width >= designTokens.breakpoints.tablet ? 440 : 342,
    Math.min(width, 520) - horizontalPadding * 2,
  );
  const illustrationHeight = (illustrationWidth * 300) / 342;

  return (
    <ScrollView
      contentContainerStyle={{
        backgroundColor: colors.white,
        flexGrow: 1,
      }}
      style={{ backgroundColor: colors.white, flex: 1 }}
    >
      <PageContainer
        maxWidth={520}
        style={{
          flex: 1,
          minHeight: Math.max(height, 700),
        }}
      >
        <View
          style={{
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-between",
            minHeight: componentSizes.headerHeight,
          }}
        >
          <RoutelyLogo accessibilityLabel="Routely" width={128} />
          <View
            style={{
              alignItems: "center",
              backgroundColor: colors.container,
              borderRadius: radius.pill,
              flexDirection: "row",
              gap: spacing.sm,
              paddingHorizontal: spacing.md,
              paddingVertical: spacing.sm,
            }}
          >
            <View
              style={{
                backgroundColor: colors.lime,
                borderRadius: radius.pill,
                height: componentSizes.indicator,
                width: componentSizes.indicator,
              }}
            />
            <Text
              style={{
                ...textStyle("semibold"),
                fontSize: typography.sizes.label,
              }}
            >
              RIDER
            </Text>
          </View>
        </View>

        <View
          style={{
            flex: 1,
            justifyContent: "space-between",
            paddingBottom: spacing.md,
            paddingTop: spacing.md,
          }}
        >
          <View>
            <View>
              <Text
                accessibilityRole="header"
                style={{
                  ...textStyle("bold"),
                  fontSize: typography.sizes.compactDisplay,
                  letterSpacing: typography.letterSpacing.display,
                  lineHeight: typography.lineHeights.compactHeading,
                }}
              >
                Made for the ride.
              </Text>
              <Text
                style={{
                  ...textStyle("regular"),
                  color: colors.muted,
                  fontSize: typography.sizes.body,
                  lineHeight: typography.lineHeights.body,
                  marginTop: spacing.xs,
                }}
              >
                Your journey starts with Routely.
              </Text>
            </View>

            <View style={{ alignSelf: "center", marginTop: spacing.lg }}>
              <RiderRouteIllustration height={illustrationHeight} width={illustrationWidth} />
            </View>
          </View>

          <View
            style={{
              gap: spacing.md,
            }}
          >
            <View style={{ gap: spacing.sm }}>
              <RoutelyButton
                fullWidth
                label="Get started"
                onPress={onGetStarted}
                trailingIcon="arrowRight"
              />
              <RoutelyButton
                fullWidth
                label="I already have an account"
                onPress={onLogin}
                variant="secondary"
              />
            </View>

            <View
              style={{
                alignItems: "center",
                flexDirection: "row",
                flexWrap: "wrap",
                gap: spacing.sm,
                justifyContent: "center",
                paddingTop: spacing.xs,
              }}
            >
              <Pressable
                accessibilityRole="link"
                onPress={onTerms}
                style={{ minHeight: componentSizes.touchTarget, justifyContent: "center" }}
              >
                <Text
                  style={{
                    ...textStyle("medium"),
                    color: colors.muted,
                    fontSize: typography.sizes.label,
                  }}
                >
                  Terms of Service
                </Text>
              </Pressable>
              <Text
                accessibilityElementsHidden
                style={{ ...textStyle("regular"), color: colors.border }}
              >
                ·
              </Text>
              <Pressable
                accessibilityRole="link"
                onPress={onPrivacy}
                style={{ minHeight: componentSizes.touchTarget, justifyContent: "center" }}
              >
                <Text
                  style={{
                    ...textStyle("medium"),
                    color: colors.muted,
                    fontSize: typography.sizes.label,
                  }}
                >
                  Privacy Policy
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </PageContainer>
    </ScrollView>
  );
}

export function RiderDestinationScreen({
  title,
  description,
  onBack,
}: RiderDestinationScreenProps): ReactElement {
  return (
    <View style={{ backgroundColor: colors.white, flex: 1 }}>
      <PageContainer
        maxWidth={componentSizes.statusCardMaxWidth}
        style={{ flex: 1, minHeight: 560, paddingBottom: spacing.xl }}
      >
        <Pressable
          accessibilityRole="button"
          onPress={onBack}
          style={{
            alignItems: "center",
            alignSelf: "flex-start",
            flexDirection: "row",
            gap: spacing.sm,
            minHeight: componentSizes.headerHeight,
            paddingRight: spacing.md,
          }}
        >
          <RoutelyIcon name="arrowLeft" size={componentSizes.iconSmall} />
          <Text
            style={{
              ...textStyle("semibold"),
              fontSize: typography.sizes.label,
            }}
          >
            Back
          </Text>
        </Pressable>

        <View style={{ flex: 1, justifyContent: "center", paddingBottom: spacing["2xl"] }}>
          <RoutelyLogo accessibilityLabel="Routely" width={148} />
          <Text
            accessibilityRole="header"
            style={{
              ...textStyle("bold"),
              fontSize: typography.sizes.heading,
              lineHeight: typography.lineHeights.heading,
              marginTop: spacing.xl,
            }}
          >
            {title}
          </Text>
          <Text
            style={{
              ...textStyle("regular"),
              color: colors.muted,
              fontSize: typography.sizes.body,
              lineHeight: typography.lineHeights.body,
              marginTop: spacing.sm,
            }}
          >
            {description}
          </Text>
          <Text
            style={{
              ...textStyle("medium"),
              color: colors.muted,
              fontSize: typography.sizes.label,
              marginTop: spacing.xl,
            }}
          >
            Preview only
          </Text>
        </View>
      </PageContainer>
    </View>
  );
}

export function WelcomeScreen({
  appName,
  headline,
  description,
}: WelcomeScreenProps): ReactElement {
  const { width } = useWindowDimensions();
  const wide = width >= designTokens.breakpoints.tablet;

  return (
    <ScrollView
      contentContainerStyle={{
        backgroundColor: colors.white,
        flexGrow: 1,
        paddingBottom: spacing.lg,
      }}
      style={{ backgroundColor: colors.white, flex: 1 }}
    >
      <PageContainer style={{ flex: 1 }}>
        <View
          style={{
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-between",
            minHeight: componentSizes.headerHeight,
          }}
        >
          <RoutelyLogo accessibilityLabel="Routely" width={148} />
          <View
            style={{
              backgroundColor: colors.container,
              borderRadius: radius.pill,
              paddingHorizontal: spacing.md,
              paddingVertical: spacing.sm,
            }}
          >
            <Text
              style={{
                ...textStyle("semibold"),
                fontSize: typography.sizes.label,
              }}
            >
              {appName}
            </Text>
          </View>
        </View>

        <View
          style={{
            alignItems: wide ? "center" : "stretch",
            flexDirection: wide ? "row" : "column",
            gap: wide ? spacing.xl : spacing.lg,
            paddingBottom: spacing.md,
            paddingTop: wide ? spacing["3xl"] : spacing.lg,
          }}
        >
          <View style={{ flex: 1 }}>
            <Text
              accessibilityRole="header"
              style={{
                ...textStyle("bold"),
                fontSize: wide ? typography.sizes.display : typography.sizes.compactDisplay,
                letterSpacing: typography.letterSpacing.display,
                lineHeight: wide
                  ? typography.lineHeights.heading
                  : typography.lineHeights.compactHeading,
                maxWidth: componentSizes.welcomeHeadingMaxWidth,
              }}
            >
              {headline}
            </Text>
            <Text
              style={{
                ...textStyle("regular"),
                color: colors.charcoal,
                fontSize: typography.sizes.body,
                lineHeight: typography.lineHeights.body,
                marginTop: spacing.md,
                maxWidth: componentSizes.welcomeDescriptionMaxWidth,
              }}
            >
              {description}
            </Text>
            {!wide ? (
              <View style={{ marginTop: spacing.lg }}>
                <RouteIllustration wide={false} />
              </View>
            ) : null}
            <RoutelyButton
              disabled
              fullWidth={!wide}
              label={`${appName} setup coming soon`}
              style={{ marginTop: spacing.lg }}
            />
            {wide ? (
              <Text
                style={{
                  ...textStyle("medium"),
                  color: colors.charcoal,
                  fontSize: typography.sizes.label,
                  marginTop: spacing.md,
                }}
              >
                Visual preview only
              </Text>
            ) : null}
          </View>
          {wide ? <RouteIllustration wide /> : null}
        </View>

        {!wide ? (
          <Text
            style={{
              ...textStyle("medium"),
              color: colors.charcoal,
              fontSize: typography.sizes.label,
              paddingTop: spacing.sm,
              textAlign: "center",
            }}
          >
            Visual preview only
          </Text>
        ) : null}
      </PageContainer>
    </ScrollView>
  );
}
