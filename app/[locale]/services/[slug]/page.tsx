"use client";

import FAQ from "@/app/components/global/FAQ";
import { ApiResponse, ServicesDetailsPageDataType } from "@/app/utils/Types";
import { Link } from "@/i18n/navigation";
import { useQuery } from "@tanstack/react-query";
import { Spin } from "antd";
import { useLocale, useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

async function fetchServiceDetails(locale: string, currentSlug: string): Promise<ServicesDetailsPageDataType> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getServiceById`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      lang: locale,
    },
    body: JSON.stringify({ slug: currentSlug }),
  });
  if (!res.ok) {
    if (res.status == 500 || res.status == 502 || res.status == 503 || res.status == 504) {
      throw new Error("Failed to fetch Server issue");
    } else {
      throw new Error("Failed to fetch Service Details data");
    }
  }
  return res.json();
}

async function fetchAppSettings(locale: string): Promise<ApiResponse> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getAppSettings`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      lang: locale,
    },
  });
  if (!res.ok) {
    throw new Error("Failed to website settings");
  }
  return res.json();
}

export default function Page() {
  const locale = useLocale();
  const t = useTranslations("Services");
  const e = useTranslations("Errors404");
  const router = useRouter();
  const params = useParams() as { slug?: string | string[] };

  const isFirstRun = useRef(true);

  const currentSlug = Array.isArray(params.slug) ? decodeURIComponent(params.slug[0]) : decodeURIComponent(params?.slug || "") || "";

  const { data: serviceResp, isLoading, isError, refetch } = useQuery({
    queryKey: ["service-details", currentSlug, locale],
    queryFn: () => fetchServiceDetails(locale, currentSlug),
    enabled: Boolean(currentSlug),
  });

  const { data: settingsResp } = useQuery({
    queryKey: ["app-settings", locale],
    queryFn: () => fetchAppSettings(locale),
  });

  const service = serviceResp?.data;
  const linksData = settingsResp;

  // useEffect(() => {
  //   const canonical = locale =="en" ? service?.slug?.en : service?.slug?.ar;
  //   if (!isLoading && canonical && currentSlug && canonical !== currentSlug) {
  //     router.push(`/${locale}/services/${canonical}`);
  //   }
  // }, [isLoading, service?.slug, currentSlug, router, locale]);

  // useEffect(() => {
  //   if (service) {
  //     localStorage.setItem("slug-service", `${service?.slug?.en + "+" +  service?.slug?.ar}`)
  //   }
  // }, [service])


  // useEffect(() => {
  //   const canonical = localStorage.getItem("slug-service")?.split("+");
  //   router.replace(`/${locale}/services/${locale == "en" ? service?.slug?.en : service?.slug?.ar}`);

  //   if (locale == "en") {
  //     router.replace(`/${locale}/services/${canonical?.[0]}`);
  //   } else if (locale == "ar") {
  //     router.replace(`/${locale}/services/${canonical?.[1]}`);
  //   } 
  // }, [locale, router]);


  useEffect(() => {
    if (service) {
      localStorage.setItem(
        "slug-service",
        `${service?.slug?.en + "+" + service?.slug?.ar}`
      );
    }
  }, [service]);

  // Navigate only after slug exists (and not on the very first render)
  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      // skip on the very first render

      // localStorage.removeItem("slug-service");
      return;
    }

    const slugKey = localStorage.getItem("slug-service");
    if (!slugKey) return; // slug not yet saved

    const canonical = slugKey.split("+");
    if (canonical.length < 2) return; // ensure both slugs exist

    if (locale === "en") {
      router.replace(`/${locale}/services/${canonical[0]}`);
    } else if (locale === "ar") {
      router.replace(`/${locale}/services/${canonical[1]}`);
    }
  }, [locale, router]);

  // useEffect(() => {
  //   if (locale == "en" && service) {
  //     router.replace(`/${locale}/services/${service?.slug?.en}`);
  //   } else if (locale == "ar" && service) {
  //     router.replace(`/${locale}/services/${service?.slug?.ar}`);
  //   } 
  // }, [currentSlug, locale, router, service]);

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

  if (isError || !serviceResp) {
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

            <svg className="rtl:block ltr:hidden" width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10.0603 14.281C10.1869 14.281 10.3136 14.2343 10.4136 14.1343C10.6069 13.941 10.6069 13.621 10.4136 13.4277L6.06693 9.08099C5.74693 8.76099 5.74693 8.24099 6.06693 7.92099L10.4136 3.57432C10.6069 3.38099 10.6069 3.06099 10.4136 2.86766C10.2203 2.67432 9.90026 2.67432 9.70693 2.86766L5.36026 7.21432C5.02026 7.55432 4.82693 8.01432 4.82693 8.50099C4.82693 8.98766 5.01359 9.44766 5.36026 9.78766L9.70693 14.1343C9.80693 14.2277 9.93359 14.281 10.0603 14.281Z"
                fill="#8B8B8B"
              />
            </svg>

            <svg className="rtl:hidden ltr:block" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5.93974 2.21999C5.81307 2.21999 5.68641 2.26665 5.58641 2.36665C5.39307 2.55999 5.39307 2.87999 5.58641 3.07332L9.93307 7.41999C10.2531 7.73999 10.2531 8.25999 9.93307 8.57999L5.58641 12.9267C5.39307 13.12 5.39307 13.44 5.58641 13.6333C5.77974 13.8267 6.09974 13.8267 6.29307 13.6333L10.6397 9.28665C10.9797 8.94665 11.1731 8.48665 11.1731 7.99999C11.1731 7.51332 10.9864 7.05332 10.6397 6.71332L6.29307 2.36665C6.19307 2.27332 6.06641 2.21999 5.93974 2.21999Z" fill="#8B8B8B"/>
            </svg>

            <Link href="/services" className="text-[#8B8B8B] text-[15px] font-medium leading-[1.65]">
              {t("services")}
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

            <Link href={`/services/${currentSlug}`} className="text-black text-[15px] font-medium leading-[1.65]">
              {service?.home_main_title}
            </Link>
          </div>
        </div>
      </div>
      {/* pt-[4.7rem] md:pt-[4.7rem] lg:pt-[6.7rem] */}
      {/* <!-- Section 1  --> */}
      <section className=" relative">
        <div className="relative bg-[#0C090C] overflow-hidden">
          {/* <!-- Background Gradient --> */}
          <div className="absolute left-[48px] top-[392px] w-[1385px] h-[1242px] opacity-40">
            <div className="w-full h-full bg-gradient-to-b from-[#FF3700] to-[#FF8A00] rounded-full blur-[290px]"></div>
          </div>

          {/* <!-- Content --> */}
          <div className="max-w-[1400px] mx-auto relative z-10 flex flex-col items-center justify-center gap-16 p-8 lg:p-12 min-h-[398px] px-[15px] xl:px-0">
            <div className="flex flex-col items-center gap-[48px]">
              <div className="flex flex-col items-center gap-[16px] text-center">
                <h1 className="text-[32px] md:text-[40px] font-bold text-white leading-[1.85]">
                  {service?.main_title}
                </h1>
                <p className="text-[14px] md:text-[16px] text-white leading-[1.85] max-w-[520px]">
                  {service?.main_desc}
                </p>
              </div>

              {/* <!-- Buttons --> */}
              <div className="flex flex-row gap-[16px] w-full md:w-auto">
                <Link
                  href="/start-your-project"
                  className="w-full md:w-[230px] h-[56px] bg-[#EDA133] rounded-lg flex gap-2 items-center justify-center text-white font-medium text-[16px] hover:bg-[#F0AC49] transition-colors"
                >
                  {t("startProject")}
                  <svg
                    className="rtl:block ltr:hidden"
                    width="11"
                    height="12"
                    viewBox="0 0 11 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.27637 0.637695C7.59612 0.637695 7.86133 0.914793 7.86133 1.24902C7.86677 1.41589 7.79496 1.57124 7.69043 1.68066C7.58568 1.79015 7.44175 1.85938 7.27637 1.85938H2.15918L10.5186 10.5967C10.7443 10.8329 10.7442 11.2247 10.5186 11.4609C10.2925 11.6972 9.91744 11.6971 9.69141 11.4609L1.16797 2.55078V8.24414C1.16797 8.57837 0.903733 8.85547 0.583984 8.85547C0.264241 8.85546 0 8.57837 0 8.24414V1.24902C0 0.914796 0.264241 0.637701 0.583984 0.637695H7.27637Z"
                      fill="#FCF4E9"
                    />
                  </svg>

                  <svg
                    className="rtl:hidden ltr:block"
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.5 7.77686C11.5 8.0966 11.2229 8.36182 10.8887 8.36182C10.7218 8.36726 10.5665 8.29544 10.457 8.19092C10.3475 8.08617 10.2783 7.94224 10.2783 7.77686L10.2783 2.65967L1.54102 11.019C1.30482 11.2448 0.912974 11.2447 0.676757 11.019C0.440512 10.793 0.440555 10.4179 0.676757 10.1919L9.58691 1.66846L3.89355 1.66846C3.55932 1.66846 3.28223 1.40422 3.28223 1.08447C3.28223 0.764729 3.55933 0.500488 3.89355 0.500488L10.8887 0.500488C11.2229 0.500488 11.5 0.764729 11.5 1.08447L11.5 7.77686Z"
                      fill="#FCF4E9"
                    />
                  </svg>
                </Link>
                <Link
                  href="/free-consultation"
                  className="w-full md:w-[150px] h-[56px] border border-[#EDA133] rounded-lg flex items-center justify-center text-[#EDA133] font-medium text-[16px] hover:bg-[#EDA13333] hover:text-white transition-colors"
                >
                  {t("freeConsultation")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- Service Hero Section --> */}
      <section className="max-w-[1400px] mx-auto relative px-[15px] xl:px-0 pt-[48px] lg:pt-0">
        {/* <!-- Background Decorative Elements --> */}
        {/* <div className="md:hidden lg:block absolute left-[2px] top-[390px] lg:top-[15%] lg:left-[4.5%] xl:top-[15%] ltr:hidden  rtl:xl:left-[5.8%] z-[0]">
          <img className="h-[260px] lg:h-full" src="/services-page-bg-art.svg"  />
        </div> */}

        <div className="rounded-[8px] overflow-hidden">
          {/* <!-- Content --> */}
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-32 lg:p-12 lg:py-[64px]">
            {/* <!-- Left Side - Content --> */}
            <div className="w-full lg:w-[536px] flex flex-col gap-[24px]">
              {/* <!-- Badge --> */}
              <div className="text-[#F0AC49] text-[16px] md:text-[20px] font-bold">{t("services")}</div>

              {/* <!-- Main Heading --> */}
              <h1 className="text-[28px] md:text-[48px] font-bold text-[#2A313D] leading-[1.4]">{service?.name}</h1>

              {/* <!-- Description --> */}
              <p
                dangerouslySetInnerHTML={{ __html: service?.description as any }}
                // className="text-[14px] md:text-[18px] text-[#393939] leading-[1.56] font-medium break-words"
              >
                {/* {data?.description} */}
              </p>

              {/* <!-- CTA Button --> */}
              <div className="flex items-center gap-4">
                <Link
                  href={`https://wa.me/${linksData?.data?.social?.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-4 bg-[#EDA133] w-full md:w-auto rounded-lg text-white text-[16px] font-medium flex justify-center items-center gap-2 hover:bg-[#D8902A] transition-all duration-300"
                >
                  {t("askService")}
                  <svg
                    className="rtl:block ltr:hidden"
                    width="11"
                    height="12"
                    viewBox="0 0 11 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.27637 0.637695C7.59612 0.637695 7.86133 0.914793 7.86133 1.24902C7.86677 1.41589 7.79496 1.57124 7.69043 1.68066C7.58568 1.79015 7.44175 1.85938 7.27637 1.85938H2.15918L10.5186 10.5967C10.7443 10.8329 10.7442 11.2247 10.5186 11.4609C10.2925 11.6972 9.91744 11.6971 9.69141 11.4609L1.16797 2.55078V8.24414C1.16797 8.57837 0.903733 8.85547 0.583984 8.85547C0.264241 8.85546 0 8.57837 0 8.24414V1.24902C0 0.914796 0.264241 0.637701 0.583984 0.637695H7.27637Z"
                      fill="#FCF4E9"
                    />
                  </svg>

                  <svg
                    className="rtl:hidden ltr:block"
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.5 7.77686C11.5 8.0966 11.2229 8.36182 10.8887 8.36182C10.7218 8.36726 10.5665 8.29544 10.457 8.19092C10.3475 8.08617 10.2783 7.94224 10.2783 7.77686L10.2783 2.65967L1.54102 11.019C1.30482 11.2448 0.912974 11.2447 0.676757 11.019C0.440512 10.793 0.440555 10.4179 0.676757 10.1919L9.58691 1.66846L3.89355 1.66846C3.55932 1.66846 3.28223 1.40422 3.28223 1.08447C3.28223 0.764729 3.55933 0.500488 3.89355 0.500488L10.8887 0.500488C11.2229 0.500488 11.5 0.764729 11.5 1.08447L11.5 7.77686Z"
                      fill="#FCF4E9"
                    />
                  </svg>
                </Link>
              </div>
            </div>

            {/* <!-- Right Side - Image --> */}
            <div className="w-full h-[293px] lg:w-[542px] md:h-[420px] relative mb-5 md:mb-0">
              <div className="w-full h-full bg-[#FFFFFF] rounded-[8px] overflow-hidden">
                <img src={service?.image?.url} alt={service?.image?.alt} className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- Features Section --> */}
      {(service?.features_section?.features && service?.features_section?.features.length > 0) && <section className="mt-[17px] md:mt-[60px] lg:mt-0 px-[15px] xl:px-0">
        <div className="relative max-w-[1400px] mx-auto bg-[#F2B660] rounded-[8px] p-8 lg:p-12 px-[15px] xl:px-0 lg:py-[66px]">
          <div className="md:hidden lg:block absolute right-[-5px] top-[0px] z-[20]">
            <img src="/background-service-details-art.svg"  />
          </div>

          <div className="relative flex flex-col items-center gap-9 z-[50]">
            <div className="text-center max-w-[482px] xl:max-w-[720px]">
              <h2 className="text-[24px] md:text-[40px] font-bold text-black leading-[1.2] mb-3">
                {service?.features_section?.hero_title}
              </h2>
              <p className="text-[14px] md:text-[18px] text-[#232323] leading-[1.44] font-medium">
                {service?.features_section?.hero_desc}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[12px] lg:gap-x-[37px] lg:gap-y-[33px] w-full xl:px-[71px]">
              {service?.features_section?.features && service?.features_section?.features?.map(service => {
                return (
                  <div key={service.id} className="bg-[#FFFCF8] rounded-[8px] p-4 md:p-6 ">
                    <div className="flex flex-col gap-[10px] md:gap-5">
                      <div className="w-[37px] h-[37px] bg-[#FFD86F] rounded-[8px] flex items-center justify-center">
                        <img src={service.icon.url} alt={service.icon.alt} className="w-6 h-6" />
                      </div>
                      <div className="">
                        <h3 className="text-[18px] md:text-[20px] font-bold text-[#120A0B] mb-2">{service.name}</h3>
                        <p className="text-[14px] md:text-[16px] text-[#454140] leading-[1.875] opacity-80 font-medium">
                          {service.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>}

      {/* <!-- Process Section --> */}
      {(service?.processes_section?.processes && service?.processes_section?.processes.length > 0) && <section className="mt-16 lg:mt-[64px]">
        <div className="bg-[#131A27] overflow-hidden">
          <div className="min-[2560px]:min-w-[1400px] min-[2560px]:max-auto relative z-10 flex flex-col lg:flex-row justify-between lg:items-center xl:items-stretch">
            <div className="xl:max-w-[1400px] xl:mx-auto relative w-full lg:w-[850px] lg:ms-[50px] xl:ps-[120px] p-8 pt-[48px] md:pt-[52px] lg:p-12 flex flex-col justify-center">
              <div className="mb-9">
                <h2 className="text-[24px] md:text-[40px] font-bold text-[#E7E8E9] leading-[1.2] mb-4">
                  {service?.processes_section?.hero_title}
                </h2>
                <p className="text-[14px] md:text-[18px] text-[#B8BABE] leading-[1.44]">
                  {service?.processes_section?.hero_desc}
                </p>
              </div>

              <div className="space-y-8 max-h-[460px] lg:max-h-[260px] xl:max-h-[460px] overflow-y-auto scrollbar-hide">
                {service?.processes_section?.processes?.map(((process, index) => {
                  return (
                    <div key={process.id} className="flex flex-col gap-6">
                      <div className="flex items-center gap-3">
                        <span className="w-[37px] h-[40px] flex items-center justify-center text-[28px] font-bold text-[#F3C178]">
                          {index < 10 ? "0" + (index+1) : index}
                        </span>
                        <h3 className="text-[18px] md:text-[21px] font-bold text-[#D0D1D4]">{process?.name}</h3>
                      </div>
                      <p className="text-[14px] md:text-[18px] text-[#D0D1D4] leading-[1.65] ">
                       {process?.desc}
                      </p>
                    </div>
                  )
                }))}
              </div>
            </div>

            <div className="min-[2560px]:min-w-[1400px] w-full h-[379px] md:h-auto lg:h-[620px] xl:h-auto xl:w-[720px] relative mt-[24px] lg:mt-0">
              <img
                src={service?.processes_section?.hero_image?.url}
                alt={service?.processes_section?.hero_image?.alt}
                className="w-full h-full object-cover xl:rounded-tr-[8px] xl:rounded-br-[8px]"
              />
            </div>
          </div>
        </div>
      </section>}

      {/* <!-- Why Choose Us Section --> */}
      {(service?.propositions_section?.propositions && service?.propositions_section?.propositions.length > 0) && <section className="mt-16 lg:mt-[64px]">
        <div className="max-w-[1400px] mx-auto px-[24px]">
          <div className="text-center mb-[24px] md:mb-[64px]">
            <h2 className="text-[24px] md:text-[40px] font-bold leading-[1.2] mb-4">{service?.propositions_section?.hero_title}</h2>
            <p className="text-[14px] md:text-[18px] text-[#4A4A4A] font-medium leading-[1.44] max-w-[680px] mx-auto">
              {service?.propositions_section?.hero_desc}
            </p>
          </div>

          {service?.propositions_section?.propositions?.map((proposition, i) => {
            if (i % 2 == 0) {
              return (
                <div key={proposition.id} className={`grid grid-cols-1 lg:grid-cols-2 ${i !== 0 ? "md:pt-[48px]" : ""}  gap-[24px] md:gap-20`}>
                  <div className="w-full h-[322px] md:h-auto xl:h-[535px] relative">
                    <img
                      src={proposition?.image?.url}
                      alt={proposition?.image?.alt}
                      className="w-full h-full object-cover rounded-[8px] brightness-80"
                    />
                  </div>

                  <div className="flex flex-col items-start justify-center gap-8">
                    <div className="">
                      <h3 className="text-[24px] md:text-[40px] font-bold leading-[1.25] mb-[34px]">
                        {proposition?.title}
                      </h3>
                      <p className="text-[14px] md:text-[24px] text-[#393939] font-medium leading-[1.5] mb-[34px]">
                        {proposition?.content}
                      </p>
                      
                    </div>

                    <div className="flex items-center gap-4">
                      <Link
                        href={`https://wa.me/${linksData?.data?.social?.whatsapp}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-4 bg-[#EDA133] w-full md:w-auto rounded-lg text-white text-[16px] font-medium flex justify-center items-center gap-2 hover:bg-[#D8902A] transition-all duration-300"
                      >
                        {t("askService")}
                        <svg
                          className="rtl:block ltr:hidden"
                          width="11"
                          height="12"
                          viewBox="0 0 11 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M7.27637 0.637695C7.59612 0.637695 7.86133 0.914793 7.86133 1.24902C7.86677 1.41589 7.79496 1.57124 7.69043 1.68066C7.58568 1.79015 7.44175 1.85938 7.27637 1.85938H2.15918L10.5186 10.5967C10.7443 10.8329 10.7442 11.2247 10.5186 11.4609C10.2925 11.6972 9.91744 11.6971 9.69141 11.4609L1.16797 2.55078V8.24414C1.16797 8.57837 0.903733 8.85547 0.583984 8.85547C0.264241 8.85546 0 8.57837 0 8.24414V1.24902C0 0.914796 0.264241 0.637701 0.583984 0.637695H7.27637Z"
                            fill="#FCF4E9"
                          />
                        </svg>

                        <svg
                          className="rtl:hidden ltr:block"
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M11.5 7.77686C11.5 8.0966 11.2229 8.36182 10.8887 8.36182C10.7218 8.36726 10.5665 8.29544 10.457 8.19092C10.3475 8.08617 10.2783 7.94224 10.2783 7.77686L10.2783 2.65967L1.54102 11.019C1.30482 11.2448 0.912974 11.2447 0.676757 11.019C0.440512 10.793 0.440555 10.4179 0.676757 10.1919L9.58691 1.66846L3.89355 1.66846C3.55932 1.66846 3.28223 1.40422 3.28223 1.08447C3.28223 0.764729 3.55933 0.500488 3.89355 0.500488L10.8887 0.500488C11.2229 0.500488 11.5 0.764729 11.5 1.08447L11.5 7.77686Z"
                            fill="#FCF4E9"
                          />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              )
            } else {
              return (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-[24px] md:gap-20 mt-[24px] md:mt-16">
                  <div className="w-full h-[343px] md:h-[538px] md:hidden relative">
                    <img
                      src={proposition?.image?.url}
                      alt={proposition?.image?.alt}
                      className="w-full h-full object-cover rounded-[8px] brightness-80"
                    />
                  </div>
      
                  <div className="flex flex-col md:flex-col items-start justify-center gap-8">
                    <div className="px-[15px] xl:px-0">
                      <h3 className="text-[24px] md:text-[40px] font-bold leading-[1.25] mb-[34px]">
                        {proposition?.title}
                      </h3>
                      <p className="text-[14px] md:text-[24px] text-[#393939] font-medium leading-[1.5] mb-[34px]">
                        {proposition?.content}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <Link
                        href={`https://wa.me/${linksData?.data?.social?.whatsapp}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-4 bg-[#EDA133] w-full md:w-auto rounded-lg text-white text-[16px] font-medium flex justify-center items-center gap-2 hover:bg-[#D8902A] transition-all duration-300"
                      >
                        {t("askService")}
                        <svg
                          className="rtl:block ltr:hidden"
                          width="11"
                          height="12"
                          viewBox="0 0 11 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M7.27637 0.637695C7.59612 0.637695 7.86133 0.914793 7.86133 1.24902C7.86677 1.41589 7.79496 1.57124 7.69043 1.68066C7.58568 1.79015 7.44175 1.85938 7.27637 1.85938H2.15918L10.5186 10.5967C10.7443 10.8329 10.7442 11.2247 10.5186 11.4609C10.2925 11.6972 9.91744 11.6971 9.69141 11.4609L1.16797 2.55078V8.24414C1.16797 8.57837 0.903733 8.85547 0.583984 8.85547C0.264241 8.85546 0 8.57837 0 8.24414V1.24902C0 0.914796 0.264241 0.637701 0.583984 0.637695H7.27637Z"
                            fill="#FCF4E9"
                          />
                        </svg>

                        <svg
                          className="rtl:hidden ltr:block"
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M11.5 7.77686C11.5 8.0966 11.2229 8.36182 10.8887 8.36182C10.7218 8.36726 10.5665 8.29544 10.457 8.19092C10.3475 8.08617 10.2783 7.94224 10.2783 7.77686L10.2783 2.65967L1.54102 11.019C1.30482 11.2448 0.912974 11.2447 0.676757 11.019C0.440512 10.793 0.440555 10.4179 0.676757 10.1919L9.58691 1.66846L3.89355 1.66846C3.55932 1.66846 3.28223 1.40422 3.28223 1.08447C3.28223 0.764729 3.55933 0.500488 3.89355 0.500488L10.8887 0.500488C11.2229 0.500488 11.5 0.764729 11.5 1.08447L11.5 7.77686Z"
                            fill="#FCF4E9"
                          />
                        </svg>
                      </Link>
                    </div>
                  </div>
      
                  <div className="hidden md:block w-full xl:h-[538px] relative">
                    <img
                      src={proposition?.image?.url}
                      alt={proposition?.image?.alt}
                      className="w-full h-full object-cover rounded-[8px] brightness-80"
                    />
                  </div>
                </div>
              )
            }
          })}
        </div>
      </section>}

      {/* <!-- FAQ Section --> */}
      {(service?.faqs && service?.faqs.length > 0) && <FAQ faqs={service?.faqs} />}


      {/* <!-- Expolore section --> */}
      {service?.video?.url && <section className="relative px-[15px] 2xl:px-0 mt-[56px] md:mt-[59px] pb-[64px] md:pb-[100px] ">
        <div className="hidden lg:block absolute ltr:left-[60px] rtl:right-[60px] top-[0px] z-[20]">
          <img src="/background-video-details-art.svg"  />
        </div>

        <section className="relative z-[50] max-w-[1400px] mx-auto">
          <div className="text-center">
            <h1 className="text-[24px] md:text-[40px] font-bold mb-4">{service?.video?.hero_title}</h1>
            <p className="text-neutral-600 text-[14px] md:text-[18px] w-full md:w-[641px] 2xl:w-[800px] font-medium mx-auto">{service?.video?.hero_desc}</p>
          </div>

          <section className="relative w-full overflow-hidden mt-[24px] md:mt-[56px] rounded-[8px]">
            <figure className="w-full h-[293px] md:h-auto xl:h-[634px]">
              <video src={service?.video?.url} poster={service?.video?.thumbnail_url} controls playsInline className="w-full h-full object-cover">
              </video>
            </figure>
          </section>
        </section>
      </section>}
    </>
  );
}
