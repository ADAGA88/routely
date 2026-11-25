import { createClient, type SupabaseClient, type SupportedStorage } from "@supabase/supabase-js";
import { parsePhoneNumberFromString, type CountryCode, type PhoneNumber } from "libphonenumber-js";

export type PhoneAuthErrorKind =
  | "invalid_phone"
  | "invalid_code"
  | "expired_code"
  | "too_many_attempts"
  | "network"
  | "not_configured"
  | "unknown";

export type PhoneAuthStorage = SupportedStorage;

export class PasswordAuthError extends Error {
  constructor(
    readonly kind: "invalid_input" | "credentials" | "network" | "rate_limit" | "unknown",
    message: string,
  ) {
    super(message);
    this.name = "PasswordAuthError";
  }
}

export async function signInWithPassword(
  client: SupabaseClient,
  identity: { phone: string } | { email: string },
  password: string,
): Promise<void> {
  if (!password) {
    throw new PasswordAuthError("invalid_input", "Enter your password.");
  }
  if ("phone" in identity && !parseValidE164PhoneNumber(identity.phone)) {
    throw new PasswordAuthError("invalid_input", "Enter a valid phone number.");
  }
  if ("email" in identity && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identity.email)) {
    throw new PasswordAuthError("invalid_input", "Enter a valid email address.");
  }

  try {
    const { data, error } = await client.auth.signInWithPassword({ ...identity, password });
    if (error) {
      if (error.status === 429) {
        throw new PasswordAuthError("rate_limit", "Too many attempts. Wait and try again.");
      }
      if (error.status === 400 || error.status === 401) {
        throw new PasswordAuthError(
          "credentials",
          "Unable to sign in. Check your details and try again.",
        );
      }
      if (!error.status || error.status >= 500) {
        throw new PasswordAuthError(
          "network",
          "Unable to connect. Check your connection and try again.",
        );
      }
      throw new PasswordAuthError("unknown", "Unable to sign in. Please try again.");
    }
    if (!data.session) {
      throw new PasswordAuthError("unknown", "Sign-in could not be completed. Please try again.");
    }
  } catch (error) {
    if (error instanceof PasswordAuthError) {
      throw error;
    }
    if (
      error instanceof TypeError ||
      (error instanceof Error && /network|fetch/i.test(error.message))
    ) {
      throw new PasswordAuthError(
        "network",
        "Unable to connect. Check your connection and try again.",
      );
    }
    throw new PasswordAuthError("unknown", "Unable to sign in. Please try again.");
  }
}

export class PhoneAuthError extends Error {
  readonly kind: PhoneAuthErrorKind;

  constructor(kind: PhoneAuthErrorKind, message: string) {
    super(message);
    this.name = "PhoneAuthError";
    this.kind = kind;
  }
}

export interface PhoneCountry {
  country: CountryCode;
  name: string;
  callingCode: string;
}

export const phoneCountries: readonly PhoneCountry[] = [
  { country: "NG", name: "Nigeria", callingCode: "+234" },
  { country: "GH", name: "Ghana", callingCode: "+233" },
  { country: "KE", name: "Kenya", callingCode: "+254" },
  { country: "GB", name: "United Kingdom", callingCode: "+44" },
  { country: "US", name: "United States", callingCode: "+1" },
];

export function normalizePhoneNumber(
  input: string,
  defaultCountry: CountryCode = "NG",
): string | null {
  const phone = parsePhoneNumberFromString(input.trim(), defaultCountry);
  return phone?.isValid() ? phone.number : null;
}

export function parseValidE164PhoneNumber(input: string): PhoneNumber | null {
  const phone = parsePhoneNumberFromString(input);
  return phone?.isValid() && phone.number === input ? phone : null;
}

export function maskPhoneNumber(phone: string): string {
  const parsed = parseValidE164PhoneNumber(phone);
  if (!parsed) {
    throw new PhoneAuthError("invalid_phone", "Enter a valid phone number to continue.");
  }

  const digits = parsed.nationalNumber;
  const visibleDigits = digits.slice(-4);
  const hiddenCount = Math.max(digits.length - visibleDigits.length, 4);

  return `+${parsed.countryCallingCode} ${"•".repeat(hiddenCount)} ${visibleDigits}`;
}

export function createRoutelyAuthClient(
  url: string,
  anonKey: string,
  storage?: SupportedStorage,
): SupabaseClient {
  if (!url.trim() || !anonKey.trim()) {
    throw new PhoneAuthError(
      "not_configured",
      "Live phone verification is not configured. No SMS was sent.",
    );
  }

  return createClient(url, anonKey, {
    auth: {
      autoRefreshToken: true,
      detectSessionInUrl: true,
      persistSession: true,
      ...(storage ? { storage } : {}),
    },
  });
}

export async function requestPhoneOtp(client: SupabaseClient, phone: string): Promise<void> {
  const validPhone = parseValidE164PhoneNumber(phone);
  if (!validPhone) {
    throw new PhoneAuthError("invalid_phone", "Enter a valid phone number.");
  }

  const { error } = await client.auth.signInWithOtp({ phone: validPhone.number });
  if (error) {
    throw toPhoneAuthError(error);
  }
}

export async function resendPhoneOtp(client: SupabaseClient, phone: string): Promise<void> {
  const validPhone = parseValidE164PhoneNumber(phone);
  if (!validPhone) {
    throw new PhoneAuthError("invalid_phone", "Enter a valid phone number.");
  }

  const { error } = await client.auth.resend({ phone: validPhone.number, type: "sms" });
  if (error) {
    throw toPhoneAuthError(error);
  }
}

export async function verifyPhoneOtp(
  client: SupabaseClient,
  phone: string,
  token: string,
): Promise<void> {
  const validPhone = parseValidE164PhoneNumber(phone);
  if (!validPhone) {
    throw new PhoneAuthError("invalid_phone", "Enter a valid phone number.");
  }
  if (!/^\d{6}$/.test(token)) {
    throw new PhoneAuthError("invalid_code", "Enter the 6-digit code.");
  }

  const { data, error } = await client.auth.verifyOtp({
    phone: validPhone.number,
    token,
    type: "sms",
  });
  if (error) {
    throw toPhoneAuthError(error);
  }
  if (!data.session) {
    throw new PhoneAuthError(
      "unknown",
      "Your phone was verified, but a session could not be established. Try again.",
    );
  }
}

export function getPhoneAuthErrorMessage(error: unknown): string {
  if (error instanceof PhoneAuthError) {
    return error.message;
  }
  if (
    error instanceof TypeError ||
    (error instanceof Error && /network|fetch/i.test(error.message))
  ) {
    return "Connection problem. Check your internet and try again.";
  }
  return "We couldn't complete that request. Try again.";
}

function toPhoneAuthError(error: {
  code?: string;
  message: string;
  status?: number;
}): PhoneAuthError {
  const searchable = `${error.code ?? ""} ${error.message}`.toLowerCase();

  if (
    error.status === 429 ||
    /rate.limit|too many|over_.*rate|too many attempts/.test(searchable)
  ) {
    return new PhoneAuthError(
      "too_many_attempts",
      "Too many attempts. Wait a moment before trying again.",
    );
  }
  if (/expired|otp_expired/.test(searchable)) {
    return new PhoneAuthError("expired_code", "That code has expired. Request a new one.");
  }
  if (/sms provider|provider.*not configured|phone.*not enabled/.test(searchable)) {
    return new PhoneAuthError(
      "not_configured",
      "SMS delivery isn't configured for this project. No code was sent.",
    );
  }
  if (/invalid.*(otp|token)|otp.*invalid|token.*invalid/.test(searchable)) {
    return new PhoneAuthError("invalid_code", "That code doesn't match. Check it and try again.");
  }
  if (/fetch|network|timeout/.test(searchable)) {
    return new PhoneAuthError("network", "Connection problem. Check your internet and try again.");
  }
  return new PhoneAuthError("unknown", "We couldn't complete that request. Try again.");
}
