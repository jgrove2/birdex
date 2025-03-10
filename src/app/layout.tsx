import type { Metadata } from "next";
import NavigationMenu from "@/components/navigationMenu";
import "./globals.css";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div role="region" className="inner-container">
        {children}
        <NavigationMenu />
        </div>
      </body>
    </html>
  );
}
