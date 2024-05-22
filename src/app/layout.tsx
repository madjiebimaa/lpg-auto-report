import type { Metadata } from "next";
import { Toaster } from "sonner";

import { inter } from "@/lib/fonts";

import "./globals.css";

export const metadata: Metadata = {
  title: "PLG Auto Report",
  description:
    "Automate and streamline your LPG transaction reporting with LPGAutoReport. Gain real-time data insights, enhance accuracy, and ensure compliance with our user-friendly, cloud-based solution. Boost efficiency and drive growth today.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className={inter.className}>
        {children}
        <Toaster richColors />
      </body>
    </html>
  );
}
