import BenefitsCarousel from "@/app/components/career/BenefitsCarousel";
import CulturesCarousel from "@/app/components/career/CulturesCarousel";
import CountryCodeInput from "@/app/components/global/CountryCodeInput";
import FAQ from "@/app/components/global/FAQ";
import FileUpload from "@/app/components/global/FileUpload";

export default function Page() {
  return (
    <>
      {/* <!-- Hero Section --> */}
      <section className="relative pt-[4rem] lg:pt-[6.7rem]">
        <div className="relative bg-[#FCF4E9] overflow-hidden">
          {/* <!-- Main Content --> */}
          <div className="max-w-[1670px] mx-auto relative z-[50] grid xl:grid-cols-2 2xl:grid-cols-4">
            {/* <!-- Background Vector --> */}
            <div className="absolute right-[20px] top-[20px] ltr:hidden rtl:hidden rtl:lg:block ltr:lg:block ltr:xl:left-[-4%] rtl:xl:right-[-4%] xl:top-[10%] ltr:2xl:left-[6%] rtl:2xl:right-[6%] 2xl:top-[10%] opacity-70 z-[10]">
              <img src="/hero-vector.svg" alt="background decoration" className="w-[225px] h-[543px]" />
            </div>

            {/* LEFT SIDE (Text Content) */}
            <div
              className="bg-[#FCF4E9] h-full relative w-full 2xl:col-span-2
      flex flex-col items-start justify-center gap-[32px]
      px-[15px] xl:px-[5rem] 2xl:px-[10rem] pt-[20px] lg:py-[32px]"
            >
              <h1 className="text-[28px] md:text-[48px] w-full font-bold text-[#232323] leading-[1.7] relative z-[50]">
                نحن لا نوظّف موظفين، بل نبحث عن شركاء نجاح.
              </h1>

              {/* Decorative Vectors */}
              <div className="absolute w-[217px] z-[50] md:top-[27%] lg:top-[37%] xl:top-[36%] 2xl:top-[36%] right-[45px] md:right-[5%] lg:right-[4%] xl:right-[14%] 2xl:right-[25%] hidden md:block">
                <img src="/vector-svg.svg" alt="decorative element" className="w-[247px] h-[28px]" />
              </div>

              <div className="absolute w-[138px] top-[23%] right-[25px] md:hidden z-[50]">
                <img src="/Vector-mobile-career.svg" alt="decorative element" className="" />
              </div>

              <p className="text-[14px] md:text-[18px] font-medium text-[#393939] leading-[1.56] xl:max-w-full relative z-[50]">
                في Business Building، نؤمن أن الفريق هو قلب الشركة. إذا كنت شغوفًا بالتحديات، ومؤمنًا بالتحسين المستمر،
                فمكانك بيننا.
              </p>

              {/* Buttons */}
              <div className="flex flex-row gap-4 w-full relative z-[50]">
                <button className="bg-[#EDA133] hover:bg-[#D1912A] w-full md:w-auto lg:w-[200px] text-white h-[48px] md:h-auto md:px-6 py-3 rounded-[8px] font-medium text-[14px] md:text-[16px] flex items-center justify-center gap-2 transition-colors">
                  عرض الوظائف
                  <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12.6123 4.49951C12.9321 4.49951 13.1973 4.77661 13.1973 5.11084C13.2027 5.27771 13.1309 5.43305 13.0264 5.54248C12.9216 5.65197 12.7777 5.72119 12.6123 5.72119H7.49512L15.8545 14.4585C16.0802 14.6947 16.0802 15.0865 15.8545 15.3228C15.6285 15.559 15.2534 15.559 15.0273 15.3228L6.50391 6.4126V12.106C6.50391 12.4402 6.23967 12.7173 5.91992 12.7173C5.60018 12.7173 5.33594 12.4402 5.33594 12.106V5.11084C5.33594 4.77661 5.60018 4.49952 5.91992 4.49951H12.6123Z"
                      fill="white"
                    />
                  </svg>
                </button>

                <button className="border border-[#EDA133] w-full md:w-auto lg:w-[200px] text-[#EDA133] h-[48px] md:h-auto md:px-6 py-3 rounded-[8px] font-medium text-[14px] md:text-[16px] hover:bg-orange-50 transition-colors">
                  أرسل سيرتك
                </button>
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
              الشركة
              <br />
              الثقافة والقيم
            </h2>
            <p className="text-[#FFFFFF] text-[14px] leading-[1.6] order-2 lg:order-none max-w-[420px]">
              تعكس ثقافة Business Building، في جوهرها، قيم التنوع والابتكار والتعاون. نؤمن بأهمية تنويع قوتنا العاملة
              قدر الإمكان، حيث يسهل ذلك التغيير والنمو. وبالمثل، نقدم مجموعة واسعة من الموارد والفرص للتعلم واكتساب
              الخبرة والترقية. كما أن العمل الجماعي والتواصل بين الأفراد يظل حاضراً باستمرار في قلب Business Building،
              وكشركة، نضمن أن يشعر كل موظف بأنه عضو قيم في عائلة كبيرة بدلاً من مجرد اسم في قاعدة بيانات.
            </p>

            {/* <!-- Diversity at Business Building --> */}
            <section className="absolute top-[85%]">
              <div className="rounded-[32px] bg-[#F7BF45] h-[260px] grid grid-cols-1 lg:grid-cols-2 items-center gap-[24px] lg:gap-[64px] px-[50px]  xl:w-[1150px] 2xl:w-[1275px]">
                <h2 className="text-[#000000] text-[28px] md:text-[40px] font-bold leading-[1.3]  order-1 lg:order-none">
                  التنوع في
                  <br />
                  Business Building
                </h2>
                <p className="text-[#000000] text-[14px] leading-[1.6] order-2 lg:order-none max-w-[550px]">
                  مع وجود ما يقرب من 200 موظف من دول وخلفيات مختلفة، تُعدّ فريق Business Building واحداً من أكثر الشركات
                  تنوعاً في المنطقة. نحن شغوفون بإدماج أصوات جديدة في الفريق، والاستماع إلى اقتراحات جديدة، والتعرف على{" "}
                  <br /> أشخاص من جميع أنحاء العالم. طالما لديك شغف بالتكنولوجيا، فأنت مرحب بك للانضمام إلى فريقنا
                  المتنامي والمساهمة بأفكارك الخاصة. وبالمثل، نقدم أيضاً فرص الانتقال وخيارات العمل عن بُعد لأي شخص مهتم
                  بالانضمام إلى الفريق من خارج أرمينيا.
                </p>
              </div>
            </section>

            {/* <!-- Company Background --> */}
            <section className="absolute top-[170%]">
              <div className="rounded-[32px] bg-[#EB971B] h-[260px] grid grid-cols-1 lg:grid-cols-2 items-center gap-[24px] lg:gap-[64px] px-[50px]  xl:w-[1100px] 2xl:w-[1200px]">
                <h2 className="text-[#EAEAEA] text-[28px] md:text-[42px] font-bold leading-[1.28]  order-1 lg:order-none">
                  خلفية
                  <br />
                  الشركة
                </h2>
                <p className="text-[#EAEAEA] text-[14px] leading-[1.6] order-2 lg:order-none max-w-[450px]">
                  بدأت Business Building كمشروع صغير في عام 2014، مع عدد قليل من الموظفين يعملون على النسخة الأولى من
                  منشئ المواقع في مساحة مكتبية ضيقة.
                  <br /> بعد إدراك إمكانيات النمو في السوق الذي اخترناه، <br /> <br /> قمنا بتوظيف فريق أكبر <br />{" "}
                  وعملنا على تحسين برنامجنا. وبعد عدة سنوات، انتقلنا إلى منشأة مفتوحة تضم أكثر من 200 موظف، وأمنّا قاعدة
                  عملاء وفية تضم أكثر من مليون مستخدم، وحصلنا على مكانة محترمة في سوق منشئي المواقع.
                </p>
              </div>
            </section>
          </div>
        </div>

        <section className="lg:hidden">
          <CulturesCarousel />
        </section>
      </section>

      {/* <!-- Benefits Section --> */}
      <section className="relative bg-white ps-[15px] md:px-[15px] pt-[20px] pb-[40px] lg:py-[72px]">
        <div className="max-w-[1400px] mx-auto">
          {/* <!-- flex flex-col --> */}
          <div className="hidden md:flex lg:flex-row items-center max-w-[1319px] mx-auto gap-[16px] ">
            <div className="md:hidden xl:block bg-[#EDA133] rounded-lg p-[15px] px-[21px] flex flex-col justify-between items-center w-full lg:min-h-[590px] lg:w-[270px]">
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
                  <button className="flex justify-center items-center gap-[10px] px-6 py-[14px] w-[200px] h-[56px] border border-[#FCF4E9] rounded-lg hover:bg-[#FCF4E9] text-white hover:text-[#EDA133] transition-colors">
                    <span className="text-[16px] font-medium">عرض جميع المزايا</span>
                  </button>
                </div>
              </div>
            </div>

            {/* <!-- Left side - 3 benefit cards --> */}
            <div className="flex flex-col md:grid md:grid-cols-2 xl:flex xl:flex-wrap lg:flex-row gap-4 w-full lg:w-auto">
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
                    <button className="flex justify-center items-center gap-[10px] px-6 py-[14px] w-[200px] h-[56px] border border-[#FCF4E9] rounded-lg hover:bg-[#FCF4E9] text-white hover:text-[#EDA133] transition-colors">
                      <span className="text-[16px] font-medium">عرض جميع المزايا</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* <!-- Benefit Card 1 - Gym Access --> */}
              <div className="flex flex-col justify-between items-end gap-12 w-full xl:w-[333px] bg-[#EAEAEA] rounded-lg p-[18px] min-h-[531px] py-[53.5px]">
                <div className="flex flex-col justify-between items-end gap-[29.6px] w-full h-full">
                  <h3 className="text-[20px] font-extrabold text-black leading-[1.6]  w-full">
                    دخول غير محدود مجاني إلى صالة رياضية احترافية في الموقع
                  </h3>
                  <div
                    className="w-full h-[250px] bg-black bg-opacity-30 rounded-[6px] relative overflow-hidden"
                    style={{
                      backgroundImage: "url('/gym-access-bg.png')",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  ></div>
                  <p className="text-[14px] font-medium text-black leading-[1.43]  w-full h-[110px]">
                    حافظ على لياقتك البدنية وقدرتك على التحمل، أوحتى ابدأ العمل عليها عند انضمامكإلى Ucraft. نحن نقدم
                    دخولًا غير محدود مجانيًا إلىصالة رياضية في الموقع مع مجموعة واسعة من <br /> معدات التمارين وفرصة
                    التدريب مع مدرب.
                  </p>
                </div>
              </div>

              {/* <!-- Benefit Card 2 - Medical Insurance --> */}
              <div className="flex flex-col justify-between items-end gap-12 w-full xl:w-[333px] bg-[#EAEAEA] rounded-lg p-[18px] min-h-[531px] py-[53.5px]">
                <div className="flex flex-col justify-between items-end gap-[29.6px] w-full h-full">
                  <h3 className="text-[20px] font-extrabold text-black leading-[1.6]  w-full">
                    تأمين طبي مجاني للحفاظ على الصحة والقوة
                  </h3>
                  <div
                    className="w-full h-[250px] bg-black bg-opacity-30 rounded-[6px] relative overflow-hidden brightness-80"
                    style={{
                      backgroundImage: "url('/medical-insurance-bg.png')",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  ></div>
                  <p className="text-[14px] font-medium text-black leading-[1.43]  w-full h-[110px]">
                    لقد تعاوننا مع العديد من شركات التأمين الصحي لتوفير <br /> جميع المساعدات الطبية التي يحتاجها
                    الموظفون. ما عليك سوى الاتصال بالرقم الموجود على البطاقة، وطلب زيارة طبيب معين، <br /> وسيتولى شركة
                    التأمين الباقي.
                  </p>
                </div>
              </div>

              {/* <!-- Benefit Card 3 - Annual Leave --> */}
              <div className="flex flex-col justify-between items-end gap-12 w-full xl:w-[333px] bg-[#EAEAEA] rounded-lg p-[18px] min-h-[531px] py-[53.5px]">
                <div className="flex flex-col justify-between items-end gap-[29.6px] w-full h-full">
                  <h3 className="text-[20px] font-extrabold text-black leading-[1.6]  w-full">
                    20 يوم إجازة سنوية لمساعدتك على الاسترخاء وإعادة شحن طاقتك
                  </h3>
                  <div
                    className="w-full h-[250px] bg-black bg-opacity-30 rounded-[6px] relative overflow-hidden brightness-80"
                    style={{
                      backgroundImage: "url('/annual-leave-bg.png')",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  ></div>
                  <p className="text-[14px] font-medium text-black leading-[1.43]  w-full h-[110px]">
                    تقدم بناء الاعمال للموظفين إجمالي <br /> 20 يوم عمل من الإجازة السنوية <br /> - لا تشمل عطلات نهاية
                    الأسبوع! خذ بعض الاستراحات على مدار السنة للاسترخاء وإعادة شحن طاقتك، وعُد وأنت تشعر بالانتعاش
                    والاستعداد للعمل.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <section className="md:hidden">
            <BenefitsCarousel />
          </section>
        </div>
      </section>

      {/* <!-- Job Listings Section --> */}
      <section className="relative bg-[#131A27] px-[15px] pt-[20px] pb-[64px] md:py-[72px]">
        {/* <!-- Decorative Background Elements --> */}
        <div className="absolute inset-0 right-[15%] top-[10%] hidden md:block">
          <img src="/career-bg-svg.svg" alt="background art" />
        </div>

        <div className="hidden md:block max-w-[1400px] mx-auto lg:px-[47px]">
          {/* <!-- Section Header --> */}
          <div className="text-center mb-[29px] md:mb-[48px] px-[15px] 2xl:px-0 max-w-[636px] mx-auto">
            <h2 className="text-[24px] md:text-[40px] font-bold text-white mb-[12px]">فرصنا الوظيفية الحالية</h2>
            <p className="text-[14px] md:text-[18px] text-[#B1B1B1] font-medium leading-relaxed max-w-3xl mx-auto">
              استعرض قائمة الوظائف المتاحة لدينا حاليًا، وتقدّم للفرصة التي تناسب مهاراتك وخبراتك.
            </p>
          </div>

          {/* <!-- Job Listings Table --> */}
          <div className="max-w-[1319px] mx-auto bg-[#313B4D] rounded-lg p-4 md:p-9 relative z-[50]">
            <div className="space-y-5">
              {/* <!-- Table Header --> */}
              <div className="hidden md:flex justify-between items-center opacity-60">
                <div className="w-[145px] ">
                  <span className="text-white text-[20px] font-medium leading-[1.87] opacity-80">المسمى الوظيفي</span>
                </div>
                <div className="">
                  <span className="text-white text-[20px] font-medium leading-[1.56] opacity-80">القسم</span>
                </div>
                <div className="">
                  <span className="text-white text-[20px] font-medium leading-[1.56] opacity-80">نوع العمل</span>
                </div>
                <div className="">
                  <span className="text-white text-[20px] font-medium leading-[1.56] opacity-80">المدينة</span>
                </div>
                <div className="">
                  <span className="text-white text-[20px] font-medium leading-[1.56] opacity-80">زر التقديم</span>
                </div>
              </div>

              {/* <!-- Divider --> */}
              <div className="h-px bg-[#CFCFCF] opacity-20"></div>

              {/* <!-- Job Row 1 --> */}
              <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-3 md:space-y-0 p-4 md:p-0">
                <div className="flex justify-between items-center md:w-[164px] md:">
                  <span className="text-white text-[16px] md:text-[18px] font-bold leading-[1.44]">مصمم UI/UX</span>
                  <div className="flex items-center gap-2 md:hidden">
                    <span className="text-[#EDA133] text-[14px] font-medium">تقدم الان</span>
                    <img src="/ArrowUpRight-svg.svg" alt="arrow up right icon" />
                  </div>
                </div>
                <div className="hidden md:block ">
                  <span className="text-white text-[18px] font-medium leading-[1.44] opacity-80">التصميم</span>
                </div>
                <div className="hidden md:block ">
                  <span className="text-white text-[18px] font-medium leading-[1.44] opacity-80">دوام كامل</span>
                </div>
                <div className="hidden md:block ">
                  <span className="text-white text-[18px] font-medium leading-[1.44] opacity-80">القاهرة</span>
                </div>
                <a href="appy-job-page.html">
                  <div className="hidden md:flex items-center gap-2">
                    <span className="text-[#EDA133] text-[18px] font-medium leading-[1.44] hover:underline">
                      تقدم الان
                    </span>
                    <img src="/ArrowUpRight-svg.svg" alt="arrow up right icon" />
                  </div>
                </a>
              </div>

              {/* <!-- Divider --> */}
              <div className="h-px bg-[#CFCFCF] opacity-20"></div>

              {/* <!-- Job Row 2 --> */}
              <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-3 md:space-y-0 p-4 md:p-0">
                <div className="flex justify-between items-center md:w-[164px] md:">
                  <span className="text-white text-[16px] md:text-[18px] font-bold leading-[1.44]">
                    مدير مشاريع تقنية
                  </span>
                  <div className="flex items-center gap-2 md:hidden">
                    <span className="text-[#EDA133] text-[14px] font-medium">تقدم الان</span>
                    <img src="/ArrowUpRight-svg.svg" alt="arrow up right icon" />
                  </div>
                </div>
                <div className="hidden md:block ">
                  <span className="text-white text-[18px] font-medium leading-[1.44] opacity-80">التصميم</span>
                </div>
                <div className="hidden md:block ">
                  <span className="text-white text-[18px] font-medium leading-[1.44] opacity-80">دوام كامل</span>
                </div>
                <div className="hidden md:block ">
                  <span className="text-white text-[18px] font-medium leading-[1.44] opacity-80">القاهرة</span>
                </div>
                <a href="appy-job-page.html">
                  <div className="hidden md:flex items-center gap-2">
                    <span className="text-[#EDA133] text-[18px] font-medium leading-[1.44] hover:underline">
                      تقدم الان
                    </span>
                    <img src="/ArrowUpRight-svg.svg" alt="arrow up right icon" />
                  </div>
                </a>
              </div>

              {/* <!-- Divider --> */}
              <div className="h-px bg-[#CFCFCF] opacity-20"></div>

              {/* <!-- Job Row 3 --> */}
              <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-3 md:space-y-0 p-4 md:p-0">
                <div className="flex justify-between items-center md:w-[164px] md:">
                  <span className="text-white text-[16px] md:text-[18px] font-bold leading-[1.44]">مصمم UI/UX</span>
                  <div className="flex items-center gap-2 md:hidden">
                    <span className="text-[#EDA133] text-[14px] font-medium">تقدم الان</span>
                    <div className="w-[20px] h-[20px] bg-[#EDA133] rounded flex items-center justify-center">
                      <img src="/arrow-up-right.svg" alt="apply" className="w-[12px] h-[12px]" />
                    </div>
                  </div>
                </div>
                <div className="hidden md:block ">
                  <span className="text-white text-[18px] font-medium leading-[1.44] opacity-80">التصميم</span>
                </div>
                <div className="hidden md:block ">
                  <span className="text-white text-[18px] font-medium leading-[1.44] opacity-80">دوام كامل</span>
                </div>
                <div className="hidden md:block ">
                  <span className="text-white text-[18px] font-medium leading-[1.44] opacity-80">القاهرة</span>
                </div>
                <a href="appy-job-page.html">
                  <div className="hidden md:flex items-center gap-2 ">
                    <span className="text-[#EDA133] text-[18px] font-medium leading-[1.44] hover:underline">
                      تقدم الان
                    </span>
                    <img src="/ArrowUpRight-svg.svg" alt="arrow up right icon" />
                  </div>
                </a>
              </div>

              {/* <!-- Divider --> */}
              <div className="h-px bg-[#CFCFCF] opacity-20"></div>

              {/* <!-- Job Row 4 --> */}
              <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-3 md:space-y-0 p-4 md:p-0">
                <div className="flex justify-between items-center md:w-[164px] md:">
                  <span className="text-white text-[16px] md:text-[18px] font-bold leading-[1.44]">مصمم UI/UX</span>
                  <div className="flex items-center gap-2 md:hidden">
                    <span className="text-[#EDA133] text-[14px] font-medium">تقدم الان</span>
                    <div className="w-[20px] h-[20px] bg-[#EDA133] rounded flex items-center justify-center">
                      <img src="/arrow-up-right.svg" alt="apply" className="w-[12px] h-[12px]" />
                    </div>
                  </div>
                </div>
                <div className="hidden md:block ">
                  <span className="text-white text-[18px] font-medium leading-[1.44] opacity-80">التصميم</span>
                </div>
                <div className="hidden md:block ">
                  <span className="text-white text-[18px] font-medium leading-[1.44] opacity-80">دوام كامل</span>
                </div>
                <div className="hidden md:block ">
                  <span className="text-white text-[18px] font-medium leading-[1.44] opacity-80">القاهرة</span>
                </div>
                <a href="appy-job-page.html">
                  <div className="hidden md:flex items-center gap-2">
                    <span className="text-[#EDA133] text-[18px] font-medium leading-[1.44] hover:underline">
                      تقدم الان
                    </span>
                    <img src="/ArrowUpRight-svg.svg" alt="arrow up right icon" />
                  </div>
                </a>
              </div>

              {/* <!-- Divider --> */}
              <div className="h-px bg-[#CFCFCF] opacity-20"></div>

              {/* <!-- Job Row 5 --> */}
              <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-3 md:space-y-0 p-4 md:p-0">
                <div className="flex justify-between items-center md:w-[164px] md:">
                  <span className="text-white text-[16px] md:text-[18px] font-bold leading-[1.44]">مصمم UI/UX</span>
                  <div className="flex items-center gap-2 md:hidden">
                    <span className="text-[#EDA133] text-[14px] font-medium">تقدم الان</span>
                    <div className="w-[20px] h-[20px] bg-[#EDA133] rounded flex items-center justify-center">
                      <img src="/arrow-up-right.svg" alt="apply" className="w-[12px] h-[12px]" />
                    </div>
                  </div>
                </div>
                <div className="hidden md:block ">
                  <span className="text-white text-[18px] font-medium leading-[1.44] opacity-80">التصميم</span>
                </div>
                <div className="hidden md:block ">
                  <span className="text-white text-[18px] font-medium leading-[1.44] opacity-80">دوام كامل</span>
                </div>
                <div className="hidden md:block ">
                  <span className="text-white text-[18px] font-medium leading-[1.44] opacity-80">القاهرة</span>
                </div>
                <a href="appy-job-page.html">
                  <div className="hidden md:flex items-center gap-2">
                    <span className="text-[#EDA133] text-[18px] font-medium leading-[1.44] hover:underline">
                      تقدم الان
                    </span>
                    <img src="/ArrowUpRight-svg.svg" alt="arrow up right icon" />
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="md:hidden max-w-[1400px] mx-auto lg:px-[47px]">
          {/* <!-- Decorative Background Elements --> */}
          <div className="md:hidden absolute inset-0 right-[15%] top-[1%]">
            <img className="w-[455px]" src="/career-bg-svg.svg" alt="background art" />
          </div>

          {/* <!-- Section Header --> */}
          <div className="text-center mt-[32px] md:mt-0 mb-[29px] md:mb-[48px] px-[15px] 2xl:px-0 max-w-[636px] mx-auto">
            <h2 className="text-[24px] md:text-[40px] font-bold text-white mb-[12px]">فرصنا الوظيفية الحالية</h2>
            <p className="text-[14px] md:text-[18px] text-[#B1B1B1] font-medium leading-relaxed max-w-3xl mx-auto">
              استعرض قائمة الوظائف المتاحة لدينا حاليًا، وتقدّم للفرصة التي تناسب مهاراتك وخبراتك.
            </p>
          </div>

          <section className="flex flex-col gap-[24px]">
            {/* <!-- Job Listings Table --> */}
            <div className="bg-[#313B4D] rounded-lg relative z-[50]">
              <div className="space-y-5">
                {/* <!-- Job Row 1 --> */}
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
                {/* <!-- Job Row 1 --> */}
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
      </section>

      {/* <!-- form --> */}
      <section className="relative bg-white px-[15px] pt-[40px] pb-[64px] md:py-[72px]">
        <div className="max-w-[1400px] mx-auto lg:px-[47px]">
          {/* <!-- Section Header --> */}
          <div className="text-center mb-[29px] md:mb-[48px] px-[15px] 2xl:px-0 max-w-[636px] mx-auto">
            <h2 className="text-[24px] md:text-[40px] font-bold text-black mb-[12px]">نموذج التقديم على الوظيفة</h2>
            <p className="text-[14px] md:text-[18px] text-[#4A4A4A] font-medium leading-relaxed max-w-3xl mx-auto">
              املأ النموذج التالي بدقة، وسيتواصل معك فريق الموارد البشرية بعد مراجعة البيانات والتحقّق منها.
            </p>
          </div>

          {/* <!-- Form Section --> */}
          <div className="max-w-[1300px] mx-auto bg-white border border-[#DADADA77] rounded-lg">
            <div className="p-2 md:p-8">
              <div className="space-y-[32px] md:space-y-[40px]">
                <div className="space-y-12">
                  <div className="space-y-[16px] md:space-y-6">
                    {/* <!-- Name and country Row --> */}
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

                      {/* <!-- Phone Field --> */}
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
                  {/* <!-- Project Section --> */}
                  <div className="space-y-[32px] md:space-b-[48px] md:space-t-[56px]">
                    <div className="space-y-[16px] md:space-y-6">
                      {/* <!-- File Upload Section --> */}
                      <FileUpload title="السيرة الذاتية" required={true} />
                    </div>

                    {/* <!-- Form Actions --> */}
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
      </section>

      {/* <!-- FAQ Section --> */}
      {/* <FAQ /> */}
    </>
  );
}
