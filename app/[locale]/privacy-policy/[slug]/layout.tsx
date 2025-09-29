import { Metadata } from "next";
import { getLocale } from "next-intl/server";

async function getPrivacyMeta(locale: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getPrivacyPage`, {
    headers: { lang: locale },
  });
  return res.json();
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const data = await getPrivacyMeta(locale);

  return {
    title: data?.data?.title,
    description: data?.data?.meta_description,
    keywords: data?.data?.meta_keywords
  };
}

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
