import { useCallback, useEffect, useRef, useState, type ReactElement } from "react";
import {
  BackHandler,
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useFocusEffect, useRouter } from "expo-router";
import { designTokens, getFontFamily } from "@routely/design-tokens";
import {
  AppearanceSwitch,
  PageContainer,
  RoutelyButton,
  RoutelyIcon,
  RoutelyTextField,
  useAppearance,
} from "@routely/ui-mobile";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import quickSend from "../../../assets/illustrations/quick-send.png";
import { CounterofferForm } from "./counteroffer-form";
import { DeliveryModePicker, type DeliveryMode } from "./delivery-mode-picker";
import { examplePricing, formatExamplePrice, isExamplePriceInRange } from "./example-pricing";
import { ParcelPhoto } from "./parcel-photo";

const { colors, componentSizes, radius, shadows, spacing, typography } = designTokens;
const customSteps = ["Route", "Parcel", "Review", "Price", "Offers"] as const;
const simpleSteps = ["Route", "Parcel", "Review", "Price"] as const;
type Step = 0 | 1 | 2 | 3 | 4;

export function SendPackageScreen(): ReactElement {
  const router = useRouter();
  const { mode } = useAppearance();
  const accent = designTokens.appearance[mode];
  const insets = useSafeAreaInsets();
  const scrollRef = useRef<ScrollView>(null);
  const [deliveryMode, setDeliveryMode] = useState<DeliveryMode | null>(null);
  const [step, setStep] = useState<Step>(0);
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [senderPhone, setSenderPhone] = useState("");
  const [receiverPhone, setReceiverPhone] = useState("");
  const [description, setDescription] = useState("");
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [price, setPrice] = useState("");
  const [selectedOffer, setSelectedOffer] = useState<"original" | "counter" | null>(null);
  const [attempted, setAttempted] = useState(false);
  const validPrice = isExamplePriceInRange(price);
  const steps = deliveryMode === "simple" ? simpleSteps : customSteps;
  const exampleCounteroffer =
    Number(price) < examplePricing.maximum
      ? Math.min(Number(price) + 100, examplePricing.maximum)
      : Number(price) - 100;

  useEffect(() => {
    scrollRef.current?.scrollTo({ y: 0, animated: false });
  }, [deliveryMode, step]);

  useEffect(() => {
    return () => {
      if (Platform.OS === "web" && photoUri?.startsWith("blob:")) URL.revokeObjectURL(photoUri);
    };
  }, [photoUri]);

  function previousStep(current: Exclude<Step, 0>): Step {
    if (current === 4) return 3;
    if (current === 3) return 2;
    if (current === 2) return 1;
    return 0;
  }

  function goBack() {
    setAttempted(false);
    if (!deliveryMode) {
      if (router.canGoBack()) router.back();
      else router.replace("/dashboard");
    } else if (step !== 0) setStep(previousStep(step));
    else setDeliveryMode(null);
  }

  useFocusEffect(
    useCallback(() => {
      if (!deliveryMode) return;
      const subscription = BackHandler.addEventListener("hardwareBackPress", () => {
        setAttempted(false);
        if (step === 0) setDeliveryMode(null);
        else setStep(previousStep(step));
        return true;
      });
      return () => subscription.remove();
    }, [deliveryMode, step]),
  );

  function continueFlow() {
    setAttempted(true);
    if (
      step === 0 &&
      pickup.trim() &&
      dropoff.trim() &&
      senderPhone.trim() &&
      receiverPhone.trim()
    ) {
      setAttempted(false);
      setStep(1);
    } else if (step === 1 && description.trim()) {
      setAttempted(false);
      setStep(2);
    } else if (step === 3 && validPrice) {
      setAttempted(false);
      setSelectedOffer(null);
      setStep(4);
    }
  }

  return (
    <View style={styles.page}>
      <View style={styles.header}>
        <AppearanceSwitch
          leading={
            <Pressable
              accessibilityLabel="Go back"
              accessibilityRole="button"
              onPress={goBack}
              style={styles.back}
            >
              <RoutelyIcon name="arrowLeft" />
            </Pressable>
          }
        />
      </View>
      <ScrollView
        ref={scrollRef}
        accessibilityLabel="Send package content"
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: Math.max(insets.bottom, spacing.lg) },
        ]}
        focusable={Platform.OS === "web" ? true : undefined}
        keyboardShouldPersistTaps="handled"
        style={styles.scroll}
      >
        <PageContainer maxWidth={componentSizes.appShellMaxWidth}>
          {!deliveryMode ? (
            <DeliveryModePicker
              onSelect={(mode) => {
                setDeliveryMode(mode);
                setPrice("");
                setSelectedOffer(null);
                setAttempted(false);
              }}
            />
          ) : (
            <>
              <Text style={styles.eyebrow}>SEND A PACKAGE</Text>
              <Text accessibilityRole="header" style={styles.title}>
                {step === 0
                  ? "Where are we going?"
                  : step === 1
                    ? "Tell us about it"
                    : step === 2
                      ? "Take a look"
                      : step === 3
                        ? deliveryMode === "simple"
                          ? "Choose a price"
                          : "Offer your price"
                        : "Explore offers"}
              </Text>
              <Text style={styles.subtitle}>
                {step === 0
                  ? "Add pickup and drop-off details, including contact numbers."
                  : step === 1
                    ? "Add a short description of your package."
                    : step === 2
                      ? "Review the details you entered."
                      : step === 3
                        ? deliveryMode === "simple"
                          ? "Choose an example price and let Routely handle assignment."
                          : "Choose an amount within the example range."
                        : "See how choosing a rider could work."}
              </Text>

              <View
                accessibilityLabel={`Step ${step + 1} of ${steps.length}: ${steps[step]}`}
                style={styles.progress}
              >
                {steps.map((label, index) => (
                  <View key={label} style={styles.progressItem}>
                    <View
                      style={[
                        styles.progressBar,
                        { backgroundColor: index <= step ? accent.primary : colors.border },
                      ]}
                    />
                    <Text style={[styles.progressLabel, index === step && styles.progressActive]}>
                      {label}
                    </Text>
                  </View>
                ))}
              </View>

              <View style={[styles.featureCard, { backgroundColor: accent.primary }]}>
                <View style={styles.featureCopy}>
                  <Text style={[styles.featureEyebrow, { color: accent.onPrimary }]}>
                    THOUGHTFULLY DELIVERED
                  </Text>
                  <Text style={[styles.featureTitle, { color: accent.onPrimary }]}>
                    Your package,{"\n"}our priority.
                  </Text>
                  <Text style={[styles.featureText, { color: accent.onPrimary }]}>
                    A little detail goes a long way.
                  </Text>
                </View>
                <Image
                  accessibilityElementsHidden
                  importantForAccessibility="no-hide-descendants"
                  source={quickSend}
                  resizeMode="contain"
                  style={styles.illustration}
                />
              </View>

              <View style={styles.formCard}>
                <View style={styles.formHeading}>
                  <View style={styles.iconBox}>
                    <RoutelyIcon
                      name={
                        step === 0
                          ? "mapPin"
                          : step === 1
                            ? "package"
                            : step === 3
                              ? "wallet"
                              : step === 4
                                ? "users"
                                : "clipboardList"
                      }
                    />
                  </View>
                  <View style={styles.flex}>
                    <Text style={styles.cardTitle}>
                      {step === 0
                        ? "Your route"
                        : step === 1
                          ? "Package details"
                          : step === 2
                            ? "Delivery details"
                            : step === 3
                              ? deliveryMode === "simple"
                                ? "Suggested prices"
                                : "Your offer"
                              : "Example rider offers"}
                    </Text>
                    <Text style={styles.cardSubtitle}>
                      {step === 0
                        ? "From pickup to destination"
                        : step === 1
                          ? "Keep it simple and clear"
                          : step === 2
                            ? "Nothing has been booked"
                            : step === 3
                              ? "Illustrative amounts only"
                              : "These are not real riders"}
                    </Text>
                  </View>
                </View>
                {step === 0 ? (
                  <View style={styles.fields}>
                    <RoutelyTextField
                      label="Pickup address"
                      placeholder="Enter pickup address"
                      value={pickup}
                      onChangeText={setPickup}
                      autoComplete="off"
                      error={attempted && !pickup.trim() ? "Enter a pickup address." : undefined}
                    />
                    <RoutelyTextField
                      label="Sender phone number"
                      placeholder="Enter sender phone number"
                      value={senderPhone}
                      onChangeText={setSenderPhone}
                      keyboardType="phone-pad"
                      autoComplete="off"
                      error={
                        attempted && !senderPhone.trim()
                          ? "Enter a sender phone number."
                          : undefined
                      }
                    />
                    <RoutelyTextField
                      label="Drop-off address"
                      placeholder="Enter drop-off address"
                      value={dropoff}
                      onChangeText={setDropoff}
                      autoComplete="off"
                      error={attempted && !dropoff.trim() ? "Enter a drop-off address." : undefined}
                    />
                    <RoutelyTextField
                      label="Receiver phone number"
                      placeholder="Enter receiver phone number"
                      value={receiverPhone}
                      onChangeText={setReceiverPhone}
                      keyboardType="phone-pad"
                      autoComplete="off"
                      error={
                        attempted && !receiverPhone.trim()
                          ? "Enter a receiver phone number."
                          : undefined
                      }
                    />
                  </View>
                ) : step === 1 ? (
                  <View style={styles.fields}>
                    <RoutelyTextField
                      label="Package description"
                      placeholder="What are you sending?"
                      value={description}
                      onChangeText={setDescription}
                      autoComplete="off"
                      error={
                        attempted && !description.trim()
                          ? "Enter a package description."
                          : undefined
                      }
                    />
                    <ParcelPhoto photoUri={photoUri} onChange={setPhotoUri} />
                  </View>
                ) : step === 2 ? (
                  <View style={styles.review}>
                    <ReviewItem label="Pickup" value={pickup.trim()} icon="mapPin" />
                    <ReviewItem
                      label="Sender phone number"
                      value={senderPhone.trim()}
                      icon="user"
                    />
                    <ReviewItem label="Drop-off" value={dropoff.trim()} icon="mapPin" />
                    <ReviewItem
                      label="Receiver phone number"
                      value={receiverPhone.trim()}
                      icon="user"
                    />
                    <ReviewItem label="Package" value={description.trim()} icon="package" />
                    {photoUri ? (
                      <Image
                        accessibilityLabel="Selected parcel photo"
                        source={{ uri: photoUri }}
                        resizeMode="cover"
                        style={styles.reviewPhoto}
                      />
                    ) : null}
                  </View>
                ) : step === 3 ? (
                  <View style={styles.fields}>
                    <Text style={styles.helpText}>
                      Example range: {formatExamplePrice(examplePricing.minimum)}–
                      {formatExamplePrice(examplePricing.maximum)}. These fixed sample amounts are
                      not based on your route and are not a quote.
                    </Text>
                    {deliveryMode === "simple" ? (
                      <View style={styles.offers}>
                        {[
                          examplePricing.minimum,
                          examplePricing.suggested,
                          examplePricing.maximum,
                        ].map((amount) => (
                          <Pressable
                            key={amount}
                            accessibilityRole="button"
                            accessibilityLabel={`Example price ${formatExamplePrice(amount)}`}
                            accessibilityState={{ selected: price === String(amount) }}
                            aria-pressed={price === String(amount)}
                            onPress={() => setPrice(String(amount))}
                            style={[
                              styles.priceOption,
                              price === String(amount) && styles.offerSelected,
                            ]}
                          >
                            <Text style={styles.cardTitle}>{formatExamplePrice(amount)}</Text>
                            <Text style={styles.cardSubtitle}>
                              {amount === examplePricing.suggested
                                ? "Example suggestion"
                                : "Example option"}
                            </Text>
                          </Pressable>
                        ))}
                      </View>
                    ) : (
                      <RoutelyTextField
                        label="Your offered price (₦)"
                        placeholder="Enter an amount in naira"
                        value={price}
                        onChangeText={setPrice}
                        keyboardType="number-pad"
                        autoComplete="off"
                        maxLength={9}
                        error={
                          attempted && !validPrice
                            ? "Enter a whole-naira amount within the example range."
                            : undefined
                        }
                      />
                    )}
                    <Text style={styles.helpText}>
                      {deliveryMode === "simple"
                        ? "Routely assignment and booking are not connected."
                        : "Enter a whole-naira amount. Real price guidance is not connected."}
                    </Text>
                  </View>
                ) : (
                  <View style={styles.fields}>
                    <Text style={styles.helpText}>
                      Example only: the second offer is an illustrative amount within the sample
                      range. No request has been sent.
                    </Text>
                    <View style={styles.offers}>
                      <OfferCard
                        label="Example rider A"
                        detail="Accepts your offer"
                        amount={Number(price)}
                        selected={selectedOffer === "original"}
                        onPress={() => setSelectedOffer("original")}
                      />
                      <OfferCard
                        label="Example rider B"
                        detail="Suggests another price"
                        amount={exampleCounteroffer}
                        selected={selectedOffer === "counter"}
                        onPress={() => setSelectedOffer("counter")}
                      />
                    </View>
                    {selectedOffer ? (
                      <>
                        <Text accessibilityLiveRegion="polite" style={styles.selectedText}>
                          Example selected. No rider has been assigned.
                        </Text>
                        <CounterofferForm
                          key={selectedOffer}
                          rider={
                            selectedOffer === "original" ? "Example rider A" : "Example rider B"
                          }
                          riderOffer={
                            selectedOffer === "counter" ? exampleCounteroffer : Number(price)
                          }
                        />
                      </>
                    ) : null}
                  </View>
                )}
              </View>

              <View style={styles.notice}>
                <RoutelyIcon color={colors.forest} name="shield" />
                <Text style={styles.noticeText}>
                  Booking and pricing are not connected. Use sample details; entries are not saved
                  or sent.
                </Text>
              </View>
              {step === 4 || (step === 3 && deliveryMode === "simple") ? (
                <View style={styles.bookingActions}>
                  <RoutelyButton fullWidth disabled label="Booking unavailable" />
                  <RoutelyButton
                    fullWidth
                    label="Explore example journey"
                    onPress={() => router.push("/delivery-journey")}
                    trailingIcon="arrowRight"
                    variant="secondary"
                  />
                </View>
              ) : step === 2 ? (
                <RoutelyButton
                  fullWidth
                  label={deliveryMode === "simple" ? "Choose a price" : "Set your price"}
                  onPress={() => setStep(3)}
                  trailingIcon="arrowRight"
                />
              ) : (
                <RoutelyButton
                  fullWidth
                  label={
                    step === 0
                      ? "Continue to package"
                      : step === 1
                        ? "Review details"
                        : "See example offers"
                  }
                  onPress={continueFlow}
                  trailingIcon="arrowRight"
                />
              )}
            </>
          )}
        </PageContainer>
      </ScrollView>
    </View>
  );
}

function OfferCard({
  label,
  detail,
  amount,
  selected,
  onPress,
}: {
  label: string;
  detail: string;
  amount: number;
  selected: boolean;
  onPress: () => void;
}): ReactElement {
  return (
    <Pressable
      accessibilityLabel={`${label}, ${detail}, ${amount} naira`}
      accessibilityRole="button"
      accessibilityState={{ selected }}
      aria-pressed={selected}
      onPress={onPress}
      style={[styles.offerCard, selected && styles.offerSelected]}
    >
      <View style={styles.offerIcon}>
        <RoutelyIcon name="user" />
      </View>
      <View style={styles.flex}>
        <Text style={styles.cardTitle}>{label}</Text>
        <Text style={styles.cardSubtitle}>{detail}</Text>
      </View>
      <Text style={styles.offerAmount}>₦{amount.toLocaleString("en-NG")}</Text>
    </Pressable>
  );
}

function ReviewItem({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: "mapPin" | "package" | "user";
}): ReactElement {
  return (
    <View style={styles.reviewItem}>
      <RoutelyIcon color={colors.forest} name={icon} />
      <View style={styles.flex}>
        <Text style={styles.reviewLabel}>{label}</Text>
        <Text style={styles.reviewValue}>{value}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { backgroundColor: colors.white, flex: 1 },
  header: { alignSelf: "center", maxWidth: componentSizes.appShellMaxWidth, width: "100%" },
  back: {
    alignItems: "center",
    backgroundColor: colors.container,
    borderRadius: radius.pill,
    height: componentSizes.touchTarget,
    justifyContent: "center",
    width: componentSizes.touchTarget,
  },
  scroll: { flex: 1, minHeight: 0 },
  scrollContent: { flexGrow: 1 },
  flex: { flex: 1 },
  eyebrow: {
    color: colors.forest,
    fontFamily: getFontFamily("semibold"),
    fontSize: typography.sizes.eyebrow,
    letterSpacing: typography.letterSpacing.eyebrow,
    marginTop: spacing.md,
  },
  title: {
    color: colors.charcoal,
    fontFamily: getFontFamily("bold"),
    fontSize: typography.sizes.heading,
    lineHeight: typography.lineHeights.heading,
    marginTop: spacing.xs,
  },
  subtitle: {
    color: colors.muted,
    fontFamily: getFontFamily("regular"),
    fontSize: typography.sizes.label,
    lineHeight: typography.lineHeights.supporting,
    marginTop: spacing.xs,
  },
  progress: { flexDirection: "row", gap: spacing.sm, marginTop: spacing.lg },
  progressItem: { flex: 1, gap: spacing.xs },
  progressBar: { borderRadius: radius.pill, height: componentSizes.indicator },
  progressLabel: {
    color: colors.muted,
    fontFamily: getFontFamily("medium"),
    fontSize: typography.sizes.caption,
  },
  progressActive: { color: colors.forest, fontFamily: getFontFamily("semibold") },
  featureCard: {
    alignItems: "center",
    borderRadius: radius.panel,
    flexDirection: "row",
    marginTop: spacing.lg,
    overflow: "hidden",
    padding: spacing.md,
    ...shadows.card,
  },
  featureCopy: { flex: 1 },
  featureEyebrow: {
    fontFamily: getFontFamily("semibold"),
    fontSize: typography.sizes.eyebrow,
    letterSpacing: typography.letterSpacing.brand,
  },
  featureTitle: {
    fontFamily: getFontFamily("bold"),
    fontSize: typography.sizes.sectionHeading,
    lineHeight: typography.lineHeights.sectionHeading,
    marginTop: spacing.xs,
  },
  featureText: {
    fontFamily: getFontFamily("regular"),
    fontSize: typography.sizes.caption,
    lineHeight: typography.lineHeights.caption,
    marginTop: spacing.sm,
  },
  illustration: {
    borderRadius: radius.lg,
    height: componentSizes.routeDecorHeight,
    width: componentSizes.routeDecorHeight,
  },
  formCard: {
    backgroundColor: colors.white,
    borderColor: colors.border,
    borderRadius: radius.panel,
    borderWidth: componentSizes.borderWidth,
    marginTop: spacing.lg,
    padding: spacing.md,
    ...shadows.card,
  },
  formHeading: { alignItems: "center", flexDirection: "row", gap: spacing.md },
  iconBox: {
    alignItems: "center",
    backgroundColor: colors.container,
    borderRadius: radius.lg,
    height: componentSizes.touchTarget,
    justifyContent: "center",
    width: componentSizes.touchTarget,
  },
  cardTitle: {
    color: colors.charcoal,
    fontFamily: getFontFamily("semibold"),
    fontSize: typography.sizes.cardHeading,
    lineHeight: typography.lineHeights.cardHeading,
  },
  cardSubtitle: {
    color: colors.muted,
    fontFamily: getFontFamily("regular"),
    fontSize: typography.sizes.caption,
  },
  fields: { gap: spacing.md, marginTop: spacing.lg },
  bookingActions: { gap: spacing.sm },
  reviewPhoto: { borderRadius: radius.md, height: componentSizes.routeHeight, width: "100%" },
  priceOption: {
    backgroundColor: colors.background,
    borderColor: colors.border,
    borderRadius: radius.lg,
    borderWidth: componentSizes.borderWidth,
    padding: spacing.md,
  },
  helpText: {
    color: colors.muted,
    fontFamily: getFontFamily("regular"),
    fontSize: typography.sizes.caption,
    lineHeight: typography.lineHeights.footnote,
  },
  offers: { gap: spacing.sm },
  offerCard: {
    alignItems: "center",
    backgroundColor: colors.background,
    borderColor: colors.border,
    borderRadius: radius.lg,
    borderWidth: componentSizes.borderWidth,
    flexDirection: "row",
    gap: spacing.sm,
    padding: spacing.sm,
  },
  offerSelected: { backgroundColor: colors.container, borderColor: colors.forest },
  offerIcon: {
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: radius.pill,
    height: componentSizes.touchTarget,
    justifyContent: "center",
    width: componentSizes.touchTarget,
  },
  offerAmount: {
    color: colors.forest,
    fontFamily: getFontFamily("bold"),
    fontSize: typography.sizes.label,
  },
  selectedText: {
    color: colors.forest,
    fontFamily: getFontFamily("medium"),
    fontSize: typography.sizes.caption,
    lineHeight: typography.lineHeights.footnote,
  },
  review: { gap: spacing.md, marginTop: spacing.lg },
  reviewItem: { alignItems: "flex-start", flexDirection: "row", gap: spacing.sm },
  reviewLabel: {
    color: colors.muted,
    fontFamily: getFontFamily("medium"),
    fontSize: typography.sizes.caption,
  },
  reviewValue: {
    color: colors.charcoal,
    fontFamily: getFontFamily("semibold"),
    fontSize: typography.sizes.label,
    lineHeight: typography.lineHeights.supporting,
  },
  notice: {
    alignItems: "flex-start",
    backgroundColor: colors.container,
    borderRadius: radius.lg,
    flexDirection: "row",
    gap: spacing.sm,
    marginVertical: spacing.lg,
    padding: spacing.md,
  },
  noticeText: {
    color: colors.forest,
    flex: 1,
    fontFamily: getFontFamily("regular"),
    fontSize: typography.sizes.caption,
    lineHeight: typography.lineHeights.footnote,
  },
});
