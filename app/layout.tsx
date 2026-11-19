import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Welcome back — Haven",
  description: "Sign in to your Haven account and find your place to feel at home.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
