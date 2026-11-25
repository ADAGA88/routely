export interface DeliveryRequestPreview {
  id: string;
  pickup: string;
  drop: string;
  distance: string;
  duration: string;
  earnings: string;
  package: string;
}

export const requestPreview: DeliveryRequestPreview = {
  id: "kuje-apo",
  pickup: "Kuje Mall",
  drop: "Apo Primary",
  distance: "12.4 km",
  duration: "35 min",
  earnings: "₦2,500",
  package: "Small parcel",
};

export const availableRequestPreviews: readonly DeliveryRequestPreview[] = [
  requestPreview,
  {
    id: "wuse-garki",
    pickup: "Wuse Market",
    drop: "Garki Area 10",
    distance: "7.8 km",
    duration: "24 min",
    earnings: "₦1,900",
    package: "Document envelope",
  },
  {
    id: "jabi-maitama",
    pickup: "Jabi Lake Mall",
    drop: "Maitama Clinic",
    distance: "9.3 km",
    duration: "28 min",
    earnings: "₦2,200",
    package: "Medium parcel",
  },
];

export function getDeliveryRequestPreview(id: string): DeliveryRequestPreview | undefined {
  return availableRequestPreviews.find((request) => request.id === id);
}
