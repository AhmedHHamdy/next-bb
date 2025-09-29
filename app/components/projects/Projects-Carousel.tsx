'use client';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { ProjectTypeData } from "@/app/utils/Types";
import { Link } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";

export default function ProjectsCarousel({ previousProjectsData }: { previousProjectsData: ProjectTypeData[]}) {

  const locale = useLocale();

  const t = useTranslations("ProjectDetails");

  return (
    <div className="max-w-[1400px] mx-auto">
      <div className="mb-[20px] md:mb-[30.5px] flex items-center justify-between">
        <h3 className="text-[24px] md:text-[32px]">{t("popularProjects")}</h3>

        <section className="hidden md:flex items-center gap-[13px] md:gap-[16px]">
          <div className="previous-Projects-button-prev-1 border border-[#131A27] p-[19px] rounded-[8px] cursor-pointer">
            <svg className="rtl:block ltr:hidden" width="13" height="17" viewBox="0 0 13 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M0.163943 14.6553C0.163943 16.3093 2.23594 17.0543 3.33194 15.8153C5.63173 13.2218 8.52365 11.2218 11.7619 9.98528C13.2719 9.41328 13.2889 7.26328 11.7739 6.70828C8.5161 5.50636 5.60485 3.51973 3.29794 0.924279C2.21394 -0.295721 0.163943 0.436278 0.163943 2.06928V14.6553Z"
                fill="#131A27"
              />
            </svg>

            <svg className="rtl:hidden ltr:block" width="13" height="17" viewBox="0 0 13 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12.8361 2.14159C12.8361 0.487594 10.7641 -0.257405 9.66806 0.981595C7.36826 3.57512 4.47635 5.57511 1.23806 6.8116C-0.271943 7.3836 -0.288943 9.5336 1.22606 10.0886C4.4839 11.2905 7.39515 13.2771 9.70206 15.8726C10.7861 17.0926 12.8361 16.3606 12.8361 14.7276L12.8361 2.14159Z"
                fill="#131A27"
              />
            </svg>
          </div>
          <div className="previous-Projects-button-next-1 border border-[#131A27] p-[19px] rounded-[8px] cursor-pointer">
            <svg className="rtl:block ltr:hidden" width="13" height="17" viewBox="0 0 13 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12.8361 2.14159C12.8361 0.487594 10.7641 -0.257405 9.66806 0.981595C7.36826 3.57512 4.47635 5.57511 1.23806 6.8116C-0.271943 7.3836 -0.288943 9.5336 1.22606 10.0886C4.4839 11.2905 7.39515 13.2771 9.70206 15.8726C10.7861 17.0926 12.8361 16.3606 12.8361 14.7276L12.8361 2.14159Z"
                fill="#131A27"
              />
            </svg>

            <svg className="rtl:hidden ltr:block" width="13" height="17" viewBox="0 0 13 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0.163943 14.6553C0.163943 16.3093 2.23594 17.0543 3.33194 15.8153C5.63173 13.2218 8.52365 11.2218 11.7619 9.98528C13.2719 9.41328 13.2889 7.26328 11.7739 6.70828C8.5161 5.50636 5.60485 3.51973 3.29794 0.924279C2.21394 -0.295721 0.163943 0.436278 0.163943 2.06928V14.6553Z"
              fill="#131A27"
            />
          </svg>
          </div>
        </section>
      </div>

      {/* <!-- Content --> */}
      <Swiper
        spaceBetween={32}
        slidesPerView={2}
        loop
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        direction="horizontal"
        modules={[Navigation, Autoplay]}
        navigation={{
          nextEl: ".previous-Projects-button-next-1",
          prevEl: ".previous-Projects-button-prev-1",
        }}
        breakpoints={{
          320: {
            spaceBetween: 50,
            slidesPerView: 1,
          },

          768: {
            spaceBetween: 32,
            slidesPerView: 1,
          },
          1024: {
            spaceBetween: 32,
            slidesPerView: 2,
          },
          1279: {
            spaceBetween: 32,
            slidesPerView: 2,
          },
        }}
      >
        {previousProjectsData && previousProjectsData?.map(project => {
          return (
            <SwiperSlide key={project?.id} className="swiper-slide">
              <div
                style={{ backgroundImage: `url(${project?.image?.url})` }}
                className="h-[312px] md:h-[426px] bg-no-repeat bg-cover bg-bottom rounded-lg p-8 px-4 md:px-8 inset-project-grid-item-shadow"
              >
                <div className="h-[270px]  md:w-full md:h-[374px] flex flex-col items-start justify-end project-card">
                    <section className="w-full">
                      <h3 className="text-[16px] md:text-[24px] font-medium text-white">{project?.title}</h3>
                      <section className="mt-[12px] md:mt-[14px] flex flex-col gap-[8px] md:flex-row md:items-center md:justify-between w-full">
                        <section className="flex items-center w-[265px] md:w-[400px] gap-[13px]">
                          {/* md:w-[111px] md:px-0 w-full */}
                          <h4 className="flex justify-center  items-center gap-[8px] px-2 md:px-5 w-[150px] md:w-[250px] h-[28px] md:h-[40px] bg-[#FFFFFF33] backdrop-blur-md rounded-[8px] text-[12px] md:text-[16px] text-white">
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
               
                      <section className='w-full'>
                        <p dangerouslySetInnerHTML={{__html: project?.short_description }} className="hidden md:block mt-[18px] text-white text-[16px]">
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
                        <span className="text-[14px] md:text-[16px] font-normal">{t("seeMore")}</span>
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
              </div>
            </SwiperSlide>
          )
        })}
      </Swiper>

      <section className="flex justify-center items-center md:hidden mt-[20px] gap-[13px] md:gap-[16px]">
        <div className="previous-Projects-button-prev-1 border border-[#131A27] p-[19px] rounded-[8px] cursor-pointer">
          <svg className="rtl:block ltr:hidden" width="13" height="17" viewBox="0 0 13 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0.163943 14.6553C0.163943 16.3093 2.23594 17.0543 3.33194 15.8153C5.63173 13.2218 8.52365 11.2218 11.7619 9.98528C13.2719 9.41328 13.2889 7.26328 11.7739 6.70828C8.5161 5.50636 5.60485 3.51973 3.29794 0.924279C2.21394 -0.295721 0.163943 0.436278 0.163943 2.06928V14.6553Z"
              fill="#131A27"
            />
          </svg>

          <svg className="rtl:hidden ltr:block" width="13" height="17" viewBox="0 0 13 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12.8361 2.14159C12.8361 0.487594 10.7641 -0.257405 9.66806 0.981595C7.36826 3.57512 4.47635 5.57511 1.23806 6.8116C-0.271943 7.3836 -0.288943 9.5336 1.22606 10.0886C4.4839 11.2905 7.39515 13.2771 9.70206 15.8726C10.7861 17.0926 12.8361 16.3606 12.8361 14.7276L12.8361 2.14159Z"
              fill="#131A27"
            />
          </svg>
        </div>
        <div className="previous-Projects-button-next-1 border border-[#131A27] p-[19px] rounded-[8px] cursor-pointer">
          <svg className="rtl:block ltr:hidden" width="13" height="17" viewBox="0 0 13 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12.8361 2.14159C12.8361 0.487594 10.7641 -0.257405 9.66806 0.981595C7.36826 3.57512 4.47635 5.57511 1.23806 6.8116C-0.271943 7.3836 -0.288943 9.5336 1.22606 10.0886C4.4839 11.2905 7.39515 13.2771 9.70206 15.8726C10.7861 17.0926 12.8361 16.3606 12.8361 14.7276L12.8361 2.14159Z"
              fill="#131A27"
            />
          </svg>

          <svg className="rtl:hidden ltr:block" width="13" height="17" viewBox="0 0 13 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0.163943 14.6553C0.163943 16.3093 2.23594 17.0543 3.33194 15.8153C5.63173 13.2218 8.52365 11.2218 11.7619 9.98528C13.2719 9.41328 13.2889 7.26328 11.7739 6.70828C8.5161 5.50636 5.60485 3.51973 3.29794 0.924279C2.21394 -0.295721 0.163943 0.436278 0.163943 2.06928V14.6553Z"
              fill="#131A27"
            />
          </svg>
        </div>
      </section>
    </div>
  );
}
