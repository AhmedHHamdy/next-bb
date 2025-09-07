'use client';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Benefit } from "@/app/utils/Types";

export default function BenefitsCarousel( { benefits }: { benefits?: {
  title: string;
  desc: string;
  benefits: Benefit[];
}}) {
  return (
    <>
      <Swiper
        spaceBetween={32}
        slidesPerView={3}
        loop
        direction="horizontal"
        modules={[Navigation]}
        navigation={{
          nextEl: ".benefits-button-next-1",
          prevEl: ".benefits-button-prev-1",
        }}
        breakpoints={{
          320: {
            spaceBetween: 24,
            slidesPerView: 1.25,
          },

          768: {
            spaceBetween: 32,
            slidesPerView: 2,
          },
          1024: {
            spaceBetween: 25,
            slidesPerView: 3,
          },
          1279: {
            spaceBetween: 32,
            slidesPerView: 3,
          },
        }}
      >
        {/* <!-- Slides --> */}
        <SwiperSlide className="swiper-slide">
          <div className="bg-[#EDA133] rounded-lg p-[24px] px-[13px] flex flex-col justify-between items-center w-full min-h-[509px] lg:col-span-1">
            <div className="flex flex-col gap-[19px] items-center w-full h-full">
              <h2 className="text-[29px] font-bold text-white leading-[1.2]  w-full">{benefits?.title}</h2>

              {/* <!-- Decorative Pattern --> */}
              <div className="flex flex-col gap-[6px] opacity-20">
                {/* <!-- Pattern rows - simplified version --> */}
                <img className="w-[280px]" src="/career-business-building-logo.svg" alt="business building logo" />
                <img className="w-[280px]" src="/career-business-building-logo.svg" alt="business building logo" />
                <img className="w-[280px]" src="/career-business-building-logo.svg" alt="business building logo" />
                <img className="w-[280px]" src="/career-business-building-logo.svg" alt="business building logo" />

                <img className="w-[280px]" src="/career-business-building-logo.svg" alt="business building logo" />
                <img className="w-[280px]" src="/career-business-building-logo.svg" alt="business building logo" />
                <img className="w-[280px]" src="/career-business-building-logo.svg" alt="business building logo" />
                <img className="w-[280px]" src="/career-business-building-logo.svg" alt="business building logo" />

                <img className="w-[280px]" src="/career-business-building-logo.svg" alt="business building logo" />
                <img className="w-[280px]" src="/career-business-building-logo.svg" alt="business building logo" />
                <img className="w-[280px]" src="/career-business-building-logo.svg" alt="business building logo" />
                <img className="w-[280px]" src="/career-business-building-logo.svg" alt="business building logo" />
              </div>

              {/* <!-- Bottom Content --> */}
              <div className="flex flex-col gap-[20px] w-full">
                <p className="text-[13px] font-medium text-white leading-[1.5]  w-full">
                 {benefits?.desc}
                </p>
                <button className="flex justify-center items-center gap-[10px] px-6 py-[14px] w-full h-[56px] border border-[#FCF4E9] rounded-lg hover:bg-[#FCF4E9] text-white hover:text-[#EDA133] transition-colors">
                  <span className="text-[13px] font-medium">عرض جميع المزايا</span>
                </button>
              </div>
            </div>
          </div>
        </SwiperSlide>
        {
          benefits?.benefits?.map(benefit => {
            return (
              <SwiperSlide key={benefit.id} className="swiper-slide">
                <div className="flex flex-col justify-between items-end gap-12 w-full lg:w-[333px] bg-[#EAEAEA] rounded-lg p-[18px] min-h-[509px] py-[25px]">
                  <div className="flex flex-col justify-between items-end gap-[29.6px] w-full h-full">
                    <h3 className="text-[14px] font-extrabold text-black leading-[1.6] w-full">
                      {benefit.title}
                    </h3>
                    <div
                      className="w-full h-[202px] bg-black bg-opacity-30 rounded-[6px] relative overflow-hidden"
                      style={{
                        backgroundImage: `url(${benefit.image_url})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    ></div>
                    <p className="text-[14px] font-medium text-black leading-[1.43]  w-full h-[110px]">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            )
          })
        }

        {/* <SwiperSlide className="swiper-slide">
          <div className="flex flex-col justify-between items-end gap-12 w-full lg:w-[333px] bg-[#EAEAEA] rounded-lg p-[18px] min-h-[509px] py-[25px]">
            <div className="flex flex-col justify-between items-end gap-[29.6px] w-full h-full">
              <h3 className="text-[14px] font-extrabold text-black leading-[1.6]  w-full">
                دخول غير محدود مجاني إلى صالة رياضية احترافية في الموقع
              </h3>
              <div
                className="w-full h-[202px] bg-black bg-opacity-30 rounded-[6px] relative overflow-hidden"
                style={{
                  backgroundImage: "url('/gym-access-bg.png')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>
              <p className="text-[14px] font-medium text-black leading-[1.43]  w-full h-[110px]">
                حافظ على لياقتك البدنية وقدرتك على التحمل، أوحتى ابدأ العمل عليها عند انضمامكإلى Ucraft. نحن نقدم دخولًا
                غير محدود مجانيًا إلىصالة رياضية في الموقع مع مجموعة واسعة من <br /> معدات التمارين وفرصة التدريب مع
                مدرب.
              </p>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide className="swiper-slide">
          <div className="flex flex-col justify-between items-end gap-12 w-full lg:w-[333px] bg-[#EAEAEA] rounded-lg p-[18px] min-h-[509px] py-[25px]">
            <div className="flex flex-col justify-between items-end gap-[29.6px] w-full h-full">
              <h3 className="text-[14px] font-extrabold text-black leading-[1.6]  w-full">
                تأمين طبي مجاني للحفاظ على الصحة والقوة
              </h3>
              <div
                className="w-full h-[202px] bg-black bg-opacity-30 rounded-[6px] relative overflow-hidden brightness-80"
                style={{
                  backgroundImage: "url('/medical-insurance-bg.png')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>
              <p className="text-[14px] font-medium text-black leading-[1.43]  w-full h-[110px]">
                لقد تعاوننا مع العديد من شركات التأمين الصحي لتوفير <br /> جميع المساعدات الطبية التي يحتاجها الموظفون.
                ما عليك سوى الاتصال بالرقم الموجود على البطاقة، وطلب زيارة طبيب معين، <br /> وسيتولى شركة التأمين
                الباقي.
              </p>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide className="swiper-slide">
          <div className="flex flex-col justify-between items-end gap-12 w-full lg:w-[333px] bg-[#EAEAEA] rounded-lg p-[18px] min-h-[509px] py-[25px]">
            <div className="flex flex-col justify-between items-end gap-[29.6px] w-full h-full">
              <h3 className="text-[14px] font-extrabold text-black leading-[1.6]  w-full">
                20 يوم إجازة سنوية لمساعدتك على الاسترخاء وإعادة شحن طاقتك
              </h3>
              <div
                className="w-full h-[202px] bg-black bg-opacity-30 rounded-[6px] relative overflow-hidden brightness-80"
                style={{
                  backgroundImage: "url('/annual-leave-bg.png')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>
              <p className="text-[14px] font-medium text-black leading-[1.43]  w-full h-[110px]">
                تقدم بناء الاعمال للموظفين إجمالي <br /> 20 يوم عمل من الإجازة السنوية <br /> - لا تشمل عطلات نهاية
                الأسبوع! خذ بعض الاستراحات على مدار السنة للاسترخاء وإعادة شحن طاقتك، وعُد وأنت تشعر بالانتعاش
                والاستعداد للعمل.
              </p>
            </div>
          </div>
        </SwiperSlide> */}

        <section className="flex justify-center items-center md:hidden mt-[32px] gap-[13px] md:gap-[16px]">
          <div className="benefits-button-prev-1 border border-[#131A27] p-[19px] rounded-[8px] cursor-pointer">
            <svg width="13" height="17" viewBox="0 0 13 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M0.163943 14.6553C0.163943 16.3093 2.23594 17.0543 3.33194 15.8153C5.63173 13.2218 8.52365 11.2218 11.7619 9.98528C13.2719 9.41328 13.2889 7.26328 11.7739 6.70828C8.5161 5.50636 5.60485 3.51973 3.29794 0.924279C2.21394 -0.295721 0.163943 0.436278 0.163943 2.06928V14.6553Z"
                fill="#131A27"
              />
            </svg>
          </div>
          <div className="benefits-button-next-1 border border-[#131A27] p-[19px] rounded-[8px] cursor-pointer">
            <svg width="13" height="17" viewBox="0 0 13 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12.8361 2.14159C12.8361 0.487594 10.7641 -0.257405 9.66806 0.981595C7.36826 3.57512 4.47635 5.57511 1.23806 6.8116C-0.271943 7.3836 -0.288943 9.5336 1.22606 10.0886C4.4839 11.2905 7.39515 13.2771 9.70206 15.8726C10.7861 17.0926 12.8361 16.3606 12.8361 14.7276L12.8361 2.14159Z"
                fill="#131A27"
              />
            </svg>
          </div>
        </section>
      </Swiper>
    </>
  );
}
