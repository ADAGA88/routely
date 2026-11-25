import type { ReactElement } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { designTokens, getFontFamily } from "@routely/design-tokens";
import { PageContainer, RoutelyButton, RoutelyIcon, useAppearance } from "@routely/ui-mobile";
import { BikePreviewGallery } from "./bike-preview-gallery";
import type { BikePreview } from "./bike-preview";

const { colors, componentSizes, radius, spacing, typography } = designTokens;

export function BikeDetailsScreen({
  bike,
  onBack,
}: {
  bike: BikePreview | undefined;
  onBack: () => void;
}): ReactElement {
  const router = useRouter();
  const { mode } = useAppearance();
  const accent = designTokens.appearance[mode];

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
              onPress={onBack}
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
                Bike details
              </Text>
              <Text
                style={{
                  color: colors.forest,
                  fontFamily: getFontFamily("regular"),
                  fontSize: typography.sizes.caption,
                }}
              >
                Motorcycle preview
              </Text>
            </View>
          </View>
          {bike ? (
            <>
              <BikePreviewGallery />
              <Text
                style={{
                  color: colors.forest,
                  fontFamily: getFontFamily("regular"),
                  fontSize: typography.sizes.caption,
                  lineHeight: typography.lineHeights.footnote,
                  marginTop: spacing.sm,
                }}
              >
                Illustrative images only, not photographs of an actual bike.
              </Text>
              <View
                style={{
                  alignSelf: "flex-start",
                  backgroundColor: accent.primary,
                  borderRadius: radius.pill,
                  marginTop: spacing.lg,
                  paddingHorizontal: spacing.sm,
                  paddingVertical: spacing.xs,
                }}
              >
                <Text
                  style={{
                    color: accent.onPrimary,
                    fontFamily: getFontFamily("semibold"),
                    fontSize: typography.sizes.caption,
                  }}
                >
                  SAMPLE LISTING
                </Text>
              </View>
              <Text
                accessibilityRole="header"
                style={{
                  color: colors.charcoal,
                  fontFamily: getFontFamily("bold"),
                  fontSize: typography.sizes.heading,
                  lineHeight: typography.lineHeights.heading,
                  marginTop: spacing.sm,
                }}
              >
                {bike.name}
              </Text>
              <Text
                style={{
                  color: colors.forest,
                  fontFamily: getFontFamily("regular"),
                  fontSize: typography.sizes.label,
                  lineHeight: typography.lineHeights.supporting,
                  marginTop: spacing.sm,
                }}
              >
                Availability, specifications, pricing and hire purchase terms are not available in
                this preview.
              </Text>
              <View
                style={{
                  backgroundColor: colors.container,
                  borderRadius: radius.card,
                  gap: spacing.sm,
                  marginTop: spacing.lg,
                  padding: spacing.lg,
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
                  Verification and requests
                </Text>
                <Text
                  style={{
                    color: colors.forest,
                    fontFamily: getFontFamily("regular"),
                    fontSize: typography.sizes.caption,
                    lineHeight: typography.lineHeights.supporting,
                  }}
                >
                  Agent-assisted verification and bike assignment are not connected. No bike or
                  finance application can be submitted here.
                </Text>
                <RoutelyButton
                  label="View verification"
                  onPress={() => router.push("/verification")}
                  variant="secondary"
                />
              </View>
              <View style={{ marginTop: spacing.lg }}>
                <RoutelyButton
                  accessibilityLabel="Request a bike. Bike requests are not available yet."
                  disabled
                  fullWidth
                  label="Request a bike"
                />
              </View>
            </>
          ) : (
            <View
              style={{
                backgroundColor: colors.container,
                borderRadius: radius.card,
                gap: spacing.sm,
                marginTop: spacing.lg,
                padding: spacing.lg,
              }}
            >
              <Text
                accessibilityRole="header"
                style={{
                  color: colors.charcoal,
                  fontFamily: getFontFamily("bold"),
                  fontSize: typography.sizes.sectionHeading,
                }}
              >
                Bike not found
              </Text>
              <Text
                style={{
                  color: colors.forest,
                  fontFamily: getFontFamily("regular"),
                  fontSize: typography.sizes.label,
                  lineHeight: typography.lineHeights.supporting,
                }}
              >
                This sample bike is unavailable. Go back to explore bike options.
              </Text>
            </View>
          )}
        </PageContainer>
      </ScrollView>
    </View>
  );
}
