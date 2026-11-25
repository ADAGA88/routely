export const deliveryHistoryPreview = [
  {
    id: "garki-wuse",
    date: "12 Nov",
    pickup: "Garki",
    drop: "Wuse",
    status: "Completed",
    earnings: "₦2,400",
  },
  {
    id: "lugbe-gwarinpa",
    date: "08 Nov",
    pickup: "Lugbe",
    drop: "Gwarinpa",
    status: "Cancelled",
    earnings: null,
  },
] as const;

export type DeliveryHistoryPreview = (typeof deliveryHistoryPreview)[number];

export function getDeliveryHistoryPreview(id: string): DeliveryHistoryPreview | undefined {
  return deliveryHistoryPreview.find((delivery) => delivery.id === id);
}
