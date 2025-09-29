"use client";

import BlogsCarousel from "@/app/components/blogs/Blogs-Carousel";
import { Link } from "@/i18n/navigation";
import { BlogDetailsPageDataType } from "@/app/utils/Types";
import { useQuery } from "@tanstack/react-query";
import { Spin } from "antd";
import { useLocale, useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

async function fetchBlogDetails(locale: string, currentSlug: string): Promise<BlogDetailsPageDataType> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getArticleById`, {
    method: "POST",
    headers: { "Content-Type": "application/json", lang: locale },
    body: JSON.stringify({ slug: currentSlug }),
  });
  if (!res.ok) {
    if (res.status == 500 || res.status == 502 || res.status == 503 || res.status == 504) {
      throw new Error("Failed to fetch Server issue");
    } else {
      throw new Error("Failed to fetch blog details");
    }
  }
  return res.json();
}

export default function Page() {
  const locale = useLocale();
  const t = useTranslations('Blogs');
  const e = useTranslations("Errors404");
  const router = useRouter();
  const params = useParams() as { slug?: string | string[] };
  const currentSlug = Array.isArray(params.slug) ? decodeURIComponent(params.slug[0]) : decodeURIComponent(params?.slug || "") || "";
  console.log(currentSlug, "currentSlug")

  const isFirstRun = useRef(true);

  const [headings, setHeadings] = useState<
    { id: string; text: string; level: number }[]
  >([]);

  const [processedHtml, setProcessedHtml] = useState("")

  const { data: blogResp, isLoading, isError, refetch } = useQuery({
    queryKey: ["blog-details", currentSlug, locale],
    queryFn: () => fetchBlogDetails(locale, currentSlug),
    enabled: Boolean(currentSlug),
  });

  const data = blogResp?.data;

  // useEffect(() => {
  //   const canonical = locale =="en" ? data?.article?.slug?.en : data?.article?.slug?.ar;
  //   if (!isLoading && canonical && currentSlug && canonical !== currentSlug) {
  //     router.push(`/${locale}/blogs/${canonical}`);
  //   }
  // }, [isLoading, data?.article?.slug, currentSlug, router, locale]);

  useEffect(() => {
    if (data) {
      localStorage.setItem(
        "slug-blogs",
        `${data.article?.slug?.en + "+" + data.article?.slug?.ar}`
      );
    }
  }, [data]);

  // Navigate only after slug exists (and not on the very first render)
  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      // skip on the very first render

      // localStorage.removeItem("slug-blogs");
      return;
    }

    const slugKey = localStorage.getItem("slug-blogs");
    if (!slugKey) return; // slug not yet saved

    const canonical = slugKey.split("+");
    if (canonical.length < 2) return; // ensure both slugs exist

    if (locale === "en") {
      router.replace(`/${locale}/blogs/${canonical[0]}`);
    } else if (locale === "ar") {
      router.replace(`/${locale}/blogs/${canonical[1]}`);
    }
  }, [locale, router]);


  useEffect(() => {
    if (!data?.article?.description) return;
  
    const parser = new DOMParser();
    const doc = parser.parseFromString(
      data.article.description,
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
  }, [data?.article?.description]);
  

  // useEffect(() => {
  //   if (locale == "en" && blogResp) {
  //     router.replace(`/${locale}/blogs/${blogResp?.data?.article?.slug?.en}`);
  //   } else if (locale == "ar" && blogResp) {
  //     router.replace(`/${locale}/blogs/${blogResp?.data?.article?.slug?.ar}`);
  //   } 
  // }, [currentSlug, locale, router, blogResp]);
  

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

  if (isError || !data) {
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
          <div className="flex flex-wrap items-center gap-2">
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

            <Link href="/blogs" className="text-[#8B8B8B] text-[15px] font-medium leading-[1.65]">
              {t("blogs")}
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

            <Link href={`/blogs/${locale == "en" ? data?.article?.slug?.en : data?.article?.slug?.ar}`} className="text-black text-[15px] font-medium leading-[1.65]">
              {data?.article?.title}
            </Link>
          </div>
        </div>
      </div>

      {/* <!-- Blog Hero Section --> */}
      <section className="px-[15px] 2xl:px-0">
        <section
          className="relative w-full h-[279px] lg:h-[418px] bg-cover bg-center bg-no-repeat max-w-[1280px] mx-auto md:rounded-[16px] mt-[24px] md:mt-[36px]"
          style={{ backgroundImage: `url(${data?.article?.image?.url})` }}
        >
          {/* <!-- Content Card --> */}
          <div className="absolute top-8/8 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-[770px] p-3 md:px-6">
            <div className="bg-white rounded-lg border border-[#F5F5F5] shadow-lg py-[16px] px-[14px] md:p-8">
              <div className="flex flex-col items-center gap-4 max-w-[566px] mx-auto">
                <h1 className="text-center font-bold text-[24px] md:text-[32px] text-black leading-[1.25]">
                  {data?.article?.title}
                </h1>

                <div className="flex flex-col items-center gap-4 p-[6px]">
                  <div className="flex flex-wrap  items-center gap-6">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-white rounded flex items-center justify-center">
                        <svg width="37" height="36" viewBox="0 0 37 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M0.5 4C0.5 1.79086 2.29086 0 4.5 0H32.5C34.7091 0 36.5 1.79086 36.5 4V32C36.5 34.2091 34.7091 36 32.5 36H4.5C2.29086 36 0.5 34.2091 0.5 32V4Z"
                            fill="#F5F5F5"
                          />
                          <path
                            d="M19.9229 13.5955C19.9229 12.6226 20.7115 11.834 21.6844 11.834H22.9039C23.8767 11.834 24.6654 12.6226 24.6654 13.5955V14.815C24.6654 15.7879 23.8767 16.5766 22.9039 16.5766H19.9229V13.5955ZM19.9229 19.4221H22.9039C23.8767 19.4221 24.6654 20.2108 24.6654 21.1837V22.4032C24.6654 23.376 23.8767 24.1647 22.9039 24.1647H21.6844C20.7115 24.1647 19.9229 23.376 19.9229 22.4032V19.4221ZM12.3347 13.5955C12.3347 12.6226 13.1234 11.834 14.0962 11.834H15.3158C16.2886 11.834 17.0773 12.6226 17.0773 13.5955V16.5766H14.0962C13.1234 16.5766 12.3347 15.7879 12.3347 14.815V13.5955ZM12.3347 21.1837C12.3347 20.2108 13.1234 19.4221 14.0962 19.4221H17.0773V22.4032C17.0773 23.376 16.2886 24.1647 15.3158 24.1647H14.0962C13.1234 24.1647 12.3347 23.376 12.3347 22.4032V21.1837Z"
                            stroke="#4A4A4A"
                            strokeWidth="1.3214"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <span className="text-[#4A4A4A] text-sm font-medium">{data?.article?.section_name}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-[#F5F5F5] rounded flex items-center justify-center">
                        <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M15.5 1.04297C15.8452 1.04297 16.125 1.32279 16.125 1.66797V2.19824C16.7954 2.38833 17.3613 2.69622 17.832 3.20508C18.4801 3.90582 18.7683 4.79096 18.9062 5.90039C19.0415 6.98769 19.042 8.38128 19.042 10.1592V10.6758C19.042 12.4537 19.0415 13.8473 18.9062 14.9346C18.7682 16.0442 18.4803 16.93 17.832 17.6309C17.1775 18.3384 16.3395 18.6591 15.291 18.8115C14.2761 18.959 12.979 18.959 11.3428 18.959H9.65723C8.02104 18.959 6.72391 18.959 5.70898 18.8115C4.66048 18.6591 3.82253 18.3384 3.16797 17.6309C2.51971 16.93 2.23175 16.0442 2.09375 14.9346C1.95854 13.8473 1.958 12.4537 1.95801 10.6758V10.1592C1.958 8.38128 1.95853 6.98769 2.09375 5.90039C2.23174 4.79096 2.51991 3.90582 3.16797 3.20508C3.63867 2.69622 4.20455 2.38833 4.875 2.19824V1.66797C4.875 1.32279 5.15482 1.04297 5.5 1.04297C5.84518 1.04297 6.125 1.32279 6.125 1.66797V1.97266C7.07161 1.87606 8.23642 1.87596 9.65723 1.87598H11.3428C12.7636 1.87596 13.9284 1.87606 14.875 1.97266V1.66797C14.875 1.32279 15.1548 1.04297 15.5 1.04297ZM9.70801 3.12598C8.15171 3.12598 7.00914 3.12891 6.125 3.23145V3.33398C6.125 3.67916 5.84518 3.95898 5.5 3.95898C5.21489 3.95898 4.97644 3.7678 4.90137 3.50684C4.56104 3.64197 4.30244 3.81966 4.08594 4.05371C3.69078 4.4809 3.45685 5.06688 3.33398 6.05469C3.20947 7.05589 3.20801 8.37218 3.20801 10.2041V10.6318C3.20801 12.4635 3.2095 13.7791 3.33398 14.7803C3.45684 15.7682 3.69076 16.355 4.08594 16.7822C4.47467 17.2023 4.99844 17.4457 5.88965 17.5752C6.8043 17.7081 8.01005 17.709 9.70801 17.709H11.292C12.99 17.709 14.1957 17.7081 15.1104 17.5752C16.0016 17.4457 16.5253 17.2023 16.9141 16.7822C17.3092 16.355 17.5432 15.7682 17.666 14.7803C17.7905 13.7791 17.792 12.4635 17.792 10.6318V10.2041C17.792 8.37218 17.7905 7.05589 17.666 6.05469C17.5432 5.06688 17.3092 4.4809 16.9141 4.05371C16.6974 3.81946 16.4384 3.64201 16.0977 3.50684C16.0225 3.76767 15.785 3.95898 15.5 3.95898C15.1548 3.95898 14.875 3.67916 14.875 3.33398V3.23145C13.9909 3.12891 12.8483 3.12598 11.292 3.12598H9.70801ZM8.5791 10.209C9.1376 10.2091 9.45801 10.6969 9.45801 11.124V14.168C9.45783 14.513 9.17808 14.793 8.83301 14.793C8.48809 14.7928 8.20818 14.5129 8.20801 14.168V11.459H8C7.65482 11.459 7.375 11.1792 7.375 10.834C7.37518 10.489 7.65493 10.209 8 10.209H8.5791ZM12.7676 10.209C13.3058 10.2092 13.7968 10.7402 13.5732 11.3428L12.4443 14.3848C12.3243 14.7084 11.9642 14.8739 11.6406 14.7539C11.317 14.6338 11.1524 14.2738 11.2725 13.9502L12.1963 11.459H11.333C10.988 11.4588 10.708 11.1791 10.708 10.834C10.7082 10.4891 10.9881 10.2092 11.333 10.209H12.7676ZM15.5 6.04297C15.8452 6.04297 16.125 6.32279 16.125 6.66797C16.1248 7.013 15.8451 7.29297 15.5 7.29297H5.5C5.15493 7.29297 4.87518 7.013 4.875 6.66797C4.875 6.32279 5.15482 6.04297 5.5 6.04297H15.5Z"
                            fill="#4A4A4A"
                          />
                        </svg>
                      </div>
                      <span className="text-[#4A4A4A] text-sm font-medium">{data?.article?.published_at}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-[#F5F5F5] rounded flex items-center justify-center">
                        <svg width="37" height="36" viewBox="0 0 37 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M0.5 4C0.5 1.79086 2.29086 0 4.5 0H32.5C34.7091 0 36.5 1.79086 36.5 4V32C36.5 34.2091 34.7091 36 32.5 36H4.5C2.29086 36 0.5 34.2091 0.5 32V4Z"
                            fill="#F5F5F5"
                          />
                          <path
                            d="M18.5 13.208C20.642 13.208 22.4781 14.1512 23.8994 15.2607C25.3219 16.3713 26.3737 17.683 26.9619 18.5078C26.9764 18.5282 26.9919 18.5486 27.0068 18.5693C27.2178 18.8627 27.458 19.1985 27.458 19.667C27.4579 20.1353 27.2177 20.4703 27.0068 20.7637C26.9919 20.7845 26.9765 20.8048 26.9619 20.8252C26.3737 21.65 25.3221 22.9616 23.8994 24.0723C22.4781 25.1819 20.6421 26.125 18.5 26.125C16.3579 26.125 14.5219 25.1819 13.1006 24.0723C11.6779 22.9616 10.6263 21.65 10.0381 20.8252C10.0235 20.8048 10.0081 20.7845 9.99316 20.7637C9.78227 20.4704 9.5421 20.1353 9.54199 19.667C9.54199 19.1985 9.7822 18.8627 9.99316 18.5693C10.0081 18.5486 10.0235 18.5282 10.0381 18.5078C10.6263 17.683 11.678 16.3713 13.1006 15.2607C14.5219 14.1512 16.358 13.208 18.5 13.208ZM18.5 14.458C16.7345 14.458 15.1629 15.2361 13.8691 16.2461C12.5769 17.255 11.6058 18.462 11.0557 19.2334C10.9197 19.4241 10.855 19.5176 10.8164 19.5918C10.7919 19.639 10.7919 19.6524 10.792 19.665V19.6689C10.7919 19.6815 10.7921 19.6944 10.8164 19.7412C10.855 19.8154 10.9196 19.9088 11.0557 20.0996C11.6058 20.871 12.5769 22.078 13.8691 23.0869C15.1629 24.0969 16.7345 24.875 18.5 24.875C20.2656 24.875 21.8371 24.0969 23.1309 23.0869C24.4232 22.078 25.3942 20.871 25.9443 20.0996C26.0804 19.9088 26.145 19.8154 26.1836 19.7412C26.208 19.6944 26.2081 19.6815 26.208 19.6689V19.665C26.2081 19.6524 26.2081 19.639 26.1836 19.5918C26.145 19.5177 26.0803 19.424 25.9443 19.2334C25.3942 18.4619 24.4231 17.255 23.1309 16.2461C21.8371 15.2361 20.2655 14.458 18.5 14.458ZM18.5 16.542C20.2259 16.542 21.625 17.9411 21.625 19.667C21.6248 21.3927 20.2258 22.792 18.5 22.792C16.7743 22.792 15.3752 21.3927 15.375 19.667C15.375 17.9411 16.7741 16.542 18.5 16.542ZM18.5 17.792C17.4645 17.792 16.625 18.6315 16.625 19.667C16.6252 20.7024 17.4646 21.542 18.5 21.542C19.5354 21.542 20.3748 20.7024 20.375 19.667C20.375 18.6315 19.5355 17.792 18.5 17.792ZM18.5 9.875C20.9831 9.875 23.1925 10.9949 24.748 12.0693C25.5316 12.6106 26.1653 13.1507 26.6035 13.5566C26.8229 13.7599 26.9937 13.931 27.1113 14.0518C27.17 14.1119 27.2157 14.1597 27.2471 14.1934C27.2628 14.2102 27.2756 14.224 27.2842 14.2334L27.2939 14.2441L27.2969 14.248L27.2988 14.249C27.2988 14.2494 27.2894 14.2583 26.833 14.667L27.2988 14.25C27.529 14.5071 27.5071 14.9016 27.25 15.1318C26.993 15.362 26.5985 15.3408 26.3682 15.084L26.3672 15.083L26.3613 15.0762C26.3555 15.0698 26.3457 15.0596 26.333 15.0459C26.3076 15.0186 26.2687 14.9771 26.2168 14.9238C26.1125 14.8168 25.956 14.6618 25.7539 14.4746C25.3488 14.0994 24.7614 13.598 24.0371 13.0977C22.5766 12.0888 20.6192 11.125 18.5 11.125C16.3808 11.125 14.4234 12.0888 12.9629 13.0977C12.2386 13.598 11.6512 14.0994 11.2461 14.4746C11.044 14.6618 10.8875 14.8168 10.7832 14.9238C10.7313 14.9771 10.6924 15.0186 10.667 15.0459C10.6543 15.0596 10.6445 15.0698 10.6387 15.0762L10.6328 15.083V15.084C10.4025 15.3408 10.007 15.362 9.75 15.1318C9.493 14.9016 9.47106 14.5071 9.70117 14.25L9.70312 14.248L9.70605 14.2441L9.71582 14.2334C9.72443 14.224 9.73721 14.2102 9.75293 14.1934C9.78435 14.1597 9.83001 14.112 9.88867 14.0518C10.0064 13.931 10.177 13.7599 10.3965 13.5566C10.8347 13.1507 11.4684 12.6106 12.252 12.0693C13.8075 10.9949 16.0169 9.87502 18.5 9.875Z"
                            fill="#4A4A4A"
                          />
                        </svg>
                      </div>
                      <span className="text-[#4A4A4A] text-sm font-medium">{data?.article?.views}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>

      {/* <!-- Blog Content Section --> */}
      <section className="blog-content-mobile pt-[145px] md:pt-[160px] px-[15px] 2xl:px-0">
        <div className="max-w-[1280px] mx-auto md:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-[32px] md:gap-12">
            {/* <!-- Sidebar --> */}
            <div className="lg:col-span-1 xl:col-span-1 self-start">
              <div className="block md:w-[310px] flex-shrink-0 border border-[#DADADA] h-full p-[16px] pb-[32px] rounded-[8px]">
                <h3 className="text-[16px] text-[#4A4A4A] font-medium">{t("articleContent")}</h3>

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

                <div className="mt-[32px]">
                  <div className="flex flex-col gap-3 px-4 mb-[12px]">
                    <h3 className="text-[#4A4A4A] font-medium text-sm">{t("shareVia")}</h3>
                  </div>
                  <div className="flex items-center gap-2 px-3">
                    <a
                      href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`${currentSlug} ${window.location.href}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-icon w-10 h-10 bg-neutral-200 rounded-full flex items-center justify-center hover:bg-[#F0AC49] transition-colors"
                    >
                      <svg width="25" height="25" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M8.67588 4.40479C6.47674 4.40479 4.69531 6.17393 4.69531 8.36078C4.69531 9.22079 4.97788 10.0316 5.45703 10.6828L4.95331 12.1571L6.48903 11.6656C7.1156 12.0834 7.87731 12.3168 8.68817 12.3168C10.8873 12.3168 12.681 10.5476 12.681 8.36078C12.6687 6.17393 10.875 4.40479 8.67588 4.40479ZM11.0102 9.99479C10.9119 10.2651 10.4327 10.5231 10.2239 10.5476C10.015 10.5722 10.015 10.7196 8.82331 10.2651C7.64388 9.79821 6.89446 8.6065 6.83303 8.5205C6.7716 8.44679 6.35388 7.89393 6.35388 7.32879C6.35388 6.76364 6.64874 6.48107 6.75931 6.3705C6.86988 6.25993 6.99274 6.22307 7.06646 6.22307C7.14017 6.22307 7.22617 6.23536 7.2876 6.23536C7.36131 6.23536 7.44731 6.1985 7.5456 6.43193C7.64388 6.66536 7.87731 7.2305 7.90188 7.29193C7.92646 7.35336 7.95103 7.41479 7.91417 7.4885C7.87731 7.56221 7.85274 7.61136 7.8036 7.68507C7.74217 7.7465 7.68074 7.8325 7.6316 7.88164C7.57017 7.94307 7.50874 8.0045 7.58246 8.11507C7.65617 8.22564 7.8896 8.6065 8.2336 8.91364C8.67588 9.30679 9.05674 9.42964 9.16731 9.49107C9.27788 9.5525 9.3516 9.54021 9.41303 9.4665C9.48674 9.39279 9.70788 9.13479 9.7816 9.01193C9.85531 8.90136 9.94131 8.91364 10.0396 8.9505C10.1502 8.98736 10.7153 9.26993 10.8382 9.33136C10.9487 9.39279 11.0347 9.41736 11.0593 9.4665C11.0962 9.49107 11.0962 9.7245 11.0102 9.99479Z"
                          fill="#393939"
                        />
                        <path
                          d="M12.4473 0.743652H4.73189C2.59418 0.743652 0.849609 2.48822 0.849609 4.62594V12.3537C0.849609 14.4791 2.59418 16.2237 4.73189 16.2237H12.4596C14.5973 16.2237 16.3419 14.4791 16.3419 12.3414V4.62594C16.3296 2.48822 14.585 0.743652 12.4473 0.743652ZM8.67561 13.0662C7.84018 13.0662 7.06618 12.8574 6.37818 12.4765L3.74904 13.3119L4.60904 10.7934C4.17904 10.0808 3.93332 9.24537 3.93332 8.3608C3.93332 5.75622 6.05875 3.65537 8.67561 3.65537C11.2925 3.65537 13.4179 5.75622 13.4179 8.3608C13.4179 10.9654 11.2925 13.0662 8.67561 13.0662Z"
                          fill="#393939"
                        />
                      </svg>
                    </a>

                    <a
                      href={`https://twitter.com/intent/tweet?url=${window.location.href}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-icon w-10 h-10 bg-neutral-200 rounded-full flex items-center justify-center hover:bg-[#F0AC49] transition-colors"
                    >
                      <svg width="22" height="22" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g mask="url(#mask0_1111_59379)">
                          <path
                            d="M10.8848 0.659912H12.8628L8.51979 5.60492L13.5938 12.3129H9.61199L6.49448 8.23653L2.92547 12.3129H0.947454L5.54848 7.02393L0.689453 0.659912H4.77018L7.58669 4.38372L10.8848 0.659912ZM10.1925 11.1519H11.289L4.19397 1.77791H3.01577L10.1925 11.1519Z"
                            fill="#393939"
                          />
                        </g>
                      </svg>
                    </a>

                    <a
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-icon w-10 h-10 bg-neutral-200 rounded-full flex items-center justify-center hover:bg-[#F0AC49] transition-colors"
                    >
                      <svg width="22" height="22" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M11.0128 12.5068H1.64832C0.909496 12.5068 0.310547 11.9079 0.310547 11.1691V1.80457C0.310547 1.06575 0.909496 0.466797 1.64832 0.466797H11.0128C11.7516 0.466797 12.3506 1.06575 12.3506 1.80457V11.1691C12.3506 11.9079 11.7516 12.5068 11.0128 12.5068ZM8.89189 10.8348H10.6786V7.16448C10.6786 5.61153 9.79825 4.86066 8.56864 4.86066C7.33847 4.86066 6.82075 5.81862 6.82075 5.81862V5.03776H5.09889V10.8348H6.82075V7.79172C6.82075 6.97633 7.1961 6.49114 7.9145 6.49114C8.57488 6.49114 8.89189 6.95739 8.89189 7.79172V10.8348ZM1.98297 3.20896C1.98297 3.7997 2.45823 4.27867 3.04473 4.27867C3.63123 4.27867 4.10621 3.7997 4.10621 3.20896C4.10621 2.61822 3.63123 2.13922 3.04473 2.13922C2.45823 2.13922 1.98297 2.61822 1.98297 3.20896ZM3.95109 10.8348H2.15564V5.03776H3.95109V10.8348Z"
                          fill="#393939"
                        />
                      </svg>
                    </a>

                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-icon w-10 h-10 bg-neutral-200 rounded-full flex items-center justify-center hover:bg-[#F0AC49] transition-colors"
                    >
                      <svg width="22" height="22" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M13.9527 0.743652H3.00781C1.75756 0.743652 0.740234 1.76098 0.740234 3.01123V13.9561C0.740234 15.2063 1.75756 16.2237 3.00781 16.2237H7.5732V10.7512H5.75914V8.03014H7.5732V6.18584C7.5732 4.68534 8.79379 3.46475 10.2943 3.46475H13.0456V6.18584H10.2943V8.03014H13.0456L12.5921 10.7512H10.2943V16.2237H13.9527C15.2029 16.2237 16.2202 15.2063 16.2202 13.9561V3.01123C16.2202 1.76098 15.2029 0.743652 13.9527 0.743652Z"
                          fill="#393939"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* xl:col-span-3 */}
            <div className="lg:col-span-2 xl:col-span-3 w-full">
              <div className="mb-[48px] lg:mb-[64px]">
                <div>
       
                  <div className="my-[24px] md:mb-[48px] md:mt-0">
                    <div>
                      {/* <h2 className="text-[18px] md:text-[24px] font-bold text-black mb-[16px] md:mb-6">
                        كيف تساهم هذه الحلول في تحقيق أهداف عملك؟
                      </h2> */}
                      {/* text-[#686868] md:text-black text-base  */}
                      {/* leading-7 */}
                      <div className="">
                        {/* without classes */}
                        {/* max-w-[800px] mx-auto */}
                        <div className="">
                          <div dangerouslySetInnerHTML={{__html: String(processedHtml  || "")}} className="custom-content mx-auto">
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white mt-10">
        <div className="max-w-[1360px] mx-auto px-[15px] 2xl:px-0">
          <div className="bg-white rounded-lg p-5 md:p-6" style={{ boxShadow: "0px 0px 6px 0px #0000001F" }}>
            <div className="flex flex-col gap-6">
              <div className="w-full">
                <div className="flex flex-col gap-4 mb-4">
                  <h3 className="text-[18px] md:text-[24px] font-bold text-[#232323]">{t("tags")}</h3>
                  <div className="w-full h-px bg-[#DADADA]"></div>
                </div>
                <div className="flex flex-wrap gap-4">
                  {data?.article?.tags && data?.article?.tags?.map(tag => {
                    return (
                      <Link
                        key={tag?.id}
                        href={`/blogs/tags/${tag?.id}`}
                        className="px-3 py-2 border border-[#DADADA] rounded text-[#393939] font-medium text-base hover:bg-[#EDA133] hover:text-white transition-colors"
                      >
                        {tag?.name}
                      </Link>
                    )
                  })}
                </div>
              </div>

              <div className="w-full h-px bg-[#DADADA]"></div>

              <div className="flex items-center gap-4">
                <span className="text-[#4A4A4A] font-medium text-sm">{t("shareVia")}</span>
                <div className="flex items-center gap-2">
                  <a
                    href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`${currentSlug} ${window.location.href}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon w-10 h-10 bg-neutral-200 rounded-full flex items-center justify-center hover:bg-[#F0AC49] transition-colors"
                  >
                    <svg width="25" height="25" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M8.67588 4.40479C6.47674 4.40479 4.69531 6.17393 4.69531 8.36078C4.69531 9.22079 4.97788 10.0316 5.45703 10.6828L4.95331 12.1571L6.48903 11.6656C7.1156 12.0834 7.87731 12.3168 8.68817 12.3168C10.8873 12.3168 12.681 10.5476 12.681 8.36078C12.6687 6.17393 10.875 4.40479 8.67588 4.40479ZM11.0102 9.99479C10.9119 10.2651 10.4327 10.5231 10.2239 10.5476C10.015 10.5722 10.015 10.7196 8.82331 10.2651C7.64388 9.79821 6.89446 8.6065 6.83303 8.5205C6.7716 8.44679 6.35388 7.89393 6.35388 7.32879C6.35388 6.76364 6.64874 6.48107 6.75931 6.3705C6.86988 6.25993 6.99274 6.22307 7.06646 6.22307C7.14017 6.22307 7.22617 6.23536 7.2876 6.23536C7.36131 6.23536 7.44731 6.1985 7.5456 6.43193C7.64388 6.66536 7.87731 7.2305 7.90188 7.29193C7.92646 7.35336 7.95103 7.41479 7.91417 7.4885C7.87731 7.56221 7.85274 7.61136 7.8036 7.68507C7.74217 7.7465 7.68074 7.8325 7.6316 7.88164C7.57017 7.94307 7.50874 8.0045 7.58246 8.11507C7.65617 8.22564 7.8896 8.6065 8.2336 8.91364C8.67588 9.30679 9.05674 9.42964 9.16731 9.49107C9.27788 9.5525 9.3516 9.54021 9.41303 9.4665C9.48674 9.39279 9.70788 9.13479 9.7816 9.01193C9.85531 8.90136 9.94131 8.91364 10.0396 8.9505C10.1502 8.98736 10.7153 9.26993 10.8382 9.33136C10.9487 9.39279 11.0347 9.41736 11.0593 9.4665C11.0962 9.49107 11.0962 9.7245 11.0102 9.99479Z"
                        fill="#393939"
                      />
                      <path
                        d="M12.4473 0.743652H4.73189C2.59418 0.743652 0.849609 2.48822 0.849609 4.62594V12.3537C0.849609 14.4791 2.59418 16.2237 4.73189 16.2237H12.4596C14.5973 16.2237 16.3419 14.4791 16.3419 12.3414V4.62594C16.3296 2.48822 14.585 0.743652 12.4473 0.743652ZM8.67561 13.0662C7.84018 13.0662 7.06618 12.8574 6.37818 12.4765L3.74904 13.3119L4.60904 10.7934C4.17904 10.0808 3.93332 9.24537 3.93332 8.3608C3.93332 5.75622 6.05875 3.65537 8.67561 3.65537C11.2925 3.65537 13.4179 5.75622 13.4179 8.3608C13.4179 10.9654 11.2925 13.0662 8.67561 13.0662Z"
                        fill="#393939"
                      />
                    </svg>
                  </a>

                  <a
                    href={`https://twitter.com/intent/tweet?url=${window.location.href}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon w-10 h-10 bg-neutral-200 rounded-full flex items-center justify-center hover:bg-[#F0AC49] transition-colors"
                  >
                    <svg width="22" height="22" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g mask="url(#mask0_1111_59379)">
                        <path
                          d="M10.8848 0.659912H12.8628L8.51979 5.60492L13.5938 12.3129H9.61199L6.49448 8.23653L2.92547 12.3129H0.947454L5.54848 7.02393L0.689453 0.659912H4.77018L7.58669 4.38372L10.8848 0.659912ZM10.1925 11.1519H11.289L4.19397 1.77791H3.01577L10.1925 11.1519Z"
                          fill="#393939"
                        />
                      </g>
                    </svg>
                  </a>

                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon w-10 h-10 bg-neutral-200 rounded-full flex items-center justify-center hover:bg-[#F0AC49] transition-colors"
                  >
                    <svg width="22" height="22" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M11.0128 12.5068H1.64832C0.909496 12.5068 0.310547 11.9079 0.310547 11.1691V1.80457C0.310547 1.06575 0.909496 0.466797 1.64832 0.466797H11.0128C11.7516 0.466797 12.3506 1.06575 12.3506 1.80457V11.1691C12.3506 11.9079 11.7516 12.5068 11.0128 12.5068ZM8.89189 10.8348H10.6786V7.16448C10.6786 5.61153 9.79825 4.86066 8.56864 4.86066C7.33847 4.86066 6.82075 5.81862 6.82075 5.81862V5.03776H5.09889V10.8348H6.82075V7.79172C6.82075 6.97633 7.1961 6.49114 7.9145 6.49114C8.57488 6.49114 8.89189 6.95739 8.89189 7.79172V10.8348ZM1.98297 3.20896C1.98297 3.7997 2.45823 4.27867 3.04473 4.27867C3.63123 4.27867 4.10621 3.7997 4.10621 3.20896C4.10621 2.61822 3.63123 2.13922 3.04473 2.13922C2.45823 2.13922 1.98297 2.61822 1.98297 3.20896ZM3.95109 10.8348H2.15564V5.03776H3.95109V10.8348Z"
                        fill="#393939"
                      />
                    </svg>
                  </a>

                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon w-10 h-10 bg-neutral-200 rounded-full flex items-center justify-center hover:bg-[#F0AC49] transition-colors"
                  >
                    <svg width="22" height="22" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M13.9527 0.743652H3.00781C1.75756 0.743652 0.740234 1.76098 0.740234 3.01123V13.9561C0.740234 15.2063 1.75756 16.2237 3.00781 16.2237H7.5732V10.7512H5.75914V8.03014H7.5732V6.18584C7.5732 4.68534 8.79379 3.46475 10.2943 3.46475H13.0456V6.18584H10.2943V8.03014H13.0456L12.5921 10.7512H10.2943V16.2237H13.9527C15.2029 16.2237 16.2202 15.2063 16.2202 13.9561V3.01123C16.2202 1.76098 15.2029 0.743652 13.9527 0.743652Z"
                        fill="#393939"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pt-[48px] pb-[64px] md:pb-[56px] px-[15px] 2xl:px-0">
        <BlogsCarousel articlesData={data?.similar || []} />
      </section>
    </>
  );
}
