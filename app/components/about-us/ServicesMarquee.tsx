'use client';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export default function ServicesMarquee() {
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
        <h4 className="text-white font-medium text-[14px] md:text-[18px] w-[80px] md:w-[165px]">تسويق رقمي</h4>
      </SwiperSlide>
      <SwiperSlide className="swiper-slide">
        <img
          src="/BB.svg"
          alt="business building bb logo"
          className="h-[18px] md:h-[20px] w-[80px] md:w-[105px] mt-1 rotate-5"
        />
      </SwiperSlide>
      <SwiperSlide className="swiper-slide">
        <h4 className="text-white font-medium text-[14px] md:text-[18px] w-[80px] md:w-[165px]">حلول برمجية</h4>
      </SwiperSlide>
      <SwiperSlide className="swiper-slide">
        <img
          src="/BB.svg"
          alt="business building bb logo"
          className="h-[18px] md:h-[20px] w-[80px] md:w-[105px] mt-1 rotate-5"
        />
      </SwiperSlide>
      <SwiperSlide className="swiper-slide">
        <h4 className="text-white font-medium text-[14px] md:text-[18px] w-[80px] md:w-[165px]">خدمة عملاء</h4>
      </SwiperSlide>
      <SwiperSlide className="swiper-slide">
        <img
          src="/BB.svg"
          alt="business building bb logo"
          className="h-[18px] md:h-[20px] w-[80px] md:w-[105px] mt-1 rotate-5"
        />
      </SwiperSlide>
      <SwiperSlide className="swiper-slide">
        <h4 className="text-white font-medium text-[14px] md:text-[18px] w-[80px] md:w-[165px]">تسويق رقمي</h4>
      </SwiperSlide>
      <SwiperSlide className="swiper-slide">
        <img
          src="/BB.svg"
          alt="business building bb logo"
          className="h-[18px] md:h-[20px] w-[80px] md:w-[105px] mt-1 rotate-5"
        />
      </SwiperSlide>
      <SwiperSlide className="swiper-slide">
        <h4 className="text-white font-medium text-[14px] md:text-[18px] w-[80px] md:w-[165px]">حلول برمجية</h4>
      </SwiperSlide>
      <SwiperSlide className="swiper-slide">
        <img
          src="/BB.svg"
          alt="business building bb logo"
          className="h-[18px] md:h-[20px] w-[80px] md:w-[105px] mt-1 rotate-5"
        />
      </SwiperSlide>
      <SwiperSlide className="swiper-slide">
        <h4 className="text-white font-medium text-[14px] md:text-[18px] w-[80px] md:w-[165px]">تسويق رقمي</h4>
      </SwiperSlide>
      <SwiperSlide className="swiper-slide">
        <img
          src="/BB.svg"
          alt="business building bb logo"
          className="h-[18px] md:h-[20px] w-[80px] md:w-[105px] mt-1 rotate-5"
        />
      </SwiperSlide>
      <SwiperSlide className="swiper-slide">
        <h4 className="text-white font-medium text-[14px] md:text-[18px] w-[80px] md:w-[165px]">حلول برمجية</h4>
      </SwiperSlide>
      <SwiperSlide className="swiper-slide">
        <img
          src="/BB.svg"
          alt="business building bb logo"
          className="h-[18px] md:h-[20px] w-[80px] md:w-[105px] mt-1 rotate-5"
        />
      </SwiperSlide>
      <SwiperSlide className="swiper-slide">
        <h4 className="text-white font-medium text-[14px] md:text-[18px] w-[80px] md:w-[165px]">خدمة عملاء</h4>
      </SwiperSlide>
      <SwiperSlide className="swiper-slide">
        <img
          src="/BB.svg"
          alt="business building bb logo"
          className="h-[18px] md:h-[20px] w-[80px] md:w-[105px] mt-1 rotate-5"
        />
      </SwiperSlide>
      <SwiperSlide className="swiper-slide">
        <h4 className="text-white font-medium text-[14px] md:text-[18px] w-[80px] md:w-[165px]">تسويق رقمي</h4>
      </SwiperSlide>
      <SwiperSlide className="swiper-slide">
        <img
          src="/BB.svg"
          alt="business building bb logo"
          className="h-[18px] md:h-[20px] w-[80px] md:w-[105px] mt-1 rotate-5"
        />
      </SwiperSlide>
      <SwiperSlide className="swiper-slide">
        <h4 className="text-white font-medium text-[14px] md:text-[18px] w-[80px] md:w-[165px]">حلول برمجية</h4>
      </SwiperSlide>
      <SwiperSlide className="swiper-slide">
        <img
          src="/BB.svg"
          alt="business building bb logo"
          className="h-[18px] md:h-[20px] w-[80px] md:w-[105px] mt-1 rotate-5"
        />
      </SwiperSlide>
    </Swiper>
  );
}
