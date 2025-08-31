export default function WhoAreWe() {
  return (
    <section className="relative bg-[#FCF4E9] py-[48px] md:py-[92px] overflow-hidden">
      <div className="absolute inset-0">
        <img src="/background-section-3.svg" alt="" />
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="flex flex-col xl:flex-row xl:justify-between xl:items-center gap- px-[15px] 2xl:px-0">
          <div className="flex-1 max-w-2xl">
            <div>
              <h3 className="text-[#F2B660] font-bold text-[20px] mb-[16px] ">بناء الأعمال</h3>
              <div>
                <h2 className="text-[24px] md:text-[40px] font-bold text-black mb-[16px] ">نبني مستقبل أعمالك</h2>
                <p className="text-[14px] md:text-[18px] text-black font-medium leading-relaxed ">
                  نحن شركة تقنية متخصصة في تقديم حلول برمجية وتسويقية متكاملة، نساعد الشركات على النمو، ونوفر بيئة
                  احترافية تدعم كل مراحل التطوير والنجاح
                </p>
              </div>
            </div>

            <div className="mt-[24px]">
              <button className="bg-[#EDA133] hover:bg-[#D1912A] w-full md:w-[230px] text-white font-medium py-3 px-6 rounded-lg transition-all duration-300  flex items-center justify-center gap-2">
                <span className="text-[16px]">ابدأ مشروعك الآن</span>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M8.21387 0.768555C8.53362 0.768555 8.79883 1.04565 8.79883 1.37988C8.80427 1.54675 8.73246 1.7021 8.62793 1.81152C8.52318 1.92101 8.37925 1.99023 8.21387 1.99023H3.09668L11.4561 10.7275C11.6818 10.9637 11.6817 11.3556 11.4561 11.5918C11.23 11.828 10.8549 11.828 10.6289 11.5918L2.10547 2.68164V8.375C2.10547 8.70923 1.84123 8.98633 1.52148 8.98633C1.20174 8.98632 0.9375 8.70923 0.9375 8.375V1.37988C0.9375 1.04566 1.20174 0.768561 1.52148 0.768555H8.21387Z"
                    fill="#FCF4E9"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="block xl:hidden w-full h-px bg-[#F9DFBA] my-[16px]"></div>

          <section className="flex flex-col gap-[17px]">
            <img className="opacity-20" src="/businessbuildingbg.svg" alt="business building background" />
            <img className="opacity-40" src="/businessbuildingbg.svg" alt="business building background" />
            <img className="opacity-80" src="/businessbuildingbg.svg" alt="business building background" />
          </section>
        </div>

        <div className="hidden xl:block w-full h-px bg-[#F9DFBA] mt-[48px] mb-[32px]"></div>

        <div className="px-[15px] 2xl:px-0 mt-[45px] xl:mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-[24px]">
            <div className="rounded-lg overflow-hidden h-[173px] md:h-[199px] shadow-sm">
              <div className="bg-[#FAEAD1] flex items-center justify-start gap-[8px] ps-[25px] h-[73px]">
                <img className="h-[48px] w-[48px]" src="/results.gif" alt="results gif" />
                <h4 className="text-black font-medium text-[18px] md:text-[20px]">نتائج مثبتة</h4>
              </div>
              <div className="p-[16px] flex flex-col items-center">
                <p className="text-black font-medium text-base leading-relaxed ">
                  نُصمم حلولًا تسويقية وتقنية تتماشى مع طبيعة عملك وجمهورك وتحقق نتائج واقعية قابلة للقياس.
                </p>
              </div>
            </div>

            <div className="rounded-lg overflow-hidden h-[173px] md:h-[199px] shadow-sm">
              <div className="bg-[#FAEAD1] flex items-center justify-start gap-[8px] ps-[25px] h-[73px]">
                <img className="h-[48px] w-[48px]" src="/growth.gif" alt="growth gif" />
                <h4 className="text-black font-medium text-[18px] md:text-[20px]">دعم عملاء استثنائي</h4>
              </div>
              <div className="p-[16px] flex flex-col items-center">
                <p className="text-black font-medium text-base leading-relaxed ">
                  اعمل مع فريق من المحترفين في وسائل التواصل الاجتماعي الذين يفهمون تفاصيل كل منصة.
                </p>
              </div>
            </div>

            <div className="rounded-lg overflow-hidden h-[173px] md:h-[199px] shadow-sm">
              <div className="bg-[#FAEAD1] flex items-center justify-start gap-[8px] ps-[25px] h-[73px]">
                <img className="h-[48px] w-[48px]" src="/presentation.gif" alt="presentation gif" />
                <h4 className="text-black font-medium text-[18px] md:text-[20px]">خطط مخصصة لأهدافك</h4>
              </div>
              <div className="p-[16px] flex flex-col items-center">
                <p className="text-black font-medium text-base leading-relaxed ">
                  نُصمم حلولًا تسويقية وتقنية تتماشى مع طبيعة عملك وجمهورك وتحقق نتائج واقعية قابلة للقياس.
                </p>
              </div>
            </div>

            <div className="rounded-lg overflow-hidden h-[173px] md:h-[199px] shadow-sm">
              <div className="bg-[#FAEAD1] flex items-center justify-start gap-[8px] ps-[25px] h-[73px]">
                <img className="h-[48px] w-[48px]" src="/coding.gif" alt="coding gif" />
                <h4 className="text-black font-medium text-[18px] md:text-[20px]">خبرة تقنية عميقة</h4>
              </div>
              <div className="p-[16px] flex flex-col items-center">
                <p className="text-black font-medium text-[16px] leading-relaxed ">
                  اعمل مع فريق من المبرمجين والمصممين يملكون خبرة حقيقية في تطوير تطبيقات وأنظمة ذكية.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
