import type { PropsWithChildren, ReactElement } from "react";
import { ScrollView, StyleSheet, View, type ColorValue } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { designTokens } from "@routely/design-tokens";
import { AppHeader, PageContainer } from "@routely/ui-mobile";

const { colors, spacing } = designTokens;

interface FirstLaunchFrameProps extends PropsWithChildren {
  backgroundLayer?: ReactElement;
  backgroundColor?: ColorValue;
  maxWidth?: number;
  showHeader?: boolean;
  leftLabel?: string;
  onLeftPress?: () => void;
  rightLabel?: string;
  onRightPress?: () => void;
}

export function FirstLaunchFrame({
  children,
  backgroundLayer,
  backgroundColor = colors.white,
  maxWidth = 720,
  showHeader = true,
  leftLabel,
  onLeftPress,
  rightLabel,
  onRightPress,
}: FirstLaunchFrameProps): ReactElement {
  return (
    <SafeAreaView edges={["top", "bottom"]} style={{ backgroundColor, flex: 1 }}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        style={{ backgroundColor }}
      >
        {backgroundLayer ? (
          <View pointerEvents="none" style={StyleSheet.absoluteFillObject}>
            {backgroundLayer}
          </View>
        ) : null}
        <PageContainer maxWidth={maxWidth} style={{ flexGrow: 1, paddingBottom: spacing.lg }}>
          {showHeader ? (
            <AppHeader
              leftLabel={leftLabel}
              onLeftPress={onLeftPress}
              onRightPress={onRightPress}
              rightLabel={rightLabel}
            />
          ) : null}
          {children}
        </PageContainer>
      </ScrollView>
    </SafeAreaView>
  );
}
