'use client';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export default function ProjectLogos() {
  return (
    <section className="bg-white w-full h-[69px] md:h-[116px] overflow-hidden flex items-center px-[15px] md:px-0 max-w-[2560px] mx-auto">
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
                    spaceBetween: 50,
                    slidesPerView: 3
                },
        
                768: {
                    spaceBetween: 78,
                    slidesPerView: 4
                },
                1024: {
                    spaceBetween: 78,
                    slidesPerView: 5
                },
                1279: {
                    spaceBetween: 78,
                    slidesPerView: 8
                }
            }}
            >
            <SwiperSlide><img src="/shine.svg" alt="shine project logo" className="h-[32px] md:h-[50px]" /></SwiperSlide>
            <SwiperSlide><img src="/garagePlus.svg" alt="garage plus logo" className="h-[32px] md:h-[50px]" /></SwiperSlide>
            <SwiperSlide><img src="/final.svg" alt="final logo" className="h-[32px] md:h-[50px]" /></SwiperSlide>
            <SwiperSlide><img src="/rental.svg" alt="rental logo" className="w-[140px] h-[32px] md:h-[50px]" /></SwiperSlide>
            <SwiperSlide><img src="/exclusive.svg" alt="exclusive logo" className="h-[32px] md:h-[50px]" /></SwiperSlide>
            <SwiperSlide><img src="/shine.svg" alt="shine project logo" className="h-[32px] md:h-[50px]" /></SwiperSlide>
            <SwiperSlide><img src="/garagePlus.svg" alt="garage plus logo" className="h-[32px] md:h-[50px]" /></SwiperSlide>
            <SwiperSlide><img src="/final.svg" alt="final logo" className="h-[32px] md:h-[50px]" /></SwiperSlide>
            <SwiperSlide><img src="/rental.svg" alt="rental logo" className="w-[140px] h-[32px] md:h-[50px]" /></SwiperSlide>
            <SwiperSlide><img src="/exclusive.svg" alt="exclusive logo" className="h-[32px] md:h-[50px]" /></SwiperSlide>
        </Swiper>
    </section>
  );
}
