import { useEffect, useState, type ReactElement } from "react";
import { BackHandler, Pressable, ScrollView, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { designTokens, getFontFamily } from "@routely/design-tokens";
import {
  PageContainer,
  RoutelyButton,
  RoutelyIcon,
  RoutelyTextField,
  useAppearance,
} from "@routely/ui-mobile";

const { colors, componentSizes, radius, shadows, spacing, typography } = designTokens;

export function WalletFlowScreen({ kind }: { kind: "top-up" | "withdrawal" }): ReactElement {
  const router = useRouter();
  const { mode } = useAppearance();
  const accent = designTokens.appearance[mode];
  const [amount, setAmount] = useState("");
  const [review, setReview] = useState(false);
  const isTopUp = kind === "top-up";
  const validAmount =
    /^\d+(?:\.\d{1,2})?$/.test(amount) && Number.isFinite(Number(amount)) && Number(amount) > 0;

  function exit() {
    if (router.canGoBack()) router.back();
    else router.replace("/earnings");
  }

  useEffect(() => {
    if (!review) return;
    const subscription = BackHandler.addEventListener("hardwareBackPress", () => {
      setReview(false);
      return true;
    });
    return () => subscription.remove();
  }, [review]);

  return (
    <View style={{ backgroundColor: colors.white, flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: spacing.xl }}>
        <PageContainer maxWidth={720}>
          <View
            style={{
              alignItems: "center",
              flexDirection: "row",
              gap: spacing.sm,
              marginTop: spacing.sm,
            }}
          >
            <Pressable
              accessibilityLabel="Go back"
              accessibilityRole="button"
              onPress={() => (review ? setReview(false) : exit())}
              style={{
                alignItems: "center",
                backgroundColor: colors.container,
                borderRadius: radius.pill,
                height: componentSizes.touchTarget,
                justifyContent: "center",
                width: componentSizes.touchTarget,
              }}
            >
              <RoutelyIcon color={colors.forest} name="arrowLeft" />
            </Pressable>
            <View style={{ flex: 1 }}>
              <Text
                accessibilityRole="header"
                style={{
                  color: colors.charcoal,
                  fontFamily: getFontFamily("bold"),
                  fontSize: typography.sizes.heading,
                  lineHeight: typography.lineHeights.heading,
                }}
              >
                {isTopUp ? "Top up wallet" : "Withdraw earnings"}
              </Text>
              <Text
                style={{
                  color: colors.forest,
                  fontFamily: getFontFamily("regular"),
                  fontSize: typography.sizes.caption,
                }}
              >
                {review ? "Review the amount." : "Choose an amount to review."}
              </Text>
            </View>
          </View>
          <View
            style={{
              backgroundColor: accent.primary,
              borderRadius: radius.panel,
              flexDirection: "row",
              gap: spacing.md,
              marginTop: spacing.lg,
              padding: spacing.lg,
              ...shadows.card,
            }}
          >
            <View
              style={{
                alignItems: "center",
                backgroundColor: accent.onPrimary,
                borderRadius: radius.lg,
                height: componentSizes.buttonHeight,
                justifyContent: "center",
                width: componentSizes.buttonHeight,
              }}
            >
              <RoutelyIcon color={accent.primary} name="wallet" size={componentSizes.iconLarge} />
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  color: accent.onPrimary,
                  fontFamily: getFontFamily("semibold"),
                  fontSize: typography.sizes.caption,
                  letterSpacing: typography.letterSpacing.brand,
                }}
              >
                WALLET
              </Text>
              <Text
                style={{
                  color: accent.onPrimary,
                  fontFamily: getFontFamily("bold"),
                  fontSize: typography.sizes.sectionHeading,
                  lineHeight: typography.lineHeights.sectionHeading,
                  marginTop: spacing.xs,
                }}
              >
                {isTopUp ? "Add funds" : "Move your earnings"}
              </Text>
              <Text
                style={{
                  color: accent.onPrimary,
                  fontFamily: getFontFamily("regular"),
                  fontSize: typography.sizes.caption,
                  lineHeight: typography.lineHeights.footnote,
                  marginTop: spacing.xs,
                }}
              >
                Payments and withdrawals are not connected. No money will move.
              </Text>
            </View>
          </View>
          <View
            style={{
              backgroundColor: colors.container,
              borderRadius: radius.panel,
              gap: spacing.md,
              marginTop: spacing.lg,
              padding: spacing.md,
            }}
          >
            <View
              style={{
                backgroundColor: colors.white,
                borderRadius: radius.card,
                gap: spacing.sm,
                padding: spacing.md,
              }}
            >
              {review ? (
                <>
                  <Text
                    style={{
                      color: colors.forest,
                      fontFamily: getFontFamily("semibold"),
                      fontSize: typography.sizes.caption,
                    }}
                  >
                    AMOUNT TO {isTopUp ? "ADD" : "WITHDRAW"}
                  </Text>
                  <Text
                    accessibilityLabel={`Entered amount ${amount} naira`}
                    style={{
                      color: colors.charcoal,
                      fontFamily: getFontFamily("bold"),
                      fontSize: typography.sizes.sectionHeading,
                    }}
                  >
                    ₦{amount}
                  </Text>
                </>
              ) : (
                <RoutelyTextField
                  autoComplete="off"
                  keyboardType="decimal-pad"
                  label="Amount (₦)"
                  onChangeText={setAmount}
                  placeholder="Enter an amount"
                  value={amount}
                />
              )}
              <Text
                style={{
                  color: colors.forest,
                  fontFamily: getFontFamily("regular"),
                  fontSize: typography.sizes.caption,
                  lineHeight: typography.lineHeights.footnote,
                }}
              >
                {review
                  ? "The amount is only held on this screen and is not submitted."
                  : "Enter a positive amount with up to two decimal places. It is not saved or sent."}
              </Text>
            </View>
            <View
              style={{
                alignItems: "center",
                backgroundColor: colors.white,
                borderRadius: radius.card,
                flexDirection: "row",
                gap: spacing.md,
                padding: spacing.md,
              }}
            >
              <View
                style={{
                  alignItems: "center",
                  backgroundColor: colors.container,
                  borderRadius: radius.lg,
                  height: componentSizes.touchTarget,
                  justifyContent: "center",
                  width: componentSizes.touchTarget,
                }}
              >
                <RoutelyIcon color={colors.forest} name={isTopUp ? "wallet" : "user"} />
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    color: colors.charcoal,
                    fontFamily: getFontFamily("semibold"),
                    fontSize: typography.sizes.label,
                  }}
                >
                  {isTopUp ? "Payment method" : "Withdrawal destination"}
                </Text>
                <Text
                  style={{
                    color: colors.forest,
                    fontFamily: getFontFamily("regular"),
                    fontSize: typography.sizes.caption,
                    lineHeight: typography.lineHeights.footnote,
                  }}
                >
                  Not connected yet.
                </Text>
              </View>
            </View>
          </View>
          <View style={{ marginTop: spacing.lg }}>
            {review ? (
              <RoutelyButton
                accessibilityLabel={`${isTopUp ? "Top up" : "Withdraw"}. Transactions are not connected.`}
                disabled
                fullWidth
                label={isTopUp ? "Top up unavailable" : "Withdrawal unavailable"}
              />
            ) : (
              <RoutelyButton
                disabled={!validAmount}
                fullWidth
                label="Review amount"
                onPress={() => setReview(true)}
                trailingIcon="arrowRight"
              />
            )}
          </View>
        </PageContainer>
      </ScrollView>
    </View>
  );
}
