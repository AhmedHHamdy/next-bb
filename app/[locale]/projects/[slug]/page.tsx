"use client";

import FAQ from "@/app/components/global/FAQ";
import ProjectsCarousel from "@/app/components/projects/Projects-Carousel";
import { ProjectDetailsPageDataType } from "@/app/utils/Types";
import { Link } from "@/i18n/navigation";
import { useQuery } from "@tanstack/react-query";
import { Spin } from "antd";
import { useLocale, useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

async function fetchProjectDetails(locale: string, slug: string): Promise<ProjectDetailsPageDataType> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getProjectById`, {
    method: "POST",
    headers: { "Content-Type": "application/json", lang: locale },
    body: JSON.stringify({ slug: slug }),
  });
  if (!res.ok) {
    if (res.status == 500 || res.status == 502 || res.status == 503 || res.status == 504) {
      throw new Error("Failed to fetch Server issue");
    } else {
      throw new Error("Failed to fetch Project Details data");
    }
  }
  return res.json();
}

export default function Page() {
  const t = useTranslations("HomePage");

  const p = useTranslations("ProjectDetails");

  const e = useTranslations("Errors404");

  const locale = useLocale();
  const router = useRouter();
  const isFirstRun = useRef(true);
  const params = useParams() as { slug?: string | string[] };
  const currentSlug = Array.isArray(params.slug) ? decodeURIComponent(params.slug[0]) : decodeURIComponent(params?.slug || "") || "";

  console.log(currentSlug, "slug")

  const {
    data: resp,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["project-details", currentSlug, locale],
    queryFn: () => fetchProjectDetails(locale, currentSlug),
    enabled: Boolean(currentSlug),
  });

  const data = resp?.data;

  useEffect(() => {
    if (data) {
      localStorage.setItem(
        "slug-projects",
        `${data.project?.slug?.en + "+" + data.project?.slug?.ar}`
      );
    }
  }, [data]);

  // Navigate only after slug exists (and not on the very first render)
  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }

    const slugKey = localStorage.getItem("slug-projects");
    if (!slugKey) return; // slug not yet saved

    const canonical = slugKey.split("+");
    if (canonical.length < 2) return; // ensure both slugs exist

    if (locale === "en") {
      router.replace(`/${locale}/projects/${canonical[0]}`);
    } else if (locale === "ar") {
      router.replace(`/${locale}/projects/${canonical[1]}`);
    }
  }, [locale, router]);
  

  if (isLoading) {
    return (
      <section className="min-h-screen text-center flex items-center justify-center">
        <section className="px-6 pt-[6rem] lg:pt-[8rem] xl:pt-[9rem] text-center">
          <div className="max-w-[1400px] mx-auto flex items-center justify-center">
            <Spin size="large" />
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
      <div className="w-full pb-[16px] bg-white px-6 pt-[6rem] lg:pt-[6rem] xl:pt-[8rem]">
        <div className="max-w-[1400px] mx-auto xl:px-[24px]">
          <div className="flex items-center flex-wrap gap-2">
            <Link href="/" className="text-[#8B8B8B] text-[15px] font-medium leading-[1.65]">
              {t("home")}
            </Link>

            <svg
              className="rtl:block ltr:hidden"
              width="16"
              height="17"
              viewBox="0 0 16 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.0603 14.281C10.1869 14.281 10.3136 14.2343 10.4136 14.1343C10.6069 13.941 10.6069 13.621 10.4136 13.4277L6.06693 9.08099C5.74693 8.76099 5.74693 8.24099 6.06693 7.92099L10.4136 3.57432C10.6069 3.38099 10.6069 3.06099 10.4136 2.86766C10.2203 2.67432 9.90026 2.67432 9.70693 2.86766L5.36026 7.21432C5.02026 7.55432 4.82693 8.01432 4.82693 8.50099C4.82693 8.98766 5.01359 9.44766 5.36026 9.78766L9.70693 14.1343C9.80693 14.2277 9.93359 14.281 10.0603 14.281Z"
                fill="#8B8B8B"
              />
            </svg>

            <svg
              className="rtl:hidden ltr:block"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.93974 2.21999C5.81307 2.21999 5.68641 2.26665 5.58641 2.36665C5.39307 2.55999 5.39307 2.87999 5.58641 3.07332L9.93307 7.41999C10.2531 7.73999 10.2531 8.25999 9.93307 8.57999L5.58641 12.9267C5.39307 13.12 5.39307 13.44 5.58641 13.6333C5.77974 13.8267 6.09974 13.8267 6.29307 13.6333L10.6397 9.28665C10.9797 8.94665 11.1731 8.48665 11.1731 7.99999C11.1731 7.51332 10.9864 7.05332 10.6397 6.71332L6.29307 2.36665C6.19307 2.27332 6.06641 2.21999 5.93974 2.21999Z"
                fill="#8B8B8B"
              />
            </svg>

            <Link href="/projects" className="text-[#8B8B8B] text-[15px] font-medium leading-[1.65]">
              {t("projects")}
            </Link>

            <svg
              className="rtl:block ltr:hidden"
              width="16"
              height="17"
              viewBox="0 0 16 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.0603 14.281C10.1869 14.281 10.3136 14.2343 10.4136 14.1343C10.6069 13.941 10.6069 13.621 10.4136 13.4277L6.06693 9.08099C5.74693 8.76099 5.74693 8.24099 6.06693 7.92099L10.4136 3.57432C10.6069 3.38099 10.6069 3.06099 10.4136 2.86766C10.2203 2.67432 9.90026 2.67432 9.70693 2.86766L5.36026 7.21432C5.02026 7.55432 4.82693 8.01432 4.82693 8.50099C4.82693 8.98766 5.01359 9.44766 5.36026 9.78766L9.70693 14.1343C9.80693 14.2277 9.93359 14.281 10.0603 14.281Z"
                fill="#8B8B8B"
              />
            </svg>

            <svg
              className="rtl:hidden ltr:block"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.93974 2.21999C5.81307 2.21999 5.68641 2.26665 5.58641 2.36665C5.39307 2.55999 5.39307 2.87999 5.58641 3.07332L9.93307 7.41999C10.2531 7.73999 10.2531 8.25999 9.93307 8.57999L5.58641 12.9267C5.39307 13.12 5.39307 13.44 5.58641 13.6333C5.77974 13.8267 6.09974 13.8267 6.29307 13.6333L10.6397 9.28665C10.9797 8.94665 11.1731 8.48665 11.1731 7.99999C11.1731 7.51332 10.9864 7.05332 10.6397 6.71332L6.29307 2.36665C6.19307 2.27332 6.06641 2.21999 5.93974 2.21999Z"
                fill="#8B8B8B"
              />
            </svg>

            <Link href={`/projects/${currentSlug}`} className="text-black text-[15px] font-medium leading-[1.65]">
              {data?.project?.title}
            </Link>
          </div>
        </div>
      </div>
      <section className="pt-[40px] lg:pt-[60px]">
        <section className="container mx-auto px-4 max-w-[1400px] ">
          <div className="flex flex-col items-center gap-[32px]">
            {/* <!-- Project Image --> */}
            <div className="w-40 h-20">
              <img
                src={data?.project?.icon?.url}
                alt={data?.project?.icon?.alt}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>

            {/* <!-- Project Title --> */}
            <h1 className="text-center font-bold text-[20px] md:text-[40px] text-black leading-tight max-w-4xl">
              {data?.project?.short_description}
            </h1>
          </div>

          {/* block */}
          <section className="flex flex-row flex-wrap justify-center items-center gap-[16px] md:hidden px-[15px] xl:px-0 w-full mt-[24px]">
            {/* <button className="bg-[#EDA133] text-white font-medium text-base px-4 py-3 rounded-lg hover:bg-[#D8912A] transition-colors flex items-center justify-center gap-2 w-50 h-14">
              <span>تصفح المشروع</span>
            </button> */}
            {data?.project?.links?.map(project => {
              return (
                // <section key={project?.id} className="bg-[#EDA133] text-white font-medium text-base px-4 py-3 rounded-lg hover:bg-[#D8912A] transition-colors flex items-center justify-center gap-2 w-50 h-14">
                //   <img src={project?.image?.url} alt="" />
                //   <span>تصفح المشروع</span>
                // </section>

                <a key={project?.id} href={project?.link} target="_blank">
                  <img className="inline cursor-pointer" src={project?.image?.url} alt={project?.image?.alt} />
                </a>
              )
            })}
          </section>

          <div className="flex flex-row flex-wrap justify-center items-center gap-[16px] w-full mt-10">
            {/* <section className="hidden md:block">
              <button
                className="bg-[#EDA133] text-white font-medium text-base px-4 py-3 rounded-lg hover:bg-[#D8912A] transition-colors flex items-center justify-center gap-2 w-50 h-14">
                <span>تصفح المشروع</span>
              </button>
            </section> */}

            {data?.project?.links?.map(project => {
              return (
                <a key={project?.id} href={project?.link} target="_blank">
                  <img className="hidden md:inline cursor-pointer" src={project?.image?.url} alt={project?.image?.alt} />
                </a>
              )
            })}
          </div>

          <section className="relative w-full overflow-hidden mt-[24px] md:mt-[64px] rounded-[8px] h-[211px] md:h-auto xl:h-[567px] px-[15px] 2xl:px-0">
            <img
              src={data?.project?.image?.url}
              alt={data?.project?.image?.alt}
              className="w-full h-full object-cover rounded-[8px]"
            />
          </section>
        </section>
      </section>

      {/* md:py-[64px] */}
      <section className="py-[48px] md:pt-[64px] md:pb-0 px-[15px] 2xl:px-0">
        <div className="container mx-auto px-4 max-w-[1400px]">
          <div className="flex flex-col-reverse lg:flex-row items-center gap-[32px] md:gap-12">

            {/* <!-- Content --> */}
            <div className="w-full lg:w-2/2 flex flex-col">
              <h2 className="text-[24px] md:text-[40px] font-medium text-black w-full">{data?.project?.title}</h2>

              <hr className="my-[16px] md:my-[23px] text-[#DADADA44]"></hr>

              <div className="flex flex-col w-full gap-[24px] md:gap-[48px]">
                {/* className="text-[16px] break-words md:text-[18px] font-medium text-[#4A4A4A] leading-relaxed opacity-80" */}
                <p dangerouslySetInnerHTML={{ __html: String(data?.project?.description || "") }}></p>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- Results & Tools Section --> */}
      <section className="max-w-[1400px] mx-auto py-[48px] md:py-[64px] grid grid-cols-1 gap-[24px] md:gap-[32px] xl:grid-cols-2 items-center px-[15px] 2xl:px-0">
        {/* md:min-h-[305px]  */}
        <div className="block flex-shrink-0 border border-[#DADADA] w-full 2xl:w-[675px] h-full p-[16px] md:pb-[32px] rounded-[8px]">
          <h3 className="text-[20px] font-medium">{p("outputs")}</h3>

          <hr className="my-[16px] text-[#DADADA]" />

          <p dangerouslySetInnerHTML={{ __html: String(data?.project?.project_outputs || "") }}></p>

        </div>
{/* min-h-[305px] */}
        <div className="block flex-shrink-0 border border-[#DADADA] w-full 2xl:w-[675px]  h-full p-[16px] md:pb-[32px] rounded-[8px]">
          <h3 className="text-[20px] font-medium">{p("languagesUsed")}</h3>

          <hr className="my-[16px] text-[#DADADA]" />

          <section className="grid grid-cols-4 justify-items-center gap-[20px]">
            {data?.project?.languages && data?.project?.languages?.map(language => {
              return (
                <div key={language.id} className="flex flex-col items-center gap-[15px]">
                  <img src={language?.image?.url} alt={language?.image?.alt} />
                  <h3 className="text-[13.5px]">{language.name}</h3>
                </div>
              )
            })}
            
          </section>
        </div>
      </section>

      {/* <!-- Problem Section --> */}
      <section className="pb-[48px] md:pb-[64px] px-[15px] 2xl:px-0">
        <div className="container mx-auto px-4 max-w-[1400px]">
          <div className="flex flex-col lg:flex-row items-center gap-[32px] md:gap-12">
            <div className="w-full lg:w-1/2 flex flex-col">
              <h2 className="text-[24px] md:text-[40px] font-medium text-black w-full">{p("problem")}</h2>

              <hr className="my-[12px] md:my-[23px] text-[#DADADA44]"></hr>

              <p dangerouslySetInnerHTML={{ __html: String(data?.project?.project_problem?.content || "") }}></p>

            </div>

            <div className="w-full lg:w-1/2">
              <div className="w-full h-[315px] md:h-auto lg:h-[614px] rounded-lg overflow-hidden">
                <img className="w-full h-full object-cover" src={data?.project?.project_problem?.image?.url} alt={data?.project?.project_problem?.image?.alt} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- Overview Problem Section --> */}
      <section className="py-[48px] md:pb-[64px] md:py-0 px-[15px] 2xl:px-0">
        <div className="container mx-auto px-4 max-w-[1400px]">
          <div className="flex flex-col-reverse lg:flex-row items-center gap-[32px] md:gap-12">
            {/* <!-- Image --> */}
            <div className="w-full lg:w-1/2">
              <div className="w-full h-[340px] md:h-auto lg:h-[614px] xl:w-[619px] rounded-lg overflow-hidden">
                <img className="w-full h-full object-cover" src={data?.project?.project_overview?.image?.url} alt={data?.project?.project_overview?.image?.alt} />
              </div>
            </div>

            {/* <!-- Content --> */}
            <div className="w-full lg:w-2/2 flex flex-col">
              <h2 className="text-[24px] md:text-[40px] font-medium text-black w-full">{p("overview")}</h2>

              <hr className="my-[16px] md:my-[23px] text-[#DADADA44]"></hr>

              <p dangerouslySetInnerHTML={{ __html: String(data?.project?.project_overview?.content || "") }}></p>

            </div>
          </div>
          <section className="relative w-full overflow-hidden mt-[48px] md:mt-[64px] rounded-[8px] h-[331px] md:h-auto lg:h-[567px]">
            <img src={data?.project?.project_banner_alt?.url} alt={data?.project?.project_banner_alt?.alt} className="w-full h-full object-cover" />
          </section>
        </div>
      </section>

      {/* <!-- Solution and Results Section --> */}
      <section className="pb-[48px] md:pb-[64px] px-[15px] 2xl:px-0">
        <div className="container mx-auto px-4 max-w-[1400px]">
          <div className="flex flex-col lg:flex-row lg:items-start items-center gap-12">
            <div className="w-full lg:w-1/2 flex flex-col">
              <h2 className="text-[24px] md:text-[40px] font-medium text-black w-full">{p("solution")}</h2>

              <hr className="my-[16px] md:my-[23px] text-[#A0A3A9] opacity-30"></hr>

              <p dangerouslySetInnerHTML={{ __html: String(data?.project?.project_solution || "") }}></p>
            </div>

            <div className="w-full lg:w-1/2 flex flex-col">
              <h2 className="text-[24px] md:text-[40px] font-medium text-black w-full">{p("results")}</h2>

              <hr className="my-[16px] md:my-[23px] text-[#A0A3A9] opacity-30"></hr>

              <p dangerouslySetInnerHTML={{ __html: String(data?.project?.project_results || "") }}></p>
            </div>
          </div>
        </div>
      </section>

      {data?.faqs && data?.faqs?.length > 0 && <FAQ faqs={data?.faqs} />}


      <section className="pb-[48px] md:pb-[64px] px-[15px] 2xl:px-0">
        <ProjectsCarousel previousProjectsData={data?.similar || []} />
      </section>
    </>
  );
}
