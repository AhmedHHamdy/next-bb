'use client';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Project } from "@/app/utils/Types";
import { log } from "console";

export default function ProjectLogos({ logosData }: { logosData?: Project[] }) {
  return (
    <section className="bg-white w-full h-[69px] md:h-[116px] overflow-hidden flex items-center px-[15px] md:px-0 max-w-[2560px] mx-auto">
        <Swiper
            spaceBetween={78}
            slidesPerView={logosData && logosData.length < 8 ? logosData.length: 8}
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
                    slidesPerView: logosData && logosData.length < 8 ? logosData.length: 8
                }
            }}
            >
            {logosData && logosData.map(logo => {
                return (
                    <SwiperSlide id={String(logo.id)}><img src={logo.image_url} alt="shine project logo" className="h-[32px] md:h-[50px]" /></SwiperSlide>
                )
            })}
        </Swiper>
    </section>
  );
}
