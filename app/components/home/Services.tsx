import { ServiceType } from "@/app/utils/Types";
import { Link } from "@/i18n/navigation";

export default function Services({
  servicesData,
}: {
  servicesData?: {
    title: string;
    desc: string;
    services: ServiceType[];
  };
}) {

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
                    <img src={service.image_url} alt="service icon" />
                  </div>
                  <div className="flex flex-col gap-[10px] w-full md:w-[240px]">
                    <h3 className="text-[16px] md:text-[21.5px] font-bold text-white break-words">{truncate60(service?.name)}</h3>
                    <p className="text-gray-300 text-[12px] md:text-[14px] break-words">
                      {truncate120(service?.description)}
                    </p>
                    <Link
                      href={`/services/${service.id}`}
                      className="flex items-center gap-2 text-[#EDA133] text-[14px] md:text-[15px]"
                    >
                      تفاصيل الخدمة
                      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M5.33054 5.51005V13.9307C5.33054 14.1025 5.39879 14.2672 5.52026 14.3887C5.64174 14.5102 5.80649 14.5784 5.97828 14.5784C6.15008 14.5784 6.31483 14.5102 6.43631 14.3887C6.55778 14.2672 6.62603 14.1025 6.62603 13.9307V7.07353L15.8839 16.3322C16.0054 16.4537 16.1702 16.522 16.3421 16.522C16.514 16.522 16.6789 16.4537 16.8004 16.3322C16.922 16.2106 16.9902 16.0458 16.9902 15.8739C16.9902 15.702 16.922 15.5372 16.8004 15.4156L7.54177 6.15779H14.3989C14.5707 6.15779 14.7355 6.08954 14.8569 5.96807C14.9784 5.84659 15.0467 5.68184 15.0467 5.51005C15.0467 5.33825 14.9784 5.1735 14.8569 5.05202C14.7355 4.93055 14.5707 4.8623 14.3989 4.8623H5.97828C5.80649 4.8623 5.64174 4.93055 5.52026 5.05202C5.39879 5.1735 5.33054 5.33825 5.33054 5.51005Z"
                          fill="#EDA133"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              );
            })}

          {/* <div className="bg-[#313B4D] w-full h-full flex items-start justify-start gap-[16px] md:gap-[35px] rounded-lg p-8 border border-gray-700 hover:border-[#EDA133] transition-all duration-300 hover:transform hover:-translate-y-2">
            <div className="self-start w-16 h-16 mt-[7px]">
              <img src="/service-icon.svg" alt="service icon" />
            </div>
            <div className="flex flex-col gap-[10px] w-full md:w-[240px]">
              <h3 className="text-[16px] md:text-[21.5px] font-bold text-white ">
                تطوير مواقع الويب و المتاجر الالكترونية
              </h3>
              <p className="text-gray-300 text-[12px] md:text-[14px]">
                نصمم ونطور مواقع إلكترونية احترافية، سريعة، وآمنة تعكس هوية علامتك التجارية.
              </p>
              <a
                href="service-details.html"
                className="flex items-center gap-2 text-[#EDA133] text-[14px] md:text-[15px]"
              >
                تفاصيل الخدمة
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M5.33054 5.51005V13.9307C5.33054 14.1025 5.39879 14.2672 5.52026 14.3887C5.64174 14.5102 5.80649 14.5784 5.97828 14.5784C6.15008 14.5784 6.31483 14.5102 6.43631 14.3887C6.55778 14.2672 6.62603 14.1025 6.62603 13.9307V7.07353L15.8839 16.3322C16.0054 16.4537 16.1702 16.522 16.3421 16.522C16.514 16.522 16.6789 16.4537 16.8004 16.3322C16.922 16.2106 16.9902 16.0458 16.9902 15.8739C16.9902 15.702 16.922 15.5372 16.8004 15.4156L7.54177 6.15779H14.3989C14.5707 6.15779 14.7355 6.08954 14.8569 5.96807C14.9784 5.84659 15.0467 5.68184 15.0467 5.51005C15.0467 5.33825 14.9784 5.1735 14.8569 5.05202C14.7355 4.93055 14.5707 4.8623 14.3989 4.8623H5.97828C5.80649 4.8623 5.64174 4.93055 5.52026 5.05202C5.39879 5.1735 5.33054 5.33825 5.33054 5.51005Z"
                    fill="#EDA133"
                  />
                </svg>
              </a>
            </div>
          </div>

          <div className="bg-[#313B4D] w-full h-full flex items-start justify-start gap-[16px] md:gap-[35px] rounded-lg p-8 border border-gray-700 hover:border-[#EDA133] transition-all duration-300 hover:transform hover:-translate-y-2">
            <div className="self-start w-16 h-16 mt-[7px]">
              <img src="/service-icon.svg" alt="service icon" />
            </div>
            <div className="flex flex-col gap-[10px] w-full md:w-[240px]">
              <h3 className="text-[16px] md:text-[21.5px] font-bold text-white ">
                تطوير مواقع الويب و المتاجر الالكترونية
              </h3>
              <p className="text-gray-300 text-[12px] md:text-[14px]">
                نصمم ونطور مواقع إلكترونية احترافية، سريعة، وآمنة تعكس هوية علامتك التجارية.
              </p>
              <a
                href="service-details.html"
                className="flex items-center gap-2 text-[#EDA133] text-[14px] md:text-[15px]"
              >
                تفاصيل الخدمة
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M5.33054 5.51005V13.9307C5.33054 14.1025 5.39879 14.2672 5.52026 14.3887C5.64174 14.5102 5.80649 14.5784 5.97828 14.5784C6.15008 14.5784 6.31483 14.5102 6.43631 14.3887C6.55778 14.2672 6.62603 14.1025 6.62603 13.9307V7.07353L15.8839 16.3322C16.0054 16.4537 16.1702 16.522 16.3421 16.522C16.514 16.522 16.6789 16.4537 16.8004 16.3322C16.922 16.2106 16.9902 16.0458 16.9902 15.8739C16.9902 15.702 16.922 15.5372 16.8004 15.4156L7.54177 6.15779H14.3989C14.5707 6.15779 14.7355 6.08954 14.8569 5.96807C14.9784 5.84659 15.0467 5.68184 15.0467 5.51005C15.0467 5.33825 14.9784 5.1735 14.8569 5.05202C14.7355 4.93055 14.5707 4.8623 14.3989 4.8623H5.97828C5.80649 4.8623 5.64174 4.93055 5.52026 5.05202C5.39879 5.1735 5.33054 5.33825 5.33054 5.51005Z"
                    fill="#EDA133"
                  />
                </svg>
              </a>
            </div>
          </div>

          <div className="bg-[#313B4D] w-full h-full flex items-start justify-start gap-[16px] md:gap-[35px] rounded-lg p-8 border border-gray-700 hover:border-[#EDA133] transition-all duration-300 hover:transform hover:-translate-y-2">
            <div className="self-start w-16 h-16 mt-[7px]">
              <img src="/service-icon.svg" alt="service icon" />
            </div>
            <div className="flex flex-col gap-[10px] w-full md:w-[240px]">
              <h3 className="text-[16px] md:text-[21.5px] font-bold text-white ">
                تطوير مواقع الويب و المتاجر الالكترونية
              </h3>
              <p className="text-gray-300 text-[12px] md:text-[14px]">
                نصمم ونطور مواقع إلكترونية احترافية، سريعة، وآمنة تعكس هوية علامتك التجارية.
              </p>
              <a
                href="service-details.html"
                className="flex items-center gap-2 text-[#EDA133] text-[14px] md:text-[15px]"
              >
                تفاصيل الخدمة
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M5.33054 5.51005V13.9307C5.33054 14.1025 5.39879 14.2672 5.52026 14.3887C5.64174 14.5102 5.80649 14.5784 5.97828 14.5784C6.15008 14.5784 6.31483 14.5102 6.43631 14.3887C6.55778 14.2672 6.62603 14.1025 6.62603 13.9307V7.07353L15.8839 16.3322C16.0054 16.4537 16.1702 16.522 16.3421 16.522C16.514 16.522 16.6789 16.4537 16.8004 16.3322C16.922 16.2106 16.9902 16.0458 16.9902 15.8739C16.9902 15.702 16.922 15.5372 16.8004 15.4156L7.54177 6.15779H14.3989C14.5707 6.15779 14.7355 6.08954 14.8569 5.96807C14.9784 5.84659 15.0467 5.68184 15.0467 5.51005C15.0467 5.33825 14.9784 5.1735 14.8569 5.05202C14.7355 4.93055 14.5707 4.8623 14.3989 4.8623H5.97828C5.80649 4.8623 5.64174 4.93055 5.52026 5.05202C5.39879 5.1735 5.33054 5.33825 5.33054 5.51005Z"
                    fill="#EDA133"
                  />
                </svg>
              </a>
            </div>
          </div>

          <div className="bg-[#313B4D] w-full h-full flex items-start justify-start gap-[16px] md:gap-[35px] rounded-lg p-8 border border-gray-700 hover:border-[#EDA133] transition-all duration-300 hover:transform hover:-translate-y-2">
            <div className="self-start w-16 h-16 mt-[7px]">
              <img src="/service-icon.svg" alt="service icon" />
            </div>
            <div className="flex flex-col gap-[10px] w-full md:w-[240px]">
              <h3 className="text-[16px] md:text-[21.5px] font-bold text-white ">
                تطوير مواقع الويب و المتاجر الالكترونية
              </h3>
              <p className="text-gray-300 text-[12px] md:text-[14px]">
                نصمم ونطور مواقع إلكترونية احترافية، سريعة، وآمنة تعكس هوية علامتك التجارية.
              </p>
              <a
                href="service-details.html"
                className="flex items-center gap-2 text-[#EDA133] text-[14px] md:text-[15px]"
              >
                تفاصيل الخدمة
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M5.33054 5.51005V13.9307C5.33054 14.1025 5.39879 14.2672 5.52026 14.3887C5.64174 14.5102 5.80649 14.5784 5.97828 14.5784C6.15008 14.5784 6.31483 14.5102 6.43631 14.3887C6.55778 14.2672 6.62603 14.1025 6.62603 13.9307V7.07353L15.8839 16.3322C16.0054 16.4537 16.1702 16.522 16.3421 16.522C16.514 16.522 16.6789 16.4537 16.8004 16.3322C16.922 16.2106 16.9902 16.0458 16.9902 15.8739C16.9902 15.702 16.922 15.5372 16.8004 15.4156L7.54177 6.15779H14.3989C14.5707 6.15779 14.7355 6.08954 14.8569 5.96807C14.9784 5.84659 15.0467 5.68184 15.0467 5.51005C15.0467 5.33825 14.9784 5.1735 14.8569 5.05202C14.7355 4.93055 14.5707 4.8623 14.3989 4.8623H5.97828C5.80649 4.8623 5.64174 4.93055 5.52026 5.05202C5.39879 5.1735 5.33054 5.33825 5.33054 5.51005Z"
                    fill="#EDA133"
                  />
                </svg>
              </a>
            </div>
          </div>

          <div className="bg-[#313B4D] w-full h-full flex items-start justify-start gap-[16px] md:gap-[35px] rounded-lg p-8 border border-gray-700 hover:border-[#EDA133] transition-all duration-300 hover:transform hover:-translate-y-2">
            <div className="self-start w-16 h-16 mt-[7px]">
              <img src="/service-icon.svg" alt="service icon" />
            </div>
            <div className="flex flex-col gap-[10px] w-full md:w-[240px]">
              <h3 className="text-[16px] md:text-[21.5px] font-bold text-white ">
                تطوير مواقع الويب و المتاجر الالكترونية
              </h3>
              <p className="text-gray-300 text-[12px] md:text-[14px]">
                نصمم ونطور مواقع إلكترونية احترافية، سريعة، وآمنة تعكس هوية علامتك التجارية.
              </p>
              <a
                href="service-details.html"
                className="flex items-center gap-2 text-[#EDA133] text-[14px] md:text-[15px]"
              >
                تفاصيل الخدمة
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M5.33054 5.51005V13.9307C5.33054 14.1025 5.39879 14.2672 5.52026 14.3887C5.64174 14.5102 5.80649 14.5784 5.97828 14.5784C6.15008 14.5784 6.31483 14.5102 6.43631 14.3887C6.55778 14.2672 6.62603 14.1025 6.62603 13.9307V7.07353L15.8839 16.3322C16.0054 16.4537 16.1702 16.522 16.3421 16.522C16.514 16.522 16.6789 16.4537 16.8004 16.3322C16.922 16.2106 16.9902 16.0458 16.9902 15.8739C16.9902 15.702 16.922 15.5372 16.8004 15.4156L7.54177 6.15779H14.3989C14.5707 6.15779 14.7355 6.08954 14.8569 5.96807C14.9784 5.84659 15.0467 5.68184 15.0467 5.51005C15.0467 5.33825 14.9784 5.1735 14.8569 5.05202C14.7355 4.93055 14.5707 4.8623 14.3989 4.8623H5.97828C5.80649 4.8623 5.64174 4.93055 5.52026 5.05202C5.39879 5.1735 5.33054 5.33825 5.33054 5.51005Z"
                    fill="#EDA133"
                  />
                </svg>
              </a>
            </div>
          </div> */}
        </div>

        <div className="flex items-center justify-center mt-[48px]">
          <Link
            href="/services"
            className="bg-[#EDA133] flex items-center justify-center gap-4 hover:bg-[#D1912A] w-[229px] h-[56px] text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 "
          >
            <span className="text-[16px] font-medium">كل الخدمات</span>
            <svg width="11" height="12" viewBox="0 0 11 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M7.27637 0.637695C7.59612 0.637695 7.86133 0.914793 7.86133 1.24902C7.86677 1.41589 7.79496 1.57124 7.69043 1.68066C7.58568 1.79015 7.44175 1.85938 7.27637 1.85938H2.15918L10.5186 10.5967C10.7443 10.8329 10.7442 11.2247 10.5186 11.4609C10.2925 11.6972 9.91744 11.6971 9.69141 11.4609L1.16797 2.55078V8.24414C1.16797 8.57837 0.903733 8.85547 0.583984 8.85547C0.264241 8.85546 0 8.57837 0 8.24414V1.24902C0 0.914796 0.264241 0.637701 0.583984 0.637695H7.27637Z"
                fill="#FCF4E9"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
