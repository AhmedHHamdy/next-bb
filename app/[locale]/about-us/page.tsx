

import ServicesMarquee from "@/app/components/about-us/ServicesMarquee";
import Counters from "@/app/components/global/Counters";
import ProjectLogos from "@/app/components/global/PojectLogos";
import Reviews from "@/app/components/global/Reviews";
import { AboutUsData } from "@/app/utils/Types";
import { Link } from "@/i18n/navigation";
import { getLocale } from "next-intl/server";
// import { routing } from "@/i18n/routing";
// import { setRequestLocale } from "next-intl/server";
// import { use } from "react";

// export function generateStaticParams() {
//   return routing.locales.map((locale) => ({locale}));
// }

async function getAboutUsPageData(locale: string): Promise<AboutUsData> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getAboutUsPage`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      lang: locale,
    }
  });

  if (!res.ok) {
    if (res.status == 500 || res.status == 502 || res.status == 503 || res.status == 504) {
      throw new Error("Failed to fetch Server issue");
    } else {
      throw new Error("Failed to fetch About us data");
    }
  }

  return res.json();
}

export default async function Page() {
  // const {locale} = use(params);

  // setRequestLocale(locale);

  const locale = await getLocale();


  // fetch typed data
  const { data } = await getAboutUsPageData(locale);

  return (
    <>
      {/* <!-- Hero Section --> */}
      <section className="relative pt-[4rem] lg:pt-[6.7rem]">
        <div className="relative bg-[#FCF4E9] overflow-hidden">

          {/* <!-- Main Content --> */}
          <div className="max-w-[1670px] mx-auto relative z-[50] grid lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-5">
            {/* <!-- Background Vector --> */}
            <div className="absolute hidden lg:block ltr:left-[20px] right-[20px] top-[20px] ltr:xl:left-[-4%] xl:right-[-4%] xl:top-[10%] ltr:2xl:left-[6%]  rtl:2xl:right-[6%] 2xl:top-[10%] opacity-70 z-[10]">
              <img
                src="/hero-vector.svg"
                alt="background decoration"
                className="w-[225px] h-[543px]"
              />
            </div>

            {/* LEFT SIDE (Text Content) */}
            <div
              className="bg-[#FCF4E9] h-full relative w-full 2xl:col-span-3
              flex flex-col items-start justify-center gap-[32px]
              px-[15px] xl:px-[5rem] 2xl:px-[14rem] pt-[20px] lg:py-[32px]"
            >
              <h1 className="text-[28px] md:text-[48px] w-full font-bold text-[#232323] leading-[1.75] relative z-[50]">
                {data?.other?.header_title?.slice(0, 80)}
              </h1>

              {/* Decorative Vectors */}
              <div className="absolute z-[50] md:top-[35%] lg:top-[33%] xl:top-[36%] 2xl:top-[35%] right-[45px] md:right-[5%] lg:right-[4%] xl:right-[14%] 2xl:right-[25%] hidden md:block">
                <img
                  src="/hero-vector-1393.svg"
                  alt="decorative element"
                  className="w-[247px] h-[28px]"
                />
              </div>

              <div className="absolute top-[23%] right-[25px] md:hidden z-[50]">
                <img
                  src="/hero-vector-mobile.svg"
                  alt="decorative element"
                  className=""
                />
              </div>

              <p className="text-[14px] md:text-[18px] font-medium text-[#393939] leading-[1.56] xl:max-w-full relative z-[50]">
                {data?.other?.header_description?.slice(0, 255)}
              </p>

              {/* Buttons */}
              <div className="flex flex-row gap-4 w-full relative z-[50]">
                <Link href="/fee-consultation" className="bg-[#EDA133] hover:bg-[#D1912A] w-full md:w-auto text-white h-[48px] md:h-auto md:px-6 py-3 rounded-[8px] font-medium text-[14px] md:text-[16px] flex items-center justify-center gap-2 transition-colors">
                  احجز استشارة مجانية
                  <svg
                    width="17"
                    height="17"
                    viewBox="0 0 17 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.6123 4.49951C12.9321 4.49951 13.1973 4.77661 13.1973 5.11084C13.2027 5.27771 13.1309 5.43305 13.0264 5.54248C12.9216 5.65197 12.7777 5.72119 12.6123 5.72119H7.49512L15.8545 14.4585C16.0802 14.6947 16.0802 15.0865 15.8545 15.3228C15.6285 15.559 15.2534 15.559 15.0273 15.3228L6.50391 6.4126V12.106C6.50391 12.4402 6.23967 12.7173 5.91992 12.7173C5.60018 12.7173 5.33594 12.4402 5.33594 12.106V5.11084C5.33594 4.77661 5.60018 4.49952 5.91992 4.49951H12.6123Z"
                      fill="white"
                    />
                  </svg>
                </Link>

                <Link href="/projects" className="border border-[#EDA133] w-full md:w-auto text-[#EDA133] h-[48px] md:h-auto md:px-6 py-3 rounded-[8px] font-medium text-[14px] md:text-[16px] hover:bg-orange-50 transition-colors">
                  شاهد أعمالنا
                </Link>
              </div>
            </div>

            {/* RIGHT SIDE (Image) */}
            <div className="w-full h-[350px] md:h-[655px] relative mt-[24px] lg:mt-0 2xl:col-span-2">
              <img
                src="/hero-img.jpeg"
                alt="hero image"
                className="w-full h-full object-cover lg:rounded-[8px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* <!-- About Us Section --> */}
      <section className="relative bg-[#131A27] lg:h-[759px] flex flex-col justify-center overflow-hidden py-[48px]">
        {/* <!-- Content --> */}
        <div className="relative z-10 flex flex-col-reverse md:flex-row items-center justify-between max-w-[1400px] mx-auto gap-[72px] lg:gap-[161px] px-[25px] 2xl:px-0">
          <div className="w-full xl:w-[429px] h-[298px] md:h-[429px] relative">
            <div className="absolute inset-0 bg-[#FCF4E9] rounded-[7px]"></div>
            <div className="relative w-full h-full rounded-[7px] overflow-hidden transform -rotate-10">
              <img src="/about-team.png" alt="team" className="w-full h-full object-cover" />
            </div>
          </div>

          <div className="w-full lg:w-[666px] flex flex-col gap-10">
            {/* <!-- Main Content --> */}
            <div className="flex flex-col gap-10">
              {/* <!-- Heading and Subtitle --> */}
              <div className="flex flex-col gap-4">
                <h2 className="text-[32px] md:text-[40px] font-bold text-[#E7E8E9]  leading-[1.2]">من نحن؟</h2>
                <p className="text-[18px] text-white font-medium md:text-[#B8BABE] leading-[1.44]">
                  نحن شركة Business Building
                </p>
              </div>

              {/* <!-- Description --> */}
              <section>
                <p className="text-[16px] md:text-[18px] text-[#DADADA] leading-[1.56] max-w-[662px]">
                  نعمل في السوقين السعودي والمصري لتقديم حلول رقمية عالية الجودة، تشمل تطوير المواقع والتطبيقات،
                  استراتيجيات التسويق الذكية، وخدمة عملاء احترافية.
                </p>
                <p className="text-[16px] md:text-[18px] text-[#DADADA] leading-[1.56] max-w-[662px]">
                  نهدف إلى تمكين الشركات والمؤسسات من تحقيق تحول رقمي فعّال يواكب طموحات النمو.
                </p>
              </section>
            </div>

            {/* <!-- Features List --> */}
            <div className="flex flex-col gap-6 w-full">
              {/* <!-- Features --> */}
              {data.other.expressions.map(expression => {
                return (
                  <div key={expression.id} className="flex items-center gap-4">
                    <img src={expression.image_url} alt="experience" className="w-12 h-12" />
                    <span className="text-[16px] md:text-[24px] font-bold text-[#DADADA] ">{expression.title}</span>
                  </div>
                )
              })}
              

              {/* <!-- Feature 2 --> */}
              {/* <div className="flex items-center gap-4">
                <img src="/team-icon.svg" alt="team" className="w-12 h-12" />
                <span className="text-[16px] md:text-[24px] font-bold text-[#DADADA] ">فريق عمل متنوع من الخبراء</span>
              </div> */}

              {/* <!-- Feature 3 --> */}
              {/* <div className="flex items-center gap-4">
                <img src="/projects-icon.svg" alt="projects" className="w-12 h-12" />
                <span className="text-[16px] md:text-[24px] font-bold text-[#DADADA] ">أكثر من 100 مشروع ناجح</span>
              </div> */}

              {/* <!-- Feature 4 --> */}
              {/* <div className="flex items-center gap-4 w-full">
                <img src="/clients-icon.svg" alt="clients" className="w-12 h-12" />

                <span className="text-[16px] md:text-[24px] font-bold text-[#DADADA] ">
                  عملاء من 6 دول في الخليج والعالم العربي
                </span>
              </div> */}
            </div>
          </div>
        </div>
      </section>

      {/* <!-- Vision & Mission Section --> */}
      <section className="mt-[48px] lg:mt-[72px]">
        <div className="relative bg-[#E7E8E933] max-w-[1400px] mx-auto rounded-[8px] overflow-hidden mb-[32px] md:mb-0">
          {/* <!-- Content --> */}
          <div className="relative z-10 flex flex-col lg:flex-row lg:justify-between gap-8 lg:gap-20 px-[15px] 2xl:px-0">
            {/* <!-- Right Side - Content --> */}
            <div className="w-full xl:w-[666px] flex flex-col gap-6">
              {/* <!-- Main Heading --> */}
              <h2 className="text-[32px] md:text-[40px] font-bold text-[#232323] leading-[1.4]">
                {data?.other?.header_title?.slice(0, 80)}
              </h2>

              {/* <!-- Description --> */}
              <p className="text-[14px] md:text-[20px] font-medium md:font-regular text-[#393939] leading-[1.6]">
                {data?.other?.header_description}
              </p>

              {/* <!-- Vision & Mission Cards --> */}
              <div className="w-full flex flex-col gap-[35px] xl:px-[40px]">
                {/* <!-- Vision Card --> */}
                <div className="w-full border-t border-[#E7E8E9] pt-[36px]">
                  <div className="flex flex-row flex-wrap lg:flex-nowrap items-center md:items-center md:justify-between gap-6 md:gap-16">
                    {/* <!-- Icon --> */}
                    <img src="/vision-icon.svg" alt="vision" className="w-[56px] md:w-20 h-[56px] md:h-20" />

                    {/* <!-- Content --> */}
                    <h3 className="text-[20px] md:text-[32px] font-bold text-[#131A27] ">رؤيتنا</h3>

                    <p className="text-[14px] md:text-[16px] text-[#2A313D] font-medium leading-[1.5] max-w-[277px]">
                        {data?.other?.our_vision?.slice(0, 80)}
                    </p>
                  </div>
                </div>

                {/* <!-- Mission Card --> */}
                <div className="w-full border-t border-[#E7E8E9] pt-[36px]">
                  <div className="flex flex-row flex-wrap lg:flex-nowrap  items-center md:items-center md:justify-between gap-6 md:gap-16">
                    {/* <!-- Icon --> */}
                    <img src="/mission-icon.svg" alt="mission" className="w-[56px] md:w-20 h-[56px] md:h-20" />

                    {/* <!-- Content --> */}
                    <h3 className="text-[20px] md:text-[32px] font-bold text-[#131A27] ">مهمتنا</h3>

                    <p className="text-[14px] md:text-[16px] text-[#2A313D] font-medium leading-[1.5] max-w-[277px]">
                      {data?.other?.our_mission?.slice(0, 80)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* <!-- Left Side - Rating Card --> */}
            <div className="w-full xl:w-[580px] xl:h-[474px] relative">
              <img src="/vision-bg.png" alt="team" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        {/* <!-- Core Values Section --> */}
        <section className="mb-[32px] lg:mt-[48px] max-w-[1400px] mx-auto px-[30px] lg:px-0 border-y border-[#E7E8E9] py-[15px] lg:py-[32px]">
          <div className="w-full">
            <div className="w-full relative">
              <div className="w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-6 lg:px-[40px]">
                <h3 className="text-[20px] md:text-[36px] font-bold text-[#232323] ">قيمنا الأساسية</h3>

                {/* <!-- Values Grid --> */}

                <div className="flex flex-row items-center gap-6 lg:gap-24">
                  <div className="flex flex-col items-center gap-2">
                    <img src="/quality-icon.gif" alt="quality" className="w-24 h-24 object-cover" />
                    <span className="text-[18px] md:text-[20px] font-medium text-[#232323] text-center">{data?.other?.our_values?.first?.slice(0, 80)}</span>
                  </div>

                  <div className="flex flex-col items-center gap-2">
                    <img src="/flexibility-icon.gif" alt="flexibility" className="w-24 h-24 object-cover" />
                    <span className="text-[18px] md:text-[20px] font-medium text-[#232323] text-center">{data?.other?.our_values?.second?.slice(0, 80)}</span>
                  </div>

                  <div className="flex flex-col items-center gap-2">
                    <img src="/innovation-icon.gif" alt="innovation" className="w-24 h-24 object-cover" />
                    <span className="text-[18px] md:text-[20px] font-medium text-[#232323] text-center">{data?.other?.our_values?.third?.slice(0, 80)}</span>
                  </div>
                </div>
                
              </div>

              {/* <!-- Right Side - Decorative Pattern --> */}
              <div className="flex flex-col md:flex-row w-full h-full md:h-[166px] md:justify-between absolute top-[20px] md:top-[0px] lg:top-[-10px] opacity-10 lg:px-[55px]">
                <img
                  className="w-[300px] xl:w-[600px]"
                  src="/vision-background-values.svg"
                  alt="background vision values"
                />
                <img
                  className="w-[300px] xl:w-[600px]"
                  src="/vision-background-values.svg"
                  alt="background vision values"
                />
              </div>
            </div>
          </div>
        </section>
      </section>

      {/* <!-- Why Choose Us Section --> */}
      <section className="xl:py-[48px] bg-white">
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="text-center mb-[24px] lg:mb-[54px]">
            <h2 className="text-[24px] md:text-[40px] font-bold text-black mb-1 leading-[1.49]">
              لماذا نحن؟ <span className="text-[#F2B660]">الفرق التنافسي</span>
            </h2>
            <p className="text-[14px] md:text-[18px] mt-[12px] md:mt-0 text-[#4A4A4A] font-medium leading-[1.56] max-w-[600px] mx-auto">
              {/* نوفّر حلولًا رقمية شاملة تُلبي جميع متطلباتك التقنية، من تطوير البرمجيات، إلى التسويق الرقمي، وانتهاءً
              بخدمات الدعم والمساندة. */}
              {data?.other?.why_us?.description}
            </p>
          </div>

          {/* <!-- Content with Image and Cards --> */}
          <div className="relative">
            <div className="hidden relative z-10 md:flex justify-center mb-8">
              <img src="/why-choose-us-bg.png" alt="Why Choose Us" className="object-cover" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px] lg:gap-x-[378px] lg:gap-y-[82px] max-w-[1400px] mx-auto lg:absolute lg:top-[-15px] lg:z-20">
              <div className="bg-white border border-[#E7E8E9] rounded-xl p-[16px] xl:p-6 shadow-sm">
                <div className="text-right">
                  <h3 className="text-[18px] md:text-[24px] font-bold text-[#131A27] mb-4">خبرة متعددة التخصصات</h3>
                  <p className="text-[14px] md:text-[18px] text-[#2A313D] font-medium leading-[1.44]">
                    أن نصبح الشريك الرقمي الأول للشركات الخليجية من خلال خدمات تجمع بين التقنية والابتكار.
                  </p>
                </div>
              </div>

              <div className="bg-white border border-[#E7E8E9] rounded-xl p-6 shadow-sm">
                <div className="text-right">
                  <h3 className="text-[18px] md:text-[24px] font-bold text-[#131A27] mb-4">
                    خدمات متكاملة تحت سقف واحد
                  </h3>
                  <p className="text-[14px] md:text-[18px] text-[#2A313D] font-medium leading-[1.44]">
                    كل ما تحتاجه لبناء حضور رقمي قوي، في مكان واحد: برمجة، تسويق، دعم.
                  </p>
                </div>
              </div>

              <div className="bg-white border border-[#E7E8E9] rounded-xl p-6 shadow-sm">
                <div className="text-right">
                  <h3 className="text-[18px] md:text-[24px] font-bold text-[#131A27] mb-4">
                    رؤية استراتيجية طويلة المدى
                  </h3>
                  <p className="text-[14px] md:text-[18px] text-[#2A313D] font-medium leading-[1.44]">
                    أن نصبح الشريك الرقمي الأول للشركات الخليجية من خلال خدمات تجمع بين التقنية والابتكار.
                  </p>
                </div>
              </div>

              <div className="bg-white border border-[#E7E8E9] rounded-xl p-6 shadow-sm">
                <div className="text-right">
                  <h3 className="text-[18px] md:text-[24px] font-bold text-[#131A27] mb-4">نتائج قابلة للقياس</h3>
                  <p className="text-[14px] md:text-[18px] text-[#2A313D] font-medium leading-[1.44]">
                    نستخدم أدوات تحليل حديثة ونبني استراتيجيات مبنية على أرقام حقيقية.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="md:hidden flex justify-center mt-8">
            <img src="/why-choose-us-bg.png" alt="Why Choose Us" className="object-cover" />
          </div>

          {/* <!-- Our Numbers Section --> */}
          <section className="relative bg-white mt-[30px] lg:pt-[42px]">
            <div>
              {/* <!-- Statistics Grid --> */}
              <Counters countersData={data?.other?.statistics || []} />
            </div>
          </section>
        </div>
      </section>

      {/* <!-- Business Building Services --> */}
      <section className="relative h-[200px] md:h-[250px] flex items-center justify-center overflow-hidden max-w-[2560px] mx-auto">
        {/* <!-- First diagonal line (top-left to bottom-right) --> */}
        <section className="bg-[#313947] w-[120%] h-[42px] md:h-[70px] overflow-hidden flex items-center px-[15px] md:px-0 rotate-5 md:rotate-5 transform  will-change-transform origin-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <ServicesMarquee />
        </section>

        {/* <!-- Second diagonal line (top-right to bottom-left) --> */}
        <section className="bg-[#3E4A5F] w-[120%] h-[42px] md:h-[70px] overflow-hidden flex items-center px-[15px] md:px-0 -rotate-5 md:-rotate-5 transform  will-change-transform origin-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <ServicesMarquee />
        </section>
      </section>

      {/* <!-- Our Services Section --> */}
      <section className="lg:mt-[72px]">
        <div className="relative bg-[#131A27] overflow-hidden pt-[55px] pb-[32px] lg:pb-[100px]">
          {/* <!-- Content --> */}
          <div className="max-w-[1400px] mx-auto relative z-10 flex flex-col items-center text-center px-[15px] lg:px-[60px] 2xl:px-0">
            <div className="w-full mb-[32px] md:mb-16">
              <h2 className="text-[24px] md:text-[40px] font-bold text-[#FAEAD1] mb-[8px] md:mb-6 leading-[1.49]">
                من نخدم؟
              </h2>
              <p className="text-[14px] md:text-[18px] font-medium text-[#FAEAD1] leading-[1.56] opacity-80">
                {data?.other?.who_we_serve?.description}
              </p>
            </div>

            <section className="flex flex-col xl:flex-row md:justify-between md:items-center gap-[12px] lg:gap-[24px] xl:gap-[40px]">
              {/* <!-- Service Categories --> */}
              <div className="flex flex-row items-center justify-center gap-12">
                <div className="w-full lg:w-[759px] flex flex-col gap-12">
                  <div className="w-full flex flex-wrap gap-6">
                    {data?.other?.who_we_serve?.clients?.map(service => {
                      return (
                        <button
                          key={service.id}
                          className="px-4 md:px-6 py-4 bg-gradient-to-b from-transparent to-white/10 border-b-2 border-[#FFFFFF4D] hover:from-[#F3887833] hover:to-[#F3C178] hover:border-b-2 hover:border-[#BC6F00] hover:bg-[linear-gradient(180deg,rgba(243,136,120,0.04)_0%,rgba(243,193,120,0.20)_100%)] 
                           rounded-2xl text-gray-500 hover:text-gray-100 text-[16px] md:text-[24px] font-medium leading-[1.85] transition-all duration-300"
                          >
                          {service.name}
                        </button>
                      )
                    })}

                    {/* <button
                      className="px-4 md:px-6 py-4 bg-gradient-to-b from-transparent to-white/10 border-b-2 border-[#FFFFFF4D] hover:from-[#F3887833] hover:to-[#F3C178] hover:border-b-2 hover:border-[#BC6F00] hover:bg-[linear-gradient(180deg,rgba(243,136,120,0.04)_0%,rgba(243,193,120,0.20)_100%)] 
                  rounded-2xl text-gray-500 hover:text-gray-100 text-[16px] md:text-[24px] font-medium leading-[1.85] transition-all duration-300"
                    >
                      شركات ناشئة
                    </button>

                    <button
                      className="px-4 md:px-6 py-4 bg-gradient-to-b from-transparent to-white/10 border-b-2 border-[#FFFFFF4D] hover:from-[#F3887833] hover:to-[#F3C178] hover:border-b-2 hover:border-[#BC6F00] hover:bg-[linear-gradient(180deg,rgba(243,136,120,0.04)_0%,rgba(243,193,120,0.20)_100%)] 
                  rounded-2xl text-gray-500 hover:text-gray-100 text-[16px] md:text-[24px] font-medium leading-[1.85] transition-all duration-300"
                    >
                      {" "}
                      مؤسسات حكومية
                    </button>

                    <button
                      className="px-4 md:px-6 py-4 bg-gradient-to-b from-transparent to-white/10 border-b-2 border-[#FFFFFF4D] hover:from-[#F3887833] hover:to-[#F3C178] hover:border-b-2 hover:border-[#BC6F00] hover:bg-[linear-gradient(180deg,rgba(243,136,120,0.04)_0%,rgba(243,193,120,0.20)_100%)] 
                  rounded-2xl text-gray-500 hover:text-gray-100 text-[16px] md:text-[24px] font-medium leading-[1.85] transition-all duration-300"
                    >
                      {" "}
                      متاجر إلكترونية
                    </button>

                    <button
                      className="px-4 md:px-6 py-4 bg-gradient-to-b from-transparent to-white/10 border-b-2 border-[#FFFFFF4D] hover:from-[#F3887833] hover:to-[#F3C178] hover:border-b-2 hover:border-[#BC6F00] hover:bg-[linear-gradient(180deg,rgba(243,136,120,0.04)_0%,rgba(243,193,120,0.20)_100%)] 
                  rounded-2xl text-gray-500 hover:text-gray-100 text-[16px] md:text-[24px] font-medium leading-[1.85] transition-all duration-300"
                    >
                      منصات تعليمية
                    </button>

                    <button
                      className="px-4 md:px-6 py-4 bg-gradient-to-b from-transparent to-white/10 border-b-2 border-[#FFFFFF4D] hover:from-[#F3887833] hover:to-[#F3C178] hover:border-b-2 hover:border-[#BC6F00] hover:bg-[linear-gradient(180deg,rgba(243,136,120,0.04)_0%,rgba(243,193,120,0.20)_100%)] 
                  rounded-2xl text-gray-500 hover:text-gray-100 text-[16px] md:text-[24px] font-medium leading-[1.85] transition-all duration-300"
                    >
                      مطاعم وعلامات تجارية
                    </button>

                    <button
                      className="px-4 md:px-6 py-4 bg-gradient-to-b from-transparent to-white/10 border-b-2 border-[#FFFFFF4D] hover:from-[#F3887833] hover:to-[#F3C178] hover:border-b-2 hover:border-[#BC6F00] hover:bg-[linear-gradient(180deg,rgba(243,136,120,0.04)_0%,rgba(243,193,120,0.20)_100%)] 
                  rounded-2xl text-gray-500 hover:text-gray-100 text-[16px] md:text-[24px] font-medium leading-[1.85] transition-all duration-300"
                    >
                      علامات تجارية تجزئة
                    </button> */}
                  </div>

                  {/* <!-- Action Buttons --> */}
                  <div className="flex flex-row items-center gap-3 md:gap-4">
                    <a href="#reviews" className="md:px-6 py-4 bg-[#EDA133] rounded-lg text-white h-[48px] md:h-full text-[14px] md:text-[16px] w-full md:w-auto font-medium flex items-center justify-center gap-2 hover:bg-[#D8902A] transition-all duration-300">
                      استعرض قصص النجاح
                      <img src="/arrow-icon.svg" alt="arrow" />
                    </a>

                    <Link href="/projects" className="md:px-6 py-4 border border-[#EDA133] rounded-lg h-[48px] md:h-full text-[#EDA133] text-[14px] w-full md:w-auto md:text-[16px] font-medium hover:bg-[#EDA13333] hover:text-white transition-all duration-300">
                      شاهد المشاريع السابقة
                    </Link>
                  </div>
                </div>
              </div>

              {/* <!-- Background Image --> */}
              <div className="lg:w-[392px] lg:h-[381px] xl:w-[460px] 2xl:w-[592px] 2xl:h-[481px] opacity-80">
                <img src="/services-image-569340.png" alt="services" className="w-full h-full object-cover" />
              </div>
            </section>
          </div>
        </div>
      </section>

      {/* <!-- Business Building Projects bar section --> */}
      <ProjectLogos logosData={data?.other?.projects || []} />

      {/* <!-- What Our Customers Say About Us Section --> */}
      <section id="reviews">
        <Reviews reviewsData={data?.other?.our_clients || []} />
      </section>
    </>
  );
}
