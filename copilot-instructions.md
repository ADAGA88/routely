# ROUTELY — GitHub Copilot Project Instructions

## 1. Project identity

Routely is a premium, managed motorcycle dispatch and logistics platform built initially for the Nigerian market, with an architecture that can support international expansion.

Routely connects:
- Customers
- Riders
- Motorcycle owners
- Agents
- Merchants
- Operations and administrators
- Logistics partners
- Fleet and financing partners

Routely is a managed logistics ecosystem, not simply a delivery booking application.

All development must prioritize:
- Premium user experience
- Security and privacy
- Maintainable architecture
- Consistent design
- Reliable dispatch operations
- Scalability
- Clear documentation
- Strong separation of responsibilities

Do not create features, permissions or business rules without considering their impact on the wider Routely ecosystem.

## 2. Approved technology direction

Use a TypeScript-first monorepo.

Preferred technologies:
- pnpm workspaces
- Turborepo
- Expo and React Native for mobile applications
- Next.js for web applications
- Supabase for authentication, PostgreSQL database, storage and realtime capabilities
- PostgreSQL with PostGIS for geospatial operations
- Zod for validation
- React Hook Form for forms
- TanStack Query for server state where appropriate
- Zustand for appropriate client-side state
- Lucide icons through a centralized icon registry
- ESLint and Prettier for code quality

Use compatible stable versions of these technologies. Do not arbitrarily upgrade dependencies or introduce competing libraries.

Do not assume every package can share the same UI components across web and native platforms. Share design tokens and business logic where appropriate, and maintain platform-specific UI implementations.

## 3. Monorepo architecture

Organize the project using this structure:

routely/
  apps/
    customer/
    rider/
    owner/
    agent/
    admin/
    partner/

  packages/
    design-tokens/
    ui-mobile/
    ui-web/
    auth/
    api/
    database/
    maps/
    dispatch/
    validation/
    config/
    types/

  supabase/
    migrations/
    functions/
    seed/
    policies/

  docs/
    architecture/
    design-system/
    database/
    workflows/
    product-requirements/
    api/
    security/

  scripts/
  tests/
  .github/
    copilot-instructions.md
    instructions/

  package.json
  pnpm-workspace.yaml
  turbo.json
  tsconfig.base.json
  .gitignore
  .env.example
  README.md

Application responsibilities:

- customer: customer delivery experience and merchant business mode.
- rider: rider onboarding, availability, offers, deliveries and earnings.
- owner: motorcycle registration, fleet, rider assignments and financial obligations.
- agent: assigned rider and owner onboarding and field operations.
- admin: central operations, approvals, dispatch oversight and platform administration.
- partner: logistics partner and fleet partner workflows.

Do not create a separate merchant application initially. Merchant capabilities should be supported through authorized merchant business accounts in the customer application.

## 4. Feature-based application organization

Every application should use clear feature-based organization.

Example:

src/
  app/
  components/
  features/
    onboarding/
    authentication/
    profile/
    dashboard/
    notifications/
  hooks/
  navigation/
  services/
  store/
  types/
  utils/
  assets/
  constants/

Each feature should contain its own components, screens, hooks, services, types and validation where appropriate.

Do not create one enormous global screens folder.

Do not duplicate common business logic between applications.

## 5. Routely design system

The design system is a mandatory foundation.

All applications must use the centralized design system.

Approved brand colours:

- Forest emerald: #075E45
- Signature lime: #B8E34A
- White: #FFFFFF
- Soft grey background: #F6F8F6
- Grey container: #F3F5F3
- Charcoal text: #17211C
- Muted text: #718078
- Border: #E5EBE6

### Background rules

White must remain the dominant background colour.

Use:
- White for main page backgrounds and content surfaces.
- Light grey for grouped containers and secondary panels.
- White inner cards where visual separation is useful.
- Forest emerald for primary actions and brand elements.
- Lime for restrained highlights and important indicators.

Never make every screen green.

Never use large amounts of lime as a background.

Avoid childish, overly saturated or visually noisy designs.

### Typography

Primary font: Manrope.

Use bundled font assets and consistent font weights:
- Regular
- Medium
- SemiBold
- Bold

Inter may be used for selected dense numerical or analytical interfaces when justified.

Never introduce an unrelated font without approval.

### Design rules

- Premium, clean, modern mobility experience.
- Generous but disciplined spacing.
- Clear visual hierarchy.
- Consistent corner radii.
- Restrained shadows.
- Accessible colour contrast.
- Responsive layouts.
- Consistent icon sizes and stroke weights.
- Clear loading, empty, error and success states.

Do not hardcode colours, typography, spacing or radii inside individual screens.

### Centralized design configuration

All design tokens must live in the shared design-token package.

Include:
- Colors
- Typography
- Spacing
- Radius
- Shadows
- Breakpoints
- Component sizes
- Light and dark theme configuration
- Brand assets
- Icon registry
- Map styling tokens

A global design change should require changing the shared source rather than editing individual screens.

Use platform-specific components where required, but keep their design consistent.

## 6. Icons and assets

Use Lucide icons through a centralized icon registry.

Do not scatter arbitrary icon libraries throughout the applications.

Keep:
- Logos
- App icons
- Splash assets
- Illustrations
- Fonts
- Map markers

in clearly organized asset directories.

Do not use emoji as production interface icons.

Do not invent or modify the Routely logo without an approved design direction.

## 7. Splash screen and application initialization

Every application must have a properly configured branded splash screen.

The startup process must support:
- App initialization
- Font loading
- Authentication session restoration
- User profile loading
- Role and permission loading
- Account status checks
- Safe navigation to the appropriate application screen

Do not expose a blank screen during initialization.

Do not display protected application content before authorization has been established.

Handle startup failures gracefully.

## 8. Onboarding

Onboarding must be designed as a proper application feature.

Support:
- Welcome screens
- Product introduction
- Relevant role-specific onboarding
- Account registration entry
- Permission explanations
- Location permission explanations where required
- Notification permission explanations
- Onboarding progress
- Resume incomplete onboarding

Do not assume that registration means onboarding is complete.

Track onboarding status independently from verification and account status.

## 9. Authentication and account identity

Use a centralized authentication foundation.

Support:
- Registration
- Login
- Phone number verification
- OTP workflows
- Email authentication where appropriate
- Password recovery
- Session restoration
- Logout
- Account suspension handling

Separate authentication identity from application profile information.

Do not store passwords or sensitive credentials in application state or logs.

Use server-side authorization for sensitive operations.

## 10. Roles and permissions

Support the following roles:

- Customer
- Rider
- Motorcycle owner
- Agent
- Merchant
- Operations staff
- Administrator
- Logistics partner
- Fleet partner

A user may have more than one authorized role.

Role selection in the interface must never grant permissions.

The server must independently validate role membership, account status and permission for every protected operation.

Keep separate concepts for:
- Account status
- Onboarding status
- Verification status
- Role membership
- Operational availability

Do not allow an unverified rider to perform active delivery operations.

Do not allow agents to approve their own sensitive verification submissions.

Use permission-based access rather than trusting frontend navigation.

## 11. Security and privacy

Security is mandatory.

- Enable appropriate Supabase Row Level Security.
- Validate sensitive operations on the server.
- Keep privileged credentials server-side.
- Never expose service-role keys to mobile or browser clients.
- Use private storage for identity and motorcycle documents.
- Apply signed access to private documents where appropriate.
- Validate uploads and file types.
- Restrict data access to authorized roles and ownership relationships.
- Maintain audit logs for sensitive administrative actions.
- Avoid logging personal information and secrets.
- Use environment variables for configuration.

Never rely only on hidden buttons or frontend route protection.

## 12. Backend and business logic

Use modular architecture and clear domain boundaries.

Separate:
- Identity
- Customer management
- Rider management
- Agent management
- Motorcycle fleet
- Financing
- Dispatch
- Delivery tracking
- Partner management
- Payments and settlements
- Notifications
- Administration

Critical operations must be implemented through secure server-side operations.

Examples:
- Rider verification
- Motorcycle approval
- Dispatch assignment
- Delivery state transitions
- Repayment processing
- Financial reconciliation
- Permission changes

Use database transactions and appropriate constraints for operations that must be atomic.

Do not implement a critical dispatch or financial rule only in the frontend.

## 13. Delivery and dispatch integrity

Keep separate concepts for:
- Delivery request
- Delivery offer
- Rider assignment
- Route plan
- Delivery execution
- Delivery event history

Maintain permanent delivery history, including cancelled, rejected, failed and completed deliveries.

Do not overwrite historical events to hide changes.

Use additional events to represent corrections and reassignment.

Prevent incompatible rider assignments through server-side eligibility and route validation.

## 14. Coding standards

- Use strict TypeScript.
- Avoid `any` unless explicitly justified.
- Use clear, descriptive names.
- Write small reusable components.
- Keep business logic outside presentation components.
- Validate external input.
- Handle loading and error states.
- Avoid duplicate implementations.
- Avoid oversized files.
- Use consistent import aliases.
- Add tests for important business logic.
- Document complex decisions.

Do not introduce unnecessary abstractions or premature microservices.

Start with a modular monolith.

## 15. Documentation and project organization

Every major feature must have clear documentation.

Maintain:
- Architecture documentation
- Database documentation
- Workflow documentation
- API documentation
- Design-system documentation
- Screen registry
- Development status
- Testing status

Every screen should be recorded with:
- Application
- Feature
- Route
- Design status
- Development status
- API dependencies
- Testing status

Update documentation when the architecture changes.

## 16. GitHub Copilot working rules

Before implementing a feature:

1. Inspect the existing folder structure.
2. Read relevant project documentation.
3. Identify shared functionality.
4. Follow existing conventions.
5. Explain the planned files and changes.
6. Implement only the requested scope.
7. Run relevant checks and tests.
8. Update documentation.

Do not:
- Randomly create new root folders.
- Duplicate shared components.
- Change the design system without approval.
- Change architecture without explaining why.
- Replace existing code unnecessarily.
- Install packages without explaining their purpose.
- Generate large amounts of unrelated code.
- Invent backend tables or business rules without documenting them.

If requirements are unclear, ask before making a significant architectural decision.

## 17. Development philosophy

Routely must be built in approved stages.

First establish the project foundation.

Then establish the design system.

Then establish application initialization, splash screens, onboarding, authentication and role-based access.

Then establish the backend and security foundations.

Then build the application shells.

Only after these foundations are stable should major business features be developed.

Premium quality, maintainability and operational reliability are more important than rushing to produce many screens.