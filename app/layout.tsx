import type { Metadata } from "next";
import { Geist, Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider"

const robotoFont = Roboto({
  variable: "--font-roboto",
  weight:['400', '700'],
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "NoteHub",
  description: "Manage your notes easily and efficiently",
  openGraph: {
    title: "NoteHub",
   url:"https://08-zustand-zeta-self.vercel.app/",
     description: "Manage your notes easily and efficiently",
    images:[
      {
      alt:"NoteHub preview",
      url: "/notehub-og-meta.jpg",
      width: 1200,
      height: 630,
    },
  ],
  }
};

export default function RootLayout({
  children,
  modal
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${robotoFont.variable}`}>
      <body>
        <TanStackProvider>
        <Header/>
        {children}
        {modal}
        <div id="modal-root"></div>
        <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}
