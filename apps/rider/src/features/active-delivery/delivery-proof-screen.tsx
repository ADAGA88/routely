import { useState, type ReactElement } from "react";
import { Text, View } from "react-native";
import { designTokens, getFontFamily } from "@routely/design-tokens";
import { RoutelyButton, RoutelyIcon, RoutelyTextField } from "@routely/ui-mobile";
import { DeliveryChoice, DeliveryFlowLayout } from "./delivery-flow-components";

const { colors, radius, spacing, typography } = designTokens;
const proofMethods = ["Photo", "Recipient confirmation", "Delivery code"] as const;

export function DeliveryProofScreen({ onBack }: { onBack: () => void }): ReactElement {
  const [method, setMethod] = useState<(typeof proofMethods)[number]>("Photo");

  return (
    <DeliveryFlowLayout
      title="Proof of delivery"
      description="Explore ways to confirm a delivery."
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
        Choose a proof option
      </Text>
      <View accessibilityRole="radiogroup" style={{ gap: spacing.sm, marginTop: spacing.md }}>
        {proofMethods.map((item) => (
          <DeliveryChoice
            key={item}
            label={item}
            onPress={() => setMethod(item)}
            selected={item === method}
          />
        ))}
      </View>
      <View
        style={{
          backgroundColor: colors.container,
          borderRadius: radius.card,
          gap: spacing.md,
          marginTop: spacing.lg,
          padding: spacing.md,
        }}
      >
        <Text
          accessibilityRole="header"
          style={{
            color: colors.charcoal,
            fontFamily: getFontFamily("semibold"),
            fontSize: typography.sizes.cardHeading,
          }}
        >
          {method}
        </Text>
        {method === "Photo" ? (
          <>
            <View
              style={{
                alignItems: "center",
                backgroundColor: colors.white,
                borderRadius: radius.md,
                gap: spacing.sm,
                padding: spacing.lg,
              }}
            >
              <RoutelyIcon color={colors.forest} name="clipboardList" size={spacing.xl} />
              <Text
                style={{
                  color: colors.forest,
                  fontFamily: getFontFamily("regular"),
                  fontSize: typography.sizes.caption,
                  textAlign: "center",
                }}
              >
                A delivery photo can appear here.
              </Text>
            </View>
            <RoutelyButton
              accessibilityLabel="Choose photo. Photo capture is not connected yet."
              disabled
              fullWidth
              label="Choose photo"
              variant="secondary"
            />
          </>
        ) : (
          <RoutelyTextField
            editable={false}
            label={method === "Delivery code" ? "Delivery code" : "Recipient name"}
            placeholder={
              method === "Delivery code" ? "Enter delivery code" : "Enter recipient name"
            }
            secureTextEntry={method === "Delivery code"}
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
          Proof collection is not connected yet.
        </Text>
      </View>
      <View style={{ gap: spacing.sm, marginTop: spacing.lg }}>
        <RoutelyButton
          accessibilityLabel="Submit proof. Proof collection is not connected yet."
          disabled
          fullWidth
          label="Submit proof"
        />
        <Text
          style={{
            color: colors.forest,
            fontFamily: getFontFamily("regular"),
            fontSize: typography.sizes.caption,
            lineHeight: typography.lineHeights.footnote,
            textAlign: "center",
          }}
        >
          Proof requirements are not configured yet.
        </Text>
      </View>
    </DeliveryFlowLayout>
  );
}
