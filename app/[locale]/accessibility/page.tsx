'use client';

import { PolicyPages } from "@/app/utils/Types";
import { Link } from "@/i18n/navigation";
import { useQuery } from "@tanstack/react-query";
import { Spin } from "antd";
import { useLocale } from "next-intl";

export default function Page() {

  const locale = useLocale();

  console.log(locale, "sd")

  const fetchAccessibility = async (): Promise<PolicyPages> => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/getAccessibilityPage`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          lang: locale,
        },
      }
    );

    if (!res.ok) {
      if (res.status == 500 || res.status == 502 || res.status == 503 || res.status == 504) {
        throw new Error("Failed to fetch Server issue");
      }
    }
    return res.json();
  };

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["accessibility", locale], // include locale in key
    queryFn: fetchAccessibility,
  });


  if (isLoading) {
    return (
      <section className="min-h-screen text-center flex items-center justify-center">
        <section className="px-6 pt-[6rem] lg:pt-[8rem] xl:pt-[9rem] text-center">
          <div className="max-w-[1400px] mx-auto flex items-center justify-center">
            <Spin  size="large"/>
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
    <>
      <div className="w-full bg-white px-6 pt-[6rem] lg:pt-[8rem] xl:pt-[9rem]">
        <div className="max-w-[1400px] mx-auto xl:px-[24px]">
          <div className="flex items-center gap-2">
            <Link href="/index" className="text-[#8B8B8B] text-[15px] font-medium leading-[1.65]">
              الرئيسية
            </Link>
            <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10.0603 14.281C10.1869 14.281 10.3136 14.2343 10.4136 14.1343C10.6069 13.941 10.6069 13.621 10.4136 13.4277L6.06693 9.08099C5.74693 8.76099 5.74693 8.24099 6.06693 7.92099L10.4136 3.57432C10.6069 3.38099 10.6069 3.06099 10.4136 2.86766C10.2203 2.67432 9.90026 2.67432 9.70693 2.86766L5.36026 7.21432C5.02026 7.55432 4.82693 8.01432 4.82693 8.50099C4.82693 8.98766 5.01359 9.44766 5.36026 9.78766L9.70693 14.1343C9.80693 14.2277 9.93359 14.281 10.0603 14.281Z"
                fill="#8B8B8B"
              />
            </svg>

            <Link href="/accessibility" className="text-black text-[15px] font-medium leading-[1.65]">
              إمكانية الوصول
            </Link>
          </div>
        </div>
      </div>

      <div className="w-full bg-white px-6 pt-[20px] pb-[64px] md:pb-[100px] md:pt-[36px]">
        <div className="max-w-[1300px] mx-auto">
          <div className="flex flex-col lg:flex-row gap-11">
            <div className="block md:w-[290px] flex-shrink-0 border border-[#DADADA] h-full p-[16px] pb-[32px] rounded-[8px]">
              <h3 className="text-[16px] text-[#4A4A4A] font-medium">محتوى إمكانية الوصول</h3>

              <hr className="my-[16px] text-[#DADADA]" />

              <div className="space-y-[0px] md:space-y-[14px] border-s-6 border-[#E7E8E9] ps-0">
                <a
                  href="#reach"
                  className="block text-base font-medium hover:text-[#EDA133] leading-[1.5] flex gap-2 border-s-6 -ms-[6px] border-[#E7E8E9] hover:border-[#EDA133] ps-[16px] py-[10px]"
                >
                  إمكانية الوصول
                </a>
                <a
                  href="#goal"
                  className="block text-base font-medium hover:text-[#EDA133] leading-[1.5] flex gap-2 border-s-6 -ms-[6px] border-[#E7E8E9] hover:border-[#EDA133] ps-[16px] py-[10px]"
                >
                  هدفنا
                </a>
                <a
                  href="#what-we-provide"
                  className="block text-base font-medium hover:text-[#EDA133] leading-[1.5] flex gap-2 border-s-6 -ms-[6px] border-[#E7E8E9] hover:border-[#EDA133] ps-[16px] py-[10px]"
                >
                  ما الذي وفرناه
                </a>
                <a
                  href="#what-we-do"
                  className="block text-base font-medium hover:text-[#EDA133] leading-[1.5] flex gap-2 border-s-6 -ms-[6px] border-[#E7E8E9] hover:border-[#EDA133] ps-[16px] py-[10px]"
                >
                  ما زلنا نعمل على تحسين
                </a>
                <a
                  href="#problem"
                  className="block text-base font-medium hover:text-[#EDA133] leading-[1.5] flex gap-2 border-s-6 -ms-[6px] border-[#E7E8E9] hover:border-[#EDA133] ps-[16px] py-[10px]"
                >
                  هل تواجه مشكلة في الوصول إلى الموقع؟
                </a>
                <a
                  href="#updates"
                  className="block text-base font-medium hover:text-[#EDA133] leading-[1.5] flex gap-2 border-s-6 -ms-[6px] border-[#E7E8E9] hover:border-[#EDA133] ps-[16px] py-[10px]"
                >
                  آخر تحديث
                </a>
              </div>
            </div>

            <div className="flex-1">
              <div className="space-y-[24px]">
                <img
                  className="hidden md:inline h-[200px] w-[343px] md:h-[234px] rounded-2xl md:w-full brightness-80"
                  src="/accessibility-img.png"
                  alt="accessibility image"
                />
                <img
                  className="md:hidden h-[200px] w-full rounded-2xl object-cover object-center"
                  src="/accessibility-mobile.png"
                  alt="accessibility image"
                />

                <div className="space-y-[32px] md:space-y-[24px]">
                  <div id="reach" className="space-y-3">
                    <h2 className="text-[18px] md:text-[20px] font-bold text-black">{data?.data?.title?.slice(0, 80)}</h2>
                    <p dangerouslySetInnerHTML={{__html: String(data?.data?.content || "")}} className="text-[16px] font-medium text-[#4A4A4A] leading-[1.5]">
                      {/* {data?.data?.content} */}
                    </p>
                  </div>

                  {/* <div id="goal" className="space-y-3">
                    <h2 className="text-[18px] md:text-[20px] font-bold text-black">هدفنا:</h2>
                    <p className="text-[16px] font-medium text-[#4A4A4A] leading-[1.5]">
                      هدفنا هو أن يكون هذا الموقع متاحًا وقابلًا للاستخدام من قِبل أكبر عدد ممكن من الأشخاص، بما يشمل:
                    </p>
                    <ul className="ps-2 list-disc list-inside space-y-1 text-[16px] font-medium text-[#4A4A4A] leading-[1.5]">
                      <li>مستخدمي قارئات الشاشة.</li>
                      <li>من يعانون من ضعف البصر أو عمى الألوان.</li>
                      <li>من يستخدمون لوحة المفاتيح فقط للتنقل.</li>
                      <li>من يعانون من صعوبات في الإدراك أو التعلم.</li>
                      <li>مستخدمي الأجهزة المساعدة.</li>
                    </ul>
                  </div>

                  <div id="what-we-provide" className="space-y-3">
                    <h2 className="text-[18px] md:text-[20px] font-bold text-black">ما الذي وفرناه:</h2>
                    <p className="text-[16px] font-medium text-[#4A4A4A] leading-[1.5]">
                      إمكانية تكبير النصوص دون فقدان وضوح المحتوى.
                    </p>
                    <ul className="ps-2 list-disc list-inside space-y-1 text-[16px] font-medium text-[#4A4A4A] leading-[1.5]">
                      <li>توافق الموقع مع أدوات قراءة الشاشة مثل NVDA وVoiceOver.</li>
                      <li>التنقل الكامل باستخدام لوحة المفاتيح فقط.</li>
                      <li>وضوح الألوان والتباين لتسهيل القراءة.</li>
                      <li>تسميات واضحة للصور والنماذج (alt text + labels).</li>
                      <li>هيكل تنظيمي متماسك يسهل الفهم والتنقل.</li>
                    </ul>
                  </div>

                  <div id="what-we-do" className="space-y-3">
                    <h2 className="text-[18px] md:text-[20px] font-bold text-black">ما زلنا نعمل على تحسين:</h2>
                    <p className="text-[16px] font-medium text-[#4A4A4A] leading-[1.5]">
                      نحن ملتزمون بإجراء تحسينات مستمرة لضمان وصول كافة المستخدمين للمحتوى بسهولة. في حال وجود أي صعوبة
                      أو خلل في تجربة الاستخدام، يرجى إعلامنا فورًا.
                    </p>
                  </div>

                  <div id="problem" className="space-y-3">
                    <h2 className="text-[18px] md:text-[20px] font-bold text-black">
                      هل تواجه مشكلة في الوصول إلى الموقع؟
                    </h2>
                    <p className="text-[16px] font-medium text-[#4A4A4A] leading-[1.5]">
                      إذا واجهت أي صعوبة أو لديك ملاحظات تتعلق بإمكانية الوصول، لا تتردد في التواصل معنا عبر:
                    </p>
                    <ul className="ps-2 list-disc list-inside space-y-1 text-[16px] font-medium text-[#4A4A4A] leading-[1.5]">
                      <li>البريد الإلكتروني: [example@email.com]</li>
                      <li>أو من خلال صفحة [اتصل بنا]</li>
                    </ul>
                  </div>

                  <div id="updates" className="space-y-3">
                    <h2 className="text-[18px] md:text-[20px] font-bold text-black">آخر تحديث</h2>
                    <p className="text-[16px] font-medium text-[#4A4A4A] leading-[1.5]">
                      تمت مراجعة وتحديث هذه الصفحة بتاريخ: [اكتب التاريخ هنا]
                    </p>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
