import type { Metadata } from "next";
import NavigationMenu from "@/components/navigationMenu";
import bgImage from "@/../public/birdSketch.jpg";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

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
      <html lang="en">
        <body style={{ backgroundImage: `url(${bgImage.src})` }}>
          <div role="region" className="inner-container">
            {children}
            <NavigationMenu />
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
