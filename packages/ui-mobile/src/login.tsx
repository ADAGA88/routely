import { useRef, useState, type PropsWithChildren, type ReactElement } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import googleSignIn from "@routely/brand-assets/google-signin-light.png";
import googleSignInIos from "@routely/brand-assets/google-signin-light-ios.png";
import { designTokens, getFontFamily } from "@routely/design-tokens";
import { RoutelyLogo } from "./brand";
import { RoutelyIcon } from "./icons";
import { PageContainer, RoutelyButton, RoutelyTextField } from "./primitives";
import { useAppearance } from "./appearance";

const { colors, componentSizes, radius, spacing, typography } = designTokens;

export interface LoginCountry {
  country: string;
  name: string;
  callingCode: string;
}

export interface LoginScreenProps {
  countries: readonly LoginCountry[];
  onBack: () => void;
  onCreateAccount?: () => void;
  onLogin: (
    identity: { phone: string; country: string } | { email: string },
    password: string,
  ) => Promise<void>;
  onGoogle: () => Promise<void>;
  onRecovery: (method: "phone" | "email", value: string, country: string) => Promise<string>;
  onPreviewLogin?: () => Promise<void>;
  previewOnly?: boolean;
}

type Sheet = "options" | "email" | "username" | "recovery" | "countries" | null;

const labelStyle = {
  color: colors.charcoal,
  fontFamily: getFontFamily("medium"),
  fontSize: typography.sizes.label,
  fontWeight: typography.weights.medium,
} as const;

function AlternativeLoginButton({
  accessibilityLabel,
  children,
  disabled,
  onPress,
}: PropsWithChildren<{
  accessibilityLabel: string;
  disabled: boolean;
  onPress: () => void;
}>): ReactElement {
  const [focused, setFocused] = useState(false);

  return (
    <Pressable
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      disabled={disabled}
      onBlur={() => setFocused(false)}
      onFocus={() => setFocused(true)}
      onPress={onPress}
      style={({ pressed }) => ({
        alignItems: "center",
        borderColor: focused ? colors.forest : "transparent",
        borderRadius: radius.pill,
        borderWidth: componentSizes.borderWidth,
        height: componentSizes.buttonHeight,
        justifyContent: "center",
        opacity: disabled ? 0.52 : pressed ? 0.8 : 1,
        width: componentSizes.buttonHeight,
      })}
    >
      {children}
    </Pressable>
  );
}

export function LoginScreen({
  countries,
  onBack,
  onCreateAccount,
  onLogin,
  onGoogle,
  onRecovery,
  onPreviewLogin,
  previewOnly = false,
}: LoginScreenProps): ReactElement {
  const { mode } = useAppearance();
  const [country, setCountry] = useState<LoginCountry>(countries[0]!);
  const [sheet, setSheet] = useState<Sheet>(null);
  const [previousSheet, setPreviousSheet] = useState<Sheet>(null);
  const [recoveryMethod, setRecoveryMethod] = useState<"phone" | "email">("phone");
  const [showPhonePassword, setShowPhonePassword] = useState(false);
  const [showEmailPassword, setShowEmailPassword] = useState(false);
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [notice, setNotice] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const previewAvailable =
    ((__DEV__ && Platform.OS === "web") || previewOnly) && onPreviewLogin !== undefined;
  const previewActive = previewAvailable && (previewOnly || previewMode);
  const phone = useRef("");
  const email = useRef("");
  const phonePassword = useRef("");
  const emailPassword = useRef("");
  const recovery = useRef("");
  const busy = useRef(false);

  function show(next: Sheet): void {
    if (sheet === "email" && next !== "countries") {
      email.current = "";
      emailPassword.current = "";
      setShowEmailPassword(false);
    }
    setMessage(null);
    setNotice(false);
    setSheet(next);
  }

  async function run(action: () => Promise<void>): Promise<void> {
    if (busy.current) return;
    busy.current = true;
    setPending(true);
    setMessage(null);
    setNotice(false);
    try {
      await action();
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Something went wrong. Please try again.",
      );
    } finally {
      busy.current = false;
      setPending(false);
    }
  }

  function openRecovery(method: "phone" | "email"): void {
    setPreviousSheet(sheet);
    setRecoveryMethod(method);
    recovery.current = "";
    show("recovery");
  }

  function passwordField(method: "phone" | "email"): ReactElement {
    const showPassword = method === "phone" ? showPhonePassword : showEmailPassword;
    const setShowPassword = method === "phone" ? setShowPhonePassword : setShowEmailPassword;
    const password = method === "phone" ? phonePassword : emailPassword;
    return (
      <View style={{ marginTop: spacing.md }}>
        <Text style={{ ...labelStyle, marginBottom: spacing.sm }}>Password</Text>
        <View
          style={{
            alignItems: "center",
            backgroundColor: colors.background,
            borderColor: colors.border,
            borderRadius: radius.input,
            borderWidth: 1,
            flexDirection: "row",
          }}
        >
          <TextInput
            accessibilityLabel="Password"
            autoCapitalize="none"
            autoComplete="current-password"
            onChangeText={(value) => {
              password.current = value;
            }}
            placeholder="Enter your password"
            placeholderTextColor={colors.muted}
            secureTextEntry={!showPassword}
            style={{
              color: colors.charcoal,
              flex: 1,
              fontFamily: getFontFamily("regular"),
              fontSize: typography.sizes.body,
              minHeight: componentSizes.buttonHeight,
              paddingHorizontal: spacing.md,
            }}
          />
          <Pressable
            accessibilityLabel={showPassword ? "Hide password" : "Show password"}
            accessibilityRole="button"
            onPress={() => setShowPassword(!showPassword)}
            style={{
              alignItems: "center",
              justifyContent: "center",
              minHeight: componentSizes.touchTarget,
              minWidth: componentSizes.touchTarget,
            }}
          >
            <RoutelyIcon name="eye" />
          </Pressable>
        </View>
      </View>
    );
  }

  function signIn(method: "phone" | "email"): void {
    void run(async () => {
      if (previewActive && onPreviewLogin) {
        phonePassword.current = "";
        emailPassword.current = "";
        await onPreviewLogin();
        return;
      }
      const identity =
        method === "phone"
          ? { phone: phone.current, country: country.country }
          : { email: email.current.trim() };
      const password = method === "phone" ? phonePassword : emailPassword;
      await onLogin(identity, password.current);
      password.current = "";
    });
  }

  function errorMessage(): ReactElement | null {
    return message ? (
      <Text
        accessibilityLiveRegion="polite"
        style={{
          color: notice ? colors.forest : colors.error,
          fontFamily: getFontFamily("medium"),
          lineHeight: typography.lineHeights.supporting,
          marginTop: spacing.md,
        }}
      >
        {message}
      </Text>
    ) : null;
  }

  function forgot(method: "phone" | "email"): ReactElement {
    return (
      <Pressable
        accessibilityRole="button"
        onPress={() => openRecovery(method)}
        style={{
          alignSelf: "flex-end",
          justifyContent: "center",
          minHeight: componentSizes.touchTarget,
        }}
      >
        <Text style={{ ...labelStyle, color: colors.forest }}>Forgot password?</Text>
      </Pressable>
    );
  }

  function choice(
    title: string,
    description: string,
    icon: "mail" | "user",
    next: Sheet,
  ): ReactElement {
    const accent = next === "email";
    const onDark = accent && mode === "emerald";
    return (
      <Pressable
        accessibilityRole="button"
        onPress={() => show(next)}
        style={({ pressed }) => ({
          alignItems: "center",
          backgroundColor: accent ? designTokens.appearance[mode].primary : colors.background,
          borderColor: colors.border,
          borderRadius: radius.card,
          borderWidth: 1,
          flexDirection: "row",
          marginTop: spacing.sm,
          minHeight: 80,
          opacity: pressed ? 0.8 : 1,
          padding: spacing.md,
        })}
      >
        <View
          style={{
            alignItems: "center",
            backgroundColor: colors.white,
            borderRadius: radius.iconContainer,
            height: 48,
            justifyContent: "center",
            width: 48,
          }}
        >
          <RoutelyIcon name={icon} />
        </View>
        <View style={{ flex: 1, marginLeft: spacing.md }}>
          <Text style={{ ...labelStyle, color: onDark ? colors.white : colors.charcoal }}>
            {title}
          </Text>
          <Text
            style={{
              color: onDark ? colors.white : accent ? colors.forest : colors.muted,
              fontFamily: getFontFamily("regular"),
              fontSize: typography.sizes.label,
              lineHeight: typography.lineHeights.supporting,
            }}
          >
            {description}
          </Text>
        </View>
        <RoutelyIcon color={onDark ? colors.white : colors.forest} name="chevronRight" />
      </Pressable>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ backgroundColor: colors.white, flex: 1 }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        <PageContainer maxWidth={520} style={{ flexGrow: 1, paddingBottom: spacing.xl }}>
          <View
            style={{
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "space-between",
              minHeight: componentSizes.headerHeight,
            }}
          >
            <Pressable
              accessibilityRole="button"
              onPress={onBack}
              style={{
                alignItems: "center",
                flexDirection: "row",
                gap: spacing.sm,
                minHeight: componentSizes.touchTarget,
              }}
            >
              <RoutelyIcon name="arrowLeft" />
              <Text style={labelStyle}>Back</Text>
            </Pressable>
            <RoutelyLogo width={112} />
          </View>
          <View style={{ flexGrow: 1, justifyContent: "center", paddingVertical: spacing.xl }}>
            <Text
              accessibilityRole="header"
              style={{
                color: colors.charcoal,
                fontFamily: getFontFamily("bold"),
                fontSize: typography.sizes.heading,
                lineHeight: typography.lineHeights.heading,
              }}
            >
              Welcome back.
            </Text>
            <Text
              style={{
                color: colors.muted,
                fontFamily: getFontFamily("regular"),
                fontSize: typography.sizes.body,
                lineHeight: typography.lineHeights.body,
                marginTop: spacing.sm,
              }}
            >
              {previewOnly
                ? "Demo preview only. No account or real sign-in."
                : "Sign in to continue with Routely."}
            </Text>
            {previewAvailable ? (
              <Pressable
                accessibilityRole="switch"
                accessibilityState={{ checked: previewActive }}
                disabled={previewOnly}
                onPress={() => {
                  setPreviewMode((current) => !current);
                  setMessage(null);
                }}
                style={{
                  backgroundColor: colors.container,
                  borderColor: colors.border,
                  borderRadius: radius.card,
                  borderWidth: 1,
                  marginTop: spacing.lg,
                  padding: spacing.md,
                }}
              >
                <Text style={{ ...labelStyle, color: colors.forest }}>
                  {previewOnly
                    ? "Demo test mode"
                    : `Test mode: ${previewActive ? "On" : "Off"} · Tap to change`}
                </Text>
                <Text
                  style={{
                    color: colors.muted,
                    fontFamily: getFontFamily("regular"),
                    fontSize: typography.sizes.label,
                    lineHeight: typography.lineHeights.supporting,
                    marginTop: spacing.xs,
                  }}
                >
                  Development preview only. Any details work; no sign-in or account is created. Do
                  not enter real credentials.
                </Text>
              </Pressable>
            ) : null}
            <View style={{ marginTop: spacing.xl }}>
              <Text style={{ ...labelStyle, marginBottom: spacing.sm }}>Phone number</Text>
              <View
                style={{
                  alignItems: "center",
                  backgroundColor: colors.background,
                  borderColor: colors.border,
                  borderRadius: radius.input,
                  borderWidth: 1,
                  flexDirection: "row",
                }}
              >
                <Pressable
                  accessibilityLabel={`Country code ${country.name} ${country.callingCode}`}
                  accessibilityRole="button"
                  onPress={() => {
                    setPreviousSheet(null);
                    show("countries");
                  }}
                  style={{
                    alignItems: "center",
                    flexDirection: "row",
                    gap: spacing.xs,
                    minHeight: componentSizes.buttonHeight,
                    paddingHorizontal: spacing.md,
                  }}
                >
                  <Text style={labelStyle}>{country.callingCode}</Text>
                  <RoutelyIcon name="chevronRight" size={componentSizes.iconSmall} />
                </Pressable>
                <TextInput
                  accessibilityLabel="Phone number"
                  autoComplete="tel"
                  keyboardType="phone-pad"
                  onChangeText={(value) => {
                    phone.current = value;
                  }}
                  placeholder="801 234 5678"
                  placeholderTextColor={colors.muted}
                  style={{
                    color: colors.charcoal,
                    flex: 1,
                    fontFamily: getFontFamily("regular"),
                    fontSize: typography.sizes.body,
                    minHeight: componentSizes.buttonHeight,
                    paddingHorizontal: spacing.md,
                  }}
                />
              </View>
              {passwordField("phone")}
              {!previewOnly ? forgot("phone") : null}
              {!sheet ? errorMessage() : null}
              <RoutelyButton
                disabled={pending}
                fullWidth
                label={pending ? "Please wait..." : previewActive ? "Test log in" : "Log in"}
                onPress={() => signIn("phone")}
                trailingIcon="arrowRight"
              />
              {!previewOnly ? (
                <View
                  style={{
                    alignItems: "center",
                    flexDirection: "row",
                    gap: spacing.md,
                    marginVertical: spacing.lg,
                  }}
                >
                  <View style={{ backgroundColor: colors.border, flex: 1, height: 1 }} />
                  <Text
                    style={{
                      color: colors.muted,
                      fontFamily: getFontFamily("regular"),
                      fontSize: typography.sizes.label,
                    }}
                  >
                    Or continue with
                  </Text>
                  <View style={{ backgroundColor: colors.border, flex: 1, height: 1 }} />
                </View>
              ) : null}
              <View
                style={{
                  alignItems: "center",
                  flexDirection: "row",
                  gap: spacing.md,
                  justifyContent: "center",
                }}
              >
                {!previewOnly ? (
                  <AlternativeLoginButton
                    accessibilityLabel="Continue with Google"
                    disabled={pending}
                    onPress={() => void run(onGoogle)}
                  >
                    <Image
                      accessible={false}
                      resizeMode="contain"
                      source={Platform.OS === "ios" ? googleSignInIos : googleSignIn}
                      style={{
                        height: Platform.OS === "ios" ? componentSizes.touchTarget : 40,
                        width: Platform.OS === "ios" ? componentSizes.touchTarget : 40,
                      }}
                    />
                  </AlternativeLoginButton>
                ) : null}
                <AlternativeLoginButton
                  accessibilityLabel="More login options"
                  disabled={pending}
                  onPress={() => show("options")}
                >
                  <View
                    style={{
                      alignItems: "center",
                      backgroundColor: colors.white,
                      borderColor: colors.border,
                      borderRadius: radius.pill,
                      borderWidth: componentSizes.borderWidth,
                      height: Platform.OS === "ios" ? componentSizes.touchTarget : 40,
                      justifyContent: "center",
                      width: Platform.OS === "ios" ? componentSizes.touchTarget : 40,
                    }}
                  >
                    <RoutelyIcon name="ellipsis" size={componentSizes.iconLarge} />
                  </View>
                </AlternativeLoginButton>
              </View>
              {onCreateAccount ? (
                <Pressable
                  accessibilityRole="button"
                  disabled={pending}
                  onPress={onCreateAccount}
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: spacing.md,
                    minHeight: componentSizes.touchTarget,
                  }}
                >
                  <Text style={{ ...labelStyle, color: colors.forest }}>Create an account</Text>
                </Pressable>
              ) : null}
            </View>
          </View>
        </PageContainer>
      </ScrollView>
      <Modal
        animationType="slide"
        onRequestClose={() => show(null)}
        transparent
        visible={sheet !== null}
      >
        <View
          style={{
            backgroundColor: `${colors.charcoal}66`,
            flex: 1,
            justifyContent: "center",
            padding: spacing.lg,
          }}
        >
          <View
            accessibilityViewIsModal
            style={{
              alignSelf: "center",
              backgroundColor: colors.white,
              borderRadius: radius.panel,
              maxHeight: "90%",
              maxWidth: 480,
              padding: spacing.lg,
              width: "100%",
            }}
          >
            <ScrollView keyboardShouldPersistTaps="handled">
              <View
                style={{
                  alignItems: "center",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Pressable
                  accessibilityRole="button"
                  onPress={() =>
                    show(
                      sheet === "options"
                        ? null
                        : sheet === "countries" || sheet === "recovery"
                          ? previousSheet
                          : "options",
                    )
                  }
                  style={{ minHeight: componentSizes.touchTarget, justifyContent: "center" }}
                >
                  <Text style={{ ...labelStyle, color: colors.forest }}>
                    {sheet === "options" ? "Close" : "Back"}
                  </Text>
                </Pressable>
                <Pressable
                  accessibilityLabel="Close login options"
                  accessibilityRole="button"
                  onPress={() => show(null)}
                  style={{ minHeight: componentSizes.touchTarget, justifyContent: "center" }}
                >
                  <Text style={labelStyle}>Close</Text>
                </Pressable>
              </View>
              {sheet === "options" ? (
                <>
                  <Text
                    accessibilityRole="header"
                    style={{ ...labelStyle, fontSize: typography.sizes.sectionHeading }}
                  >
                    More login options
                  </Text>
                  {choice("Email address", "Use your email and password.", "mail", "email")}
                  {choice("Username", "Use your username and password.", "user", "username")}
                </>
              ) : null}
              {sheet === "username" ? (
                <>
                  <Text
                    accessibilityRole="header"
                    style={{ ...labelStyle, fontSize: typography.sizes.sectionHeading }}
                  >
                    Username login
                  </Text>
                  <Text
                    style={{
                      color: colors.muted,
                      fontFamily: getFontFamily("regular"),
                      lineHeight: typography.lineHeights.body,
                      marginTop: spacing.md,
                    }}
                  >
                    Username login is not connected yet. Please use another login method.
                  </Text>
                </>
              ) : null}
              {sheet === "email" ? (
                <>
                  <Text
                    accessibilityRole="header"
                    style={{
                      ...labelStyle,
                      fontSize: typography.sizes.sectionHeading,
                      marginBottom: spacing.lg,
                    }}
                  >
                    Email login
                  </Text>
                  {previewActive ? (
                    <Text
                      style={{
                        color: colors.forest,
                        fontFamily: getFontFamily("medium"),
                        fontSize: typography.sizes.label,
                        marginBottom: spacing.md,
                      }}
                    >
                      Test mode: no sign-in. Do not enter real credentials.
                    </Text>
                  ) : null}
                  <RoutelyTextField
                    label="Email address"
                    autoCapitalize="none"
                    autoComplete="email"
                    keyboardType="email-address"
                    onChangeText={(value) => {
                      email.current = value;
                    }}
                  />
                  {passwordField("email")}
                  {!previewOnly ? forgot("email") : null}
                  {errorMessage()}
                  <RoutelyButton
                    disabled={pending}
                    fullWidth
                    label={pending ? "Please wait..." : previewActive ? "Test log in" : "Log in"}
                    onPress={() => signIn("email")}
                    trailingIcon="arrowRight"
                  />
                </>
              ) : null}
              {sheet === "countries" ? (
                <>
                  <Text
                    accessibilityRole="header"
                    style={{ ...labelStyle, fontSize: typography.sizes.sectionHeading }}
                  >
                    Select country
                  </Text>
                  {countries.map((option) => (
                    <Pressable
                      accessibilityRole="button"
                      accessibilityState={{ selected: option.country === country.country }}
                      key={option.country}
                      onPress={() => {
                        setCountry(option);
                        show(previousSheet);
                      }}
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        minHeight: componentSizes.buttonHeight,
                        paddingTop: spacing.md,
                      }}
                    >
                      <Text style={labelStyle}>{option.name}</Text>
                      <Text style={labelStyle}>{option.callingCode}</Text>
                    </Pressable>
                  ))}
                </>
              ) : null}
              {sheet === "recovery" ? (
                <>
                  <Text
                    accessibilityRole="header"
                    style={{ ...labelStyle, fontSize: typography.sizes.sectionHeading }}
                  >
                    Reset your password
                  </Text>
                  <Text
                    style={{
                      color: colors.muted,
                      fontFamily: getFontFamily("regular"),
                      lineHeight: typography.lineHeights.body,
                      marginVertical: spacing.md,
                    }}
                  >
                    Choose a verified contact method for recovery.
                  </Text>
                  <View style={{ flexDirection: "row", gap: spacing.sm, marginBottom: spacing.md }}>
                    <RoutelyButton
                      label="Phone"
                      onPress={() => {
                        recovery.current = "";
                        setMessage(null);
                        setRecoveryMethod("phone");
                      }}
                      variant="secondary"
                    />
                    <RoutelyButton
                      label="Email"
                      onPress={() => {
                        recovery.current = "";
                        setMessage(null);
                        setRecoveryMethod("email");
                      }}
                      variant="secondary"
                    />
                  </View>
                  <RoutelyTextField
                    key={recoveryMethod}
                    label={
                      recoveryMethod === "email"
                        ? "Email address"
                        : `Phone number (${country.callingCode})`
                    }
                    autoCapitalize="none"
                    keyboardType={recoveryMethod === "email" ? "email-address" : "phone-pad"}
                    onChangeText={(value) => {
                      recovery.current = value;
                    }}
                  />
                  {errorMessage()}
                  <View style={{ marginTop: spacing.lg }}>
                    <RoutelyButton
                      disabled={pending}
                      fullWidth
                      label={pending ? "Please wait..." : "Continue"}
                      onPress={() =>
                        void run(async () => {
                          const result = await onRecovery(
                            recoveryMethod,
                            recovery.current.trim(),
                            country.country,
                          );
                          setMessage(result);
                          setNotice(true);
                        })
                      }
                    />
                  </View>
                </>
              ) : null}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}
