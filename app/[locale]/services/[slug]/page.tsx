export default function Page() {
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
                  خدمة تحسين محركات البحث
                </h1>
                <p className="text-[14px] md:text-[16px] text-white leading-[1.85] max-w-[520px]">
                  زد من إيراداتك باستراتيجية تحسين محركات البحث المصممة حول أهداف نموك. حوّل عمليات البحث إلى مشتركين.
                </p>
              </div>

              {/* <!-- Buttons --> */}
              <div className="flex flex-row gap-[16px] w-full md:w-auto">
                <button className="w-full md:w-[230px] h-[56px] bg-[#EDA133] rounded-lg flex gap-2 items-center justify-center text-white font-medium text-[16px] hover:bg-[#F0AC49] transition-colors">
                  ابدأ مشروعك الآن
                  <img src="/arrow-icon.svg" alt="arrow" />
                </button>
                <button className="w-full md:w-[150px] h-[56px] border border-[#EDA133] rounded-lg flex items-center justify-center text-[#EDA133] font-medium text-[16px] hover:bg-[#EDA13333] hover:text-white transition-colors">
                  استشارة مجانية
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- Service Hero Section --> */}
      <section className="max-w-[1400px] mx-auto relative px-[15px] xl:px-0 pt-[48px] lg:pt-0">
        {/* <!-- Background Decorative Elements --> */}
        <div className="md:hidden lg:block absolute left-[2px] top-[390px] lg:top-[15%] lg:left-[4.5%] xl:top-[15%] xl:left-[5.8%] z-[0]">
          <img className="h-[260px] lg:h-full" src="/services-page-bg-art.svg" alt="background art" />
        </div>

        <div className="rounded-[8px] overflow-hidden">
          {/* <!-- Content --> */}
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-32 lg:p-12 lg:py-[64px]">
            {/* <!-- Left Side - Content --> */}
            <div className="w-full lg:w-[536px] flex flex-col gap-[24px]">
              {/* <!-- Badge --> */}
              <div className="text-[#F0AC49] text-[16px] md:text-[20px] font-bold">الخدمات</div>

              {/* <!-- Main Heading --> */}
              <h1 className="text-[28px] md:text-[48px] font-bold text-[#2A313D] leading-[1.4]">
                خدماتنا التقنية: حلول مبتكرة لأعمالك
              </h1>

              {/* <!-- Description --> */}
              <p className="text-[14px] md:text-[18px] text-[#393939] leading-[1.56] font-medium">
                نحن نقدم مجموعة من الخدمات الرقمية المخصصة لكل أنواع الشركات، لتساعدك في تحقيق أهدافك بطرق مبتكرة وسهلة.
              </p>

              {/* <!-- CTA Button --> */}
              <div className="flex items-center gap-4">
                <button className="px-6 py-4 bg-[#EDA133] w-full md:w-auto rounded-lg text-white text-[16px] font-medium flex justify-center items-center gap-2 hover:bg-[#D8902A] transition-all duration-300">
                  اطلب خدمة الآن
                  <img src="/arrow-up-right.svg" alt="arrow" />
                </button>
              </div>
            </div>

            {/* <!-- Right Side - Image --> */}
            <div className="w-full h-[293px] lg:w-[542px] md:h-[420px] relative">
              <div className="w-full h-full bg-[#FFFFFF] rounded-[8px] overflow-hidden">
                <img src="/services-hero-1f2c35.png" alt="services" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
