import { useEffect, useRef, useState, type ReactElement } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { designTokens, getFontFamily } from "@routely/design-tokens";
import { RoutelyIcon, useAppearance } from "@routely/ui-mobile";
import bikeFront from "../../../assets/illustrations/bike-preview-front.png";
import bikeRear from "../../../assets/illustrations/bike-preview-rear.png";

const { colors, componentSizes, radius, spacing, typography } = designTokens;
const images = [
  { source: bikeFront, label: "Illustrative motorcycle, front three-quarter view" },
  { source: bikeRear, label: "Illustrative motorcycle, rear three-quarter view" },
] as const;

export function BikePreviewGallery(): ReactElement {
  const { mode } = useAppearance();
  const accent = designTokens.appearance[mode];
  const scrollRef = useRef<ScrollView>(null);
  const indexRef = useRef(0);
  const [width, setWidth] = useState(0);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (width > 0) scrollRef.current?.scrollTo({ x: width * indexRef.current, animated: false });
  }, [width]);

  function showImage(nextIndex: number) {
    indexRef.current = nextIndex;
    setIndex(nextIndex);
    scrollRef.current?.scrollTo({ x: width * nextIndex, animated: false });
  }

  return (
    <View
      style={{
        backgroundColor: colors.background,
        borderColor: colors.border,
        borderRadius: radius.panel,
        borderWidth: componentSizes.borderWidth,
        marginTop: spacing.lg,
        overflow: "hidden",
      }}
    >
      <View onLayout={(event) => setWidth(event.nativeEvent.layout.width)}>
        <ScrollView
          accessibilityLabel="Illustrative bike image gallery"
          horizontal
          onScroll={(event) => {
            if (
              width <= 0 ||
              Math.abs(event.nativeEvent.layoutMeasurement.width - width) > 2 ||
              Math.abs(event.nativeEvent.contentSize.width - width * images.length) > 2
            ) {
              return;
            }
            const nextIndex = Math.max(
              0,
              Math.min(images.length - 1, Math.round(event.nativeEvent.contentOffset.x / width)),
            );
            indexRef.current = nextIndex;
            setIndex(nextIndex);
          }}
          pagingEnabled
          ref={scrollRef}
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}
        >
          {width > 0
            ? images.map((image) => (
                <Image
                  accessibilityLabel={image.label}
                  key={image.label}
                  resizeMode="contain"
                  source={image.source}
                  style={{ height: componentSizes.illustrationHeight, width }}
                />
              ))
            : null}
        </ScrollView>
      </View>
      <View
        style={{
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-between",
          padding: spacing.md,
        }}
      >
        <Pressable
          accessibilityLabel="Previous bike image"
          accessibilityRole="button"
          accessibilityState={{ disabled: index === 0 }}
          disabled={index === 0}
          onPress={() => showImage(index - 1)}
          style={{
            alignItems: "center",
            backgroundColor: index === 0 ? colors.container : accent.primary,
            borderRadius: radius.pill,
            height: componentSizes.touchTarget,
            justifyContent: "center",
            width: componentSizes.touchTarget,
          }}
        >
          <RoutelyIcon
            color={index === 0 ? colors.forest : accent.onPrimary}
            name="arrowLeft"
            size={componentSizes.iconSmall}
          />
        </Pressable>
        <Text
          accessibilityLiveRegion="polite"
          style={{
            color: colors.forest,
            fontFamily: getFontFamily("semibold"),
            fontSize: typography.sizes.label,
          }}
        >
          Image {index + 1} of {images.length}
        </Text>
        <Pressable
          accessibilityLabel="Next bike image"
          accessibilityRole="button"
          accessibilityState={{ disabled: index === images.length - 1 }}
          disabled={index === images.length - 1}
          onPress={() => showImage(index + 1)}
          style={{
            alignItems: "center",
            backgroundColor: index === images.length - 1 ? colors.container : accent.primary,
            borderRadius: radius.pill,
            height: componentSizes.touchTarget,
            justifyContent: "center",
            width: componentSizes.touchTarget,
          }}
        >
          <RoutelyIcon
            color={index === images.length - 1 ? colors.forest : accent.onPrimary}
            name="arrowRight"
            size={componentSizes.iconSmall}
          />
        </Pressable>
      </View>
    </View>
  );
}
