import type { Metadata } from "next";
import NavigationMenu from "@/components/navigationMenu";
import bgImage from "@/../public/birdSketch.jpg";
import "./globals.css";
import { Inter, Comfortaa } from "next/font/google";
import { TanstackProvider } from "@/components/providers/tanstackProvider";
import {
  ClerkProvider,
  RedirectToSignIn,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
const inter = Inter({ subsets: ["latin"] });
const comfortaa = Comfortaa({
  subsets: ["latin"],
  variable: "--font-comfortaa",
});

export const metadata: Metadata = {
  title: "Birdex",
  description: "Birdex is a platform for cataloging bird sightings",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <TanstackProvider>
        <html lang="en" className={`${inter.className} ${comfortaa.variable}`}>
          <SignedIn>
            <body style={{ backgroundImage: `url(${bgImage.src})` }}>
              <div role="region" className="inner-container">
                {children}
                <NavigationMenu />
              </div>
            </body>
          </SignedIn>
          <SignedOut>
            <RedirectToSignIn />
          </SignedOut>
        </html>
      </TanstackProvider>
    </ClerkProvider>
  );
}
