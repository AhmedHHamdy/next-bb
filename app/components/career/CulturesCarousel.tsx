'use client';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Sections } from "@/app/utils/Types";

export default function CulturesCarousel({ culturesData }: { culturesData?: Sections }) {
  return (
    <>
      <Swiper
        spaceBetween={32}
        slidesPerView={3}
        loop
        direction="horizontal"
        modules={[Navigation]}
        navigation={{
          nextEl: ".culturesValue-button-next-1",
          prevEl: ".culturesValue-button-prev-1",
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
            spaceBetween: 32,
            slidesPerView: 2,
          },
          1279: {
            spaceBetween: 32,
            slidesPerView: 3,
          },
        }}
      >
        {/* <!-- Slides --> */}
        <SwiperSlide className="swiper-slide">
          {/* <!-- Card 1 --> */}
          <div className="rounded-[8px] bg-[#131A27] grid grid-cols-1 lg:grid-cols-2 items-center gap-[64px] ps-[17px] pe-[10px] py-[20px] min-h-[440px]">
            <h2 className="text-[#FFFFFF] text-[24px] md:text-[40px] font-bold leading-[1.3] order-1 lg:order-none">
              {culturesData?.one?.title}
            </h2>
            <p className="text-[#FFFFFF] text-[14px] leading-[1.6] order-2 lg:order-none max-w-[420px]">
              {culturesData?.one?.desc}
            </p>
          </div>
        </SwiperSlide>

        <SwiperSlide className="swiper-slide">
          {/* <!-- Card 2 --> */}
          <div className="rounded-[8px] bg-[#EB971B] grid grid-cols-1 lg:grid-cols-2 items-center gap-[64px] ps-[17px] pe-[10px] py-[20px] min-h-[440px]">
            <h2 className="text-black text-[24px] md:text-[42px] font-bold leading-[1.28]  order-1 lg:order-none">
              {culturesData?.one?.title}
            </h2>
            <p className="text-black text-[14px] leading-[1.6] order-2 lg:order-none max-w-[450px]">
              {culturesData?.two?.desc}
            </p>
          </div>
        </SwiperSlide>

        <SwiperSlide className="swiper-slide">
          {/* <!-- Card 3 --> */}
          <div className="rounded-[8px] bg-[#F7BF45] grid grid-cols-1 lg:grid-cols-2 items-center gap-[23px] ps-[17px] pe-[10px] py-[20px] min-h-[440px]">
            <h2 className="text-[#000000] text-[24px] md:text-[40px] font-bold leading-[1.3]  order-1 lg:order-none">
              {culturesData?.three?.title}
            </h2>
            <p className="text-[#000000] text-[14px] leading-[1.6] order-2 lg:order-none max-w-[550px]">
              {culturesData?.three?.desc}
            </p>
          </div>
        </SwiperSlide>

        <section className="flex justify-center items-center lg:hidden mt-[32px] gap-[13px] md:gap-[16px]">
          <div className="culturesValue-button-prev-1 border border-[#131A27] p-[19px] rounded-[8px] cursor-pointer">
            <svg width="13" height="17" viewBox="0 0 13 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M0.163943 14.6553C0.163943 16.3093 2.23594 17.0543 3.33194 15.8153C5.63173 13.2218 8.52365 11.2218 11.7619 9.98528C13.2719 9.41328 13.2889 7.26328 11.7739 6.70828C8.5161 5.50636 5.60485 3.51973 3.29794 0.924279C2.21394 -0.295721 0.163943 0.436278 0.163943 2.06928V14.6553Z"
                fill="#131A27"
              />
            </svg>
          </div>
          <div className="culturesValue-button-next-1 border border-[#131A27] p-[19px] rounded-[8px] cursor-pointer">
            <svg width="13" height="17" viewBox="0 0 13 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12.8361 2.14159C12.8361 0.487594 10.7641 -0.257405 9.66806 0.981595C7.36826 3.57512 4.47635 5.57511 1.23806 6.8116C-0.271943 7.3836 -0.288943 9.5336 1.22606 10.0886C4.4839 11.2905 7.39515 13.2771 9.70206 15.8726C10.7861 17.0926 12.8361 16.3606 12.8361 14.7276L12.8361 2.14159Z"
                fill="#131A27"
              />
            </svg>
          </div>
        </section>
      </Swiper>

      <div className="swiper culturesValue">
        <div className="swiper-wrapper">{/* <!-- Slides --> */}</div>
      </div>
    </>
  );
}
