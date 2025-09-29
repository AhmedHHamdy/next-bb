"use client";

import { ArticleListResponse, SectionCategory } from "@/app/utils/Types";
import { Link } from "@/i18n/navigation";
import { useQuery } from "@tanstack/react-query";
import { Spin } from "antd";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import BlogsCategories from "./Blogs-Categories";

export default function BlogsTagsPagination({ tagId }: { tagId?: string }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [inputValue, setInputValue] = useState("");

//   const [selectedSectionId, setSelectedSectionId] = useState("");

//   console.log(selectedSectionId, "fg");

  const tError = useTranslations("Errors404");

  const t = useTranslations("Blogs");

  const locale = useLocale();

  const fetchBlogs = async (): Promise<ArticleListResponse> => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/getArticlesByTagId`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          lang: locale,
        },
        body: JSON.stringify({
            tag_id: tagId,
            page: currentPage,
            term: inputValue
        })
      }
    );

    if (!res.ok) {
        // console.log(res)
      if (res.status == 500 || res.status == 502 || res.status == 503 || res.status == 504) {
        throw new Error("Failed to fetch Server issue");
      } else {
        throw new Error("Failed to fetch articles Data");
      }
    }
    return res.json();
  };

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["blogs", locale, currentPage, tagId],
    queryFn: fetchBlogs,
  });

  // console.log(data, "data")

  const totalPages = data?.data?.pagination?.last_page || 1;

  function getPaginationRange(currentPage: number, totalPages: number, siblingCount: number = 1): (number | string)[] {
    const totalPageNumbers = siblingCount * 2 + 5;

    if (totalPages <= totalPageNumbers) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    const showLeftEllipsis = leftSiblingIndex > 2;
    const showRightEllipsis = rightSiblingIndex < totalPages - 1;

    const range: (number | string)[] = [];

    if (!showLeftEllipsis && showRightEllipsis) {
      const leftRange = Array.from({ length: 3 + 2 * siblingCount }, (_, i) => i + 1);
      return [...leftRange, "...", totalPages];
    }

    if (showLeftEllipsis && !showRightEllipsis) {
      const rightRange = Array.from(
        { length: 3 + 2 * siblingCount },
        (_, i) => totalPages - (3 + 2 * siblingCount) + 1 + i
      );
      return [1, "...", ...rightRange];
    }

    if (showLeftEllipsis && showRightEllipsis) {
      const middleRange = Array.from({ length: 2 * siblingCount + 1 }, (_, i) => leftSiblingIndex + i);
      return [1, "...", ...middleRange, "...", totalPages];
    }

    return [];
  }

  function truncateText(text: string = "", maxLength: number): string {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "..."
    }

    return text
  }

  function truncate80(text: string = ""): string {
    return truncateText(text, 80)
  }

  function truncate100(text: string = ""): string {
    return truncateText(text, 100)
  }

  if (isLoading) {
    return (
      <section className="min-h-screen text-center flex items-center justify-center">
        <section className="px-6 pt-[6rem] lg:pt-[8rem] xl:pt-[9rem] text-center">
          <div className="max-w-[1400px] mx-auto flex items-center justify-center">
            <Spin size="large" />
          </div>
        </section>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="px-6 pt-[6rem] lg:pt-[8rem] xl:pt-[9rem] text-center">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col items-center gap-[32px] max-w-[553px] mx-auto">
            <img
              className="w-[200px] h-[169px] md:w-[380px] md:h-[321px]"
              src="/no-article-content.svg"
              alt="error 404 image"
            />

            <div className="flex flex-col items-center gap-2 text-center px-[15px] md:px-0">
              <h1 className="text-black text-[20px] md:text-[24px] font-bold leading-[1.5]">
                {tError("errorLoadingContent")}
              </h1>
              <p className="text-[#4A4A4A] text-[14px] font-medium leading-[1.43]">
                {tError("sorryTemporaryProblem")}
              </p>
            </div>

            <button
              onClick={() => refetch()}
              className="bg-[#EDA133] text-white w-[181px] py-2 rounded-lg font-medium text-[16px] leading-[1.5] hover:bg-[#D1912A] transition-colors"
            >
              {tError("refreshPage")}
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="flex items-center justify-center">
        <div className="w-full lg:w-[439px] px-[15px] xl:px-0">
          <div className="relative">
            <div className="flex items-center justify-between bg-white border border-[#DADADA] rounded-lg pe-[8px] py-3 h-14">
              <form
                className="flex items-center gap-3 flex-1 ps-[16px]"
                onSubmit={(e) => {
                  e.preventDefault();
                  refetch();
                }}
              >
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={t("searchByBlogName")}
                  className="flex-1 bg-transparent border-none outline-none text-[#4A4A4A] placeholder-[#4A4A4A] text-sm font-medium"
                />
                <div onClick={() => refetch()} className="cursor-pointer">
                  <img src="/search-icon.svg"  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      <div className="flex flex-col-reverse lg:flex-row justify-between items-start lg:items-center gap-6 mb-[32px] md:border-b-2 md:border-[#F0ECE7] md:pb-[22px]">
        <div className="hidden md:flex flex-wrap gap-[32px] lg:gap-y-[40px] xl:gap-6 px-[15px] xl:px-0">
          {/* <div
            onClick={() => setSelectedSectionId("")}
            className={`${
              selectedSectionId == "" ? "blog-icon-container" : ""
            } flex flex-col items-center gap-2 relative cursor-pointer`}
          >
            <svg
              className="blogs-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="69"
              height="68"
              viewBox="0 0 69 68"
              fill="none"
            >
              <g filter="url(#filter0_d_4060_84905)">
                <g clipPath="url(#clip0_4060_84905)">
                  <rect x="4.5" y="4" width="60" height="60" rx="30" fill="url(#paint0_radial_4060_84905)" />
                  <path
                    d="M30.7871 22H25.2754C23.745 22 22.5 23.245 22.5 24.7754V30.2871C22.5 31.8175 23.745 33.0625 25.2754 33.0625H30.7871C32.3175 33.0625 33.5625 31.8175 33.5625 30.2871V24.7754C33.5625 23.245 32.3175 22 30.7871 22ZM31.6875 30.2871C31.6875 30.7836 31.2836 31.1875 30.7871 31.1875H25.2754C24.7789 31.1875 24.375 30.7836 24.375 30.2871V24.7754C24.375 24.2789 24.7789 23.875 25.2754 23.875H30.7871C31.2836 23.875 31.6875 24.2789 31.6875 24.7754V30.2871ZM43.6875 22H38.25C36.6992 22 35.4375 23.2617 35.4375 24.8125V30.25C35.4375 31.8008 36.6992 33.0625 38.25 33.0625H43.6875C45.2383 33.0625 46.5 31.8008 46.5 30.25V24.8125C46.5 23.2617 45.2383 22 43.6875 22ZM44.625 30.25C44.625 30.7669 44.2044 31.1875 43.6875 31.1875H38.25C37.7331 31.1875 37.3125 30.7669 37.3125 30.25V24.8125C37.3125 24.2956 37.7331 23.875 38.25 23.875H43.6875C44.2044 23.875 44.625 24.2956 44.625 24.8125V30.25ZM30.7871 34.9375H25.2754C23.745 34.9375 22.5 36.1825 22.5 37.7129V43.2246C22.5 44.755 23.745 46 25.2754 46H30.7871C32.3175 46 33.5625 44.755 33.5625 43.2246V37.7129C33.5625 36.1825 32.3175 34.9375 30.7871 34.9375ZM31.6875 43.2246C31.6875 43.7211 31.2836 44.125 30.7871 44.125H25.2754C24.7789 44.125 24.375 43.7211 24.375 43.2246V37.7129C24.375 37.2164 24.7789 36.8125 25.2754 36.8125H30.7871C31.2836 36.8125 31.6875 37.2164 31.6875 37.7129V43.2246ZM43.6875 34.9375H38.25C36.6992 34.9375 35.4375 36.1992 35.4375 37.75V43.1875C35.4375 44.7383 36.6992 46 38.25 46H43.6875C45.2383 46 46.5 44.7383 46.5 43.1875V37.75C46.5 36.1992 45.2383 34.9375 43.6875 34.9375ZM44.625 43.1875C44.625 43.7044 44.2044 44.125 43.6875 44.125H38.25C37.7331 44.125 37.3125 43.7044 37.3125 43.1875V37.75C37.3125 37.2331 37.7331 36.8125 38.25 36.8125H43.6875C44.2044 36.8125 44.625 37.2331 44.625 37.75V43.1875Z"
                    fill="#2A313D"
                  />
                  <rect x="5" y="4.5" width="59" height="59" rx="29.5" stroke="#F3F3F1" />
                </g>
              </g>
              <defs>
                <filter
                  id="filter0_d_4060_84905"
                  x="0.5"
                  y="0"
                  width="68"
                  height="68"
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
                  <feMorphology radius="1" operator="dilate" in="SourceAlpha" result="effect1_dropShadow_4060_84905" />
                  <feOffset />
                  <feGaussianBlur stdDeviation="1.5" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix type="matrix" values="0 0 0 0 0.952941 0 0 0 0 0.952941 0 0 0 0 0.945098 0 0 0 1 0" />
                  <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_4060_84905" />
                  <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_4060_84905" result="shape" />
                </filter>
                <radialGradient
                  id="paint0_radial_4060_84905"
                  cx="0"
                  cy="0"
                  r="1"
                  gradientUnits="userSpaceOnUse"
                  gradientTransform="translate(34.5 34) scale(39.6 20.4)"
                >
                  <stop stopColor="#F0ECE7" />
                  <stop offset="1" stopColor="white" />
                </radialGradient>
                <clipPath id="clip0_4060_84905">
                  <rect x="4.5" y="4" width="60" height="60" rx="30" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <span className="blog-icon-text text-[#4A4A4A] text-sm font-medium">الكل</span>
            <div className="indicator absolute -bottom-6 w-20 h-0.5 bg-transparent rounded-full"></div>
          </div>

          {sectionsData.map((section) => {
            return (
              <div
                onClick={() => setSelectedSectionId(String(section.id))}
                key={section.id}
                className={`${
                  String(section.id) == selectedSectionId ? "blog-icon-container" : ""
                } flex flex-col cursor-pointer items-center gap-2 relative`}
              >
                <svg
                  className="blogs-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  width="69"
                  height="68"
                  viewBox="0 0 69 68"
                  fill="none"
                >
                  <g filter="url(#filter0_d_3872_97201)">
                    <g clipPath="url(#clip0_3872_97201)">
                      <rect x="4.5" y="4" width="60" height="60" rx="30" fill="url(#paint0_radial_3872_97201)" />
                      <path
                        d="M43.4521 31.4622L35.4992 23.5092C34.677 22.687 33.3391 22.687 32.5168 23.5092C31.7777 24.2483 31.7141 25.3755 32.2599 26.1804L32.2488 26.2358C31.6754 29.1029 30.2795 31.7112 28.2119 33.7788L24.5641 37.4266C23.74 38.2508 23.7398 39.5847 24.5641 40.4089L26.5523 42.3971C27.3764 43.2212 28.7104 43.2213 29.5346 42.3971L30.0317 41.9L33.511 45.3794C34.3352 46.2036 35.6691 46.2036 36.4933 45.3794C37.3155 44.5572 37.3155 43.2193 36.4933 42.3971L35.0021 40.906L35.4992 40.4089C36.3234 39.5848 36.3235 38.2509 35.4992 37.4267L35.1614 37.0888C36.8231 35.9254 38.7102 35.1155 40.7256 34.7124L40.7816 34.7012C41.6044 35.2567 42.729 35.1674 43.4521 34.4444H43.4521C44.2742 33.6222 44.2742 32.2844 43.4521 31.4622ZM28.5405 41.403C28.2658 41.6776 27.8211 41.6777 27.5464 41.4029L25.5582 39.4148C25.2835 39.14 25.2835 38.6954 25.5582 38.4207L29.0375 34.9413L32.0198 37.9236L28.5405 41.403ZM35.4992 43.3912C35.7732 43.6652 35.7732 44.1112 35.4992 44.3852C35.2251 44.6593 34.7791 44.6593 34.5051 44.3852L31.0257 40.9059L32.0198 39.9118L35.4992 43.3912ZM33.0139 38.9177C33.2252 38.7064 33.5415 38.3827 34.0408 37.9563L34.5051 38.4207C34.7798 38.6954 34.7798 39.14 34.5051 39.4148L34.008 39.9118L33.0139 38.9177ZM33.0438 36.9595L30.0017 33.9173C31.6319 32.0349 32.7994 29.8127 33.424 27.3987L39.5624 33.5371C37.1484 34.1617 34.9263 35.3291 33.0438 36.9595ZM42.4578 33.4502C42.1831 33.7249 41.7385 33.7249 41.4638 33.4502L33.5109 25.4974C33.2362 25.2226 33.2362 24.7781 33.5109 24.5033C33.7857 24.2286 34.2303 24.2286 34.5051 24.5033L42.4578 32.4561C42.7319 32.7302 42.7319 33.1761 42.4578 33.4502Z"
                        fill="#2A313D"
                      />
                      <path
                        d="M29.5345 37.4272C29.2601 37.1527 28.8149 37.1527 28.5404 37.4272L27.5464 38.4213C27.2719 38.6958 27.2719 39.1409 27.5464 39.4154C27.8208 39.6899 28.266 39.6899 28.5404 39.4154L29.5345 38.4213C29.809 38.1468 29.809 37.7017 29.5345 37.4272ZM38.7276 21.998C38.3394 21.998 38.0247 22.3128 38.0247 22.701V24.1069C38.0247 24.4951 38.3394 24.8098 38.7276 24.8098C39.1158 24.8098 39.4306 24.4951 39.4306 24.1069V22.701C39.4306 22.3128 39.1158 21.998 38.7276 21.998ZM44.3511 27.6215H42.9452C42.557 27.6215 42.2423 27.9362 42.2423 28.3244C42.2423 28.7127 42.557 29.0274 42.9452 29.0274H44.3511C44.7393 29.0274 45.0541 28.7127 45.0541 28.3244C45.0541 27.9362 44.7393 27.6215 44.3511 27.6215ZM43.4423 23.6098C43.1678 23.3353 42.7227 23.3353 42.4482 23.6098L41.0423 25.0156C40.7678 25.2901 40.7678 25.7352 41.0423 26.0097C41.3168 26.2842 41.7619 26.2843 42.0364 26.0097L43.4423 24.6038C43.7168 24.3293 43.7168 23.8843 43.4423 23.6098Z"
                        fill="#2A313D"
                      />
                      <rect x="5" y="4.5" width="59" height="59" rx="29.5" stroke="#F3F3F1" />
                    </g>
                  </g>
                  <defs>
                    <filter
                      id="filter0_d_3872_97201"
                      x="0.5"
                      y="0"
                      width="68"
                      height="68"
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
                        radius="1"
                        operator="dilate"
                        in="SourceAlpha"
                        result="effect1_dropShadow_3872_97201"
                      />
                      <feOffset />
                      <feGaussianBlur stdDeviation="1.5" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0.952941 0 0 0 0 0.952941 0 0 0 0 0.945098 0 0 0 1 0"
                      />
                      <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_3872_97201" />
                      <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_3872_97201" result="shape" />
                    </filter>
                    <radialGradient
                      id="paint0_radial_3872_97201"
                      cx="0"
                      cy="0"
                      r="1"
                      gradientUnits="userSpaceOnUse"
                      gradientTransform="translate(34.5 34) scale(39.6 20.4)"
                    >
                      <stop stopColor="#F0ECE7" />
                      <stop offset="1" stopColor="white" />
                    </radialGradient>
                    <clipPath id="clip0_3872_97201">
                      <rect x="4.5" y="4" width="60" height="60" rx="30" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <span className="blog-icon-text text-[#4A4A4A] text-sm font-medium">{section.name}</span>

                <div className="indicator absolute -bottom-6 w-20 h-0.5 bg-transparent rounded-full"></div>
              </div>
            );
          })} */}
        </div>

        {/* <section className="block md:hidden w-full px-[10px] xl:px-0 pb-[0px] border-b-2 border-[#F0ECE7]">
          <BlogsCategories
            sectionsData={sectionsData}
            setSelectedSection={(value) => setSelectedSectionId(value)}
            selectedSectionId={selectedSectionId}
          />
        </section> */}


      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-[24px] md:gap-x-[20px] md:gap-y-[32px] px-[15px] xl:px-0">
        {data?.data?.data &&
          data?.data?.data?.map((article) => {
            return (
              <Link key={article.id} href={`/blogs/${locale == "en" ? article?.slug?.en : article?.slug?.ar}`}>
                <div className="bg-white pb-[24px] xl:pb-0 h-full 2xl:h-[445px] border border-[#DADADA] rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
                  <div className="relative">
                    <div
                      className="w-full h-[206px] lg:h-64 bg-no-repeat rounded-t-lg bg-cover"
                      style={{ backgroundImage: `url(${article?.image?.url})` }}
                    ></div>
                  </div>
                  <div className="px-[13px] pt-[11px]">
                    <div className="flex flex-wrap gap-x-[54px] gap-y-[16px] xl:gap-0 xl:nowrap md:justify-between items-center">
                      <div className="flex items-center gap-1 text-gray-500 text-sm">
                        <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M8.5862 2.99493C8.5862 2.02206 9.37484 1.2334 10.3477 1.2334H11.5672C12.5401 1.2334 13.3288 2.02206 13.3288 2.99493V4.21446C13.3288 5.18732 12.5401 5.97597 11.5672 5.97597H8.5862V2.99493ZM8.5862 8.82155H11.5672C12.5401 8.82155 13.3288 9.61019 13.3288 10.5831V11.8026C13.3288 12.7754 12.5401 13.5641 11.5672 13.5641H10.3477C9.37484 13.5641 8.5862 12.7754 8.5862 11.8026V8.82155ZM0.998047 2.99493C0.998047 2.02206 1.78671 1.2334 2.75958 1.2334H3.97911C4.95197 1.2334 5.74062 2.02206 5.74062 2.99493V5.97597H2.75958C1.78671 5.97597 0.998047 5.18733 0.998047 4.21446V2.99493ZM0.998047 10.5831C0.998047 9.61019 1.78671 8.82155 2.75958 8.82155H5.74062V11.8026C5.74062 12.7754 4.95197 13.5641 3.97911 13.5641H2.75958C1.78671 13.5641 0.998047 12.7754 0.998047 11.8026V10.5831Z"
                            stroke="#8B8B8B"
                            strokeWidth="1.3214"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span className="text-[#B1B1B1] text-[14px] font-medium">{article?.section_name}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-500 text-sm">
                        <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M14.1865 0.44043C14.5317 0.44043 14.8115 0.720252 14.8115 1.06543V1.5957C15.482 1.78579 16.0479 2.09368 16.5186 2.60254C17.1666 3.30328 17.4548 4.18842 17.5928 5.29785C17.728 6.38515 17.7285 7.77874 17.7285 9.55664V10.0732C17.7285 11.8512 17.728 13.2447 17.5928 14.332C17.4548 15.4417 17.1668 16.3275 16.5186 17.0283C15.864 17.7359 15.026 18.0565 13.9775 18.209C12.9626 18.3565 11.6655 18.3565 10.0293 18.3564H8.34375C6.70756 18.3565 5.41044 18.3565 4.39551 18.209C3.347 18.0565 2.50905 17.7359 1.85449 17.0283C1.20623 16.3275 0.918274 15.4417 0.780274 14.332C0.645065 13.2447 0.644522 11.8512 0.644531 10.0732V9.55664C0.644522 7.77874 0.645054 6.38515 0.780274 5.29785C0.918267 4.18842 1.20643 3.30328 1.85449 2.60254C2.32519 2.09368 2.89108 1.78579 3.56152 1.5957V1.06543C3.56152 0.720252 3.84135 0.44043 4.18652 0.44043C4.5317 0.44043 4.81152 0.720252 4.81152 1.06543V1.37012C5.75814 1.27352 6.92294 1.27342 8.34375 1.27344H10.0293C11.4501 1.27342 12.6149 1.27352 13.5615 1.37012V1.06543C13.5615 0.720252 13.8413 0.44043 14.1865 0.44043ZM8.39453 2.52344C6.83823 2.52344 5.69566 2.52637 4.81152 2.62891V2.73145C4.81152 3.07662 4.5317 3.35645 4.18652 3.35645C3.90141 3.35645 3.66296 3.16526 3.58789 2.9043C3.24756 3.03943 2.98896 3.21712 2.77246 3.45117C2.37731 3.87837 2.14337 4.46434 2.02051 5.45215C1.896 6.45335 1.89453 7.76964 1.89453 9.60156V10.0293C1.89453 11.861 1.89602 13.1766 2.02051 14.1777C2.14337 15.1656 2.37729 15.7525 2.77246 16.1797C3.16119 16.5997 3.68496 16.8431 4.57617 16.9727C5.49082 17.1055 6.69657 17.1064 8.39453 17.1064H9.97852C11.6765 17.1064 12.8822 17.1055 13.7969 16.9727C14.6881 16.8431 15.2119 16.5997 15.6006 16.1797C15.9958 15.7525 16.2297 15.1656 16.3525 14.1777C16.477 13.1766 16.4785 11.861 16.4785 10.0293V9.60156C16.4785 7.76964 16.4771 6.45335 16.3525 5.45215C16.2297 4.46434 15.9957 3.87837 15.6006 3.45117C15.3839 3.21693 15.1249 3.03947 14.7842 2.9043C14.709 3.16513 14.4715 3.35645 14.1865 3.35645C13.8413 3.35645 13.5615 3.07662 13.5615 2.73145V2.62891C12.6774 2.52637 11.5348 2.52344 9.97852 2.52344H8.39453ZM7.26562 9.60645C7.82413 9.60661 8.14453 10.0943 8.14453 10.5215V13.5654C8.14436 13.9105 7.8646 14.1904 7.51953 14.1904C7.17461 14.1903 6.89471 13.9103 6.89453 13.5654V10.8564H6.68652C6.34135 10.8564 6.06152 10.5766 6.06152 10.2314C6.0617 9.88642 6.34145 9.60645 6.68652 9.60645H7.26562ZM11.4541 9.60645C11.9923 9.60667 12.4833 10.1376 12.2598 10.7402L11.1309 13.7822C11.0108 14.1058 10.6507 14.2714 10.3271 14.1514C10.0035 14.0313 9.83891 13.6713 9.95898 13.3477L10.8828 10.8564H10.0195C9.6745 10.8563 9.39453 10.5765 9.39453 10.2314C9.39471 9.88653 9.67461 9.60662 10.0195 9.60645H11.4541ZM14.1865 5.44043C14.5317 5.44043 14.8115 5.72025 14.8115 6.06543C14.8113 6.41046 14.5316 6.69043 14.1865 6.69043H4.18652C3.84145 6.69043 3.5617 6.41046 3.56152 6.06543C3.56152 5.72025 3.84135 5.44043 4.18652 5.44043H14.1865Z"
                            fill="#888C93"
                          />
                        </svg>
                        <span className="text-[#B1B1B1] text-[14px] font-medium">{article?.published_at}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-500 text-sm">
                        <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M10.208 5.60645C12.35 5.60645 14.1861 6.54963 15.6075 7.65918C17.03 8.76972 18.0817 10.0814 18.67 10.9062C18.6845 10.9266 18.7 10.947 18.7149 10.9678C18.9258 11.2612 19.1661 11.5969 19.1661 12.0654C19.1659 12.5337 18.9258 12.8688 18.7149 13.1621C18.6999 13.1829 18.6845 13.2032 18.67 13.2236C18.0817 14.0484 17.0301 15.3601 15.6075 16.4707C14.1861 17.5803 12.3501 18.5234 10.208 18.5234C8.06596 18.5234 6.22998 17.5803 4.80863 16.4707C3.38598 15.3601 2.33434 14.0484 1.74613 13.2236C1.73158 13.2032 1.71616 13.1829 1.70121 13.1621C1.49032 12.8688 1.25015 12.5337 1.25004 12.0654C1.25004 11.5969 1.49025 11.2612 1.70121 10.9678C1.71615 10.947 1.73159 10.9266 1.74613 10.9062C2.33436 10.0814 3.38608 8.76975 4.80863 7.65918C6.22996 6.54961 8.06604 5.60647 10.208 5.60645ZM10.208 6.85645C8.44253 6.85647 6.87093 7.63452 5.57719 8.64453C4.28494 9.65343 3.31387 10.8604 2.76371 11.6318C2.62774 11.8225 2.56308 11.9161 2.52445 11.9902C2.49991 12.0374 2.49997 12.0508 2.50004 12.0635V12.0674C2.49997 12.0799 2.50011 12.0929 2.52445 12.1396C2.56307 12.2138 2.62761 12.3072 2.76371 12.498C3.31382 13.2694 4.2849 14.4764 5.57719 15.4854C6.87093 16.4954 8.44253 17.2734 10.208 17.2734C11.9736 17.2734 13.5451 16.4954 14.8389 15.4854C16.1312 14.4764 17.1022 13.2695 17.6524 12.498C17.7885 12.3072 17.853 12.2138 17.8916 12.1396C17.916 12.0928 17.9161 12.08 17.9161 12.0674V12.0635C17.9161 12.0508 17.9162 12.0374 17.8916 11.9902C17.853 11.9161 17.7883 11.8224 17.6524 11.6318C17.1022 10.8604 16.1312 9.65341 14.8389 8.64453C13.5451 7.63451 11.9736 6.85645 10.208 6.85645ZM10.208 8.94043C11.9339 8.94043 13.333 10.3395 13.333 12.0654C13.3329 13.7912 11.9338 15.1904 10.208 15.1904C8.4823 15.1904 7.08322 13.7911 7.08305 12.0654C7.08305 10.3396 8.48219 8.94047 10.208 8.94043ZM10.208 10.1904C9.17255 10.1905 8.33305 11.0299 8.33305 12.0654C8.33322 13.1008 9.17266 13.9404 10.208 13.9404C11.2435 13.9404 12.0829 13.1008 12.083 12.0654C12.083 11.0299 11.2436 10.1904 10.208 10.1904ZM10.208 2.27344C12.6911 2.27344 14.9006 3.39329 16.4561 4.46777C17.2396 5.00902 17.8733 5.54914 18.3116 5.95508C18.531 6.15833 18.7017 6.32942 18.8194 6.4502C18.878 6.51036 18.9237 6.5581 18.9551 6.5918C18.9708 6.60866 18.9836 6.62241 18.9922 6.63184L19.002 6.64258L19.0049 6.64648L19.0069 6.64746C19.0069 6.6478 18.9975 6.65672 18.5411 7.06543L19.0069 6.64844C19.2371 6.90558 19.2151 7.30002 18.958 7.53027C18.701 7.76041 18.3065 7.73919 18.0762 7.48242L18.0752 7.48145L18.0694 7.47461C18.0636 7.46827 18.0538 7.45799 18.0411 7.44434C18.0156 7.41705 17.9768 7.37557 17.9248 7.32227C17.8206 7.21523 17.664 7.06027 17.462 6.87305C17.0569 6.49779 16.4695 5.99641 15.7452 5.49609C14.2846 4.48728 12.3273 3.52344 10.208 3.52344C8.08882 3.52346 6.13145 4.48727 4.67094 5.49609C3.94662 5.99641 3.35924 6.49779 2.95414 6.87305C2.75208 7.06024 2.59552 7.21525 2.49125 7.32227C2.43931 7.37558 2.40047 7.41706 2.37504 7.44434C2.36231 7.45799 2.35251 7.46827 2.34672 7.47461L2.34086 7.48145V7.48242C2.11055 7.7392 1.71507 7.76042 1.45805 7.53027C1.20104 7.30003 1.1791 6.90555 1.40922 6.64844L1.41117 6.64648L1.4141 6.64258L1.42387 6.63184C1.43247 6.62241 1.44526 6.60866 1.46098 6.5918C1.49239 6.5581 1.53806 6.5104 1.59672 6.4502C1.7144 6.32941 1.88508 6.15836 2.10453 5.95508C2.54275 5.54914 3.17646 5.00903 3.96 4.46777C5.51552 3.3933 7.725 2.27346 10.208 2.27344Z"
                            fill="#8B8B8B"
                          />
                        </svg>
                        <span className="text-[#B1B1B1] text-[14px] font-medium">{article?.views}</span>
                      </div>
                    </div>
                    <h3 className="text-[14px] md:text-[20px] font-bold text-black my-[16px] md:my-[8px]">
                      {truncate80(article?.title)}
                    </h3>
                    <p className="text-[#393939] font-medium text-[12px] md:text-[16px] leading-relaxed">
                      {truncate100(article?.short_description)}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
      </div>

      <div className="flex justify-center gap-2 mt-6">
        {/* Prev Button */}
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          className="border border-[#131A27] rounded-[8px] h-[44px] w-[44px] flex justify-center items-center cursor-pointer disabled:opacity-50"
        >
          <img className="rtl:block ltr:hidden" src="/pagination-arrow-right.svg"  />

          <img className="rtl:hidden ltr:block" src="/pagination-arrow-left.svg"  />
        </button>

        {/* Page Numbers with Ellipsis */}
        {getPaginationRange(currentPage, totalPages).map((page, idx) =>
          page === "..." ? (
            <span
              key={idx}
              className="border border-[#131A27] rounded-[8px] h-[44px] w-[44px] flex justify-center items-center"
            >
              ...
            </span>
          ) : (
            <button
              key={page}
              onClick={() => setCurrentPage(page as number)}
              className={`border border-[#131A27] rounded-[8px] h-[44px] w-[44px] flex justify-center items-center font-bold transition ${
                currentPage === page ? "bg-[#131A27] text-white" : "hover:bg-[#131A27] hover:text-white"
              }`}
            >
              {page}
            </button>
          )
        )}

        {/* Next Button */}
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          className="border border-[#131A27] rounded-[8px] h-[44px] w-[44px] flex justify-center items-center cursor-pointer disabled:opacity-50"
        >
          <img className="rtl:block ltr:hidden" src="/pagination-arrow-left.svg"  />

          <img className="rtl:hidden ltr:block" src="/pagination-arrow-right.svg"  />
        </button>
      </div>
    </>
  );
}
