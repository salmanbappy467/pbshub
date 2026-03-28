"use client";

import { useEffect } from "react";

export default function MonetagAd({ zoneId = "224134" }: { zoneId?: string }) {
  useEffect(() => {
    try {
      const lastAdLoadTime = localStorage.getItem("monetag_last_load_time");
      const currentTime = new Date().getTime();
      
      // ৫ মিনিটের ক্যাপ (টেস্টিংয়ের জন্য)। আপনার প্রয়োজন অনুযায়ী 1000 * 60 * 60 (১ ঘণ্টা) করে দিতে পারবেন।
      const COOLDOWN = 5 * 60 * 1000; 

      if (!lastAdLoadTime || currentTime - parseInt(lastAdLoadTime, 10) > COOLDOWN) {
        
        // ডাইনামিকালি স্ক্রিপ্ট অ্যাড করা হচ্ছে, যা Next.js-এর অপটিমাইজেশনকে বাইপাস করে সরাসরি কাজ করবে
        const script = document.createElement("script");
        script.src = "https://quge5.com/88/tag.min.js";
        script.setAttribute("data-zone", zoneId);
        script.async = true;
        script.setAttribute("data-cfasync", "false");
        document.body.appendChild(script);

        // স্টোরেজে টাইম সেভ হচ্ছে
        localStorage.setItem("monetag_last_load_time", currentTime.toString());
      }
    } catch (e) {
      console.error("Monetag Ad Error:", e);
    }
  }, [zoneId]);

  return null;
}
