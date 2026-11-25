import type { ReactElement } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { designTokens, getFontFamily } from "@routely/design-tokens";
import {
  PageContainer,
  RoutelyIcon,
  useAppearance,
  type RoutelyIconName,
} from "@routely/ui-mobile";
import { availableRequestPreviews } from "../delivery-request/request-preview";

const { colors, componentSizes, radius, shadows, spacing, typography } = designTokens;

export function DeliveryRequestsScreen(): ReactElement {
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
                Delivery requests
              </Text>
              <Text
                style={{
                  color: colors.forest,
                  fontFamily: getFontFamily("regular"),
                  fontSize: typography.sizes.caption,
                  marginTop: spacing.xs,
                }}
              >
                Review the route and request details.
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
              <RoutelyIcon color={accent.primary} name="package" size={componentSizes.iconLarge} />
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  color: accent.onPrimary,
                  fontFamily: getFontFamily("medium"),
                  fontSize: typography.sizes.caption,
                  letterSpacing: typography.letterSpacing.brand,
                }}
              >
                DELIVERY OPPORTUNITIES
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
                Take a closer look.
              </Text>
              <Text
                style={{
                  color: accent.onPrimary,
                  fontFamily: getFontFamily("regular"),
                  fontSize: typography.sizes.caption,
                  lineHeight: typography.lineHeights.supporting,
                  marginTop: spacing.xs,
                }}
              >
                Check pickup, drop-off and trip estimates before reviewing a request.
              </Text>
            </View>
          </View>

          <View
            style={{
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: spacing.xl,
            }}
          >
            <Text
              accessibilityRole="header"
              style={{
                color: colors.charcoal,
                fontFamily: getFontFamily("semibold"),
                fontSize: typography.sizes.sectionHeading,
                lineHeight: typography.lineHeights.sectionHeading,
              }}
            >
              Available requests
            </Text>
            <View
              accessibilityLabel={`${availableRequestPreviews.length} illustrative requests`}
              style={{
                alignItems: "center",
                backgroundColor: colors.container,
                borderRadius: radius.pill,
                minWidth: componentSizes.touchTarget,
                paddingHorizontal: spacing.sm,
                paddingVertical: spacing.xs,
              }}
            >
              <Text
                style={{
                  color: colors.forest,
                  fontFamily: getFontFamily("semibold"),
                  fontSize: typography.sizes.caption,
                }}
              >
                {String(availableRequestPreviews.length).padStart(2, "0")}
              </Text>
            </View>
          </View>

          <View style={{ gap: spacing.md, marginTop: spacing.md }}>
            {availableRequestPreviews.map((request, index) => {
              const tripDetails: {
                icon: RoutelyIconName;
                label: string;
                title: string;
              }[] = [
                { icon: "mapPin", label: request.distance, title: "DISTANCE" },
                { icon: "history", label: request.duration, title: "EST. TIME" },
                { icon: "package", label: request.package, title: "PARCEL" },
              ];

              return (
                <View
                  key={request.id}
                  style={{
                    backgroundColor: colors.white,
                    borderColor: colors.border,
                    borderRadius: radius.panel,
                    borderWidth: componentSizes.borderWidth,
                    overflow: "hidden",
                    ...shadows.card,
                  }}
                >
                  <View
                    style={{
                      backgroundColor: colors.background,
                      padding: spacing.lg,
                    }}
                  >
                    <View
                      style={{
                        alignItems: "flex-start",
                        flexDirection: "row",
                        gap: spacing.md,
                        justifyContent: "space-between",
                      }}
                    >
                      <View style={{ flex: 1, gap: spacing.sm }}>
                        <Text
                          style={{
                            color: colors.charcoal,
                            fontFamily: getFontFamily("bold"),
                            fontSize: typography.sizes.caption,
                            letterSpacing: typography.letterSpacing.brand,
                          }}
                        >
                          OFFER {String(index + 1).padStart(2, "0")}
                        </Text>
                        <View
                          style={{
                            alignSelf: "flex-start",
                            backgroundColor: accent.primary,
                            borderRadius: radius.pill,
                            paddingHorizontal: spacing.sm,
                            paddingVertical: spacing.xs,
                          }}
                        >
                          <Text
                            style={{
                              color: accent.onPrimary,
                              fontFamily: getFontFamily("bold"),
                              fontSize: typography.sizes.caption,
                            }}
                          >
                            NEW REQUEST
                          </Text>
                        </View>
                      </View>
                      <View
                        style={{
                          alignItems: "center",
                          backgroundColor: accent.primary,
                          borderRadius: radius.card,
                          minWidth: componentSizes.touchTarget * 2,
                          padding: spacing.sm,
                        }}
                      >
                        <Text
                          style={{
                            color: accent.onPrimary,
                            fontFamily: getFontFamily("medium"),
                            fontSize: typography.sizes.caption,
                          }}
                        >
                          EST. PAYOUT
                        </Text>
                        <Text
                          style={{
                            color: accent.onPrimary,
                            fontFamily: getFontFamily("bold"),
                            fontSize: typography.sizes.cardHeading,
                            marginTop: spacing.xs,
                          }}
                        >
                          {request.earnings}
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View style={{ padding: spacing.lg }}>
                    <View
                      style={{
                        backgroundColor: colors.background,
                        borderRadius: radius.card,
                        borderColor: colors.border,
                        borderWidth: componentSizes.borderWidth,
                        padding: spacing.md,
                      }}
                    >
                      <View style={{ flexDirection: "row", gap: spacing.md }}>
                        <View style={{ alignItems: "center", paddingVertical: spacing.xs }}>
                          <View
                            style={{
                              backgroundColor: accent.primary,
                              borderRadius: radius.pill,
                              height: componentSizes.iconLarge,
                              justifyContent: "center",
                              width: componentSizes.iconLarge,
                            }}
                          >
                            <Text
                              style={{
                                color: accent.onPrimary,
                                fontFamily: getFontFamily("bold"),
                                fontSize: typography.sizes.caption,
                                textAlign: "center",
                              }}
                            >
                              A
                            </Text>
                          </View>
                          <View
                            style={{
                              backgroundColor: accent.primary,
                              flex: 1,
                              marginVertical: spacing.xs,
                              width: componentSizes.borderWidth * 2,
                            }}
                          />
                          <View
                            style={{
                              backgroundColor: colors.white,
                              borderColor: colors.forest,
                              borderWidth: componentSizes.borderWidth * 2,
                              borderRadius: radius.pill,
                              height: componentSizes.iconLarge,
                              justifyContent: "center",
                              width: componentSizes.iconLarge,
                            }}
                          >
                            <Text
                              style={{
                                color: colors.forest,
                                fontFamily: getFontFamily("bold"),
                                fontSize: typography.sizes.caption,
                                textAlign: "center",
                              }}
                            >
                              B
                            </Text>
                          </View>
                        </View>
                        <View style={{ flex: 1, gap: spacing.md }}>
                          <View>
                            <Text
                              style={{
                                color: colors.muted,
                                fontFamily: getFontFamily("medium"),
                                fontSize: typography.sizes.caption,
                              }}
                            >
                              PICKUP
                            </Text>
                            <Text
                              style={{
                                color: colors.charcoal,
                                fontFamily: getFontFamily("semibold"),
                                fontSize: typography.sizes.label,
                                marginTop: spacing.xs,
                              }}
                            >
                              {request.pickup}
                            </Text>
                          </View>
                          <View>
                            <Text
                              style={{
                                color: colors.muted,
                                fontFamily: getFontFamily("medium"),
                                fontSize: typography.sizes.caption,
                              }}
                            >
                              DROP-OFF
                            </Text>
                            <Text
                              style={{
                                color: colors.charcoal,
                                fontFamily: getFontFamily("semibold"),
                                fontSize: typography.sizes.label,
                                marginTop: spacing.xs,
                              }}
                            >
                              {request.drop}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>

                    <View
                      style={{
                        flexDirection: "row",
                        flexWrap: "wrap",
                        gap: spacing.sm,
                        marginTop: spacing.md,
                      }}
                    >
                      {tripDetails.map((detail) => (
                        <View
                          key={detail.label}
                          style={{
                            backgroundColor: colors.background,
                            borderColor: colors.border,
                            borderRadius: radius.card,
                            borderWidth: componentSizes.borderWidth,
                            flexGrow: 1,
                            gap: spacing.xs,
                            minWidth: componentSizes.touchTarget * 2,
                            padding: spacing.sm,
                          }}
                        >
                          <View
                            style={{
                              alignItems: "center",
                              flexDirection: "row",
                              gap: spacing.xs,
                            }}
                          >
                            <View
                              style={{
                                alignItems: "center",
                                backgroundColor:
                                  detail.icon === "mapPin" ? accent.primary : colors.container,
                                borderRadius: radius.pill,
                                height: componentSizes.iconLarge,
                                justifyContent: "center",
                                width: componentSizes.iconLarge,
                              }}
                            >
                              <RoutelyIcon
                                color={detail.icon === "mapPin" ? accent.onPrimary : colors.forest}
                                name={detail.icon}
                                size={componentSizes.iconSmall}
                              />
                            </View>
                            <Text
                              style={{
                                color: colors.muted,
                                fontFamily: getFontFamily("semibold"),
                                fontSize: typography.sizes.caption,
                                letterSpacing: typography.letterSpacing.brand,
                              }}
                            >
                              {detail.title}
                            </Text>
                          </View>
                          <Text
                            style={{
                              color: colors.charcoal,
                              fontFamily: getFontFamily("bold"),
                              fontSize: typography.sizes.label,
                            }}
                          >
                            {detail.label}
                          </Text>
                        </View>
                      ))}
                    </View>
                  </View>
                  <Pressable
                    accessibilityLabel="View delivery request details"
                    accessibilityRole="button"
                    onPress={() =>
                      router.push({
                        pathname: "/delivery-request",
                        params: { requestId: request.id },
                      })
                    }
                    style={{
                      alignItems: "center",
                      backgroundColor: accent.primary,
                      flexDirection: "row",
                      justifyContent: "space-between",
                      minHeight: componentSizes.buttonHeight,
                      paddingHorizontal: spacing.lg,
                    }}
                  >
                    <Text
                      style={{
                        color: accent.onPrimary,
                        fontFamily: getFontFamily("bold"),
                        fontSize: typography.sizes.label,
                      }}
                    >
                      View request details
                    </Text>
                    <View
                      style={{
                        alignItems: "center",
                        backgroundColor: accent.onPrimary,
                        borderRadius: radius.pill,
                        height: componentSizes.touchTarget * 0.75,
                        justifyContent: "center",
                        width: componentSizes.touchTarget * 0.75,
                      }}
                    >
                      <RoutelyIcon
                        color={accent.primary}
                        name="arrowRight"
                        size={componentSizes.iconSmall}
                      />
                    </View>
                  </Pressable>
                </View>
              );
            })}
          </View>

          <View
            style={{
              alignItems: "center",
              backgroundColor: colors.container,
              borderRadius: radius.card,
              flexDirection: "row",
              gap: spacing.sm,
              marginTop: spacing.md,
              padding: spacing.md,
            }}
          >
            <RoutelyIcon color={colors.forest} name="shield" size={componentSizes.icon} />
            <Text
              style={{
                color: colors.forest,
                flex: 1,
                fontFamily: getFontFamily("regular"),
                fontSize: typography.sizes.caption,
                lineHeight: typography.lineHeights.supporting,
              }}
            >
              Preview only. Requests are not live, and acceptance is unavailable.
            </Text>
          </View>
        </PageContainer>
      </ScrollView>
    </View>
  );
}
