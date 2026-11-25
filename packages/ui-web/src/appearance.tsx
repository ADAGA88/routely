"use client";

import { useEffect, useState, type CSSProperties, type ReactElement, type ReactNode } from "react";
import { designTokens, type AppearanceMode } from "@routely/design-tokens";
import { RoutelyIcon } from "./icons";

type AppearanceStyle = CSSProperties & { [key: `--${string}`]: string };

export function AppearanceProvider({
  appName,
  children,
}: {
  appName: string;
  children: ReactNode;
}): ReactElement {
  const [mode, setMode] = useState<AppearanceMode>("lime");
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<AppearanceMode | null>(null);
  const key = `routely.appearance.${appName}.v1`;

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(key);
      if (saved !== null && saved !== "lime" && saved !== "emerald") {
        throw new Error("Invalid saved appearance.");
      }
      if (saved) setMode(saved);
    } catch {
      setError("Could not load your saved appearance.");
    } finally {
      setReady(true);
    }
  }, [key]);

  useEffect(() => {
    if (!notice) return;
    const timer = setTimeout(() => setNotice(null), 3000);
    return () => clearTimeout(timer);
  }, [notice]);

  function toggle(): void {
    const next = mode === "lime" ? "emerald" : "lime";
    setNotice(null);
    try {
      window.localStorage.setItem(key, next);
      setMode(next);
      setError(null);
      setNotice(next);
    } catch {
      setError("Could not save your appearance. Please try again.");
    }
  }

  const style: AppearanceStyle = {
    "--routely-primary": designTokens.appearance[mode].primary,
    "--routely-on-primary": designTokens.appearance[mode].onPrimary,
    "--appearance-white": designTokens.colors.white,
    "--appearance-border": designTokens.colors.border,
    "--appearance-text": designTokens.colors.charcoal,
    "--appearance-error": designTokens.colors.error,
    "--appearance-notice-radius": `${designTokens.radius.md}px`,
    "--appearance-small": `${designTokens.spacing.sm}px`,
    "--appearance-medium": `${designTokens.spacing.md}px`,
    "--appearance-label": `${designTokens.typography.sizes.label}px`,
    "--appearance-touch": `${designTokens.componentSizes.touchTarget}px`,
    "--appearance-weight": designTokens.typography.weights.medium,
    "--appearance-shadow": designTokens.shadows.cardCss,
    "--appearance-motion": `${designTokens.motion.slow}ms`,
  };
  return (
    <div style={style}>
      <div className="routely-appearance-bar">
        <button
          aria-label={`Appearance: ${mode}. Switch to ${mode === "lime" ? "emerald" : "lime"}.`}
          className="routely-appearance-switch"
          disabled={!ready}
          onClick={toggle}
          type="button"
        >
          <RoutelyIcon name="palette" />
        </button>
        {notice && !error ? (
          <div className="routely-appearance-notice" role="status">
            {notice === "lime" ? "Lime mode enabled" : "Emerald mode enabled"}
          </div>
        ) : null}
        {error ? (
          <p className="routely-appearance-error" role="status">
            {error}
          </p>
        ) : null}
      </div>
      {children}
    </div>
  );
}
