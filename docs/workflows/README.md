# Workflows

Operational and application workflows will be documented here without inventing new rules.

## Public first launch

`apps/entry` starts with an animated branded initialization screen, validates its app configuration,
loads Poppins, and restores non-credential entry preferences. A first-time user selects one of
Customer, Rider, Motorcycle Owner, or Agent and sees the shared login screen. Create an account
opens that experience's existing welcome, introductory onboarding, and account-access flow.
Admin and Logistics Partner are not public roles.

The selected experience is stored using SecureStore on native and local storage on web. Introductory
completion is stored separately for each experience. Switching experience changes this preference
only.

Entry preferences never represent an authenticated session, profile, role membership, registration,
verification, approval, restrictions, or operational availability. The Entry login restores its
own Supabase session separately; destination apps maintain their own sessions. No common
profile/status API is configured. Selecting a role never grants access.

For browser testing, Entry's development-only Test mode accepts arbitrary login fields and opens
the selected localhost dashboard without authentication or sending credentials. The account-access
screen also links to the dashboard preview. These controls are unavailable in production and native
builds; each app's development server must be running. Do not enter real credentials in Test mode.

The Entry app's navigation-state types keep those account dimensions separate, but the values remain
unknown/unavailable until a trusted destination-app or backend adapter exists. Protected account and
operational routes are therefore not part of this milestone.

| Application | Feature                 | Route                | Design status | Development status | API dependencies                                        | Testing status                        |
| ----------- | ----------------------- | -------------------- | ------------- | ------------------ | ------------------------------------------------------- | ------------------------------------- |
| Entry       | Initialization          | `/`                  | Implemented   | Implemented        | Expo config, Poppins, local preferences                 | Typecheck, lint, browser verification |
| Entry       | Experience selection    | `/select-experience` | Implemented   | Implemented        | None; preference only                                   | Browser verification                  |
| Entry       | Login                   | `/login/[role]`      | Implemented   | Partial            | Supabase phone/email; trusted role checks unavailable   | Typecheck, lint, browser verification |
| Entry       | Role welcome            | `/welcome/[role]`    | Implemented   | Implemented        | Shared Rider route art; other vector art                | Browser verification                  |
| Entry       | Introductory onboarding | `/onboarding/[role]` | Implemented   | Implemented        | Local preference storage only                           | Browser verification                  |
| Entry       | Account access          | `/access/[role]`     | Implemented   | Implemented        | Rider app link; other auth flows unavailable/controlled | Browser verification                  |

Customer and Owner authentication routes are not implemented. Agent accounts must be provisioned or
authorized by operations. Rider login now opens the password login screen; Rider account creation
continues to use the existing phone OTP entry. Successful authentication does not establish Rider
approval. Registration and identity verification remain separate future workflows.

The Rider phone route restores its persisted Supabase session before showing phone entry. An existing
session routes only to the current blocked account-status screen because trusted profile and approval
checks remain unavailable.

## Rider phone authentication

Rider account creation opens phone-number entry. The app normalizes the number to E.164,
requests an SMS OTP through Supabase, verifies the submitted six-digit token, and establishes the
Supabase session. OTPs and pending phone numbers are held only in memory by the app flow; native
Supabase session persistence uses Expo SecureStore.

When Supabase URL/key or SMS delivery is unavailable, the UI explicitly reports that no SMS was
sent. The development-only `EXPO_PUBLIC_AUTH_PREVIEW=true` option opens the code-entry presentation
without sending SMS and keeps verification disabled. It is gated by Expo development mode.

Rider profile, onboarding, and trusted verification/approval status lookup are not implemented yet.
After a real OTP verification the app stops at an account-status screen; it grants no operational
access. A future server-backed status check must be added before routing riders into protected or
operational screens.

In development, the phone-entry screen also links to `/bike-preferences`, an optional three-step
design preview for motorcycle access and hire purchase interest. Selections stay in screen memory
only, are not saved or sent, and do not form part of registration. Finishing returns to the previous
screen without changing authentication. The questions proceed from bike access to hire purchase
interest and then review; the Back control and Android hardware back return to the previous step.
The screen explains that choices are not saved or sent, and completion exits without saving.
A real onboarding flow will need consent, resumable storage,
server validation, and an approved verification and authorization process before collecting or
acting on these preferences.

## Owner and Agent dashboard previews

The Owner and Agent apps each provide a development-only `/dashboard` visual preview. Production
redirects to the welcome screen. Fleet, earnings, rider assignments, tasks and activity are not
connected. Navigation and task controls that require services are disabled. The previews do not
authenticate users or grant permissions.
The Owner preview's name, profile image and repeated rider portraits are examples, not account
identity or real rider assignments. The portrait indicators do not show live availability.
The Agent preview shows unavailable states instead of a profile, figures, tasks or activity chart.
View tasks, View all and the Tasks tab open a local disconnected task view, which can return to the
overview. Verification, field activity, assignments, reports and profile controls remain unavailable.

| Application | Feature   | Route        | Design status | Development status | API dependencies                                     | Testing status                        |
| ----------- | --------- | ------------ | ------------- | ------------------ | ---------------------------------------------------- | ------------------------------------- |
| Owner       | Dashboard | `/dashboard` | In progress   | Development only   | Fleet, riders, earnings, reporting and account       | Typecheck, lint, browser verification |
| Agent       | Dashboard | `/dashboard` | In progress   | Development only   | Assigned riders, owners, tasks, activity and account | Typecheck, lint, browser verification |

## Rider dashboard preview

The development-only `/dashboard` route is a visual preview, not an authorized operations screen;
production redirects to the welcome screen. It shows
example request, daily performance, and wallet data; rider account and verification status are
unavailable. The top-bar shield opens a verification preview and does not assert verification.
Recent activity reuses the sample delivery history; each entry opens its sample details, and View all
opens the History tab. These entries are not live activity.
The Need a bike card opens `/bikes`, showing illustrative listings with a shared generated image. Bike availability,
agent-assisted verification, assignment and hire purchase applications are not connected; no
availability, approval, financing terms or allocation are promised. A preview of the preference
questions is also available from that screen. Each sample opens `/bike-details` with a swipeable
gallery of generated illustrative images shared between the sample listings. The images are not
photographs of inventory. Unknown IDs show an unavailable state; bike requests remain disabled.
Notifications, operational delivery actions, filters, real wallet transactions, and external support actions
remain unavailable until their services are implemented. The availability switch changes the preview
only.

The request card's View details button opens `/delivery-request`, a presentation-only details screen
backed by shared sample values. Back returns to the dashboard, including when the details route is opened directly.
The View more requests button below Accept Delivery returns to `/delivery-requests`. Accepting a
delivery remains disabled; no request is submitted or assignment created.
The Delivery requests quick action opens `/delivery-requests`, a presentation-only inbox with three
illustrative offers. Each offer opens `/delivery-request` with matching route and estimate details;
the values do not represent live dispatch or pricing rules, and acceptance remains disabled.
The Deliveries tab and quick action open `/deliveries`, a visual preview with an illustrative
current delivery and history. Selecting a history card opens `/delivery-history` with its matching
sample status, route, date and available earnings. A cancelled sample has no earnings figure; no
cancellation reason or event history is supplied. Unknown IDs show an unavailable state. This is
not a live delivery record. The current delivery also opens from the dashboard and leads to
`/active-delivery`, including from the bike icon in the Current area card. Its schematic map,
location, status, distance and time are illustrative, not
live tracking or navigation. Its addresses, instructions and masked contact numbers are also sample
values. If the dashboard's sample current delivery is absent, its shortcut opens the example request
inbox instead. Live assignment status is not connected; this sample fallback does not determine
whether a real rider has a delivery. Riders can switch between four local presentation states without sending or persisting any
delivery updates. Add proof opens `/delivery-proof`, and Report issue opens `/report-delivery-issue`.
These presentation-only screens allow selecting the requested proof options or issue categories.
Issue text stays in memory; no report is sent. Proof capture, entry and submission are disabled.
Contact, navigation, pickup, completion and live support actions are also disabled. Get help opens
`/support`, a presentation-only hub linking to issue, proof, verification and earnings previews.
Support contact and emergency calls are not connected; in immediate danger, riders should contact
local emergency services directly. The stages and
proof presentation do not define operational or verification rules. The current delivery is separate
from the new request; neither represents an actual assignment. Before enabling these flows, establish
authorized server-side transitions, secure private proof handling and approved proof requirements.
The Earnings tab and quick action open `/earnings`, a presentation-only wallet and earnings preview.
Figures are illustrative. The dashboard top-up and Earnings top-up and withdrawal controls open
`/wallet-top-up` and `/wallet-withdrawal`: amounts can be entered and reviewed in memory, but are
not sent or saved. Payment methods, withdrawal destinations and transaction submission are unavailable;
no funds move, and no eligibility, fees or limits are determined.
The dashboard notification icon opens `/notifications`, a presentation-only inbox with illustrative
delivery, earnings, and account updates. Category filters work locally; unread counts and read
actions are examples only, and the notification service is not connected.
The Profile tab and Profile quick action open `/profile`, a presentation-only
screen. Account and verification status and contact details remain unavailable, the portrait is
illustrative, the displayed rider name is sample data, and editing is disabled; no verification
submission or approval is performed. The profile's activity figures reuse the dashboard's sample
values; motorcycle details are unavailable. Quick links navigate to the Deliveries and Earnings previews.
The dashboard verification controls open `/verification`, a presentation-only overview of identity,
rider document, and motorcycle information areas. Account status, requirements, eligibility, and
document submission remain unavailable; the screen does not grant approval or operational access.
Its bike journey illustrates planned agent-assisted verification and assignment, links to the sample
bikes, and is not progress or a guarantee of assignment. Browsing samples is available at any time.
The dashboard Support card and Support quick action, as well as Get help on an active delivery, open
`/support`. The hub links to existing issue, proof, verification and earnings previews. Contact
channels and emergency calls are not integrated; immediate safety concerns should be directed to
local emergency services.

| Application | Feature                  | Route                    | Design status | Development status | API dependencies                                                  | Testing status                        |
| ----------- | ------------------------ | ------------------------ | ------------- | ------------------ | ----------------------------------------------------------------- | ------------------------------------- |
| Rider       | Dashboard                | `/dashboard`             | In progress   | Preview only       | Account status, dispatch, earnings, notifications                 | Typecheck, lint, browser verification |
| Rider       | Bike options             | `/bikes`                 | In progress   | Preview only       | Bike inventory, verification, assignment and financing            | Typecheck, lint, browser verification |
| Rider       | Bike details             | `/bike-details`          | In progress   | Preview only       | Bike inventory, images, verification, assignment and financing    | Typecheck, lint, browser verification |
| Rider       | Bike preferences         | `/bike-preferences`      | In progress   | Preview only       | Onboarding preferences, verification and financing                | Typecheck, lint, browser verification |
| Rider       | Delivery request         | `/delivery-request`      | In progress   | Preview only       | Dispatch, eligibility, route and fare estimates                   | Typecheck, lint, browser verification |
| Rider       | Delivery requests        | `/delivery-requests`     | In progress   | Preview only       | Live dispatch offers, rider eligibility and assignment            | Typecheck, lint, browser verification |
| Rider       | Deliveries               | `/deliveries`            | In progress   | Preview only       | Assignments, delivery history, earnings                           | Typecheck, lint, browser verification |
| Rider       | Delivery history details | `/delivery-history`      | In progress   | Preview only       | Authorized delivery history, delivery events and earnings         | Typecheck, lint, browser verification |
| Rider       | Active delivery          | `/active-delivery`       | In progress   | Preview only       | Dispatch, tracking, navigation, delivery events                   | Typecheck, lint, browser verification |
| Rider       | Delivery proof           | `/delivery-proof`        | In progress   | Preview only       | Delivery authorization, private proof storage                     | Typecheck, lint, browser verification |
| Rider       | Delivery issue           | `/report-delivery-issue` | In progress   | Preview only       | Authorized issue reporting and support services                   | Typecheck, lint, browser verification |
| Rider       | Notifications            | `/notifications`         | In progress   | Preview only       | Notification delivery and read state                              | Typecheck, lint, browser verification |
| Rider       | Verification             | `/verification`          | In progress   | Preview only       | Trusted account status, requirements and private document storage | Typecheck, lint, browser verification |
| Rider       | Support & safety         | `/support`               | In progress   | Preview only       | Support channels, issue handling and emergency assistance         | Typecheck, lint, browser verification |
| Rider       | Earnings                 | `/earnings`              | In progress   | Preview only       | Earnings, wallet and settlement services                          | Typecheck, lint, browser verification |
| Rider       | Wallet top-up            | `/wallet-top-up`         | In progress   | Preview only       | Wallet, payment methods and payment processing                    | Typecheck, lint, browser verification |
| Rider       | Wallet withdrawal        | `/wallet-withdrawal`     | In progress   | Preview only       | Wallet, payout destinations and settlement services               | Typecheck, lint, browser verification |
| Rider       | Profile                  | `/profile`               | In progress   | Preview only       | Profile, account status and verification services                 | Typecheck, lint, browser verification |

## Customer sender dashboard

The Customer app provides a development-only `/dashboard` design accessible from its welcome screen.
It follows the supplied sender reference with location, package, tracking, quick-action, recent
activity, offer and navigation areas. Recent activity links to delivery history but shows an
unavailable state until history is connected. The map and parcel artwork are illustrative. Dashboard links open development-only
section designs, but location, booking, tracking, notifications, offers and account services remain
unavailable; no delivery is created or tracked. No location, delivery status or promotion is implied.
Production redirects to the existing welcome screen; this design is not an authenticated or
authorized customer dashboard.

The tracking card shows an unavailable state. Real active-delivery status requires an
authorized backend and is not implemented. Track Order opens a development-only sample in-transit
order with fictional Abuja route, parcel, rider and progress details, plus an expandable schematic
map that is not geographically accurate. It is not connected to the send-package form or any
account, rider, booking or live tracking service, and rider contact is unavailable. The screen states
that tracking is not connected to an order; displayed details are static demonstration data.

The development-only send-package journey offers simple and custom modes. Both collect pickup and
drop-off text, sender and receiver phone numbers, a package description and an optional camera or
library photo for local review. Text stays in memory; the photo is temporarily local to the device
and is never uploaded. The journey checks that entries are present but does not validate phone numbers.

The simple mode lets a sender select an illustrative price and describes Routely-managed assignment.
The custom mode lets a sender enter a price within a fixed illustrative range, view example rider
offers, and review a counteroffer and optional message locally. Switching riders discards the draft.
The displayed range, suggestion, and example counteroffer are fixed demonstration values, not a quote,
route calculation or approved pricing policy. The 160-character message limit and whole-naira input
are prototype behavior. No offer, message, request, or rider assignment is created, and final booking
is disabled. Live pricing limits and acceptance must be validated server-side; photo upload requires
private storage, authorization and upload validation. These steps are not finalized operational requirements.

Both sending modes link to a development-only illustrative delivery journey with selectable finding,
no-rider, matched and in-transit states. It does not use or transmit the entered delivery details,
search for riders, create an assignment or show live tracking. It can be opened without booking.

The tracking section, delivery history, scheduling, saved addresses, support, wallet, profile, offers and
location links open section-specific unavailable states. Tracking and delivery history link to the
illustrative journey; service-dependent actions remain disabled. No location permission is requested
and no account, wallet balance, address, promotion or support channel is fabricated.

| Application | Feature            | Route                                   | Design status | Development status | API dependencies                                   | Testing status                        |
| ----------- | ------------------ | --------------------------------------- | ------------- | ------------------ | -------------------------------------------------- | ------------------------------------- |
| Customer    | Sender dashboard   | `/dashboard`                            | In progress   | Development only   | Account status, booking, live tracking and history | Typecheck, lint, browser verification |
| Customer    | Send package       | `/send-package`                         | In progress   | Development only   | Address, pricing and delivery booking services     | Typecheck, lint, browser verification |
| Customer    | Delivery journey   | `/delivery-journey`                     | In progress   | Development only   | Assignment, delivery events and tracking           | Typecheck, lint, browser verification |
| Customer    | Example order      | `/tracking-order`                       | In progress   | Development only   | Booking, delivery events and tracking              | Typecheck, lint, browser verification |
| Customer    | Tracking           | `/dashboard-section?section=tracking`   | In progress   | Development only   | Delivery events and tracking                       | Typecheck, lint, browser verification |
| Customer    | My deliveries      | `/dashboard-section?section=deliveries` | In progress   | Development only   | Delivery requests and history                      | Typecheck, lint, browser verification |
| Customer    | Scheduling         | `/dashboard-section?section=schedule`   | In progress   | Development only   | Scheduling and delivery booking                    | Typecheck, lint, browser verification |
| Customer    | Saved addresses    | `/dashboard-section?section=addresses`  | In progress   | Development only   | Authorized address storage                         | Typecheck, lint, browser verification |
| Customer    | Help and support   | `/dashboard-section?section=support`    | In progress   | Development only   | Support channels                                   | Typecheck, lint, browser verification |
| Customer    | Wallet             | `/dashboard-section?section=wallet`     | In progress   | Development only   | Wallet, transactions and payments                  | Typecheck, lint, browser verification |
| Customer    | Profile            | `/dashboard-section?section=profile`    | In progress   | Development only   | Account profile and settings                       | Typecheck, lint, browser verification |
| Customer    | Offers and rewards | `/dashboard-section?section=offers`     | In progress   | Development only   | Authorized promotions                              | Typecheck, lint, browser verification |
| Customer    | Current location   | `/dashboard-section?section=location`   | In progress   | Development only   | Location permission and services                   | Typecheck, lint, browser verification |

## Rider password login (in progress)

The shared mobile login screen is connected to Rider `/login` for Supabase phone/password and
email/password sign-in. Existing sessions and successful sign-ins stop at `/auth/account-status`;
they do not grant operational access. Incorrect-credential errors do not reveal account existence.
The Entry app uses `EXPO_PUBLIC_RIDER_LOGIN_URL` for the production browser login handoff; the
existing registration handoff is unchanged.

Web Google sign-in requires a configured Supabase project, the Google provider, and allowed
redirects to the relevant Entry `/login/[role]` or Rider `/login` URL. Native Google sign-in is not
implemented. Username login is deliberately unavailable pending a secure backend. Phone and email recovery forms are present but
not connected; no recovery request is sent. Implement verified recovery and callback handling
before enabling them. Shared login has not yet been integrated into Customer, Owner, Agent, Admin,
or Partner, and trusted authorization checks are still required for every app. Entry provides the
shared login for public experiences, but its session is not transferred to destination apps.
