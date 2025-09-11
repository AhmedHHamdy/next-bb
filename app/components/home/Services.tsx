import { ServiceType } from "@/app/utils/Types";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";

export default async function Services({
  servicesData,
}: {
  servicesData?: {
    title: string;
    desc: string;
    services: ServiceType[];
  };
}) {

  const t = await getTranslations('HomePage');


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
    <section className="relative bg-[#131A27] mt-[32px] md:mt-[64px] py-[72px] px-[15px] 2xl:px-0 overflow-hidden">
      <div className="absolute inset-0 top-[15px]">
        <img src="/background-art.svg" alt="background art" />
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="text-center mb-[36px] md:mb-[49px]">
          <h2 className="text-[24px] md:text-[40px] font-bold text-white mb-[12px] ">{servicesData?.title}</h2>
          <p className="text-[#B1B1B1] text-[14px] md:text-[18px] font-medium max-w-[540px] mx-auto ">
            {servicesData?.desc}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 justify-items-center gap-x-[34px] gap-y-[16px] md:gap-y-[48px]">
          {servicesData?.services &&
            servicesData?.services.map((service) => {
              return (
                <div
                  key={service.id}
                  className="bg-[#313B4D] w-full h-full flex items-start justify-start gap-[16px] md:gap-[35px] rounded-lg p-8 border border-gray-700 hover:border-[#EDA133] transition-all duration-300 hover:transform hover:-translate-y-2"
                >
                  <div className="self-start w-16 h-16 mt-[7px]">
                    {/* h-[85px] */}
                    <img className="h-[45px]" src={service.image_url} alt="service icon" />
                  </div>
                  <div className="flex flex-col gap-[10px] w-full md:w-[240px]">
                    <h3 className="text-[16px] md:text-[21.5px] font-bold text-white break-words">{truncate60(service?.name)}</h3>
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
              );
            })}
        </div>

        <div className="flex items-center justify-center mt-[48px]">
          <Link
            href="/services"
            className="bg-[#EDA133] flex items-center justify-center gap-2 hover:bg-[#D1912A] w-[229px] h-[56px] text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 "
          >
            <span className="text-[16px] font-medium">{t("allServices")}</span>
            <svg className="rtl:block ltr:hidden" width="11" height="12" viewBox="0 0 11 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M7.27637 0.637695C7.59612 0.637695 7.86133 0.914793 7.86133 1.24902C7.86677 1.41589 7.79496 1.57124 7.69043 1.68066C7.58568 1.79015 7.44175 1.85938 7.27637 1.85938H2.15918L10.5186 10.5967C10.7443 10.8329 10.7442 11.2247 10.5186 11.4609C10.2925 11.6972 9.91744 11.6971 9.69141 11.4609L1.16797 2.55078V8.24414C1.16797 8.57837 0.903733 8.85547 0.583984 8.85547C0.264241 8.85546 0 8.57837 0 8.24414V1.24902C0 0.914796 0.264241 0.637701 0.583984 0.637695H7.27637Z"
                fill="#FCF4E9"
              />
            </svg>

            <svg className="rtl:hidden ltr:block" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.5 7.77686C11.5 8.0966 11.2229 8.36182 10.8887 8.36182C10.7218 8.36726 10.5665 8.29544 10.457 8.19092C10.3475 8.08617 10.2783 7.94224 10.2783 7.77686L10.2783 2.65967L1.54102 11.019C1.30482 11.2448 0.912974 11.2447 0.676757 11.019C0.440512 10.793 0.440555 10.4179 0.676757 10.1919L9.58691 1.66846L3.89355 1.66846C3.55932 1.66846 3.28223 1.40422 3.28223 1.08447C3.28223 0.764729 3.55933 0.500488 3.89355 0.500488L10.8887 0.500488C11.2229 0.500488 11.5 0.764729 11.5 1.08447L11.5 7.77686Z" fill="#FCF4E9"/>
            </svg>

          </Link>
        </div>
      </div>
    </section>
  );
}
