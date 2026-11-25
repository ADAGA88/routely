import type { ReactElement } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { designTokens, getFontFamily } from "@routely/design-tokens";
import {
  PageContainer,
  RoutelyButton,
  RoutelyIcon,
  useAppearance,
  type RoutelyIconName,
} from "@routely/ui-mobile";

const { colors, componentSizes, radius, shadows, spacing, typography } = designTokens;

const verificationAreas: { description: string; icon: RoutelyIconName; title: string }[] = [
  {
    title: "Identity profile",
    description: "Personal details and identity records.",
    icon: "user",
  },
  {
    title: "Rider documents",
    description: "Rider information and supporting records.",
    icon: "clipboardList",
  },
  {
    title: "Motorcycle details",
    description: "Motorcycle information associated with your account.",
    icon: "motorcycle",
  },
];

const bikeJourney: { description: string; icon: RoutelyIconName; title: string }[] = [
  {
    title: "Agent-assisted verification",
    description: "Verification with an agent is planned, but not connected yet.",
    icon: "users",
  },
  {
    title: "Explore the bikes",
    description: "Browse sample motorcycles anytime. Listings are not live.",
    icon: "motorcycle",
  },
  {
    title: "Bike assignment",
    description: "Planned after verification. A bike is not guaranteed.",
    icon: "shield",
  },
];

export function VerificationScreen(): ReactElement {
  const router = useRouter();
  const { mode } = useAppearance();
  const accent = designTokens.appearance[mode];

  return (
    <View style={styles.page}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <PageContainer maxWidth={720}>
          <View style={styles.header}>
            <Pressable
              accessibilityLabel="Go back"
              accessibilityRole="button"
              onPress={() => (router.canGoBack() ? router.back() : router.replace("/dashboard"))}
              style={styles.backButton}
            >
              <RoutelyIcon color={colors.forest} name="arrowLeft" />
            </Pressable>
            <View style={styles.flex}>
              <Text accessibilityRole="header" style={styles.pageTitle}>
                Rider verification
              </Text>
              <Text style={styles.headerSubtitle}>Your account and document overview.</Text>
            </View>
          </View>

          <View style={[styles.statusCard, { backgroundColor: accent.primary }]}>
            <View
              pointerEvents="none"
              style={[styles.statusDecoration, { borderColor: accent.onPrimary }]}
            />
            <View style={styles.statusHeading}>
              <View style={[styles.statusIcon, { backgroundColor: accent.onPrimary }]}>
                <RoutelyIcon color={accent.primary} name="shield" size={componentSizes.iconLarge} />
              </View>
              <View style={styles.flex}>
                <Text style={[styles.statusEyebrow, { color: accent.onPrimary }]}>
                  ACCOUNT STATUS
                </Text>
                <Text
                  accessibilityRole="header"
                  style={[styles.statusTitle, { color: accent.onPrimary }]}
                >
                  Status unavailable
                </Text>
              </View>
            </View>
            <Text style={[styles.statusDescription, { color: accent.onPrimary }]}>
              Status and eligibility cannot be confirmed until verification is connected.
            </Text>
            <Text style={[styles.statusFootnote, { color: accent.onPrimary }]}>
              No approval or delivery access is granted.
            </Text>
          </View>

          <View style={styles.sectionHeading}>
            <View style={styles.flex}>
              <Text accessibilityRole="header" style={styles.sectionTitle}>
                Your road to a bike
              </Text>
              <Text style={styles.sectionSubtitle}>
                A look at the planned journey, not your progress.
              </Text>
            </View>
            <View style={styles.sectionIcon}>
              <RoutelyIcon color={colors.forest} name="motorcycle" />
            </View>
          </View>

          <View style={styles.journeyCard}>
            <View style={styles.journeyHeading}>
              <View style={[styles.journeyHeadingIcon, { backgroundColor: accent.primary }]}>
                <RoutelyIcon
                  color={accent.onPrimary}
                  name="motorcycle"
                  size={componentSizes.iconLarge}
                />
              </View>
              <View style={styles.flex}>
                <Text style={styles.eyebrow}>BIKE JOURNEY</Text>
                <Text style={styles.journeyTitle}>The road ahead</Text>
              </View>
            </View>
            <View style={styles.journeySteps}>
              {bikeJourney.map((step, index) => (
                <View key={step.title} style={styles.journeyRow}>
                  <View style={[styles.stepIcon, { backgroundColor: accent.primary }]}>
                    <RoutelyIcon
                      color={accent.onPrimary}
                      name={step.icon}
                      size={componentSizes.iconLarge}
                    />
                  </View>
                  <View style={styles.flex}>
                    <Text style={styles.stepLabel}>
                      {String(index + 1).padStart(2, "0")} · THE JOURNEY
                    </Text>
                    <Text style={styles.stepTitle}>{step.title}</Text>
                    <Text style={styles.rowDescription}>{step.description}</Text>
                  </View>
                </View>
              ))}
              <View style={styles.journeyNote}>
                <RoutelyIcon color={colors.forest} name="shield" size={componentSizes.iconSmall} />
                <Text style={styles.journeyNoteText}>
                  Requirements and the final process are not yet available.
                </Text>
              </View>
              <RoutelyButton
                fullWidth
                label="Explore sample bikes"
                onPress={() => router.push("/bikes")}
                trailingIcon="arrowRight"
              />
            </View>
          </View>

          <View style={styles.sectionHeading}>
            <View style={styles.flex}>
              <Text accessibilityRole="header" style={styles.sectionTitle}>
                Verification areas
              </Text>
              <Text style={styles.sectionSubtitle}>Requirements have not been configured.</Text>
            </View>
            <View style={styles.sectionIcon}>
              <RoutelyIcon color={colors.forest} name="clipboardList" />
            </View>
          </View>

          <View style={styles.areasCard}>
            {verificationAreas.map((area) => (
              <View key={area.title} style={styles.areaRow}>
                <View style={styles.areaIcon}>
                  <RoutelyIcon
                    color={colors.forest}
                    name={area.icon}
                    size={componentSizes.iconLarge}
                  />
                </View>
                <View style={styles.flex}>
                  <Text style={styles.rowTitle}>{area.title}</Text>
                  <Text style={styles.rowDescription}>{area.description}</Text>
                  <View style={styles.unavailableBadge}>
                    <Text style={styles.unavailable}>Unavailable</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>

          <View style={styles.submission}>
            <RoutelyButton
              accessibilityLabel="Submit documents. Verification is not connected yet."
              disabled
              fullWidth
              label="Document submission unavailable"
              variant="secondary"
            />
            <Text style={styles.submissionNote}>
              Verification requirements and secure document submission will appear here when
              configured.
            </Text>
          </View>
        </PageContainer>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { backgroundColor: colors.white, flex: 1 },
  scrollContent: { flexGrow: 1, paddingBottom: spacing.xl },
  flex: { flex: 1 },
  header: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  backButton: {
    alignItems: "center",
    backgroundColor: colors.container,
    borderRadius: radius.pill,
    height: componentSizes.touchTarget,
    justifyContent: "center",
    width: componentSizes.touchTarget,
  },
  pageTitle: {
    color: colors.charcoal,
    fontFamily: getFontFamily("bold"),
    fontSize: typography.sizes.heading,
    lineHeight: typography.lineHeights.heading,
  },
  headerSubtitle: {
    color: colors.forest,
    fontFamily: getFontFamily("regular"),
    fontSize: typography.sizes.caption,
    marginTop: spacing.xs,
  },
  statusCard: {
    borderRadius: radius.panel,
    marginTop: spacing.lg,
    overflow: "hidden",
    padding: spacing.lg,
    ...shadows.card,
  },
  statusDecoration: {
    borderRadius: radius.pill,
    borderWidth: spacing.md,
    height: spacing["3xl"] * 3,
    opacity: 0.1,
    position: "absolute",
    right: -spacing["3xl"],
    top: -spacing["3xl"],
    width: spacing["3xl"] * 3,
  },
  statusHeading: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.md,
  },
  statusIcon: {
    alignItems: "center",
    borderRadius: radius.lg,
    height: componentSizes.buttonHeight,
    justifyContent: "center",
    width: componentSizes.buttonHeight,
  },
  statusEyebrow: {
    fontFamily: getFontFamily("semibold"),
    fontSize: typography.sizes.caption,
    letterSpacing: typography.letterSpacing.brand,
  },
  statusTitle: {
    fontFamily: getFontFamily("bold"),
    fontSize: typography.sizes.sectionHeading,
    lineHeight: typography.lineHeights.sectionHeading,
    marginTop: spacing.xs,
  },
  statusDescription: {
    fontFamily: getFontFamily("regular"),
    fontSize: typography.sizes.label,
    lineHeight: typography.lineHeights.supporting,
    marginTop: spacing.sm,
  },
  statusFootnote: {
    fontFamily: getFontFamily("medium"),
    fontSize: typography.sizes.caption,
    lineHeight: typography.lineHeights.footnote,
    marginTop: spacing.sm,
  },
  sectionHeading: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.sm,
    marginTop: spacing.xl,
  },
  sectionTitle: {
    color: colors.charcoal,
    fontFamily: getFontFamily("bold"),
    fontSize: typography.sizes.sectionHeading,
    lineHeight: typography.lineHeights.sectionHeading,
  },
  sectionSubtitle: {
    color: colors.forest,
    fontFamily: getFontFamily("regular"),
    fontSize: typography.sizes.caption,
    lineHeight: typography.lineHeights.footnote,
    marginTop: spacing.xs,
  },
  sectionIcon: {
    alignItems: "center",
    backgroundColor: colors.container,
    borderRadius: radius.pill,
    height: componentSizes.touchTarget,
    justifyContent: "center",
    width: componentSizes.touchTarget,
  },
  journeyCard: {
    backgroundColor: colors.container,
    borderColor: colors.border,
    borderRadius: radius.panel,
    borderWidth: componentSizes.borderWidth,
    marginTop: spacing.md,
    padding: spacing.md,
    ...shadows.card,
  },
  journeyHeading: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.md,
    paddingHorizontal: spacing.xs,
    paddingVertical: spacing.sm,
  },
  journeyHeadingIcon: {
    alignItems: "center",
    borderRadius: radius.lg,
    height: componentSizes.buttonHeight,
    justifyContent: "center",
    width: componentSizes.buttonHeight,
  },
  journeyTitle: {
    color: colors.charcoal,
    fontFamily: getFontFamily("bold"),
    fontSize: typography.sizes.cardHeading,
    lineHeight: typography.lineHeights.cardHeading,
    marginTop: spacing.xs,
  },
  journeySteps: { gap: spacing.sm, marginTop: spacing.md },
  eyebrow: {
    color: colors.forest,
    fontFamily: getFontFamily("semibold"),
    fontSize: typography.sizes.caption,
    letterSpacing: typography.letterSpacing.brand,
  },
  journeyRow: {
    alignItems: "flex-start",
    backgroundColor: colors.white,
    borderColor: colors.border,
    borderRadius: radius.card,
    borderWidth: componentSizes.borderWidth,
    flexDirection: "row",
    gap: spacing.md,
    padding: spacing.md,
  },
  stepIcon: {
    alignItems: "center",
    borderRadius: radius.lg,
    height: componentSizes.buttonHeight,
    justifyContent: "center",
    width: componentSizes.buttonHeight,
  },
  stepLabel: {
    color: colors.forest,
    fontFamily: getFontFamily("semibold"),
    fontSize: typography.sizes.caption,
    letterSpacing: typography.letterSpacing.brand,
  },
  stepTitle: {
    color: colors.charcoal,
    fontFamily: getFontFamily("semibold"),
    fontSize: typography.sizes.label,
    lineHeight: typography.lineHeights.supporting,
    marginTop: spacing.xs,
  },
  rowTitle: {
    color: colors.charcoal,
    fontFamily: getFontFamily("semibold"),
    fontSize: typography.sizes.label,
  },
  rowDescription: {
    color: colors.forest,
    fontFamily: getFontFamily("regular"),
    fontSize: typography.sizes.caption,
    lineHeight: typography.lineHeights.footnote,
    marginTop: spacing.xs,
  },
  journeyNote: {
    alignItems: "flex-start",
    backgroundColor: colors.white,
    borderRadius: radius.md,
    flexDirection: "row",
    gap: spacing.sm,
    marginTop: spacing.sm,
    padding: spacing.md,
  },
  journeyNoteText: {
    color: colors.forest,
    flex: 1,
    fontFamily: getFontFamily("regular"),
    fontSize: typography.sizes.caption,
    lineHeight: typography.lineHeights.footnote,
  },
  areasCard: {
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  areaRow: {
    alignItems: "flex-start",
    backgroundColor: colors.white,
    borderColor: colors.border,
    borderRadius: radius.card,
    borderWidth: componentSizes.borderWidth,
    flexDirection: "row",
    gap: spacing.md,
    padding: spacing.md,
    ...shadows.card,
  },
  areaIcon: {
    alignItems: "center",
    backgroundColor: colors.container,
    borderRadius: radius.lg,
    height: componentSizes.buttonHeight,
    justifyContent: "center",
    width: componentSizes.buttonHeight,
  },
  unavailableBadge: {
    alignSelf: "flex-start",
    backgroundColor: colors.container,
    borderRadius: radius.pill,
    marginTop: spacing.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  unavailable: {
    color: colors.forest,
    fontFamily: getFontFamily("semibold"),
    fontSize: typography.sizes.caption,
  },
  submission: { marginTop: spacing.lg },
  submissionNote: {
    color: colors.forest,
    fontFamily: getFontFamily("regular"),
    fontSize: typography.sizes.caption,
    lineHeight: typography.lineHeights.footnote,
    marginTop: spacing.sm,
    textAlign: "center",
  },
});
