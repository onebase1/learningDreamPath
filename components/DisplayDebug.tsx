// app/components/DisplayDebug.tsx
"use client";

import React, { useEffect, useState } from 'react';

export function DisplayDebug() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
      const displayInfo = {
        devicePixelRatio: window.devicePixelRatio,
        viewportWidth: window.innerWidth,
        viewportHeight: window.innerHeight,
        rootFontSize: window.getComputedStyle(document.documentElement).fontSize
      };
      console.log('Display Settings:', displayInfo);
    }
  }, []);

  if (!mounted) return null;
  return null;
}