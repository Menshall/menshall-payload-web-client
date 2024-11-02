import React from "react";
import { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

import "../css/app.scss";
import { Montserrat } from "next/font/google";
import { mergeOpenGraph } from "@/_utilities/mergeOpenGraph";
import {
  getAllMedia,
  getBarbers,
  getContacts,
  getFooter,
  getHeader,
  getSchedule,
  getServices,
  getSettings,
  getSocials,
} from "@/lib/enpoints";
import { getUser } from "@/lib/cookies";
import { Data, GeneralDataProvider } from "@/providers/general";
import Script from "next/script";

const font = Montserrat({
  subsets: ["cyrillic"],
  weight: ["100", "300", "400"],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [
    header,
    contacts,
    settings,
    services,
    user,
    footer,
    socials,
    barbers,
    schedule,
    media,
  ] = await Promise.all([
    getHeader(),
    getContacts(),
    getSettings(),
    getServices(),
    getUser(),
    getFooter(),
    getSocials(),
    getBarbers(),
    getSchedule(),
    getAllMedia(),
  ]);
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={font.className}
      style={{
        //@ts-ignore
        "--font-montserrat": `${font.style.fontFamily}`,
      }}
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        {/* eslint-disable-next-line @next/next/inline-script-id */}
        {/*<Script*/}
        {/*  strategy="afterInteractive"*/}
        {/*  dangerouslySetInnerHTML={{*/}
        {/*    __html: `*/}
        {/*        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':*/}
        {/*        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],*/}
        {/*        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=*/}
        {/*        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);*/}
        {/*        })(window,document,'script','dataLayer','GTM-MC5V4ML');*/}
        {/*      `,*/}
        {/*  }}*/}
        {/*/>*/}
        {/*<Script*/}
        {/*  async*/}
        {/*  src="https://www.googletagmanager.com/gtm.js?id=GTM-MC5V4ML"*/}
        {/*/>*/}
        <Script
          type="text/javascript"
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-Y9GEJJ9GBV&amp;cx=c&amp;_slc=1"
        />
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-Y9GEJJ9GBV&amp;l=dataLayer&amp;cx=c"
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-Y9GEJJ9GBV', {
              page_path: window.location.pathname,
            });
          `,
          }}
        />
        {/*<Script*/}
        {/*  strategy="lazyOnload"*/}
        {/*  async*/}
        {/*  src="https://www.google-analytics.com/analytics.js"*/}
        {/*/>*/}
        {/*<Script*/}
        {/*  src="https://connect.facebook.net/signals/config/1223843247804052?v=next&amp;r=stable&amp;domain=www.menshall.com.ua"*/}
        {/*  async*/}
        {/*/>*/}
        {/*<Script*/}
        {/*  strategy="lazyOnload"*/}
        {/*  src="https://connect.facebook.net/signals/config/279072927584071?v=next&amp;r=stable&amp;domain=www.menshall.com.ua"*/}
        {/*  async*/}
        {/*/>*/}
        {/*<Script*/}
        {/*  async*/}
        {/*  src="https://connect.facebook.net/en_US/fbevents.js?v=next"*/}
        {/*/>*/}
      </head>
      <body className="grid-container">
        <div id="portal" />
        <GeneralDataProvider
          initialData={{
            media: media as Data["media"],
            header: header as Data["header"],
            contacts: contacts as Data["contacts"],
            services: services as Data["services"],
            settings: settings as Data["settings"],
            user: user as Data["user"],
            footer: footer as Data["footer"],
            socials: socials as Data["socials"],
            barbers: barbers as Data["barbers"],
            schedule: schedule as Data["schedule"],
            barbersFormatted: [] as Data["barbersFormatted"],
          }}
        >
          {children}
        </GeneralDataProvider>
        <SpeedInsights />
        <Analytics />
        {/* Google Tag Manager (noscript) */}
        <noscript
          dangerouslySetInnerHTML={{
            __html: `
                <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MC5V4ML"
                height="0" width="0" style="display:none;visibility:hidden"></iframe>
              `,
          }}
        />
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_API_URL || "https://payloadcms.com",
  ),
  twitter: {
    card: "summary_large_image",
    creator: "@maslovskyy",
  },
  openGraph: mergeOpenGraph(),
};
