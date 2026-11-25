import type { ReactElement } from "react";
import Svg, { Circle, Path, Rect } from "react-native-svg";
import { designTokens } from "@routely/design-tokens";

const { colors } = designTokens;

export function GeneralIntroArtwork({ step }: { step: number }): ReactElement {
  return (
    <Svg height="100%" viewBox="0 0 320 280" width="100%">
      <Circle cx="160" cy="135" fill={colors.background} r="116" />
      <Circle cx="247" cy="65" fill={colors.lime} opacity={0.35} r="24" />
      {step === 0 ? (
        <>
          <Path d="M37 226h246" stroke={colors.border} strokeLinecap="round" strokeWidth="5" />
          <Circle cx="78" cy="202" fill={colors.charcoal} r="32" />
          <Circle cx="239" cy="202" fill={colors.charcoal} r="32" />
          <Circle cx="78" cy="202" fill={colors.white} r="16" />
          <Circle cx="239" cy="202" fill={colors.white} r="16" />
          <Path d="M78 198h48l28-61h61l29 61h-58l-30-28-20 28H78Z" fill={colors.forest} />
          <Path d="M157 138h51l18 37h-55l-21-19Z" fill={colors.lime} />
          <Path
            d="M210 138l-11-25h20"
            fill="none"
            stroke={colors.charcoal}
            strokeLinecap="round"
            strokeWidth="8"
          />
          <Rect fill={colors.forest} height="65" rx="8" width="66" x="48" y="95" />
          <Path d="M48 113h66M81 95v18" fill="none" stroke={colors.lime} strokeWidth="4" />
          <Path d="M118 131c2-24 13-38 34-40l19 8 11 34-25 16-13-17-10 22Z" fill={colors.forest} />
          <Circle cx="157" cy="75" fill={colors.charcoal} r="19" />
          <Path d="M137 72c3-17 31-23 39-2l-3 6h-33Z" fill={colors.lime} />
          <Path
            d="M159 107l27 17 20-8"
            fill="none"
            stroke={colors.charcoal}
            strokeLinecap="round"
            strokeWidth="10"
          />
          <Path
            d="M146 145l-12 34-18 5"
            fill="none"
            stroke={colors.charcoal}
            strokeLinecap="round"
            strokeWidth="12"
          />
        </>
      ) : null}
      {step === 1 ? (
        <>
          <Rect fill={colors.forest} height="170" rx="20" width="102" x="169" y="54" />
          <Rect fill={colors.white} height="140" rx="11" width="84" x="178" y="67" />
          <Path
            d="M191 166c23-7 11-42 34-45 13-2 15-17 25-26"
            fill="none"
            stroke={colors.lime}
            strokeLinecap="round"
            strokeWidth="6"
          />
          <Circle cx="191" cy="166" fill={colors.forest} r="6" />
          <Circle cx="250" cy="95" fill={colors.forest} r="6" />
          <Path d="M46 147 105 118l59 29-59 31-59-31Z" fill={colors.lime} />
          <Path d="M46 147v60l59 31v-60l-59-31Z" fill={colors.forest} />
          <Path d="M164 147v60l-59 31v-60l59-31Z" fill={colors.forest} opacity={0.78} />
          <Path
            d="m75 133 59 30m-59-1v16"
            fill="none"
            stroke={colors.white}
            strokeLinecap="round"
            strokeWidth="5"
          />
          <Circle cx="103" cy="74" fill={colors.lime} r="25" />
          <Path
            d="M103 61v26m-13-13h26"
            fill="none"
            stroke={colors.forest}
            strokeLinecap="round"
            strokeWidth="5"
          />
        </>
      ) : null}
      {step === 2 ? (
        <>
          <Rect
            fill={colors.white}
            height="154"
            rx="16"
            stroke={colors.border}
            strokeWidth="3"
            width="187"
            x="66"
            y="56"
          />
          <Path d="M66 105h187" stroke={colors.border} strokeWidth="3" />
          <Circle cx="92" cy="81" fill={colors.lime} r="10" />
          <Path d="M115 80h100" stroke={colors.forest} strokeLinecap="round" strokeWidth="7" />
          <Path
            d="M87 129h49m-49 18h36m-36 18h49"
            stroke={colors.muted}
            strokeLinecap="round"
            strokeWidth="5"
          />
          <Circle cx="189" cy="151" fill={colors.lime} r="37" />
          <Path
            d="m169 153 13 13 26-30"
            fill="none"
            stroke={colors.forest}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="8"
          />
          <Circle cx="82" cy="219" fill={colors.charcoal} r="18" />
          <Circle cx="228" cy="219" fill={colors.charcoal} r="18" />
          <Circle cx="82" cy="219" fill={colors.white} r="8" />
          <Circle cx="228" cy="219" fill={colors.white} r="8" />
          <Path d="M83 218h42l18-31h47l38 31h-52l-29-15-22 15Z" fill={colors.forest} />
          <Path d="M157 187h33l18 15h-46Z" fill={colors.lime} />
        </>
      ) : null}
    </Svg>
  );
}
