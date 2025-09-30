'use client';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Controller } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { useEffect, useRef } from "react";
import { Review } from "@/app/utils/Types";

export default function Reviews({ reviewsData }: { reviewsData?: {
  title: string;
  description: string;
  reviews: Review[];
}}) {
  const swiperRef = useRef<any>(null);
  const swiperClientRef = useRef<any>(null); // second swiper if you want sync

  // useEffect(() => {
  //   if (swiperClientRef.current && swiperRef.current) {
  //     swiperClientRef.current.controller.control = swiperRef.current;
  //     swiperRef.current.controller.control = swiperClientRef.current;
  //   }
  // }, [swiperClientRef.current, swiperRef.current]);

  // const linkSwipers = () => {
  //   if (swiperClientRef.current && swiperRef.current) {
  //     swiperClientRef.current.controller.control = swiperRef.current;
  //     // swiperRef.current.controller.control = swiperClientRef.current;
  //   }
  // };

  const linkSwipers = () => {
    if (swiperRef.current && swiperClientRef.current) {
      if (swiperRef.current.controller && swiperClientRef.current.controller) {
        swiperRef.current.controller.control = swiperClientRef.current;
        // swiperClientRef.current.controller.control = swiperRef.current;
      }
    }
  };

  // ✅ Equivalent of native "init"
  const handleInit = (swiper: any) => {
    swiper.slides.forEach((slide: HTMLElement) => {
      slide.classList.add("transition-all", "duration-500", "ease-in-out");
      const img = slide.querySelector("img");
      if (img) {
        img.classList.add("transition-all", "duration-500", "ease-in-out");
      }
    });
    handleSlideChange(swiper); // run once on init
  };

  // ✅ Equivalent of native "slideChange"
  const handleSlideChange = (swiper: any) => {
    // Reset all slides
    swiper.slides.forEach((slide: HTMLElement) => {
      slide.classList.remove(
        "translate-y-[-80px]",
        "translate-y-[5px]",
        "translate-y-[-40px]"
      );
  
      const img = slide.querySelector("img");
      if (img) {
        img.classList.remove(
          "w-[80px]",
          "md:w-[100px]",
          "h-[80px]",
          "md:h-[100px]",
          "border-4",
          "border-[#EDA133]",
          "border-1",
          "border-gray-200"
        );
        img.style.transform = "scale(1.0)";
        img.classList.add(
          "w-[80px]",
          "md:w-[100px]",
          "h-[80px]",
          "md:h-[100px]",
          "border-1",
          "border-gray-200"
        );
      }
    });
  
    // Active slide
    const active = swiper.slides[swiper.activeIndex];
    if (active) {
      const img = active.querySelector("img");
      if (img) {
        img.classList.remove("border-1", "border-gray-200");
        img.classList.add(
          "w-[80px]",
          "md:w-[100px]",
          "h-[80px]",
          "md:h-[100px]",
          "border-4",
          "border-[#EDA133]"
        );
        img.style.transform = "scale(1.1)";
        active.style.transform = "translateY(5px)";
      }
    }
  
    // Previous and next slides (DOM siblings)
    const prev = active?.previousElementSibling as HTMLElement | null;
    const next = active?.nextElementSibling as HTMLElement | null;

    const prevPrev = prev?.previousElementSibling as HTMLElement | null;
    const nextNext = next?.nextElementSibling as HTMLElement | null;

    const prevPrevPrev = prevPrev?.previousElementSibling as HTMLElement | null;
    const nextNextNext = nextNext?.nextElementSibling as HTMLElement | null;

    // console.log(prev, next, "fdgfd")
  
    if (prev) {
      prev.style.transform = "translateY(-20px)";
      if (prevPrev) {
	      prevPrev.style.transform = "translateY(-80px)";
      }
      if (prevPrevPrev) {
        prevPrevPrev.style.transform = "translateY(-80px)";
      }
    }
  
    if (next) {
      
	    next.style.transform = "translateY(-20px)";
      if (nextNext) {
        nextNext.style.transform = "translateY(-80px)";
      }
      if (nextNextNext) {
        nextNextNext.style.transform = "translateY(-80px)";
      }
    }
  };

  // ✅ Equivalent of native "click-to-slide"
  const handleImageClick = (index: number) => {
    if (swiperRef.current) {
      swiperRef.current.slideToLoop(index, 500);
    }
    if (swiperClientRef.current) {
      swiperClientRef.current.slideToLoop(index, 500); // keep both in sync
    }
  };

  function truncateText(text: string = "", maxLength: number): string {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "..."
    }

    return text
  }

  function truncate60(text: string = ""): string {
    return truncateText(text, 60)
  }

  function truncate80(text: string = ""): string {
    return truncateText(text, 80)
  }

  return (
    <>
      {reviewsData?.reviews && reviewsData?.reviews?.length > 0 && (<section className="bg-[#FAEAD1] pb-[50px] relative overflow-hidden">
        <div className="relative customers-reviews-container">
          <div className="relative text-center mb-[49px] pt-[50px] md:pt-[50px] h-[250px] md:h-[350px] xl:h-[360px] 2xl:h-[400px] bg-white  2xl:px-0">
            <h2 className="text-[24px] md:text-[40px] font-bold mb-[12px]">{reviewsData?.title}</h2>
            <p className="text-[#4A4A4A] text-[14px] md:text-[18px] max-w-[820px] font-medium mb-[20px] mx-auto">
              {reviewsData?.description}
            </p>

            <section className="relative z-[100] client-carousel max-w-[1400px] mx-auto">
            <Swiper
              className="h-[7rem] md:h-[10rem] lg:h-[20rem] xl:h-[18rem]"
              spaceBetween={50}
              slidesPerView={5}
              // loop
              initialSlide={
                reviewsData?.reviews && reviewsData?.reviews.length >= 4
                  ? Math.floor(
                      reviewsData.reviews.concat(
                        reviewsData.reviews,
                        reviewsData.reviews,
                        reviewsData.reviews,
                        reviewsData.reviews,
                        reviewsData.reviews,
                        reviewsData.reviews
                      ).length / 2
                    )
                  : Math.floor((reviewsData?.reviews?.length ?? 0) / 2)
              }
              centeredSlides={true}
              // autoplay={{
              //   delay: 5000,
              //   disableOnInteraction: false,
              // }}
              direction="horizontal"
              allowTouchMove={false}
              modules={[Navigation, Controller]}
              navigation={{
                nextEl: ".swiper-2-button-next-1",
                prevEl: ".swiper-2-button-prev-1",
              }}
              breakpoints={{
                320: { slidesPerView: 3, spaceBetween: 40 },
                768: { slidesPerView: 5, spaceBetween: 30 },
                1024: { slidesPerView: 5, spaceBetween: 40 },
                1280: { slidesPerView: 5, spaceBetween: 10 },
              }}
              onSwiper={(swiper) => {(swiperClientRef.current = swiper)
                linkSwipers()
              }}
              onInit={handleInit}
              onSlideChange={handleSlideChange}
            >
              {/* {[
                "/client-img.png",
                "/review-img-2.png",
                "/review-img-3.png",
                "/review-img-4.png",
                "/review-img-5.png",
                "/review-img-2.png",
                "/review-img-3.png",
                "/review-img-4.png",
                "/review-img-5.png",
                "/client-img.png",
              ].map((src, index) => (
                //  duration-500
                <SwiperSlide key={index} className="transition-transform ease-in-out">
                  <img
                    className="client-img w-[80px] md:w-[100px] md:h-[100px] rounded-full object-cover cursor-pointer"
                    src={src}
                    alt={`client ${index}`}
                    onClick={() => handleImageClick(index)} // ✅ click-to-slide
                  />
                </SwiperSlide>
              ))} */}

              {reviewsData?.reviews && reviewsData?.reviews?.length >= 4 ? reviewsData?.reviews?.concat(reviewsData?.reviews, reviewsData?.reviews, reviewsData?.reviews, reviewsData?.reviews, reviewsData?.reviews, reviewsData?.reviews).map((src, index) => (
                //  duration-500
                <SwiperSlide key={`${src.id}-${index}`} className="transition-transform ease-in-out">
                  <img
                    className="client-img w-[80px] md:w-[100px] md:h-[100px] rounded-full object-cover cursor-pointer"
                    src={src?.image?.url}
                    alt={src?.image?.alt}
                    onClick={() => handleImageClick(index)} // ✅ click-to-slide
                  />
                </SwiperSlide>
              )) : reviewsData && reviewsData?.reviews?.map((src, index) => (
                //  duration-500
                <SwiperSlide key={`${src.id}-${index}`} className="transition-transform ease-in-out">
                  <img
                    className="client-img w-[80px] md:w-[100px] md:h-[100px] rounded-full object-cover cursor-pointer"
                    src={src?.image?.url}
                    alt={src?.image?.alt}
                    onClick={() => handleImageClick(index)} // ✅ click-to-slide
                  />
                </SwiperSlide>
              ))}
            </Swiper>
            </section>

            <div className="hidden sm:block absolute  sm:left-[-110px] sm:top-[200px] md:top-[250px] xl:top-[200px] 2xl:top-[45%] big-screen min-[2560px]:top-[145px] z-[50]">
              <img className="w-[1600px] md:w-[1850px] xl:w-[2700px]" src="/curvedbg.svg"  />
            </div>

            <div className="block sm:hidden absolute left-[0] top-[210px] z-[50]">
              <img className="w-[800px]" src="/background-review-art-curved-mobile.svg"  />
            </div>

            <div className="absolute inset-0 z-[10] top-[160px] xl:top-[210px] right-[30px]">
              <img src="/reviews-background-art.svg"  />
            </div>
          </div>
        </div>

        <div className="mt-[7.5rem] relative z-[70] customers-reviews-container">
          <Swiper
            spaceBetween={48}
            slidesPerView={1}
            // loop
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            initialSlide={
              reviewsData?.reviews && reviewsData?.reviews.length >= 4
                ? Math.floor(
                    reviewsData.reviews.concat(
                      reviewsData.reviews,
                      reviewsData.reviews,
                      reviewsData.reviews,
                      reviewsData.reviews,
                      reviewsData.reviews,
                      reviewsData.reviews
                    ).length / 2
                  )
                : Math.floor((reviewsData?.reviews?.length ?? 0) / 2)
            }
            centeredSlides={true}
            direction="horizontal"
            // allowTouchMove={false}
            modules={[Navigation, Autoplay, Controller]}
            onSwiper={(swiper) => {(swiperRef.current = swiper) 
              linkSwipers()}}
            navigation={{
              nextEl: ".swiper-2-button-next-1",
              prevEl: ".swiper-2-button-prev-1",
            }}
            breakpoints={{
              320: {
                spaceBetween: 10,
                slidesPerView: 1.2,
              },
              768: {
                spaceBetween: 40,
              },
              1024: {
                spaceBetween: 48,
                slidesPerView: 1.64,
              },
            }}
          >
            {/* <SwiperSlide className="swiper-slide bg-[white] rounded-lg p-4 md:p-8 border border-gray-200">
              <section className="w-full h-full flex flex-col xl:flex-row xl:justify-between xl:items-center gap-[24px] lg:gap-[29px]">
                <section className="xl:w-[536px] flex flex-col">
                  <img className="w-10 md:w-16 mb-[8px]" src="/text-quote.svg"  />
                  <p className="text-[14px] md:text-[24px] font-medium">
                    هو سر نجاحنا على الإنترنت. إنه يجعل التسويق عبر الإنترنت سهلاً للغاية، وضيوفنا يحبون استخدام نظام
                    الطلبات الجديد وتطبيقنا."
                  </p>
                  <img className="w-10 md:w-16 self-end mt-[8px]" src="/text-quote.svg"  />

                  <section className="flex items-center gap-[16px]">
                    <img
                      className="w-[48px] h-[48px] md:w-[71px] md:h-[71px] rounded-full object-cover"
                      src="/client-img.png"
                      alt="client img"
                    />
                    <section>
                      <h4 className="text-[14px] md:text-[24px] font-bold">وحيد منيع</h4>
                      <h5 className="text-[12px] md:text-[16px] text-[#4A4A4A] font-medium">
                        مجلس إدارة شركة بناء الأعمال
                      </h5>
                    </section>
                  </section>
                </section>

                <figure className="w-full h-full lg:h-[350px] xl:w-[499px] xl:h-[350px]">
                  <video
                    src="/demo-video.mp4"
                    controls
                    playsInline
                    className="w-full h-full object-cover rounded-[16px]"
                  ></video>
                </figure>
              </section>
            </SwiperSlide> */}

            {reviewsData?.reviews && reviewsData?.reviews?.length >= 4 ? reviewsData?.reviews?.concat(reviewsData?.reviews, reviewsData?.reviews, reviewsData?.reviews, reviewsData?.reviews, reviewsData?.reviews, reviewsData?.reviews).map((review, index) => {
              return (
                <SwiperSlide key={`${review.id}-${index}`} className="swiper-slide bg-[white] rounded-lg p-4 md:p-8 border border-gray-200">
                  <section className="w-full h-full flex flex-col xl:flex-row xl:justify-between xl:items-center gap-[24px] lg:gap-[29px]">
                    <section className="xl:w-[536px] flex flex-col">
                      <img className="w-10 md:w-16 mb-[8px]" src="/text-quote.svg"  />
                      <p className="text-[14px] md:text-[24px] font-medium">
                        {review.quote}
                      </p>
                      <img className="w-10 md:w-16 self-end mt-[8px]" src="/text-quote.svg"  />

                      <section className="flex items-center gap-[16px]">
                        <img
                          className="w-[48px] h-[48px] md:w-[71px] md:h-[71px] rounded-full object-cover"
                          src={review?.image?.url}
                          alt={review?.image?.alt}
                        />
                        <section>
                          <h4 className="text-[14px] md:text-[24px] font-bold">{review.username}</h4>
                          <h5 className="text-[12px] md:text-[16px] text-[#4A4A4A] font-medium">
                            {review.position}
                          </h5>
                        </section>
                      </section>
                    </section>

                    {review.file_type == "video" && <figure className="w-full h-full lg:h-[350px] xl:w-[499px] xl:h-[350px]">
                      <video
                        controls
                        playsInline
                        poster={review?.thumbnail?.url}
                        className="w-full h-full min-h-[250px] object-cover rounded-[16px]"
                      >
                        <source src={"https://www.pexels.com/download/video/11009926/"} type="video/mp4" />
                      </video>
                    </figure>}

                    {review.file_type == "image" && <figure className="w-full h-full lg:h-[350px] xl:w-[499px] xl:h-[350px]">
                      <img
                        src={review?.file_url}
                        alt={review?.thumbnail?.alt}
                        className="w-full h-full min-h-[250px] object-cover rounded-[16px]"
                      />
                    </figure>}
                  </section>
                </SwiperSlide>
              )
            }) : reviewsData && reviewsData?.reviews?.map((review, index) => {
              return (
                <SwiperSlide key={`${review?.id}-${index}`} className="swiper-slide bg-[white] rounded-lg p-4 md:p-8 border border-gray-200">
                  <section className="w-full h-full flex flex-col xl:flex-row xl:justify-between xl:items-center gap-[24px] lg:gap-[29px]">
                    <section className="xl:w-[536px] flex flex-col">
                      <img className="w-10 md:w-16 mb-[8px]" src="/text-quote.svg"  />
                      <p className="text-[14px] md:text-[24px] font-medium min-h-[80px]">
                        {review?.quote}
                      </p>
                      <img className="w-10 md:w-16 self-end mt-[8px]" src="/text-quote.svg"  />

                      <section className="flex items-center gap-[16px]">
                        <img
                          className="w-[48px] h-[48px] md:w-[71px] md:h-[71px] rounded-full object-cover"
                          src={review?.image?.url}
                          alt={review?.image?.alt}
                        />
                        <section>
                          <h4 className="text-[14px] md:text-[24px] font-bold">{review?.username}</h4>
                          <h5 className="text-[12px] md:text-[16px] text-[#4A4A4A] font-medium">
                            {review?.position}
                          </h5>
                        </section>
                      </section>
                    </section>

                    {review?.file_type == "video" && <figure className="w-full h-full lg:h-[350px] xl:w-[499px] xl:h-[350px]">
                      <video
                        controls
                        playsInline
                        poster={review?.thumbnail?.url}
                        className="w-full h-full min-h-[250px] object-cover rounded-[16px]"
                      >
                        <source src={"https://www.pexels.com/download/video/11009926/"} type="video/mp4" />
                      </video>
                    </figure>}

                    {review?.file_type == "image" && <figure className="w-full h-full lg:h-[350px] xl:w-[499px] xl:h-[350px]">
                      <img
                        src={review?.file_url}
                        className="w-full h-full min-h-[250px] object-cover rounded-[16px]"
                      />
                    </figure>}
                  </section>
                </SwiperSlide>
              )
            })}

          </Swiper>
        </div>

        <section className="hidden md:flex justify-center items-center max-w-[1395px] mx-auto mt-[48px] relative z-[120]">
          <section className="flex items-center gap-[16px]">
            <div className="swiper-2-button-prev-1 border border-[#131A27] p-[19px] rounded-[8px] cursor-pointer rtl:block ltr:hidden">
              <svg width="13" height="17" viewBox="0 0 13 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M0.163943 14.6553C0.163943 16.3093 2.23594 17.0543 3.33194 15.8153C5.63173 13.2218 8.52365 11.2218 11.7619 9.98528C13.2719 9.41328 13.2889 7.26328 11.7739 6.70828C8.5161 5.50636 5.60485 3.51973 3.29794 0.924279C2.21394 -0.295721 0.163943 0.436278 0.163943 2.06928V14.6553Z"
                  fill="#131A27"
                />
              </svg>
            </div>

            <div className="swiper-2-button-prev-1 border border-[#131A27] p-[19px] rounded-[8px] cursor-pointer rtl:hidden ltr:block">
              <svg width="13" height="17" viewBox="0 0 13 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12.8361 2.14159C12.8361 0.487594 10.7641 -0.257405 9.66806 0.981595C7.36826 3.57512 4.47635 5.57511 1.23806 6.8116C-0.271943 7.3836 -0.288943 9.5336 1.22606 10.0886C4.4839 11.2905 7.39515 13.2771 9.70206 15.8726C10.7861 17.0926 12.8361 16.3606 12.8361 14.7276L12.8361 2.14159Z"
                  fill="#131A27"
                />
              </svg>
            </div>


            <div className="swiper-2-button-next-1 border border-[#131A27] p-[19px] rounded-[8px] cursor-pointer  rtl:hidden ltr:block">
              <svg width="13" height="17" viewBox="0 0 13 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M0.163943 14.6553C0.163943 16.3093 2.23594 17.0543 3.33194 15.8153C5.63173 13.2218 8.52365 11.2218 11.7619 9.98528C13.2719 9.41328 13.2889 7.26328 11.7739 6.70828C8.5161 5.50636 5.60485 3.51973 3.29794 0.924279C2.21394 -0.295721 0.163943 0.436278 0.163943 2.06928V14.6553Z"
                  fill="#131A27"
                />
              </svg>
            </div>

            <div className="swiper-2-button-next-1 border border-[#131A27] p-[19px] rounded-[8px] cursor-pointer rtl:block ltr:hidden">
              <svg width="13" height="17" viewBox="0 0 13 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12.8361 2.14159C12.8361 0.487594 10.7641 -0.257405 9.66806 0.981595C7.36826 3.57512 4.47635 5.57511 1.23806 6.8116C-0.271943 7.3836 -0.288943 9.5336 1.22606 10.0886C4.4839 11.2905 7.39515 13.2771 9.70206 15.8726C10.7861 17.0926 12.8361 16.3606 12.8361 14.7276L12.8361 2.14159Z"
                  fill="#131A27"
                />
              </svg>
            </div>
          </section>
        </section>
      </section>)}
    </>
  );
}
