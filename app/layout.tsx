import {
  ClerkProvider,
  Show,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { shadcn } from "@clerk/ui/themes";
import Link from "next/link";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
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
  title: "LinkShortener",
  description: "Create and manage short links.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ClerkProvider appearance={{ theme: shadcn }}>
          <header className="flex items-center justify-between border-b border-border px-6 py-4 sm:px-10">
            <Link href="/" className="text-lg font-semibold tracking-tight">
              LinkShortener
            </Link>
            <Suspense fallback={<div className="h-9 w-36" />}>
              <Show when="signed-out">
                <div className="flex items-center gap-3">
                  <SignInButton mode="redirect">
                    <Button variant="ghost" size="lg">
                      Sign in
                    </Button>
                  </SignInButton>
                  <SignUpButton mode="redirect">
                    <Button size="lg">
                      Sign up
                    </Button>
                  </SignUpButton>
                </div>
              </Show>
              <Show when="signed-in">
                <UserButton />
              </Show>
            </Suspense>
          </header>
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}