import { useState, type ReactElement } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { designTokens, getFontFamily } from "@routely/design-tokens";
import { PageContainer, RoutelyIcon, useAppearance } from "@routely/ui-mobile";
import { DashboardNavigation } from "../dashboard/dashboard-navigation";
import { ActiveDeliveryCard } from "../active-delivery/active-delivery-card";
import { deliveryHistoryPreview } from "./delivery-history-preview";

const { colors, componentSizes, radius, shadows, spacing, typography } = designTokens;

export function DeliveriesScreen({
  initialTab = "Current",
}: {
  initialTab?: "Current" | "History";
}): ReactElement {
  const router = useRouter();
  const { mode } = useAppearance();
  const accent = designTokens.appearance[mode];
  const [tab, setTab] = useState<"Current" | "History">(initialTab);

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
              Deliveries
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
              Your deliveries, all in one place.
            </Text>
          </View>

          <View
            accessibilityRole="tablist"
            style={{
              backgroundColor: colors.container,
              borderRadius: radius.pill,
              flexDirection: "row",
              marginTop: spacing.lg,
              padding: spacing.xs,
            }}
          >
            {(["Current", "History"] as const).map((item) => {
              const selected = tab === item;
              return (
                <Pressable
                  accessibilityRole="tab"
                  accessibilityState={{ selected }}
                  key={item}
                  onPress={() => setTab(item)}
                  style={{
                    alignItems: "center",
                    backgroundColor: selected ? accent.primary : "transparent",
                    borderRadius: radius.pill,
                    flex: 1,
                    justifyContent: "center",
                    minHeight: componentSizes.touchTarget,
                  }}
                >
                  <Text
                    style={{
                      color: selected ? accent.onPrimary : colors.charcoal,
                      fontFamily: getFontFamily(selected ? "semibold" : "medium"),
                      fontSize: typography.sizes.label,
                    }}
                  >
                    {item}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          {tab === "Current" ? (
            <ActiveDeliveryCard onOpen={() => router.push("/active-delivery")} />
          ) : (
            <View style={{ gap: spacing.md, marginTop: spacing.lg }}>
              <Text
                accessibilityRole="header"
                style={{
                  color: colors.charcoal,
                  fontFamily: getFontFamily("semibold"),
                  fontSize: typography.sizes.cardHeading,
                }}
              >
                Past deliveries
              </Text>
              {deliveryHistoryPreview.map((delivery) => (
                <Pressable
                  accessibilityLabel={`View sample ${delivery.status.toLowerCase()} delivery on ${delivery.date}, ${delivery.pickup} to ${delivery.drop}`}
                  accessibilityRole="button"
                  key={delivery.id}
                  onPress={() =>
                    router.push({
                      pathname: "/delivery-history",
                      params: { deliveryId: delivery.id },
                    })
                  }
                  style={{
                    backgroundColor: colors.white,
                    borderColor: colors.border,
                    borderRadius: radius.card,
                    borderWidth: componentSizes.borderWidth,
                    gap: spacing.md,
                    padding: spacing.md,
                    ...shadows.card,
                  }}
                >
                  <View
                    style={{
                      alignItems: "center",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text
                      style={{
                        color: colors.forest,
                        fontFamily: getFontFamily("medium"),
                        fontSize: typography.sizes.caption,
                      }}
                    >
                      {delivery.date}
                    </Text>
                    <View
                      style={{
                        backgroundColor:
                          delivery.status === "Completed" ? colors.lime : colors.container,
                        borderRadius: radius.pill,
                        paddingHorizontal: spacing.sm,
                        paddingVertical: spacing.xs,
                      }}
                    >
                      <Text
                        style={{
                          color: colors.charcoal,
                          fontFamily: getFontFamily("medium"),
                          fontSize: typography.sizes.caption,
                        }}
                      >
                        {delivery.status}
                      </Text>
                    </View>
                  </View>
                  {[
                    { label: "Pickup", place: delivery.pickup },
                    { label: "Drop-off", place: delivery.drop },
                  ].map((stop) => (
                    <View
                      key={stop.label}
                      style={{ alignItems: "center", flexDirection: "row", gap: spacing.sm }}
                    >
                      <RoutelyIcon
                        color={colors.forest}
                        name="mapPin"
                        size={componentSizes.iconSmall}
                      />
                      <Text
                        style={{
                          color: colors.forest,
                          fontFamily: getFontFamily("regular"),
                          fontSize: typography.sizes.caption,
                          width: spacing["3xl"],
                        }}
                      >
                        {stop.label}
                      </Text>
                      <Text
                        style={{
                          color: colors.charcoal,
                          flex: 1,
                          fontFamily: getFontFamily("semibold"),
                          fontSize: typography.sizes.label,
                        }}
                      >
                        {stop.place}
                      </Text>
                    </View>
                  ))}
                  {delivery.earnings ? (
                    <Text
                      style={{
                        color: colors.charcoal,
                        fontFamily: getFontFamily("semibold"),
                        fontSize: typography.sizes.label,
                        textAlign: "right",
                      }}
                    >
                      {delivery.earnings}
                    </Text>
                  ) : null}
                  <View
                    style={{
                      alignItems: "center",
                      borderColor: colors.border,
                      borderTopWidth: componentSizes.borderWidth,
                      flexDirection: "row",
                      justifyContent: "space-between",
                      paddingTop: spacing.sm,
                    }}
                  >
                    <Text
                      style={{
                        color: colors.forest,
                        fontFamily: getFontFamily("semibold"),
                        fontSize: typography.sizes.caption,
                      }}
                    >
                      View details
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
          )}
        </PageContainer>
      </ScrollView>
      <DashboardNavigation active="Deliveries" />
    </View>
  );
}
