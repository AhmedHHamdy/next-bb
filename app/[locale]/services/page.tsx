import ProjectLogos from "@/app/components/global/PojectLogos";

export default function Page() {
  return (
    <>
      {/* <!-- Services Hero Section --> */}
  <section className="max-w-[1400px] mx-auto pt-[6.5rem] md:pt-[8.5rem] lg:pt-[10.5rem] relative px-[15px] xl:px-0">
    {/* <!-- Background Decorative Elements --> */}
    <div className="md:hidden lg:block absolute ltr:rotate-90 ltr:left-[-210px] rtl:right-[-20px] top-[110px] z-[50]">
      <img src="/services-page-bg.svg" alt="background art" />
    </div>

    {/* <!-- Background Decorative Elements --> */}
    <div className="md:hidden lg:block absolute left-[2px] top-[450px] lg:left-[80px] ltr:hidden lg:top-[240px] z-[0]">
      <img className="h-[260px] lg:h-full" src="/services-page-bg-art.svg" alt="background art" />
    </div>

    <div className="rounded-[8px] overflow-hidden">
      {/* <!-- Content --> */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-32 lg:p-12">
        {/* <!-- Left Side - Content --> */}
        <div className="w-full lg:w-[536px] flex flex-col gap-[24px]">
          {/* <!-- Badge --> */}
          <div className="text-[#F0AC49] text-[16px] md:text-[20px] font-bold">
            الخدمات
          </div>

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
            <button
              className="px-6 py-4 bg-[#EDA133] w-full md:w-auto rounded-lg text-white text-[16px] font-medium flex justify-center items-center gap-2 hover:bg-[#D8902A] transition-all duration-300">
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

  {/* <!-- Services Section --> */}
  <section
    className="relative bg-[#131A27] mt-[70px]  md:mt-[64px] py-[48px] md:py-[99px] px-[15px] 2xl:px-0 overflow-hidden">
    {/* <!-- Decorative Background Elements --> */}
    <div className="hidden md:block absolute inset-0 top-[10px]">
      <img src="/services-page-bg-svg.svg" alt="background art" />
    </div>

    <div className="md:hidden absolute inset-0 top-[150px] left-[100px]">
      <img src="/services-page-bg-svg.svg" alt="background art" />
    </div>

    <div className="md:hidden absolute inset-0 top-[1500px] left-[100px]">
      <img src="/services-page-bg-svg.svg" alt="background art" />
    </div>

    <div className="max-w-[1400px] mx-auto relative z-10">
      {/* <!-- Section Header --> */}
      <div className="text-center mb-[32px] md:mb-[84px]">
        <h2 className="text-[24px] md:text-[40px] font-bold text-white mb-[12px] ">خدماتنا المتكاملة</h2>
        <p className="text-[#B1B1B1] text-[14px] md:text-[18px] font-medium">نقدّم مجموعة من الخدمات المتكاملة التي تغطي
          كافة احتياجاتك الرقمية،
          بدءًا من البرمجة، مرورًا بالتسويق، ووصولًا إلى دعم العملاء.</p>
      </div>

      {/* <!-- Services Grid --> */}
      <div
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 justify-items-center gap-x-[34px] gap-y-[16px] md:gap-y-[48px]">
        {/* <!-- Service Card 1 --> */}
        <div
          className="bg-[#313B4D] w-full h-full flex items-start justify-start gap-[16px] md:gap-[35px] rounded-lg p-8 border border-gray-700 hover:border-[#EDA133] transition-all duration-300 hover:transform hover:-translate-y-2">
          <div className="self-start w-16 h-16 mt-[7px]">
            <img src="/service-icon.svg" alt="service icon" />
          </div>
          <div className="flex flex-col gap-[10px] w-full md:w-[240px]">
            <h3 className="text-[16px] md:text-[21.5px] font-bold text-white ">تطوير مواقع الويب و المتاجر الالكترونية</h3>
            <p className="text-gray-300 text-[12px] md:text-[14px]">نصمم ونطور مواقع إلكترونية احترافية، سريعة، وآمنة تعكس
              هوية علامتك التجارية.</p>
            <a href="service-details.html" className="flex items-center gap-2 text-[#EDA133] text-[14px] md:text-[15px]">
              تفاصيل الخدمة
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M5.33054 5.51005V13.9307C5.33054 14.1025 5.39879 14.2672 5.52026 14.3887C5.64174 14.5102 5.80649 14.5784 5.97828 14.5784C6.15008 14.5784 6.31483 14.5102 6.43631 14.3887C6.55778 14.2672 6.62603 14.1025 6.62603 13.9307V7.07353L15.8839 16.3322C16.0054 16.4537 16.1702 16.522 16.3421 16.522C16.514 16.522 16.6789 16.4537 16.8004 16.3322C16.922 16.2106 16.9902 16.0458 16.9902 15.8739C16.9902 15.702 16.922 15.5372 16.8004 15.4156L7.54177 6.15779H14.3989C14.5707 6.15779 14.7355 6.08954 14.8569 5.96807C14.9784 5.84659 15.0467 5.68184 15.0467 5.51005C15.0467 5.33825 14.9784 5.1735 14.8569 5.05202C14.7355 4.93055 14.5707 4.8623 14.3989 4.8623H5.97828C5.80649 4.8623 5.64174 4.93055 5.52026 5.05202C5.39879 5.1735 5.33054 5.33825 5.33054 5.51005Z"
                  fill="#EDA133" />
              </svg>
            </a>
          </div>
        </div>

        {/* <!-- Service Card 2 --> */}
        <div
          className="bg-[#313B4D] w-full h-full flex items-start justify-start gap-[16px] md:gap-[35px] rounded-lg p-8 border border-gray-700 hover:border-[#EDA133] transition-all duration-300 hover:transform hover:-translate-y-2">
          <div className="self-start w-16 h-16 mt-[7px]">
            <img src="/service-icon.svg" alt="service icon" />
          </div>
          <div className="flex flex-col gap-[10px] w-full md:w-[240px]">
            <h3 className="text-[16px] md:text-[21.5px] font-bold text-white ">تطوير مواقع الويب
              و المتاجر الالكترونية </h3>
            <p className="text-gray-300 text-[12px] md:text-[14px]">نصمم ونطور مواقع إلكترونية احترافية، سريعة، وآمنة تعكس
              هوية علامتك التجارية.</p>
            <a href="service-details.html" className="flex items-center gap-2 text-[#EDA133] text-[14px] md:text-[15px]">
              تفاصيل الخدمة
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M5.33054 5.51005V13.9307C5.33054 14.1025 5.39879 14.2672 5.52026 14.3887C5.64174 14.5102 5.80649 14.5784 5.97828 14.5784C6.15008 14.5784 6.31483 14.5102 6.43631 14.3887C6.55778 14.2672 6.62603 14.1025 6.62603 13.9307V7.07353L15.8839 16.3322C16.0054 16.4537 16.1702 16.522 16.3421 16.522C16.514 16.522 16.6789 16.4537 16.8004 16.3322C16.922 16.2106 16.9902 16.0458 16.9902 15.8739C16.9902 15.702 16.922 15.5372 16.8004 15.4156L7.54177 6.15779H14.3989C14.5707 6.15779 14.7355 6.08954 14.8569 5.96807C14.9784 5.84659 15.0467 5.68184 15.0467 5.51005C15.0467 5.33825 14.9784 5.1735 14.8569 5.05202C14.7355 4.93055 14.5707 4.8623 14.3989 4.8623H5.97828C5.80649 4.8623 5.64174 4.93055 5.52026 5.05202C5.39879 5.1735 5.33054 5.33825 5.33054 5.51005Z"
                  fill="#EDA133" />
              </svg>
            </a>
          </div>
        </div>

        {/* <!-- Service Card 3 --> */}
        <div
          className="bg-[#313B4D] w-full h-full flex items-start justify-start gap-[16px] md:gap-[35px] rounded-lg p-8 border border-gray-700 hover:border-[#EDA133] transition-all duration-300 hover:transform hover:-translate-y-2">
          <div className="self-start w-16 h-16 mt-[7px]">
            <img src="/service-icon.svg" alt="service icon" />
          </div>
          <div className="flex flex-col gap-[10px] w-full md:w-[240px]">
            <h3 className="text-[16px] md:text-[21.5px] font-bold text-white ">تطوير مواقع الويب
              و المتاجر الالكترونية </h3>
            <p className="text-gray-300 text-[12px] md:text-[14px]">نصمم ونطور مواقع إلكترونية احترافية، سريعة، وآمنة تعكس
              هوية علامتك التجارية.</p>
            <a href="service-details.html" className="flex items-center gap-2 text-[#EDA133] text-[14px] md:text-[15px]">
              تفاصيل الخدمة
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M5.33054 5.51005V13.9307C5.33054 14.1025 5.39879 14.2672 5.52026 14.3887C5.64174 14.5102 5.80649 14.5784 5.97828 14.5784C6.15008 14.5784 6.31483 14.5102 6.43631 14.3887C6.55778 14.2672 6.62603 14.1025 6.62603 13.9307V7.07353L15.8839 16.3322C16.0054 16.4537 16.1702 16.522 16.3421 16.522C16.514 16.522 16.6789 16.4537 16.8004 16.3322C16.922 16.2106 16.9902 16.0458 16.9902 15.8739C16.9902 15.702 16.922 15.5372 16.8004 15.4156L7.54177 6.15779H14.3989C14.5707 6.15779 14.7355 6.08954 14.8569 5.96807C14.9784 5.84659 15.0467 5.68184 15.0467 5.51005C15.0467 5.33825 14.9784 5.1735 14.8569 5.05202C14.7355 4.93055 14.5707 4.8623 14.3989 4.8623H5.97828C5.80649 4.8623 5.64174 4.93055 5.52026 5.05202C5.39879 5.1735 5.33054 5.33825 5.33054 5.51005Z"
                  fill="#EDA133" />
              </svg>
            </a>
          </div>
        </div>

        {/* <!-- Service Card 4 --> */}
        <div
          className="bg-[#313B4D] w-full h-full flex items-start justify-start gap-[16px] md:gap-[35px] rounded-lg p-8 border border-gray-700 hover:border-[#EDA133] transition-all duration-300 hover:transform hover:-translate-y-2">
          <div className="self-start w-16 h-16 mt-[7px]">
            <img src="/service-icon.svg" alt="service icon" />
          </div>
          <div className="flex flex-col gap-[10px] w-full md:w-[240px]">
            <h3 className="text-[16px] md:text-[21.5px] font-bold text-white ">تطوير مواقع الويب
              و المتاجر الالكترونية </h3>
            <p className="text-gray-300 text-[12px] md:text-[14px]">نصمم ونطور مواقع إلكترونية احترافية، سريعة، وآمنة تعكس
              هوية علامتك التجارية.</p>
            <a href="service-details.html" className="flex items-center gap-2 text-[#EDA133] text-[14px] md:text-[15px]">
              تفاصيل الخدمة
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M5.33054 5.51005V13.9307C5.33054 14.1025 5.39879 14.2672 5.52026 14.3887C5.64174 14.5102 5.80649 14.5784 5.97828 14.5784C6.15008 14.5784 6.31483 14.5102 6.43631 14.3887C6.55778 14.2672 6.62603 14.1025 6.62603 13.9307V7.07353L15.8839 16.3322C16.0054 16.4537 16.1702 16.522 16.3421 16.522C16.514 16.522 16.6789 16.4537 16.8004 16.3322C16.922 16.2106 16.9902 16.0458 16.9902 15.8739C16.9902 15.702 16.922 15.5372 16.8004 15.4156L7.54177 6.15779H14.3989C14.5707 6.15779 14.7355 6.08954 14.8569 5.96807C14.9784 5.84659 15.0467 5.68184 15.0467 5.51005C15.0467 5.33825 14.9784 5.1735 14.8569 5.05202C14.7355 4.93055 14.5707 4.8623 14.3989 4.8623H5.97828C5.80649 4.8623 5.64174 4.93055 5.52026 5.05202C5.39879 5.1735 5.33054 5.33825 5.33054 5.51005Z"
                  fill="#EDA133" />
              </svg>
            </a>
          </div>
        </div>

        {/* <!-- Service Card 5 --> */}
        <div
          className="bg-[#313B4D] w-full h-full flex items-start justify-start gap-[16px] md:gap-[35px] rounded-lg p-8 border border-gray-700 hover:border-[#EDA133] transition-all duration-300 hover:transform hover:-translate-y-2">
          <div className="self-start w-16 h-16 mt-[7px]">
            <img src="/service-icon.svg" alt="service icon" />
          </div>
          <div className="flex flex-col gap-[10px] w-full md:w-[240px]">
            <h3 className="text-[16px] md:text-[21.5px] font-bold text-white ">تطوير مواقع الويب
              و المتاجر الالكترونية </h3>
            <p className="text-gray-300 text-[12px] md:text-[14px]">نصمم ونطور مواقع إلكترونية احترافية، سريعة، وآمنة تعكس
              هوية علامتك التجارية.</p>
            <a href="service-details.html" className="flex items-center gap-2 text-[#EDA133] text-[14px] md:text-[15px]">
              تفاصيل الخدمة
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M5.33054 5.51005V13.9307C5.33054 14.1025 5.39879 14.2672 5.52026 14.3887C5.64174 14.5102 5.80649 14.5784 5.97828 14.5784C6.15008 14.5784 6.31483 14.5102 6.43631 14.3887C6.55778 14.2672 6.62603 14.1025 6.62603 13.9307V7.07353L15.8839 16.3322C16.0054 16.4537 16.1702 16.522 16.3421 16.522C16.514 16.522 16.6789 16.4537 16.8004 16.3322C16.922 16.2106 16.9902 16.0458 16.9902 15.8739C16.9902 15.702 16.922 15.5372 16.8004 15.4156L7.54177 6.15779H14.3989C14.5707 6.15779 14.7355 6.08954 14.8569 5.96807C14.9784 5.84659 15.0467 5.68184 15.0467 5.51005C15.0467 5.33825 14.9784 5.1735 14.8569 5.05202C14.7355 4.93055 14.5707 4.8623 14.3989 4.8623H5.97828C5.80649 4.8623 5.64174 4.93055 5.52026 5.05202C5.39879 5.1735 5.33054 5.33825 5.33054 5.51005Z"
                  fill="#EDA133" />
              </svg>
            </a>
          </div>
        </div>

        {/* <!-- Service Card 6 --> */}
        <div
          className="bg-[#313B4D] w-full h-full flex items-start justify-start gap-[16px] md:gap-[35px] rounded-lg p-8 border border-gray-700 hover:border-[#EDA133] transition-all duration-300 hover:transform hover:-translate-y-2">
          <div className="self-start w-16 h-16 mt-[7px]">
            <img src="/service-icon.svg" alt="service icon" />
          </div>
          <div className="flex flex-col gap-[10px] w-full md:w-[240px]">
            <h3 className="text-[16px] md:text-[21.5px] font-bold text-white ">تطوير مواقع الويب
              و المتاجر الالكترونية </h3>
            <p className="text-gray-300 text-[12px] md:text-[14px]">نصمم ونطور مواقع إلكترونية احترافية، سريعة، وآمنة تعكس
              هوية علامتك التجارية.</p>
            <a href="service-details.html" className="flex items-center gap-2 text-[#EDA133] text-[14px] md:text-[15px]">
              تفاصيل الخدمة
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M5.33054 5.51005V13.9307C5.33054 14.1025 5.39879 14.2672 5.52026 14.3887C5.64174 14.5102 5.80649 14.5784 5.97828 14.5784C6.15008 14.5784 6.31483 14.5102 6.43631 14.3887C6.55778 14.2672 6.62603 14.1025 6.62603 13.9307V7.07353L15.8839 16.3322C16.0054 16.4537 16.1702 16.522 16.3421 16.522C16.514 16.522 16.6789 16.4537 16.8004 16.3322C16.922 16.2106 16.9902 16.0458 16.9902 15.8739C16.9902 15.702 16.922 15.5372 16.8004 15.4156L7.54177 6.15779H14.3989C14.5707 6.15779 14.7355 6.08954 14.8569 5.96807C14.9784 5.84659 15.0467 5.68184 15.0467 5.51005C15.0467 5.33825 14.9784 5.1735 14.8569 5.05202C14.7355 4.93055 14.5707 4.8623 14.3989 4.8623H5.97828C5.80649 4.8623 5.64174 4.93055 5.52026 5.05202C5.39879 5.1735 5.33054 5.33825 5.33054 5.51005Z"
                  fill="#EDA133" />
              </svg>
            </a>
          </div>
        </div>

        {/* <!-- Service Card 7 --> */}
        <div
          className="bg-[#313B4D] w-full h-full flex items-start justify-start gap-[16px] md:gap-[35px] rounded-lg p-8 border border-gray-700 hover:border-[#EDA133] transition-all duration-300 hover:transform hover:-translate-y-2">
          <div className="self-start w-16 h-16 mt-[7px]">
            <img src="/service-icon.svg" alt="service icon" />
          </div>
          <div className="flex flex-col gap-[10px] w-full md:w-[240px]">
            <h3 className="text-[16px] md:text-[21.5px] font-bold text-white ">تطوير مواقع الويب
              و المتاجر الالكترونية </h3>
            <p className="text-gray-300 text-[12px] md:text-[14px]">نصمم ونطور مواقع إلكترونية احترافية، سريعة، وآمنة تعكس
              هوية علامتك التجارية.</p>
            <a href="service-details.html" className="flex items-center gap-2 text-[#EDA133] text-[14px] md:text-[15px]">
              تفاصيل الخدمة
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M5.33054 5.51005V13.9307C5.33054 14.1025 5.39879 14.2672 5.52026 14.3887C5.64174 14.5102 5.80649 14.5784 5.97828 14.5784C6.15008 14.5784 6.31483 14.5102 6.43631 14.3887C6.55778 14.2672 6.62603 14.1025 6.62603 13.9307V7.07353L15.8839 16.3322C16.0054 16.4537 16.1702 16.522 16.3421 16.522C16.514 16.522 16.6789 16.4537 16.8004 16.3322C16.922 16.2106 16.9902 16.0458 16.9902 15.8739C16.9902 15.702 16.922 15.5372 16.8004 15.4156L7.54177 6.15779H14.3989C14.5707 6.15779 14.7355 6.08954 14.8569 5.96807C14.9784 5.84659 15.0467 5.68184 15.0467 5.51005C15.0467 5.33825 14.9784 5.1735 14.8569 5.05202C14.7355 4.93055 14.5707 4.8623 14.3989 4.8623H5.97828C5.80649 4.8623 5.64174 4.93055 5.52026 5.05202C5.39879 5.1735 5.33054 5.33825 5.33054 5.51005Z"
                  fill="#EDA133" />
              </svg>
            </a>
          </div>
        </div>

        {/* <!-- Service Card 8 --> */}
        <div
          className="bg-[#313B4D] w-full h-full flex items-start justify-start gap-[16px] md:gap-[35px] rounded-lg p-8 border border-gray-700 hover:border-[#EDA133] transition-all duration-300 hover:transform hover:-translate-y-2">
          <div className="self-start w-16 h-16 mt-[7px]">
            <img src="/service-icon.svg" alt="service icon" />
          </div>
          <div className="flex flex-col gap-[10px] w-full md:w-[240px]">
            <h3 className="text-[16px] md:text-[21.5px] font-bold text-white ">تطوير مواقع الويب
              و المتاجر الالكترونية </h3>
            <p className="text-gray-300 text-[12px] md:text-[14px]">نصمم ونطور مواقع إلكترونية احترافية، سريعة، وآمنة تعكس
              هوية علامتك التجارية.</p>
            <a href="service-details.html" className="flex items-center gap-2 text-[#EDA133] text-[14px] md:text-[15px]">
              تفاصيل الخدمة
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M5.33054 5.51005V13.9307C5.33054 14.1025 5.39879 14.2672 5.52026 14.3887C5.64174 14.5102 5.80649 14.5784 5.97828 14.5784C6.15008 14.5784 6.31483 14.5102 6.43631 14.3887C6.55778 14.2672 6.62603 14.1025 6.62603 13.9307V7.07353L15.8839 16.3322C16.0054 16.4537 16.1702 16.522 16.3421 16.522C16.514 16.522 16.6789 16.4537 16.8004 16.3322C16.922 16.2106 16.9902 16.0458 16.9902 15.8739C16.9902 15.702 16.922 15.5372 16.8004 15.4156L7.54177 6.15779H14.3989C14.5707 6.15779 14.7355 6.08954 14.8569 5.96807C14.9784 5.84659 15.0467 5.68184 15.0467 5.51005C15.0467 5.33825 14.9784 5.1735 14.8569 5.05202C14.7355 4.93055 14.5707 4.8623 14.3989 4.8623H5.97828C5.80649 4.8623 5.64174 4.93055 5.52026 5.05202C5.39879 5.1735 5.33054 5.33825 5.33054 5.51005Z"
                  fill="#EDA133" />
              </svg>
            </a>
          </div>
        </div>

        {/* <!-- Service Card 9 --> */}
        <div
          className="bg-[#313B4D] w-full h-full flex items-start justify-start gap-[16px] md:gap-[35px] rounded-lg p-8 border border-gray-700 hover:border-[#EDA133] transition-all duration-300 hover:transform hover:-translate-y-2">
          <div className="self-start w-16 h-16 mt-[7px]">
            <img src="/service-icon.svg" alt="service icon" />
          </div>
          <div className="flex flex-col gap-[10px] w-full md:w-[240px]">
            <h3 className="text-[16px] md:text-[21.5px] font-bold text-white ">تطوير مواقع الويب
              و المتاجر الالكترونية </h3>
            <p className="text-gray-300 text-[12px] md:text-[14px]">نصمم ونطور مواقع إلكترونية احترافية، سريعة، وآمنة تعكس
              هوية علامتك التجارية.</p>
            <a href="service-details.html" className="flex items-center gap-2 text-[#EDA133] text-[14px] md:text-[15px]">
              تفاصيل الخدمة
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M5.33054 5.51005V13.9307C5.33054 14.1025 5.39879 14.2672 5.52026 14.3887C5.64174 14.5102 5.80649 14.5784 5.97828 14.5784C6.15008 14.5784 6.31483 14.5102 6.43631 14.3887C6.55778 14.2672 6.62603 14.1025 6.62603 13.9307V7.07353L15.8839 16.3322C16.0054 16.4537 16.1702 16.522 16.3421 16.522C16.514 16.522 16.6789 16.4537 16.8004 16.3322C16.922 16.2106 16.9902 16.0458 16.9902 15.8739C16.9902 15.702 16.922 15.5372 16.8004 15.4156L7.54177 6.15779H14.3989C14.5707 6.15779 14.7355 6.08954 14.8569 5.96807C14.9784 5.84659 15.0467 5.68184 15.0467 5.51005C15.0467 5.33825 14.9784 5.1735 14.8569 5.05202C14.7355 4.93055 14.5707 4.8623 14.3989 4.8623H5.97828C5.80649 4.8623 5.64174 4.93055 5.52026 5.05202C5.39879 5.1735 5.33054 5.33825 5.33054 5.51005Z"
                  fill="#EDA133" />
              </svg>
            </a>
          </div>
        </div>

        {/* <!-- Service Card 10 --> */}
        <div
          className="bg-[#313B4D] w-full h-full flex items-start justify-start gap-[16px] md:gap-[35px] rounded-lg p-8 border border-gray-700 hover:border-[#EDA133] transition-all duration-300 hover:transform hover:-translate-y-2">
          <div className="self-start w-16 h-16 mt-[7px]">
            <img src="/service-icon.svg" alt="service icon" />
          </div>
          <div className="flex flex-col gap-[10px] w-full md:w-[240px]">
            <h3 className="text-[16px] md:text-[21.5px] font-bold text-white ">تطوير مواقع الويب
              و المتاجر الالكترونية </h3>
            <p className="text-gray-300 text-[12px] md:text-[14px]">نصمم ونطور مواقع إلكترونية احترافية، سريعة، وآمنة تعكس
              هوية علامتك التجارية.</p>
            <a href="service-details.html" className="flex items-center gap-2 text-[#EDA133] text-[14px] md:text-[15px]">
              تفاصيل الخدمة
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M5.33054 5.51005V13.9307C5.33054 14.1025 5.39879 14.2672 5.52026 14.3887C5.64174 14.5102 5.80649 14.5784 5.97828 14.5784C6.15008 14.5784 6.31483 14.5102 6.43631 14.3887C6.55778 14.2672 6.62603 14.1025 6.62603 13.9307V7.07353L15.8839 16.3322C16.0054 16.4537 16.1702 16.522 16.3421 16.522C16.514 16.522 16.6789 16.4537 16.8004 16.3322C16.922 16.2106 16.9902 16.0458 16.9902 15.8739C16.9902 15.702 16.922 15.5372 16.8004 15.4156L7.54177 6.15779H14.3989C14.5707 6.15779 14.7355 6.08954 14.8569 5.96807C14.9784 5.84659 15.0467 5.68184 15.0467 5.51005C15.0467 5.33825 14.9784 5.1735 14.8569 5.05202C14.7355 4.93055 14.5707 4.8623 14.3989 4.8623H5.97828C5.80649 4.8623 5.64174 4.93055 5.52026 5.05202C5.39879 5.1735 5.33054 5.33825 5.33054 5.51005Z"
                  fill="#EDA133" />
              </svg>
            </a>
          </div>
        </div>

        {/* <!-- Service Card 11 --> */}
        <div
          className="bg-[#313B4D] w-full h-full flex items-start justify-start gap-[16px] md:gap-[35px] rounded-lg p-8 border border-gray-700 hover:border-[#EDA133] transition-all duration-300 hover:transform hover:-translate-y-2">
          <div className="self-start w-16 h-16 mt-[7px]">
            <img src="/service-icon.svg" alt="service icon" />
          </div>
          <div className="flex flex-col gap-[10px] w-full md:w-[240px]">
            <h3 className="text-[16px] md:text-[21.5px] font-bold text-white ">تطوير مواقع الويب
              و المتاجر الالكترونية </h3>
            <p className="text-gray-300 text-[12px] md:text-[14px]">نصمم ونطور مواقع إلكترونية احترافية، سريعة، وآمنة تعكس
              هوية علامتك التجارية.</p>
            <a href="service-details.html" className="flex items-center gap-2 text-[#EDA133] text-[14px] md:text-[15px]">
              تفاصيل الخدمة
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M5.33054 5.51005V13.9307C5.33054 14.1025 5.39879 14.2672 5.52026 14.3887C5.64174 14.5102 5.80649 14.5784 5.97828 14.5784C6.15008 14.5784 6.31483 14.5102 6.43631 14.3887C6.55778 14.2672 6.62603 14.1025 6.62603 13.9307V7.07353L15.8839 16.3322C16.0054 16.4537 16.1702 16.522 16.3421 16.522C16.514 16.522 16.6789 16.4537 16.8004 16.3322C16.922 16.2106 16.9902 16.0458 16.9902 15.8739C16.9902 15.702 16.922 15.5372 16.8004 15.4156L7.54177 6.15779H14.3989C14.5707 6.15779 14.7355 6.08954 14.8569 5.96807C14.9784 5.84659 15.0467 5.68184 15.0467 5.51005C15.0467 5.33825 14.9784 5.1735 14.8569 5.05202C14.7355 4.93055 14.5707 4.8623 14.3989 4.8623H5.97828C5.80649 4.8623 5.64174 4.93055 5.52026 5.05202C5.39879 5.1735 5.33054 5.33825 5.33054 5.51005Z"
                  fill="#EDA133" />
              </svg>
            </a>
          </div>
        </div>

        {/* <!-- Service Card 12 --> */}
        <div
          className="bg-[#313B4D] w-full h-full flex items-start justify-start gap-[16px] md:gap-[35px] rounded-lg p-8 border border-gray-700 hover:border-[#EDA133] transition-all duration-300 hover:transform hover:-translate-y-2">
          <div className="self-start w-16 h-16 mt-[7px]">
            <img src="/service-icon.svg" alt="service icon" />
          </div>
          <div className="flex flex-col gap-[10px] w-full md:w-[240px]">
            <h3 className="text-[16px] md:text-[21.5px] font-bold text-white ">تطوير مواقع الويب
              و المتاجر الالكترونية </h3>
            <p className="text-gray-300 text-[12px] md:text-[14px]">نصمم ونطور مواقع إلكترونية احترافية، سريعة، وآمنة تعكس
              هوية علامتك التجارية.</p>
            <a href="service-details.html" className="flex items-center gap-2 text-[#EDA133] text-[14px] md:text-[15px]">
              تفاصيل الخدمة
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M5.33054 5.51005V13.9307C5.33054 14.1025 5.39879 14.2672 5.52026 14.3887C5.64174 14.5102 5.80649 14.5784 5.97828 14.5784C6.15008 14.5784 6.31483 14.5102 6.43631 14.3887C6.55778 14.2672 6.62603 14.1025 6.62603 13.9307V7.07353L15.8839 16.3322C16.0054 16.4537 16.1702 16.522 16.3421 16.522C16.514 16.522 16.6789 16.4537 16.8004 16.3322C16.922 16.2106 16.9902 16.0458 16.9902 15.8739C16.9902 15.702 16.922 15.5372 16.8004 15.4156L7.54177 6.15779H14.3989C14.5707 6.15779 14.7355 6.08954 14.8569 5.96807C14.9784 5.84659 15.0467 5.68184 15.0467 5.51005C15.0467 5.33825 14.9784 5.1735 14.8569 5.05202C14.7355 4.93055 14.5707 4.8623 14.3989 4.8623H5.97828C5.80649 4.8623 5.64174 4.93055 5.52026 5.05202C5.39879 5.1735 5.33054 5.33825 5.33054 5.51005Z"
                  fill="#EDA133" />
              </svg>
            </a>
          </div>
        </div>
      </div>

    </div>
  </section>

  {/* <!-- Business Building Projects bar section --> */}
  <ProjectLogos />

  {/* <!-- Process Steps Section --> */}
  <section>
    <div className="bg-[#FAEAD1] rounded-[8px] py-[48px] lg:pt-[120px] lg:pb-[80px] px-[15px] md:px-10">
      <div className="w-full max-w-[1400px] mx-auto">
        {/* <!-- Process Steps --> */}
        <div
          className="w-full flex flex-col lg:flex-row lg:items-start xl:items-center lg:justify-between gap-[80px] xl:gap-[236px]">
          {/* <!-- left Side - CTA --> */}
          <div className="w-full lg:w-[223px] flex flex-col gap-5">
            <h2 className="text-[24px] md:text-[32px] font-bold text-black leading-[1.4]">
              خطوات لتحويل أفكارك إلى واقع
            </h2>

            {/* <!-- CTA Button --> */}
            <section className="hidden md:block">
              <button
                className="w-full md:w-[222px] h-[56px] bg-[#EDA133] rounded-lg flex items-center justify-center gap-2 hover:bg-[#D8902A] transition-all duration-300">
                <div className="flex items-center gap-3">
                  <span className="text-white text-[16px] font-medium">دعوة للانضمام</span>
                  <img src="/call-icon.svg" alt="call" className="w-5 h-5" />
                </div>
              </button>
            </section>
          </div>

          <section className="flex flex-col xl:flex-row items-center justify-center gap-[80px] lg:gap-[72px]">
            {/* <!-- Step 1 --> */}
            <div className="relative w-full lg:w-full lg:h-[170px] flex flex-col gap-4">
              <div className="absolute right-[0px] top-[-45px] z-[0] opacity-60">
                <img src="/01.svg" alt="background art" />
              </div>
              <h3 className="text-[24px] font-bold text-black leading-[1] relative z-[10]">
                فهم الاحتياجات
              </h3>
              <p className="text-[15px] text-[#393939] leading-[1.6] font-medium">
                نبدأ أولاً بفهم كامل لاحتياجاتك وأهدافك. من خلال جلسات استشارية ومراجعات تفصيلية، نحدد أولويات المشروع
                ونصمم خطة مخصصة ترتكز على رؤيتك لضمان تحقيق أقصى استفادة.
              </p>
            </div>

            {/* <!-- Step 2 --> */}
            <div className="relative w-full lg:w-full lg:h-[170px] flex flex-col gap-4">
              <div className="absolute right-[0px] top-[-45px] z-[0] opacity-60">
                <img src="/02.svg" alt="background art" />
              </div>
              <h3 className="text-[24px] font-bold text-black leading-[1] relative z-[10]">
                التنفيذ بجودة عالية
              </h3>
              <p className="text-[15px] text-[#393939] leading-[1.6] font-medium">
                بناءً على التحليل الأولي، يبدأ فريقنا المتخصص في تنفيذ المشروع باستخدام أفضل الأدوات والتقنيات المتاحة.
                نحن ملتزمون بتقديم الحلول بأعلى مستوى من الجودة والابتكار لضمان تلبية جميع متطلباتك.
              </p>
            </div>

            {/* <!-- Step 3 --> */}
            <div className="relative w-full lg:w-full lg:h-[170px] flex flex-col gap-4">
              <div className="absolute right-[0px] top-[-45px] z-[0] opacity-60">
                <img src="/03.svg" alt="background art" />
              </div>
              <h3 className="text-[24px] font-bold text-black leading-[1] relative z-[10]">
                مراقبة وتطوير مستمر
              </h3>
              <p className="text-[15px] text-[#393939] font-medium leading-[1.6]">
                نقوم بمراقبة الأداء بشكل دوري وتحليل النتائج لضمان تحقيق الأهداف بكفاءة. بناءً على ذلك، نقدم تقارير
                شاملة ونقوم بإجراء التعديلات اللازمة لضمان تحسين مستمر وتحقيق أفضل النتائج.
              </p>
            </div>
          </section>
        </div>


        <section className="block md:hidden">
          {/* <!-- CTA Button --> */}
          <button
            className="w-full mt-[32px] lg:w-[222px] h-[56px] bg-[#EDA133] rounded-lg flex items-center justify-center gap-2 hover:bg-[#D8902A] transition-all duration-300">
            <div className="flex items-center gap-3">
              <span className="text-white text-[16px] font-medium">دعوة للانضمام</span>
              <img src="/call-icon.svg" alt="call" className="w-5 h-5" />
            </div>
          </button>
        </section>
      </div>
    </div>
  </section></>
  )
}