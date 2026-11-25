import { useState, type ReactElement } from "react";
import { Image, Pressable, StyleSheet, Text, View, useWindowDimensions } from "react-native";
import { designTokens, getFontFamily } from "@routely/design-tokens";
import {
  AppearanceSwitch,
  DashboardPreviewFrame,
  RoutelyIcon,
  RoutelyLogo,
  useAppearance,
  type RoutelyIconName,
} from "@routely/ui-mobile";
import taskArtwork from "@routely/brand-assets/agent-tasks-cutout.png";

const { colors, componentSizes, radius, shadows, spacing, typography } = designTokens;

const metrics: { icon: RoutelyIconName; label: string; accessibilityLabel: string }[] = [
  { icon: "users", label: "Riders\nassigned", accessibilityLabel: "Riders assigned" },
  { icon: "user", label: "Owners\nmanaged", accessibilityLabel: "Owners managed" },
  { icon: "checkCircle", label: "Tasks\ncompleted", accessibilityLabel: "Tasks completed" },
];

const quickActions: { icon: RoutelyIconName; detail: RoutelyIconName; label: string }[] = [
  { icon: "user", detail: "shield", label: "Verify Rider" },
  { icon: "motorcycle", detail: "user", label: "Verify Motorcycle Owner" },
  { icon: "mapPin", detail: "plus", label: "Add Field Activity" },
  { icon: "clipboardList", detail: "arrowRight", label: "View Assignments" },
];

function SectionHeading({
  title,
  action,
}: {
  title: string;
  action?: { label: string; onPress: () => void };
}): ReactElement {
  return (
    <View style={styles.sectionHeading}>
      <Text accessibilityRole="header" style={styles.sectionTitle}>
        {title}
      </Text>
      {action ? (
        <Pressable accessibilityRole="button" onPress={action.onPress} style={styles.sectionAction}>
          <Text style={styles.sectionActionText}>{action.label}</Text>
          <RoutelyIcon name="arrowRight" size={componentSizes.iconSmall} />
        </Pressable>
      ) : null}
    </View>
  );
}

function TaskUnavailable({
  actionLabel,
  onPress,
}: {
  actionLabel: string;
  onPress: () => void;
}): ReactElement {
  const { mode } = useAppearance();
  return (
    <View style={styles.taskCard}>
      <View style={styles.taskArt}>
        <View
          pointerEvents="none"
          style={[
            styles.tint,
            {
              backgroundColor: designTokens.appearance[mode].primary,
              opacity: mode === "lime" ? 0.3 : 0.1,
            },
          ]}
        />
        <Image
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
          resizeMode="contain"
          source={taskArtwork}
          style={styles.taskIllustration}
        />
      </View>
      <View style={styles.flex}>
        <Text style={styles.cardTitle}>Tasks unavailable</Text>
        <Text style={styles.supportingText}>Task data is not connected yet.</Text>
        <Pressable accessibilityRole="button" onPress={onPress} style={styles.inlineAction}>
          <Text style={styles.inlineActionText}>{actionLabel}</Text>
          <RoutelyIcon name="arrowRight" size={componentSizes.iconSmall} />
        </Pressable>
      </View>
    </View>
  );
}

export function AgentDashboardScreen(): ReactElement {
  const { mode } = useAppearance();
  const { width } = useWindowDimensions();
  const [view, setView] = useState<"home" | "tasks">("home");
  const compact = width < 360;
  const artworkWidth = compact
    ? componentSizes.routeDecorHeight + spacing.md
    : componentSizes.routeHeight + spacing.md;
  const openTasks = () => setView("tasks");
  const openHome = () => setView("home");

  return (
    <DashboardPreviewFrame
      key={view}
      role="Agent"
      notice="Dashboard data is not connected"
      selectedIndex={view === "home" ? 0 : 1}
      header={
        <AppearanceSwitch
          leading={<RoutelyLogo width={112} />}
          actions={
            <Pressable
              accessibilityLabel="Notifications unavailable"
              accessibilityRole="button"
              accessibilityState={{ disabled: true }}
              disabled
              style={styles.headerAction}
            >
              <RoutelyIcon name="bell" color={colors.forest} size={componentSizes.iconLarge} />
            </Pressable>
          }
        />
      }
      navigation={[
        { label: "Home", icon: "home", onPress: openHome },
        { label: "Tasks", icon: "clipboardList", onPress: openTasks },
        { label: "Reports", icon: "chart" },
        { label: "Profile", icon: "user" },
      ]}
    >
      {view === "home" ? (
        <>
          <View style={styles.profile}>
            <View style={styles.flex}>
              <Text style={styles.greeting}>Welcome to Routely</Text>
              <Text accessibilityRole="header" style={styles.profileTitle}>
                Hello there
              </Text>
              <View style={styles.status}>
                <View style={styles.statusDot} />
                <Text style={styles.statusText}>Availability unavailable</Text>
              </View>
            </View>
            <View accessible accessibilityLabel="Profile image unavailable" style={styles.avatar}>
              <RoutelyIcon name="user" color={colors.forest} size={componentSizes.iconLarge} />
            </View>
          </View>

          <SectionHeading title="Operational overview" />
          <View style={styles.metrics}>
            {metrics.map((metric, index) => (
              <View
                accessible
                accessibilityLabel={`${metric.accessibilityLabel} unavailable`}
                key={metric.label}
                style={[styles.metric, index === 0 && styles.metricFeatured]}
              >
                {index === 1 ? (
                  <View
                    pointerEvents="none"
                    style={[
                      styles.tint,
                      {
                        backgroundColor: designTokens.appearance[mode].primary,
                        opacity: mode === "lime" ? 0.18 : 0.08,
                      },
                    ]}
                  />
                ) : null}
                <View
                  pointerEvents="none"
                  style={[styles.metricOrbit, index === 0 && styles.metricOrbitFeatured]}
                />
                <View style={[styles.metricIcon, index === 0 && styles.metricIconFeatured]}>
                  <RoutelyIcon
                    name={metric.icon}
                    color={colors.forest}
                    size={componentSizes.iconLarge}
                  />
                </View>
                <Text style={[styles.metricValue, index === 0 && styles.metricTextFeatured]}>
                  —
                </Text>
                <Text style={[styles.metricLabel, index === 0 && styles.metricTextFeatured]}>
                  {metric.label}
                </Text>
              </View>
            ))}
          </View>

          <View
            style={[
              styles.hero,
              { backgroundColor: mode === "lime" ? colors.lime : colors.forest },
            ]}
          >
            <View
              pointerEvents="none"
              style={[
                styles.heroOrb,
                { backgroundColor: mode === "lime" ? colors.forest : colors.lime },
              ]}
            />
            <View pointerEvents="none" style={styles.heroRing} />
            <View style={styles.heroCopy}>
              <Text
                style={[
                  styles.heroEyebrow,
                  { color: mode === "lime" ? colors.forest : colors.lime },
                ]}
              >
                FIELD OPERATIONS
              </Text>
              <Text
                accessibilityRole="header"
                style={[
                  styles.heroTitle,
                  { color: mode === "lime" ? colors.charcoal : colors.white },
                ]}
              >
                Your day,{"\n"}in focus.
              </Text>
              <Text
                style={[
                  styles.heroDescription,
                  { color: mode === "lime" ? colors.charcoal : colors.white },
                ]}
              >
                Keep your field tasks in one place.
              </Text>
              <Pressable
                accessibilityRole="button"
                onPress={openTasks}
                style={[
                  styles.heroButton,
                  { backgroundColor: mode === "lime" ? colors.forest : colors.white },
                ]}
              >
                <Text
                  style={[
                    styles.heroButtonText,
                    { color: mode === "lime" ? colors.white : colors.forest },
                  ]}
                >
                  View tasks
                </Text>
                <RoutelyIcon
                  name="arrowRight"
                  color={mode === "lime" ? colors.white : colors.forest}
                  size={componentSizes.iconSmall}
                />
              </Pressable>
            </View>
            <Image
              accessibilityElementsHidden
              importantForAccessibility="no-hide-descendants"
              resizeMode="contain"
              source={taskArtwork}
              style={[
                styles.heroArtwork,
                { width: artworkWidth, height: (artworkWidth * 172) / 220 },
              ]}
            />
          </View>

          <SectionHeading title="Quick actions" />
          <View style={styles.actionGrid}>
            {quickActions.map((action, index) => (
              <Pressable
                accessibilityLabel={`${action.label} unavailable`}
                accessibilityRole="button"
                accessibilityState={{ disabled: true }}
                disabled
                key={action.label}
                style={[styles.actionCard, compact && styles.actionCardCompact]}
              >
                <View
                  pointerEvents="none"
                  style={[
                    styles.actionAccent,
                    {
                      backgroundColor: designTokens.appearance[mode].primary,
                      opacity: mode === "lime" ? 0.17 : 0.08,
                    },
                  ]}
                />
                <View style={[styles.actionIcon, index % 2 === 0 && styles.actionIconDark]}>
                  <RoutelyIcon
                    name={action.icon}
                    color={index % 2 === 0 ? colors.white : colors.forest}
                    size={componentSizes.iconLarge}
                  />
                  <View
                    style={[styles.actionIconBadge, index % 2 === 0 && styles.actionIconBadgeLime]}
                  >
                    <RoutelyIcon
                      name={action.detail}
                      color={index % 2 === 0 ? colors.forest : colors.white}
                      size={componentSizes.iconSmall}
                    />
                  </View>
                </View>
                <View style={styles.flex}>
                  <Text style={styles.actionTitle}>{action.label}</Text>
                  <Text style={styles.actionStatus}>Not connected</Text>
                </View>
              </Pressable>
            ))}
          </View>

          <SectionHeading
            title="Pending tasks"
            action={{ label: "View all", onPress: openTasks }}
          />
          <TaskUnavailable actionLabel="View tasks" onPress={openTasks} />

          <SectionHeading title="Field performance" />
          <View style={styles.performanceCard}>
            <View style={styles.performanceHeader}>
              <View style={styles.performanceIcon}>
                <RoutelyIcon name="chart" color={colors.white} size={componentSizes.icon} />
              </View>
              <View style={styles.flex}>
                <Text style={styles.cardTitle}>Weekly activity</Text>
                <Text style={styles.supportingText}>Completed tasks</Text>
              </View>
              <Text
                accessibilityLabel="Completed tasks unavailable"
                style={styles.performanceValue}
              >
                —
              </Text>
            </View>
            <View
              accessibilityLabel="Weekly activity data unavailable"
              accessible
              style={styles.chartPlaceholder}
            >
              <View style={styles.chartLine} />
              <View style={styles.chartLine} />
              <View style={styles.chartLine} />
              <View style={styles.chartMessage}>
                <RoutelyIcon name="chart" color={colors.muted} size={componentSizes.icon} />
                <Text style={styles.chartMessageText}>Performance data is not connected</Text>
              </View>
            </View>
          </View>

          <SectionHeading title="Recent activity" />
          <View style={styles.activityCard}>
            <View style={styles.activityMarker}>
              <RoutelyIcon name="history" size={componentSizes.icon} />
            </View>
            <View style={styles.flex}>
              <Text style={styles.cardTitle}>Activity unavailable</Text>
              <Text style={styles.supportingText}>Recent activity is not connected yet.</Text>
            </View>
          </View>
        </>
      ) : (
        <>
          <View style={styles.tasksIntro}>
            <Text accessibilityRole="header" style={styles.profileTitle}>
              Your tasks
            </Text>
            <Text style={styles.supportingText}>Keep track of your field work.</Text>
          </View>
          <TaskUnavailable actionLabel="Back to overview" onPress={openHome} />
        </>
      )}
    </DashboardPreviewFrame>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, minWidth: 0 },
  headerAction: {
    alignItems: "center",
    justifyContent: "center",
    minHeight: componentSizes.touchTarget,
    minWidth: componentSizes.touchTarget,
  },
  profile: { alignItems: "center", flexDirection: "row", gap: spacing.md, marginTop: spacing.md },
  greeting: {
    color: colors.muted,
    fontFamily: getFontFamily("medium"),
    fontSize: typography.sizes.caption,
  },
  profileTitle: {
    color: colors.charcoal,
    fontFamily: getFontFamily("bold"),
    fontSize: typography.sizes.sectionHeading,
    lineHeight: typography.lineHeights.sectionHeading,
  },
  status: { alignItems: "center", flexDirection: "row", gap: spacing.xs, marginTop: spacing.xs },
  statusDot: {
    backgroundColor: colors.muted,
    borderRadius: radius.pill,
    height: componentSizes.indicator,
    width: componentSizes.indicator,
  },
  statusText: {
    color: colors.muted,
    fontFamily: getFontFamily("regular"),
    fontSize: typography.sizes.caption,
  },
  avatar: {
    alignItems: "center",
    backgroundColor: colors.container,
    borderColor: colors.border,
    borderRadius: radius.pill,
    borderWidth: componentSizes.borderWidth,
    height: componentSizes.buttonHeight,
    justifyContent: "center",
    width: componentSizes.buttonHeight,
  },
  sectionHeading: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: spacing.sm,
    marginTop: spacing.lg,
    minHeight: componentSizes.iconLarge,
  },
  sectionTitle: {
    color: colors.charcoal,
    fontFamily: getFontFamily("semibold"),
    fontSize: typography.sizes.cardHeading,
  },
  sectionAction: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.xs,
    minHeight: componentSizes.touchTarget,
  },
  sectionActionText: {
    color: colors.forest,
    fontFamily: getFontFamily("medium"),
    fontSize: typography.sizes.caption,
  },
  metrics: { flexDirection: "row", gap: spacing.sm },
  metric: {
    backgroundColor: colors.white,
    borderColor: colors.border,
    borderRadius: radius.lg,
    borderWidth: componentSizes.borderWidth,
    flex: 1,
    minWidth: 0,
    overflow: "hidden",
    paddingHorizontal: spacing.xs + componentSizes.borderWidth * 2,
    paddingVertical: spacing.sm,
    ...shadows.card,
  },
  metricFeatured: { backgroundColor: colors.forest, borderColor: colors.forest },
  metricOrbit: {
    borderColor: colors.forest,
    borderRadius: radius.pill,
    borderWidth: componentSizes.borderWidth,
    height: componentSizes.buttonHeight,
    opacity: 0.1,
    position: "absolute",
    right: -spacing.md,
    top: -spacing.md,
    width: componentSizes.buttonHeight,
  },
  metricOrbitFeatured: { borderColor: colors.lime, opacity: 0.45 },
  metricIcon: {
    alignItems: "center",
    backgroundColor: colors.container,
    borderRadius: radius.iconContainer,
    height: componentSizes.iconLarge + spacing.md,
    justifyContent: "center",
    width: componentSizes.iconLarge + spacing.md,
  },
  metricIconFeatured: { backgroundColor: colors.lime },
  metricValue: {
    color: colors.charcoal,
    fontFamily: getFontFamily("bold"),
    fontSize: typography.sizes.numeric,
    lineHeight: typography.lineHeights.cardHeading,
    marginTop: spacing.sm,
  },
  metricLabel: {
    color: colors.charcoal,
    fontFamily: getFontFamily("medium"),
    fontSize: typography.sizes.caption,
    lineHeight: typography.lineHeights.caption,
    marginTop: spacing.xs,
  },
  metricTextFeatured: { color: colors.white },
  hero: {
    borderRadius: radius.card,
    flexDirection: "row",
    marginTop: spacing.lg,
    minHeight: componentSizes.routeHeight + spacing.xl + spacing.md,
    overflow: "hidden",
    paddingLeft: spacing.md,
    ...shadows.card,
  },
  heroOrb: {
    borderRadius: radius.pill,
    bottom: -spacing["2xl"],
    height: componentSizes.routeHeight + spacing.xl,
    position: "absolute",
    right: -spacing.xl,
    width: componentSizes.routeHeight + spacing.xl,
  },
  heroRing: {
    borderColor: colors.white,
    borderRadius: radius.pill,
    borderWidth: componentSizes.borderWidth,
    height: componentSizes.routeHeight + spacing.xl + spacing.md,
    opacity: 0.25,
    position: "absolute",
    right: -spacing.xl,
    top: spacing.xl,
    width: componentSizes.routeHeight + spacing.xl + spacing.md,
  },
  heroCopy: {
    alignItems: "flex-start",
    flex: 1,
    gap: spacing.xs,
    paddingVertical: spacing.md,
    zIndex: 1,
  },
  heroEyebrow: { fontFamily: getFontFamily("semibold"), fontSize: typography.sizes.caption },
  heroTitle: {
    fontFamily: getFontFamily("bold"),
    fontSize: typography.sizes.sectionHeading,
    lineHeight: typography.lineHeights.sectionHeading,
  },
  heroDescription: {
    fontFamily: getFontFamily("regular"),
    fontSize: typography.sizes.caption,
    lineHeight: typography.lineHeights.caption,
  },
  heroButton: {
    alignItems: "center",
    borderRadius: radius.pill,
    flexDirection: "row",
    gap: spacing.sm,
    marginTop: spacing.sm,
    minHeight: componentSizes.touchTarget,
    paddingHorizontal: spacing.md,
  },
  heroButtonText: { fontFamily: getFontFamily("semibold"), fontSize: typography.sizes.caption },
  heroArtwork: { alignSelf: "flex-end", zIndex: 1 },
  actionGrid: { flexDirection: "row", flexWrap: "wrap", gap: spacing.sm },
  actionCard: {
    alignItems: "center",
    backgroundColor: colors.white,
    borderColor: colors.border,
    borderRadius: radius.lg,
    borderWidth: componentSizes.borderWidth,
    flexBasis: "48%",
    flexGrow: 1,
    flexDirection: "row",
    gap: spacing.sm,
    minHeight: componentSizes.buttonHeight + spacing.md,
    overflow: "hidden",
    padding: spacing.sm,
    ...shadows.card,
  },
  actionCardCompact: { alignItems: "flex-start", flexDirection: "column" },
  actionAccent: {
    borderRadius: radius.pill,
    height: componentSizes.touchTarget + spacing.md,
    position: "absolute",
    right: -spacing.md,
    top: -spacing.lg,
    width: componentSizes.touchTarget + spacing.md,
  },
  actionIcon: {
    alignItems: "center",
    backgroundColor: colors.lime,
    borderRadius: radius.iconContainer,
    height: componentSizes.touchTarget,
    justifyContent: "center",
    width: componentSizes.touchTarget,
  },
  actionIconDark: { backgroundColor: colors.forest },
  actionIconBadge: {
    alignItems: "center",
    backgroundColor: colors.forest,
    borderColor: colors.white,
    borderRadius: radius.pill,
    borderWidth: componentSizes.borderWidth,
    bottom: -spacing.xs,
    height: componentSizes.iconLarge,
    justifyContent: "center",
    position: "absolute",
    right: -spacing.xs,
    width: componentSizes.iconLarge,
  },
  actionIconBadgeLime: { backgroundColor: colors.lime },
  actionTitle: {
    color: colors.charcoal,
    fontFamily: getFontFamily("semibold"),
    fontSize: typography.sizes.caption,
    lineHeight: typography.lineHeights.caption,
  },
  actionStatus: {
    color: colors.muted,
    fontFamily: getFontFamily("regular"),
    fontSize: typography.sizes.caption,
    marginTop: spacing.xs,
  },
  taskCard: {
    alignItems: "center",
    backgroundColor: colors.white,
    borderColor: colors.border,
    borderRadius: radius.card,
    borderWidth: componentSizes.borderWidth,
    flexDirection: "row",
    gap: spacing.md,
    padding: spacing.md,
    ...shadows.card,
  },
  taskArt: {
    alignItems: "center",
    backgroundColor: colors.background,
    borderRadius: radius.lg,
    height: componentSizes.buttonHeight + spacing.sm,
    justifyContent: "center",
    overflow: "hidden",
    width: componentSizes.buttonHeight + spacing.sm,
  },
  taskIllustration: { height: componentSizes.buttonHeight, width: componentSizes.buttonHeight },
  tint: { ...StyleSheet.absoluteFillObject },
  cardTitle: {
    color: colors.charcoal,
    fontFamily: getFontFamily("semibold"),
    fontSize: typography.sizes.label,
    lineHeight: typography.lineHeights.footnote,
  },
  supportingText: {
    color: colors.muted,
    fontFamily: getFontFamily("regular"),
    fontSize: typography.sizes.caption,
    lineHeight: typography.lineHeights.caption,
    marginTop: spacing.xs,
  },
  inlineAction: {
    alignItems: "center",
    alignSelf: "flex-start",
    flexDirection: "row",
    gap: spacing.xs,
    minHeight: componentSizes.touchTarget,
  },
  inlineActionText: {
    color: colors.forest,
    fontFamily: getFontFamily("semibold"),
    fontSize: typography.sizes.caption,
  },
  performanceCard: {
    backgroundColor: colors.white,
    borderColor: colors.border,
    borderRadius: radius.card,
    borderWidth: componentSizes.borderWidth,
    padding: spacing.md,
    ...shadows.card,
  },
  performanceHeader: { alignItems: "center", flexDirection: "row", gap: spacing.sm },
  performanceIcon: {
    alignItems: "center",
    backgroundColor: colors.forest,
    borderRadius: radius.iconContainer,
    height: componentSizes.touchTarget,
    justifyContent: "center",
    width: componentSizes.touchTarget,
  },
  performanceValue: {
    color: colors.charcoal,
    fontFamily: getFontFamily("bold"),
    fontSize: typography.sizes.numeric,
  },
  chartPlaceholder: {
    height: componentSizes.routeDecorHeight,
    justifyContent: "space-between",
    marginTop: spacing.md,
    paddingVertical: spacing.sm,
  },
  chartLine: { backgroundColor: colors.border, height: componentSizes.borderWidth },
  chartMessage: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.sm,
    justifyContent: "center",
  },
  chartMessageText: {
    backgroundColor: colors.white,
    color: colors.muted,
    fontFamily: getFontFamily("regular"),
    fontSize: typography.sizes.caption,
  },
  activityCard: {
    alignItems: "center",
    backgroundColor: colors.white,
    borderColor: colors.border,
    borderRadius: radius.card,
    borderWidth: componentSizes.borderWidth,
    flexDirection: "row",
    gap: spacing.md,
    padding: spacing.md,
    ...shadows.card,
  },
  activityMarker: {
    alignItems: "center",
    backgroundColor: colors.lime,
    borderRadius: radius.pill,
    height: componentSizes.touchTarget,
    justifyContent: "center",
    width: componentSizes.touchTarget,
  },
  tasksIntro: { marginBottom: spacing.md, marginTop: spacing.lg },
});
