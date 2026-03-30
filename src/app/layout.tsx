import type { Metadata } from "next";
import { Outfit, DM_Sans } from "next/font/google";
import "./globals.css";
import { PublicHeader, PublicFooter } from "@/components/PublicShell";

const outfit = Outfit({
  subsets: ["latin", "latin-ext"],
  variable: "--font-outfit",
});

const dmSans = DM_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://navticni-tecaj.si"),
  title: {
    default: "Navtični tečaji Izola — Od začetnika do samostojne plovbe",
    template: "%s | Navtični tečaji Izola",
  },
  description: "Praktični tečaji jadranja, pristajanja in plovbe z gumenjakom v Izoli. Garancija na znanje, termini skozi vse leto. Tečaj + najem plovila na enem mestu.",
  openGraph: {
    type: "website",
    locale: "sl_SI",
    url: "https://navticni-tecaj.si",
    siteName: "Navtični tečaji Izola",
    images: [{ url: "/images/hero.png", width: 1200, height: 630, alt: "Navtični tečaji Izola — praktični tečaji jadranja" }],
  },
  twitter: {
    card: "summary_large_image",
  },
  alternates: {
    canonical: "https://navticni-tecaj.si",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sl" className={`${outfit.variable} ${dmSans.variable}`} data-scroll-behavior="smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "@id": "https://navticni-tecaj.si",
              name: "Navtični tečaji Izola",
              description: "Praktični tečaji jadranja, pristajanja in plovbe z gumenjakom v Izoli. Najem plovil in jadralski izleti.",
              url: "https://navticni-tecaj.si",
              image: "https://navticni-tecaj.si/images/logo.png",
              logo: "https://navticni-tecaj.si/images/logo.png",
              telephone: "+38640871110",
              email: "info@solajadranja.si",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Izola",
                addressCountry: "SI",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 45.5353,
                longitude: 13.6603,
              },
              priceRange: "€€",
              openingHoursSpecification: {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                opens: "08:00",
                closes: "20:00",
              },
            }),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col font-sans bg-sand text-slate-800">
        <PublicHeader />
        <main className="flex-1">
          {children}
        </main>
        <PublicFooter />
      </body>
    </html>
  );
}
