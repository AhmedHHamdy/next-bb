'use client';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { useTranslations } from "next-intl";

export default function ServicesMarquee() {
  const t = useTranslations("AboutUsMarquee");


  return (
    <Swiper
      spaceBetween={78}
      slidesPerView={8}
      loop
      modules={[Autoplay]}
      autoplay={{
        delay: 2000,
        disableOnInteraction: false,
      }}
      direction="horizontal"
      breakpoints={{
        320: {
          spaceBetween: 20,
          slidesPerView: 5,
        },

        768: {
          spaceBetween: 78,
          slidesPerView: 7,
        },
        1024: {
          spaceBetween: 78,
          slidesPerView: 7,
        },
        1279: {
          spaceBetween: 10,
          slidesPerView: 13,
        },
      }}
    >
      {/* <!-- Slides --> */}
      <SwiperSlide className="swiper-slide">
        <h4 className="text-white font-medium text-[14px] md:text-[18px] w-[80px] md:w-full">{t("digitalMarketing")}</h4>
      </SwiperSlide>
      <SwiperSlide className="swiper-slide ">
        <img
          src="/BB.svg"
          alt="business building bb logo"
          className="h-[18px] md:h-[20px] w-[80px] md:w-[105px] rotate-5 mt-3 2xl:mt-0  "
        />
      </SwiperSlide>
      <SwiperSlide className="swiper-slide">
        <h4 className="text-white font-medium text-[14px] md:text-[18px] w-[80px] md:w-full">{t("softwareSolutions")}</h4>
      </SwiperSlide>
      <SwiperSlide className="swiper-slide ">
        <img
          src="/BB.svg"
          alt="business building bb logo"
          className="h-[18px] md:h-[20px] w-[80px] md:w-[105px] rotate-5 mt-3 2xl:mt-0  "
        />
      </SwiperSlide>
      <SwiperSlide className="swiper-slide">
        <h4 className="text-white font-medium text-[14px] md:text-[18px] w-[80px] md:w-full">{t("customerService")}</h4>
      </SwiperSlide>
      <SwiperSlide className="swiper-slide ">
        <img
          src="/BB.svg"
          alt="business building bb logo"
          className="h-[18px] md:h-[20px] w-[80px] md:w-[105px] rotate-5 mt-3 2xl:mt-0  "
        />
      </SwiperSlide>
      <SwiperSlide className="swiper-slide">
        <h4 className="text-white font-medium text-[14px] md:text-[18px] w-[80px] md:w-full">{t("digitalMarketing")}</h4>
      </SwiperSlide>
      <SwiperSlide className="swiper-slide ">
        <img
          src="/BB.svg"
          alt="business building bb logo"
          className="h-[18px] md:h-[20px] w-[80px] md:w-[105px] rotate-5 mt-3 2xl:mt-0  "
        />
      </SwiperSlide>
      <SwiperSlide className="swiper-slide">
        <h4 className="text-white font-medium text-[14px] md:text-[18px] w-[80px] md:w-full">{t("softwareSolutions")}</h4>
      </SwiperSlide>
      <SwiperSlide className="swiper-slide ">
        <img
          src="/BB.svg"
          alt="business building bb logo"
          className="h-[18px] md:h-[20px] w-[80px] md:w-[105px] rotate-5 mt-3 2xl:mt-0  "
        />
      </SwiperSlide>
      <SwiperSlide className="swiper-slide">
        <h4 className="text-white font-medium text-[14px] md:text-[18px] w-[80px] md:w-full">{t("digitalMarketing")}</h4>
      </SwiperSlide>
      <SwiperSlide className="swiper-slide ">
        <img
          src="/BB.svg"
          alt="business building bb logo"
          className="h-[18px] md:h-[20px] w-[80px] md:w-[105px] rotate-5 mt-3 2xl:mt-0  "
        />
      </SwiperSlide>
      <SwiperSlide className="swiper-slide">
        <h4 className="text-white font-medium text-[14px] md:text-[18px] w-[80px] md:w-full">{t("softwareSolutions")}</h4>
      </SwiperSlide>
      <SwiperSlide className="swiper-slide ">
        <img
          src="/BB.svg"
          alt="business building bb logo"
          className="h-[18px] md:h-[20px] w-[80px] md:w-[105px] rotate-5 mt-3 2xl:mt-0  "
        />
      </SwiperSlide>
      <SwiperSlide className="swiper-slide">
        <h4 className="text-white font-medium text-[14px] md:text-[18px] w-[80px] md:w-full">{t("customerService")}</h4>
      </SwiperSlide>
      <SwiperSlide className="swiper-slide ">
        <img
          src="/BB.svg"
          alt="business building bb logo"
          className="h-[18px] md:h-[20px] w-[80px] md:w-[105px] rotate-5 mt-3 2xl:mt-0  "
        />
      </SwiperSlide>
      <SwiperSlide className="swiper-slide">
        <h4 className="text-white font-medium text-[14px] md:text-[18px] w-[80px] md:w-full">{t("digitalMarketing")}</h4>
      </SwiperSlide>
      <SwiperSlide className="swiper-slide ">
        <img
          src="/BB.svg"
          alt="business building bb logo"
          className="h-[18px] md:h-[20px] w-[80px] md:w-[105px] rotate-5 mt-3 2xl:mt-0  "
        />
      </SwiperSlide>
      <SwiperSlide className="swiper-slide">
        <h4 className="text-white font-medium text-[14px] md:text-[18px] w-[80px] md:w-full">{t("softwareSolutions")}</h4>
      </SwiperSlide>
      <SwiperSlide className="swiper-slide ">
        <img
          src="/BB.svg"
          alt="business building bb logo"
          className="h-[18px] md:h-[20px] w-[80px] md:w-[105px] rotate-5 mt-3 2xl:mt-0  "
        />
      </SwiperSlide>
    </Swiper>
  );
}
