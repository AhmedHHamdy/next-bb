import type { Metadata } from "next";
import "./globals.css";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import localFont from "next/font/local"
import Header from "../components/Header";
import Footer from "../components/Footer";
import ReactQueryProvider from "../utils/Providers/ReactQueryProvider";
import { ConfigProvider } from "antd";
// import Head from "next/head";

export const pingFont = localFont({
  src: [
    {
      path: './fonts/PingARLT-Hairline.woff2',
      weight: "100",
      style: "normal",
    },
    {
      path: './fonts/PingARLT-Thin.woff2',
      weight: "200",
      style: "normal",
    },
    {
      path: './fonts/PingARLT-ExtraLight.woff2',
      weight: "250",
      style: "normal",
    },
    {
      path: './fonts/PingARLT-Light.woff2',
      weight: "300",
      style: "normal",
    },
    {
      path: './fonts/PingARLT-Regular.woff2',
      weight: "400",
      style: "normal",
    },
    {
      path: './fonts/PingARLT-Medium.woff2',
      weight: "500",
      style: "normal",
    },
    {
      path: './fonts/PingARLT-Bold.woff2',
      weight: "600",
      style: "normal",
    },
    {
      path: './fonts/PingARLT-Heavy.woff2',
      weight: "700",
      style: "normal",
    },
    {
      path: './fonts/PingARLT-Black.woff2',
      weight: "800",
      style: "normal",
    }
  ],
  variable: "--font-pingRTL",
  display: "swap",
})

// export const metadata: Metadata = {
//   openGraph: {
//     title: "Business Building",
//     description: "Business Building For Information Technology",
//     url: "https://bb4it.org",
//     siteName: "Business Building",
//     images: [
//       {
//         url: "/opengraph-image.jpg", // Public file under /app or /public
//         width: 1200,
//         height: 630,
//         alt: "BB Logo",
//       },
//     ],
//     type: "website",
//   },
//   twitter: {
//     card: "summary_large_image",
//     title: "Business Building",
//     description: "Business Building For Information Technology",
//     images: ["/twitter-image.jpg"],
//   },
// };

async function getAppSettings(locale: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getAppSettings`, {
    method: "GET",
    headers: { "Content-Type": "application/json", lang: locale },
  });
  if (!res.ok) return null;
  return res.json();
}

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>
}>) {
  const { locale } = await params;

  const json = await getAppSettings(locale);
  const data = json?.data;

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  return (

    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <script
        src={`https://maps.googleapis.com/maps/api/js?key=${data?.google_maps_api_key}&libraries=places,marker&language=ar&region=SA`}
        async
        defer
      ></script>
      <body
        className={`${pingFont.variable} font-ping antialiased`}
      >
        <NextIntlClientProvider>
          <ReactQueryProvider>
          <ConfigProvider theme={{
              token: {
                colorPrimary: '#EDA133',
              },
            }}>
              <Header />
              {children}
              <Footer />
            </ConfigProvider>
          </ReactQueryProvider>
        </NextIntlClientProvider>
      </body>
    </html>

  );
}
