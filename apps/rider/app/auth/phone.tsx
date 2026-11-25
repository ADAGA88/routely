import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { PhoneAuthError, requestPhoneOtp } from "@routely/auth";
import { useRouter } from "expo-router";
import { designTokens, getFontFamily } from "@routely/design-tokens";
import { RoutelyButton } from "@routely/ui-mobile";
import { PhoneEntryScreen } from "../../src/features/auth/phone-entry-screen";
import { AuthInlineMessage, AuthScreenFrame } from "../../src/features/auth/auth-screen-frame";
import { isAuthPreviewEnabled, isPhoneAuthConfigured, supabase } from "../../src/auth/client";
import { setPendingPhone } from "../../src/auth/pending-phone";

const { colors, spacing, typography } = designTokens;

export default function RiderPhoneEntryRoute() {
  const router = useRouter();
  const [restoringSession, setRestoringSession] = useState(Boolean(supabase));
  const [restoreError, setRestoreError] = useState(false);

  const restoreSession = useCallback(async () => {
    setRestoreError(false);
    if (!supabase) {
      setRestoringSession(false);
      return;
    }

    setRestoringSession(true);
    try {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        throw error;
      }
      if (data.session) {
        router.replace("/auth/account-status");
        return;
      }
      setRestoringSession(false);
    } catch {
      setRestoreError(true);
      setRestoringSession(false);
    }
  }, [router]);

  useEffect(() => {
    void restoreSession();
  }, [restoreSession]);

  function goBack(): void {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/");
    }
  }

  async function sendOtp(phone: string): Promise<void> {
    if (!supabase) {
      throw new PhoneAuthError(
        "not_configured",
        "Live phone verification is not configured. No SMS was sent.",
      );
    }

    await requestPhoneOtp(supabase, phone);
    setPendingPhone(phone);
    router.push("/auth/verify");
  }

  function openPreview(phone: string): void {
    if (!isAuthPreviewEnabled || isPhoneAuthConfigured) {
      return;
    }
    setPendingPhone(phone);
    router.push({ pathname: "/auth/verify", params: { preview: "true" } });
  }

  if (restoringSession) {
    return (
      <AuthScreenFrame
        description="Restoring your saved sign-in."
        onBack={goBack}
        title="Checking your account."
      >
        <ActivityIndicator accessibilityLabel="Restoring sign-in" color={colors.forest} />
      </AuthScreenFrame>
    );
  }

  if (restoreError) {
    return (
      <AuthScreenFrame
        description="We couldn't restore your saved sign-in."
        onBack={goBack}
        title="Could not restore session."
      >
        <AuthInlineMessage>Retry before continuing to phone verification.</AuthInlineMessage>
        <View style={{ marginTop: spacing.lg }}>
          <RoutelyButton fullWidth label="Try again" onPress={() => void restoreSession()} />
        </View>
        <Text
          style={{
            color: colors.muted,
            fontFamily: getFontFamily("regular"),
            fontSize: typography.sizes.label,
            marginTop: spacing.md,
            textAlign: "center",
          }}
        >
          Phone verification does not grant rider approval.
        </Text>
      </AuthScreenFrame>
    );
  }

  return (
    <PhoneEntryScreen
      configured={isPhoneAuthConfigured}
      onBack={goBack}
      onPreviewBikePreferences={() => router.push("/bike-preferences")}
      onPreviewOtp={openPreview}
      onRequestOtp={sendOtp}
      previewEnabled={isAuthPreviewEnabled}
    />
  );
}
