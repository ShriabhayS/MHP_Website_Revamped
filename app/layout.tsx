import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar/navBar";
import Footer from "./components/footer";
import { GoogleAnalytics } from '@next/third-parties/google';


export const metadata: Metadata = {
  metadataBase: new URL('https://www.monashhumanpower.org'),
  title: "Monash Human Power",
  description: "Monash Human Power is a student-led engineering team designing, manufacturing, and racing fully-faired human-powered vehicles (HPVs) to push the limits of human speed. Based at Monash University in Melbourne, Australia.",
  keywords: ["Monash Human Power", "HPV", "human-powered vehicle", "engineering", "Monash University", "Melbourne", "speed record"],
  authors: [{ name: "Monash Human Power Team" }],
  openGraph: {
    title: "Monash Human Power",
    description: "Student-led engineering team designing and racing fully-faired human-powered vehicles to push the limits of human speed.",
    url: "https://www.monashhumanpower.org",
    siteName: "Monash Human Power",
    images: [
      {
        url: "/images/home_page/v3.png",
        width: 1316,
        height: 426,
        alt: "Monash Human Power V3 Bike",
      },
    ],
    locale: "en_AU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Monash Human Power",
    description: "Student-led engineering team designing and racing fully-faired human-powered vehicles to push the limits of human speed.",
    images: ["/images/home_page/v3.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <head>
        <GoogleAnalytics gaId="G-T8HB40Y133" /> 
      </head>
      <body
        className={" bg-black flex flex-col min-h-screen"}
      >
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-green focus:text-black focus:font-bold"
        >
          Skip to main content
        </a>
        <Navbar />
        <main id="main-content" className="flex-1 " style={{width: "95%", margin: "0 auto", textAlign: "center",} } >{children}</main>
        <Footer />
      </body>
    </html>
  );
}
