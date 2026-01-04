import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar/navBar";
import Footer from "./components/footer";
import { GoogleAnalytics } from '@next/third-parties/google';


export const metadata: Metadata = {
  title: {
    default: "Monash Human Power",
    template: "%s | Monash Human Power",
  },
  description: "Monash Human Power (MHP) is a student-led engineering team designing, manufacturing, and racing cutting-edge human-powered vehicles. Join us in pushing the boundaries of engineering performance.",
  keywords: ["human powered vehicle", "HPV", "bike racing", "engineering", "Monash University", "student engineering", "sustainable transportation"],
  authors: [{ name: "Monash Human Power" }],
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: "https://monashhumanpower.com",
    siteName: "Monash Human Power",
    title: "Monash Human Power",
    description: "Student-led engineering team designing and racing cutting-edge human-powered vehicles",
  },
  twitter: {
    card: "summary_large_image",
    title: "Monash Human Power",
    description: "Student-led engineering team designing and racing cutting-edge human-powered vehicles",
  },
  robots: {
    index: true,
    follow: true,
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
        <Navbar />
        <div className="flex-1 " style={{width: "95%", margin: "0 auto", textAlign: "center",} } >{children}</div>
        <Footer />
      </body>
    </html>
  );
}
