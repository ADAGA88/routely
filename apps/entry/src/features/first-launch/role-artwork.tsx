import type { ReactElement } from "react";
import { View, useWindowDimensions } from "react-native";
import { Circle, Path, Svg } from "react-native-svg";
import { designTokens } from "@routely/design-tokens";
import { RiderRouteIllustration, RoutelyIcon } from "@routely/ui-mobile";
import type { PublicExperience } from "./experience";

const { colors, componentSizes, radius, spacing } = designTokens;

interface RoleArtworkProps {
  experience: PublicExperience;
}

export function RoleArtwork({ experience }: RoleArtworkProps): ReactElement {
  const { width } = useWindowDimensions();
  const artworkWidth = Math.min(width - spacing.xl * 2, 380);
  const artworkHeight = Math.min(280, artworkWidth * 0.74);

  if (experience === "rider") {
    return <RiderRouteIllustration height={artworkHeight} width={artworkWidth} />;
  }

  return (
    <View
      accessible
      accessibilityLabel={`${experience} introductory illustration`}
      style={{
        alignItems: "center",
        alignSelf: "center",
        backgroundColor: colors.background,
        borderColor: colors.border,
        borderRadius: radius.xl,
        borderWidth: componentSizes.borderWidth,
        height: artworkHeight,
        justifyContent: "center",
        overflow: "hidden",
        width: artworkWidth,
      }}
    >
      <Svg height="100%" preserveAspectRatio="xMidYMid meet" viewBox="0 0 342 252" width="100%">
        {experience === "customer" ? (
          <>
            <Path
              d="M37 181c37 0 38-92 82-92 37 0 34 65 76 65 30 0 34-56 83-56"
              fill="none"
              stroke={colors.forest}
              strokeLinecap="round"
              strokeWidth="8"
            />
            <Path
              d="M37 181c37 0 38-92 82-92 37 0 34 65 76 65 30 0 34-56 83-56"
              fill="none"
              stroke={colors.lime}
              strokeDasharray="2 13"
              strokeLinecap="round"
              strokeWidth="2"
            />
          </>
        ) : experience === "owner" ? (
          <>
            <Path
              d="M73 184h196M101 184v-53h140v53M116 131v-17h110v17"
              fill="none"
              stroke={colors.border}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="5"
            />
            <Path
              d="M107 202h129"
              fill="none"
              stroke={colors.forest}
              strokeLinecap="round"
              strokeWidth="3"
            />
          </>
        ) : (
          <>
            <Path
              d="M76 177c35-45 63-72 95-72 33 0 54 28 93 48"
              fill="none"
              stroke={colors.border}
              strokeLinecap="round"
              strokeWidth="4"
            />
            <Path
              d="M76 177c35-45 63-72 95-72 33 0 54 28 93 48"
              fill="none"
              stroke={colors.forest}
              strokeDasharray="2 12"
              strokeLinecap="round"
              strokeWidth="2"
            />
          </>
        )}
        {experience === "customer" ? (
          <>
            <Circle
              cx="37"
              cy="181"
              fill={colors.forest}
              r="18"
              stroke={colors.white}
              strokeWidth="5"
            />
            <Circle
              cx="278"
              cy="98"
              fill={colors.lime}
              r="18"
              stroke={colors.white}
              strokeWidth="5"
            />
          </>
        ) : null}
        {experience === "agent" ? (
          <>
            <Circle
              cx="76"
              cy="177"
              fill={colors.lime}
              r="17"
              stroke={colors.white}
              strokeWidth="5"
            />
            <Circle
              cx="264"
              cy="153"
              fill={colors.forest}
              r="17"
              stroke={colors.white}
              strokeWidth="5"
            />
          </>
        ) : null}
      </Svg>
      <View
        style={{
          alignItems: "center",
          backgroundColor: colors.white,
          borderColor: colors.border,
          borderRadius: radius.pill,
          borderWidth: componentSizes.borderWidth,
          height: 76,
          justifyContent: "center",
          position: "absolute",
          width: 76,
        }}
      >
        <RoutelyIcon
          color={colors.forest}
          name={
            experience === "customer" ? "package" : experience === "owner" ? "motorcycle" : "user"
          }
          size={componentSizes.iconLarge + spacing.sm}
          strokeWidth={componentSizes.iconStroke}
        />
      </View>
    </View>
  );
}
