import type { ReactElement } from "react";
import { Image, Pressable, Text, View, useWindowDimensions } from "react-native";
import { Defs, LinearGradient, Rect, Stop, Svg } from "react-native-svg";
import heroIllustration from "../../../assets/illustrations/routely-welcome-scene.png";
import { designTokens, getFontFamily } from "@routely/design-tokens";
import { RoutelyIcon, RoutelyLogo } from "@routely/ui-mobile";
import { FirstLaunchFrame } from "./first-launch-frame";

const { colors, breakpoints, radius, spacing, typography } = designTokens;
const heroAspectRatio = 852 / 875;

interface GeneralWelcomeScreenProps {
  onGetStarted: () => void;
}

export function GeneralWelcomeScreen({ onGetStarted }: GeneralWelcomeScreenProps): ReactElement {
  const { width } = useWindowDimensions();
  const horizontalBleed = width >= breakpoints.tablet ? spacing.xl : spacing.lg;
  const heroWidth = Math.min(width, 520);
  const headlineSize = width < 375 ? 38 : width >= breakpoints.tablet ? 46 : 42;
  const backgroundLayer = (
    <Svg height="100%" preserveAspectRatio="none" width="100%">
      <Defs>
        <LinearGradient id="welcome-lime-background" x1="0%" x2="100%" y1="0%" y2="100%">
          <Stop offset="0%" stopColor={colors.welcomeLimeLight} />
          <Stop offset="100%" stopColor={colors.welcomeLimeDeep} />
        </LinearGradient>
      </Defs>
      <Rect fill="url(#welcome-lime-background)" height="100%" width="100%" />
    </Svg>
  );

  return (
    <FirstLaunchFrame
      backgroundColor={colors.welcomeLime}
      backgroundLayer={backgroundLayer}
      maxWidth={560}
      showHeader={false}
    >
      <View
        style={{
          alignItems: "center",
          paddingBottom: spacing.lg,
          paddingTop: spacing["2xl"],
        }}
      >
        <RoutelyLogo accessibilityLabel="Routely logo" width={Math.min(260, width * 0.64)} />
        <View
          style={{
            alignSelf: "center",
            marginTop: spacing.lg,
            maxWidth: 400,
            width: "100%",
          }}
        >
          <Text
            accessibilityRole="header"
            style={{
              color: colors.charcoal,
              fontFamily: getFontFamily("bold"),
              fontSize: headlineSize,
              fontWeight: typography.weights.bold,
              letterSpacing: typography.letterSpacing.display,
              lineHeight: headlineSize * 1.04,
              textAlign: "left",
            }}
          >
            {"Everything\nmoves with\nRoutely."}
          </Text>
          <Text
            style={{
              color: colors.forest,
              fontFamily: getFontFamily("regular"),
              fontSize: typography.sizes.body,
              lineHeight: typography.lineHeights.supporting,
              marginTop: spacing.sm,
              textAlign: "left",
            }}
          >
            Deliveries, people and opportunities — connected in one platform.
          </Text>
        </View>
        <View
          style={{
            alignSelf: "center",
            aspectRatio: heroAspectRatio,
            marginHorizontal: -horizontalBleed,
            marginTop: spacing.lg,
            maxWidth: 520,
            width: heroWidth,
          }}
        >
          <Image
            accessibilityLabel="Routely city, motorcycle rider and delivery van"
            accessible
            resizeMode="contain"
            source={heroIllustration}
            style={{ height: "100%", width: "100%" }}
          />
        </View>
        <Pressable
          accessibilityLabel="Get started"
          accessibilityRole="button"
          onPress={onGetStarted}
          style={({ pressed }) => ({
            alignItems: "center",
            alignSelf: "stretch",
            backgroundColor: colors.charcoal,
            borderRadius: radius.pill,
            flexDirection: "row",
            height: 56,
            justifyContent: "center",
            marginTop: spacing.sm,
            opacity: pressed ? 0.88 : 1,
          })}
        >
          <Text
            style={{
              color: colors.white,
              fontFamily: getFontFamily("bold"),
              fontSize: 18,
              fontWeight: typography.weights.bold,
            }}
          >
            Get started
          </Text>
          <RoutelyIcon
            color={colors.white}
            name="arrowRight"
            size={24}
            style={{ marginLeft: spacing.md }}
            strokeWidth={2.2}
          />
        </Pressable>
      </View>
    </FirstLaunchFrame>
  );
}
