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
import { getLocale, setRequestLocale } from "next-intl/server";
// import { use } from "react";
import { HomePageData } from "../utils/Types";

// export function generateStaticParams() {
//   return routing.locales.map((locale) => ({ locale }));
// }

// { params }: { params: { locale: string } }

export default async function HomePage() {
  const locale = await getLocale();

  // set locale for next-intl
  // setRequestLocale(locale);

  async function getHomePageData(locale: string): Promise<HomePageData> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getHomePage`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        lang: locale,
      }
    });
  
    if (!res.ok) {
      throw new Error("Failed to fetch homepage data");
    }
  
    return res.json();
  }

  // fetch typed data
  const { data } = await getHomePageData(locale);

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
            <a
              href="start-your-project.html"
              className="bg-[#EDA133] w-full md:w-[238px] h-[48px] xl:h-[56px] rounded-[8px] flex items-center justify-center gap-2 text-white px-4 py-2 text-[14px] md:text-[16px] font-medium hover:bg-brand-600 cursor-pointer transition-colors"
            >
              ابدأ مشروعك الآن
              <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12.6123 4.49951C12.9321 4.49951 13.1973 4.77661 13.1973 5.11084C13.2027 5.27771 13.1309 5.43305 13.0264 5.54248C12.9216 5.65197 12.7777 5.72119 12.6123 5.72119H7.49512L15.8545 14.4585C16.0802 14.6947 16.0802 15.0865 15.8545 15.3228C15.6285 15.559 15.2534 15.559 15.0273 15.3228L6.50391 6.4126V12.106C6.50391 12.4402 6.23967 12.7173 5.91992 12.7173C5.60018 12.7173 5.33594 12.4402 5.33594 12.106V5.11084C5.33594 4.77661 5.60018 4.49952 5.91992 4.49951H12.6123Z"
                  fill="#FCF4E9"
                />
              </svg>
            </a>

            <button className="border w-full md:w-[150px] h-[48px] xl:h-[56px] rounded-[8px] border-orange-400 text-orange-400 px-4 py-2 text-[14px] md:text-[16px] font-medium hover:bg-orange-50 transition-colors">
              استشارة مجانية
            </button>
          </section>

          <section className="relative w-full overflow-hidden mt-[24px] md:mt-[56px] rounded-[8px]">
            <figure className="w-full h-[293px] xl:h-[374px]">
              <video
                src={data?.app_home_video}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              ></video>
            </figure>
          </section>
        </section>

        <Counters countersData={data?.statistics} />
      </main>

      <Services servicesData={data?.our_services || []} />

      <ProjectLogos logosData={data?.our_projects.projects} />

      <WhoAreWe />

      <PreviousProjects />

      <Reviews />

      <FAQ faqs={data?.faqs} homePageStatus={true} />

      <Blogs articles={data?.our_articles} />
    </section>
  );
}
