import { useEffect, useState, type ReactElement } from "react";
import { Image, Platform, StyleSheet, Text, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { designTokens, getFontFamily } from "@routely/design-tokens";
import { RoutelyButton, RoutelyIcon } from "@routely/ui-mobile";

const { colors, componentSizes, radius, spacing, typography } = designTokens;

export function ParcelPhoto({
  photoUri,
  onChange,
}: {
  photoUri: string | null;
  onChange: (uri: string | null) => void;
}): ReactElement {
  const [error, setError] = useState("");

  useEffect(() => {
    if (Platform.OS !== "android") return;
    let active = true;
    void ImagePicker.getPendingResultAsync()
      .then((result) => {
        if (!active || !result) return;
        if (!("canceled" in result)) {
          setError("The previous photo could not be restored. Please choose it again.");
        } else if (!result.canceled) {
          const image = result.assets[0];
          if (
            image &&
            image.width > 0 &&
            image.height > 0 &&
            (!image.type || image.type === "image")
          ) {
            onChange(image.uri);
          } else {
            setError("The previous photo could not be opened. Please choose it again.");
          }
        }
      })
      .catch(() => {
        if (active) setError("The previous photo could not be restored. Please choose it again.");
      });
    return () => {
      active = false;
    };
  }, [onChange]);

  async function pickPhoto(source: "camera" | "library") {
    setError("");
    try {
      if (Platform.OS !== "web" && source === "camera") {
        const permission = await ImagePicker.requestCameraPermissionsAsync();
        if (!permission.granted) {
          setError("Camera access is needed to take a parcel photo. Check your device settings.");
          return;
        }
      }
      const options: ImagePicker.ImagePickerOptions = { mediaTypes: ["images"], quality: 0.8 };
      const result =
        source === "camera"
          ? await ImagePicker.launchCameraAsync(options)
          : await ImagePicker.launchImageLibraryAsync(options);
      if (result.canceled) return;
      const image = result.assets[0];
      if (
        !image ||
        image.width <= 0 ||
        image.height <= 0 ||
        (image.type && image.type !== "image")
      ) {
        if (Platform.OS === "web" && image?.uri.startsWith("blob:")) {
          URL.revokeObjectURL(image.uri);
        }
        setError("That image could not be opened. Please choose another photo.");
        return;
      }
      onChange(image.uri);
    } catch {
      setError("The photo picker could not be opened. Please try again or check device settings.");
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <View style={styles.iconBox}>
          <RoutelyIcon name="package" />
        </View>
        <View style={styles.flex}>
          <Text style={styles.title}>
            Parcel photo <Text style={styles.optional}>(optional)</Text>
          </Text>
          <Text style={styles.hint}>Take or choose a photo to review with your details.</Text>
        </View>
      </View>
      {photoUri ? (
        <Image
          accessibilityLabel="Selected parcel photo"
          source={{ uri: photoUri }}
          resizeMode="cover"
          style={styles.image}
        />
      ) : null}
      <View style={styles.actions}>
        <RoutelyButton
          fullWidth
          label="Take a photo"
          onPress={() => void pickPhoto("camera")}
          variant="secondary"
        />
        <RoutelyButton
          fullWidth
          label="Choose a photo"
          onPress={() => void pickPhoto("library")}
          variant="secondary"
        />
        {photoUri ? (
          <RoutelyButton
            fullWidth
            label="Remove photo"
            onPress={() => onChange(null)}
            variant="quiet"
          />
        ) : null}
      </View>
      <Text style={styles.hint}>
        Photos stay on this device temporarily and are not uploaded. Use a sample photo.
      </Text>
      {error ? (
        <Text accessibilityLiveRegion="polite" style={styles.error}>
          {error}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    borderRadius: radius.lg,
    gap: spacing.md,
    padding: spacing.md,
  },
  heading: { alignItems: "center", flexDirection: "row", gap: spacing.sm },
  flex: { flex: 1 },
  iconBox: {
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    height: componentSizes.touchTarget,
    justifyContent: "center",
    width: componentSizes.touchTarget,
  },
  title: {
    color: colors.charcoal,
    fontFamily: getFontFamily("semibold"),
    fontSize: typography.sizes.label,
  },
  optional: { color: colors.muted, fontFamily: getFontFamily("regular") },
  hint: {
    color: colors.muted,
    fontFamily: getFontFamily("regular"),
    fontSize: typography.sizes.caption,
    lineHeight: typography.lineHeights.footnote,
  },
  image: { borderRadius: radius.md, height: componentSizes.routeHeight, width: "100%" },
  actions: { gap: spacing.sm },
  error: {
    color: colors.error,
    fontFamily: getFontFamily("regular"),
    fontSize: typography.sizes.caption,
    lineHeight: typography.lineHeights.footnote,
  },
});
