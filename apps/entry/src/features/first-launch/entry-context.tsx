import { createContext, useContext, useMemo, useState, type PropsWithChildren } from "react";
import type { PublicExperience } from "./experience";
import { writeEntryPreferences, type EntryPreferences } from "./storage";

interface EntryPreferencesContextValue {
  preferences: EntryPreferences;
  selectExperience: (experience: PublicExperience) => Promise<void>;
  completeIntro: (experience: PublicExperience) => Promise<void>;
  setGeneralIntroStep: (step: number) => Promise<void>;
  completeGeneralIntro: () => Promise<void>;
}

const EntryPreferencesContext = createContext<EntryPreferencesContextValue | null>(null);

interface EntryPreferencesProviderProps extends PropsWithChildren {
  initialPreferences: EntryPreferences;
}

export function EntryPreferencesProvider({
  children,
  initialPreferences,
}: EntryPreferencesProviderProps) {
  const [preferences, setPreferences] = useState(initialPreferences);
  const value = useMemo<EntryPreferencesContextValue>(
    () => ({
      preferences,
      async selectExperience(experience) {
        const nextPreferences = { ...preferences, selectedExperience: experience };
        await writeEntryPreferences(nextPreferences);
        setPreferences(nextPreferences);
      },
      async completeIntro(experience) {
        const completedIntroExperiences = preferences.completedIntroExperiences.includes(experience)
          ? preferences.completedIntroExperiences
          : [...preferences.completedIntroExperiences, experience];
        const nextPreferences = {
          ...preferences,
          completedIntroExperiences,
          selectedExperience: experience,
        };
        await writeEntryPreferences(nextPreferences);
        setPreferences(nextPreferences);
      },
      async setGeneralIntroStep(step) {
        const nextPreferences = { ...preferences, generalIntroStep: step };
        await writeEntryPreferences(nextPreferences);
        setPreferences(nextPreferences);
      },
      async completeGeneralIntro() {
        const nextPreferences = {
          ...preferences,
          generalIntroStep: 0,
          generalIntroCompletedAt: Date.now(),
        };
        await writeEntryPreferences(nextPreferences);
        setPreferences(nextPreferences);
      },
    }),
    [preferences],
  );

  return (
    <EntryPreferencesContext.Provider value={value}>{children}</EntryPreferencesContext.Provider>
  );
}

export function useEntryPreferences(): EntryPreferencesContextValue {
  const context = useContext(EntryPreferencesContext);
  if (!context) {
    throw new Error("Entry preferences are only available inside EntryPreferencesProvider.");
  }
  return context;
}
