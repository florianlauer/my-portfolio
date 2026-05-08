import type { ReactNode } from "react";
import "./globals.css";

/**
 * Pure passthrough — `<html>` and `<body>` live in `[locale]/layout.tsx`
 * so `lang` always matches the actual route locale.
 */
export default function RootLayout({ children }: { children: ReactNode }): ReactNode {
  return children;
}
