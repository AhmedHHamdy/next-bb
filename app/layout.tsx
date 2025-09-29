import { Metadata } from 'next';
import {ReactNode} from 'react';

type Props = {
  children: ReactNode;
};

export const metadata: Metadata = {
  openGraph: {
    // title: "Business Building",
    // description: "Business Building For Information Technology",
    url: "https://bb4it.org",
    siteName: "Business Building",
    images: [
      {
        url: "https://bb4it.org/opengraph-image.jpg", // Public file under /app or /public
        width: 1200,
        height: 630,
        alt: "BB Logo",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Business Building",
    // description: "Business Building For Information Technology",
    images: ["https://bb4it.org/twitter-image.jpg"],
  },
};

// Since we have a `not-found.tsx` page on the root, a layout file
// is required, even if it's just passing children through.
export default function RootLayout({children}: Props) {
  return children;
}