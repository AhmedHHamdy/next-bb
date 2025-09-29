import ClearStorage from "@/app/components/global/ClearStorage";
import FAQ from "@/app/components/global/FAQ";
import { ProjectsPageDataType } from "@/app/utils/Types";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { Metadata } from "next";
import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";
import { use } from "react";

// export function generateStaticParams() {
//   return routing.locales.map((locale) => ({locale}));
// }

// {params}:{ params: Promise<{ locale: string }>}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("HomePage");

  return {
    title: t("projects"),
    description: t("projects"),
    keywords: t("projects"),
  };
}

export default async function Page() {
  // const {locale} = use(params);

  // setRequestLocale(locale);

  const locale = await getLocale();

  const t = await getTranslations("HomePage");

  // setRequestLocale(locale);

  async function getProjectsPageData(locale: string): Promise<ProjectsPageDataType> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getAllProjects`, {
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
        throw new Error("Failed to fetch Project Page data");
      }
    }

    return res.json();
  }

  const { data } = await getProjectsPageData(locale);

  return (
    <>
      <ClearStorage />
      <div className="w-full bg-white px-6 pb-[16px] md:pb-0 pt-[6rem] lg:pt-[6rem] xl:pt-[8rem]">
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

            <Link href="/projects" className="text-black text-[15px] font-medium leading-[1.65]">
              {t("projects")}
            </Link>
          </div>
        </div>
      </div>
      {/* pt-[6rem] lg:pt-[8rem] xl:pt-[9.4rem]*/}
      <section className="relative bg-white  pb-[64px] md:pb-[100px] md:pt-[36px] ">
        <div className="max-w-[1400px] mx-auto">
          {/* <!-- Section Header --> */}
          <div className="text-center mb-[29px] md:mb-[52px] px-[15px] md:px-0">
            <h2 className="text-[24px] md:text-[40px] font-bold text-black mb-[16px]">{data?.title}</h2>
            <p className="text-[14px] md:text-[18px] text-[#232323] md:text-[#4A4A4A] font-medium leading-relaxed max-w-4xl mx-auto">
              {data?.desc}
            </p>
          </div>

          {/* <!-- Projects Grid --> */}
          <div className="space-y-6 px-[15px] 2xl:px-0">
            {/* <!-- Row 1 --> */}
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 items-start gap-x-[17px] gap-y-[26px] md:gap-[32px]">
              {data?.projects &&
                data?.projects?.map((project) => {
                  return (
                    <div
                      key={project.id}
                      style={{ backgroundImage: `url(${project?.image?.url}` }}
                      className="h-[312px] md:h-[426px] bg-no-repeat bg-cover bg-bottom rounded-lg p-8 px-4 md:px-8 inset-project-grid-item-shadow"
                    >
                      {/* w-[235px] */}
                      <div className="h-[270px]  md:w-full md:h-[374px] flex flex-col items-start justify-end project-card">
                        <section className="w-full">
                          <h3 className="text-[16px] md:text-[24px] font-medium text-white">{project?.title}</h3>
                          <section className="mt-[12px] md:mt-[14px] flex flex-col gap-[8px] md:flex-row md:items-center md:justify-between w-full">
                            <section className="flex items-center w-[265px] md:w-[400px] gap-[13px]">
                              {/* md:w-[111px] md:px-0 w-full */}
                              <h4 className="flex justify-center  items-center gap-[8px] px-2 md:px-5  w-[150px] md:w-[250px] h-[28px] md:h-[40px] bg-[#FFFFFF33] backdrop-blur-md rounded-[8px] text-[12px] md:text-[16px] text-white">
                                <img className="h-[14.5px] md:h-[23px]" src={project?.client_type.key == "individual" ? "/person-icon.svg" : "/company-svg-icon.svg"} alt={project?.client_type.key == "individual" ? "person icon" : "company icon"}/>
                                {project?.owner_name}
                              </h4>

                              {/* md:w-[235.5px] */}
                              <h4 className="flex justify-center items-center gap-[8px] px-2 md:px-0 w-full  h-[28px] md:h-[40px] bg-[#FFFFFF33] backdrop-blur-md rounded-[8px] text-[12px] md:text-[16px] text-white">
                                <img className="h-[14.5px] md:h-[23px]" src="/location-icon.svg"  />
                                {project?.country_name}
                              </h4>
                            </section>
                          </section>

                          <section className="w-full">
                            <p
                              dangerouslySetInnerHTML={{ __html: project?.short_description }}
                              className="hidden md:block mt-[18px] text-white text-[16px]"
                            >
                              {/* {project?.description} */}
                            </p>
                            <p className="block md:hidden mt-[12px] text-white text-[12px]">
                              {project?.short_description}
                            </p>
                          </section>
                        </section>

                        <div className="mt-[16px] see-more-button">
                          <Link
                            href={`/projects/${locale == "en" ? project?.slug?.en : project?.slug?.ar}`}
                            className="bg-[#EDA133] flex items-center justify-center gap-2 hover:bg-[#D1912A] w-full md:w-[172px] h-[28px] md:h-[48px] text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 "
                          >
                            <span className="text-[14px] md:text-[16px] font-medium">{t("seeMore")}</span>
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
                  );
                })}
            </div>
          </div>
          {(data?.faqs && data?.faqs?.length > 0) && <FAQ faqs={data?.faqs} />}
        </div>
      </section>
    </>
  );
}
