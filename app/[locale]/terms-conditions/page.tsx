'use client';

import { PolicyPages } from "@/app/utils/Types";
import { Link } from "@/i18n/navigation";
import { useQuery } from "@tanstack/react-query";
import { Spin } from "antd";
import { useLocale } from "next-intl";

export default function Page() {

  const locale = useLocale();

  const fetchTerms = async (): Promise<PolicyPages> => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/getTermsAndConditionsPage`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          lang: locale,
        },
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch website settings");
    }
    return res.json();
  };

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["termsConditions", locale], // include locale in key
    queryFn: fetchTerms,
  });


  if (isLoading) {
    return (
      <section className="min-h-screen text-center flex items-center justify-center">
        <section className="px-6 pt-[6rem] lg:pt-[8rem] xl:pt-[9rem] text-center">
          <div className="max-w-[1400px] mx-auto flex items-center justify-center">
            <Spin size="large"/>
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
            <img className="w-[202px] h-[169px] md:w-[352px] md:h-[321px]" src="/error404.svg" alt="error 404 image" />

            <div className="flex flex-col items-center gap-2 text-center px-[15px] md:px-0">
              <h1 className="text-black text-[20px] md:text-[24px] font-bold leading-[1.5]">
                حدث خطأ أثناء تحميل المحتوى
              </h1>
              <p className="text-[#4A4A4A] text-[14px] font-medium leading-[1.43]">
                عذرًا، واجهنا مشكلة مؤقتة. يرجى تحديث الصفحة أو المحاولة لاحقًا.
              </p>
            </div>

            <button onClick={() => refetch()} className="bg-[#EDA133] text-white w-[181px] py-2 rounded-lg font-medium text-[16px] leading-[1.5] hover:bg-[#D1912A] transition-colors">
              تحديث الصفحة
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div className="w-full bg-white px-6 pt-[6rem] lg:pt-[8rem] xl:pt-[9rem]">
      <div className="max-w-[1400px] mx-auto xl:px-[24px]">
        <div className="flex items-center gap-2">
          <Link href="/" className="text-[#8B8B8B] text-[15px] font-medium leading-[1.65]">
            الرئيسية
          </Link>
          <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10.0603 14.281C10.1869 14.281 10.3136 14.2343 10.4136 14.1343C10.6069 13.941 10.6069 13.621 10.4136 13.4277L6.06693 9.08099C5.74693 8.76099 5.74693 8.24099 6.06693 7.92099L10.4136 3.57432C10.6069 3.38099 10.6069 3.06099 10.4136 2.86766C10.2203 2.67432 9.90026 2.67432 9.70693 2.86766L5.36026 7.21432C5.02026 7.55432 4.82693 8.01432 4.82693 8.50099C4.82693 8.98766 5.01359 9.44766 5.36026 9.78766L9.70693 14.1343C9.80693 14.2277 9.93359 14.281 10.0603 14.281Z"
              fill="#8B8B8B"
            />
          </svg>

          <Link href="/terms-conditions" className="text-black text-[15px] font-medium leading-[1.65]">
            الشروط والأحكام
          </Link>
        </div>
      </div>

      <div className="w-full bg-white px-6 pt-[20px] pb-[64px] md:pb-[100px] md:pt-[36px]">
        <div className="max-w-[1300px] mx-auto">
          <div className="flex flex-col lg:flex-row gap-11">
            <div className="block md:w-[290px] flex-shrink-0 border border-[#DADADA] h-full p-[16px] pb-[32px] rounded-[8px]">
              <h3 className="text-[16px] text-[#4A4A4A] font-medium">محتوى الشروط والأحكام</h3>

              <hr className="my-[16px] text-[#DADADA]" />

              <div className="space-y-[0px] md:space-y-[14px] border-s-6 border-[#E7E8E9] ps-0">
                <a
                  href="#agreement"
                  className="block text-base font-medium hover:text-[#EDA133] leading-[1.5] flex gap-2 border-s-6 -ms-[6px] border-[#E7E8E9] hover:border-[#EDA133] ps-[16px] py-[10px]"
                >
                  الموافقة على الشروط{" "}
                </a>
                <a
                  href="#services"
                  className="block text-base font-medium hover:text-[#EDA133] leading-[1.5] flex gap-2 border-s-6 -ms-[6px] border-[#E7E8E9] hover:border-[#EDA133] ps-[16px] py-[10px]"
                >
                  الخدمات المقدمة
                </a>
                <a
                  href="#intellectual-property"
                  className="block text-base font-medium hover:text-[#EDA133] leading-[1.5] flex gap-2 border-s-4 -ms-[6px] border-[#E7E8E9] hover:border-[#EDA133] ps-[16px] py-[10px]"
                >
                  حقوق الملكية الفكرية
                </a>
                <a
                  href="#payment"
                  className="block text-base font-medium hover:text-[#EDA133] leading-[1.5] flex gap-2 border-s-6 -ms-[6px] border-[#E7E8E9] hover:border-[#EDA133] ps-[16px] py-[10px]"
                >
                  الدفع والتعاقد
                </a>
                <a
                  href="#cancellation"
                  className="block text-base font-medium hover:text-[#EDA133] leading-[1.5] flex gap-2 border-s-6 -ms-[6px] border-[#E7E8E9] hover:border-[#EDA133] ps-[16px] py-[10px]"
                >
                  سياسة الإلغاء والاسترجاع
                </a>
                <a
                  href="#modification"
                  className="block text-base font-medium hover:text-[#EDA133] leading-[1.5] flex gap-2 border-s-6 -ms-[6px] border-[#E7E8E9] hover:border-[#EDA133] ps-[16px] py-[10px]"
                >
                  تعديل الشروط والأحكام
                </a>
                <a
                  href="#privacy"
                  className="block text-base font-medium hover:text-[#EDA133] leading-[1.5] flex gap-2 border-s-6 -ms-[6px] border-[#E7E8E9] hover:border-[#EDA133] ps-[16px] py-[10px]"
                >
                  الخصوصية وسرية المعلومات
                </a>
                <a
                  href="#liability"
                  className="block text-base font-medium hover:text-[#EDA133] leading-[1.5] flex gap-2 border-s-6 -ms-[6px] border-[#E7E8E9] hover:border-[#EDA133] ps-[16px] py-[10px]"
                >
                  حدود المسؤولية
                </a>
              </div>
            </div>

            <div className="flex-1">
              <div className="space-y-[24px]">
                <img
                  className="hidden md:inline h-[200px] w-[343px] md:h-[234px] rounded-2xl md:w-full brightness-80"
                  src="/Terms and Conditions.png"
                  alt="terms and conditions image"
                />
                <img
                  className="md:hidden h-[200px] w-full rounded-2xl object-cover"
                  src="/terms-mobile.png"
                  alt="terms and conditions image"
                />

                <div className="space-y-[32px] md:space-y-[24px]">
                  <div id="agreement" className="space-y-3">
                    <h2 className="text-[18px] md:text-[20px] font-bold text-black">{data?.data?.title?.slice(0, 80)}</h2>
                    <p dangerouslySetInnerHTML={{__html: String(data?.data?.content || "")}} className="text-[16px] font-medium text-[#4A4A4A] leading-[1.5]">
                      {/* {data?.data?.content} */}
                    </p>
                  </div>


  

                  {/* <div id="services" className="space-y-3">
                    <h2 className="text-[18px] md:text-[20px] font-bold text-black">الخدمات المقدمة:</h2>
                    <p className="text-[16px] font-medium text-[#4A4A4A] leading-[1.5]">
                      نحن نقدم خدمات متخصصة في مجال بناء وتطوير الأعمال، والتي تشمل – على سبيل المثال لا الحصر – تصميم
                      وتطوير المواقع الإلكترونية، تصميم الهويات البصرية والعلامات التجارية، خدمات التسويق الرقمي،
                      استشارات النمو وتحسين تجربة المستخدم. تحتفظ الإدارة بحق تحديث أو تعديل أي من هذه الخدمات دون إشعار
                      مسبق، وذلك لضمان الجودة ومواكبة متطلبات السوق.
                    </p>
                  </div>

                  <div id="intellectual-property" className="space-y-3">
                    <h2 className="text-[18px] md:text-[20px] font-bold text-black">حقوق الملكية الفكرية:</h2>
                    <p className="text-[16px] font-medium text-[#4A4A4A] leading-[1.5]">
                      جميع المواد والمحتويات المعروضة على الموقع – بما في ذلك النصوص، الصور، التصاميم، الأكواد،
                      الشعارات، والمحتوى التفاعلي – هي ملك حصري للموقع أو للجهات المالكة لها قانونًا. لا يجوز استخدام أو
                      نسخ أو إعادة نشر أي من هذه المواد دون إذن كتابي مسبق.
                    </p>
                  </div>

                  <div id="payment" className="space-y-3">
                    <h2 className="text-[18px] md:text-[20px] font-bold text-black">الدفع والتعاقد:</h2>
                    <p className="text-[16px] font-medium text-[#4A4A4A] leading-[1.5]">
                      يتم الاتفاق على تفاصيل التعاقد والدفع مع كل عميل بشكل منفصل حسب نوع المشروع. يتم إصدار فواتير
                      رسمية، وقد يُطلب دفعة مقدمة قبل البدء في التنفيذ. يحتفظ الموقع بحق تعليق أو إيقاف أي خدمة في حال
                      عدم السداد.
                    </p>
                  </div>

                  <div id="cancellation" className="space-y-3">
                    <h2 className="text-[18px] md:text-[20px] font-bold text-black">سياسة الإلغاء والاسترجاع:</h2>
                    <p className="text-[16px] font-medium text-[#4A4A4A] leading-[1.5]">
                      يمكن للعميل إلغاء الطلب قبل بدء التنفيذ دون أي رسوم. أما في حال بدأ العمل على المشروع، فلا يمكن
                      استرداد الدفعة المقدمة. في بعض الحالات الخاصة، يمكن إعادة جزء من المبلغ بعد خصم تكلفة العمل
                      المنجز، ويتم ذلك بموافقة كتابية من الطرفين.
                    </p>
                  </div>

                  <div id="modification" className="space-y-3">
                    <h2 className="text-[18px] md:text-[20px] font-bold text-black">تعديل الشروط والأحكام:</h2>
                    <p className="text-[16px] font-medium text-[#4A4A4A] leading-[1.5]">
                      نحتفظ بحق تحديث أو تعديل هذه الشروط في أي وقت. سيتم نشر النسخة المحدثة على هذه الصفحة، ويعتبر
                      استمرارك في استخدام الموقع بمثابة موافقة على النسخة المعدلة.
                    </p>
                  </div>

                  <div id="privacy" className="space-y-3">
                    <h2 className="text-[18px] md:text-[20px] font-bold text-black">الخصوصية وسرية المعلومات:</h2>
                    <p className="text-[16px] font-medium text-[#4A4A4A] leading-[1.5]">
                      نلتزم بحماية بيانات العملاء والمستخدمين وعدم مشاركتها مع أي طرف ثالث دون موافقة صريحة، باستثناء ما
                      يقتضيه القانون. يتم التعامل مع كل المعلومات بسرية تامة.
                    </p>
                  </div>

                  <div id="liability" className="space-y-3">
                    <h2 className="text-[18px] md:text-[20px] font-bold text-black">حدود المسؤولية:</h2>
                    <p className="text-[16px] font-medium text-[#4A4A4A] leading-[1.5]">
                      نحن لا نتحمل أي مسؤولية عن أي خسائر مباشرة أو غير مباشرة أو أضرار ناتجة عن استخدام الموقع أو
                      الخدمات، بما في ذلك تأخر التسليم أو انقطاع الخدمة لأسباب خارجة عن إرادتنا مثل الظروف التقنية أو
                      الطارئة.
                    </p>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
