// import { useTranslations } from "next-intl";
import ProjectLogos from "../components/global/PojectLogos";
import Counters from "../components/global/Counters";
import Services from "../components/home/Services";
import WhoAreWe from "../components/home/WhoAreWe";
import PreviousProjects from "../components/home/PreviousProjects";
import Reviews from "../components/global/Reviews";
import FAQ from "../components/global/FAQ";
import Blogs from "../components/home/Blogs";
// import { routing } from "@/i18n/routing";
import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";
// import { use } from "react";
import { HomePageData, RecordUserVisitData } from "../utils/Types";
import { Link } from "@/i18n/navigation";
import ReviewsHome from "../components/home/ReviewsHome";
import { Metadata } from "next";

// export function generateStaticParams() {
//   return routing.locales.map((locale) => ({ locale }));
// }

// { params }: { params: { locale: string } }

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('HomePage');

  return {
    title: t("home"),
    description: t("home"),
    keywords: t("home")
  };
}


export default async function HomePage() {
  const locale = await getLocale();

  // set locale for next-intl
  // setRequestLocale(locale);

  const t = await getTranslations('HomePage');

  async function getHomePageData(locale: string): Promise<HomePageData> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getHomePage`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        lang: locale,
      }
    });
  
    if (!res.ok) {
      // console.log(res, "res")
      // console.log("Server responded with error code:", res.status);
      if (res.status == 500 || res.status == 502 || res.status == 503 || res.status == 504) {
        throw new Error("Failed to fetch Server issue");
      } else {
        throw new Error("Failed to fetch homepage data");
      }
    }

    return res.json();
  }

  async function RecordUserVisit(locale: string): Promise<RecordUserVisitData> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/setVisitorCount`, {
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
        throw new Error("Failed to fetch Record User Visit data");
      }
    }
  
    return res.json();
  }
  

  // fetch typed data
  const { data } = await getHomePageData(locale);

  const { message } = await RecordUserVisit(locale);

  return (
    <section className="mb-[64px] md:mb-[100px]"> 
      <main className="mx-auto max-w-[1400px] pt-[6.5rem] md:pt-[8.5rem] lg:pt-[10.5rem] relative px-[15px] 2xl:px-0">
        <section className="absolute xl:left-[1%] xl:top-[-3%] 2xl:left-[-2%] 2xl:top-[-3%] opacity-60 hidden xl:block">
          <img src="/background-section.svg" />
        </section>

        <section className="absolute xl:right-[1%] xl:top-[5%] 2xl:right-[-8%] 2xl:top-[5%] opacity-20 hidden xl:block">
          <img src="/background-section-2.svg" />
        </section>

        <section className="max-w-[1400px] mx-auto">
          <div className="text-center">
            <h1 className="text-[30px] md:text-[48px] font-bold text-[#EDA133] mb-4">{data?.app_hero_title}</h1>
            <p className="text-neutral-600 text-[14px] md:text-[18px] w-full md:w-[641px] font-medium mx-auto">
              {data?.app_hero_desc}
            </p>
          </div>

          <section className="flex items-center justify-center gap-4 mt-6">
            <Link
              href="/start-your-project"
              className="text-center bg-[#EDA133] w-full md:w-[238px] h-[48px] xl:h-[56px] rounded-[8px] flex items-center justify-center gap-2 text-white px-4 py-2 text-[14px] md:text-[16px] font-medium hover:bg-brand-600 cursor-pointer transition-colors"
            >
              {t("startProject")}
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

            {/* md:w-[150px] */}
            <Link href="/free-consultation" className="text-center flex items-center justify-center border w-full md:w-auto md:px-10  h-[48px] xl:h-[56px] rounded-[8px] border-orange-400 text-orange-400 px-4 py-2 text-[14px] md:text-[16px] font-medium hover:bg-orange-50 transition-colors">
              {t("freeConsultation")}
            </Link>
          </section>

          <section className="relative w-full overflow-hidden mt-[24px] md:mt-[56px] rounded-[8px]">
            <figure className="w-full h-[293px] xl:h-[374px]">
              <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              >
              <source src={"https://www.pexels.com/download/video/11009926/"} type="video/mp4" />
              <source src={"https://www.pexels.com/download/video/11009926/"} type="video/quicktime" />
              </video>
            </figure>
          </section>
        </section>

        <Counters countersData={data?.statistics} />
      </main>

      {data?.our_services?.services?.length > 0 && <Services servicesData={data?.our_services || []} />}

      {data?.our_products?.length > 0 && <ProjectLogos logosData={data?.our_products} />}

      <WhoAreWe dataInfo={data?.business_building} />

      {data?.our_projects.projects?.length > 0 && <PreviousProjects dataInfo={data?.our_projects} />}

      {(data?.our_clients && data?.our_clients?.clients?.length > 0) && <ReviewsHome reviewsData={data?.our_clients} />}

      {data?.faqs?.length > 0 && <FAQ faqs={data?.faqs} homePageStatus={true} />}

      {data?.our_articles?.articles?.length > 0 && <Blogs articles={data?.our_articles} />}
    </section>
  );
}
