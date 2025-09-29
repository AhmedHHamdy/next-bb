import { Metadata } from "next";
import { getLocale } from "next-intl/server";

async function getConsultationMeta(locale: string, slug: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getConsultationPageInfo`, {
    method: "GET",
    headers: { "Content-Type": "application/json", lang: locale },
  });
  if (!res.ok) return null;
  return res.json();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const locale = await getLocale();
  const { slug } = await params;
  const json = await getConsultationMeta(locale, decodeURIComponent(slug));
  const data = json?.data
  
  return {
    title: data?.title,
    description: data?.desc,
    // keywords: data?.meta_tags?.split(",") || [],
    // openGraph: {
    //   title: data?.title,
    //   description: data?.short_description,
    //   url: `https://bb4it.org/projects/${slug}`,
    //   images: [
    //     {
    //       url: data?.image?.url,
    //       width: 1200,
    //       height: 630,
    //       alt: "BB Blog Image",
    //     },
    //   ],
    //   type: "article"
    // },
    // twitter: {
    //   card: "summary_large_image",
    //   title: data?.title,
    //   description: data?.short_description,
    //   images: [data?.image?.url],
    // },
  };
}

export default function ProjectLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}


