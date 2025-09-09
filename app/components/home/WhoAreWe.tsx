import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";

export default async function WhoAreWe({ dataInfo }: {
  dataInfo: {
    title: string;
    desc: string;
    features: {
      one: {
        title: string;
        desc: string;
        image: string;
      };
      two: {
        title: string;
        desc: string;
        image: string;
      };
      three: {
        title: string;
        desc: string;
        image: string;
      };
      four: {
        title: string;
        desc: string;
        image: string;
      };
    }
  }
}) {

  const t = await getTranslations('HomePage');

  return (
    <section className="relative bg-[#FCF4E9] py-[48px] md:py-[92px] overflow-hidden">
      <div className="absolute inset-0">
        <img src="/background-section-3.svg" alt="" />
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="flex flex-col xl:flex-row xl:justify-between xl:items-center gap- px-[15px] 2xl:px-0">
          <div className="flex-1 max-w-2xl">
            <div>
              <h3 className="text-[#F2B660] font-bold text-[20px] mb-[16px] ">بناء الأعمال</h3>
              <div>
                <h2 className="text-[24px] md:text-[40px] font-bold text-black mb-[16px] ">{dataInfo?.title}</h2>
                <p className="text-[14px] md:text-[18px] text-black font-medium leading-relaxed ">
                  {dataInfo?.desc}
                </p>
              </div>
            </div>

            <div className="mt-[24px]">
              <Link href="/start-your-project" className="bg-[#EDA133] text-center hover:bg-[#D1912A] w-full md:w-[230px] text-white font-medium py-3 px-6 rounded-lg transition-all duration-300  flex items-center justify-center gap-2">
                <span className="text-[16px]">{t("startProject")}</span>
                <svg className="rtl:block ltr:hidden" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M8.21387 0.768555C8.53362 0.768555 8.79883 1.04565 8.79883 1.37988C8.80427 1.54675 8.73246 1.7021 8.62793 1.81152C8.52318 1.92101 8.37925 1.99023 8.21387 1.99023H3.09668L11.4561 10.7275C11.6818 10.9637 11.6817 11.3556 11.4561 11.5918C11.23 11.828 10.8549 11.828 10.6289 11.5918L2.10547 2.68164V8.375C2.10547 8.70923 1.84123 8.98633 1.52148 8.98633C1.20174 8.98632 0.9375 8.70923 0.9375 8.375V1.37988C0.9375 1.04566 1.20174 0.768561 1.52148 0.768555H8.21387Z"
                    fill="#FCF4E9"
                  />
                </svg>
                
                <svg className="rtl:hidden ltr:block" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.5 7.77686C11.5 8.0966 11.2229 8.36182 10.8887 8.36182C10.7218 8.36726 10.5665 8.29544 10.457 8.19092C10.3475 8.08617 10.2783 7.94224 10.2783 7.77686L10.2783 2.65967L1.54102 11.019C1.30482 11.2448 0.912974 11.2447 0.676757 11.019C0.440512 10.793 0.440555 10.4179 0.676757 10.1919L9.58691 1.66846L3.89355 1.66846C3.55932 1.66846 3.28223 1.40422 3.28223 1.08447C3.28223 0.764729 3.55933 0.500488 3.89355 0.500488L10.8887 0.500488C11.2229 0.500488 11.5 0.764729 11.5 1.08447L11.5 7.77686Z" fill="#FCF4E9"/>
                </svg>

              </Link>
            </div>
          </div>

          <div className="block xl:hidden w-full h-px bg-[#F9DFBA] my-[16px]"></div>

          <section className="flex flex-col gap-[17px]">
            <img className="opacity-20" src="/businessbuildingbg.svg" alt="business building background" />
            <img className="opacity-40" src="/businessbuildingbg.svg" alt="business building background" />
            <img className="opacity-80" src="/businessbuildingbg.svg" alt="business building background" />
          </section>
        </div>

        <div className="hidden xl:block w-full h-px bg-[#F9DFBA] mt-[48px] mb-[32px]"></div>

        <div className="px-[15px] 2xl:px-0 mt-[45px] xl:mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-[24px]">
            <div className="rounded-lg overflow-hidden h-[173px] md:h-[199px] shadow-sm">
              <div className="bg-[#FAEAD1] flex items-center justify-start gap-[8px] ps-[25px] h-[73px]">
                <img className="h-[48px] w-[48px]" src={dataInfo?.features?.one?.image} alt="results gif" />
                <h4 className="text-black font-medium text-[18px] md:text-[20px]">{dataInfo?.features?.one?.title}</h4>
              </div>
              <div className="p-[16px] flex flex-col items-center">
                <p className="text-black font-medium text-base leading-relaxed ">
                  {dataInfo?.features?.one?.desc}
                </p>
              </div>
            </div>

            <div className="rounded-lg overflow-hidden h-[173px] md:h-[199px] shadow-sm">
              <div className="bg-[#FAEAD1] flex items-center justify-start gap-[8px] ps-[25px] h-[73px]">
                <img className="h-[48px] w-[48px]" src={dataInfo?.features?.two?.image} alt="growth gif" />
                <h4 className="text-black font-medium text-[18px] md:text-[20px]">{dataInfo?.features?.two?.title}</h4>
              </div>
              <div className="p-[16px] flex flex-col items-center">
                <p className="text-black font-medium text-base leading-relaxed ">
                  {dataInfo?.features?.two?.desc}
                </p>
              </div>
            </div>

            <div className="rounded-lg overflow-hidden h-[173px] md:h-[199px] shadow-sm">
              <div className="bg-[#FAEAD1] flex items-center justify-start gap-[8px] ps-[25px] h-[73px]">
                <img className="h-[48px] w-[48px]" src={dataInfo?.features?.three?.image} alt="presentation gif" />
                <h4 className="text-black font-medium text-[18px] md:text-[20px]">{dataInfo?.features?.three?.title}</h4>
              </div>
              <div className="p-[16px] flex flex-col items-center">
                <p className="text-black font-medium text-base leading-relaxed ">
                  {dataInfo?.features?.three?.desc}
                </p>
              </div>
            </div>

            <div className="rounded-lg overflow-hidden h-[173px] md:h-[199px] shadow-sm">
              <div className="bg-[#FAEAD1] flex items-center justify-start gap-[8px] ps-[25px] h-[73px]">
                <img className="h-[48px] w-[48px]" src={dataInfo?.features?.four?.image} alt="coding gif" />
                <h4 className="text-black font-medium text-[18px] md:text-[20px]">{dataInfo?.features?.four?.title}</h4>
              </div>
              <div className="p-[16px] flex flex-col items-center">
                <p className="text-black font-medium text-[16px] leading-relaxed ">
                  {dataInfo?.features?.four?.desc}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
