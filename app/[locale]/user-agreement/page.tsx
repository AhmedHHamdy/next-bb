'use client';

import { PolicyPages } from "@/app/utils/Types";
import { Link } from "@/i18n/navigation";
import { useQuery } from "@tanstack/react-query";
import { Spin } from "antd";
import { useLocale } from "next-intl";

export default function Page() {

  const locale = useLocale();

  const fetchUserAgreement = async (): Promise<PolicyPages> => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/getPolicyPage`,
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
    queryKey: ["user-agreement", locale], // include locale in key
    queryFn: fetchUserAgreement,
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
    <>
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

            <Link href="/user-agreement" className="text-black text-[15px] font-medium leading-[1.65]">
              اتفاقية الاستخدام
            </Link>
          </div>
        </div>
      </div>

      <div className="w-full bg-white px-6 pt-[20px] pb-[64px] md:pb-[100px] md:pt-[36px]">
        <div className="max-w-[1300px] mx-auto">
          <div className="flex flex-col lg:flex-row gap-11">
            <div className="block md:w-[290px] flex-shrink-0 border border-[#DADADA] h-full p-[16px] pb-[32px] rounded-[8px]">
              <h3 className="text-[16px] text-[#4A4A4A] font-medium">محتوى اتفاقية المستخدم</h3>

              <hr className="my-[16px] text-[#DADADA]" />

              <div className="space-y-[0px] md:space-y-[14px] border-s-6 border-[#E7E8E9] ps-0">
                <a
                  href="#acceptance"
                  className="block text-base font-medium hover:text-[#EDA133] leading-[1.5] flex gap-2 border-s-6 -ms-[6px] border-[#E7E8E9] hover:border-[#EDA133] ps-[16px] py-[10px]"
                >
                  قبول الشروط
                </a>
                <a
                  href="#usage"
                  className="block text-base font-medium hover:text-[#EDA133] leading-[1.5] flex gap-2 border-s-6 -ms-[6px] border-[#E7E8E9] hover:border-[#EDA133] ps-[16px] py-[10px]"
                >
                  الاستخدام المشروع
                </a>
                <a
                  href="#intellectual-property"
                  className="block text-base font-medium hover:text-[#EDA133] leading-[1.5] flex gap-2 border-s-6 -ms-[6px] border-[#E7E8E9] hover:border-[#EDA133] ps-[16px] py-[10px]"
                >
                  حقوق الملكية الفكرية
                </a>
                <a
                  href="#content"
                  className="block text-base font-medium hover:text-[#EDA133] leading-[1.5] flex gap-2 border-s-6 -ms-[6px] border-[#E7E8E9] hover:border-[#EDA133] ps-[16px] py-[10px]"
                >
                  المحتوى والمقالات
                </a>
                <a
                  href="#external-links"
                  className="block text-base font-medium hover:text-[#EDA133] leading-[1.5] flex gap-2 border-s-6 -ms-[6px] border-[#E7E8E9] hover:border-[#EDA133] ps-[16px] py-[10px]"
                >
                  الروابط الخارجية
                </a>
                <a
                  href="#modification"
                  className="block text-base font-medium hover:text-[#EDA133] leading-[1.5] flex gap-2 border-s-6 -ms-[6px] border-[#E7E8E9] hover:border-[#EDA133] ps-[16px] py-[10px]"
                >
                  تعديل الاتفاقية
                </a>
                <a
                  href="#liability"
                  className="block text-base font-medium hover:text-[#EDA133] leading-[1.5] flex gap-2 border-s-6 -ms-[6px] border-[#E7E8E9] hover:border-[#EDA133] ps-[16px] py-[10px]"
                >
                  إخلاء المسؤولية
                </a>
                <a
                  href="#law"
                  className="block text-base font-medium hover:text-[#EDA133] leading-[1.5] flex gap-2 border-s-6 -ms-[6px] border-[#E7E8E9] hover:border-[#EDA133] ps-[16px] py-[10px]"
                >
                  القانون المعمول به
                </a>
              </div>
            </div>

            <div className="flex-1">
              <div className="space-y-[24px]">
                <img
                  className="hidden md:inline h-[200px] w-[343px] md:h-[234px] rounded-2xl md:w-full brightness-80"
                  src="/user-agreement.png"
                  alt="user-agreement image"
                />
                <img
                  className="md:hidden h-[200px] w-full rounded-2xl object-cover"
                  src="/user-agreement-mobile.png"
                  alt="user-agreement image"
                />

                <div className="space-y-[32px] md:space-y-[24px]">
                  <div id="acceptance" className="space-y-3">
                    <h2 className="text-[18px] md:text-[20px] font-bold text-black">{data?.data?.title?.slice(0, 80)}</h2>
                    <p dangerouslySetInnerHTML={{__html: String(data?.data?.content || "")}} className="text-[16px] font-medium text-[#4A4A4A] leading-[1.5]">
                      {/* {data?.data?.content} */}
                    </p>
                  </div>

                  {/* <div id="project-usage" className="space-y-3">
                    <h2 className="text-[18px] md:text-[20px] font-bold text-black">الاستخدام المشروع:</h2>
                    <p className="text-[16px] font-medium text-[#4A4A4A] leading-[1.5]">
                      تتعهد باستخدام الموقع لأغراض مشروعة فقط، وعدم استخدامه في أي أنشطة غير قانونية أو تنتهك القوانين
                      والأنظمة المعمول بها.
                    </p>
                  </div>

                  <div id="intellectual-property" className="space-y-3">
                    <h2 className="text-[18px] md:text-[20px] font-bold text-black">حقوق الملكية الفكرية:</h2>
                    <p className="text-[16px] font-medium text-[#4A4A4A] leading-[1.5]">
                      جميع المحتويات الموجودة على الموقع (مثل النصوص، الصور، التصاميم، الشعارات، البرمجيات) هي ملك
                      للموقع أو الجهات المرخصة له، ولا يجوز نسخها أو إعادة نشرها أو توزيعها دون إذن كتابي مسبق.
                    </p>
                  </div>

                  <div id="content" className="space-y-3">
                    <h2 className="text-[18px] md:text-[20px] font-bold text-black">المحتوى والمقالات:</h2>
                    <p className="text-[16px] font-medium text-[#4A4A4A] leading-[1.5]">
                      قد يحتوي الموقع على محتوى يتم تقديمه لأغراض معلوماتية فقط. لا نضمن دقة أو كمال أو حداثة المعلومات
                      المنشورة، ولا يتحمل الموقع أي مسؤولية عن الاعتماد عليها في اتخاذ قرارات عملية.
                    </p>
                  </div>

                  <div id="external-links" className="space-y-3">
                    <h2 className="text-[18px] md:text-[20px] font-bold text-black">الروابط الخارجية:</h2>
                    <p className="text-[16px] font-medium text-[#4A4A4A] leading-[1.5]">
                      قد يحتوي الموقع على روابط لمواقع خارجية لا نملكها أو نتحكم بها. لسنا مسؤولين عن محتوى أو ممارسات
                      أي موقع خارجي.
                    </p>
                  </div>

                  <div id="modification" className="space-y-3">
                    <h2 className="text-[18px] md:text-[20px] font-bold text-black">تعديل الاتفاقية:</h2>
                    <p className="text-[16px] font-medium text-[#4A4A4A] leading-[1.5]">
                      نحتفظ بحق تعديل أو تحديث شروط الاستخدام في أي وقت، وسيتم نشر التعديلات على هذه الصفحة. استمرارك في
                      استخدام الموقع بعد التعديلات يُعد قبولًا للشروط الجديدة.
                    </p>
                  </div>

                  <div id="liability" className="space-y-3">
                    <h2 className="text-[18px] md:text-[20px] font-bold text-black">إخلاء المسؤولية:</h2>
                    <p className="text-[16px] font-medium text-[#4A4A4A] leading-[1.5]">
                      الموقع يُقدَّم "كما هو" دون أي ضمانات من أي نوع، سواء صريحة أو ضمنية. لا نضمن أن يكون الموقع
                      خاليًا من الأخطاء أو أن يكون الوصول إليه دائمًا متاحًا.
                    </p>
                  </div>

                  <div id="law" className="space-y-3">
                    <h2 className="text-[18px] md:text-[20px] font-bold text-black">القانون المعمول به:</h2>
                    <p className="text-[16px] font-medium text-[#4A4A4A] leading-[1.5]">
                      تخضع هذه الاتفاقية وتُفسر وفقًا لقوانين [اسم الدولة]، ويُختص بمحاكمها دون غيرها في الفصل في أي
                      نزاع قد ينشأ.
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
