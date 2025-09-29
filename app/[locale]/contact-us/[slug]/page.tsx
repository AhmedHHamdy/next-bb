"use client";

import ContactUsForm from "@/app/components/contact-us/ContactUsForm";
import MapComponent from "@/app/components/contact-us/MapComponent";
import FAQ from "@/app/components/global/FAQ";
import { ContactUsPageDataType } from "@/app/utils/Types";
import { Link } from "@/i18n/navigation";
import { useQuery } from "@tanstack/react-query";
import { Spin } from "antd";
import { useLocale, useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

async function fetchContactUsPageData(locale: string): Promise<ContactUsPageDataType> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getContactUsInfo`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      lang: locale,
    }
  });

  if (!res.ok) {
    if (res.status == 500 || res.status == 502 || res.status == 503 || res.status == 504) {
      throw new Error("Failed to fetch Server issue");
    } else {
      throw new Error("Failed to fetch homepage data");
    }
  }

  return res.json();
}

export default function Page() {
  const locale = useLocale();
  const t = useTranslations('ContactUs');
  const e = useTranslations("Errors404")
  const router = useRouter();
  const params = useParams();
  const currentSlug = Array.isArray(params.slug) ? decodeURIComponent(params.slug[0]) : decodeURIComponent(params?.slug || "") || "";

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["contact-us", locale],
    queryFn: () => fetchContactUsPageData(locale),
  });

  // useEffect(() => {
  //   const fetchedSlug = data?.data?.slug;
  //   if (!isLoading && fetchedSlug && router) {
  //     router.push(`/${locale}/contact-us/${fetchedSlug}`);
  //   }
  // }, [data, router, isLoading]);

  // useEffect(() => {
  //   if (data) {
  //     localStorage.setItem("slug-contact-us", `${data?.data?.slug?.en + "+" +  data?.data?.slug?.ar}`)
  //   }
  // }, [data])

  useEffect(() => {
    // const canonical = localStorage.getItem("slug-contact-us")?.split("+");
    // router.replace(`/${locale}/contact-us/${locale == "en" ? data?.data?.slug?.en : data?.data?.slug?.ar}`);

    if (locale == "en" && data) {
      router.replace(`/${locale}/contact-us/${data?.data?.slug?.en}`);
    } else if (locale == "ar" && data) {
      router.replace(`/${locale}/contact-us/${data?.data?.slug?.ar}`);
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

  const pageData = data.data;

  return (
    <>
      {/* <!-- Contact Us Section --> */}
      <section className="relative pt-[4rem] lg:pt-[6.7rem]">
        <div className="relative bg-[#FCF4E9] overflow-hidden">

          <div className="max-w-[1670px] mx-auto relative z-[50] grid lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-5">

            {/* <!-- Background Vector --> */}
            <div className="absolute hidden xl:block right-[20px] top-[20px] ltr:hidden  ltr:xl:left-[-4%] rtl:xl:right-[-4%] xl:top-[10%] ltr:2xl:left-[6%] rtl:2xl:right-[6%] 2xl:top-[10%] opacity-70 z-[10]">
              <img
                src="/contact-bg-background.png"
                
                className="w-[225px] h-[543px]"
              />
            </div>


            <div className="bg-[#FCF4E9] h-full relative  w-full 2xl:col-span-3
              flex flex-col items-center justify-center gap-[32px]
              px-[15px] xl:px-[5rem] 2xl:px-[14rem] 2xl:ps-[14rem] pt-[20px] lg:py-[32px]
              ">

              <h1 className="text-[28px] md:text-[48px] w-full font-bold text-[#232323] leading-[1.5] relative z-[50]">
                {pageData?.other?.header_title?.slice(0, 60)}
              </h1>

              {/* 
              <div className="absolute z-[50] md:top-[31%] lg:top-[36%] xl:top-[38%] 2xl:top-[34%] right-[45px] md:right-[5%] lg:right-[4%] xl:right-[14%] 2xl:right-[25%] hidden md:block">
                <img src="/hero-vector-1393.svg" alt="decorative element" className="w-[247px] h-[28px]" />
              </div>

              <div className="absolute top-[23%] right-[25px] md:hidden  z-[50]">
                <img src="/hero-vector-mobile.svg" alt="decorative element" className="" />
              </div> */}

              <p className="text-[14px] md:text-[18px] font-medium text-[#393939] leading-[1.56] xl:max-w-full relative z-[50]">
                {pageData?.other?.header_description}
              </p>

              {/* <!-- Buttons --> */}
              <div className="flex flex-row gap-4 w-full relative z-[50]">
                <Link href="/start-your-project" className="bg-[#EDA133] hover:bg-[#D1912A] w-full md:w-auto text-white h-[48px] md:h-auto md:px-6 py-3 rounded-[8px] font-medium text-[14px] md:text-[16px] flex items-center justify-center gap-2 transition-colors">
                  {t("startYourProjectNow")}
                  <svg className="rtl:block ltr:hidden" width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12.6123 4.49951C12.9321 4.49951 13.1973 4.77661 13.1973 5.11084C13.2027 5.27771 13.1309 5.43305 13.0264 5.54248C12.9216 5.65197 12.7777 5.72119 12.6123 5.72119H7.49512L15.8545 14.4585C16.0802 14.6947 16.0802 15.0865 15.8545 15.3228C15.6285 15.559 15.2534 15.559 15.0273 15.3228L6.50391 6.4126V12.106C6.50391 12.4402 6.23967 12.7173 5.91992 12.7173C5.60018 12.7173 5.33594 12.4402 5.33594 12.106V5.11084C5.33594 4.77661 5.60018 4.49952 5.91992 4.49951H12.6123Z"
                      fill="#FCF4E9"
                    />
                  </svg>

                  <svg className="rtl:hidden ltr:block" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.5 7.77686C11.5 8.0966 11.2229 8.36182 10.8887 8.36182C10.7218 8.36726 10.5665 8.29544 10.457 8.19092C10.3475 8.08617 10.2783 7.94224 10.2783 7.77686L10.2783 2.65967L1.54102 11.019C1.30482 11.2448 0.912974 11.2447 0.676757 11.019C0.440512 10.793 0.440555 10.4179 0.676757 10.1919L9.58691 1.66846L3.89355 1.66846C3.55932 1.66846 3.28223 1.40422 3.28223 1.08447C3.28223 0.764729 3.55933 0.500488 3.89355 0.500488L10.8887 0.500488C11.2229 0.500488 11.5 0.764729 11.5 1.08447L11.5 7.77686Z" fill="#FCF4E9"/>
                  </svg>
                </Link>

                <a href="#contact" className="text-center border border-[#EDA133] w-full md:w-auto text-[#EDA133] h-[48px] md:h-auto md:px-6 py-3 rounded-[8px] font-medium text-[14px] md:text-[16px] hover:bg-orange-50 transition-colors">
                  {t("callUsNow")}
                </a>
              </div>
            </div>


            <div className="w-full h-[350px] md:h-[655px] relative mt-[24px] lg:mt-0 2xl:col-span-2">
              <img
                src={pageData?.other?.header_image?.url}
                alt={pageData?.other?.header_image?.alt}
                className="w-full h-full object-cover lg:rounded-[8px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* <!-- From Section --> */}
      <ContactUsForm translationData={pageData?.other?.form} />

      {/* <!-- Contact Methods Section --> */}
      <div id="contact" className="w-full bg-white px-6 pb-[48px] md:pb-[72px]">
        <div className="max-w-[1300px] mx-auto">
          {/* <!-- Section Header --> */}
          <div className="flex flex-col items-center gap-3 mb-[32px] md:mb-[48px]">
            <h2 className="text-[24px] md:text-[40px] font-bold text-black text-center">{t("availableContactMethods")}</h2>
            <p className="text-[14px] md:text-[18px] font-medium text-[#4A4A4A] leading-[1.5] text-center max-w-[724px]">
              {t("contactMethodsDescription")}
            </p>
          </div>

          {/* <!-- Contact Methods Cards --> */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px] md:gap-[64px]">
            {/* <!-- Phone Call Card --> */}
            <div className="bg-white rounded-[31px] h-[273px] p-1 shadow-xs border border-[#F3F3F1]">
              <div className="bg-[rgba(245,245,245,0.5)] rounded-[28px] p-6 h-full flex flex-col justify-center items-center">
                <div className="flex flex-col items-center text-center space-y-[2px]">
                  {/* <!-- Icon --> */}
                  <img src="/phone-icon.svg"  />

                  {/* <!-- Content --> */}
                  <div className="space-y-2">
                    <h3 className="text-[18px] font-medium text-black"> {pageData?.other?.communication?.first?.title}</h3>
                    <p className="text-[14px] font-medium text-[#4A4A4A] leading-[1.4]">
                      {pageData?.other?.communication?.first?.desc}
                    </p>
                    <p className="text-[18px] font-bold text-black" dir="ltr">{pageData?.other?.communication?.first?.value}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* <!-- Support Chat Card --> */}
            <div className="bg-white rounded-[31px] h-[273px] p-1 shadow-xs border border-[#F3F3F1]">
              <div className="bg-[rgba(245,245,245,0.5)] rounded-[28px] p-6 h-full flex flex-col justify-center items-center">
                <div className="flex flex-col items-center text-center space-y-[2px]">
                  {/* <!-- Icon --> */}
                  <img src="/message-icon.svg"  />

                  {/* <!-- Content --> */}
                  <div className="space-y-2">
                    <h3 className="text-[18px] font-medium text-black">{pageData?.other?.communication?.second?.title}</h3>
                    <p className="text-[14px] font-medium text-[#4A4A4A] leading-[1.4]">
                      {pageData?.other?.communication?.second?.desc}
                    </p>
                    <p className="text-[18px] font-bold text-black">{pageData?.other?.communication?.second?.value}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* <!-- Email Card --> */}
            <div className="bg-white rounded-[31px] h-[273px] p-1 shadow-xs border border-[#F3F3F1]">
              <div className="bg-[rgba(245,245,245,0.5)] rounded-[28px] p-6 h-full flex flex-col justify-center items-center">
                <div className="flex flex-col items-center text-center space-y-[2px]">
                  {/* <!-- Icon --> */}
                  <img src="/email-icon.svg"  />

                  {/* <!-- Content --> */}
                  <div className="space-y-2">
                    <h3 className="text-[18px] font-medium text-black">{pageData?.other?.communication?.third?.title}</h3>
                    <p className="text-[14px] font-medium text-[#4A4A4A] leading-[1.4]">
                      {pageData?.other?.communication?.third?.desc}
                    </p>
                    <p className="text-[18px] font-bold text-black">{pageData?.other?.communication?.third?.value}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Our Branches Locations --> */}
      <div className="w-full bg-white pb-[48px] md:pb-[72px] px-[15px] 2xl:px-0">
        <div className="max-w-[1300px] mx-auto">
          {/* <!-- Section Header --> */}
          <div className="flex flex-col items-center gap-3 mb-[32px] md:mb-[48px] px-[15px] lg:px-0">
            <h2 className="text-[24px] md:text-[40px] font-bold text-black text-center">{t("ourBranchesNearYou")}</h2>
            <p className="text-[14px] md:text-[18px] font-medium text-[#4A4A4A] leading-[1.5] text-center max-w-[724px]">
              {t("viewBranchesDescription")}
            </p>
          </div>

          {/* <!-- Interactive Map --> */}
          <MapComponent branchesData={pageData?.other?.branches ? pageData?.other?.branches : []} />

          {/* <!-- Default Branches Cards --> */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[24px] md:gap-[35px] px-[15px] lg:px-0">

            {pageData?.other?.branches?.map(branch => {
              return (
                <div key={branch.id} className="bg-white rounded-[6px] p-1 shadow-lg border border-[#F3F3F1] w-full">
                  <div className="bg-[rgba(245,245,245,0.5)] rounded-[6px] p-6 h-full">
                    <h4 className="font-bold text-[20px] leading-normal text-black mb-[12px]">{branch?.name}</h4>
                    <div className="space-y-[10px]">
                      <div className="flex items-center gap-[14px]">
                        <div className="flex-shrink-0">
                          <img src="/location-icon-svg.svg"  />
                        </div>
                        <span className="font-medium text-[14px] text-[#232323] leading-tight">
                          {branch?.location}
                        </span>
                      </div>
                      <div className="flex items-center gap-[14px]">
                        <img src="/call-icon-svg.svg"  />
                        <a href={`tel:${branch?.phone.replace(/\D/g, '')}`} className="font-medium text-[14px] text-[#232323] cursor-pointer" dir="ltr">{branch?.phone}</a>
                      </div>
                      <div className="flex items-center gap-[14px]">
                        <img src="/email-icon-svg.svg"  />
                        <span className="font-medium text-[14px] text-[#232323]">{branch?.email}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}

  
          </div>
        </div>
      </div>

      {/* <!-- FAQ Section --> */}
      <FAQ faqs={pageData?.other?.faqs ? pageData?.other?.faqs : []} />
    </>
  );
}
