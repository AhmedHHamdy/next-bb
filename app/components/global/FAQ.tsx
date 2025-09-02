'use client';
import { useState } from "react";
import FAQItem from "./FAQItem";
import { useQuery } from "@tanstack/react-query";
import { FAQItemType } from "@/app/utils/Types";
import { Link } from "@/i18n/navigation";

export default function FAQ({faqs, homePageStatus}: {faqs: FAQItemType[], homePageStatus?: boolean}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);



  // // ✅ Fetch function
  // const fetchFAQs = async () => {
  //   const res = await fetch("/api/faqs"); // <-- your API endpoint
  //   if (!res.ok) {
  //     throw new Error("Failed to fetch FAQs");
  //   }
  //   return res.json();
  // };

  // // ✅ Query setup
  // const { data, isLoading, isError } = useQuery({
  //   queryKey: ["faqs"],
  //   queryFn: fetchFAQs,
  // });

  // if (isLoading) {
  //   return (
  //     <section className="py-20 text-center">
  //       <p className="text-gray-500">جاري تحميل الأسئلة...</p>
  //     </section>
  //   );
  // }

  // if (isError) {
  //   return (
  //     <section className="py-20 text-center">
  //       <p className="text-red-500">حدث خطأ أثناء تحميل الأسئلة.</p>
  //     </section>
  //   );
  // }



  return (
    <section className={`relative bg-white ${homePageStatus ? "py-[48px] md:py-[72px]" : "pt-[48px] pb-[64px] md:pb-[100px]"} `}>
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-[29px] md:mb-[59px] px-[15px] md:px-0">
          <h2 className="text-[24px] md:text-[40px] font-bold text-black mb-[12px]">
            الأسئلة الشائعة
          </h2>
          <p className="text-[14px] md:text-[18px] text-[#4A4A4A] font-medium leading-relaxed max-w-3xl mx-auto">
            إذا كانت لديك أي أسئلة أخرى أو تحتاج إلى مزيد من التوضيح حول خدمات
            السيو، لا تتردد في الاطلاع على الإجابات هنا أو التواصل معنا مباشرة.
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
          <span className="text-[16px] font-medium">عرض المزيد</span>
          <svg width="11" height="12" viewBox="0 0 11 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M7.27637 0.637695C7.59612 0.637695 7.86133 0.914793 7.86133 1.24902C7.86677 1.41589 7.79496 1.57124 7.69043 1.68066C7.58568 1.79015 7.44175 1.85938 7.27637 1.85938H2.15918L10.5186 10.5967C10.7443 10.8329 10.7442 11.2247 10.5186 11.4609C10.2925 11.6972 9.91744 11.6971 9.69141 11.4609L1.16797 2.55078V8.24414C1.16797 8.57837 0.903733 8.85547 0.583984 8.85547C0.264241 8.85546 0 8.57837 0 8.24414V1.24902C0 0.914796 0.264241 0.637701 0.583984 0.637695H7.27637Z"
              fill="#FCF4E9"
            />
          </svg>
        </Link>
        </div>}
    </section>
  );
}