import type { RoutelyIconName } from "@routely/ui-mobile";
import { Platform } from "react-native";

export const publicExperiences = ["customer", "rider", "owner", "agent"] as const;

export type PublicExperience = (typeof publicExperiences)[number];

export const isDashboardPreviewAvailable = __DEV__ && Platform.OS === "web";

export function openDashboardPreview(experience: PublicExperience): void {
  if (!isDashboardPreviewAvailable) {
    throw new Error("Dashboard previews are only available in development on the web.");
  }
  const ports: Record<PublicExperience, number> = {
    customer: 8081,
    rider: 8082,
    owner: 8083,
    agent: 8084,
  };
  window.location.assign(`http://localhost:${ports[experience]}/dashboard`);
}

export interface ExperienceDetails {
  label: string;
  title: string;
  description: string;
  headline: string;
  supportingText: string;
  icon: RoutelyIconName;
}

export const experienceDetails: Record<PublicExperience, ExperienceDetails> = {
  customer: {
    label: "CUSTOMER",
    title: "Customer",
    description: "Send and track deliveries.",
    headline: "Deliver with confidence.",
    supportingText: "Book a delivery and follow it through.",
    icon: "package",
  },
  rider: {
    label: "RIDER",
    title: "Rider",
    description: "Deliver and earn with Routely.",
    headline: "Made for the ride.",
    supportingText: "Your journey starts with Routely.",
    icon: "motorcycle",
  },
  owner: {
    label: "MOTORCYCLE OWNER",
    title: "Motorcycle owner",
    description: "Manage your motorcycles.",
    headline: "Your fleet. Your control.",
    supportingText: "Keep motorcycle activity and obligations in view.",
    icon: "warehouse",
  },
  agent: {
    label: "AGENT",
    title: "Agent",
    description: "Support users and field operations.",
    headline: "Make every connection count.",
    supportingText: "Support people and responsibilities in the field.",
    icon: "users",
  },
};

export interface IntroductoryStep {
  title: string;
  description: string;
  icon: RoutelyIconName;
}

export const introductorySteps: Record<PublicExperience, readonly IntroductoryStep[]> = {
  customer: [
    {
      title: "Book a delivery.",
      description: "Share your pickup and destination details.",
      icon: "package",
    },
    {
      title: "Track your rider.",
      description: "Follow delivery progress in one place.",
      icon: "mapPin",
    },
    {
      title: "Receive your delivery.",
      description: "Stay informed through completion.",
      icon: "arrowRight",
    },
  ],
  rider: [
    {
      title: "Complete your rider profile.",
      description: "Add the details needed to begin review.",
      icon: "user",
    },
    {
      title: "Get verified and approved.",
      description: "Required checks come before operations.",
      icon: "motorcycle",
    },
    {
      title: "Receive eligible delivery opportunities.",
      description: "Offers depend on trusted eligibility checks.",
      icon: "mapPin",
    },
  ],
  owner: [
    {
      title: "Register your motorcycle.",
      description: "Add ownership and motorcycle information.",
      icon: "motorcycle",
    },
    {
      title: "Complete required checks.",
      description: "Inspection and agreements may be required.",
      icon: "eye",
    },
    {
      title: "Track fleet activity.",
      description: "Keep activity and obligations in view.",
      icon: "home",
    },
  ],
  agent: [
    {
      title: "Receive your assignment.",
      description: "Work within responsibilities approved for you.",
      icon: "mapPin",
    },
    {
      title: "Assist with user onboarding.",
      description: "Support people through their next steps.",
      icon: "user",
    },
    {
      title: "Track assigned responsibilities.",
      description: "Keep your field work organized.",
      icon: "package",
    },
  ],
};

export function isPublicExperience(value: unknown): value is PublicExperience {
  return typeof value === "string" && publicExperiences.some((experience) => experience === value);
}

export interface ExperienceAppTarget {
  schemeUrl: string;
  webUrl: string | null;
}

export const experienceAppTargets: Record<PublicExperience, ExperienceAppTarget> = {
  customer: {
    schemeUrl: "routely-customer:///",
    webUrl: process.env.EXPO_PUBLIC_CUSTOMER_APP_URL || (__DEV__ ? "http://localhost:8081" : null),
  },
  rider: {
    schemeUrl: "routely-rider:///auth/phone",
    webUrl:
      process.env.EXPO_PUBLIC_RIDER_APP_URL ||
      (__DEV__ ? "http://localhost:8082/auth/phone" : null),
  },
  owner: {
    schemeUrl: "routely-owner:///",
    webUrl: process.env.EXPO_PUBLIC_OWNER_APP_URL || (__DEV__ ? "http://localhost:8083" : null),
  },
  agent: {
    schemeUrl: "routely-agent:///",
    webUrl: process.env.EXPO_PUBLIC_AGENT_APP_URL || (__DEV__ ? "http://localhost:8084" : null),
  },
};
