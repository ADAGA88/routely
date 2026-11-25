# Architecture

Architecture decisions and system boundaries will be documented here.

## Public application entry

`apps/entry` owns the shared first-launch experience for Customer, Rider, Motorcycle Owner, and
Agent. It remains a separate Expo app and hands off to the selected role's independent app target.
Admin and Logistics Partner are excluded from public role selection.

The entry app persists only a selected experience and introductory-onboarding completion. These
preferences are not account membership, authentication, verification, approval, or permission data.
Each destination app remains responsible for restoring its own authenticated session and checking
trusted account state. The entry app does not share app-local credentials or infer profile state.
