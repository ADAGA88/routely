import { useRef, useState, type ReactElement } from "react";
import {
  ActivityIndicator,
  Modal,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { normalizePhoneNumber, phoneCountries, type PhoneCountry } from "@routely/auth";
import { designTokens, getFontFamily } from "@routely/design-tokens";
import { RoutelyButton, RoutelyIcon } from "@routely/ui-mobile";
import { AuthInlineMessage, AuthScreenFrame } from "./auth-screen-frame";

const { colors, componentSizes, radius, spacing, typography } = designTokens;

interface PhoneEntryScreenProps {
  configured: boolean;
  previewEnabled: boolean;
  onBack: () => void;
  onPreviewBikePreferences: () => void;
  onRequestOtp: (phone: string) => Promise<void>;
  onPreviewOtp: (phone: string) => void;
}

export function PhoneEntryScreen({
  configured,
  previewEnabled,
  onBack,
  onPreviewBikePreferences,
  onRequestOtp,
  onPreviewOtp,
}: PhoneEntryScreenProps): ReactElement {
  const [country, setCountry] = useState<PhoneCountry>(phoneCountries[0]!);
  const [countryPickerVisible, setCountryPickerVisible] = useState(false);
  const [phoneInput, setPhoneInput] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const requestInFlight = useRef(false);

  const normalizedPhone = normalizePhoneNumber(phoneInput, country.country);

  async function handleContinue(): Promise<void> {
    if (requestInFlight.current) {
      return;
    }
    if (!normalizedPhone) {
      setError("Enter a valid phone number.");
      return;
    }

    requestInFlight.current = true;
    setPending(true);
    setError(null);
    try {
      await onRequestOtp(normalizedPhone);
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "We couldn't send a code. Try again.",
      );
    } finally {
      requestInFlight.current = false;
      setPending(false);
    }
  }

  return (
    <>
      <AuthScreenFrame
        description="We'll text you a one-time code."
        onBack={onBack}
        title="Your phone number"
      >
        <Text
          style={{
            color: colors.charcoal,
            fontFamily: getFontFamily("medium"),
            fontSize: typography.sizes.label,
            fontWeight: typography.weights.medium,
            marginBottom: spacing.sm,
          }}
        >
          Phone number
        </Text>
        <View
          style={{
            alignItems: "center",
            backgroundColor: colors.white,
            borderColor: error ? colors.error : colors.border,
            borderRadius: radius.input,
            borderWidth: componentSizes.borderWidth,
            flexDirection: "row",
            minHeight: componentSizes.buttonHeight,
          }}
        >
          <Pressable
            accessibilityLabel={`Country code ${country.name} ${country.callingCode}`}
            accessibilityRole="button"
            onPress={() => setCountryPickerVisible(true)}
            style={{
              alignItems: "center",
              flexDirection: "row",
              gap: spacing.xs,
              minHeight: componentSizes.buttonHeight,
              paddingHorizontal: spacing.md,
            }}
          >
            <Text
              style={{
                color: colors.charcoal,
                fontFamily: getFontFamily("semibold"),
                fontSize: typography.sizes.label,
                fontWeight: typography.weights.semibold,
              }}
            >
              {country.callingCode}
            </Text>
            <RoutelyIcon color={colors.muted} name="chevronRight" size={componentSizes.iconSmall} />
          </Pressable>
          <View
            style={{
              backgroundColor: colors.border,
              height: componentSizes.buttonHeight * 0.55,
              width: componentSizes.borderWidth,
            }}
          />
          <TextInput
            accessibilityLabel="Phone number"
            accessibilityHint={`Enter your number for ${country.name}, or include an international country code.`}
            autoComplete="tel"
            autoCorrect={false}
            keyboardType="phone-pad"
            onChangeText={(value) => {
              setPhoneInput(value);
              setError(null);
            }}
            placeholder="801 234 5678"
            placeholderTextColor={colors.muted}
            returnKeyType="done"
            style={{
              color: colors.charcoal,
              flex: 1,
              fontFamily: getFontFamily("regular"),
              fontSize: typography.sizes.body,
              minHeight: componentSizes.buttonHeight,
              paddingHorizontal: spacing.md,
            }}
            value={phoneInput}
          />
        </View>
        {error ? <AuthInlineMessage>{error}</AuthInlineMessage> : null}
        {!configured ? (
          <AuthInlineMessage tone="notice">
            Live SMS verification is not configured. No code will be sent.
          </AuthInlineMessage>
        ) : null}
        <View style={{ marginTop: spacing.xl }}>
          <RoutelyButton
            disabled={pending}
            fullWidth
            label={pending ? "Sending code…" : "Continue"}
            onPress={handleContinue}
          />
          {pending ? (
            <ActivityIndicator
              accessibilityLabel="Sending verification code"
              color={colors.forest}
              size="small"
              style={{ marginTop: spacing.md }}
            />
          ) : null}
          {previewEnabled && !configured ? (
            <Pressable
              accessibilityRole="button"
              onPress={() => {
                if (!normalizedPhone) {
                  setError("Enter a valid phone number to preview code entry.");
                  return;
                }
                setError(null);
                onPreviewOtp(normalizedPhone);
              }}
              style={{ alignSelf: "center", marginTop: spacing.md, minHeight: 44 }}
            >
              <Text
                style={{
                  color: colors.forest,
                  fontFamily: getFontFamily("semibold"),
                  fontSize: typography.sizes.label,
                  fontWeight: typography.weights.semibold,
                  padding: spacing.sm,
                  textAlign: "center",
                }}
              >
                Preview code entry (no SMS)
              </Text>
            </Pressable>
          ) : null}
          {__DEV__ ? (
            <Pressable
              accessibilityRole="button"
              onPress={onPreviewBikePreferences}
              style={{
                alignSelf: "center",
                marginTop: spacing.md,
                minHeight: componentSizes.touchTarget,
              }}
            >
              <Text
                style={{
                  color: colors.forest,
                  fontFamily: getFontFamily("semibold"),
                  fontSize: typography.sizes.label,
                  padding: spacing.sm,
                  textAlign: "center",
                }}
              >
                Bike preferences (not saved)
              </Text>
            </Pressable>
          ) : null}
        </View>
      </AuthScreenFrame>

      {countryPickerVisible ? (
        <Modal
          animationType="fade"
          onRequestClose={() => setCountryPickerVisible(false)}
          transparent
          visible
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
              style={{
                alignSelf: "center",
                backgroundColor: colors.white,
                borderRadius: radius.panel,
                maxHeight: "75%",
                maxWidth: 480,
                padding: spacing.md,
                width: "100%",
              }}
            >
              <Text
                accessibilityRole="header"
                style={{
                  color: colors.charcoal,
                  fontFamily: getFontFamily("semibold"),
                  fontSize: typography.sizes.sectionHeading,
                  fontWeight: typography.weights.semibold,
                  padding: spacing.sm,
                }}
              >
                Select country
              </Text>
              <ScrollView keyboardShouldPersistTaps="handled">
                {phoneCountries.map((option) => (
                  <Pressable
                    accessibilityRole="button"
                    accessibilityState={{ selected: option.country === country.country }}
                    key={option.country}
                    onPress={() => {
                      setCountry(option);
                      setCountryPickerVisible(false);
                      setError(null);
                    }}
                    style={{
                      alignItems: "center",
                      borderBottomColor: colors.border,
                      borderBottomWidth: componentSizes.borderWidth,
                      flexDirection: "row",
                      justifyContent: "space-between",
                      minHeight: componentSizes.buttonHeight,
                      paddingHorizontal: spacing.sm,
                    }}
                  >
                    <Text
                      style={{
                        color: colors.charcoal,
                        fontFamily: getFontFamily("medium"),
                        fontSize: typography.sizes.body,
                        fontWeight: typography.weights.medium,
                      }}
                    >
                      {option.name}
                    </Text>
                    <Text
                      style={{
                        color: colors.muted,
                        fontFamily: getFontFamily("medium"),
                        fontSize: typography.sizes.label,
                        fontWeight: typography.weights.medium,
                      }}
                    >
                      {option.callingCode}
                    </Text>
                  </Pressable>
                ))}
              </ScrollView>
            </View>
          </View>
        </Modal>
      ) : null}
    </>
  );
}
