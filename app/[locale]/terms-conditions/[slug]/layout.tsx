import { Metadata } from "next";
import { getLocale } from "next-intl/server";

async function getAccessibilityMeta(locale: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getTermsAndConditionsPage`, {
    headers: { lang: locale },
  });
  return res.json();
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const data = await getAccessibilityMeta(locale);

  return {
    title: data?.data?.title,
    description: data?.data?.meta_description,
    keywords: data?.data?.meta_keywords
  };
}

export default function AccessibilityLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
