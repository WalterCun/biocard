"use client";

import { useEffect } from "react";

export function PWAInstaller() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((reg) => console.log("SW registered:", reg))
        .catch((err) => console.log("SW registration failed:", err));
    }
  }, []);

  return null;
}
