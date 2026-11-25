# Routely Design System Foundation

## Shared sources

- `packages/design-tokens/src/index.ts` is the canonical source for approved colors, typography,
  font families, spacing, radii, shadows, breakpoints, and component sizes.
- `packages/brand-assets/src/assets/routely-logo.png` is the official primary horizontal logo.
  The same package contains the locally bundled Poppins Regular, Medium, SemiBold, and Bold fonts.
  Platform-specific `RoutelyLogo` components in `packages/ui-mobile` and `packages/ui-web` render
  this single source asset without recreating the mark or wordmark.
- `packages/ui-mobile` provides Expo/React Native components for the four mobile applications.
- `packages/ui-web` provides Next.js components and responsive styles for Admin and Partner.
- Each UI package owns its platform-specific components and Lucide icon registry; both consume
  the same design tokens.

Platform UI remains separate; application code must not duplicate brand values or replace these
shared foundations with app-specific styling.

The shared mobile login uses Google's pre-approved light icon buttons from its
[sign-in branding assets](https://developers.google.com/identity/branding-guidelines), bundled
locally for Android, iOS, and web. Icon-only actions retain accessible labels and touch targets.
The Rider dashboard uses original local vector illustrations for its quick-action cards and a
user-supplied illustration for its delivery-request placeholder; functional controls continue to use
the shared Lucide icon registry. The dashboard's request card opens the details preview; request
acceptance is disabled because it is not connected to dispatch. Its request illustration has a
subtle breathing animation that stops when reduced motion is enabled. Its weekly performance
chart and wallet balance are also examples; the period selector remains disabled. Wallet top-up and
withdrawal open amount-review screens, but payment methods and transaction submission are unavailable.
Recent activity shows the same sample deliveries as the History
tab and links to their preview details; it is not live activity. Today's summary and the scrollable quick actions are examples;
the verification icon opens the verification preview and the support card opens the Help & Safety
preview; support contact is unavailable. The notification icon opens an inbox with
illustrative delivery, earnings, and account updates; category filters work locally, while read
actions and live notification services are unavailable. A neutral shield is
shown while verification status is unknown, not as confirmation that a rider is verified.
The dashboard's example rider portrait is cropped from the supplied design reference; it is not the
signed-in rider's photo.
The Rider request-details preview uses the same pickup and drop-off values as the dashboard card.
Its accept button is disabled until dispatch and rider eligibility checks are connected.
The dashboard's Need a bike card follows the New Request card's layout, uses the selected appearance
as its background, and appears before Recent activity. It links to sample motorcycle options and a
three-step bike-preference design preview.
The signup link is development-only; selections are not saved, listings are not live, and bike requests
and financing are unavailable. The bike options cards and details gallery use generated illustrations,
shared across the sample listings and labeled as examples rather than inventory photographs.
The Delivery requests quick action opens an inbox with three illustrative offers and matching detail
views. Viewing details and returning to the request inbox are available; requests and estimates are
not live, no pricing rules are implied, and acceptance remains disabled.
The Rider Deliveries preview separates an illustrative current delivery from illustrative history;
history cards open matching sample delivery details, without inventing event history or cancellation
reasons. Its Home, Deliveries, Earnings and Profile tabs share the dashboard navigation. The Earnings preview uses
the current appearance for its wallet card and links to non-transactional wallet screens. The Profile preview
uses the same illustrative rider portrait as the dashboard and a neutral verification shield.
Its rider name is illustrative; account and verification status remain unavailable.
The profile's activity cards reuse the dashboard's illustrative values, with motorcycle details
shown as unavailable and links to the existing Deliveries and Earnings previews. Dashboard
verification controls open a separate status overview; identity, rider-document, and motorcycle
areas are illustrative categories only, and approval, requirements, and uploads remain unavailable.
Its status-first overview uses the selected appearance and a grouped bike journey with icon-led
cards; the journey is not verification progress or an assignment guarantee and links to sample bike
listings. Bike preference questions use the same appearance, grouped cards and selection indicators;
the screen explains that choices are not saved or sent.
The Customer sender dashboard is development-only and follows the supplied visual reference with
appearance-aware delivery entry, a schematic map, quick actions, recent activity, an offer panel and
bottom navigation.
The parcel, map and gift artwork is cropped from that reference; the two-column quick actions use
generated illustrations inspired by the supplied artwork. Unavailable location, tracking, booking
and offers are explicitly distinguished from real account data.
Dashboard sections use appearance-aware feature cards, familiar illustrations and clear unavailable
states. Controls that require real account or operational services remain disabled.
The Owner and Agent dashboard previews use shared mobile dashboard surfaces and appearance-aware
highlights. Their operational actions remain unavailable.
The Owner preview uses a reference-derived profile portrait, an adapted motorcycle illustration,
illustrative rider portraits and indicators, and an overlapping fleet summary card with custom fleet
icons.
The Agent preview uses the shared brand header, reference-derived task artwork, three overview cards,
quick actions and unavailable states for tasks, weekly performance and recent activity. Its highlights
follow the selected appearance, with emerald and lime card accents and paired registry icons; no
example identity, figures, tasks or activity are displayed.
The task links open a local disconnected task view; operational quick actions remain disabled.
The tracking card shows an unavailable state; the map is illustrative rather than live. Track Order opens a sample
in-transit order with an appearance-aware illustrated status banner, an expandable schematic map,
and rider, progress and route-detail cards; its details are fictional and contact is unavailable. The tracking header
uses the shared Routely logo, and the Customer and Rider apps reuse rider artwork from brand assets.

The development-only send-package journey uses the same appearance modes, illustration, rounded
surfaces and shared form controls, with illustrated, appearance-aware simple and custom entry cards.
Route, package, review and
price-offer steps hold text in memory; optional parcel photos remain temporarily on-device. Price
guidance, rider offers and counteroffer messages are illustrative; pricing, upload, messaging,
assignment and booking services are not connected.
The Customer delivery journey uses appearance-aware status cards and a schematic map for its
selectable example states; these are not real rider assignments, locations or delivery events.
The active-delivery preview uses a schematic route illustration, not a geographically accurate or
live map. Sample stop instructions and masked contacts, proof and support sections are shown for
design review. Its selectable journey stages change the illustrated marker and presentation only.
Proof and issue screens provide selectable visual options; report submission, proof collection,
navigation, contact, live support and delivery actions remain disabled. The Get help action opens
the Help & Safety preview; contacting support or emergency services is not available in the app.

The square app icon is a separate pending asset task. Do not use the horizontal primary logo as an
app icon; use only the approved dispatch-inspired symbol when a dedicated symbol asset is prepared.

## Visual conventions

- Poppins is the only interface typeface. Use the shared 400, 500, 600, and 700 weights; Expo
  screens wait for those local font assets before showing the final interface, and Next.js loads
  them through the shared web stylesheet.
- Keep white as the primary page and card surface and use grey for grouping. Lime is the default
  primary-action accent; users can switch to emerald. Use charcoal on lime and white on emerald.
- Selectable role cards alternate the active accent and white surfaces; equal card sizing and a
  selection indicator keep the role choices consistent and easy to scan.
- Use charcoal or emerald for small supporting text when needed to preserve 4.5:1 contrast; the
  approved muted color does not reach that threshold on white.
- Use the shared spacing and radius scales. Prefer one focused surface over multiple nested cards.
- Use the shared motion durations for subtle transitions and respect reduced-motion preferences when
  adding larger or continuous animations.
- Use `RoutelyButton`, `RoutelySurface`, `RoutelyTextField`, `PageContainer`, and `RoutelyIcon`
  from the platform's shared UI package rather than styling these primitives per screen.
- Icon names and sizing are controlled by each platform package's Routely icon registry. Do not
  import Lucide icons directly into application screens.

## Typography

Poppins is the primary font. `@routely/brand-assets` owns the four font files; `useRoutelyFonts`
in `@routely/ui-mobile` loads them locally for Expo applications. Entry and the other Expo roots
keep their loading/error surfaces visible until font loading completes. The shared web style
initializer applies the loaded Poppins family to the browser document and controls.

Next.js applications load the same local font files through `@routely/ui-web/styles.css`; no
remote font request is required. `designTokens.typography.styles` defines the display, page,
section, card, body, secondary, label, caption, button, navigation, and numeric hierarchy.
Shared buttons use pill-shaped primary/destructive variants, inset secondary variants, visible
keyboard focus, disabled/loading feedback, and tokenized geometry. Shared radius tokens define
inputs, cards, panels, and icon containers.

## Appearance modes

The shared mobile and web appearance providers expose an icon switch for lime and emerald modes.
Switching shows a brief, non-blocking confirmation at the top center of the screen; its entrance
respects reduced-motion preferences.
Shared primary buttons and accent selection cards use the current mode; the approved lime welcome
artwork and fixed brand illustrations are intentional exceptions. The setting is stored locally
for each app (SecureStore on native, local storage on web) and is not synchronized between apps or
devices. The Rider dashboard extends its active accent through the top safe area and keeps its header
visible while scrolling. Its request and financial figures remain illustrative and must be replaced
with trusted data before the dashboard is used operationally. Storage errors are displayed instead
of reporting a successful save.

## Browser-first application foundation

The Entry first-launch flow and Rider phone/OTP authentication are the primary implemented mobile
surfaces. Admin and Partner have shared web foundation screens. Customer has a development-only
sender dashboard design; Owner and Agent currently have application shells only. Operational dashboards, tables, tabs, notification systems, and other
product screens are not implemented and cannot yet receive a screen-level visual audit. Rider
authentication uses phone and SMS OTP when Supabase and an SMS provider are configured; development
code-entry preview does not send an SMS or authenticate.
