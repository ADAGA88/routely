import { useCallback, useEffect, useState } from "react";
import { Platform, Text, View } from "react-native";
import { Redirect, useLocalSearchParams, useRouter } from "expo-router";
import { normalizePhoneNumber, phoneCountries, signInWithPassword } from "@routely/auth";
import { designTokens, getFontFamily } from "@routely/design-tokens";
import {
  AppShell,
  LoginScreen,
  PageContainer,
  RoutelyButton,
  RoutelyLogo,
} from "@routely/ui-mobile";
import { supabase } from "../../src/features/auth/client";
import { useEntryPreferences } from "../../src/features/first-launch/entry-context";
import {
  isDashboardPreviewAvailable,
  isPublicExperience,
  openDashboardPreview,
} from "../../src/features/first-launch/experience";
import { GeneralIntroScreen } from "../../src/features/first-launch/general-intro-screen";
import { isGeneralIntroReminderDue } from "../../src/features/first-launch/storage";
import { isDemoApk } from "../../src/features/first-launch/demo";

const { colors, spacing, typography } = designTokens;

export default function EntryLoginRoute() {
  const router = useRouter();
  const { role } = useLocalSearchParams<{ role: string }>();
  const { preferences } = useEntryPreferences();
  const [status, setStatus] = useState<"checking" | "ready" | "signed-in" | "error">(
    supabase ? "checking" : "ready",
  );
  const [statusError, setStatusError] = useState<string>();

  const restore = useCallback(async () => {
    if (!supabase) {
      setStatus("ready");
      return;
    }
    setStatus("checking");
    setStatusError(undefined);
    try {
      const { data, error } = await supabase.auth.getSession();
      if (error) throw error;
      setStatus(data.session ? "signed-in" : "ready");
    } catch {
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    void restore();
  }, [restore]);

  if (!isPublicExperience(role)) return <Redirect href="/select-experience" />;

  if (status === "checking") {
    return <AppShell appName="Routely" description="" status="loading" />;
  }

  if (
    status === "signed-in" &&
    (preferences.generalIntroCompletedAt === null ||
      isGeneralIntroReminderDue(preferences.generalIntroCompletedAt, Date.now()))
  ) {
    return <GeneralIntroScreen />;
  }

  if (status === "error" || status === "signed-in") {
    return (
      <View style={{ backgroundColor: colors.white, flex: 1, justifyContent: "center" }}>
        <PageContainer maxWidth={480}>
          <RoutelyLogo width={156} />
          <Text
            accessibilityRole="header"
            style={{
              color: colors.charcoal,
              fontFamily: getFontFamily("bold"),
              fontSize: typography.sizes.heading,
              lineHeight: typography.lineHeights.heading,
              marginTop: spacing.xl,
            }}
          >
            {status === "error" ? "Could not restore session." : "Account status"}
          </Text>
          <Text
            style={{
              color: colors.charcoal,
              fontFamily: getFontFamily("regular"),
              fontSize: typography.sizes.body,
              lineHeight: typography.lineHeights.body,
              marginVertical: spacing.lg,
            }}
          >
            {status === "error"
              ? "Check your connection and try again."
              : "Account and role checks are not configured yet. Access remains unavailable."}
          </Text>
          {statusError ? (
            <Text
              accessibilityLiveRegion="polite"
              style={{ color: colors.error, marginBottom: spacing.md }}
            >
              {statusError}
            </Text>
          ) : null}
          <RoutelyButton
            fullWidth
            label={status === "error" ? "Try again" : "Sign out"}
            onPress={() => {
              if (status === "error") {
                void restore();
              } else if (supabase) {
                setStatusError(undefined);
                void supabase.auth
                  .signOut()
                  .then(({ error }) => {
                    if (error) {
                      setStatusError("Could not sign out. Check your connection and try again.");
                    } else {
                      setStatus("ready");
                    }
                  })
                  .catch(() =>
                    setStatusError("Could not sign out. Check your connection and try again."),
                  );
              }
            }}
          />
        </PageContainer>
      </View>
    );
  }

  return (
    <LoginScreen
      countries={phoneCountries}
      onBack={() => (router.canGoBack() ? router.back() : router.replace("/select-experience"))}
      onCreateAccount={() => {
        router.push({
          pathname: preferences.completedIntroExperiences.includes(role)
            ? "/access/[role]"
            : "/welcome/[role]",
          params: { role },
        });
      }}
      onLogin={async (identity, password) => {
        if (!supabase) throw new Error("Sign-in is not configured. Please contact support.");
        if ("phone" in identity) {
          const country = phoneCountries.find((item) => item.country === identity.country);
          if (!country) throw new Error("Choose a valid country.");
          const phone = normalizePhoneNumber(identity.phone, country.country);
          if (!phone) throw new Error("Enter a valid phone number.");
          await signInWithPassword(supabase, { phone }, password);
        } else {
          await signInWithPassword(supabase, { email: identity.email }, password);
        }
        setStatus("signed-in");
      }}
      onPreviewLogin={
        isDemoApk
          ? async () => router.push({ pathname: "/demo/[role]", params: { role } })
          : isDashboardPreviewAvailable
            ? async () => openDashboardPreview(role)
            : undefined
      }
      previewOnly={isDemoApk}
      onGoogle={async () => {
        if (!supabase || Platform.OS !== "web") {
          throw new Error("Google sign-in requires provider and app configuration.");
        }
        const { error } = await supabase.auth.signInWithOAuth({
          provider: "google",
          options: { redirectTo: `${window.location.origin}/login/${role}` },
        });
        if (error) {
          throw new Error(
            "Google sign-in is unavailable. Check provider configuration and try again.",
          );
        }
      }}
      onRecovery={async () => {
        throw new Error("Password recovery is not configured yet. Contact support.");
      }}
    />
  );
}
