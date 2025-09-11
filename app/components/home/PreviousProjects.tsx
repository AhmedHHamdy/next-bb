'use client';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules"; 

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export default function PreviousProjects({ dataInfo }: {
  dataInfo: {
    title: string;
    desc: string;
    projects: {
      id: number;
      title: string;
      short_description: string;
      owner_name: string;
      slug: string
      meta_tags: string
      country_name: string;
      image_url: string;
    }[]
  }
}) {

  const t = useTranslations("HomePage");

  return (
    <section className="relative bg-[#131A27] py-[48px] md:py-[70px] md:h-[1123px] overflow-hidden">
      <div className="absolute inset-0 z-[1]">
        <img src="/project-background.svg" alt="background art" />
      </div>

      <div className="relative z-20 previous-projects-container">
        <div className="text-center mb-[36px] md:mb-[49px]">
          <h2 className="text-[24px] md:text-[40px] font-bold text-white mb-[12px] ">{dataInfo?.title}</h2>
          <p className="text-gray-300 text-[14px] md:text-[18px] max-w-[540px] mx-auto ">
            {dataInfo?.desc}
          </p>
        </div>

        <Swiper
          className="h-[312px] md:h-[707px] md:w-full"
          spaceBetween={48}
          slidesPerView={1}
          loop
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          
          direction="horizontal"
          centeredSlides
          modules={[Navigation, Autoplay]}
          navigation={{
            nextEl: ".swiper-3-button-next-1",
            prevEl: ".swiper-3-button-prev-1",
          }}
          breakpoints={{
            320: {
              spaceBetween: 16,
              slidesPerView: 1.2,
            },
            768: {
              spaceBetween: 40,
              slidesPerView: 1.2,
            },
            1024: {
              spaceBetween: 20,
              slidesPerView: 1.1,
            },
            1280: {
              spaceBetween: 20,
              slidesPerView: 1.07,
            },
            1440: {
              spaceBetween: 20,
              slidesPerView: 1.2,
            },
            1536: {
              spaceBetween: 48,
              slidesPerView: 1.35,
            },
            1920: {
              spaceBetween: 48,
              slidesPerView: 1.68,
            },
          }}
        >
          {dataInfo?.projects && dataInfo?.projects?.map(project => {
            return (
              <SwiperSlide
                key={project?.id}
                style={{ backgroundImage: `url(${project?.image_url})` }}
                className="swiper-slide h-[312px] md:h-[707px] bg-no-repeat bg-cover bg-bottom rounded-lg p-8 px-4 md:px-8 border border-gray-700 hover:border-[#EDA133] inset-shadow-lg"
              >
                <div className="h-[270px] w-[235px] md:w-full md:h-[650px] flex flex-col items-start justify-end project-card">
                  <section className="w-full">
                    <h3 className="text-[16px] md:text-[40px] font-medium text-white">{project?.title}</h3>
                    <section className="mt-[12px] md:mt-[14px] flex flex-col gap-[8px] lg:flex-row lg:items-center lg:justify-between w-full">
                      <section className="flex items-center gap-[13px]">
                        {/* <h4 className="flex justify-center items-center gap-[8px] px-2 md:px-0 md:w-[111px] h-[28px] md:h-[40px] bg-[#FFFFFF33] bg-gradient-to-r from-black/5 to-black/20 rounded-[8px] text-[12px] md:text-[16px] text-white">
                          <img className="h-[14.5px] md:h-[23px]" src="/person-icon.svg" alt="person icon" />
                          {project?.title}
                        </h4> */}

                        <h4 className="flex justify-center  items-center gap-[8px] px-2 md:px-5  w-[150px] md:w-[250px] h-[28px] md:h-[40px] bg-[#FFFFFF33] backdrop-blur-md rounded-[8px] text-[12px] md:text-[16px] text-white">
                          <img className="h-[14.5px] md:h-[23px]" src="/person-icon.svg" alt="person icon" />
                          {project?.owner_name}
                        </h4>

                        {/* <h4 className="flex justify-center items-center gap-[8px] px-2 md:px-0 md:w-[235.5px] h-[28px] md:h-[40px] bg-[#FFFFFF33] bg-gradient-to-r from-black/5 to-black/20 rounded-[8px] text-[12px] md:text-[16px] text-white">
                          <img className="h-[14.5px] md:h-[23px]" src="/location-icon.svg" alt="location icon" />
                          {project?.country_name}
                        </h4> */}

                        <h4 className="flex justify-center items-center gap-[8px] px-2 md:px-0 w-full  h-[28px] md:h-[40px] bg-[#FFFFFF33] backdrop-blur-md rounded-[8px] text-[12px] md:text-[16px] text-white">
                          <img className="h-[14.5px] md:h-[23px]" src="/location-icon.svg" alt="location icon" />
                          {project?.country_name}
                        </h4>
                      </section>

                      {/* <section className="flex items-center gap-[13px]">
                        <h4 className="flex justify-center items-center gap-[8px] px-2 md:px-0 md:w-[117px] h-[28px] md:h-[40px] bg-[#FFFFFF33] bg-gradient-to-r from-black/5 to-black/20 rounded-[8px] text-[12px] md:text-[16px] text-white">
                          تطوير الويب
                        </h4>

                        <h4 className="flex justify-center items-center gap-[8px] px-2 md:px-0 md:w-[111px] h-[28px] md:h-[40px] bg-[#FFFFFF33] bg-gradient-to-r from-black/5 to-black/20 rounded-[8px] text-[12px] md:text-[16px] text-white">
                          تصميم الويب
                        </h4>
                      </section> */}
                    </section>
                    <p className="hidden md:block mt-[18px] text-white text-[16px]">
                      {project?.short_description}
                    </p>
                    <p className="block md:hidden mt-[12px] text-white text-[12px]">
                      {project?.short_description}
                    </p>
                  </section>

                  <div className="mt-[16px] see-more-button">
                    <Link
                      href={`/projects/${project?.id}/${project?.slug}`}
                      className="bg-[#EDA133] flex items-center justify-center gap-2 hover:bg-[#D1912A] w-full md:w-[229px] h-[28px] md:h-[56px] text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 "
                    >
                      <span className="text-[14px] md:text-[16px] font-medium">{t("seeMore")}</span>
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
              </SwiperSlide>
            )
          })}
        </Swiper>
      </div>

      <section className="flex flex-col md:flex-row justify-between items-center max-w-[1225px] gap-[22px] md:gap-0 mx-auto mt-[32px] md:mt-[48px] px-[15px] 2xl:px-0 relative z-[50]">
        <section className="hidden md:flex items-center gap-[16px] rtl:flex ltr:hidden">
          <div className="swiper-3-button-prev-1 border border-[white] rounded-[8px] p-[19px] cursor-pointer">
            <svg width="13" height="17" viewBox="0 0 13 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M0.163943 14.7891C0.163943 16.4431 2.23594 17.1881 3.33194 15.9491C5.63173 13.3555 8.52365 11.3556 11.7619 10.1191C13.2719 9.54707 13.2889 7.39707 11.7739 6.84207C8.5161 5.64015 5.60485 3.65352 3.29794 1.05807C2.21394 -0.161932 0.163943 0.570067 0.163943 2.20307V14.7891Z"
                fill="white"
              />
            </svg>
          </div>
          <div className="swiper-3-button-next-1 border border-[white] rounded-[8px] p-[19px] cursor-pointer">
            <svg width="13" height="17" viewBox="0 0 13 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12.8361 2.27538C12.8361 0.621384 10.7641 -0.123616 9.66806 1.11538C7.36826 3.70891 4.47635 5.7089 1.23806 6.94538C-0.271943 7.51739 -0.288943 9.66739 1.22606 10.2224C4.4839 11.4243 7.39515 13.4109 9.70206 16.0064C10.7861 17.2264 12.8361 16.4944 12.8361 14.8614L12.8361 2.27538Z"
                fill="white"
              />
            </svg>
          </div>
        </section>

        <section className="hidden md:flex items-center gap-[16px] rtl:hidden ltr:flex">
          <div className="swiper-3-button-prev-1 border border-[white] rounded-[8px] p-[19px] cursor-pointer">
            <svg width="13" height="17" viewBox="0 0 13 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12.8361 2.27538C12.8361 0.621384 10.7641 -0.123616 9.66806 1.11538C7.36826 3.70891 4.47635 5.7089 1.23806 6.94538C-0.271943 7.51739 -0.288943 9.66739 1.22606 10.2224C4.4839 11.4243 7.39515 13.4109 9.70206 16.0064C10.7861 17.2264 12.8361 16.4944 12.8361 14.8614L12.8361 2.27538Z"
                fill="white"
              />
            </svg>
          </div>
          <div className="swiper-3-button-next-1 border border-[white] rounded-[8px] p-[19px] cursor-pointer">
            <svg width="13" height="17" viewBox="0 0 13 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M0.163943 14.7891C0.163943 16.4431 2.23594 17.1881 3.33194 15.9491C5.63173 13.3555 8.52365 11.3556 11.7619 10.1191C13.2719 9.54707 13.2889 7.39707 11.7739 6.84207C8.5161 5.64015 5.60485 3.65352 3.29794 1.05807C2.21394 -0.161932 0.163943 0.570067 0.163943 2.20307V14.7891Z"
                fill="white"
              />
            </svg>
          </div>
        </section>

        <div className="flex items-center justify-center w-full md:w-[229px] relative z-[50]">
          <Link
            href="/projects"
            className="bg-[#EDA133] flex items-center justify-center gap-2 hover:bg-[#D1912A] w-full md:w-[229px] h-[56px] text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 "
          >
            <span className="text-[16px] font-medium">{t("allProjects")}</span>
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
      </section>
    </section>
  );
}
