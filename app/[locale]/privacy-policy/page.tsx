'use client';

import { PolicyPages } from "@/app/utils/Types";
import { Link } from "@/i18n/navigation";
import { useQuery } from "@tanstack/react-query";
import { Spin } from "antd";
import { useLocale } from "next-intl";

export default function Page() {

  const locale = useLocale();

  const fetchPrivacyPolicy = async (): Promise<PolicyPages> => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/getPrivacyPage`,
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
    queryKey: ["privacy-policy", locale], // include locale in key
    queryFn: fetchPrivacyPolicy,
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

            <Link href="/privacy-policy" className="text-black text-[15px] font-medium leading-[1.65]">
              سياسة الخصوصية
            </Link>
          </div>
        </div>
      </div>

      <div className="w-full bg-white px-6 pt-[20px] pb-[64px] md:pb-[100px] md:pt-[36px]">
        <div className="max-w-[1300px] mx-auto">
          <div className="flex flex-col lg:flex-row gap-11">
            <div className="block md:w-[290px] flex-shrink-0 border border-[#DADADA] h-full p-[16px] pb-[32px] rounded-[8px]">
              <h3 className="text-[16px] text-[#4A4A4A] font-medium">محتوى سياسة الخصوصية</h3>

              <hr className="my-[16px] text-[#DADADA]" />

              <div className="space-y-[0px] md:space-y-[14px] border-s-6 border-[#E7E8E9] ps-0">
                <a
                  href="#collection"
                  className="block text-base font-medium hover:text-[#EDA133] leading-[1.5] flex gap-2 border-s-6 -ms-[6px] border-[#E7E8E9] hover:border-[#EDA133] ps-[16px] py-[10px]"
                >
                  جمع المعلومات
                </a>
                <a
                  href="#usage"
                  className="block text-base font-medium hover:text-[#EDA133] leading-[1.5] flex gap-2 border-s-6 -ms-[6px] border-[#E7E8E9] hover:border-[#EDA133] ps-[16px] py-[10px]"
                >
                  استخدام المعلومات
                </a>
                <a
                  href="#protection"
                  className="block text-base font-medium hover:text-[#EDA133] leading-[1.5] flex gap-2 border-s-6 -ms-[6px] border-[#E7E8E9] hover:border-[#EDA133] ps-[16px] py-[10px]"
                >
                  حماية البيانات
                </a>
                <a
                  href="#cookies"
                  className="block text-base font-medium hover:text-[#EDA133] leading-[1.5] flex gap-2 border-s-6 -ms-[6px] border-[#E7E8E9] hover:border-[#EDA133] ps-[16px] py-[10px]"
                >
                  ملفات تعريف الارتباط (Cookies)
                </a>
                <a
                  href="#sharing"
                  className="block text-base font-medium hover:text-[#EDA133] leading-[1.5] flex gap-2 border-s-6 -ms-[6px] border-[#E7E8E9] hover:border-[#EDA133] ps-[16px] py-[10px]"
                >
                  مشاركة البيانات
                </a>
                <a
                  href="#external-links"
                  className="block text-base font-medium hover:text-[#EDA133] leading-[1.5] flex gap-2 border-s-6 -ms-[6px] border-[#E7E8E9] hover:border-[#EDA133] ps-[16px] py-[10px]"
                >
                  روابط خارجية
                </a>
                <a
                  href="#user-rights"
                  className="block text-base font-medium hover:text-[#EDA133] leading-[1.5] flex gap-2 border-s-6 -ms-[6px] border-[#E7E8E9] hover:border-[#EDA133] ps-[16px] py-[10px]"
                >
                  حقوق المستخدم
                </a>
                <a
                  href="#updates"
                  className="block text-base font-medium hover:text-[#EDA133] leading-[1.5] flex gap-2 border-s-6 -ms-[6px] border-[#E7E8E9] hover:border-[#EDA133] ps-[16px] py-[10px]"
                >
                  تحديثات السياسة
                </a>
              </div>
            </div>

            <div className="flex-1">
              <div className="space-y-[24px]">
                <img
                  className="hidden md:inline h-[200px] w-[343px] md:h-[234px] rounded-2xl md:w-full brightness-80"
                  src="/privacy-policy.png"
                  alt="privacy-policy image"
                />
                <img
                  className="md:hidden h-[200px] w-full rounded-2xl object-cover"
                  src="/privacy-policy-mobile.png"
                  alt="privacy-policy image"
                />

                <div className="space-y-[32px] md:space-y-[24px]">
                  <div id="collection" className="space-y-3">
                    <h2 className="text-[18px] md:text-[20px] font-bold text-black">{data?.data?.title?.slice(0, 80)}</h2>
                    <p dangerouslySetInnerHTML={{__html: String(data?.data?.content || "")}} className="text-[16px] font-medium text-[#4A4A4A] leading-[1.5]">
                      {/* {data?.data?.content} */}
                    </p>
                  </div>

                  {/* <div id="usage" className="space-y-3">
                    <h2 className="text-[18px] md:text-[20px] font-bold text-black">استخدام المعلومات:</h2>
                    <p className="text-[16px] font-medium text-[#4A4A4A] leading-[1.5]">
                      نستخدم بياناتك لتحسين تجربتك، وتقديم الخدمات، والتواصل معك، وتحليل أداء الموقع أو التطبيق.
                    </p>
                  </div>

                  <div id="protection" className="space-y-3">
                    <h2 className="text-[18px] md:text-[20px] font-bold text-black">حماية البيانات:</h2>
                    <p className="text-[16px] font-medium text-[#4A4A4A] leading-[1.5]">
                      نلتزم بحماية معلوماتك باستخدام إجراءات أمان تقنية وتنظيمية لمنع الوصول غير المصرح به.
                    </p>
                  </div>

                  <div id="cookies" className="space-y-3">
                    <h2 className="text-[18px] md:text-[20px] font-bold text-black">ملفات تعريف الارتباط (Cookies):</h2>
                    <p className="text-[16px] font-medium text-[#4A4A4A] leading-[1.5]">
                      نستخدم ملفات تعريف الارتباط لتحسين الأداء وتحليل الاستخدام، ويمكنك تعطيلها من إعدادات المتصفح.
                    </p>
                  </div>

                  <div id="sharing" className="space-y-3">
                    <h2 className="text-[18px] md:text-[20px] font-bold text-black">مشاركة البيانات:</h2>
                    <p className="text-[16px] font-medium text-[#4A4A4A] leading-[1.5]">
                      لا نبيع أو نشارك بياناتك مع أي طرف ثالث إلا في حال الضرورة لتقديم الخدمة أو الالتزام بالقوانين.
                    </p>
                  </div>

                  <div id="external-links" className="space-y-3">
                    <h2 className="text-[18px] md:text-[20px] font-bold text-black">روابط خارجية:</h2>
                    <p className="text-[16px] font-medium text-[#4A4A4A] leading-[1.5]">
                      قد يحتوي موقعنا على روابط لمواقع أخرى لسنا مسؤولين عن ممارسات الخصوصية فيها، ويُنصح بقراءة
                      سياساتهم.
                    </p>
                  </div>

                  <div id="user-rights" className="space-y-3">
                    <h2 className="text-[18px] md:text-[20px] font-bold text-black">حقوق المستخدم:</h2>
                    <p className="text-[16px] font-medium text-[#4A4A4A] leading-[1.5]">
                      يحق لك الوصول إلى بياناتك الشخصية، وطلب تعديلها أو حذفها في أي وقت عبر التواصل معنا.
                    </p>
                  </div>

                  <div id="updates" className="space-y-3">
                    <h2 className="text-[18px] md:text-[20px] font-bold text-black">تحديثات السياسة:</h2>
                    <p className="text-[16px] font-medium text-[#4A4A4A] leading-[1.5]">
                      نحتفظ بالحق في تعديل سياسة الخصوصية، وسيتم نشر أي تحديث هنا مع تاريخ آخر تعديل.
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
