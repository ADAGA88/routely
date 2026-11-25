import type { PublicExperience } from "./experience";
import type { EntryPreferences } from "./storage";

export type AuthenticationSessionState = "unknown" | "unauthenticated" | "authenticated";
export type ProfileState = "unknown" | "missing" | "incomplete" | "complete";
export type RoleMembershipState = "unknown" | "not_member" | "authorized_member";
export type RegistrationState = "unknown" | "incomplete" | "complete";
export type IdentityVerificationState =
  | "unknown"
  | "not_started"
  | "pending"
  | "additional_information_required"
  | "verified"
  | "rejected";
export type OperationalApprovalState = "unknown" | "pending" | "approved" | "denied";
export type AccountRestrictionState = "unknown" | "none" | "restricted" | "suspended";
export type OperationalAvailabilityState =
  "unknown" | "unavailable" | "offline" | "eligible" | "online";

export interface TrustedAccountState {
  authentication: AuthenticationSessionState;
  profile: ProfileState;
  roleMembership: RoleMembershipState;
  registration: RegistrationState;
  identityVerification: IdentityVerificationState;
  operationalApproval: OperationalApprovalState;
  accountRestriction: AccountRestrictionState;
  operationalAvailability: OperationalAvailabilityState;
}

export interface EntryNavigationState {
  selectedExperience: PublicExperience | null;
  introductoryOnboardingCompleted: boolean;
  authenticatedSession: AuthenticationSessionState;
  trustedAccountState: TrustedAccountState | null;
}

export type FirstLaunchDestination =
  | { kind: "select-experience" }
  | { kind: "welcome"; experience: PublicExperience }
  | { kind: "account-access"; experience: PublicExperience };

export function resolveFirstLaunchDestination(
  preferences: EntryPreferences,
): FirstLaunchDestination {
  const experience = preferences.selectedExperience;
  if (!experience) {
    return { kind: "select-experience" };
  }
  if (preferences.completedIntroExperiences.includes(experience)) {
    return { kind: "account-access", experience };
  }
  return { kind: "welcome", experience };
}
