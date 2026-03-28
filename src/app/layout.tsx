import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import Script from "next/script";

export const metadata: Metadata = {
  title: "PBS Hub | Your Central Data & Notes Repository",
  description: "Advanced DataHub for PBS Palli Bidyut Metering, Equipment Manuals, and REB Technical Documents. Find reading manual data formats, technical specifications, and guides.",
  keywords: "pbs meter, palli bidyut, reb, reading manual data format, electricity meter, technical manual, smart meter, pbs datahub, bangladesh rural electrification board, pollibidut reading guide",
  openGraph: {
    title: "PBS Hub | Your Central Data & Notes Repository",
    description: "Search for any Palli Bidyut (PBS) meter manual or REB technical specification with detailed data formats.",
    type: "website",
    locale: "bn_BD",
  },
  icons: {
    icon: '/favicon.png',
  },
  verification: {
    google: "IdAoPkn7BxrOZRM_D7yIs43U0Xam172NcFRgIrCd108",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "PBS Hub",
    "url": "https://pbshub.vercel.app/",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://pbshub.vercel.app/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <html lang="en">
      <head>
        <Script
          id="monetag-ad-manager"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var lastLoadTime = localStorage.getItem('monetag_last_load_time');
                  var currentTime = new Date().getTime();
                  var COOLDOWN = 15 * 60 * 1000; // 15 Mins
                  
                  if (!lastLoadTime || (currentTime - parseInt(lastLoadTime, 10)) > COOLDOWN) {
                    var s = document.createElement('script');
                    s.src = "https://quge5.com/88/tag.min.js";
                    s.setAttribute("data-zone", "224134");
                    s.async = true;
                    s.setAttribute("data-cfasync", "false");
                    document.head.appendChild(s);
                    localStorage.setItem('monetag_last_load_time', currentTime.toString());
                  }
                } catch(e) {}
              })();
            `
          }}
        />
      </head>
      <body className="animate-fade" suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Navbar />
        <main style={{ paddingTop: '80px', minHeight: '100vh' }}>
          {children}
        </main>
        
        <footer className="footer-glass">
            <div className="container footer-content">
                <p>&copy; 2026 PBShub. All Rights Reserved.</p>
                <div className="footer-links">
                    <Link href="/terms">Terms</Link>
                    <Link href="/privacy">Privacy</Link>
                    <Link href="/support">Support</Link>
                </div>
            </div>
        </footer>
      </body>
    </html>
  );
}
