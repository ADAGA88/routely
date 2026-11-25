export const journeyStages = [
  { id: "to-pickup", label: "To pickup", status: "Heading to pickup", action: "Arrived at pickup" },
  { id: "pickup", label: "Pickup", status: "At pickup", action: "Confirm pickup" },
  {
    id: "drop-off",
    label: "Drop-off",
    status: "Heading to drop-off",
    action: "Arrived at drop-off",
  },
  { id: "complete", label: "Complete", status: "Delivery complete", action: null },
] as const;

export type JourneyStage = (typeof journeyStages)[number]["id"];
