"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

export default function MonetagAd({ zoneId = "10797546" }: { zoneId?: string }) {
  const [shouldLoadAd, setShouldLoadAd] = useState(false);

  useEffect(() => {
    try {
      const lastAdLoadTime = localStorage.getItem("monetag_last_load_time");
      const currentTime = new Date().getTime();
      const ONE_HOUR = 60 * 60 * 1000; // 1 hour in milliseconds

      // If ad was never loaded or 1 hour has passed
      if (!lastAdLoadTime || currentTime - parseInt(lastAdLoadTime, 10) > ONE_HOUR) {
        setShouldLoadAd(true);
        localStorage.setItem("monetag_last_load_time", currentTime.toString());
      }
    } catch (e) {
      // Fallback for privacy mode or if localStorage is disabled
      // Load the ad normally so we don't lose revenue, but prevent crashes
      setShouldLoadAd(true);
    }
  }, []);

  if (!shouldLoadAd) {
    return null;
  }

  return (
    <Script
      src="https://quge5.com/88/tag.min.js"
      data-zone={zoneId}
      strategy="lazyOnload"
      data-cfasync="false"
    />
  );
}
