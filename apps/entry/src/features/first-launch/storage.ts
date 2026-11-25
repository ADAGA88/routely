import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";
import { isPublicExperience, type PublicExperience } from "./experience";

const storageKey = "routely.entry.preferences.v1";

export interface EntryPreferences {
  selectedExperience: PublicExperience | null;
  completedIntroExperiences: PublicExperience[];
  generalIntroStep: number;
  generalIntroCompletedAt: number | null;
}

export const defaultEntryPreferences: EntryPreferences = {
  selectedExperience: null,
  completedIntroExperiences: [],
  generalIntroStep: 0,
  generalIntroCompletedAt: null,
};

export function isGeneralIntroReminderDue(completedAt: number | null, now: number): boolean {
  return completedAt !== null && now - completedAt >= 7 * 24 * 60 * 60 * 1000;
}

function getStoredValue(): Promise<string | null> {
  if (Platform.OS === "web") {
    if (typeof window === "undefined") {
      return Promise.resolve(null);
    }
    return Promise.resolve(window.localStorage.getItem(storageKey));
  }
  return SecureStore.getItemAsync(storageKey);
}

function setStoredValue(value: string): Promise<void> {
  if (Platform.OS === "web") {
    if (typeof window === "undefined") {
      return Promise.reject(new Error("Browser storage is unavailable."));
    }
    window.localStorage.setItem(storageKey, value);
    return Promise.resolve();
  }
  return SecureStore.setItemAsync(storageKey, value);
}

function removeStoredValue(): Promise<void> {
  if (Platform.OS === "web") {
    if (typeof window === "undefined") {
      return Promise.reject(new Error("Browser storage is unavailable."));
    }
    window.localStorage.removeItem(storageKey);
    return Promise.resolve();
  }
  return SecureStore.deleteItemAsync(storageKey);
}

function parsePreferences(value: string): EntryPreferences {
  let parsed: unknown;
  try {
    parsed = JSON.parse(value);
  } catch {
    throw new Error("Saved first-launch preferences are unreadable.");
  }

  if (typeof parsed !== "object" || parsed === null) {
    throw new Error("Saved first-launch preferences are invalid.");
  }

  const record = parsed as Record<string, unknown>;
  const selectedExperience =
    record.selectedExperience === null || isPublicExperience(record.selectedExperience)
      ? record.selectedExperience
      : undefined;
  const completedIntroExperiences = record.completedIntroExperiences;
  const generalIntroStep = record.generalIntroStep === undefined ? 0 : record.generalIntroStep;
  const generalIntroCompletedAt =
    record.generalIntroCompletedAt === undefined ? null : record.generalIntroCompletedAt;
  if (
    selectedExperience === undefined ||
    !Array.isArray(completedIntroExperiences) ||
    !completedIntroExperiences.every(isPublicExperience) ||
    typeof generalIntroStep !== "number" ||
    !Number.isInteger(generalIntroStep) ||
    generalIntroStep < 0 ||
    generalIntroStep > 2 ||
    (generalIntroCompletedAt !== null &&
      (typeof generalIntroCompletedAt !== "number" ||
        !Number.isFinite(generalIntroCompletedAt) ||
        generalIntroCompletedAt < 0))
  ) {
    throw new Error("Saved first-launch preferences are invalid.");
  }

  return {
    selectedExperience,
    completedIntroExperiences: [...new Set(completedIntroExperiences)],
    generalIntroStep,
    generalIntroCompletedAt,
  };
}

export async function readEntryPreferences(): Promise<EntryPreferences> {
  const value = await getStoredValue();
  return value === null ? defaultEntryPreferences : parsePreferences(value);
}

export function writeEntryPreferences(preferences: EntryPreferences): Promise<void> {
  return setStoredValue(JSON.stringify(preferences));
}

export function clearEntryPreferences(): Promise<void> {
  return removeStoredValue();
}
