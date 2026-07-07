import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/providers/theme-provider";
import { AuthProvider } from "@/providers/auth-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MySchoolOps — AI-Powered School Management Platform",
  description:
    "The complete AI-powered school management platform. Automate administration, academics, communication, finance, and transportation for modern schools.",
  keywords: ["school management", "education software", "AI", "attendance", "fee management"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
      suppressHydrationWarning
    >
      <Script id="theme-init" strategy="beforeInteractive">
        {`(function(){try{var t=localStorage.getItem('theme');var d=window.matchMedia('(prefers-color-scheme: dark)').matches;var theme=t||(d?'dark':'light');document.documentElement.setAttribute('data-theme',theme);document.documentElement.style.colorScheme=theme;}catch(e){}})();`}
      </Script>
      <body className="min-h-full bg-background text-foreground">
        <ThemeProvider>
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
