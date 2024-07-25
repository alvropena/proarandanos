import React from "react";
import type { Metadata, ResolvingMetadata } from 'next'
import { Nunito, Nunito_Sans } from "next/font/google";
import clsx from "clsx";
import "./globals.css";
import { createClient } from "../prismicio";
import Header from "../app/components/header";
import Footer from "../app/components/footer";

const nunito = Nunito({ subsets: ["latin"], variable: '--font-nunito', display: 'swap' });
const nunitoSans = Nunito_Sans({ subsets: ["latin"], variable: '--font-nunito-sans', display: 'swap' });

type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();

  const settings = await client.getSingle("settings");

  return {
    title: settings.data.site_title || "Proarandanos",
    description: settings.data.meta_description || "Proarandanos - Arándanos",
    openGraph: {
      images: [settings.data.og_image.url || ""],
    },
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={clsx(nunito.variable, nunitoSans.variable)}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
