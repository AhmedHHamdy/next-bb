'use client';
import { useState } from "react";
import FAQItem from "./FAQItem";
import { useQuery } from "@tanstack/react-query";
import { FAQItemType } from "@/app/utils/Types";

export default function FAQ({faqs}: {faqs: FAQItemType[]}) {
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
    <section className="relative bg-white py-[48px] md:py-[72px]">
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
    </section>
  );
}