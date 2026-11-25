import { useEffect } from "react";
import { AppShell } from "@routely/ui-mobile";
import { useLocalSearchParams, useRouter } from "expo-router";
import { PhoneAuthError, resendPhoneOtp, verifyPhoneOtp } from "@routely/auth";
import { isAuthPreviewEnabled, isPhoneAuthConfigured, supabase } from "../../src/auth/client";
import { clearPendingPhone, getPendingPhone } from "../../src/auth/pending-phone";
import { OtpVerificationScreen } from "../../src/features/auth/otp-verification-screen";

export default function RiderVerifyRoute() {
  const router = useRouter();
  const { preview } = useLocalSearchParams<{ preview?: string }>();
  const phone = getPendingPhone();
  const previewMode = isAuthPreviewEnabled && preview === "true" && !isPhoneAuthConfigured;

  useEffect(() => {
    if (!phone) {
      router.replace("/auth/phone");
    }
  }, [phone, router]);

  if (!phone) {
    return <AppShell appName="Routely Rider" description="" status="loading" />;
  }
  const activePhone = phone;

  function goBack(): void {
    router.back();
  }

  function changePhone(): void {
    clearPendingPhone();
    router.back();
  }

  async function verifyCode(token: string): Promise<void> {
    if (!supabase || previewMode) {
      throw new PhoneAuthError(
        "not_configured",
        "Verification is unavailable in preview mode. No authentication was performed.",
      );
    }

    await verifyPhoneOtp(supabase, activePhone, token);
    clearPendingPhone();
    router.replace("/auth/account-status");
  }

  async function resendCode(): Promise<void> {
    if (!supabase || previewMode) {
      throw new PhoneAuthError(
        "not_configured",
        "Resending is unavailable in preview mode. No SMS was sent.",
      );
    }

    await resendPhoneOtp(supabase, activePhone);
  }

  return (
    <OtpVerificationScreen
      configured={isPhoneAuthConfigured}
      onBack={goBack}
      onChangePhone={changePhone}
      onResend={resendCode}
      onVerify={verifyCode}
      phone={activePhone}
      previewMode={previewMode}
    />
  );
}
