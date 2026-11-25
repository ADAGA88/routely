import type { ReactElement } from "react";
import Svg, { Circle, Path, Rect } from "react-native-svg";
import { designTokens } from "@routely/design-tokens";

const { colors } = designTokens;

export type DashboardIllustrationName =
  "delivery" | "earnings" | "verification" | "support" | "requests" | "profile";

interface DashboardIllustrationProps {
  name: DashboardIllustrationName;
  size?: number;
}

export function DashboardIllustration({
  name,
  size = 64,
}: DashboardIllustrationProps): ReactElement {
  return (
    <Svg height={size} viewBox="0 0 96 96" width={size}>
      {name === "delivery" ? (
        <>
          <Circle cx="48" cy="48" fill={colors.background} r="43" />
          <Circle cx="25" cy="70" fill={colors.charcoal} r="11" />
          <Circle cx="70" cy="70" fill={colors.charcoal} r="11" />
          <Circle cx="25" cy="70" fill={colors.white} r="5" />
          <Circle cx="70" cy="70" fill={colors.white} r="5" />
          <Path d="M25 67h15l8-21h17l8 21H55l-7-10-6 10H25Z" fill={colors.forest} />
          <Path d="M49 46h13l6 13H52l-5-7Z" fill={colors.lime} />
          <Path d="M39 45h11l-2 5H38Z" fill={colors.charcoal} />
          <Path
            d="M64 46l-3-7h8"
            fill="none"
            stroke={colors.charcoal}
            strokeLinecap="round"
            strokeWidth="4"
          />
          <Rect fill={colors.lime} height="21" rx="3" width="23" x="19" y="33" />
          <Path d="M19 39h23M30.5 33v8" fill="none" stroke={colors.forest} strokeWidth="2" />
        </>
      ) : null}
      {name === "earnings" ? (
        <>
          <Circle cx="48" cy="48" fill={colors.background} r="43" />
          <Circle cx="60" cy="27" fill={colors.lime} r="14" />
          <Circle cx="60" cy="27" fill="none" r="9" stroke={colors.forest} strokeWidth="2" />
          <Path
            d="M60 21v12m-4-9h7m-7 6h7"
            fill="none"
            stroke={colors.forest}
            strokeLinecap="round"
            strokeWidth="2"
          />
          <Path
            d="M20 40c0-5 4-9 9-9h41v9H29c-2 0-3 1-3 3h44v30H29c-5 0-9-4-9-9V40Z"
            fill={colors.forest}
          />
          <Path d="M25 42h45v30H30c-3 0-5-2-5-5V42Z" fill={colors.forest} opacity={0.75} />
          <Rect fill={colors.lime} height="13" rx="6.5" width="25" x="53" y="50" />
          <Circle cx="62" cy="56.5" fill={colors.forest} r="2" />
        </>
      ) : null}
      {name === "verification" ? (
        <>
          <Circle cx="48" cy="48" fill={colors.background} r="43" />
          <Rect fill={colors.forest} height="55" rx="6" width="42" x="22" y="19" />
          <Rect fill={colors.white} height="48" rx="4" width="34" x="26" y="23" />
          <Circle cx="37" cy="37" fill={colors.lime} r="6" />
          <Path d="M30 50c1-5 4-7 7-7s6 2 7 7H30Z" fill={colors.forest} />
          <Path
            d="M31 57h18m-18 5h14"
            fill="none"
            stroke={colors.muted}
            strokeLinecap="round"
            strokeWidth="2"
          />
          <Path d="M60 42 76 48v13c0 10-7 16-16 20-9-4-16-10-16-20V48l16-6Z" fill={colors.lime} />
          <Path
            d="m53 60 5 5 9-11"
            fill="none"
            stroke={colors.forest}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="4"
          />
        </>
      ) : null}
      {name === "support" ? (
        <>
          <Circle cx="48" cy="48" fill={colors.background} r="43" />
          <Circle cx="48" cy="48" fill={colors.lime} opacity={0.45} r="29" />
          <Path
            d="M25 51v-7c0-13 10-23 23-23s23 10 23 23v7"
            fill="none"
            stroke={colors.forest}
            strokeLinecap="round"
            strokeWidth="7"
          />
          <Rect fill={colors.forest} height="21" rx="6" width="12" x="21" y="46" />
          <Rect fill={colors.forest} height="21" rx="6" width="12" x="63" y="46" />
          <Path
            d="M69 64c0 8-7 12-17 12"
            fill="none"
            stroke={colors.forest}
            strokeLinecap="round"
            strokeWidth="5"
          />
          <Rect fill={colors.lime} height="7" rx="3.5" width="13" x="44" y="72" />
          <Path d="M38 43h20v13H46l-6 5v-5h-2Z" fill={colors.white} />
          <Circle cx="43" cy="49.5" fill={colors.forest} r="1.5" />
          <Circle cx="48" cy="49.5" fill={colors.forest} r="1.5" />
          <Circle cx="53" cy="49.5" fill={colors.forest} r="1.5" />
        </>
      ) : null}
      {name === "requests" ? (
        <>
          <Circle cx="48" cy="48" fill={colors.background} r="43" />
          <Rect fill={colors.forest} height="58" rx="7" width="45" x="23" y="20" />
          <Rect fill={colors.white} height="48" rx="4" width="35" x="28" y="25" />
          <Rect fill={colors.lime} height="9" rx="4" width="22" x="34" y="16" />
          <Path
            d="M36 40h23M36 48h16M36 56h12"
            fill="none"
            stroke={colors.forest}
            strokeLinecap="round"
            strokeWidth="3"
          />
          <Circle cx="64" cy="62" fill={colors.lime} r="14" />
          <Path
            d="M64 55v14m-7-7h14"
            fill="none"
            stroke={colors.forest}
            strokeLinecap="round"
            strokeWidth="3"
          />
        </>
      ) : null}
      {name === "profile" ? (
        <>
          <Circle cx="48" cy="48" fill={colors.background} r="43" />
          <Circle cx="48" cy="48" fill={colors.lime} opacity={0.45} r="30" />
          <Circle cx="48" cy="37" fill={colors.forest} r="12" />
          <Path
            d="M25 71c1-13 10-21 23-21s22 8 23 21c-6 5-14 8-23 8s-17-3-23-8Z"
            fill={colors.forest}
          />
          <Rect fill={colors.lime} height="20" rx="4" width="25" x="58" y="58" />
          <Path
            d="M64 65h13m-13 6h9"
            fill="none"
            stroke={colors.forest}
            strokeLinecap="round"
            strokeWidth="3"
          />
        </>
      ) : null}
    </Svg>
  );
}
