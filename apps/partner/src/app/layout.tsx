import type { Metadata } from "next";
import type { ReactNode } from "react";
import { AppearanceProvider } from "@routely/ui-web";
import "@routely/ui-web/styles.css";

export const metadata: Metadata = {
  title: "Routely Partner",
  description: "Routely partner application foundation.",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <AppearanceProvider appName="partner">{children}</AppearanceProvider>
      </body>
    </html>
  );
}
