# First-launch experience

## Route flow

1. `/` renders the animated Routely splash on app launch. Main screens wait for app configuration,
   Poppins, saved experience preferences, and the brand entrance to finish.
2. On first launch, three general introduction slides cover Riders, Senders, and Motorcycle Owners.
   The current slide is saved so an interrupted introduction resumes where it stopped.
3. Completing the slides opens the existing general Routely welcome screen. Get started opens
   `/select-experience`.
4. Selecting Customer, Rider, Owner, or Agent opens the shared `/login/[role]` screen. After a
   successful or restored Entry login, the general slides are shown again if at least seven days
   have elapsed since they were last completed. Completing them returns to the account-status stop.
5. Create an account opens the existing role welcome and introductory onboarding flow, or account
   access when that introduction is complete. Introductory completion remains separate per role.
6. Account access continues to use the destination app's existing sign-up handoff where available.
   The selected experience is only a preference and does not grant role membership or permissions.

## Browser testing

With the Entry and four dashboard development servers running on localhost ports 8080–8084,
the login screen offers an opt-in **Test mode**. Phone or email and password may be arbitrary or
empty; **Test log in** opens the selected dashboard preview without validating, sending or storing
those details. Do not enter real credentials. Real sign-in remains available with test mode off.
The account-access screen also offers **Open dashboard preview** after role onboarding.
These controls are available only in Expo development on the web and do not create an account,
session, role or permissions. Each app must be running separately; this shortcut is not a native
app handoff. Rider and Owner dashboards contain illustrative examples, not live operations.

## Combined Android demo

The separate `Routely Demo` Android build (`com.routely.demo`) combines the four dashboard
previews in one app. Set `ROUTELY_DEMO_APK=1` when generating and building its Android project.
On Windows, set `EXPO_NO_METRO_WORKSPACE_ROOT=1` for the Gradle build so Metro resolves the
pnpm workspace entry point correctly; Entry's Metro configuration still watches the workspace.
The demo has its own app ID and URL scheme, does not initialize Supabase, and accepts any
phone/email and password (including empty fields) for preview only. It never authenticates or
grants permissions; do not enter real credentials. Use the banner to switch experiences.
Customer and Rider dashboard actions that need other screens show an unavailable message in this
combined demo; Agent task navigation remains local. Owner and Rider examples are not live data.
This is not a production build or a substitute for server-side authentication and authorization.

## Boundaries

- Entry preferences are selection/progress only; they do not represent account identity, role
  membership, authentication, verification, approval, permission, or operational eligibility.
- Rider login hands off to `routely-rider:///login` (native) or the configured Rider browser login
  URL. Rider account creation continues to hand off to `routely-rider:///auth/phone` or its browser
  equivalent.
- The Rider phone-entry route restores an existing local Supabase session and sends it to the
  account-status stop; it does not treat the session as Rider approval.
- Customer and Owner account authentication is not configured. Their account buttons explain this
  and do not create an account.
- Agent account access is controlled by operations. Selecting Agent never provisions an account.
- Destination apps own session restoration and trusted account checks. The independent app sandboxes
  do not share session storage with the entry app, and a common profile/status API is not configured.
  Entry authentication therefore stops at a non-authorizing account-status screen rather than
  granting access or transferring credentials to a destination app.
- Dashboard preview links open local development previews only, not authorized account access.
- No registration, identity verification, operational approval, or backend business flow is created
  by this first-launch implementation.

## Persistence

The app stores `selectedExperience`, `completedIntroExperiences`, the current general introduction
slide, and its last completion time. The weekly reminder uses the device clock and is local to the
Entry app and browser/device, not synchronized or tracked per account. Native storage uses Expo
SecureStore; web preview uses browser local storage. Existing preferences without general introduction
fields remain valid and show the new introduction. Corrupt or unreadable preferences produce an
explicit startup error with retry and clear-preferences recovery actions; save failures are displayed
on the introduction screen.
