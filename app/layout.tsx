import React from "react";
import type { Metadata, ResolvingMetadata } from 'next'
import { Nunito, Nunito_Sans } from "next/font/google";
import clsx from "clsx";
import "./globals.css";
import { createClient } from "../prismicio";

const nunito = Nunito({ subsets: ["latin"], variable: '--font-nunito', display: 'swap' });
const nunitoSans = Nunito_Sans({ subsets: ["latin"], variable: '--font-nunito-sans', display: 'swap' });

type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const client = createClient();

  const page = await client.getSingle("settings");

  return {
    title: page.data.site_title || "Proarandanos",
    description: page.data.meta_description || "Proarandanos - Arándanos",
    openGraph: {
      images: [page.data.og_image.url],
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
        <header>Header!</header>
        {children}
        <footer>Footer!</footer>
      </body>
    </html>
  );
}
