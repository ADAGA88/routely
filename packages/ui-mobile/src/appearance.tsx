import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type PropsWithChildren,
  type ReactElement,
  type ReactNode,
} from "react";
import {
  AccessibilityInfo,
  Animated,
  Platform,
  Pressable,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import * as SecureStore from "expo-secure-store";
import { designTokens, getFontFamily, type AppearanceMode } from "@routely/design-tokens";
import { RoutelyIcon } from "./icons";

const { colors, motion, spacing, typography, radius, componentSizes } = designTokens;

interface AppearanceContextValue {
  mode: AppearanceMode;
  setMode: (mode: AppearanceMode) => Promise<boolean>;
  error: string | null;
  ready: boolean;
}

const AppearanceContext = createContext<AppearanceContextValue>({
  mode: "lime",
  setMode: async () => {
    throw new Error("Appearance settings are unavailable.");
  },
  error: null,
  ready: false,
});

export function AppearanceProvider({
  appName,
  children,
}: PropsWithChildren<{ appName: string }>): ReactElement {
  const [mode, updateMode] = useState<AppearanceMode>("lime");
  const [error, setError] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const key = `routely.appearance.${appName}.v1`;

  useEffect(() => {
    let active = true;
    async function restore(): Promise<void> {
      try {
        const saved =
          Platform.OS === "web"
            ? window.localStorage.getItem(key)
            : await SecureStore.getItemAsync(key);
        if (saved !== null && saved !== "lime" && saved !== "emerald") {
          throw new Error("Invalid saved appearance.");
        }
        if (active && saved) updateMode(saved);
      } catch {
        if (active) setError("Could not load your saved appearance.");
      } finally {
        if (active) setReady(true);
      }
    }
    void restore();
    return () => {
      active = false;
    };
  }, [key]);

  const setMode = useCallback(
    async (next: AppearanceMode) => {
      try {
        if (Platform.OS === "web") {
          window.localStorage.setItem(key, next);
        } else {
          await SecureStore.setItemAsync(key, next);
        }
        updateMode(next);
        setError(null);
        return true;
      } catch {
        setError("Could not save your appearance. Please try again.");
        return false;
      }
    },
    [key],
  );

  return (
    <AppearanceContext.Provider value={{ mode, setMode, error, ready }}>
      {children}
    </AppearanceContext.Provider>
  );
}

export function useAppearance(): AppearanceContextValue {
  return useContext(AppearanceContext);
}

export function AppearanceSwitch({
  accentBackground = false,
  leading,
  actions,
  iconSurface = false,
}: {
  accentBackground?: boolean;
  leading?: ReactNode;
  actions?: ReactNode;
  iconSurface?: boolean;
} = {}): ReactElement {
  const { mode, setMode, error, ready } = useAppearance();
  const { width } = useWindowDimensions();
  const accent = designTokens.appearance[mode];
  const [notice, setNotice] = useState<AppearanceMode | null>(null);
  const [saving, setSaving] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(true);
  const savingRef = useRef(false);
  const entrance = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let active = true;
    const subscription = AccessibilityInfo.addEventListener("reduceMotionChanged", setReduceMotion);
    void AccessibilityInfo.isReduceMotionEnabled()
      .then((enabled) => {
        if (active) setReduceMotion(enabled);
      })
      .catch(() => {
        console.warn("Could not read the reduced-motion preference.");
      });
    return () => {
      active = false;
      subscription?.remove();
    };
  }, []);

  useEffect(() => {
    if (!notice) return;
    entrance.setValue(reduceMotion ? 1 : 0);
    const animation = reduceMotion
      ? null
      : Animated.timing(entrance, {
          toValue: 1,
          duration: motion.slow,
          useNativeDriver: Platform.OS !== "web",
        });
    animation?.start();
    const timer = setTimeout(() => setNotice(null), 3000);
    return () => {
      clearTimeout(timer);
      animation?.stop();
    };
  }, [entrance, notice, reduceMotion]);

  async function toggle(): Promise<void> {
    if (savingRef.current) return;
    savingRef.current = true;
    setSaving(true);
    setNotice(null);
    const next = mode === "lime" ? "emerald" : "lime";
    try {
      if (await setMode(next)) setNotice(next);
    } finally {
      savingRef.current = false;
      setSaving(false);
    }
  }

  return (
    <View
      style={{
        backgroundColor: accentBackground ? accent.primary : colors.white,
        paddingHorizontal: leading ? 0 : spacing.md,
        zIndex: 1,
      }}
    >
      <View
        style={{
          alignItems: "center",
          alignSelf: leading ? "center" : undefined,
          flexDirection: "row",
          justifyContent: "flex-end",
          maxWidth: leading ? 720 : undefined,
          minHeight: componentSizes.touchTarget,
          paddingHorizontal: leading
            ? width >= designTokens.breakpoints.tablet
              ? spacing.xl
              : spacing.lg
            : 0,
          paddingVertical: leading ? spacing.xs : 0,
          width: "100%",
        }}
      >
        {leading ? <View style={{ flex: 1 }}>{leading}</View> : null}
        {actions}
        <Pressable
          accessibilityLabel={`Appearance: ${mode}. Switch to ${mode === "lime" ? "emerald" : "lime"}.`}
          accessibilityRole="button"
          disabled={!ready || saving}
          onPress={() => void toggle()}
          style={({ pressed }) => ({
            alignItems: "center",
            justifyContent: "center",
            minHeight: componentSizes.touchTarget,
            minWidth: componentSizes.touchTarget,
            opacity: pressed || !ready || saving ? 0.6 : 1,
          })}
        >
          {iconSurface ? (
            <View
              style={{
                alignItems: "center",
                backgroundColor: colors.white,
                borderColor: colors.border,
                borderRadius: radius.pill,
                borderWidth: componentSizes.borderWidth,
                height: componentSizes.iconLarge + spacing.sm,
                justifyContent: "center",
                width: componentSizes.iconLarge + spacing.sm,
              }}
            >
              <RoutelyIcon
                color={colors.forest}
                name="palette"
                size={componentSizes.iconSmall + 2}
              />
            </View>
          ) : (
            <RoutelyIcon
              color={accentBackground ? accent.onPrimary : colors.forest}
              name="palette"
            />
          )}
        </Pressable>
      </View>
      {notice && !error ? (
        <View
          accessibilityLiveRegion="polite"
          pointerEvents="none"
          style={{
            position: "absolute",
            left: spacing.md,
            right: spacing.md,
            top: spacing.sm,
            alignItems: "center",
          }}
        >
          <Animated.View
            style={{
              backgroundColor: colors.white,
              borderColor: colors.border,
              borderRadius: radius.md,
              borderWidth: componentSizes.borderWidth,
              maxWidth: "100%",
              opacity: entrance,
              paddingHorizontal: spacing.md,
              paddingVertical: spacing.sm,
              transform: [
                {
                  translateY: entrance.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-spacing.md, 0],
                  }),
                },
              ],
              ...designTokens.shadows.card,
            }}
          >
            <Text
              style={{
                color: colors.charcoal,
                fontFamily: getFontFamily("medium"),
                fontSize: typography.sizes.label,
              }}
            >
              {notice === "lime" ? "Lime mode enabled" : "Emerald mode enabled"}
            </Text>
          </Animated.View>
        </View>
      ) : null}
      {error ? (
        <Text
          accessibilityLiveRegion="polite"
          style={{
            backgroundColor: accentBackground ? colors.white : undefined,
            borderRadius: accentBackground ? radius.sm : undefined,
            color: colors.error,
            fontFamily: getFontFamily("regular"),
            fontSize: typography.sizes.label,
            padding: accentBackground ? spacing.sm : undefined,
          }}
        >
          {error}
        </Text>
      ) : null}
    </View>
  );
}

export function AppearanceFrame({
  children,
  accentBackground = false,
  showSwitch = true,
}: PropsWithChildren<{
  accentBackground?: boolean;
  showSwitch?: boolean;
}>): ReactElement {
  const { mode } = useAppearance();

  return (
    <SafeAreaProvider style={{ backgroundColor: colors.white, flex: 1 }}>
      <SafeAreaView
        edges={["top"]}
        style={{
          backgroundColor: accentBackground ? designTokens.appearance[mode].primary : colors.white,
          zIndex: 1,
        }}
      >
        {showSwitch ? <AppearanceSwitch accentBackground={accentBackground} /> : null}
      </SafeAreaView>
      <View style={{ flex: 1 }}>{children}</View>
    </SafeAreaProvider>
  );
}
