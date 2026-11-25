import { useCallback, useEffect, useState } from "react";
import { Platform } from "react-native";
import { normalizePhoneNumber, phoneCountries, signInWithPassword } from "@routely/auth";
import { AppShell, LoginScreen, RoutelyButton } from "@routely/ui-mobile";
import { useRouter } from "expo-router";
import { supabase } from "../src/auth/client";
import { AuthScreenFrame } from "../src/features/auth/auth-screen-frame";

export default function LoginRoute() {
  const router = useRouter();
  const [restoring, setRestoring] = useState(Boolean(supabase));
  const [restoreError, setRestoreError] = useState(false);

  const restore = useCallback(async () => {
    if (!supabase) {
      setRestoring(false);
      return;
    }
    setRestoring(true);
    setRestoreError(false);
    try {
      const { data, error } = await supabase.auth.getSession();
      if (error) throw error;
      if (data.session) {
        router.replace("/auth/account-status");
        return;
      }
    } catch {
      setRestoreError(true);
    }
    setRestoring(false);
  }, [router]);

  useEffect(() => {
    void restore();
  }, [restore]);

  if (restoring) return <AppShell appName="Routely Rider" description="" status="loading" />;
  if (restoreError) {
    return (
      <AuthScreenFrame
        title="Could not restore session."
        description="Check your connection and try again."
        onBack={() => router.replace("/")}
      >
        <RoutelyButton fullWidth label="Try again" onPress={() => void restore()} />
      </AuthScreenFrame>
    );
  }

  return (
    <LoginScreen
      countries={phoneCountries}
      onBack={() => (router.canGoBack() ? router.back() : router.replace("/"))}
      onCreateAccount={() => router.push("/auth/phone")}
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
        router.replace("/auth/account-status");
      }}
      onGoogle={async () => {
        if (!supabase || Platform.OS !== "web") {
          throw new Error("Google sign-in requires provider and app configuration.");
        }
        const { error } = await supabase.auth.signInWithOAuth({
          provider: "google",
          options: { redirectTo: `${window.location.origin}/login` },
        });
        if (error)
          throw new Error(
            "Google sign-in is unavailable. Check provider configuration and try again.",
          );
      }}
      onRecovery={async () => {
        throw new Error("Password recovery is not configured yet. Contact support.");
      }}
    />
  );
}
