"use client";

import { useState, useEffect } from "react";
import SpinWheel from "./SpinWheel";

export default function SpinWheelTrigger() {
  const [showWheel, setShowWheel] = useState(false);
  const [hasSpun, setHasSpun] = useState(true); // default true to prevent flash

  useEffect(() => {
    try {
      const used = localStorage.getItem("diara-spin-used");
      setHasSpun(!!used);

      // Auto-popup for first-time visitors after 5 seconds
      if (!used) {
        const timer = setTimeout(() => {
          setShowWheel(true);
        }, 5000);
        return () => clearTimeout(timer);
      }
    } catch {
      setHasSpun(false);
    }
  }, []);

  if (hasSpun && !showWheel) return null;

  return (
    <>
      {showWheel && (
        <SpinWheel
          onClose={() => {
            setShowWheel(false);
            setHasSpun(true);
          }}
        />
      )}
    </>
  );
}
