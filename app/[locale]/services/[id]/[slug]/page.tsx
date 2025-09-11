import { ApiResponse, ServicesDetailsPageDataType } from "@/app/utils/Types";
import { Link } from "@/i18n/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params:  Promise<{ id: string; slug: string }> }): Promise<Metadata> {
  const locale = await getLocale();
  const { id } = await params;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getServiceById`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      lang: locale,
    },
    body: JSON.stringify({
      service_id: id,
    }),
  });
  const { data } = await res.json();

  return {
    title: data?.title,
    description: data?.meta_description,
    keywords: data?.meta_tags?.split(",") || [],
  };
}

export default async function Page({ params }: { params: Promise<{ id:string; slug: string }> }) {
  const locale = await getLocale();

  const { id, slug } = await params;

  const t = await getTranslations("Services");

  const fetchFooter = async (): Promise<ApiResponse> => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/getAppSettings`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          lang: locale,
        },
      }
    );    

    if (!res.ok) {
      throw new Error("Failed to website settings");
    }
    return res.json();
  };

  const linksData = await fetchFooter();


  async function getServiceDetails(locale: string): Promise<ServicesDetailsPageDataType> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getServiceById`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        lang: locale,
      },
      body: JSON.stringify({
        service_id: id,
      }),
    });

    if (!res.ok) {
      if (res.status == 500 || res.status == 502 || res.status == 503 || res.status == 504) {
        throw new Error("Failed to fetch Server issue");
      } else {
        throw new Error("Failed to fetch Service Details data");
      }
    }

    return res.json();
  }

  const { data } = await getServiceDetails(locale);

  return (
    <>
      {/* <!-- Section 1  --> */}
      <section className="pt-[4.7rem] md:pt-[4.7rem] lg:pt-[6.7rem] relative">
        <div className="relative bg-[#0C090C] overflow-hidden">
          {/* <!-- Background Gradient --> */}
          <div className="absolute left-[48px] top-[392px] w-[1385px] h-[1242px] opacity-40">
            <div className="w-full h-full bg-gradient-to-b from-[#FF3700] to-[#FF8A00] rounded-full blur-[290px]"></div>
          </div>

          {/* <!-- Content --> */}
          <div className="max-w-[1400px] mx-auto relative z-10 flex flex-col items-center justify-center gap-16 p-8 lg:p-12 min-h-[398px] px-[15px] xl:px-0">
            <div className="flex flex-col items-center gap-[48px]">
              <div className="flex flex-col items-center gap-[16px] text-center">
                <h1 className="text-[32px] md:text-[40px] font-bold text-white leading-[1.85]">
                  {data?.main_title}
                </h1>
                <p className="text-[14px] md:text-[16px] text-white leading-[1.85] max-w-[520px]">
                  {data?.main_desc}
                </p>
              </div>

              {/* <!-- Buttons --> */}
              <div className="flex flex-row gap-[16px] w-full md:w-auto">
                <Link
                  href="/start-your-project"
                  className="w-full md:w-[230px] h-[56px] bg-[#EDA133] rounded-lg flex gap-2 items-center justify-center text-white font-medium text-[16px] hover:bg-[#F0AC49] transition-colors"
                >
                  {t("startProject")}
                  <svg
                    className="rtl:block ltr:hidden"
                    width="11"
                    height="12"
                    viewBox="0 0 11 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.27637 0.637695C7.59612 0.637695 7.86133 0.914793 7.86133 1.24902C7.86677 1.41589 7.79496 1.57124 7.69043 1.68066C7.58568 1.79015 7.44175 1.85938 7.27637 1.85938H2.15918L10.5186 10.5967C10.7443 10.8329 10.7442 11.2247 10.5186 11.4609C10.2925 11.6972 9.91744 11.6971 9.69141 11.4609L1.16797 2.55078V8.24414C1.16797 8.57837 0.903733 8.85547 0.583984 8.85547C0.264241 8.85546 0 8.57837 0 8.24414V1.24902C0 0.914796 0.264241 0.637701 0.583984 0.637695H7.27637Z"
                      fill="#FCF4E9"
                    />
                  </svg>

                  <svg
                    className="rtl:hidden ltr:block"
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.5 7.77686C11.5 8.0966 11.2229 8.36182 10.8887 8.36182C10.7218 8.36726 10.5665 8.29544 10.457 8.19092C10.3475 8.08617 10.2783 7.94224 10.2783 7.77686L10.2783 2.65967L1.54102 11.019C1.30482 11.2448 0.912974 11.2447 0.676757 11.019C0.440512 10.793 0.440555 10.4179 0.676757 10.1919L9.58691 1.66846L3.89355 1.66846C3.55932 1.66846 3.28223 1.40422 3.28223 1.08447C3.28223 0.764729 3.55933 0.500488 3.89355 0.500488L10.8887 0.500488C11.2229 0.500488 11.5 0.764729 11.5 1.08447L11.5 7.77686Z"
                      fill="#FCF4E9"
                    />
                  </svg>
                </Link>
                <Link
                  href="/free-consultation"
                  className="w-full md:w-[150px] h-[56px] border border-[#EDA133] rounded-lg flex items-center justify-center text-[#EDA133] font-medium text-[16px] hover:bg-[#EDA13333] hover:text-white transition-colors"
                >
                  {t("freeConsultation")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- Service Hero Section --> */}
      <section className="max-w-[1400px] mx-auto relative px-[15px] xl:px-0 pt-[48px] lg:pt-0">
        {/* <!-- Background Decorative Elements --> */}
        <div className="md:hidden lg:block absolute left-[2px] top-[390px] lg:top-[15%] lg:left-[4.5%] xl:top-[15%] ltr:hidden  rtl:xl:left-[5.8%] z-[0]">
          <img className="h-[260px] lg:h-full" src="/services-page-bg-art.svg" alt="background art" />
        </div>

        <div className="rounded-[8px] overflow-hidden">
          {/* <!-- Content --> */}
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-32 lg:p-12 lg:py-[64px]">
            {/* <!-- Left Side - Content --> */}
            <div className="w-full lg:w-[536px] flex flex-col gap-[24px]">
              {/* <!-- Badge --> */}
              <div className="text-[#F0AC49] text-[16px] md:text-[20px] font-bold">{t("services")}</div>

              {/* <!-- Main Heading --> */}
              <h1 className="text-[28px] md:text-[48px] font-bold text-[#2A313D] leading-[1.4]">{data?.name}</h1>

              {/* <!-- Description --> */}
              <p
                dangerouslySetInnerHTML={{ __html: data?.description }}
                className="text-[14px] md:text-[18px] text-[#393939] leading-[1.56] font-medium break-words"
              >
                {/* {data?.description} */}
              </p>

              {/* <!-- CTA Button --> */}
              <div className="flex items-center gap-4">
                <Link
                  href={`https://wa.me/${linksData?.data?.social?.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-4 bg-[#EDA133] w-full md:w-auto rounded-lg text-white text-[16px] font-medium flex justify-center items-center gap-2 hover:bg-[#D8902A] transition-all duration-300"
                >
                  {t("askService")}
                  <svg
                    className="rtl:block ltr:hidden"
                    width="11"
                    height="12"
                    viewBox="0 0 11 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.27637 0.637695C7.59612 0.637695 7.86133 0.914793 7.86133 1.24902C7.86677 1.41589 7.79496 1.57124 7.69043 1.68066C7.58568 1.79015 7.44175 1.85938 7.27637 1.85938H2.15918L10.5186 10.5967C10.7443 10.8329 10.7442 11.2247 10.5186 11.4609C10.2925 11.6972 9.91744 11.6971 9.69141 11.4609L1.16797 2.55078V8.24414C1.16797 8.57837 0.903733 8.85547 0.583984 8.85547C0.264241 8.85546 0 8.57837 0 8.24414V1.24902C0 0.914796 0.264241 0.637701 0.583984 0.637695H7.27637Z"
                      fill="#FCF4E9"
                    />
                  </svg>

                  <svg
                    className="rtl:hidden ltr:block"
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.5 7.77686C11.5 8.0966 11.2229 8.36182 10.8887 8.36182C10.7218 8.36726 10.5665 8.29544 10.457 8.19092C10.3475 8.08617 10.2783 7.94224 10.2783 7.77686L10.2783 2.65967L1.54102 11.019C1.30482 11.2448 0.912974 11.2447 0.676757 11.019C0.440512 10.793 0.440555 10.4179 0.676757 10.1919L9.58691 1.66846L3.89355 1.66846C3.55932 1.66846 3.28223 1.40422 3.28223 1.08447C3.28223 0.764729 3.55933 0.500488 3.89355 0.500488L10.8887 0.500488C11.2229 0.500488 11.5 0.764729 11.5 1.08447L11.5 7.77686Z"
                      fill="#FCF4E9"
                    />
                  </svg>
                </Link>
              </div>
            </div>

            {/* <!-- Right Side - Image --> */}
            <div className="w-full h-[293px] lg:w-[542px] md:h-[420px] relative mb-5 md:mb-0">
              <div className="w-full h-full bg-[#FFFFFF] rounded-[8px] overflow-hidden">
                <img src={data?.image_url} alt="services" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- Features Section --> */}
      {/* <section className="mt-[17px] md:mt-[60px] lg:mt-0 px-[15px] xl:px-0">
        <div className="relative max-w-[1400px] mx-auto bg-[#F2B660] rounded-[8px] p-8 lg:p-12 px-[15px] xl:px-0 lg:py-[66px]">
          <div className="md:hidden lg:block absolute right-[-5px] top-[0px] z-[20]">
            <img src="/background-service-details-art.svg" alt="background art" />
          </div>

          <div className="relative flex flex-col items-center gap-9 z-[50]">
            <div className="text-center max-w-[482px]">
              <h2 className="text-[24px] md:text-[40px] font-bold text-black leading-[1.2] mb-3">
                مميزات خدمتنا في السيو
              </h2>
              <p className="text-[14px] md:text-[18px] text-[#232323] leading-[1.44] font-medium">
                اكتشف كيف يمكن لخدماتنا في تحسين محركات البحث أن تعزز من أداء موقعك وتزيد من ظهوره في نتائج البحث.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[12px] lg:gap-x-[37px] lg:gap-y-[33px] w-full xl:px-[71px]">
              <div className="bg-[#FFFCF8] rounded-[8px] p-4 md:p-6 ">
                <div className="flex flex-col gap-[10px] md:gap-5">
                  <div className="w-[37px] h-[37px] bg-[#FFD86F] rounded-[8px] flex items-center justify-center">
                    <img src="/ads-icon-56586a.png" alt="Ads" className="w-6 h-6" />
                  </div>
                  <div className="">
                    <h3 className="text-[18px] md:text-[20px] font-bold text-[#120A0B] mb-2">الإعلانات والحملات</h3>
                    <p className="text-[14px] md:text-[16px] text-[#454140] leading-[1.875] opacity-80 font-medium">
                      حملات إعلانية مستهدفة لتعظيم الوصول والتحويلات.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-[#FFFCF8] rounded-[8px] p-4 md:p-6 ">
                <div className="flex flex-col gap-[10px] md:gap-5">
                  <div className="w-[37px] h-[37px] bg-[#7CE1FF] rounded-[8px] flex items-center justify-center">
                    <img src="/community-icon-56586a.png" alt="Community" className="w-6 h-6" />
                  </div>
                  <div className="">
                    <h3 className="text-[18px] md:text-[20px] font-bold text-[#120A0B] mb-2">
                      استراتيجية التفاعل مع المجتمع
                    </h3>
                    <p className="text-[14px] md:text-[16px] text-[#454140] leading-[1.875] opacity-80 font-medium">
                      الرد على التعليقات والرسائل وتعزيز العلاقات.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-[#FFFCF8] rounded-[8px] p-4 md:p-6 ">
                <div className="flex flex-col gap-[10px] md:gap-5">
                  <div className="w-[37px] h-[37px] bg-[#9886FE] rounded-[8px] flex items-center justify-center">
                    <img src="/content-icon-7dc294.png" alt="Content" className="w-6 h-4" />
                  </div>
                  <div className="">
                    <h3 className="text-[18px] md:text-[20px] font-bold text-[#120A0B] mb-2">
                      إنشاء المحتوى وإدارة النشر
                    </h3>
                    <p className="text-[14px] md:text-[16px] text-[#454140] leading-[1.875] opacity-80 font-medium">
                      منشورات عالية الجودة وجذابة تتماشى مع صوت علامتك التجارية.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-[#FFFCF8] rounded-[8px] p-4 md:p-6 ">
                <div className="flex flex-col gap-[10px] md:gap-5">
                  <div className="w-[37px] h-[37px] bg-[#CBFB45] rounded-[8px] flex items-center justify-center">
                    <img src="/influencer-icon-56586a.png" alt="Influencer" className="w-6 h-6" />
                  </div>
                  <div className="">
                    <h3 className="text-[18px] md:text-[20px] font-bold text-[#120A0B] mb-2">
                      التسويق عبر المؤثرين والتعاونات
                    </h3>
                    <p className="text-[14px] md:text-[16px] text-[#454140] leading-[1.875] opacity-80 font-medium">
                      الشراكة مع المؤثرين في الصناعة لتعزيز وصول علامتك التجارية.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-[#FFFCF8] rounded-[8px] p-4 md:p-6 ">
                <div className="flex flex-col gap-[10px] md:gap-5">
                  <div className="w-[37px] h-[37px] bg-[#4A0FFC] rounded-[8px] flex items-center justify-center">
                    <img src="/reputation-icon-56586a.png" alt="Reputation" className="w-6 h-6" />
                  </div>
                  <div className="">
                    <h3 className="text-[18px] md:text-[20px] font-bold text-[#120A0B] mb-2">
                      خدمات إدارة سمعة العلامة التجارية
                    </h3>
                    <p className="text-[14px] md:text-[16px] text-[#454140] leading-[1.875] opacity-80 font-medium">
                      مراقبة وإدارة الإشارات للعلامة التجارية عبر الإنترنت
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-[#FFFCF8] rounded-[8px] p-4 md:p-6 ">
                <div className="flex flex-col gap-[10px] md:gap-5">
                  <div className="w-[37px] h-[37px] bg-[#00CF94] rounded-[8px] flex items-center justify-center">
                    <img src="/analytics-icon-56586a.png" alt="Analytics" className="w-6 h-6" />
                  </div>
                  <div className="">
                    <h3 className="text-[18px] md:text-[20px] font-bold text-[#120A0B] mb-2">تتبع الأداء والتحليلات</h3>
                    <p className="text-[14px] md:text-[16px] text-[#454140] leading-[1.875] opacity-80 font-medium">
                      رؤى قائمة على البيانات لتحسين الاستراتيجيات.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* <!-- Process Section --> */}
      {/* <section className="mt-16 lg:mt-[64px]">
        <div className="bg-[#131A27] overflow-hidden">
          <div className="min-[2560px]:min-w-[1400px] min-[2560px]:max-auto relative z-10 flex flex-col lg:flex-row justify-between lg:items-center xl:items-stretch">
            <div className="xl:max-w-[1400px] xl:mx-auto relative w-full lg:w-[850px] lg:ms-[50px] xl:ps-[120px] p-8 pt-[48px] md:pt-[52px] lg:p-12 flex flex-col justify-center">
              <div className="mb-9">
                <h2 className="text-[24px] md:text-[40px] font-bold text-[#E7E8E9] leading-[1.2] mb-4">
                  عمليتنا المثبتة لتحقيق النجاح
                </h2>
                <p className="text-[14px] md:text-[18px] text-[#B8BABE] leading-[1.44]">
                  تجمع عمليتنا المثبتة بين البحث والاستراتيجية والإبداع لتقديم حلول مخصصة تحقق نتائج قابلة للقياس.
                </p>
              </div>

              <div className="space-y-8 max-h-[460px] lg:max-h-[260px] xl:max-h-[460px] overflow-y-auto scrollbar-hide">
                <div className="flex flex-col gap-6">
                  <div className="flex items-center gap-3">
                    <span className="w-[37px] h-[40px] flex items-center justify-center text-[28px] font-bold text-[#F3C178]">
                      01
                    </span>
                    <h3 className="text-[18px] md:text-[21px] font-bold text-[#D0D1D4]">تحليل تنافسي</h3>
                  </div>
                  <p className="text-[14px] md:text-[18px] text-[#D0D1D4] leading-[1.65] ">
                    افتح الفرص للتفوق على المنافسين والتصنيف أعلى في نتائج محركات البحث مع رؤى قابلة للتنفيذ تضع الأساس
                    لأداء أفضل للموقع ونجاح البحث.
                  </p>
                </div>

                <div className="flex flex-col gap-6">
                  <div className="flex items-center gap-3">
                    <span className="w-[37px] h-[40px] flex items-center justify-center text-[28px] font-bold text-[#F3C178]">
                      02
                    </span>
                    <h3 className="text-[18px] md:text-[21px] font-bold text-[#D0D1D4]">استراتيجية الكلمات الرئيسية</h3>
                  </div>
                  <p className="text-[14px] md:text-[18px] text-[#D0D1D4] leading-[1.65] ">
                    ركز مواردك حيث ستجلب أكبر قيمة لعملك. مستندة إلى تحليلك التنافسي، تعتبر استراتيجيتك للكلمات الرئيسية
                    أساس استراتيجيتك لتحسين محركات البحث.
                  </p>
                </div>

                <div className="flex flex-col gap-6">
                  <div className="flex items-center gap-3">
                    <span className="w-[37px] h-[40px] flex items-center justify-center text-[28px] font-bold text-[#F3C178]">
                      03
                    </span>
                    <h3 className="text-[18px] md:text-[21px] font-bold text-[#D0D1D4]">تدقيق شامل</h3>
                  </div>
                  <p className="text-[14px] md:text-[18px] text-[#D0D1D4] leading-[1.65] ">
                    اكتشف مشكلات تحسين محركات البحث المخفية التي قد تؤثر على قدرة موقعك على التصنيف بشكل جيد. سنقدم
                    توصيات قابلة للتنفيذ لتحسين قابلية الزحف لموقعك وتحسينه.
                  </p>
                </div>

                <div className="flex flex-col gap-6">
                  <div className="flex items-center gap-3">
                    <span className="w-[37px] h-[40px] flex items-center justify-center text-[28px] font-bold text-[#F3C178]">
                      04
                    </span>
                    <h3 className="text-[18px] md:text-[21px] font-bold text-[#D0D1D4]">محتوى مفيد</h3>
                  </div>
                  <p className="text-[14px] md:text-[18px] text-[#D0D1D4] leading-[1.65] ">
                    قم بزيادة رؤية بحثك وسلطة الموضوع بمحتوى تحسين محركات البحث ذي الصلة بالصناعة المكتوب لجذب جمهورك
                    المستهدف والتصنيف.
                  </p>
                </div>

                <div className="flex flex-col gap-6">
                  <div className="flex items-center gap-3">
                    <span className="w-[37px] h-[40px] flex items-center justify-center text-[28px] font-bold text-[#F3C178]">
                      05
                    </span>
                    <h3 className="text-[18px] md:text-[21px] font-bold text-[#D0D1D4]">صيانة الويب والتنفيذ</h3>
                  </div>
                  <p className="text-[14px] md:text-[18px] text-[#D0D1D4] leading-[1.65] ">
                    قم بتفريغ مهام صيانة الويب وتسريع تنفيذ تحسين محركات البحث وتسليم المحتوى لتعزيز نموك وتحسين تجربة
                    المستخدم.
                  </p>
                </div>

                <div className="flex flex-col gap-6">
                  <div className="flex items-center gap-3">
                    <span className="w-[37px] h-[40px] flex items-center justify-center text-[28px] font-bold text-[#F3C178]">
                      06
                    </span>
                    <h3 className="text-[18px] md:text-[21px] font-bold text-[#D0D1D4]">تتبع الإيرادات</h3>
                  </div>
                  <p className="text-[14px] md:text-[18px] text-[#D0D1D4] leading-[1.65] ">
                    اربط جهود تحسين محركات البحث الخاصة بك بالإيرادات وحدد العائد على الاستثمار لترى كيف تفيد
                    استراتيجيتك عملك وأي الصفحات يجب الاستثمار فيها أكثر.
                  </p>
                </div>

                <div className="flex flex-col gap-6">
                  <div className="flex items-center gap-3">
                    <span className="w-[37px] h-[40px] flex items-center justify-center text-[28px] font-bold text-[#F3C178]">
                      07
                    </span>
                    <h3 className="text-[18px] md:text-[21px] font-bold text-[#D0D1D4]">تقارير الأداء المنتظمة</h3>
                  </div>
                  <p className="text-[14px] md:text-[18px] text-[#D0D1D4] leading-[1.65] ">
                    راقب استراتيجية نمو تحسين محركات البحث الخاصة بك مع تقارير تقدم شهرية والوصول على مدار الساعة إلى
                    لوحة معلومات مخصصة.
                  </p>
                </div>
              </div>
            </div>

            <div className="min-[2560px]:min-w-[1400px] w-full h-[379px] md:h-auto lg:h-[620px] xl:h-auto xl:w-[720px] relative mt-[24px] lg:mt-0">
              <img
                src="/seo-process-image.png"
                alt="SEO Process"
                className="w-full h-full object-cover xl:rounded-tr-[8px] xl:rounded-br-[8px]"
              />
            </div>
          </div>
        </div>
      </section> */}

      {/* <!-- Why Choose Us Section --> */}
      {/* <section className="mt-16 lg:mt-[64px]">
        <div className="max-w-[1400px] mx-auto px-[24px]">
          <div className="text-center mb-[24px] md:mb-[64px]">
            <h2 className="text-[24px] md:text-[40px] font-bold leading-[1.2] mb-4">طريقة التنفيذ ولماذا تختارنا</h2>
            <p className="text-[14px] md:text-[18px] text-[#4A4A4A] font-medium leading-[1.44] max-w-[680px] mx-auto">
              تواصل مع المزيد من العملاء المحتملين المؤهلين، وابنِ الثقة والمصداقية، واستفد من دولارات التسويق الرقمي
              الخاصة بك مع استراتيجية تحسين محركات البحث المركزة للبرمجيات كخدمة.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[24px] md:gap-20">
            <div className="w-full h-[322px] md:h-auto xl:h-[535px] relative">
              <img
                src="/atlanta-pain-point.png"
                alt="Atlanta Pain Point"
                className="w-full h-full object-cover rounded-[8px] brightness-80"
              />
            </div>

            <div className="flex flex-col items-start justify-center gap-8">
              <div className="">
                <h3 className="text-[24px] md:text-[40px] font-bold leading-[1.25] mb-[34px]">
                  كيف تغذي تحسين محركات البحث قمع تسويق البرمجيات كخدمة المزدهر
                </h3>
                <p className="text-[14px] md:text-[24px] text-[#393939] font-medium leading-[1.5] mb-[34px]">
                  الشراكة مع شركة تحسين محركات البحث للبرمجيات كخدمة هي استثمار في رؤية عملك وربحيته.
                </p>
                <ul className="space-y-[20px] md:space-y-[32px] list-disc px-[15px] xl:px-[35px]">
                  <li className="text-[14px] md:text-[20px] text-[#393939] font-medium leading-[1.5]">
                    احتفظ بحل البرمجيات كخدمة الخاص بك في مقدمة أذهان المستخدمين المستقبليين.
                  </li>
                  <li className="text-[14px] md:text-[20px] text-[#393939] font-medium leading-[1.5]">
                    حسّن قابلية الزحف للموقع وخلق تجربة مستخدم أفضل للزوار.
                  </li>
                  <li className="text-[14px] md:text-[20px] text-[#393939] font-medium leading-[1.5]">
                    قم بقيادة حركة مرور مستمرة مع تقليل الإنفاق على الإعلانات.
                  </li>
                </ul>
              </div>
               <button className="bg-[#EDA133] w-full md:w-auto text-white text-[16px] rounded-lg px-6 py-3 flex items-center justify-center gap-2 hover:bg-[#F0AC49] transition-colors">
                اطلب الخدمة الان
                <img src="/arrow-icon.svg" alt="arrow" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[24px] md:gap-20 mt-[24px] md:mt-16">
            <div className="w-full h-[343px] md:h-[538px] md:hidden relative">
              <img
                src="/technical-seo-pain-point-56586a.png"
                alt="Technical SEO Pain Point"
                className="w-full h-full object-cover rounded-[8px] brightness-80"
              />
            </div>

            <div className="flex flex-col md:flex-col items-start justify-center gap-8">
              <div className="px-[15px] xl:px-0">
                <h3 className="text-[24px] md:text-[40px] font-bold leading-[1.25] mb-[34px]">
                  كيف تغذي تحسين محركات البحث قمع تسويق البرمجيات كخدمة المزدهر
                </h3>
                <p className="text-[14px] md:text-[24px] text-[#393939] font-medium leading-[1.5] mb-[34px]">
                  الشراكة مع شركة تحسين محركات البحث للبرمجيات كخدمة هي استثمار في رؤية عملك وربحيته.
                </p>
                <ul className="space-y-[20px] md:space-y-[32px] list-disc px-[15px] xl:px-[35px]">
                  <li className="text-[14px] md:text-[20px] text-[#393939] font-medium leading-[1.5]">
                    احتفظ بحل البرمجيات كخدمة الخاص بك في مقدمة أذهان المستخدمين المستقبليين.
                  </li>
                  <li className="text-[14px] md:text-[20px] text-[#393939] font-medium leading-[1.5]">
                    حسّن قابلية الزحف للموقع وخلق تجربة مستخدم أفضل للزوار.
                  </li>
                  <li className="text-[14px] md:text-[20px] text-[#393939] font-medium leading-[1.5]">
                    قم بقيادة حركة مرور مستمرة مع تقليل الإنفاق على الإعلانات.
                  </li>
                </ul>
              </div>
               <button className="bg-[#EDA133] w-full md:w-auto text-white text-[16px] rounded-lg px-6 py-3 flex items-center justify-center gap-2 hover:bg-[#F0AC49] transition-colors">
                اطلب الخدمة الان
                <img src="/arrow-icon.svg" alt="arrow" />
              </button> 
            </div>

            <div className="hidden md:block w-full xl:h-[538px] relative">
              <img
                src="/technical-seo-pain-point-56586a.png"
                alt="Technical SEO Pain Point"
                className="w-full h-full object-cover rounded-[8px] brightness-80"
              />
            </div>
          </div>
        </div>
      </section> */}

      {/* <!-- FAQ Section --> */}
      {/* <section className="relative bg-white pt-[32px] md:pt-[72px] mb-[64]">
        <div className="max-w-[1400px] mx-auto p-[24px] rounded-[8px] faq-shadow">
          <div className="text-center mb-[29px] md:mb-[59px] px-[15px] md:px-0">
            <h2 className="text-[24px] md:text-[40px] font-bold text-black mb-[12px] ">الأسئلة الشائعة</h2>
            <p className="text-[14px] md:text-[18px] text-[#4A4A4A] font-medium leading-relaxed max-w-3xl mx-auto">
              إذا كانت لديك أي أسئلة أخرى أو تحتاج إلى مزيد من التوضيح حول خدمات السيو، لا تتردد في الاطلاع على الإجابات
              هنا أو التواصل معنا مباشرة للحصول على استشارة مخصصة لموقع
            </p>
          </div>

          <div className="space-y-6 px-[15px] xl:px-0">
            <div className="grid grid-cols-1 md:grid-cols-2 items-start gap-x-[17px] gap-y-[16px] md:gap-y-[32px]">
              <div className="faq-item bg-[#F5F5F5] border border-[#E7E8E9] w-full rounded-lg overflow-hidden hover:shadow-md transition-all duration-300">
                <div className="faq-header p-6 cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div className="w-8 h-8 bg-[#F0AC49] rounded-lg flex items-center justify-center me-4">
                      <svg
                        className="plus-icon"
                        width="33"
                        height="32"
                        viewBox="0 0 33 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect x="0.5" width="32" height="32" rx="6.4" fill="#F0AC49" />
                        <rect x="8.5" y="17" width="2" height="16" rx="1" transform="rotate(-90 8.5 17)" fill="white" />
                        <rect
                          x="24.5"
                          y="15"
                          width="2"
                          height="16"
                          rx="1"
                          transform="rotate(90 24.5 15)"
                          fill="white"
                        />
                      </svg>
                    </div>
                    <h3 className="text-[14px] md:text-[20px] font-medium text-[#2A313D] flex-1">
                      لماذا يعتبر السيو مهمًا لموقعي؟
                    </h3>
                  </div>
                </div>

                <div className="faq-content px-6 pb-0">
                  <div className="w-full h-px bg-[#DADADA] mt-0 mb-[24px]"></div>

                  <div className="pb-6 text-gray-800 text-[14px] md:text-[16px] leading-relaxed font-medium">
                    السيو (تحسين محركات البحث) مهم جداً لموقعك لأنه يساعد في زيادة ظهور موقعك في نتائج البحث الطبيعية،
                    مما يؤدي إلى زيادة عدد الزوار المهتمين بخدماتك أو منتجاتك. هذا يعني المزيد من العملاء المحتملين
                    والمبيعات بدون تكلفة إعلانية إضافية.
                  </div>
                </div>
              </div>

              <div className="faq-item bg-[#F5F5F5] border border-[#E7E8E9] w-full rounded-lg overflow-hidden hover:shadow-md transition-all duration-300">
                <div className="faq-header p-6 cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div className="w-8 h-8 bg-[#F0AC49] rounded-lg flex items-center justify-center me-4">
                      <svg
                        className="plus-icon"
                        width="33"
                        height="32"
                        viewBox="0 0 33 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect x="0.5" width="32" height="32" rx="6.4" fill="#F0AC49" />
                        <rect x="8.5" y="17" width="2" height="16" rx="1" transform="rotate(-90 8.5 17)" fill="white" />
                        <rect
                          x="24.5"
                          y="15"
                          width="2"
                          height="16"
                          rx="1"
                          transform="rotate(90 24.5 15)"
                          fill="white"
                        />
                      </svg>
                    </div>
                    <h3 className="text-[14px] md:text-[20px] font-medium text-[#2A313D] flex-1">
                      ما الفرق بين السيو المجاني والإعلانات المدفوعة (PPC)؟
                    </h3>
                  </div>
                </div>
                <div className="faq-content px-6 pb-0">
                  <div className="w-full h-px bg-[#DADADA] mt-0 mb-[24px]"></div>

                  <div className="pb-6 text-gray-800 text-[14px] md:text-[16px] leading-relaxed font-medium">
                    السيو المجاني يركز على تحسين موقعك للظهور في النتائج الطبيعية لمحركات البحث بدون دفع مقابل كل نقرة،
                    بينما الإعلانات المدفوعة (PPC) تتطلب دفع مبلغ مالي مقابل كل نقرة على إعلانك. السيو يحتاج وقت أطول
                    لإظهار النتائج لكنه يوفر نتائج طويلة المدى.
                  </div>
                </div>
              </div>

              <div className="faq-item bg-[#F5F5F5] border border-[#E7E8E9] w-full rounded-lg overflow-hidden hover:shadow-md transition-all duration-300">
                <div className="faq-header p-6 cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div className="w-8 h-8 bg-[#F0AC49] rounded-lg flex items-center justify-center me-4">
                      <svg
                        className="plus-icon"
                        width="33"
                        height="32"
                        viewBox="0 0 33 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect x="0.5" width="32" height="32" rx="6.4" fill="#F0AC49" />
                        <rect x="8.5" y="17" width="2" height="16" rx="1" transform="rotate(-90 8.5 17)" fill="white" />
                        <rect
                          x="24.5"
                          y="15"
                          width="2"
                          height="16"
                          rx="1"
                          transform="rotate(90 24.5 15)"
                          fill="white"
                        />
                      </svg>
                    </div>
                    <h3 className="text-[14px] md:text-[20px] font-medium text-[#2A313D] flex-1">
                      كم يستغرق ظهور نتائج السيو؟
                    </h3>
                  </div>
                </div>
                <div className="faq-content px-6 pb-0">
                  <div className="w-full h-px bg-[#DADADA] mt-0 mb-[24px]"></div>

                  <div className="pb-6 text-gray-800 text-[14px] md:text-[16px] leading-relaxed font-medium">
                    عادة ما تبدأ نتائج السيو في الظهور بعد 3-6 أشهر من بدء العمل، وتحتاج إلى 6-12 شهر لرؤية نتائج
                    ملحوظة. هذا يعتمد على مستوى المنافسة في مجالك، جودة المحتوى، وحالة موقعك الحالية.
                  </div>
                </div>
              </div>

              <div className="faq-item bg-[#F5F5F5] border border-[#E7E8E9] w-full rounded-lg overflow-hidden hover:shadow-md transition-all duration-300">
                <div className="faq-header p-6 cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div className="w-8 h-8 bg-[#F0AC49] rounded-lg flex items-center justify-center me-4">
                      <svg
                        className="plus-icon"
                        width="33"
                        height="32"
                        viewBox="0 0 33 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect x="0.5" width="32" height="32" rx="6.4" fill="#F0AC49" />
                        <rect x="8.5" y="17" width="2" height="16" rx="1" transform="rotate(-90 8.5 17)" fill="white" />
                        <rect
                          x="24.5"
                          y="15"
                          width="2"
                          height="16"
                          rx="1"
                          transform="rotate(90 24.5 15)"
                          fill="white"
                        />
                      </svg>
                    </div>
                    <h3 className="text-[14px] md:text-[20px] font-medium text-[#2A313D] flex-1">
                      هل يمكنني تطبيق السيو بنفسي؟
                    </h3>
                  </div>
                </div>
                <div className="faq-content px-6 pb-0">
                  <div className="w-full h-px bg-[#DADADA] mt-0 mb-[24px]"></div>

                  <div className="pb-6 text-gray-800 text-[14px] md:text-[16px] leading-relaxed font-medium">
                    نعم، يمكنك تعلم أساسيات السيو وتطبيقها بنفسك، لكن السيو المتقدم يتطلب خبرة تقنية وفهم عميق
                    لخوارزميات محركات البحث. إذا كان لديك الوقت والرغبة في التعلم، يمكنك البدء بالأساسيات، وإلا فالأفضل
                    الاستعانة بخبير.
                  </div>
                </div>
              </div>

              <div className="faq-item bg-[#F5F5F5] border border-[#E7E8E9] w-full rounded-lg overflow-hidden hover:shadow-md transition-all duration-300">
                <div className="faq-header p-6 cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div className="w-8 h-8 bg-[#F0AC49] rounded-lg flex items-center justify-center me-4">
                      <svg
                        className="plus-icon"
                        width="33"
                        height="32"
                        viewBox="0 0 33 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect x="0.5" width="32" height="32" rx="6.4" fill="#F0AC49" />
                        <rect x="8.5" y="17" width="2" height="16" rx="1" transform="rotate(-90 8.5 17)" fill="white" />
                        <rect
                          x="24.5"
                          y="15"
                          width="2"
                          height="16"
                          rx="1"
                          transform="rotate(90 24.5 15)"
                          fill="white"
                        />
                      </svg>
                    </div>
                    <h3 className="text-[14px] md:text-[20px] font-medium text-[#2A313D] flex-1">
                      ما هي أهم عوامل السيو؟
                    </h3>
                  </div>
                </div>
                <div className="faq-content px-6 pb-0">
                  <div className="w-full h-px bg-[#DADADA] mt-0 mb-[24px]"></div>

                  <div className="pb-6 text-gray-800 text-[14px] md:text-[16px] leading-relaxed font-medium">
                    أهم عوامل السيو تشمل: جودة المحتوى وتحسين الكلمات المفتاحية، سرعة تحميل الموقع، تجربة المستخدم،
                    الروابط الخارجية عالية الجودة، تحسين الموقع للهواتف المحمولة، والعناوين والوصف الجذابة.
                  </div>
                </div>
              </div>

              <div className="faq-item bg-[#F5F5F5] border border-[#E7E8E9] w-full rounded-lg overflow-hidden hover:shadow-md transition-all duration-300">
                <div className="faq-header p-6 cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div className="w-8 h-8 bg-[#F0AC49] rounded-lg flex items-center justify-center me-4">
                      <svg
                        className="plus-icon"
                        width="33"
                        height="32"
                        viewBox="0 0 33 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect x="0.5" width="32" height="32" rx="6.4" fill="#F0AC49" />
                        <rect x="8.5" y="17" width="2" height="16" rx="1" transform="rotate(-90 8.5 17)" fill="white" />
                        <rect
                          x="24.5"
                          y="15"
                          width="2"
                          height="16"
                          rx="1"
                          transform="rotate(90 24.5 15)"
                          fill="white"
                        />
                      </svg>
                    </div>
                    <h3 className="text-[14px] md:text-[20px] font-medium text-[#2A313D] flex-1">
                      كم تكلفة خدمات السيو؟
                    </h3>
                  </div>
                </div>
                <div className="faq-content px-6 pb-0">
                  <div className="w-full h-px bg-[#DADADA] mt-0 mb-[24px]"></div>

                  <div className="pb-6 text-gray-800 text-[14px] md:text-[16px] leading-relaxed font-medium">
                    تكلفة خدمات السيو تختلف حسب حجم الموقع، مستوى المنافسة، والخدمات المطلوبة. يمكن أن تتراوح من بضع
                    مئات إلى عدة آلاف من الدولارات شهرياً. الاستثمار في السيو الجيد يحقق عائد استثمار ممتاز على المدى
                    الطويل.
                  </div>
                </div>
              </div>

              <div className="faq-item bg-[#F5F5F5] border border-[#E7E8E9] w-full rounded-lg overflow-hidden hover:shadow-md transition-all duration-300">
                <div className="faq-header p-6 cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div className="w-8 h-8 bg-[#F0AC49] rounded-lg flex items-center justify-center me-4">
                      <svg
                        className="plus-icon"
                        width="33"
                        height="32"
                        viewBox="0 0 33 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect x="0.5" width="32" height="32" rx="6.4" fill="#F0AC49" />
                        <rect x="8.5" y="17" width="2" height="16" rx="1" transform="rotate(-90 8.5 17)" fill="white" />
                        <rect
                          x="24.5"
                          y="15"
                          width="2"
                          height="16"
                          rx="1"
                          transform="rotate(90 24.5 15)"
                          fill="white"
                        />
                      </svg>
                    </div>
                    <h3 className="text-[14px] md:text-[20px] font-medium text-[#2A313D] flex-1">
                      كم تكلفة خدمات السيو؟
                    </h3>
                  </div>
                </div>
                <div className="faq-content px-6 pb-0">
                  <div className="w-full h-px bg-[#DADADA] mt-0 mb-[24px]"></div>

                  <div className="pb-6 text-gray-800 text-[14px] md:text-[16px] leading-relaxed font-medium">
                    تكلفة خدمات السيو تختلف حسب حجم الموقع، مستوى المنافسة، والخدمات المطلوبة. يمكن أن تتراوح من بضع
                    مئات إلى عدة آلاف من الدولارات شهرياً. الاستثمار في السيو الجيد يحقق عائد استثمار ممتاز على المدى
                    الطويل.
                  </div>
                </div>
              </div>

              <div className="faq-item bg-[#F5F5F5] border border-[#E7E8E9] w-full rounded-lg overflow-hidden hover:shadow-md transition-all duration-300">
                <div className="faq-header p-6 cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div className="w-8 h-8 bg-[#F0AC49] rounded-lg flex items-center justify-center me-4">
                      <svg
                        className="plus-icon"
                        width="33"
                        height="32"
                        viewBox="0 0 33 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect x="0.5" width="32" height="32" rx="6.4" fill="#F0AC49" />
                        <rect x="8.5" y="17" width="2" height="16" rx="1" transform="rotate(-90 8.5 17)" fill="white" />
                        <rect
                          x="24.5"
                          y="15"
                          width="2"
                          height="16"
                          rx="1"
                          transform="rotate(90 24.5 15)"
                          fill="white"
                        />
                      </svg>
                    </div>
                    <h3 className="text-[14px] md:text-[20px] font-medium text-[#2A313D] flex-1">
                      كم تكلفة خدمات السيو؟
                    </h3>
                  </div>
                </div>
                <div className="faq-content px-6 pb-0">
                  <div className="w-full h-px bg-[#DADADA] mt-0 mb-[24px]"></div>

                  <div className="pb-6 text-gray-800 text-[14px] md:text-[16px] leading-relaxed font-medium">
                    تكلفة خدمات السيو تختلف حسب حجم الموقع، مستوى المنافسة، والخدمات المطلوبة. يمكن أن تتراوح من بضع
                    مئات إلى عدة آلاف من الدولارات شهرياً. الاستثمار في السيو الجيد يحقق عائد استثمار ممتاز على المدى
                    الطويل.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}
    </>
  );
}
