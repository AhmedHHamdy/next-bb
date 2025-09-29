import { Metadata } from "next";
import { getLocale } from "next-intl/server";

async function getContactUsMeta(locale: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getContactUsInfo`, {
    method: "GET",
    headers: { "Content-Type": "application/json", lang: locale },
    // Ensure fresh metadata on deploys; rely on default caching otherwise
    // next: { revalidate: 300 },
  });
  if (!res.ok) return null;
  return res.json();
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const json = await getContactUsMeta(locale);
  const data = json?.data;
  return {
    title: data?.title,
    description: data?.meta_description,
    keywords: data?.meta_keywords,
  };
}

export default function ContactUsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}


