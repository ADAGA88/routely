import type { ReactElement } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { designTokens, getFontFamily } from "@routely/design-tokens";
import { PageContainer, RoutelyIcon, useAppearance } from "@routely/ui-mobile";
import riderAvatarExample from "@routely/brand-assets/rider-avatar-reference.png";
import { DashboardNavigation } from "../dashboard/dashboard-navigation";
import { ProfileActivity, ProfileMotorcycle, ProfileShortcuts } from "./profile-highlights";

const { colors, componentSizes, radius, shadows, spacing, typography } = designTokens;

export function ProfileScreen(): ReactElement {
  const router = useRouter();
  const { mode } = useAppearance();
  const accent = designTokens.appearance[mode];

  return (
    <View style={{ backgroundColor: colors.white, flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: spacing.xl }}>
        <PageContainer maxWidth={720}>
          <View style={{ marginTop: spacing.sm }}>
            <Text
              accessibilityRole="header"
              style={{
                color: colors.charcoal,
                fontFamily: getFontFamily("bold"),
                fontSize: typography.sizes.heading,
                lineHeight: typography.lineHeights.heading,
              }}
            >
              My profile
            </Text>
            <Text
              style={{
                color: colors.forest,
                fontFamily: getFontFamily("regular"),
                fontSize: typography.sizes.label,
                lineHeight: typography.lineHeights.supporting,
                marginTop: spacing.xs,
              }}
            >
              Everything about your rider account.
            </Text>
          </View>

          <View
            style={{
              backgroundColor: colors.white,
              borderColor: colors.border,
              borderRadius: radius.panel,
              borderWidth: componentSizes.borderWidth,
              marginTop: spacing.lg,
              overflow: "hidden",
              ...shadows.card,
            }}
          >
            <View
              style={{
                backgroundColor: accent.primary,
                height: spacing["3xl"] + spacing.lg,
                overflow: "hidden",
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
                  alignSelf: "flex-start",
                  flexDirection: "row",
                  gap: spacing.sm,
                  padding: spacing.md,
                }}
              >
                <RoutelyIcon
                  color={accent.onPrimary}
                  name="motorcycle"
                  size={componentSizes.icon}
                />
                <Text
                  style={{
                    color: accent.onPrimary,
                    fontFamily: getFontFamily("semibold"),
                    fontSize: typography.sizes.caption,
                    letterSpacing: typography.letterSpacing.brand,
                  }}
                >
                  RIDER PROFILE
                </Text>
              </View>
            </View>
            <View
              style={{
                alignItems: "center",
                paddingBottom: spacing.lg,
                paddingHorizontal: spacing.md,
              }}
            >
              <View
                accessible
                accessibilityLabel="Example rider portrait, not your profile photo"
                style={{
                  backgroundColor: colors.white,
                  borderColor: colors.white,
                  borderRadius: radius.pill,
                  borderWidth: spacing.xs,
                  height: 104,
                  marginTop: -spacing["2xl"],
                  overflow: "hidden",
                  width: 104,
                }}
              >
                <Image
                  accessibilityElementsHidden
                  importantForAccessibility="no-hide-descendants"
                  resizeMode="cover"
                  source={riderAvatarExample}
                  style={{ height: "100%", width: "100%" }}
                />
              </View>
              <Text
                accessibilityLabel="Sample rider name Tobi Adebayo, not your profile name."
                style={{
                  color: colors.charcoal,
                  fontFamily: getFontFamily("bold"),
                  fontSize: typography.sizes.sectionHeading,
                  lineHeight: typography.lineHeights.sectionHeading,
                  marginTop: spacing.sm,
                }}
              >
                Tobi Adebayo
              </Text>
              <View
                style={{
                  alignItems: "center",
                  backgroundColor: colors.container,
                  borderRadius: radius.pill,
                  flexDirection: "row",
                  gap: spacing.xs,
                  marginTop: spacing.sm,
                  paddingHorizontal: spacing.sm,
                  paddingVertical: spacing.xs,
                }}
              >
                <RoutelyIcon color={colors.forest} name="user" size={componentSizes.iconSmall} />
                <Text
                  style={{
                    color: colors.forest,
                    fontFamily: getFontFamily("medium"),
                    fontSize: typography.sizes.caption,
                  }}
                >
                  Account status unavailable
                </Text>
              </View>
              <Pressable
                accessibilityLabel="Edit profile. Profile service is not connected yet."
                accessibilityRole="button"
                accessibilityState={{ disabled: true }}
                disabled
                style={{
                  alignItems: "center",
                  borderColor: colors.border,
                  borderRadius: radius.pill,
                  borderWidth: componentSizes.borderWidth,
                  flexDirection: "row",
                  gap: spacing.sm,
                  justifyContent: "center",
                  marginTop: spacing.md,
                  minHeight: componentSizes.touchTarget,
                  paddingHorizontal: spacing.md,
                }}
              >
                <RoutelyIcon
                  color={colors.forest}
                  name="settings"
                  size={componentSizes.iconSmall}
                />
                <Text
                  style={{
                    color: colors.forest,
                    fontFamily: getFontFamily("semibold"),
                    fontSize: typography.sizes.caption,
                  }}
                >
                  Edit profile
                </Text>
              </Pressable>
            </View>
          </View>

          <ProfileActivity />

          <Text
            accessibilityRole="header"
            style={{
              color: colors.charcoal,
              fontFamily: getFontFamily("semibold"),
              fontSize: typography.sizes.sectionHeading,
              lineHeight: typography.lineHeights.sectionHeading,
              marginTop: spacing.xl,
            }}
          >
            Verification
          </Text>
          <Pressable
            accessibilityLabel="View rider verification details"
            accessibilityRole="button"
            onPress={() => router.push("/verification")}
            style={{
              backgroundColor: colors.container,
              borderRadius: radius.card,
              marginTop: spacing.md,
              padding: spacing.lg,
            }}
          >
            <View style={{ alignItems: "center", flexDirection: "row", gap: spacing.md }}>
              <View
                style={{
                  alignItems: "center",
                  backgroundColor: colors.white,
                  borderRadius: radius.pill,
                  height: componentSizes.buttonHeight,
                  justifyContent: "center",
                  width: componentSizes.buttonHeight,
                }}
              >
                <RoutelyIcon color={colors.forest} name="shield" size={componentSizes.iconLarge} />
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    color: colors.charcoal,
                    fontFamily: getFontFamily("semibold"),
                    fontSize: typography.sizes.label,
                  }}
                >
                  Verification status
                </Text>
                <Text
                  style={{
                    color: colors.forest,
                    fontFamily: getFontFamily("regular"),
                    fontSize: typography.sizes.caption,
                    lineHeight: typography.lineHeights.footnote,
                  }}
                >
                  Unavailable
                </Text>
              </View>
            </View>
          </Pressable>

          <Text
            accessibilityRole="header"
            style={{
              color: colors.charcoal,
              fontFamily: getFontFamily("semibold"),
              fontSize: typography.sizes.sectionHeading,
              lineHeight: typography.lineHeights.sectionHeading,
              marginTop: spacing.xl,
            }}
          >
            Account details
          </Text>
          <View
            style={{
              backgroundColor: colors.white,
              borderColor: colors.border,
              borderRadius: radius.card,
              borderWidth: componentSizes.borderWidth,
              marginTop: spacing.md,
              paddingHorizontal: spacing.md,
              ...shadows.card,
            }}
          >
            {[
              { label: "Phone number", icon: "user" },
              { label: "Email address", icon: "mail" },
            ].map(({ label, icon }, index) => (
              <View
                key={label}
                style={{
                  alignItems: "center",
                  borderBottomWidth: index === 0 ? componentSizes.borderWidth : 0,
                  borderColor: colors.border,
                  flexDirection: "row",
                  gap: spacing.md,
                  paddingVertical: spacing.md,
                }}
              >
                <View
                  style={{
                    alignItems: "center",
                    backgroundColor: colors.container,
                    borderRadius: radius.pill,
                    height: componentSizes.touchTarget,
                    justifyContent: "center",
                    width: componentSizes.touchTarget,
                  }}
                >
                  <RoutelyIcon
                    color={colors.forest}
                    name={icon === "mail" ? "mail" : "user"}
                    size={componentSizes.icon}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      color: colors.charcoal,
                      fontFamily: getFontFamily("medium"),
                      fontSize: typography.sizes.label,
                    }}
                  >
                    {label}
                  </Text>
                  <Text
                    style={{
                      color: colors.forest,
                      fontFamily: getFontFamily("regular"),
                      fontSize: typography.sizes.caption,
                    }}
                  >
                    Unavailable
                  </Text>
                </View>
              </View>
            ))}
          </View>
          <ProfileMotorcycle />
          <ProfileShortcuts />
        </PageContainer>
      </ScrollView>
      <DashboardNavigation active="Profile" />
    </View>
  );
}
