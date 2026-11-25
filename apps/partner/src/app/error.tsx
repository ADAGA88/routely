"use client";

import { AppShell } from "@routely/ui-web";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <AppShell appName="Partner" description="" status="error" onRetry={reset} />;
}
