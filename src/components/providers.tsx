"use client";

import { ThemeProvider } from "next-themes";
import { MotionConfig } from "framer-motion";
import { SmoothScroll } from "@/components/smooth-scroll";
import { ToastProvider } from "@/components/toast";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
      <MotionConfig reducedMotion="user">
        <ToastProvider>
          <SmoothScroll />
          {children}
        </ToastProvider>
      </MotionConfig>
    </ThemeProvider>
  );
}
