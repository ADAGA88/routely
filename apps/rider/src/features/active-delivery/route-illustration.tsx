import type { ReactElement } from "react";
import { View } from "react-native";
import Svg, { Circle, G, Path, Rect } from "react-native-svg";
import { designTokens } from "@routely/design-tokens";
import type { JourneyStage } from "./journey-preview";

const { colors, map, radius } = designTokens;

const riderPositions: Record<JourneyStage, { x: number; y: number }> = {
  "to-pickup": { x: 69, y: 203 },
  pickup: { x: 192, y: 157 },
  "drop-off": { x: 265, y: 97 },
  complete: { x: 331, y: 58 },
};

export function RouteIllustration({ stage }: { stage: JourneyStage }): ReactElement {
  const position = riderPositions[stage];

  return (
    <View
      accessible
      accessibilityLabel="Illustrated sample route, not a live map or geographic navigation."
      style={{
        backgroundColor: colors.container,
        borderRadius: radius.panel,
        height: 260,
        overflow: "hidden",
      }}
    >
      <Svg height="100%" preserveAspectRatio="none" viewBox="0 0 400 260" width="100%">
        <Rect fill={colors.container} height="260" width="400" />
        <Path
          d="M-20 62 L420 203 M-12 180 L412 51 M65 -20 L210 280 M252 -20 L390 280"
          fill="none"
          stroke={colors.white}
          strokeLinecap="round"
          strokeWidth="17"
        />
        <Path
          d="M-20 117 L420 255 M-15 245 L410 115 M146 -20 L291 280"
          fill="none"
          stroke={colors.border}
          strokeLinecap="round"
          strokeWidth="6"
        />
        <Path
          d="M69 203 C91 175 114 155 150 151 S203 175 225 145 S267 83 331 58"
          fill="none"
          stroke={colors.white}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="14"
        />
        <Path
          d="M69 203 C91 175 114 155 150 151 S203 175 225 145 S267 83 331 58"
          fill="none"
          stroke={map.route}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="6"
        />
        <Circle cx="331" cy="58" fill={colors.white} r="16" />
        <Circle cx="331" cy="58" fill={map.marker} r="10" stroke={map.route} strokeWidth="3" />
        <Circle cx="192" cy="157" fill={colors.white} r="15" />
        <Circle cx="192" cy="157" fill={map.route} r="9" />
        <G x={position.x} y={position.y}>
          <Circle cx="0" cy="0" fill={colors.white} r="19" />
          <Circle cx="0" cy="0" fill={map.route} r="14" />
          <Path d="M-5 3 l5 -10 5 10 -5 -3 z" fill={colors.white} />
        </G>
      </Svg>
    </View>
  );
}
