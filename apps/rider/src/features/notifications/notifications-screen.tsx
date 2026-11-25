import { useState, type ReactElement } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { designTokens, getFontFamily } from "@routely/design-tokens";
import {
  PageContainer,
  RoutelyIcon,
  useAppearance,
  type RoutelyIconName,
} from "@routely/ui-mobile";

const { colors, componentSizes, radius, shadows, spacing, typography } = designTokens;

const filters = ["All", "Deliveries", "Earnings", "Account"] as const;
type NotificationFilter = (typeof filters)[number];
type NotificationCategory = Exclude<NotificationFilter, "All">;
type AppearanceAccent = (typeof designTokens.appearance)[keyof typeof designTokens.appearance];

const notifications: {
  category: NotificationCategory;
  description: string;
  group: "Today" | "Yesterday" | "Earlier";
  icon: RoutelyIconName;
  time: string;
  title: string;
  unread: boolean;
}[] = [
  {
    category: "Deliveries",
    description: "A new delivery request is ready for you to review.",
    group: "Today",
    icon: "package",
    time: "10:42 AM",
    title: "New delivery nearby",
    unread: true,
  },
  {
    category: "Earnings",
    description: "Your weekly earnings summary is ready to view.",
    group: "Today",
    icon: "wallet",
    time: "9:15 AM",
    title: "Weekly summary",
    unread: true,
  },
  {
    category: "Account",
    description: "Keep your rider documents up to date in your profile.",
    group: "Yesterday",
    icon: "shield",
    time: "Yesterday",
    title: "Account reminder",
    unread: true,
  },
  {
    category: "Deliveries",
    description: "Your delivery details are available in the active delivery screen.",
    group: "Yesterday",
    icon: "mapPin",
    time: "Yesterday",
    title: "Delivery update",
    unread: false,
  },
  {
    category: "Earnings",
    description: "Your earnings activity has been updated.",
    group: "Earlier",
    icon: "wallet",
    time: "Monday",
    title: "Earnings update",
    unread: false,
  },
];

const groupOrder: NotificationItem["group"][] = ["Today", "Yesterday", "Earlier"];
type NotificationItem = (typeof notifications)[number];

function NotificationCard({
  notification,
  accent,
}: {
  notification: NotificationItem;
  accent: AppearanceAccent;
}): ReactElement {
  return (
    <View
      style={{
        backgroundColor: colors.white,
        borderColor: notification.unread ? accent.primary : colors.border,
        borderRadius: radius.card,
        borderWidth: notification.unread
          ? componentSizes.borderWidth * 2
          : componentSizes.borderWidth,
        flexDirection: "row",
        gap: spacing.md,
        padding: spacing.md,
        ...shadows.card,
      }}
    >
      <View
        style={{
          alignItems: "center",
          backgroundColor: colors.container,
          borderRadius: radius.lg,
          height: componentSizes.buttonHeight,
          justifyContent: "center",
          width: componentSizes.buttonHeight,
        }}
      >
        <RoutelyIcon color={colors.forest} name={notification.icon} size={componentSizes.icon} />
      </View>
      <View style={{ flex: 1 }}>
        <View
          style={{
            alignItems: "center",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: spacing.xs,
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              backgroundColor: colors.container,
              borderRadius: radius.pill,
              paddingHorizontal: spacing.sm,
              paddingVertical: spacing.xs,
            }}
          >
            <Text
              style={{
                color: colors.forest,
                fontFamily: getFontFamily("medium"),
                fontSize: typography.sizes.caption,
              }}
            >
              {notification.category}
            </Text>
          </View>
          {notification.unread ? (
            <View
              style={{
                backgroundColor: accent.primary,
                borderRadius: radius.pill,
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
                NEW
              </Text>
            </View>
          ) : (
            <Text
              style={{
                color: colors.muted,
                fontFamily: getFontFamily("medium"),
                fontSize: typography.sizes.caption,
              }}
            >
              {notification.time}
            </Text>
          )}
        </View>
        <Text
          style={{
            color: colors.charcoal,
            fontFamily: getFontFamily("semibold"),
            fontSize: typography.sizes.label,
            lineHeight: typography.lineHeights.supporting,
            marginTop: spacing.sm,
          }}
        >
          {notification.title}
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
          {notification.description}
        </Text>
        {notification.unread ? (
          <Text
            style={{
              color: colors.muted,
              fontFamily: getFontFamily("medium"),
              fontSize: typography.sizes.caption,
              marginTop: spacing.sm,
            }}
          >
            {notification.time}
          </Text>
        ) : null}
      </View>
    </View>
  );
}

export function NotificationsScreen(): ReactElement {
  const router = useRouter();
  const { mode } = useAppearance();
  const accent = designTokens.appearance[mode];
  const [filter, setFilter] = useState<NotificationFilter>("All");
  const visibleNotifications =
    filter === "All"
      ? notifications
      : notifications.filter((notification) => notification.category === filter);
  const unreadCount = notifications.filter((notification) => notification.unread).length;
  const groups = groupOrder
    .map((group) => ({
      name: group,
      items: visibleNotifications.filter((notification) => notification.group === group),
    }))
    .filter((group) => group.items.length > 0);

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
                Notifications
              </Text>
              <Text
                style={{
                  color: colors.forest,
                  fontFamily: getFontFamily("regular"),
                  fontSize: typography.sizes.caption,
                  marginTop: spacing.xs,
                }}
              >
                Your latest rider updates.
              </Text>
            </View>
            <View
              accessibilityLabel={`${unreadCount} unread notifications; live notifications are not connected yet`}
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
                {unreadCount} new
              </Text>
            </View>
          </View>

          <View
            style={{
              backgroundColor: accent.primary,
              borderRadius: radius.panel,
              marginTop: spacing.lg,
              overflow: "hidden",
              padding: spacing.lg,
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
            <View style={{ alignItems: "center", flexDirection: "row", gap: spacing.md }}>
              <View
                style={{
                  alignItems: "center",
                  backgroundColor: accent.onPrimary,
                  borderRadius: radius.lg,
                  height: componentSizes.buttonHeight,
                  justifyContent: "center",
                  opacity: 0.95,
                  width: componentSizes.buttonHeight,
                }}
              >
                <RoutelyIcon color={accent.primary} name="bell" size={componentSizes.iconLarge} />
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
                  RIDER INBOX
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
                  A few things need your attention.
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                gap: spacing.sm,
                marginTop: spacing.lg,
              }}
            >
              {[
                { label: "Unread", value: String(unreadCount) },
                { label: "Recent updates", value: String(notifications.length) },
              ].map((stat) => (
                <View
                  key={stat.label}
                  style={{
                    backgroundColor: accent.onPrimary,
                    borderRadius: radius.card,
                    flex: 1,
                    opacity: 0.96,
                    padding: spacing.md,
                  }}
                >
                  <Text
                    style={{
                      color: accent.primary,
                      fontFamily: getFontFamily("bold"),
                      fontSize: typography.sizes.sectionHeading,
                      lineHeight: typography.lineHeights.sectionHeading,
                    }}
                  >
                    {stat.value}
                  </Text>
                  <Text
                    style={{
                      color: accent.primary,
                      fontFamily: getFontFamily("medium"),
                      fontSize: typography.sizes.caption,
                      marginTop: spacing.xs,
                    }}
                  >
                    {stat.label}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          <View
            accessibilityRole="tablist"
            style={{
              flexDirection: "row",
              gap: spacing.xs,
              marginTop: spacing.lg,
            }}
          >
            {filters.map((item) => {
              const selected = filter === item;
              const count =
                item === "All"
                  ? notifications.length
                  : notifications.filter((notification) => notification.category === item).length;
              return (
                <Pressable
                  accessibilityRole="tab"
                  accessibilityState={{ selected }}
                  aria-selected={selected}
                  key={item}
                  onPress={() => setFilter(item)}
                  style={{
                    alignItems: "center",
                    backgroundColor: selected ? accent.primary : colors.container,
                    borderRadius: radius.pill,
                    flex: 1,
                    flexDirection: "row",
                    gap: spacing.xs,
                    justifyContent: "center",
                    minHeight: componentSizes.touchTarget,
                    paddingHorizontal: spacing.xs,
                  }}
                >
                  <Text
                    style={{
                      color: selected ? accent.onPrimary : colors.forest,
                      fontFamily: getFontFamily(selected ? "semibold" : "medium"),
                      fontSize: typography.sizes.caption,
                    }}
                  >
                    {item}
                  </Text>
                  <Text
                    style={{
                      color: selected ? accent.onPrimary : colors.forest,
                      fontFamily: getFontFamily("semibold"),
                      fontSize: typography.sizes.caption,
                      opacity: selected ? 0.8 : 0.65,
                    }}
                  >
                    {count}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          <View
            style={{
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: spacing.xl,
            }}
          >
            <View>
              <Text
                accessibilityRole="header"
                style={{
                  color: colors.charcoal,
                  fontFamily: getFontFamily("semibold"),
                  fontSize: typography.sizes.sectionHeading,
                  lineHeight: typography.lineHeights.sectionHeading,
                }}
              >
                {filter === "All" ? "Your updates" : `${filter} updates`}
              </Text>
              <Text
                style={{
                  color: colors.muted,
                  fontFamily: getFontFamily("regular"),
                  fontSize: typography.sizes.caption,
                  marginTop: spacing.xs,
                }}
              >
                Latest first
              </Text>
            </View>
            <Pressable
              accessibilityLabel="Mark all as read. Notifications are not connected yet."
              accessibilityRole="button"
              accessibilityState={{ disabled: true }}
              disabled
              style={{
                alignItems: "center",
                borderColor: colors.border,
                borderRadius: radius.pill,
                borderWidth: componentSizes.borderWidth,
                justifyContent: "center",
                minHeight: componentSizes.touchTarget,
                paddingHorizontal: spacing.md,
              }}
            >
              <Text
                style={{
                  color: colors.muted,
                  fontFamily: getFontFamily("medium"),
                  fontSize: typography.sizes.caption,
                }}
              >
                Mark all read
              </Text>
            </Pressable>
          </View>

          {groups.length ? (
            groups.map((group) => (
              <View key={group.name} style={{ marginTop: spacing.lg }}>
                <View
                  style={{
                    alignItems: "center",
                    flexDirection: "row",
                    gap: spacing.sm,
                    marginBottom: spacing.sm,
                  }}
                >
                  <Text
                    accessibilityRole="header"
                    style={{
                      color: colors.charcoal,
                      fontFamily: getFontFamily("semibold"),
                      fontSize: typography.sizes.label,
                    }}
                  >
                    {group.name}
                  </Text>
                  <View
                    style={{
                      backgroundColor: colors.container,
                      borderRadius: radius.pill,
                      minWidth: componentSizes.icon,
                      paddingHorizontal: spacing.xs,
                      paddingVertical: 2,
                    }}
                  >
                    <Text
                      style={{
                        color: colors.forest,
                        fontFamily: getFontFamily("medium"),
                        fontSize: typography.sizes.caption,
                        textAlign: "center",
                      }}
                    >
                      {group.items.length}
                    </Text>
                  </View>
                </View>
                <View style={{ gap: spacing.sm }}>
                  {group.items.map((notification) => (
                    <NotificationCard
                      accent={accent}
                      key={`${notification.title}-${notification.time}`}
                      notification={notification}
                    />
                  ))}
                </View>
              </View>
            ))
          ) : (
            <View
              style={{
                alignItems: "center",
                backgroundColor: colors.container,
                borderRadius: radius.card,
                marginTop: spacing.lg,
                padding: spacing.xl,
              }}
            >
              <RoutelyIcon color={colors.forest} name="bell" size={componentSizes.iconLarge} />
              <Text
                style={{
                  color: colors.charcoal,
                  fontFamily: getFontFamily("semibold"),
                  fontSize: typography.sizes.label,
                  marginTop: spacing.md,
                }}
              >
                You’re all caught up
              </Text>
              <Text
                style={{
                  color: colors.forest,
                  fontFamily: getFontFamily("regular"),
                  fontSize: typography.sizes.caption,
                  marginTop: spacing.xs,
                  textAlign: "center",
                }}
              >
                No updates in this category right now.
              </Text>
            </View>
          )}

          <Text
            style={{
              color: colors.muted,
              fontFamily: getFontFamily("regular"),
              fontSize: typography.sizes.caption,
              lineHeight: typography.lineHeights.supporting,
              marginTop: spacing.lg,
              textAlign: "center",
            }}
          >
            Live notifications will appear here when the service is connected.
          </Text>
        </PageContainer>
      </ScrollView>
    </View>
  );
}
