import { useState, type ReactElement } from "react";
import { StyleSheet, Text, View } from "react-native";
import { designTokens, getFontFamily } from "@routely/design-tokens";
import { RoutelyButton, RoutelyIcon, RoutelyTextField } from "@routely/ui-mobile";
import { examplePricing, formatExamplePrice, isExamplePriceInRange } from "./example-pricing";

const { colors, componentSizes, radius, spacing, typography } = designTokens;
const messageLimit = 160;

export function CounterofferForm({
  rider,
  riderOffer,
}: {
  rider: string;
  riderOffer: number;
}): ReactElement {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [attempted, setAttempted] = useState(false);
  const [reviewed, setReviewed] = useState(false);
  const validAmount = isExamplePriceInRange(amount);

  function review() {
    setAttempted(true);
    if (validAmount) setReviewed(true);
  }

  if (!open) {
    return (
      <RoutelyButton
        fullWidth
        label="Make a counteroffer"
        onPress={() => setOpen(true)}
        variant="secondary"
      />
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <View style={styles.iconBox}>
          <RoutelyIcon name="wallet" />
        </View>
        <View style={styles.flex}>
          <Text style={styles.title}>Make a counteroffer</Text>
          <Text style={styles.subtitle}>
            {rider} offered ₦{riderOffer.toLocaleString("en-NG")}
          </Text>
        </View>
      </View>
      <Text style={styles.hint}>
        Example only. Nothing is sent to riders. Switching riders clears this draft.
      </Text>
      <Text style={styles.hint}>
        Example range: {formatExamplePrice(examplePricing.minimum)}–
        {formatExamplePrice(examplePricing.maximum)}.
      </Text>
      <RoutelyTextField
        autoComplete="off"
        error={
          attempted && !validAmount
            ? "Enter a whole-naira amount within the example range."
            : undefined
        }
        keyboardType="number-pad"
        label="Your counteroffer (₦)"
        maxLength={9}
        onChangeText={(value) => {
          setAmount(value);
          setReviewed(false);
        }}
        placeholder="Enter your amount"
        value={amount}
      />
      <RoutelyTextField
        autoComplete="off"
        label="Message to rider (optional)"
        maxLength={messageLimit}
        multiline
        onChangeText={(value) => {
          setMessage(value);
          setReviewed(false);
        }}
        placeholder="Add a short message"
        style={styles.messageInput}
        value={message}
      />
      <Text style={styles.hint}>
        {message.length}/{messageLimit} characters. Use sample details only.
      </Text>
      <RoutelyButton fullWidth label="Review counteroffer" onPress={review} variant="secondary" />
      {reviewed ? (
        <View accessibilityLiveRegion="polite" style={styles.review}>
          <Text style={styles.reviewTitle}>Counteroffer ready to review</Text>
          <Text style={styles.reviewText}>
            {rider}: ₦{Number(amount).toLocaleString("en-NG")}
          </Text>
          {message.trim() ? <Text style={styles.reviewText}>{message.trim()}</Text> : null}
          <Text style={styles.hint}>Not sent. Messaging and bargaining are not connected.</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    borderColor: colors.border,
    borderRadius: radius.lg,
    borderWidth: componentSizes.borderWidth,
    gap: spacing.md,
    padding: spacing.md,
  },
  heading: { alignItems: "center", flexDirection: "row", gap: spacing.sm },
  flex: { flex: 1 },
  iconBox: {
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    height: componentSizes.touchTarget,
    justifyContent: "center",
    width: componentSizes.touchTarget,
  },
  title: {
    color: colors.charcoal,
    fontFamily: getFontFamily("semibold"),
    fontSize: typography.sizes.label,
  },
  subtitle: {
    color: colors.muted,
    fontFamily: getFontFamily("regular"),
    fontSize: typography.sizes.caption,
    lineHeight: typography.lineHeights.footnote,
  },
  messageInput: {
    minHeight: componentSizes.buttonHeight * 2,
    paddingVertical: spacing.sm,
    textAlignVertical: "top",
  },
  hint: {
    color: colors.muted,
    fontFamily: getFontFamily("regular"),
    fontSize: typography.sizes.caption,
    lineHeight: typography.lineHeights.footnote,
  },
  review: {
    backgroundColor: colors.white,
    borderRadius: radius.md,
    gap: spacing.xs,
    padding: spacing.md,
  },
  reviewTitle: {
    color: colors.forest,
    fontFamily: getFontFamily("semibold"),
    fontSize: typography.sizes.label,
  },
  reviewText: {
    color: colors.charcoal,
    fontFamily: getFontFamily("regular"),
    fontSize: typography.sizes.label,
    lineHeight: typography.lineHeights.supporting,
  },
});
