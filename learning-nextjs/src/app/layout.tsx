import type { Metadata } from "next";
import { Inter, Merriweather_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Providers } from "@/app/providers";
import { UiLoader } from "./loadingComponents/UiLoader";
import { AnimRoute } from "./loadingComponents/AnimRoute";
import { TokenWatcher } from "./components/TokenWatcher";
import { Header } from "./components/Header";




export const MSans = Merriweather_Sans({
  subsets:['latin'],
  variable:'--font-Merriweather_Sans'
})

export const PDsiplay = Playfair_Display({
  subsets:['latin'],
  variable:'--font-Playfair_Display'
})

export const metadata: Metadata = {
  title: "Nextjs Practice",
  description: "Learning Nextjs",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {



  return (
    <html lang="en">
      <body
        className={`${MSans.variable} ${PDsiplay.variable} antialiased`}>
        <Providers>
            <UiLoader>       
              <AnimRoute>
                <Header/>
                {children}
              </AnimRoute>
            </UiLoader>
        </Providers>
      </body>
    </html>
  );
}
