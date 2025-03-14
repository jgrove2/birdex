import type { Metadata } from "next";
import NavigationMenu from "@/components/navigationMenu";
import bgImage from "@/../public/birdSketch.jpg";
import { ClerkProvider, SignedIn } from "@clerk/nextjs";
import "./globals.css";
import { Inter, Comfortaa } from "next/font/google";
import { TanstackProvider } from "@/components/providers/tanstackProvider";
const inter = Inter({ subsets: ["latin"] });
const comfortaa = Comfortaa({
  subsets: ["latin"],
  variable: "--font-comfortaa",
});

export const metadata: Metadata = {
  title: "Birdex",
  description: "Birdex is a platform for cataloging bird sightings",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <TanstackProvider>
        <html lang="en" className={`${inter.className} ${comfortaa.variable}`}>
          <body style={{ backgroundImage: `url(${bgImage.src})` }}>
            <div role="region" className="inner-container">
              {children}
              <SignedIn>
                <NavigationMenu />
              </SignedIn>
            </div>
          </body>
        </html>
      </TanstackProvider>
    </ClerkProvider>
  );
}
