import { useLocalSearchParams, useRouter } from "expo-router";
import { BikeDetailsScreen } from "../src/features/bikes/bike-details-screen";
import { getBikePreview } from "../src/features/bikes/bike-preview";

export default function BikeDetailsRoute() {
  const router = useRouter();
  const { bikeId } = useLocalSearchParams<{ bikeId?: string | string[] }>();
  const bike = typeof bikeId === "string" ? getBikePreview(bikeId) : undefined;

  function goBack() {
    if (router.canGoBack()) router.back();
    else router.replace("/bikes");
  }

  return <BikeDetailsScreen bike={bike} onBack={goBack} />;
}
