import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next"
import "./globals.css";

const nunito = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-nunito-sans",
  weight: ["400", "500", "600", "700", "900"],
});

export const metadata: Metadata = {
  title: "O que Pedro fez?",
  icons: {
    icon: "/icon.png",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${nunito.variable} antialiased bg-[url('/mundo-mur.png')] bg-no-repeat min-h-screen w-screen`}
        style={{
          backgroundSize: 'auto 100vh'
        }}
      >
        <Analytics />
        {children}
      </body>
    </html>
  );
}
