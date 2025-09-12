import BenefitsCarousel from "@/app/components/career/BenefitsCarousel";
import CulturesCarousel from "@/app/components/career/CulturesCarousel";
import CountryCodeInput from "@/app/components/global/CountryCodeInput";
import FAQ from "@/app/components/global/FAQ";
import FileUpload from "@/app/components/global/FileUpload";
import { CareerPageDataType } from "@/app/utils/Types";
import { Link } from "@/i18n/navigation";
import { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";

async function getCareerPageData(locale: string): Promise<CareerPageDataType> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getCareerPageInfo`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      lang: locale,
    }
  });

  if (!res.ok) {
    console.log(res, "res")
    console.log("Server responded with error code:", res.status);
    if (res.status == 500 || res.status == 502 || res.status == 503 || res.status == 504) {
      throw new Error("Failed to fetch Server issue");
    } else {
      throw new Error("Failed to fetch homepage data");
    }
  }

  return res.json();
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const { data } = await getCareerPageData(locale);

  return {
    title: data?.title,
    description: data?.meta_description,
    keywords: data?.meta_keywords
  };
}


export default async function Page() {
  const locale = await getLocale();

  const t = await getTranslations('Career');

  async function getCareerPageData(locale: string): Promise<CareerPageDataType> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getCareerPageInfo`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        lang: locale,
      }
    });
  
    if (!res.ok) {
      console.log(res, "res")
      console.log("Server responded with error code:", res.status);
      if (res.status == 500 || res.status == 502 || res.status == 503 || res.status == 504) {
        throw new Error("Failed to fetch Server issue");
      } else {
        throw new Error("Failed to fetch homepage data");
      }
    }
  
    return res.json();
  }

  // fetch typed data
  const { data } = await getCareerPageData(locale);

  return (
    <>
      {/* <!-- Hero Section --> */}
      <section className="relative pt-[4rem] lg:pt-[6.7rem]">
        <div className="relative bg-[#FCF4E9] overflow-hidden">
          {/* <!-- Main Content --> */}
          <div className="max-w-[1670px] mx-auto relative z-[50] grid xl:grid-cols-2 2xl:grid-cols-4">
            {/* <!-- Background Vector --> */}
            <div className="absolute right-[20px] top-[20px] ltr:hidden rtl:hidden rtl:lg:hidden ltr:lg:hidden xl:block ltr:xl:left-[-4%] rtl:xl:right-[-4%] xl:top-[10%] ltr:2xl:left-[6%] rtl:2xl:right-[6%] 2xl:top-[10%] opacity-70 z-[10]">
              <img src="/hero-vector.svg" alt="background decoration" className="w-[225px] h-[543px]" />
            </div>

            {/* LEFT SIDE (Text Content) */}
            <div
              className="bg-[#FCF4E9] h-full relative w-full 2xl:col-span-2
      flex flex-col items-start justify-center gap-[32px]
      px-[15px] xl:px-[5rem] 2xl:px-[10rem] pt-[20px] lg:py-[32px]"
            >
              <h1 className="text-[28px] md:text-[48px] w-full font-bold text-[#232323] leading-[1.5] relative z-[50]">
                {data?.hero_title}
              </h1>

              {/* Decorative Vectors */}
              {/* <div className="absolute w-[217px] z-[50] md:top-[27%] lg:top-[37%] xl:top-[36%] 2xl:top-[38%] right-[45px] md:right-[5%] lg:right-[4%] xl:right-[14%] 2xl:right-[25%] hidden md:block">
                <img src="/vector-svg.svg" alt="decorative element" className="w-[247px] h-[28px]" />
              </div> */}

              <div className="absolute w-[138px] top-[23%] right-[25px] md:hidden z-[50]">
                <img src="/Vector-mobile-career.svg" alt="decorative element" className="" />
              </div>

              <p className="text-[14px] md:text-[18px] font-medium text-[#393939] leading-[1.56] xl:max-w-full relative z-[50]">
               {data?.hero_desc}
              </p>

              {/* Buttons */}
              <div className="flex flex-row gap-4 w-full relative z-[50]">
                <Link href="#jobs" className="bg-[#EDA133] hover:bg-[#D1912A] w-full md:w-auto lg:w-[200px] text-white h-[48px] md:h-auto md:px-6 py-3 rounded-[8px] font-medium text-[14px] md:text-[16px] flex items-center justify-center gap-2 transition-colors">
                  {t("viewJobs")}
                  <svg className="rtl:block ltr:hidden" width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12.6123 4.49951C12.9321 4.49951 13.1973 4.77661 13.1973 5.11084C13.2027 5.27771 13.1309 5.43305 13.0264 5.54248C12.9216 5.65197 12.7777 5.72119 12.6123 5.72119H7.49512L15.8545 14.4585C16.0802 14.6947 16.0802 15.0865 15.8545 15.3228C15.6285 15.559 15.2534 15.559 15.0273 15.3228L6.50391 6.4126V12.106C6.50391 12.4402 6.23967 12.7173 5.91992 12.7173C5.60018 12.7173 5.33594 12.4402 5.33594 12.106V5.11084C5.33594 4.77661 5.60018 4.49952 5.91992 4.49951H12.6123Z"
                      fill="#FCF4E9"
                    />
                  </svg>

                  <svg className="rtl:hidden ltr:block" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.5 7.77686C11.5 8.0966 11.2229 8.36182 10.8887 8.36182C10.7218 8.36726 10.5665 8.29544 10.457 8.19092C10.3475 8.08617 10.2783 7.94224 10.2783 7.77686L10.2783 2.65967L1.54102 11.019C1.30482 11.2448 0.912974 11.2447 0.676757 11.019C0.440512 10.793 0.440555 10.4179 0.676757 10.1919L9.58691 1.66846L3.89355 1.66846C3.55932 1.66846 3.28223 1.40422 3.28223 1.08447C3.28223 0.764729 3.55933 0.500488 3.89355 0.500488L10.8887 0.500488C11.2229 0.500488 11.5 0.764729 11.5 1.08447L11.5 7.77686Z" fill="#FCF4E9"/>
                  </svg>
                </Link>

                {/* <Link href="#resumeForm" className="border border-[#EDA133] text-center w-full md:w-auto lg:w-[200px] text-[#EDA133] h-[48px] md:h-auto md:px-6 py-3 rounded-[8px] font-medium text-[14px] md:text-[16px] hover:bg-orange-50 transition-colors">
                  {t("sendYourCV")}
                </Link> */}
              </div>
            </div>

            {/* RIGHT SIDE (Image) */}
            <div className="w-full h-[350px] md:h-[655px] relative mt-[24px] lg:mt-0 2xl:col-span-2">
              <img src="/career-img.png" alt="hero image" className="w-full h-full object-cover lg:rounded-[8px]" />
            </div>
          </div>
        </div>
      </section>

      {/* <!-- section 2 --> */}
      <section className="bg-white pt-[40px] pb-[24px] md:pt-[56px] lg:h-[770px] ps-[15px] md:px-[15px] 2xl:px-0">
        <div className="hidden lg:block max-w-[1400px] mx-auto lg:px-[30px] space-y-[16px] md:space-y-[20px]">
          {/* <!-- Company Culture & Values --> */}
          <div className="rounded-[32px] bg-[#131A27] h-[260px] grid grid-cols-1 lg:grid-cols-2 items-center gap-[24px] lg:gap-[64px] px-[50px]  xl:w-[1200px] 2xl:w-[1325px] relative">
            <h2 className="text-[#FFFFFF] text-[28px] md:text-[40px] font-bold leading-[1.3]  order-1 lg:order-none">
              {data?.sections?.one?.title}
            </h2>
            <p className="text-[#FFFFFF] text-[14px] leading-[1.6] order-2 lg:order-none max-w-[420px]">
              {data?.sections?.one?.desc}
            </p>

            {/* <!-- Diversity at Business Building --> */}
            <section className="absolute top-[85%]">
              <div className="rounded-[32px] bg-[#F7BF45] h-[260px] grid grid-cols-1 lg:grid-cols-2 items-center gap-[24px] lg:gap-[64px] px-[50px]  xl:w-[1150px] 2xl:w-[1275px]">
                <h2 className="text-[#000000] text-[28px] md:text-[40px] font-bold leading-[1.3]  order-1 lg:order-none">
                  {data?.sections?.two?.title}
                </h2>
                <p className="text-[#000000] text-[14px] leading-[1.6] order-2 lg:order-none max-w-[550px]">
                  {data?.sections?.two?.desc}
                </p>
              </div>
            </section>

            {/* <!-- Company Background --> */}
            <section className="absolute top-[170%]">
              <div className="rounded-[32px] bg-[#EB971B] h-[260px] grid grid-cols-1 lg:grid-cols-2 items-center gap-[24px] lg:gap-[64px] px-[50px]  xl:w-[1100px] 2xl:w-[1200px]">
                <h2 className="text-[#EAEAEA] text-[28px] md:text-[42px] font-bold leading-[1.28]  order-1 lg:order-none">
                  {data?.sections?.three?.title}
                </h2>
                <p className="text-[#EAEAEA] text-[14px] leading-[1.6] order-2 lg:order-none max-w-[450px]">
                  {data?.sections?.three?.desc}
                </p>
              </div>
            </section>
          </div>
        </div>

        <section className="lg:hidden">
          <CulturesCarousel culturesData={data?.sections} />
        </section>
      </section>

      {/* <!-- Benefits Section --> */}
      <section className="relative bg-white ps-[15px] md:px-[15px] pt-[20px] pb-[40px] lg:py-[72px]">
        <div className="max-w-[1400px] mx-auto">
          {/* <!-- flex flex-col --> */}
          <div className="hidden md:flex lg:flex-row items-center max-w-[1319px] mx-auto gap-[16px] ">


                      {/* only md */}
            {/* <!-- Left side - 3 benefit cards --> */}
            {/*             <div className="flex flex-col md:grid md:grid-cols-2 xl:flex xl:flex-wrap lg:flex-row gap-4 w-full lg:w-auto">
 */}
            <div className="flex flex-col md:grid md:grid-cols-2 xl:grid-cols-4 gap-4 w-full lg:w-auto">
              <div className="md:block xl:hidden bg-[#EDA133] rounded-lg p-[15px] px-[21px] flex flex-col justify-between items-center w-full xl:w-[270px]">
                <div className="flex flex-col gap-[32px] items-center w-full h-full">
                  <h2 className="text-[40px] font-bold text-white leading-[1.2]  w-full">المزايا</h2>

                  {/* <!-- Decorative Pattern --> */}
                  <div className="flex flex-col gap-[6px] opacity-20">
                    {/* <!-- Pattern rows - simplified version --> */}
                    <img src="/business-building-svg-career.svg" alt="business building logo" />
                    <img src="/business-building-svg-career.svg" alt="business building logo" />
                    <img src="/business-building-svg-career.svg" alt="business building logo" />
                    <img src="/business-building-svg-career.svg" alt="business building logo" />

                    <img src="/business-building-svg-career.svg" alt="business building logo" />
                    <img src="/business-building-svg-career.svg" alt="business building logo" />
                    <img src="/business-building-svg-career.svg" alt="business building logo" />
                    <img src="/business-building-svg-career.svg" alt="business building logo" />

                    <img src="/business-building-svg-career.svg" alt="business building logo" />
                    <img src="/business-building-svg-career.svg" alt="business building logo" />
                    <img src="/business-building-svg-career.svg" alt="business building logo" />
                    <img src="/business-building-svg-career.svg" alt="business building logo" />
                  </div>

                  {/* <!-- Bottom Content --> */}
                  <div className="flex flex-col gap-[25px] w-full">
                    <p className="text-[16px] font-medium text-white leading-[1.5]  w-full">
                      استفد من العديد من <br /> المزايا التي نقدمها للموظفين - من إجازات مدفوعة إلى مرافق المكتب.
                    </p>
                  </div>
                </div>
              </div>

{/* lg:w-[270px] */}
              <div className="md:hidden xl:block bg-[#EDA133] rounded-lg p-[15px] px-[21px] flex flex-col justify-between items-center w-full lg:min-h-[590px] ">
                <div className="flex flex-col gap-[32px] items-center w-full h-full">
                  <h2 className="text-[36px] font-bold text-white leading-[1.2] w-full">{data?.our_benefits?.title}</h2>

                  {/* <!-- Decorative Pattern --> */}
                  <div className="flex flex-col gap-[6px] opacity-20">
                    {/* <!-- Pattern rows - simplified version --> */}
                    <img src="/business-building-svg-career.svg" alt="business building logo" />
                    <img src="/business-building-svg-career.svg" alt="business building logo" />
                    <img src="/business-building-svg-career.svg" alt="business building logo" />
                    <img src="/business-building-svg-career.svg" alt="business building logo" />

                    <img src="/business-building-svg-career.svg" alt="business building logo" />
                    <img src="/business-building-svg-career.svg" alt="business building logo" />
                    <img src="/business-building-svg-career.svg" alt="business building logo" />
                    <img src="/business-building-svg-career.svg" alt="business building logo" />

                    <img src="/business-building-svg-career.svg" alt="business building logo" />
                    <img src="/business-building-svg-career.svg" alt="business building logo" />
                    <img src="/business-building-svg-career.svg" alt="business building logo" />
                    <img src="/business-building-svg-career.svg" alt="business building logo" />
                  </div>

                  {/* <!-- Bottom Content --> */}
                  <div className="flex flex-col gap-[25px] w-full">
                    <p className="text-[16px] font-medium text-white leading-[1.5]  w-full">
                      {data?.our_benefits?.desc}
                    </p>
                    {/* <button className="flex justify-center items-center gap-[10px] px-6 py-[14px] w-[200px] h-[56px] border border-[#FCF4E9] rounded-lg hover:bg-[#FCF4E9] text-white hover:text-[#EDA133] transition-colors">
                      <span className="text-[16px] font-medium">عرض جميع المزايا</span>
                    </button> */}

                    <section className="flex justify-center items-center gap-[10px] px-6 py-[14px] w-[200px] h-[56px] ">
                      
                    </section>
                  </div>
                </div>
              </div>

{/* min-h-[531px] */}
              {data?.our_benefits?.benefits.map(benefit => {
                return (
                  // xl:w-[333px
                  <div key={benefit?.id} className="flex flex-col justify-between items-end gap-12 w-full ] bg-[#EAEAEA] rounded-lg p-[18px] min-h-[531px] 2xl:min-h-[590px] py-[53.5px]">
                    <div className="flex flex-col justify-between items-end gap-[29.6px] w-full h-full">
                      <h3 className="text-[20px] font-extrabold text-black leading-[1.6]  w-full">
                        {benefit?.title}
                      </h3>
                      <div
                        className="w-full h-[250px] bg-black bg-opacity-30 rounded-[6px] relative overflow-hidden"
                        style={{
                          backgroundImage: `url(${benefit?.image_url})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      ></div>
                      <p className="text-[14px] font-medium text-black leading-[1.43]  w-full h-[110px]">
                        {benefit?.description}
                      </p>
                    </div>
                  </div>
                )
              })}

            </div>
          </div>

          <section className="md:hidden">
            <BenefitsCarousel benefits={data?.our_benefits} />
          </section>
        </div>
      </section>

      {/* <!-- Job Listings Section --> */} 
       {/* right-[15%] */}

      {/* <section id="jobs" className="relative bg-[#131A27] px-[15px] pt-[20px] pb-[64px] md:py-[72px]">
        <div className="absolute inset-0  top-[10%] hidden md:block">
          <img src="/career-bg-svg.svg" alt="background art" />
        </div>

        <div className="hidden md:block max-w-[1400px] mx-auto lg:px-[47px]">
          <div className="text-center mb-[29px] md:mb-[48px] px-[15px] 2xl:px-0 max-w-[636px] mx-auto">
            <h2 className="text-[24px] md:text-[40px] font-bold text-white mb-[12px]">فرصنا الوظيفية الحالية</h2>
            <p className="text-[14px] md:text-[18px] text-[#B1B1B1] font-medium leading-relaxed max-w-3xl mx-auto">
              استعرض قائمة الوظائف المتاحة لدينا حاليًا، وتقدّم للفرصة التي تناسب مهاراتك وخبراتك.
            </p>
          </div>

          <div className="max-w-[1319px] mx-auto bg-[#313B4D] rounded-lg p-4 md:p-9 relative z-[50]">
            <div className="hidden md:block">
              <table className="w-full table-fixed">
                <colgroup>
                  <col className="xl:w-[280px]" />
                  <col className="xl:w-[240px]" />
                  <col className="xl:w-[200px]" />
                  <col className="xl:w-[220px]" />
                  <col className="xl:w-[180px]" />
                </colgroup>
                <thead>
                  <tr className="opacity-60">
                    <th className="text-start pr-4 py-3">
                      <span className="text-white text-[20px] font-medium leading-[1.87] opacity-80">المسمى الوظيفي</span>
                    </th>
                    <th className="text-start pr-4 py-3">
                      <span className="text-white text-[20px] font-medium leading-[1.56] opacity-80">القسم</span>
                    </th>
                    <th className="text-start pr-4 py-3">
                      <span className="text-white text-[20px] font-medium leading-[1.56] opacity-80">نوع العمل</span>
                    </th>
                    <th className="text-start pr-4 py-3">
                      <span className="text-white text_[20px] font-medium leading-[1.56] opacity-80">المدينة</span>
                    </th>
                    <th className="text-start pr-4 py-3">
                      <span className="text-white text-[20px] font-medium leading-[1.56] opacity-80">زر التقديم</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-white/20 align-middle">
                    <td className="pr-4 py-4">
                      <span className="text-white text-[16px] md:text-[18px] font-bold leading-[1.44]">مصمم UI/UX</span>
                    </td>
                    <td className="pr-4 py-4">
                      <span className="text-white text-[18px] font-medium leading-[1.44] opacity-80">انجليزي التصميم</span>
                    </td>
                    <td className="pr-4 py-4">
                      <span className="text-white text-[18px] font-medium leading-[1.44] opacity-80">دوام</span>
                    </td>
                    <td className="pr-4 py-4">
                    <span className="text-white text-[18px] font-medium leading-[1.44] opacity-80"> القاهرة</span>
                    </td>
                    <td className="pr-4 py-4">
                      <Link href={`/career/apply-job-form/1`}>
                        <div className="flex items-center justify-start gap-2">
                          <span className="text-[#EDA133] text-[18px] font-medium leading-[1.44] hover:underline">تقدم الان</span>
                          <img src="/ArrowUpRight-svg.svg" alt="arrow up right icon" />
                        </div>
                      </Link>
                    </td>
                  </tr>
                  <tr className="border-t border-white/20 align-middle">
                    <td className="pr-4 py-4">
                      <span className="text-white text-[16px] md:text-[18px] font-bold leading-[1.44]">مدير مشاريع تقنية</span>
                    </td>
                    <td className="pr-4 py-4">
                      <span className="text-white text-[18px] font-medium leading-[1.44] opacity-80">التصميم</span>
                    </td>
                    <td className="pr-4 py-4">
                      <span className="text-white text-[18px] font-medium leading-[1.44] opacity-80">دوام كامل</span>
                    </td>
                    <td className="pr-4 py-4">
                      <span className="text-white text-[18px] font-medium leading-[1.44] opacity-80">القاهرة</span>
                    </td>
                    <td className="pr-4 py-4">
                      <Link href={`/career/apply-job-form/1`}>
                        <div className="flex items-center justify-start gap-2">
                          <span className="text-[#EDA133] text-[18px] font-medium leading-[1.44] hover:underline">تقدم الان</span>
                          <img src="/ArrowUpRight-svg.svg" alt="arrow up right icon" />
                        </div>
                      </Link>
                    </td>
                  </tr>
                  <tr className="border-t border-white/20 align-middle">
                    <td className="pr-4 py-4">
                      <span className="text-white text-[16px] md:text-[18px] font-bold leading-[1.44]">مصمم UI/UX</span>
                    </td>
                    <td className="pr-4 py-4">
                      <span className="text-white text-[18px] font-medium leading-[1.44] opacity-80">التصميم</span>
                    </td>
                    <td className="pr-4 py-4">
                      <span className="text-white text-[18px] font-medium leading-[1.44] opacity-80">دوام كامل</span>
                    </td>
                    <td className="pr-4 py-4">
                      <span className="text-white text-[18px] font-medium leading-[1.44] opacity-80">القاهرة</span>
                    </td>
                    <td className="pr-4 py-4">
                      <Link href={`/career/apply-job-form/1`}>
                        <div className="flex items-center justify-start gap-2">
                          <span className="text-[#EDA133] text-[18px] font-medium leading-[1.44] hover:underline">تقدم الان</span>
                          <img src="/ArrowUpRight-svg.svg" alt="arrow up right icon" />
                        </div>
                      </Link>
                    </td>
                  </tr>
                  <tr className="border-t border-white/20 align-middle">
                    <td className="pr-4 py-4">
                      <span className="text-white text-[16px] md:text-[18px] font-bold leading-[1.44]">مصمم UI/UX</span>
                    </td>
                    <td className="pr-4 py-4">
                      <span className="text-white text-[18px] font-medium leading-[1.44] opacity-80">التصميم</span>
                    </td>
                    <td className="pr-4 py-4">
                      <span className="text-white text-[18px] font-medium leading-[1.44] opacity-80">دوام كامل</span>
                    </td>
                    <td className="pr-4 py-4">
                      <span className="text-white text-[18px] font-medium leading-[1.44] opacity-80">القاهرة</span>
                    </td>
                    <td className="pr-4 py-4">
                      <Link href={`/career/apply-job-form/1`}>
                        <div className="flex items-center justify-start gap-2">
                          <span className="text-[#EDA133] text-[18px] font-medium leading-[1.44] hover:underline">تقدم الان</span>
                          <img src="/ArrowUpRight-svg.svg" alt="arrow up right icon" />
                        </div>
                      </Link>
                    </td>
                  </tr>
                  <tr className="border-t border-white/20 align-middle">
                    <td className="pr-4 py-4">
                      <span className="text-white text-[16px] md:text-[18px] font-bold leading-[1.44]">مصمم UI/UX</span>
                    </td>
                    <td className="pr-4 py-4">
                      <span className="text-white text-[18px] font-medium leading-[1.44] opacity-80">التصميم</span>
                    </td>
                    <td className="pr-4 py-4">
                      <span className="text-white text-[18px] font-medium leading-[1.44] opacity-80">دوام كامل</span>
                    </td>
                    <td className="pr-4 py-4">
                      <span className="text-white text-[18px] font-medium leading-[1.44] opacity-80">القاهرة</span>
                    </td>
                    <td className="pr-4 py-4">
                      <Link href={`/career/apply-job-form/1`}>
                        <div className="flex items-center justify-start gap-2">
                          <span className="text-[#EDA133] text-[18px] font-medium leading-[1.44] hover:underline">تقدم الان</span>
                          <img src="/ArrowUpRight-svg.svg" alt="arrow up right icon" />
                        </div>
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="md:hidden max-w-[1400px] mx-auto lg:px-[47px]">
          <div className="md:hidden absolute inset-0 right-[15%] top-[1%]">
            <img className="w-[455px]" src="/career-bg-svg.svg" alt="background art" />
          </div>

          <div className="text-center mt-[32px] md:mt-0 mb-[29px] md:mb-[48px] px-[15px] 2xl:px-0 max-w-[636px] mx-auto">
            <h2 className="text-[24px] md:text-[40px] font-bold text-white mb-[12px]">فرصنا الوظيفية الحالية</h2>
            <p className="text-[14px] md:text-[18px] text-[#B1B1B1] font-medium leading-relaxed max-w-3xl mx-auto">
              استعرض قائمة الوظائف المتاحة لدينا حاليًا، وتقدّم للفرصة التي تناسب مهاراتك وخبراتك.
            </p>
          </div>

          <section className="flex flex-col gap-[24px]">
            <div className="bg-[#313B4D] rounded-lg relative z-[50]">
              <div className="space-y-5">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-3 md:space-y-0 p-4 md:p-0">
                  <div className="flex justify-between items-center">
                    <span className="text-white text-[16px] md:text-[18px] font-bold leading-[1.44]">مصمم UI/UX</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#D0D1D4] text-[14px] font-medium leading-[1.44] opacity-80">المدينة</span>
                    <span className="text-white text-[14px] font-medium leading-[1.44] opacity-80">القاهرة</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#D0D1D4] text-[14px] font-medium leading-[1.44] opacity-80">نوع العمل</span>
                    <span className="text-white text-[14px] font-medium leading-[1.44] opacity-80">دوام - كامل</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#D0D1D4] text-[14px] font-medium leading-[1.44] opacity-80">القسم</span>
                    <span className="text-white text-[14px] font-medium leading-[1.44] opacity-80">التصميم</span>
                  </div>
                  <a href="appy-job-page.html" className="mt-[16px]">
                    <div className="flex items-center gap-2">
                      <span className="text-[#EDA133] text-[18px] font-medium leading-[1.44] hover:underline">
                        تقدم الان
                      </span>
                      <img src="/ArrowUpRight-svg.svg" alt="arrow up right icon" />
                    </div>
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-[#313B4D] rounded-lg relative z-[50]">
              <div className="space-y-5">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-3 md:space-y-0 p-4 md:p-0">
                  <div className="flex justify-between items-center">
                    <span className="text-white text-[16px] md:text-[18px] font-bold leading-[1.44]">مصمم UI/UX</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#D0D1D4] text-[14px] font-medium leading-[1.44] opacity-80">المدينة</span>
                    <span className="text-white text-[14px] font-medium leading-[1.44] opacity-80">القاهرة</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#D0D1D4] text-[14px] font-medium leading-[1.44] opacity-80">نوع العمل</span>
                    <span className="text-white text-[14px] font-medium leading-[1.44] opacity-80">دوام - كامل</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#D0D1D4] text-[14px] font-medium leading-[1.44] opacity-80">القسم</span>
                    <span className="text-white text-[14px] font-medium leading-[1.44] opacity-80">التصميم</span>
                  </div>
                  <a href="appy-job-page.html" className="mt-[16px]">
                    <div className="flex items-center gap-2">
                      <span className="text-[#EDA133] text-[18px] font-medium leading-[1.44] hover:underline">
                        تقدم الان
                      </span>
                      <img src="/ArrowUpRight-svg.svg" alt="arrow up right icon" />
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section> */}

      {/* <!-- form --> */}
      {/* <section id="resumeForm" className="relative bg-white px-[15px] pt-[40px] pb-[64px] md:py-[72px]">
        <div className="max-w-[1400px] mx-auto lg:px-[47px]">
          <div className="text-center mb-[29px] md:mb-[48px] px-[15px] 2xl:px-0 max-w-[636px] mx-auto">
            <h2 className="text-[24px] md:text-[40px] font-bold text-black mb-[12px]">نموذج التقديم على الوظيفة</h2>
            <p className="text-[14px] md:text-[18px] text-[#4A4A4A] font-medium leading-relaxed max-w-3xl mx-auto">
              املأ النموذج التالي بدقة، وسيتواصل معك فريق الموارد البشرية بعد مراجعة البيانات والتحقّق منها.
            </p>
          </div>

          <div className="max-w-[1300px] mx-auto bg-white border border-[#DADADA77] rounded-lg">
            <div className="p-2 md:p-8">
              <div className="space-y-[32px] md:space-y-[40px]">
                <div className="space-y-12">
                  <div className="space-y-[16px] md:space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-[16px] md:gap-6">
                      <div className="space-y-3">
                        <label className="text-base font-medium text-black block">
                          الأسم الكامل <span className="text-[#FF6B6B]">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="الرجاء إدخال اسمك."
                          className="w-full h-12 px-3 py-2 border border-[#DADADA] rounded-md text-sm text-black placeholder-[#B1B1B1] focus:outline-none focus:border-[#EDA133]"
                        />
                      </div>

                      <div className="space-y-3">
                        <label className="text-base font-medium text-black block">
                          البريد الإلكتروني
                          <span className="text-[#FF6B6B]">*</span>
                        </label>
                        <input
                          type="email"
                          placeholder="الرجاء إدخال البريد الإلكتروني."
                          className="w-full h-12 px-3 py-2 border border-[#DADADA] rounded-md text-sm text-black placeholder-[#B1B1B1] focus:outline-none focus:border-[#EDA133]"
                        />
                      </div>

                      <CountryCodeInput />

                      <div className="space-y-3">
                        <label className="text-base font-medium text-black block">حساب Linkedin أو معرض أعمال</label>
                        <input
                          type="text"
                          placeholder="الرجاء إدخال حساب لينكدان او معرض اعمالك."
                          className="w-full h-12 px-3 py-2 border border-[#DADADA] rounded-md text-sm text-black placeholder-[#B1B1B1] focus:outline-none focus:border-[#EDA133]"
                        />
                      </div>

                      <div className="space-y-3 lg:col-span-2">
                        <label className="text-[16px] font-medium text-black block">رسالة تعريفية</label>
                        <textarea
                          placeholder="الرجاء إدخال لنا نبذة مختصرة عن المشروع أو الفكرة."
                          className="w-full h-36 px-3 py-3 border border-[#DADADA] rounded-md text-sm text-black placeholder-[#B1B1B1] focus:outline-none focus:border-[#EDA133] resize-none"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-12">
                  <div className="space-y-[32px] md:space-b-[48px] md:space-t-[56px]">
                    <div className="space-y-[16px] md:space-y-6">
                      <FileUpload title="السيرة الذاتية" required={true} />
                    </div>

                    <section className="w-full mt-[32px] md:mt-[49px]">
                      <div>
                        <button className="flex-1 px-4 py-2 bg-[#EDA133] w-full md:w-[268px] h-[56px] text-white rounded-lg text-base font-medium hover:bg-[#D1912A] transition-colors">
                          إرسال
                        </button>
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* <!-- FAQ Section --> */}
      <FAQ faqs={data?.faqs ? data?.faqs : []} />
    </>
  );
}
