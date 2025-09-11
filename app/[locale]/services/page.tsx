import ProjectLogos from "@/app/components/global/PojectLogos";
import { ApiResponse, ServicesPageDataType } from "@/app/utils/Types";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { Metadata } from "next";
import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";

// export function generateStaticParams() {
//   return routing.locales.map((locale) => ({ locale }));
// }

// { params }: { params: { locale: string } }

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Services');

  return {
    title: t("services"),
    description: t("services"),
    keywords: t("services")
  };
}


export default async function Page() {
  const locale = await getLocale();

  // setRequestLocale(locale);

  const t = await getTranslations('Services');

  const fetchFooter = async (): Promise<ApiResponse> => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/getAppSettings`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          lang: locale,
        },
      }
    );    

    if (!res.ok) {
      throw new Error("Failed to website settings");
    }
    return res.json();
  };

  const linksData = await fetchFooter();


  async function getServicesPageData(locale: string): Promise<ServicesPageDataType> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getAllServices`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        lang: locale,
      },
    });

    if (!res.ok) {
      if (res.status == 500 || res.status == 502 || res.status == 503 || res.status == 504) {
        throw new Error("Failed to fetch Server issue");
      } else {
        throw new Error("Failed to fetch Services Page data");
      }
    }

    return res.json();
  }

  const { data } = await getServicesPageData(locale);

  
  function truncateText(text: string = "", maxLength: number): string {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "..."
    }

    return text
  }

  function truncate60(text: string = ""): string {
    return truncateText(text, 60)
  }

  function truncate120(text: string = ""): string {
    return truncateText(text, 120)
  }

  return (
    <>
      {/* <!-- Services Hero Section --> */}
      <section className="max-w-[1400px] mx-auto pt-[6.5rem] md:pt-[8.5rem] lg:pt-[10.5rem] relative px-[15px] xl:px-0">
        {/* <!-- Background Decorative Elements --> */}
        <div className="md:hidden lg:block absolute ltr:rotate-90 ltr:left-[-210px] rtl:right-[-20px] top-[110px] z-[50]">
          <img src="/services-page-bg.svg" alt="background art" />
        </div>

        {/* <!-- Background Decorative Elements --> */}
        <div className="md:hidden lg:block absolute left-[2px] top-[450px] lg:left-[80px] ltr:hidden lg:top-[240px] z-[0]">
          <img className="h-[260px] lg:h-full" src="/services-page-bg-art.svg" alt="background art" />
        </div>

        <div className="rounded-[8px] overflow-hidden relative z-[80]">
          {/* <!-- Content --> */}
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-32 lg:p-12">
            {/* <!-- Left Side - Content --> */}
            <div className="w-full lg:w-[536px] flex flex-col gap-[24px]">
              {/* <!-- Badge --> */}
              <div className="text-[#F0AC49] text-[16px] md:text-[20px] font-bold">{t("services")}</div>

              {/* <!-- Main Heading --> */}
              <h1 className="text-[28px] md:text-[48px] font-bold text-[#2A313D] leading-[1.4]">
                {data?.header?.title}
              </h1>

              {/* <!-- Description --> */}
              <p className="text-[14px] md:text-[18px] text-[#393939] leading-[1.56] font-medium">
                {data?.header?.desc}
              </p>

              {/* <!-- CTA Button --> */}
              <div className="flex items-center gap-4 ">
                <a href={`https://wa.me/${linksData?.data?.social?.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-4 bg-[#EDA133] w-full md:w-auto rounded-lg text-white text-[16px] font-medium flex justify-center items-center gap-2 hover:bg-[#D8902A] transition-all duration-300">
                  {t("askService")}
                  <svg className="rtl:block ltr:hidden" width="11" height="12" viewBox="0 0 11 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M7.27637 0.637695C7.59612 0.637695 7.86133 0.914793 7.86133 1.24902C7.86677 1.41589 7.79496 1.57124 7.69043 1.68066C7.58568 1.79015 7.44175 1.85938 7.27637 1.85938H2.15918L10.5186 10.5967C10.7443 10.8329 10.7442 11.2247 10.5186 11.4609C10.2925 11.6972 9.91744 11.6971 9.69141 11.4609L1.16797 2.55078V8.24414C1.16797 8.57837 0.903733 8.85547 0.583984 8.85547C0.264241 8.85546 0 8.57837 0 8.24414V1.24902C0 0.914796 0.264241 0.637701 0.583984 0.637695H7.27637Z"
                      fill="#FCF4E9"
                    />
                  </svg>

                  <svg className="rtl:hidden ltr:block" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.5 7.77686C11.5 8.0966 11.2229 8.36182 10.8887 8.36182C10.7218 8.36726 10.5665 8.29544 10.457 8.19092C10.3475 8.08617 10.2783 7.94224 10.2783 7.77686L10.2783 2.65967L1.54102 11.019C1.30482 11.2448 0.912974 11.2447 0.676757 11.019C0.440512 10.793 0.440555 10.4179 0.676757 10.1919L9.58691 1.66846L3.89355 1.66846C3.55932 1.66846 3.28223 1.40422 3.28223 1.08447C3.28223 0.764729 3.55933 0.500488 3.89355 0.500488L10.8887 0.500488C11.2229 0.500488 11.5 0.764729 11.5 1.08447L11.5 7.77686Z" fill="#FCF4E9"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* <!-- Right Side - Image --> */}
            <div className="w-full h-[293px] lg:w-[542px] md:h-[420px] relative">
              <div className="w-full h-full bg-[#FFFFFF] rounded-[8px] overflow-hidden">
                <img src={data?.header?.image} alt="services" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- Services Section --> */}
      <section className="relative bg-[#131A27] mt-[70px]  md:mt-[64px] py-[48px] md:py-[99px] px-[15px] 2xl:px-0 overflow-hidden">
        {/* <!-- Decorative Background Elements --> */}
        <div className="hidden md:block absolute inset-0 top-[10px]">
          <img src="/services-page-bg-svg.svg" alt="background art" />
        </div>

        <div className="md:hidden absolute inset-0 top-[150px] left-[100px]">
          <img src="/services-page-bg-svg.svg" alt="background art" />
        </div>

        <div className="md:hidden absolute inset-0 top-[1500px] left-[100px]">
          <img src="/services-page-bg-svg.svg" alt="background art" />
        </div>

        <div className="max-w-[1400px] mx-auto relative z-10">
          {/* <!-- Section Header --> */}
          <div className="text-center mb-[32px] md:mb-[84px]">
            <h2 className="text-[24px] md:text-[40px] font-bold text-white mb-[12px] ">{data?.title}</h2>
            <p className="text-[#B1B1B1] text-[14px] md:text-[18px] font-medium">
              {data?.desc}
            </p>
          </div>

          {/* <!-- Services Grid --> */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 justify-items-center gap-x-[34px] gap-y-[16px] md:gap-y-[48px]">


            {data?.services && data?.services?.map(service => {
              return (
                <div key={service?.id} className="bg-[#313B4D] w-full h-full flex items-start justify-start gap-[16px] md:gap-[35px] rounded-lg p-8 border border-gray-700 hover:border-[#EDA133] transition-all duration-300 hover:transform hover:-translate-y-2">
                  <div className="self-start w-16 h-16 mt-[7px]">
                    <img className="h-[45px]" src={service?.image_url} alt="service icon" />
                  </div>
                  <div className="flex flex-col gap-[10px] w-full md:w-[240px]">
                    <h3 className="text-[16px] break-words md:text-[21.5px] font-bold text-white">
                      {truncate60(service?.name)}
                    </h3>
                    <p dangerouslySetInnerHTML={{__html: service?.description}} className="text-gray-300 text-[12px] md:text-[14px] break-words">
                      {/* {truncate120(service?.description)} */}
                    </p>
                    <Link
                      href={`/services/${service.id}/${service.slug}`}
                      className="flex items-center gap-2 text-[#EDA133] text-[14px] md:text-[15px]"
                    >
                      {t("serviceDetails")}
                      <svg className="rtl:block ltr:hidden" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M5.33054 5.51005V13.9307C5.33054 14.1025 5.39879 14.2672 5.52026 14.3887C5.64174 14.5102 5.80649 14.5784 5.97828 14.5784C6.15008 14.5784 6.31483 14.5102 6.43631 14.3887C6.55778 14.2672 6.62603 14.1025 6.62603 13.9307V7.07353L15.8839 16.3322C16.0054 16.4537 16.1702 16.522 16.3421 16.522C16.514 16.522 16.6789 16.4537 16.8004 16.3322C16.922 16.2106 16.9902 16.0458 16.9902 15.8739C16.9902 15.702 16.922 15.5372 16.8004 15.4156L7.54177 6.15779H14.3989C14.5707 6.15779 14.7355 6.08954 14.8569 5.96807C14.9784 5.84659 15.0467 5.68184 15.0467 5.51005C15.0467 5.33825 14.9784 5.1735 14.8569 5.05202C14.7355 4.93055 14.5707 4.8623 14.3989 4.8623H5.97828C5.80649 4.8623 5.64174 4.93055 5.52026 5.05202C5.39879 5.1735 5.33054 5.33825 5.33054 5.51005Z"
                          fill="#EDA133"
                        />
                      </svg>

                      <svg className="rtl:hidden ltr:block" width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.0191 0.751744V9.17237C12.0191 9.34416 11.9508 9.50892 11.8293 9.63039C11.7079 9.75187 11.5431 9.82011 11.3713 9.82011C11.1995 9.82011 11.0348 9.75187 10.9133 9.63039C10.7918 9.50892 10.7236 9.34416 10.7236 9.17237V2.31523L1.46575 11.5739C1.34421 11.6954 1.17936 11.7637 1.00748 11.7637C0.835589 11.7637 0.670742 11.6954 0.549199 11.5739C0.427657 11.4523 0.359375 11.2875 0.359375 11.1156C0.359375 10.9437 0.427657 10.7789 0.549199 10.6573L9.80784 1.39948H2.9507C2.77891 1.39948 2.61415 1.33124 2.49268 1.20977C2.3712 1.08829 2.30296 0.923536 2.30296 0.751744C2.30296 0.579953 2.3712 0.415198 2.49268 0.293723C2.61415 0.172248 2.77891 0.104004 2.9507 0.104004H11.3713C11.5431 0.104004 11.7079 0.172248 11.8293 0.293723C11.9508 0.415198 12.0191 0.579953 12.0191 0.751744Z" fill="#EDA133"/>
                      </svg>
                    </Link>
                  </div>
                </div>
              )
            })}
            
          </div>
        </div>
      </section>

      {/* <!-- Business Building Projects bar section --> */}
      <ProjectLogos logosData={data?.projects || []} />

      {/* <!-- Process Steps Section --> */}
      <section>
        <div className="bg-[#FAEAD1] rounded-[8px] pt-[48px] pb-[64px] lg:pt-[120px] lg:pb-[100px] px-[15px] md:px-10">
          <div className="w-full max-w-[1400px] mx-auto">
            {/* <!-- Process Steps --> */}
            <div className="w-full flex flex-col lg:flex-row lg:items-start xl:items-center lg:justify-between gap-[80px] xl:gap-[236px]">
              {/* <!-- left Side - CTA --> */}
              <div className="w-full lg:w-[223px] flex flex-col gap-5">
                <h2 className="text-[24px] md:text-[32px] font-bold text-black leading-[1.4]">
                  {t("stepsToReality")}
                </h2>

                {/* <!-- CTA Button --> */}
                <section className="hidden md:block">
                  <Link href="/free-consultation" className="w-full md:w-[222px] h-[56px] bg-[#EDA133] rounded-lg flex items-center justify-center gap-2 hover:bg-[#D8902A] transition-all duration-300">
                    <div className="flex items-center gap-3">
                      <span className="text-white text-[16px] font-medium">{t("joinUs")}</span>
                      <img src="/call-icon.svg" alt="call" className="w-5 h-5" />
                    </div>
                  </Link>
                </section>
              </div>

              <section className="flex flex-col xl:flex-row  items-center justify-center gap-[80px] lg:gap-[72px]">

                {/* {data?.steps && data?.steps?.map((step, index) => {
                  return ( */}
                    <div className="relative w-full lg:w-full lg:h-[170px] flex flex-col gap-4">
                      <div className="absolute right-[0px] top-[-45px] z-[0] opacity-60">
                        <img src="/01.svg" alt="background art" />
                      </div>
                      <h3 className="text-[24px] font-bold text-black leading-[1] relative z-[10]">{data?.steps?.[0]?.title}</h3>
                      <p className="text-[15px] text-[#393939] leading-[1.6] font-medium">
                        {data?.steps?.[0]?.desc}
                      </p>
                    </div>
                  {/* )
                })} */}

                <div className="relative w-full lg:w-full lg:h-[170px] flex flex-col gap-4">
                  <div className="absolute right-[0px] top-[-45px] z-[0] opacity-60">
                    <img src="/02.svg" alt="background art" />
                  </div>
                  <h3 className="text-[24px] font-bold text-black leading-[1] relative z-[10]">{data?.steps?.[1]?.title}</h3>
                  <p className="text-[15px] text-[#393939] leading-[1.6] font-medium">
                    {data?.steps?.[1]?.desc}
                  </p>
                </div>

                <div className="relative w-full lg:w-full lg:h-[170px] flex flex-col gap-4">
                  <div className="absolute right-[0px] top-[-45px] z-[0] opacity-60">
                    <img src="/03.svg" alt="background art" />
                  </div>
                  <h3 className="text-[24px] font-bold text-black leading-[1] relative z-[10]">{data?.steps?.[2]?.title}</h3>
                  <p className="text-[15px] text-[#393939] font-medium leading-[1.6]">
                   {data?.steps?.[2]?.desc}
                  </p>
                </div>
              </section>
            </div>

            <section className="block md:hidden">
              {/* <!-- CTA Button --> */}
              <Link href="/free-consultation" className="text-center w-full mt-[32px] lg:w-[222px] h-[56px] bg-[#EDA133] rounded-lg flex items-center justify-center gap-2 hover:bg-[#D8902A] transition-all duration-300">
                <div className="flex items-center gap-3">
                  <span className="text-white text-[16px] font-medium">{t("joinUs")}</span>
                  <img src="/call-icon.svg" alt="call" className="w-5 h-5" />
                </div>
              </Link>
            </section>
          </div>
        </div>
      </section>
    </>
  );
}
