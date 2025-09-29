'use client';

import { PolicyPages } from "@/app/utils/Types";
import { Link } from "@/i18n/navigation";
import { useQuery } from "@tanstack/react-query";
import { Spin } from "antd";
import { useLocale, useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {

  const locale = useLocale();

  const t = useTranslations("NavLinks");
  const e = useTranslations("Errors404")
  const s = useTranslations("SidePages")

  const router = useRouter();

  const [headings, setHeadings] = useState<{ id: string; text: string; level: number }[]>([]);

  const [processedHtml, setProcessedHtml] = useState("")

  const params = useParams();
  const currentSlug = Array.isArray(params.slug) ? decodeURIComponent(params.slug[0]) : decodeURIComponent(params?.slug || "") || "";

  const fetchPrivacyPolicy = async (): Promise<PolicyPages> => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/getPrivacyPage`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          lang: locale,
        },
      }
    );

    if (!res.ok) {
      if (res.status == 500 || res.status == 502 || res.status == 503 || res.status == 504) {
        throw new Error("Failed to fetch Server issue");
      }
    }
    return res.json();
  };

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["privacy-policy", locale], // include locale in key
    queryFn: fetchPrivacyPolicy,
  });


  // useEffect(() => {
  //   if (!isLoading && data?.data?.slug && router) {
  //     router.push(`/${locale}/privacy-policy/${data.data.slug}`);
  //   }
  // }, [locale, data, router]); // include deps

  // useEffect(() => {
  //   if (data) {
  //     localStorage.setItem("slug-privacy-policy", `${data?.data?.slug?.en + "+" +  data?.data?.slug?.ar}`)
  //   }
  // }, [data])

  // useEffect(() => {
  //   const canonical = localStorage.getItem("slug-privacy-policy")?.split("+");
  //   router.replace(`/${locale}/privacy-policy/${locale == "en" ? data?.data?.slug?.en : data?.data?.slug?.ar}`);
    
  //   if (locale == "en") {
  //     router.replace(`/${locale}/privacy-policy/${canonical?.[0]}`);
  //   } else if (locale == "ar") {
  //     router.replace(`/${locale}/privacy-policy/${canonical?.[1]}`);
  //   } 
  // }, [currentSlug, locale, router]);

  useEffect(() => {
    if (!data?.data?.content) return;
  
    const parser = new DOMParser();
    const doc = parser.parseFromString(
      data?.data?.content,
      "text/html"
    );
  
    const newHeadings: { id: string; text: string; level: number }[] = [];
  
    doc.querySelectorAll("h1,h2,h3,h4,h5,h6").forEach((node, index) => {
      const text = node.textContent?.trim() || "heading";
      const id = `h${index}`;
      node.setAttribute("id", id);
  
      newHeadings.push({
        id,
        text,
        level: parseInt(node.tagName.replace("H", ""), 10),
      });
    });
  
    setHeadings(newHeadings);
    setProcessedHtml(doc.body.innerHTML); // store new HTML string
  }, [data?.data?.content]);

  useEffect(() => {
    if (locale == "en" && data) {
      router.replace(`/${locale}/privacy-policy/${data?.data?.slug?.en}`);
    } else if (locale == "ar" && data) {
      router.replace(`/${locale}/privacy-policy/${data?.data?.slug?.ar}`);
    } 
  }, [currentSlug, locale, router, data]);


  if (isLoading) {
    return (
      <section className="min-h-screen text-center flex items-center justify-center">
        <section className="px-6 pt-[6rem] lg:pt-[8rem] xl:pt-[9rem] text-center">
          <div className="max-w-[1400px] mx-auto flex items-center justify-center">
            <Spin size="large"/>
          </div>
        </section>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="px-6 py-[6rem] lg:py-[8rem] xl:py-[9rem] text-center">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col items-center gap-[32px] max-w-[553px] mx-auto">
            <img className="w-[202px] h-[169px] md:w-[352px] md:h-[321px]" src="/error404.svg" alt="error 404 image" />
            <div className="flex flex-col items-center gap-2 text-center px-[15px] md:px-0">
              <h1 className="text-black text-[20px] md:text-[24px] font-bold leading-[1.5]">
                {e("errorLoadingContent")}
              </h1>
              <p className="text-[#4A4A4A] text-[14px] font-medium leading-[1.43]">
                {e("sorryTemporaryProblem")}
              </p>
            </div>
            <button
              onClick={() => refetch()}
              className="bg-[#EDA133] text-white w-[181px] py-2 rounded-lg font-medium text-[16px] leading-[1.5] hover:bg-[#D1912A] transition-colors"
            >
              {e("refreshPage")}
            </button>
          </div>
        </div>
      </section>
    );
  }


  return (
    <>
      <div className="w-full bg-white px-6 pt-[6rem] lg:pt-[8rem] xl:pt-[9rem]">
        <div className="max-w-[1400px] mx-auto xl:px-[24px]">
          <div className="flex items-center gap-2">
            <Link href="/" className="text-[#8B8B8B] text-[15px] font-medium leading-[1.65]">
              {t("home")}
            </Link>

            <svg className="rtl:block ltr:hidden" width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10.0603 14.281C10.1869 14.281 10.3136 14.2343 10.4136 14.1343C10.6069 13.941 10.6069 13.621 10.4136 13.4277L6.06693 9.08099C5.74693 8.76099 5.74693 8.24099 6.06693 7.92099L10.4136 3.57432C10.6069 3.38099 10.6069 3.06099 10.4136 2.86766C10.2203 2.67432 9.90026 2.67432 9.70693 2.86766L5.36026 7.21432C5.02026 7.55432 4.82693 8.01432 4.82693 8.50099C4.82693 8.98766 5.01359 9.44766 5.36026 9.78766L9.70693 14.1343C9.80693 14.2277 9.93359 14.281 10.0603 14.281Z"
                fill="#8B8B8B"
              />
            </svg>

            <svg className="rtl:hidden ltr:block" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5.93974 2.21999C5.81307 2.21999 5.68641 2.26665 5.58641 2.36665C5.39307 2.55999 5.39307 2.87999 5.58641 3.07332L9.93307 7.41999C10.2531 7.73999 10.2531 8.25999 9.93307 8.57999L5.58641 12.9267C5.39307 13.12 5.39307 13.44 5.58641 13.6333C5.77974 13.8267 6.09974 13.8267 6.29307 13.6333L10.6397 9.28665C10.9797 8.94665 11.1731 8.48665 11.1731 7.99999C11.1731 7.51332 10.9864 7.05332 10.6397 6.71332L6.29307 2.36665C6.19307 2.27332 6.06641 2.21999 5.93974 2.21999Z" fill="#8B8B8B"/>
            </svg>

            <Link href={`/privacy-policy/${currentSlug}`} className="text-black text-[15px] font-medium leading-[1.65]">
              {data?.data?.title}
            </Link>
          </div>
        </div>
      </div>

      <div className="w-full bg-white px-6 pt-[20px] pb-[64px] md:pb-[100px] md:pt-[36px]">
        <div className="max-w-[1300px] mx-auto">
          <div className="flex flex-col lg:flex-row gap-11">
            <div className="block md:w-[290px] flex-shrink-0 border border-[#DADADA] h-full p-[16px] pb-[32px] rounded-[8px]">
              <h3 className="text-[16px] text-[#4A4A4A] font-medium">{s("privacyPolicyContent")}</h3>

              <hr className="my-[16px] text-[#DADADA]" />

              <div className="space-y-[0px] md:space-y-[14px] border-s-6 border-[#E7E8E9] ps-0">
                <ul className="space-y-2">
                  {headings.map((h) => (
                    <li key={h.id} className={`pl-${(h.level - 1) * 4} list-none`}>
                      <a
                        href={`#${h.id}`}
                        
                        className="text-base font-medium hover:text-[#EDA133] leading-[1.5] flex gap-2 border-s-6 -ms-[6px] transition delay-150 border-[#E7E8E9] hover:border-[#EDA133] ps-[16px] py-[10px]"
                      >
                        {h.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex-1">
              <div className="space-y-[24px]">
      
                <div className="space-y-[32px] md:space-y-[24px]">
                  {/* <h2 className="text-[18px] md:text-[20px] font-bold text-black">{data?.data?.title?.slice(0, 80)}</h2> */}
                  {/* className="text-[16px] font-medium text-[#4A4A4A] leading-[1.5]" */}
                  <div dangerouslySetInnerHTML={{__html: String(processedHtml  || "")}} className="custom-content mx-auto">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
