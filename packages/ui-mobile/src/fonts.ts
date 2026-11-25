import { useFonts } from "expo-font";
import poppinsRegular from "@routely/brand-assets/fonts/poppins-400.ttf";
import poppinsMedium from "@routely/brand-assets/fonts/poppins-500.ttf";
import poppinsSemibold from "@routely/brand-assets/fonts/poppins-600.ttf";
import poppinsBold from "@routely/brand-assets/fonts/poppins-700.ttf";

export function useRoutelyFonts(): [boolean, Error | null] {
  return useFonts({
    Poppins_400Regular: poppinsRegular,
    Poppins_500Medium: poppinsMedium,
    Poppins_600SemiBold: poppinsSemibold,
    Poppins_700Bold: poppinsBold,
  });
}
