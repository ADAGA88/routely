import type { ReactElement } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { designTokens, getFontFamily } from "@routely/design-tokens";
import { PageContainer, RoutelyButton, RoutelyIcon, useAppearance } from "@routely/ui-mobile";
import bikeFront from "../../../assets/illustrations/bike-preview-front.png";
import { sampleBikes } from "./bike-preview";

const { colors, componentSizes, radius, shadows, spacing, typography } = designTokens;

export function BikeOptionsScreen(): ReactElement {
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
              onPress={() => (router.canGoBack() ? router.back() : router.replace("/dashboard"))}
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
                Explore bikes
              </Text>
              <Text
                style={{
                  color: colors.forest,
                  fontFamily: getFontFamily("regular"),
                  fontSize: typography.sizes.caption,
                }}
              >
                Motorcycle options, previewed.
              </Text>
            </View>
          </View>

          <View
            style={{
              backgroundColor: accent.primary,
              borderRadius: radius.panel,
              gap: spacing.sm,
              marginTop: spacing.lg,
              overflow: "hidden",
              padding: spacing.lg,
              ...shadows.card,
            }}
          >
            <View
              pointerEvents="none"
              style={{
                borderColor: accent.onPrimary,
                borderRadius: radius.pill,
                borderWidth: spacing.md,
                height: spacing["3xl"] * 2,
                opacity: 0.1,
                position: "absolute",
                right: -spacing.md,
                top: -spacing["3xl"],
                width: spacing["3xl"] * 2,
              }}
            />
            <RoutelyIcon
              color={accent.onPrimary}
              name="motorcycle"
              size={componentSizes.iconLarge}
            />
            <Text
              style={{
                color: accent.onPrimary,
                fontFamily: getFontFamily("semibold"),
                fontSize: typography.sizes.caption,
                letterSpacing: typography.letterSpacing.brand,
              }}
            >
              FIND YOUR RIDE
            </Text>
            <Text
              style={{
                color: accent.onPrimary,
                fontFamily: getFontFamily("bold"),
                fontSize: typography.sizes.sectionHeading,
                lineHeight: typography.lineHeights.sectionHeading,
              }}
            >
              A bike for the road ahead.
            </Text>
            <Text
              style={{
                color: accent.onPrimary,
                fontFamily: getFontFamily("regular"),
                fontSize: typography.sizes.label,
                lineHeight: typography.lineHeights.supporting,
              }}
            >
              See how bike options and hire purchase interest could appear in Routely.
            </Text>
          </View>

          <Text
            accessibilityRole="header"
            style={{
              color: colors.charcoal,
              fontFamily: getFontFamily("semibold"),
              fontSize: typography.sizes.sectionHeading,
              marginTop: spacing.xl,
            }}
          >
            Example motorcycles
          </Text>
          <Text
            style={{
              color: colors.forest,
              fontFamily: getFontFamily("regular"),
              fontSize: typography.sizes.caption,
              lineHeight: typography.lineHeights.supporting,
              marginTop: spacing.xs,
            }}
          >
            Illustrations only. Real bikes and availability are not connected.
          </Text>
          <View style={{ gap: spacing.md, marginTop: spacing.md }}>
            {sampleBikes.map((bike, index) => (
              <Pressable
                accessibilityLabel={`View ${bike.name} sample details`}
                accessibilityRole="button"
                key={bike.id}
                onPress={() =>
                  router.push({ pathname: "/bike-details", params: { bikeId: bike.id } })
                }
                style={{
                  backgroundColor: colors.white,
                  borderColor: colors.border,
                  borderRadius: radius.card,
                  borderWidth: componentSizes.borderWidth,
                  overflow: "hidden",
                  ...shadows.card,
                }}
              >
                <Image
                  accessible={false}
                  resizeMode="contain"
                  source={bikeFront}
                  style={{
                    backgroundColor: colors.background,
                    height: componentSizes.illustrationHeight * 0.75,
                    width: "100%",
                  }}
                />
                <View
                  style={{
                    alignItems: "center",
                    backgroundColor: colors.container,
                    flexDirection: "row",
                    gap: spacing.md,
                    padding: spacing.lg,
                  }}
                >
                  <View
                    style={{
                      alignItems: "center",
                      backgroundColor: accent.primary,
                      borderRadius: radius.lg,
                      height: componentSizes.buttonHeight,
                      justifyContent: "center",
                      width: componentSizes.buttonHeight,
                    }}
                  >
                    <RoutelyIcon
                      color={accent.onPrimary}
                      name="motorcycle"
                      size={componentSizes.iconLarge}
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        color: colors.forest,
                        fontFamily: getFontFamily("semibold"),
                        fontSize: typography.sizes.caption,
                      }}
                    >
                      EXAMPLE {String(index + 1).padStart(2, "0")}
                    </Text>
                    <Text
                      style={{
                        color: colors.charcoal,
                        fontFamily: getFontFamily("bold"),
                        fontSize: typography.sizes.cardHeading,
                        marginTop: spacing.xs,
                      }}
                    >
                      {bike.name}
                    </Text>
                  </View>
                </View>
                <Text
                  style={{
                    color: colors.forest,
                    fontFamily: getFontFamily("regular"),
                    fontSize: typography.sizes.caption,
                    lineHeight: typography.lineHeights.supporting,
                    padding: spacing.md,
                  }}
                >
                  Sample listing. Details, availability and terms are not available.
                </Text>
                <View
                  style={{
                    alignItems: "center",
                    borderColor: colors.border,
                    borderTopWidth: componentSizes.borderWidth,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    minHeight: componentSizes.touchTarget,
                    paddingHorizontal: spacing.md,
                  }}
                >
                  <Text
                    style={{
                      color: colors.forest,
                      fontFamily: getFontFamily("semibold"),
                      fontSize: typography.sizes.label,
                    }}
                  >
                    View sample details
                  </Text>
                  <RoutelyIcon
                    color={colors.forest}
                    name="arrowRight"
                    size={componentSizes.iconSmall}
                  />
                </View>
              </Pressable>
            ))}
          </View>

          <View
            style={{
              backgroundColor: colors.container,
              borderRadius: radius.card,
              gap: spacing.sm,
              marginTop: spacing.xl,
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
              Verification and bike requests
            </Text>
            <Text
              style={{
                color: colors.forest,
                fontFamily: getFontFamily("regular"),
                fontSize: typography.sizes.caption,
                lineHeight: typography.lineHeights.supporting,
              }}
            >
              Bike assignment is planned after agent-assisted verification. Verification, assignment
              and hire purchase applications are not connected in this preview.
            </Text>
            <RoutelyButton
              label="View verification"
              onPress={() => router.push("/verification")}
              variant="secondary"
            />
          </View>
          <View style={{ gap: spacing.sm, marginTop: spacing.lg }}>
            <RoutelyButton
              fullWidth
              label="Bike preferences (not saved)"
              onPress={() => router.push("/bike-preferences")}
              variant="secondary"
            />
            <RoutelyButton
              accessibilityLabel="Request a bike. Bike requests are not available yet."
              disabled
              fullWidth
              label="Request a bike"
            />
          </View>
        </PageContainer>
      </ScrollView>
    </View>
  );
}
