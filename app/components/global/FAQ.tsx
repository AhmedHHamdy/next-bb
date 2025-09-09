'use client';
import { useState } from "react";
import FAQItem from "./FAQItem";
import { useQuery } from "@tanstack/react-query";
import { FAQItemType } from "@/app/utils/Types";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export default function FAQ({faqs, homePageStatus}: {faqs: FAQItemType[], homePageStatus?: boolean}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const t = useTranslations("HomePage");

  return (
    <section className={`relative bg-white ${homePageStatus ? "py-[48px] md:py-[72px]" : "pt-[48px] pb-[64px] md:pb-[100px]"} `}>
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-[29px] md:mb-[59px] px-[15px] md:px-0">
          <h2 className="text-[24px] md:text-[40px] font-bold text-black mb-[12px]">
            {t("popularFaq")}
          </h2>
          <p className="text-[14px] md:text-[18px] text-[#4A4A4A] font-medium leading-relaxed max-w-3xl mx-auto">
            {t("faqDescription")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-[15px] 2xl:px-0">
          {faqs.map((faq, index) => (
            <FAQItem
              key={faq.id}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() =>
                setOpenIndex(openIndex === index ? null : index)
              }
            />
          ))}
        </div>
      </div>

      {homePageStatus && <div className="flex items-center justify-center mt-[48px]">
        <Link
          href="/faq"
          className="bg-[#EDA133] flex items-center justify-center gap-4 hover:bg-[#D1912A] w-[229px] h-[56px] text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 "
        >
          <span className="text-[16px] font-medium">{t("seeMore")}</span>
          <svg className="rtl:block ltr:hidden" width="11" height="12" viewBox="0 0 11 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M7.27637 0.637695C7.59612 0.637695 7.86133 0.914793 7.86133 1.24902C7.86677 1.41589 7.79496 1.57124 7.69043 1.68066C7.58568 1.79015 7.44175 1.85938 7.27637 1.85938H2.15918L10.5186 10.5967C10.7443 10.8329 10.7442 11.2247 10.5186 11.4609C10.2925 11.6972 9.91744 11.6971 9.69141 11.4609L1.16797 2.55078V8.24414C1.16797 8.57837 0.903733 8.85547 0.583984 8.85547C0.264241 8.85546 0 8.57837 0 8.24414V1.24902C0 0.914796 0.264241 0.637701 0.583984 0.637695H7.27637Z"
              fill="#FCF4E9"
            />
          </svg>

          <svg className="rtl:hidden ltr:block" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.5 7.77686C11.5 8.0966 11.2229 8.36182 10.8887 8.36182C10.7218 8.36726 10.5665 8.29544 10.457 8.19092C10.3475 8.08617 10.2783 7.94224 10.2783 7.77686L10.2783 2.65967L1.54102 11.019C1.30482 11.2448 0.912974 11.2447 0.676757 11.019C0.440512 10.793 0.440555 10.4179 0.676757 10.1919L9.58691 1.66846L3.89355 1.66846C3.55932 1.66846 3.28223 1.40422 3.28223 1.08447C3.28223 0.764729 3.55933 0.500488 3.89355 0.500488L10.8887 0.500488C11.2229 0.500488 11.5 0.764729 11.5 1.08447L11.5 7.77686Z" fill="#FCF4E9"/>
          </svg>

        </Link>
        </div>}
    </section>
  );
}