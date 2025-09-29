import { Metadata } from "next";
import { getLocale } from "next-intl/server";

async function getCareerMeta(locale: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getCareerPageInfo`, {
    method: "GET",
    headers: { "Content-Type": "application/json", lang: locale },
  });
  if (!res.ok) return null;
  return res.json();
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const json = await getCareerMeta(locale);
  const data = json?.data;
  return {
    title: data?.title,
    description: data?.meta_description,
    keywords: data?.meta_keywords,
  };
}

export default function CareerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}


