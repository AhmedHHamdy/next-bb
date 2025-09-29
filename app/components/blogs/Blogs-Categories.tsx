'use client';
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { SectionCategory } from "@/app/utils/Types";
import { useTranslations } from "next-intl";

export default function BlogsCategories({ sectionsData, setSelectedSection, selectedSectionId }: { sectionsData: SectionCategory[], setSelectedSection: (value: string) => void, selectedSectionId: string}) {
  const t = useTranslations("Blogs")
  return (
    <Swiper
      className="w-full h-[125px] md:h-full"
      spaceBetween={32}
      slidesPerView={5}
      direction="horizontal"
      breakpoints={{
        320: {
          spaceBetween: 27,
          slidesPerView: 5,
        },

        768: {
          spaceBetween: 32,
          slidesPerView: 4,
        },
        1024: {
          spaceBetween: 32,
          slidesPerView: 4,
        },
        1279: {
          spaceBetween: 15,
          slidesPerView: 6,
        },
        1440: {
          spaceBetween: 15,
          slidesPerView: 6,
        },
      }}
    >
      <SwiperSlide className="swiper-slide cursor-pointer">
        <div onClick={() => setSelectedSection("")} className={`${selectedSectionId == "" ? "blog-icon-container": ""} flex flex-col items-center gap-2 relative`}>
          {/* <svg
            className="blogs-icon"
            xmlns="http://www.w3.org/2000/svg"
            width="54"
            height="55"
            viewBox="0 0 54 55"
            fill="none"
          >
            <g filter="url(#filter0_d_4060_84917)">
              <g clipPath="url(#clip0_4060_84917)">
                <rect
                  x="3.32178"
                  y="4"
                  width="47.3563"
                  height="47.3563"
                  rx="23.6782"
                  fill="url(#paint0_radial_4060_84917)"
                />
                <path
                  d="M24.0694 18.207H19.7191C18.5112 18.207 17.5286 19.1897 17.5286 20.3976V24.7478C17.5286 25.9557 18.5112 26.9384 19.7191 26.9384H24.0694C25.2772 26.9384 26.2599 25.9557 26.2599 24.7478V20.3976C26.2599 19.1897 25.2772 18.207 24.0694 18.207ZM24.78 24.7478C24.78 25.1397 24.4612 25.4585 24.0694 25.4585H19.7191C19.3273 25.4585 19.0084 25.1397 19.0084 24.7478V20.3976C19.0084 20.0057 19.3273 19.6869 19.7191 19.6869H24.0694C24.4612 19.6869 24.78 20.0057 24.78 20.3976V24.7478ZM34.2513 18.207H29.9596C28.7356 18.207 27.7398 19.2028 27.7398 20.4269V24.7185C27.7398 25.9425 28.7356 26.9384 29.9596 26.9384H34.2513C35.4753 26.9384 36.4711 25.9425 36.4711 24.7185V20.4269C36.4711 19.2028 35.4753 18.207 34.2513 18.207ZM34.9912 24.7185C34.9912 25.1265 34.6593 25.4585 34.2513 25.4585H29.9596C29.5516 25.4585 29.2197 25.1265 29.2197 24.7185V20.4269C29.2197 20.0189 29.5516 19.6869 29.9596 19.6869H34.2513C34.6593 19.6869 34.9912 20.0189 34.9912 20.4269V24.7185ZM24.0694 28.4182H19.7191C18.5112 28.4182 17.5286 29.4009 17.5286 30.6088V34.959C17.5286 36.1669 18.5112 37.1496 19.7191 37.1496H24.0694C25.2772 37.1496 26.2599 36.1669 26.2599 34.959V30.6088C26.2599 29.4009 25.2772 28.4182 24.0694 28.4182ZM24.78 34.959C24.78 35.3509 24.4612 35.6697 24.0694 35.6697H19.7191C19.3273 35.6697 19.0084 35.3509 19.0084 34.959V30.6088C19.0084 30.2169 19.3273 29.8981 19.7191 29.8981H24.0694C24.4612 29.8981 24.78 30.2169 24.78 30.6088V34.959ZM34.2513 28.4182H29.9596C28.7356 28.4182 27.7398 29.4141 27.7398 30.6381V34.9297C27.7398 36.1537 28.7356 37.1496 29.9596 37.1496H34.2513C35.4753 37.1496 36.4711 36.1537 36.4711 34.9297V30.6381C36.4711 29.4141 35.4753 28.4182 34.2513 28.4182ZM34.9912 34.9297C34.9912 35.3377 34.6593 35.6697 34.2513 35.6697H29.9596C29.5516 35.6697 29.2197 35.3377 29.2197 34.9297V30.6381C29.2197 30.2301 29.5516 29.8981 29.9596 29.8981H34.2513C34.6593 29.8981 34.9912 30.2301 34.9912 30.6381V34.9297Z"
                  fill="#2A313D"
                />
                <rect
                  x="3.71629"
                  y="4.39464"
                  width="46.5671"
                  height="46.5671"
                  rx="23.2835"
                  stroke="#F3F3F1"
                  strokeWidth="0.789272"
                />
              </g>
            </g>
            <defs>
              <filter
                id="filter0_d_4060_84917"
                x="0.164689"
                y="0.842912"
                width="53.6705"
                height="53.6696"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feMorphology
                  radius="0.789272"
                  operator="dilate"
                  in="SourceAlpha"
                  result="effect1_dropShadow_4060_84917"
                />
                <feOffset />
                <feGaussianBlur stdDeviation="1.18391" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0.952941 0 0 0 0 0.952941 0 0 0 0 0.945098 0 0 0 1 0" />
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_4060_84917" />
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_4060_84917" result="shape" />
              </filter>
              <radialGradient
                id="paint0_radial_4060_84917"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(26.9999 27.6782) scale(31.2552 16.1012)"
              >
                <stop stopColor="#F0ECE7" />
                <stop offset="1" stopColor="white" />
              </radialGradient>
              <clipPath id="clip0_4060_84917">
                <rect x="3.32178" y="4" width="47.3563" height="47.3563" rx="23.6782" fill="white" />
              </clipPath>
            </defs>
          </svg> */}
          <section className="w-[50px] h-[50px] rounded-[200px] border-[1px] border-[#F3F3F1] section-badge flex items-center justify-center">
              <img className="h-[20px] w-[20px]" src="/all-icon-svg.svg" />
            </section>
          <span className="blog-icon-text text-[#4A4A4A] text-sm font-medium text-center h-[52px]">{t("all")}</span>
          {/* -bottom-[0.2px] */}
          <div className="indicator absolute hidden md:block md:-bottom-[0.2px] w-20 h-0.5 bg-transparent rounded-full"></div>
        </div>
      </SwiperSlide>

      {sectionsData && sectionsData?.map(section => {
        return (
          <SwiperSlide key={section.id} className="swiper-slide cursor-pointer">
            <div onClick={() => setSelectedSection(String(section.id))} className={`${String(section.id) == selectedSectionId ? "blog-icon-container": ""} flex flex-col items-center gap-2 relative`}>
              {/* <svg
                className="blogs-icon"
                xmlns="http://www.w3.org/2000/svg"
                width="55"
                height="51"
                viewBox="0 0 55 51"
                fill="none"
              >
                <g filter="url(#filter0_d_3872_97286)">
                  <g clipPath="url(#clip0_3872_97286)">
                    <rect x="3.82184" width="47.3563" height="47.3563" rx="23.6782" fill="url(#paint0_radial_3872_97286)" />
                    <path
                      d="M34.5687 21.6821L28.2903 15.4065C27.6412 14.7577 26.585 14.7577 25.9359 15.4065C25.3524 15.9897 25.3021 16.8792 25.733 17.5144L25.7243 17.558C25.2716 19.8205 24.1697 21.8787 22.5374 23.5102L19.6576 26.3887C19.007 27.039 19.0069 28.0916 19.6576 28.742L21.2272 30.3108C21.8778 30.9612 22.9309 30.9612 23.5816 30.3108L23.974 29.9186L26.7207 32.6642C27.3714 33.3145 28.4244 33.3146 29.0751 32.6642C29.7242 32.0154 29.7242 30.9597 29.0751 30.3109L27.8979 29.1342L28.2903 28.742C28.9409 28.0917 28.941 27.0391 28.2903 26.3887L28.0236 26.1221C29.3355 25.2041 30.8253 24.565 32.4162 24.2469L32.4605 24.238C33.1101 24.6764 33.9979 24.6059 34.5687 24.0354H34.5687C35.2177 23.3866 35.2177 22.331 34.5687 21.6821ZM22.7968 29.5264C22.5799 29.7431 22.2288 29.7432 22.012 29.5264L20.4424 27.9575C20.2255 27.7407 20.2255 27.3899 20.4424 27.1731L23.1892 24.4275L25.5435 26.7809L22.7968 29.5264ZM28.2903 31.0953C28.5066 31.3115 28.5066 31.6634 28.2903 31.8797C28.0739 32.0959 27.7218 32.0959 27.5055 31.8797L24.7587 29.1341L25.5435 28.3497L28.2903 31.0953ZM26.3283 27.5653C26.4951 27.3985 26.7448 27.1431 27.1389 26.8067L27.5055 27.1731C27.7224 27.3899 27.7224 27.7407 27.5055 27.9575L27.1131 28.3498L26.3283 27.5653ZM26.3519 26.02L23.9503 23.6195C25.2373 22.1341 26.159 20.3806 26.6521 18.4757L31.498 23.3195C29.5922 23.8123 27.838 24.7336 26.3519 26.02ZM33.7838 23.2509C33.5669 23.4677 33.2159 23.4677 32.999 23.2509L26.7207 16.9754C26.5038 16.7586 26.5038 16.4077 26.7207 16.191C26.9376 15.9742 27.2886 15.9742 27.5055 16.191L33.7838 22.4665C34.0001 22.6827 34.0001 23.0346 33.7838 23.2509Z"
                      fill="#2A313D"
                    />
                    <path
                      d="M23.5815 26.3861C23.3648 26.1694 23.0134 26.1694 22.7967 26.3861L22.012 27.1705C21.7953 27.3871 21.7953 27.7383 22.012 27.9549C22.2286 28.1715 22.5801 28.1715 22.7967 27.9549L23.5815 27.1705C23.7982 26.9539 23.7982 26.6027 23.5815 26.3861ZM30.839 14.2109C30.5325 14.2109 30.284 14.4593 30.284 14.7656V15.875C30.284 16.1813 30.5325 16.4297 30.839 16.4297C31.1455 16.4297 31.3939 16.1813 31.3939 15.875V14.7656C31.3939 14.4593 31.1455 14.2109 30.839 14.2109ZM35.2784 18.6484H34.1686C33.8621 18.6484 33.6136 18.8967 33.6136 19.2031C33.6136 19.5094 33.8621 19.7578 34.1686 19.7578H35.2784C35.5849 19.7578 35.8334 19.5094 35.8334 19.2031C35.8334 18.8967 35.5849 18.6484 35.2784 18.6484ZM34.561 15.4827C34.3443 15.2661 33.9929 15.2661 33.7762 15.4827L32.6663 16.5921C32.4496 16.8087 32.4496 17.1599 32.6663 17.3765C32.883 17.5931 33.2344 17.5932 33.4511 17.3765L34.561 16.2672C34.7777 16.0506 34.7777 15.6994 34.561 15.4827Z"
                      fill="#2A313D"
                    />
                    <rect
                      x="4.21623"
                      y="0.394636"
                      width="46.5671"
                      height="46.5671"
                      rx="23.2835"
                      stroke="#F3F3F1"
                      strokeWidth="0.789272"
                    />
                  </g>
                </g>
                <defs>
                  <filter
                    id="filter0_d_3872_97286"
                    x="0.66475"
                    y="-3.15709"
                    width="53.6705"
                    height="53.6696"
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                  >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix
                      in="SourceAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      result="hardAlpha"
                    />
                    <feMorphology
                      radius="0.789272"
                      operator="dilate"
                      in="SourceAlpha"
                      result="effect1_dropShadow_3872_97286"
                    />
                    <feOffset />
                    <feGaussianBlur stdDeviation="1.18391" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0.952941 0 0 0 0 0.952941 0 0 0 0 0.945098 0 0 0 1 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_3872_97286" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_3872_97286" result="shape" />
                  </filter>
                  <radialGradient
                    id="paint0_radial_3872_97286"
                    cx="0"
                    cy="0"
                    r="1"
                    gradientUnits="userSpaceOnUse"
                    gradientTransform="translate(27.5 23.6782) scale(31.2552 16.1012)"
                  >
                    <stop offset="1" stopColor="white" />
                  </radialGradient>
                  <clipPath id="clip0_3872_97286">
                    <rect x="3.82184" width="47.3563" height="47.3563" rx="23.6782" fill="white" />
                  </clipPath>
                </defs>
              </svg> */}

              <section className="w-[50px] h-[50px] rounded-[200px] border-[1px] border-[#F3F3F1] section-badge flex items-center justify-center">
                <img className="h-[20px] w-[20px]" src={section?.icon?.url} alt={section?.icon?.alt} />
              </section>
              <span className="blog-icon-text text-[#4A4A4A] text-sm font-medium text-center h-[52px] md:h-auto">{section.name}</span>
{/* -bottom-[1.2px] */}
              <div className={`indicator absolute hidden md:block ${section?.name?.length > 14 ? "md:-bottom-[31.5px] xl:-bottom-[11.5px]": "md:-bottom-[31.5px] xl:-bottom-[31.5px]"} w-20 h-0.5 bg-transparent rounded-full`}></div>
            </div>
          </SwiperSlide>
        )
      })}

      {/* <SwiperSlide className="swiper-slide">
        <div className="blog-icon-container flex flex-col items-center gap-2 relative">
          <svg
            className="blogs-icon"
            xmlns="http://www.w3.org/2000/svg"
            width="55"
            height="51"
            viewBox="0 0 55 51"
            fill="none"
          >
            <g filter="url(#filter0_d_3872_97280)">
              <g clipPath="url(#clip0_3872_97280)">
                <rect x="3.64368" width="47.3563" height="47.3563" rx="23.6782" fill="url(#paint0_radial_3872_97280)" />
                <path
                  d="M31.4172 33.1535H23.2258M31.5025 19.4585L33.1756 21.1277C33.6752 21.6258 33.6752 22.4334 33.1756 22.9315L31.5025 24.5781M23.2258 19.4585L21.5527 21.1277C21.053 21.6258 21.053 22.4334 21.5527 22.9315L23.2258 24.5781M26.3829 25.4314L28.3454 18.6053M37.39 18.4773V25.4741C37.39 27.8303 35.4799 29.7404 33.1237 29.7404H21.5184C19.1626 29.7404 17.2529 27.8307 17.2529 25.475V18.4773C17.2529 16.1211 19.1631 14.2109 21.5193 14.2109H33.1237C35.4799 14.2109 37.39 16.1211 37.39 18.4773Z"
                  stroke="#2A313D"
                  strokeWidth="1.18391"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <rect
                  x="4.03807"
                  y="0.394636"
                  width="46.5671"
                  height="46.5671"
                  rx="23.2835"
                  stroke="#F3F3F1"
                  strokeWidth="0.789272"
                />
              </g>
            </g>
            <defs>
              <filter
                id="filter0_d_3872_97280"
                x="0.486589"
                y="-3.15709"
                width="53.6705"
                height="53.6696"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feMorphology
                  radius="0.789272"
                  operator="dilate"
                  in="SourceAlpha"
                  result="effect1_dropShadow_3872_97280"
                />
                <feOffset />
                <feGaussianBlur stdDeviation="1.18391" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0.952941 0 0 0 0 0.952941 0 0 0 0 0.945098 0 0 0 1 0" />
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_3872_97280" />
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_3872_97280" result="shape" />
              </filter>
              <radialGradient
                id="paint0_radial_3872_97280"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(27.3218 23.6782) scale(31.2552 16.1012)"
              >
                <stop stopColor="#F0ECE7" />
                <stop offset="1" stopColor="white" />
              </radialGradient>
              <clipPath id="clip0_3872_97280">
                <rect x="3.64368" width="47.3563" height="47.3563" rx="23.6782" fill="white" />
              </clipPath>
            </defs>
          </svg>
          <span className="text-[#4A4A4A] blog-icon-text text-sm font-medium text-center h-[52px]">برمجة</span>

          <div className="indicator absolute -bottom-[4.2px] w-20 h-0.5 bg-transparent rounded-full"></div>
        </div>
      </SwiperSlide>

      <SwiperSlide className="swiper-slide">
        <div className="blog-icon-container flex flex-col items-center gap-2 relative">
          <svg
            className="blogs-icon"
            xmlns="http://www.w3.org/2000/svg"
            width="55"
            height="51"
            viewBox="0 0 55 51"
            fill="none"
          >
            <g filter="url(#filter0_d_3872_97273)">
              <g clipPath="url(#clip0_3872_97273)">
                <rect x="3.96552" width="47.3563" height="47.3563" rx="23.6782" fill="url(#paint0_radial_3872_97273)" />
                <path
                  d="M36.5604 14.2109H34.3406C34.0341 14.2109 33.7856 14.4594 33.7856 14.7659V15.3209H29.2136C28.9845 14.675 28.3676 14.2109 27.6441 14.2109C26.9207 14.2109 26.3038 14.675 26.0747 15.3209H21.5026V14.7659C21.5026 14.4594 21.2542 14.2109 20.9477 14.2109H18.7279C18.4214 14.2109 18.1729 14.4594 18.1729 14.7659V16.9858C18.1729 17.2922 18.4214 17.5407 18.7279 17.5407H20.9477C21.2542 17.5407 21.5026 17.2922 21.5026 16.9858V16.4234H23.8104C21.8083 17.6915 20.5912 19.8337 20.4448 22.1078C19.7911 22.3326 19.3198 22.9533 19.3198 23.6823C19.3198 24.6003 20.0667 25.3472 20.9847 25.3472C21.9027 25.3472 22.6496 24.6003 22.6496 23.6823C22.6496 22.9653 22.1939 22.3527 21.557 22.1188C21.7541 19.505 23.6362 17.2538 26.153 16.6151C26.4258 17.1631 26.9916 17.5407 27.6441 17.5407C28.2967 17.5407 28.8625 17.1631 29.1353 16.6152C31.6521 17.2539 33.5342 19.5051 33.7313 22.1188C33.0944 22.3527 32.6387 22.9653 32.6387 23.6823C32.6387 24.6003 33.3856 25.3472 34.3036 25.3472C35.2216 25.3472 35.9685 24.6003 35.9685 23.6823C35.9685 22.9533 35.4972 22.3326 34.8435 22.1078C34.6968 19.8291 33.4761 17.6964 31.4779 16.4308H33.7856V16.9858C33.7856 17.2922 34.0341 17.5407 34.3406 17.5407H36.5604C36.8669 17.5407 37.1154 17.2922 37.1154 16.9858V14.7659C37.1154 14.4594 36.8669 14.2109 36.5604 14.2109ZM20.3927 16.4308H19.2828V15.3209H20.3927V16.4308ZM20.9847 24.2373C20.6787 24.2373 20.4297 23.9883 20.4297 23.6823C20.4297 23.3763 20.6787 23.1274 20.9847 23.1274C21.2907 23.1274 21.5396 23.3763 21.5396 23.6823C21.5396 23.9883 21.2907 24.2373 20.9847 24.2373ZM27.6441 16.4308C27.3381 16.4308 27.0892 16.1818 27.0892 15.8758C27.0892 15.5698 27.3381 15.3209 27.6441 15.3209C27.9501 15.3209 28.1991 15.5698 28.1991 15.8758C28.1991 16.1818 27.9501 16.4308 27.6441 16.4308ZM34.3036 23.1274C34.6096 23.1274 34.8586 23.3763 34.8586 23.6823C34.8586 23.9883 34.6096 24.2373 34.3036 24.2373C33.9976 24.2373 33.7487 23.9883 33.7487 23.6823C33.7487 23.3763 33.9976 23.1274 34.3036 23.1274ZM36.0055 16.4308H34.8956V15.3209H36.0055V16.4308Z"
                  fill="#2A313D"
                />
                <path
                  d="M32.5455 25.5938L28.1058 18.9343L28.1054 18.9336C28.1038 18.9312 28.102 18.9289 28.1004 18.9266C28.0928 18.9156 28.0848 18.9049 28.0764 18.8945C27.8425 18.6039 27.3972 18.6235 27.1878 18.9266C27.1862 18.9289 27.1845 18.9312 27.1829 18.9336L27.1824 18.9343L22.7428 25.5938C22.6716 25.7006 22.6396 25.8287 22.6522 25.9564C22.6649 26.084 22.7214 26.2034 22.8121 26.2941C23.9193 27.4013 24.624 28.8487 24.816 30.3972C24.7289 30.4672 24.646 30.5424 24.5677 30.6221C24.0465 31.1553 23.7594 31.8572 23.7594 32.5982C23.7594 32.9047 24.0079 33.1532 24.3144 33.1532H30.9738C31.2803 33.1532 31.5288 32.9047 31.5288 32.5982C31.5288 31.8572 31.2417 31.1553 30.7205 30.6221C30.6422 30.5423 30.5593 30.4672 30.4722 30.3971C30.6642 28.8485 31.3689 27.4012 32.4761 26.2941C32.5668 26.2034 32.6233 26.084 32.636 25.9563C32.6486 25.8287 32.6166 25.7005 32.5455 25.5938ZM27.6441 25.3467C27.9501 25.3467 28.1991 25.5956 28.1991 25.9017C28.1991 26.2077 27.9501 26.4566 27.6441 26.4566C27.3381 26.4566 27.0892 26.2077 27.0892 25.9017C27.0892 25.5956 27.3381 25.3467 27.6441 25.3467ZM24.964 32.0433C25.1949 31.3835 25.8208 30.8963 26.5342 30.8963H28.754C29.4674 30.8963 30.0934 31.3835 30.3243 32.0433H24.964ZM29.429 29.8709C29.2084 29.8146 28.9817 29.7863 28.754 29.7864H26.5342C26.3038 29.7864 26.0775 29.8151 25.8592 29.8709C25.5995 28.3751 24.925 26.9769 23.9113 25.8419L27.0892 21.075V24.3322C26.4432 24.5613 25.9793 25.1782 25.9793 25.9017C25.9793 26.8197 26.7261 27.5666 27.6441 27.5666C28.5621 27.5666 29.309 26.8197 29.309 25.9017C29.309 25.1782 28.845 24.5613 28.1991 24.3322V21.075L31.377 25.8419C30.3632 26.9768 29.6887 28.3751 29.429 29.8709Z"
                  fill="#2A313D"
                />
                <rect
                  x="4.36052"
                  y="0.394636"
                  width="46.5671"
                  height="46.5671"
                  rx="23.2835"
                  stroke="#F3F3F1"
                  strokeWidth="0.789272"
                />
              </g>
            </g>
            <defs>
              <filter
                id="filter0_d_3872_97273"
                x="0.808427"
                y="-3.15709"
                width="53.6705"
                height="53.6696"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feMorphology
                  radius="0.789272"
                  operator="dilate"
                  in="SourceAlpha"
                  result="effect1_dropShadow_3872_97273"
                />
                <feOffset />
                <feGaussianBlur stdDeviation="1.18391" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0.952941 0 0 0 0 0.952941 0 0 0 0 0.945098 0 0 0 1 0" />
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_3872_97273" />
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_3872_97273" result="shape" />
              </filter>
              <radialGradient
                id="paint0_radial_3872_97273"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(27.6437 23.6782) scale(31.2552 16.1012)"
              >
                <stop stopColor="#F0ECE7" />
                <stop offset="1" stopColor="white" />
              </radialGradient>
              <clipPath id="clip0_3872_97273">
                <rect x="3.96552" width="47.3563" height="47.3563" rx="23.6782" fill="white" />
              </clipPath>
            </defs>
          </svg>
          <span className="text-[#4A4A4A] blog-icon-text text-sm font-medium text-center h-[52px]">تصميم واجهة</span>

          <div className="indicator absolute -bottom-[4.2px] w-20 h-0.5 bg-transparent rounded-full shadow-sm"></div>
        </div>
      </SwiperSlide>

      <SwiperSlide className="swiper-slide">
        <div className="blog-icon-container flex flex-col items-center gap-2 relative">
          <svg
            className="blogs-icon"
            xmlns="http://www.w3.org/2000/svg"
            width="54"
            height="51"
            viewBox="0 0 54 51"
            fill="none"
          >
            <g filter="url(#filter0_d_3872_97267)">
              <g clipPath="url(#clip0_3872_97267)">
                <rect x="3.46552" width="47.3563" height="47.3563" rx="23.6782" fill="url(#paint0_radial_3872_97267)" />
                <path
                  d="M34.5855 14.2109H19.7021C18.5831 14.2109 17.6725 15.1215 17.6725 16.2405V25.7118C17.6725 26.8307 18.5831 27.7413 19.7021 27.7413H34.5855C35.7045 27.7413 36.6151 26.8307 36.6151 25.7118V16.2405C36.6151 15.1215 35.7045 14.2109 34.5855 14.2109ZM35.262 25.7118C35.262 26.0852 34.9583 26.3883 34.5855 26.3883H19.7021C19.3293 26.3883 19.0256 26.0852 19.0256 25.7118V16.2405C19.0256 15.8677 19.3293 15.564 19.7021 15.564H34.5855C34.9583 15.564 35.262 15.8677 35.262 16.2405V25.7118ZM35.9386 30.4474H22.9602C22.6801 29.662 21.936 29.0944 21.0551 29.0944C20.1743 29.0944 19.4301 29.662 19.1501 30.4474H18.3491C18.1696 30.4474 17.9976 30.5187 17.8707 30.6455C17.7438 30.7724 17.6725 30.9445 17.6725 31.1239C17.6725 31.3033 17.7438 31.4754 17.8707 31.6023C17.9976 31.7292 18.1696 31.8004 18.3491 31.8004H19.1501C19.4301 32.5859 20.1743 33.1535 21.0551 33.1535C21.936 33.1535 22.6801 32.5859 22.9602 31.8004H35.9386C36.118 31.8004 36.2901 31.7292 36.4169 31.6023C36.5438 31.4754 36.6151 31.3033 36.6151 31.1239C36.6151 30.9445 36.5438 30.7724 36.4169 30.6455C36.2901 30.5187 36.118 30.4474 35.9386 30.4474ZM21.0551 31.8004C20.881 31.7926 20.7165 31.718 20.596 31.5919C20.4755 31.4659 20.4082 31.2983 20.4082 31.1239C20.4082 30.9495 20.4755 30.7819 20.596 30.6559C20.7165 30.5299 20.881 30.4552 21.0551 30.4474C21.2293 30.4552 21.3938 30.5299 21.5143 30.6559C21.6348 30.7819 21.7021 30.9495 21.7021 31.1239C21.7021 31.2983 21.6348 31.4659 21.5143 31.5919C21.3938 31.718 21.2293 31.7926 21.0551 31.8004ZM25.7908 24.3959C25.6131 24.3964 25.437 24.3617 25.2727 24.2939C25.1084 24.2261 24.9592 24.1265 24.8335 24.0008C24.7078 23.8752 24.6082 23.7259 24.5404 23.5616C24.4726 23.3973 24.438 23.2213 24.4384 23.0436V18.91C24.4385 18.6692 24.5029 18.4327 24.6249 18.225C24.7469 18.0173 24.9222 17.846 25.1326 17.7287C25.343 17.6114 25.5809 17.5524 25.8217 17.5577C26.0625 17.5631 26.2975 17.6327 26.5025 17.7593L29.8438 19.826C30.2457 20.075 30.4851 20.5046 30.4851 20.9768C30.4851 21.449 30.2457 21.8786 29.8445 22.1276L26.5031 24.195C26.2893 24.3271 26.0428 24.3969 25.7915 24.3966L25.7908 24.3959ZM25.7874 18.9073L25.7908 23.0429L29.1321 20.9761L25.7874 18.9073Z"
                  fill="#2A313D"
                />
                <rect
                  x="3.86015"
                  y="0.394636"
                  width="46.5671"
                  height="46.5671"
                  rx="23.2835"
                  stroke="#F3F3F1"
                  strokeWidth="0.789272"
                />
              </g>
            </g>
            <defs>
              <filter
                id="filter0_d_3872_97267"
                x="0.308427"
                y="-3.15709"
                width="53.6705"
                height="53.6696"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feMorphology
                  radius="0.789272"
                  operator="dilate"
                  in="SourceAlpha"
                  result="effect1_dropShadow_3872_97267"
                />
                <feOffset />
                <feGaussianBlur stdDeviation="1.18391" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0.952941 0 0 0 0 0.952941 0 0 0 0 0.945098 0 0 0 1 0" />
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_3872_97267" />
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_3872_97267" result="shape" />
              </filter>
              <radialGradient
                id="paint0_radial_3872_97267"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(27.1437 23.6782) scale(31.2552 16.1012)"
              >
                <stop stopColor="#F0ECE7" />
                <stop offset="1" stopColor="white" />
              </radialGradient>
              <clipPath id="clip0_3872_97267">
                <rect x="3.46552" width="47.3563" height="47.3563" rx="23.6782" fill="white" />
              </clipPath>
            </defs>
          </svg>
          <span className="text-[#4A4A4A] blog-icon-text text-sm font-medium text-center h-[52px]">موشن جرافيك</span>

          <div className="indicator absolute -bottom-[4.2px] w-20 h-0.5 bg-transparent rounded-full"></div>
        </div>
      </SwiperSlide>

      <SwiperSlide className="swiper-slide">
        <div className="blog-icon-container flex flex-col items-center gap-2 relative">
          <svg
            className="blogs-icon"
            xmlns="http://www.w3.org/2000/svg"
            width="54"
            height="55"
            viewBox="0 0 54 55"
            fill="none"
          >
            <g filter="url(#filter0_d_4060_84910)">
              <g clipPath="url(#clip0_4060_84910)">
                <rect
                  x="3.32178"
                  y="4"
                  width="47.3563"
                  height="47.3563"
                  rx="23.6782"
                  fill="url(#paint0_radial_4060_84910)"
                />
                <path
                  d="M34.9999 32.172C33.8397 32.172 32.8625 32.9692 32.5868 34.0446H32.101C31.8347 34.0446 31.6181 33.828 31.6181 33.5617V30.562H33.5155C35.7073 30.562 37.4905 28.7788 37.4905 26.587C37.4905 24.3951 35.7073 22.612 33.5155 22.612C33.319 22.612 33.1234 22.6266 32.93 22.6552C32.173 20.0448 29.7744 18.2109 27.0003 18.2109C24.2261 18.2109 21.8275 20.0448 21.0705 22.6552C20.8767 22.6264 20.6809 22.612 20.485 22.612C18.2932 22.612 16.51 24.3952 16.51 26.5868C16.51 28.7787 18.2932 30.5618 20.485 30.5618H22.3825V33.5617C22.3825 33.8279 22.1659 34.0446 21.8995 34.0446H21.4137C21.1381 32.9692 20.1609 32.1719 19.0007 32.1719C17.6273 32.172 16.51 33.2894 16.51 34.6628C16.51 36.0361 17.6273 37.1535 19.0007 37.1535C20.1609 37.1535 21.1381 36.3563 21.4137 35.2808H21.8995C22.8474 35.2808 23.6187 34.5096 23.6187 33.5617V30.562H26.3821V32.2498C25.3067 32.5254 24.5096 33.5028 24.5096 34.6628C24.5096 36.0362 25.6269 37.1535 27.0003 37.1535C28.3737 37.1535 29.4909 36.0362 29.4909 34.6628C29.4909 33.5028 28.6936 32.5254 27.6185 32.2498V30.562H30.3819V33.5617C30.3819 34.5096 31.1531 35.2808 32.101 35.2808H32.5868C32.8625 36.3563 33.8397 37.1535 34.9999 37.1535C36.3732 37.1535 37.4905 36.0362 37.4905 34.6628C37.4905 33.2894 36.3732 32.172 34.9999 32.172ZM19.0006 35.9172C18.309 35.9172 17.7462 35.3544 17.7462 34.6627C17.7462 33.9709 18.309 33.4083 19.0006 33.4083C19.6924 33.4083 20.2551 33.9709 20.2551 34.6627C20.2551 35.3544 19.6925 35.9172 19.0006 35.9172ZM28.2547 34.6627C28.2547 35.3544 27.6919 35.9172 27.0002 35.9172C26.3086 35.9172 25.7458 35.3544 25.7458 34.6627C25.7458 33.9709 26.3086 33.4083 27.0002 33.4083C27.6919 33.4083 28.2547 33.9709 28.2547 34.6627ZM17.7462 26.5868C17.7462 25.0768 18.9747 23.8482 20.485 23.8482C20.7752 23.8482 21.0624 23.894 21.3383 23.9845C21.4223 24.012 21.5113 24.0212 21.5991 24.0114C21.687 24.0017 21.7717 23.9732 21.8476 23.9278C21.9236 23.8825 21.9889 23.8214 22.0391 23.7487C22.0894 23.676 22.1235 23.5934 22.1391 23.5063C22.5617 21.1543 24.6061 19.4471 27.0003 19.4471C29.3944 19.4471 31.4388 21.1543 31.8614 23.5063C31.877 23.5934 31.9111 23.676 31.9614 23.7487C32.0117 23.8215 32.077 23.8826 32.1529 23.9279C32.2288 23.9732 32.3135 24.0017 32.4014 24.0115C32.4893 24.0212 32.5782 24.012 32.6622 23.9845C32.9376 23.8941 33.2257 23.8481 33.5155 23.8482C35.0256 23.8482 36.2543 25.0767 36.2543 26.5868C36.2543 28.0971 35.0258 29.3256 33.5155 29.3256H20.485C18.9747 29.3256 17.7462 28.0971 17.7462 26.5868ZM34.9998 35.9173C34.308 35.9173 33.7454 35.3544 33.7454 34.6628C33.7454 33.971 34.308 33.4082 34.9999 33.4082C35.6915 33.4082 36.2543 33.971 36.2543 34.6628C36.2543 35.3545 35.6915 35.9173 34.9999 35.9173H34.9998Z"
                  fill="#2A313D"
                />
                <rect
                  x="3.71641"
                  y="4.39464"
                  width="46.5671"
                  height="46.5671"
                  rx="23.2835"
                  stroke="#F3F3F1"
                  strokeWidth="0.789272"
                />
              </g>
            </g>
            <defs>
              <filter
                id="filter0_d_4060_84910"
                x="0.164689"
                y="0.842912"
                width="53.6705"
                height="53.6696"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feMorphology
                  radius="0.789272"
                  operator="dilate"
                  in="SourceAlpha"
                  result="effect1_dropShadow_4060_84910"
                />
                <feOffset />
                <feGaussianBlur stdDeviation="1.18391" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0.952941 0 0 0 0 0.952941 0 0 0 0 0.945098 0 0 0 1 0" />
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_4060_84910" />
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_4060_84910" result="shape" />
              </filter>
              <radialGradient
                id="paint0_radial_4060_84910"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(26.9999 27.6782) scale(31.2552 16.1012)"
              >
                <stop stopColor="#F0ECE7" />
                <stop offset="1" stopColor="white" />
              </radialGradient>
              <clipPath id="clip0_4060_84910">
                <rect x="3.32178" y="4" width="47.3563" height="47.3563" rx="23.6782" fill="white" />
              </clipPath>
            </defs>
          </svg>
          <span className="text-[#4A4A4A] blog-icon-text text-sm font-medium text-center h-[52px]">استضافة الويب</span>

          <div className="indicator absolute -bottom-[0.2px] w-20 h-0.5 bg-transparent rounded-full"></div>
        </div>
      </SwiperSlide> */}
    </Swiper>
  );
}
