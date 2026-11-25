import type { CSSProperties, ReactElement, ReactNode } from "react";
import routelyPrimaryLogo from "@routely/brand-assets/routely-logo.png";
import { designTokens } from "@routely/design-tokens";

export { PageContainer, RoutelyButton, RoutelySurface, RoutelyTextField } from "./primitives";
export { RoutelyIcon, type RoutelyIconName, type RoutelyIconProps } from "./icons";
export { AppearanceProvider } from "./appearance";

export interface AppShellProps {
  appName: string;
  description: string;
  status?: "ready" | "loading" | "error";
  onRetry?: () => void;
  children?: ReactNode;
}

export interface WelcomeScreenProps {
  appName: string;
  headline: string;
  description: string;
}

export interface RoutelyLogoProps {
  width?: number;
  alt?: string;
}

export function RoutelyLogo({ width = 148, alt = "Routely" }: RoutelyLogoProps): ReactElement {
  const height = Math.round(width / (1729 / 296));
  return (
    <img
      alt={alt}
      className="routely-logo-image"
      height={height}
      src={routelyPrimaryLogo.src}
      style={{ height: "auto", maxWidth: "100%", width }}
      width={width}
    />
  );
}

type RoutelyStyle = CSSProperties & { [key: `--${string}`]: string };

const colors = designTokens.colors;
const { spacing, motion, radius, typography, componentSizes } = designTokens;

const sharedStyle: RoutelyStyle = {
  "--routely-background": colors.background,
  "--routely-white": colors.white,
  "--routely-container": colors.container,
  "--routely-forest": colors.forest,
  "--routely-lime": colors.lime,
  "--routely-charcoal": colors.charcoal,
  "--routely-muted": colors.muted,
  "--routely-border": colors.border,
  "--routely-error": colors.error,
  "--routely-font-family": `${typography.fontFamily}, ${typography.fontFallback}`,
  "--routely-space-xs": `${spacing.xs}px`,
  "--routely-space-sm": `${spacing.sm}px`,
  "--routely-space-md": `${spacing.md}px`,
  "--routely-space-lg": `${spacing.lg}px`,
  "--routely-space-xl": `${spacing.xl}px`,
  "--routely-space-2xl": `${spacing["2xl"]}px`,
  "--routely-space-3xl": `${spacing["3xl"]}px`,
  "--routely-radius-sm": `${radius.sm}px`,
  "--routely-radius-md": `${radius.md}px`,
  "--routely-radius-lg": `${radius.lg}px`,
  "--routely-radius-xl": `${radius.xl}px`,
  "--routely-radius-secondary": `${radius.secondary}px`,
  "--routely-radius-input": `${radius.input}px`,
  "--routely-radius-card": `${radius.card}px`,
  "--routely-radius-panel": `${radius.panel}px`,
  "--routely-radius-icon-container": `${radius.iconContainer}px`,
  "--routely-radius-pill": `${radius.pill}px`,
  "--routely-border-width": `${componentSizes.borderWidth}px`,
  "--routely-touch-target": `${componentSizes.touchTarget}px`,
  "--routely-icon-size": `${componentSizes.icon}px`,
  "--routely-icon-stroke": `${componentSizes.iconStroke}`,
  "--routely-motion-fast": `${motion.fast}ms`,
  "--routely-motion-standard": `${motion.standard}ms`,
  "--routely-motion-slow": `${motion.slow}ms`,
  "--routely-card-shadow": designTokens.shadows.cardCss,
  "--routely-content-width": `${componentSizes.contentMaxWidth}px`,
  "--routely-button-height": `${componentSizes.buttonHeight}px`,
  "--routely-display-size": `${typography.sizes.display}px`,
  "--routely-heading-size": `${typography.sizes.heading}px`,
  "--routely-card-heading-size": `${typography.sizes.cardHeading}px`,
  "--routely-body-size": `${typography.sizes.body}px`,
  "--routely-caption-size": `${typography.sizes.caption}px`,
  "--routely-button-size": `${typography.sizes.button}px`,
  "--routely-numeric-size": `${typography.sizes.numeric}px`,
  "--routely-navigation-size": `${typography.sizes.navigation}px`,
  "--routely-label-size": `${typography.sizes.label}px`,
  "--routely-eyebrow-size": `${typography.sizes.eyebrow}px`,
  "--routely-body-line-height": `${typography.lineHeights.body}px`,
  "--routely-heading-line-height": `${typography.lineHeights.heading}px`,
  "--routely-section-heading-line-height": `${typography.lineHeights.sectionHeading}px`,
  "--routely-card-heading-line-height": `${typography.lineHeights.cardHeading}px`,
  "--routely-caption-line-height": `${typography.lineHeights.caption}px`,
  "--routely-button-line-height": `${typography.lineHeights.button}px`,
  "--routely-compact-heading-line-height": `${typography.lineHeights.compactHeading}px`,
  "--routely-brand-size": `${typography.sizes.brand}px`,
  "--routely-brand-letter-spacing": `${typography.letterSpacing.brand}px`,
  "--routely-eyebrow-letter-spacing": `${typography.letterSpacing.eyebrow}px`,
  "--routely-display-letter-spacing": `${typography.letterSpacing.display}px`,
  "--routely-illustration-height": `${componentSizes.illustrationHeight}px`,
  "--routely-compact-illustration-height": `${componentSizes.compactIllustrationHeight}px`,
  "--routely-route-height": `${componentSizes.routeHeight}px`,
  "--routely-illustration-note-max-width": `${componentSizes.illustrationNoteMaxWidth}px`,
  "--routely-welcome-heading-max-width": `${componentSizes.welcomeHeadingMaxWidth}px`,
  "--routely-welcome-description-max-width": `${componentSizes.welcomeDescriptionMaxWidth}px`,
  "--routely-status-card-max-width": `${componentSizes.statusCardMaxWidth}px`,
  "--routely-header-height": `${componentSizes.headerHeight}px`,
  "--routely-supporting-line-height": `${typography.lineHeights.supporting}px`,
  "--routely-footnote-line-height": `${typography.lineHeights.footnote}px`,
  "--routely-indicator-size": `${componentSizes.indicator}px`,
  "--routely-route-stroke": `${componentSizes.routeStroke}px`,
  "--routely-marker-border": `${componentSizes.markerBorder}px`,
  "--routely-marker-start": `${componentSizes.markerStart}px`,
  "--routely-marker-end": `${componentSizes.markerEnd}px`,
  "--routely-inner-dot": `${componentSizes.innerDot}px`,
  "--routely-marker-end-dot": `${componentSizes.markerEndDot}px`,
  "--routely-section-heading-size": `${typography.sizes.sectionHeading}px`,
  "--routely-weight-regular": typography.weights.regular,
  "--routely-weight-medium": typography.weights.medium,
  "--routely-weight-semibold": typography.weights.semibold,
  "--routely-weight-bold": typography.weights.bold,
};

function RouteIllustration(): ReactElement {
  return (
    <aside aria-label="Decorative route illustration" className="routely-illustration">
      <span className="routely-illustration__label">YOUR ROUTELY JOURNEY</span>
      <span aria-hidden="true" className="routely-route" />
      <span aria-hidden="true" className="routely-route-marker routely-route-marker--start">
        <span />
      </span>
      <span aria-hidden="true" className="routely-route-marker routely-route-marker--end">
        <span />
      </span>
      <div className="routely-illustration__note">
        <strong>A thoughtful start</strong>
        <span>A preview of what is ahead</span>
      </div>
    </aside>
  );
}

export function WelcomeScreen({
  appName,
  headline,
  description,
}: WelcomeScreenProps): ReactElement {
  const steps = [
    {
      number: "01",
      title: "Get oriented",
      detail: "A quick introduction to your Routely experience.",
    },
    {
      number: "02",
      title: "Explore the basics",
      detail: "See what the app foundation is preparing for.",
    },
    {
      number: "03",
      title: "Continue when ready",
      detail: "Your full setup will come in a later stage.",
    },
  ];

  return (
    <main className="routely-page" style={sharedStyle}>
      <div className="routely-container">
        <header className="routely-header">
          <a aria-label="Routely home" className="routely-logo-link" href="/">
            <RoutelyLogo width={148} />
          </a>
          <span className="routely-app-badge">
            <span aria-hidden="true" className="routely-app-badge__dot" />
            {appName}
          </span>
        </header>

        <section aria-labelledby="welcome-heading" className="routely-hero">
          <div className="routely-hero__copy">
            <p className="routely-eyebrow">{appName} experience</p>
            <h1 id="welcome-heading">{headline}</h1>
            <p className="routely-hero__description">{description}</p>
            <button className="routely-primary-action" disabled type="button">
              {appName} setup coming soon
            </button>
            <p className="routely-action-note">
              This preview does not create an account or start setup.
            </p>
          </div>
          <RouteIllustration />
        </section>

        <section aria-labelledby="preview-heading" className="routely-preview">
          <div className="routely-preview__heading">
            <h2 id="preview-heading">A simple place to begin</h2>
            <p>A preview of the experience</p>
          </div>
          <div className="routely-preview__steps">
            {steps.map((step) => (
              <article className="routely-step" key={step.number}>
                <span aria-hidden="true" className="routely-step__number">
                  {step.number}
                </span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.detail}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <footer className="routely-footer">
          Routely {appName} preview <span aria-hidden="true">·</span> Visual foundation only{" "}
          <span aria-hidden="true">·</span> No live account or trip data
        </footer>
      </div>
    </main>
  );
}

export function AppShell({
  appName,
  description,
  status = "ready",
  onRetry,
  children,
}: AppShellProps): ReactElement {
  const isLoading = status === "loading";
  const isError = status === "error";
  const heading = isLoading
    ? "Preparing your workspace"
    : isError
      ? "Routely could not continue"
      : appName;
  const message = isLoading
    ? "Loading the Routely interface…"
    : isError
      ? "The interface could not finish initializing. Try again."
      : description;

  return (
    <main className="routely-page routely-page--status" style={sharedStyle}>
      <div
        aria-busy={isLoading}
        className="routely-status-card"
        role={isLoading ? "status" : isError ? "alert" : undefined}
      >
        <a aria-label="Routely home" className="routely-logo-link" href="/">
          <RoutelyLogo width={148} />
        </a>
        <p className="routely-eyebrow">
          {isLoading ? "Initializing" : isError ? "Startup issue" : "Application foundation"}
        </p>
        <h1>{heading}</h1>
        <p
          className={
            isError ? "routely-status-card__message is-error" : "routely-status-card__message"
          }
        >
          {message}
        </p>
        {isError && onRetry ? (
          <button className="routely-primary-action" onClick={onRetry} type="button">
            Try again
          </button>
        ) : null}
        {children}
      </div>
    </main>
  );
}
