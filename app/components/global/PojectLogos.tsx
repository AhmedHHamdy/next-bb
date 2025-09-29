"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Project } from "@/app/utils/Types";
import { useState } from "react";

export default function ProjectLogos({ logosData }: { logosData?: Project[] }) {
  const [activeLogos, setActiveLogos] = useState<number[]>([]);

  const toggleActive = (id: number) => {
    setActiveLogos((prev) =>
      prev.includes(id) ? prev.filter((logoId) => logoId !== id) : [...prev, id]
    );
  };

  return (
    <section className="bg-white w-full h-[69px] md:h-[116px] overflow-hidden flex items-center px-[15px] md:px-0 max-w-[2560px] mx-auto">
      <Swiper
        spaceBetween={78}
        slidesPerView={logosData && logosData.length < 8 ? logosData.length : 8}
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
            slidesPerView: 3,
          },
          768: {
            spaceBetween: 78,
            slidesPerView: 4,
          },
          1024: {
            spaceBetween: 78,
            slidesPerView: 5,
          },
          1279: {
            spaceBetween: 78,
            slidesPerView:
              logosData && logosData.length < 8 ? logosData.length : 8,
          },
        }}
      >
        {logosData?.map((logo) => (
          <SwiperSlide id={String(logo.id)} key={logo.id}>
            <img
              src={logo?.image?.url}
              alt={logo?.image?.alt}
              onClick={() => toggleActive(logo.id)}
              className={`h-[32px] md:h-[50px] opacity-70 hover:opacity-100 hover:!filter-none cursor-pointer 
                          transition-all duration-500 ease-in-out`}
              style={{
                filter: activeLogos.includes(logo.id)
                  ? "none" // clicked = keep original colors
                  : "brightness(0) saturate(100%) invert(54%) sepia(2%) saturate(462%) hue-rotate(182deg) brightness(95%) contrast(85%)",
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
