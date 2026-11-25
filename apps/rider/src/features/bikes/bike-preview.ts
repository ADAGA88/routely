export const sampleBikes = [
  { id: "city", name: "City motorcycle" },
  { id: "delivery", name: "Delivery motorcycle" },
] as const;

export type BikePreview = (typeof sampleBikes)[number];

export function getBikePreview(id: string): BikePreview | undefined {
  return sampleBikes.find((bike) => bike.id === id);
}
