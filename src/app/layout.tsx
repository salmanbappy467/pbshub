import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import MonetagAd from "@/components/MonetagAd";

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
      <body className="animate-fade" suppressHydrationWarning>
        <MonetagAd zoneId="10797546" />
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
