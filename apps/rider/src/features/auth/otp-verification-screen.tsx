import { useEffect, useRef, useState, type ReactElement } from "react";
import {
  ActivityIndicator,
  Pressable,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from "react-native";
import { getPhoneAuthErrorMessage, maskPhoneNumber, PhoneAuthError } from "@routely/auth";
import { designTokens, getFontFamily } from "@routely/design-tokens";
import { RoutelyButton } from "@routely/ui-mobile";
import { AuthInlineMessage, AuthScreenFrame } from "./auth-screen-frame";

const { colors, componentSizes, radius, spacing, typography } = designTokens;
const otpLength = 6;
const resendCooldownSeconds = 30;

interface OtpVerificationScreenProps {
  phone: string;
  configured: boolean;
  previewMode: boolean;
  onBack: () => void;
  onChangePhone: () => void;
  onVerify: (token: string) => Promise<void>;
  onResend: () => Promise<void>;
}

export function OtpVerificationScreen({
  phone,
  configured,
  previewMode,
  onBack,
  onChangePhone,
  onVerify,
  onResend,
}: OtpVerificationScreenProps): ReactElement {
  const { width } = useWindowDimensions();
  const [digits, setDigits] = useState<string[]>(() => Array(otpLength).fill(""));
  const [secondsLeft, setSecondsLeft] = useState(
    configured && !previewMode ? resendCooldownSeconds : 0,
  );
  const [pendingAction, setPendingAction] = useState<"verify" | "resend" | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [messageTone, setMessageTone] = useState<"error" | "notice" | "success">("error");
  const inputRefs = useRef<Array<TextInput | null>>([]);
  const requestInFlight = useRef(false);

  useEffect(() => {
    if (!configured || previewMode || secondsLeft <= 0) {
      return;
    }

    const timer = setInterval(() => {
      setSecondsLeft((remaining) => Math.max(remaining - 1, 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [configured, previewMode, secondsLeft]);

  const code = digits.join("");
  const isComplete = code.length === otpLength;
  const cellSize = Math.min(48, Math.max(36, (width - spacing.lg * 2 - spacing.sm * 5) / 6));

  function updateDigits(index: number, value: string): void {
    const numericValue = value.replace(/\D/g, "");
    if (numericValue.length > 1) {
      const pastedDigits = numericValue.slice(0, otpLength).split("");
      setDigits([...pastedDigits, ...Array(otpLength - pastedDigits.length).fill("")]);
      inputRefs.current[Math.min(pastedDigits.length, otpLength) - 1]?.focus();
      setMessage(null);
      return;
    }

    const nextDigits = [...digits];
    nextDigits[index] = numericValue;
    setDigits(nextDigits);
    setMessage(null);
    if (numericValue && index < otpLength - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  }

  async function handleVerify(): Promise<void> {
    if (!isComplete || pendingAction || requestInFlight.current || !configured || previewMode) {
      return;
    }

    requestInFlight.current = true;
    let submittedCode = code;
    setDigits(Array(otpLength).fill(""));
    setPendingAction("verify");
    setMessage(null);
    try {
      await onVerify(submittedCode);
      submittedCode = "";
    } catch (verificationError) {
      setMessageTone("error");
      setMessage(getPhoneAuthErrorMessage(verificationError));
      if (verificationError instanceof PhoneAuthError) {
        if (verificationError.kind === "expired_code") {
          setSecondsLeft(0);
        }
      }
    } finally {
      submittedCode = "";
      requestInFlight.current = false;
      setPendingAction(null);
      inputRefs.current[0]?.focus();
    }
  }

  async function handleResend(): Promise<void> {
    if (pendingAction || requestInFlight.current || secondsLeft > 0 || !configured || previewMode) {
      return;
    }

    requestInFlight.current = true;
    setPendingAction("resend");
    setMessage(null);
    try {
      await onResend();
      setSecondsLeft(resendCooldownSeconds);
      setMessageTone("success");
      setMessage("A new code has been sent.");
    } catch (resendError) {
      setMessageTone("error");
      setMessage(getPhoneAuthErrorMessage(resendError));
    } finally {
      requestInFlight.current = false;
      setPendingAction(null);
    }
  }

  return (
    <AuthScreenFrame
      description={
        previewMode
          ? `Code-entry preview for ${maskPhoneNumber(phone)}. No SMS was sent.`
          : configured
            ? `Enter the 6-digit code sent to ${maskPhoneNumber(phone)}.`
            : `Live SMS is not configured for ${maskPhoneNumber(phone)}. No code was sent.`
      }
      onBack={onBack}
      title="Check your phone."
    >
      <View
        style={{
          flexDirection: "row",
          gap: spacing.sm,
          justifyContent: "space-between",
          maxWidth: 360,
        }}
      >
        {digits.map((digit, index) => (
          <TextInput
            accessibilityLabel={`Code digit ${index + 1} of ${otpLength}`}
            autoComplete={index === 0 ? "sms-otp" : "off"}
            autoFocus={index === 0}
            key={index}
            keyboardType="number-pad"
            maxLength={otpLength}
            onChangeText={(value) => updateDigits(index, value)}
            onKeyPress={({ nativeEvent }) => {
              if (nativeEvent.key === "Backspace" && !digits[index] && index > 0) {
                inputRefs.current[index - 1]?.focus();
              }
            }}
            ref={(element) => {
              inputRefs.current[index] = element;
            }}
            returnKeyType={index === otpLength - 1 ? "done" : "next"}
            selectTextOnFocus
            style={{
              backgroundColor: colors.white,
              borderColor: messageTone === "error" && message ? colors.error : colors.border,
              borderRadius: radius.input,
              borderWidth: componentSizes.borderWidth,
              color: colors.charcoal,
              flex: 1,
              fontFamily: getFontFamily("semibold"),
              fontSize: typography.sizes.heading,
              fontWeight: typography.weights.semibold,
              height: componentSizes.buttonHeight,
              maxWidth: cellSize,
              minWidth: cellSize,
              padding: 0,
              textAlign: "center",
            }}
            textContentType={index === 0 ? "oneTimeCode" : "none"}
            value={digit}
          />
        ))}
      </View>

      {previewMode ? (
        <AuthInlineMessage tone="notice">
          Preview only. No SMS was sent, and verification is unavailable.
        </AuthInlineMessage>
      ) : null}
      {message ? <AuthInlineMessage tone={messageTone}>{message}</AuthInlineMessage> : null}
      {!configured && !previewMode ? (
        <AuthInlineMessage tone="notice">
          Live SMS verification is not configured. No code was sent.
        </AuthInlineMessage>
      ) : null}

      <View style={{ alignItems: "flex-start", marginTop: spacing.md }}>
        <Pressable
          accessibilityRole="button"
          disabled={pendingAction !== null}
          onPress={onChangePhone}
          style={{ justifyContent: "center", minHeight: componentSizes.touchTarget }}
        >
          <Text
            style={{
              color: colors.forest,
              fontFamily: getFontFamily("semibold"),
              fontSize: typography.sizes.label,
              fontWeight: typography.weights.semibold,
            }}
          >
            Change phone number
          </Text>
        </Pressable>
      </View>

      <View style={{ marginTop: spacing.md }}>
        <RoutelyButton
          disabled={!isComplete || pendingAction !== null || !configured || previewMode}
          fullWidth
          label={pendingAction === "verify" ? "Verifying…" : "Verify"}
          onPress={handleVerify}
        />
        {pendingAction ? (
          <ActivityIndicator
            accessibilityLabel={pendingAction === "verify" ? "Verifying code" : "Sending new code"}
            color={colors.forest}
            size="small"
            style={{ marginTop: spacing.md }}
          />
        ) : null}
      </View>

      {configured && !previewMode ? (
        <View style={{ alignItems: "center", marginTop: spacing.md }}>
          {secondsLeft > 0 ? (
            <Text
              style={{
                color: colors.muted,
                fontFamily: getFontFamily("regular"),
                fontSize: typography.sizes.label,
              }}
            >
              Resend code in 00:{String(secondsLeft).padStart(2, "0")}
            </Text>
          ) : (
            <Pressable
              accessibilityRole="button"
              disabled={pendingAction !== null}
              onPress={handleResend}
              style={{ justifyContent: "center", minHeight: componentSizes.touchTarget }}
            >
              <Text
                style={{
                  color: colors.forest,
                  fontFamily: getFontFamily("semibold"),
                  fontSize: typography.sizes.label,
                  fontWeight: typography.weights.semibold,
                }}
              >
                Resend code
              </Text>
            </Pressable>
          )}
        </View>
      ) : null}
    </AuthScreenFrame>
  );
}
