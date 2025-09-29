import { Metadata } from "next";
import { getLocale } from "next-intl/server";

async function getTermsAndConditionsMeta(locale: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getTermsAndConditionsPage`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      lang: locale,
    }});
  return res.json();
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const data = await getTermsAndConditionsMeta(locale);

  return {
    title: data?.data?.title,
    description: data?.data?.meta_description,
    keywords: data?.data?.meta_keywords
  };
}

export default function TermsAndConditionsMetaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
