import type { RoutelyIconName } from "@routely/ui-mobile";

type DashboardSection = {
  title: string;
  eyebrow: string;
  headline: string;
  introduction: string;
  statusTitle: string;
  statusDescription: string;
  icon: RoutelyIconName;
  actions: { label: string; detail: string; icon: RoutelyIconName }[];
};

export const dashboardSections = {
  tracking: {
    title: "Track delivery",
    eyebrow: "YOUR DELIVERY",
    headline: "Keep every delivery in sight.",
    introduction: "Follow your parcel from pickup to drop-off.",
    statusTitle: "Live tracking unavailable",
    statusDescription: "Your delivery status and location are not connected yet.",
    icon: "mapPin",
    actions: [],
  },
  deliveries: {
    title: "My deliveries",
    eyebrow: "YOUR DELIVERIES",
    headline: "All your journeys, in one place.",
    introduction: "Keep track of current and past deliveries.",
    statusTitle: "Delivery history unavailable",
    statusDescription: "Your delivery requests and history are not connected yet.",
    icon: "package",
    actions: [],
  },
  schedule: {
    title: "Schedule delivery",
    eyebrow: "PLAN AHEAD",
    headline: "A delivery on your time.",
    introduction: "Plan ahead when scheduling becomes available.",
    statusTitle: "Scheduling unavailable",
    statusDescription:
      "Date and time selection is not connected yet. No delivery can be scheduled.",
    icon: "calendar",
    actions: [
      { label: "Choose date and time", detail: "Scheduling is not connected", icon: "calendar" },
    ],
  },
  addresses: {
    title: "Saved addresses",
    eyebrow: "YOUR PLACES",
    headline: "Your regular places, ready when you are.",
    introduction: "Keep pickup and drop-off details close at hand.",
    statusTitle: "Saved addresses unavailable",
    statusDescription: "Address storage is not connected yet. No saved addresses are shown.",
    icon: "mapPin",
    actions: [
      { label: "Add an address", detail: "Address storage is not connected", icon: "mapPin" },
    ],
  },
  support: {
    title: "Help & support",
    eyebrow: "HERE FOR YOU",
    headline: "A little help goes a long way.",
    introduction: "Find the right support for your delivery.",
    statusTitle: "Support unavailable",
    statusDescription: "Support channels are not connected yet. No message will be sent.",
    icon: "headphones",
    actions: [
      { label: "Delivery help", detail: "Support is not connected", icon: "package" },
      { label: "Contact support", detail: "Support is not connected", icon: "headphones" },
    ],
  },
  wallet: {
    title: "Wallet",
    eyebrow: "YOUR WALLET",
    headline: "Your payments, thoughtfully together.",
    introduction: "A clear place for your payment activity.",
    statusTitle: "Balance unavailable",
    statusDescription: "Wallet balances and transactions are not connected yet.",
    icon: "wallet",
    actions: [
      { label: "Add money", detail: "Payments are not connected", icon: "wallet" },
      { label: "Transaction history", detail: "Transactions are not connected", icon: "history" },
    ],
  },
  profile: {
    title: "Profile",
    eyebrow: "YOUR ACCOUNT",
    headline: "Made personal, kept simple.",
    introduction: "Your account details and preferences in one place.",
    statusTitle: "Profile unavailable",
    statusDescription: "Account details and settings are not connected yet.",
    icon: "user",
    actions: [
      { label: "Personal details", detail: "Profile is not connected", icon: "user" },
      { label: "Account & security", detail: "Account settings are not connected", icon: "shield" },
    ],
  },
  offers: {
    title: "Offers & rewards",
    eyebrow: "A LITTLE EXTRA",
    headline: "More to look forward to.",
    introduction: "Discover offers when they become available.",
    statusTitle: "Offers unavailable",
    statusDescription: "Offers and rewards are not connected. No promotion is currently shown.",
    icon: "package",
    actions: [],
  },
  location: {
    title: "Current location",
    eyebrow: "YOUR LOCATION",
    headline: "A better starting point.",
    introduction: "Location can help make pickup details easier to enter.",
    statusTitle: "Location unavailable",
    statusDescription:
      "Location services are not connected. This screen does not request your location.",
    icon: "mapPin",
    actions: [
      { label: "Use current location", detail: "Location is not connected", icon: "mapPin" },
    ],
  },
} as const satisfies Record<string, DashboardSection>;

export type DashboardSectionId = keyof typeof dashboardSections;

export function isDashboardSectionId(value: unknown): value is DashboardSectionId {
  return (
    typeof value === "string" && Object.prototype.hasOwnProperty.call(dashboardSections, value)
  );
}
