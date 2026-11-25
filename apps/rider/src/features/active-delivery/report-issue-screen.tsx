import { useState, type ReactElement } from "react";
import { Text, View } from "react-native";
import { designTokens, getFontFamily } from "@routely/design-tokens";
import { RoutelyButton, RoutelyTextField } from "@routely/ui-mobile";
import { DeliveryChoice, DeliveryFlowLayout } from "./delivery-flow-components";

const { colors, spacing, typography } = designTokens;
const issueTypes = ["Pickup issue", "Drop-off issue", "Cannot reach contact", "Other"] as const;

export function ReportIssueScreen({ onBack }: { onBack: () => void }): ReactElement {
  const [issue, setIssue] = useState<(typeof issueTypes)[number]>("Pickup issue");
  const [details, setDetails] = useState("");

  return (
    <DeliveryFlowLayout
      title="Report an issue"
      description="Tell us what went wrong so support can help."
      onBack={onBack}
    >
      <Text
        accessibilityRole="header"
        style={{
          color: colors.charcoal,
          fontFamily: getFontFamily("semibold"),
          fontSize: typography.sizes.cardHeading,
          marginTop: spacing.xl,
        }}
      >
        What do you need help with?
      </Text>
      <View accessibilityRole="radiogroup" style={{ gap: spacing.sm, marginTop: spacing.md }}>
        {issueTypes.map((item) => (
          <DeliveryChoice
            key={item}
            label={item}
            onPress={() => setIssue(item)}
            selected={item === issue}
          />
        ))}
      </View>
      <View style={{ marginTop: spacing.lg }}>
        <RoutelyTextField
          label="More details"
          multiline
          onChangeText={setDetails}
          placeholder="Describe what happened"
          style={{
            minHeight: spacing["3xl"] + spacing["2xl"],
            paddingVertical: spacing.md,
            textAlignVertical: "top",
          }}
          value={details}
        />
        <Text
          style={{
            color: colors.forest,
            fontFamily: getFontFamily("regular"),
            fontSize: typography.sizes.caption,
            lineHeight: typography.lineHeights.footnote,
            marginTop: spacing.sm,
          }}
        >
          Please don’t include sensitive information. Nothing will be sent.
        </Text>
      </View>
      <View style={{ gap: spacing.sm, marginTop: spacing.lg }}>
        <RoutelyButton
          accessibilityLabel="Send report. Issue reporting is not connected yet."
          disabled
          fullWidth
          label="Send report"
        />
        <Text
          style={{
            color: colors.forest,
            fontFamily: getFontFamily("regular"),
            fontSize: typography.sizes.caption,
            textAlign: "center",
          }}
        >
          Issue reporting is not available yet.
        </Text>
      </View>
    </DeliveryFlowLayout>
  );
}
