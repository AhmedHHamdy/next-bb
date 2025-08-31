import CalendarComponent from "@/app/components/consultation/calender";
import CountryCodeInput from "@/app/components/global/CountryCodeInput";

export default function Page() {
  return (
    <>
      <div className="w-full bg-white px-6 pt-[6rem] lg:pt-[8rem] xl:pt-[9rem]">
        <div className="max-w-[1400px] mx-auto xl:px-[24px]">
          <div className="flex items-center gap-2">
            <a href="index.html" className="text-[#8B8B8B] text-[15px] font-medium leading-[1.65]">
              الرئيسية
            </a>
            <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10.0603 14.281C10.1869 14.281 10.3136 14.2343 10.4136 14.1343C10.6069 13.941 10.6069 13.621 10.4136 13.4277L6.06693 9.08099C5.74693 8.76099 5.74693 8.24099 6.06693 7.92099L10.4136 3.57432C10.6069 3.38099 10.6069 3.06099 10.4136 2.86766C10.2203 2.67432 9.90026 2.67432 9.70693 2.86766L5.36026 7.21432C5.02026 7.55432 4.82693 8.01432 4.82693 8.50099C4.82693 8.98766 5.01359 9.44766 5.36026 9.78766L9.70693 14.1343C9.80693 14.2277 9.93359 14.281 10.0603 14.281Z"
                fill="#8B8B8B"
              />
            </svg>

            <a href="faq-page.html" className="text-black text-[15px] font-medium leading-[1.65]">
              طلب استشارة مجانية
            </a>
          </div>
        </div>
      </div>

      <section className="relative bg-white px-[15px] pt-[20px] pb-[64px] md:pb-[100px] md:pt-[36px]">
        <div className="max-w-[1400px] mx-auto lg:px-[47px]">
          {/* <!-- Section Header --> */}
          <div className="text-center mb-[29px] md:mb-[48px] px-[15px] 2xl:px-0 max-w-[636px] mx-auto">
            <h2 className="text-[24px] md:text-[40px] font-bold text-black mb-[12px]">
              احصل على استشارة مجانية الآن وابدأ طريق النجاح
            </h2>
            <p className="text-[14px] md:text-[18px] text-[#4A4A4A] font-medium leading-relaxed max-w-3xl mx-auto">
              قدم طلبك الآن واستفد من استشارة مجانية مع فريقنا المتخصص.
            </p>
          </div>

          {/* <!-- Form Section --> */}
          <div className="max-w-[1300px] mx-auto bg-white border border-[#DADADA77] rounded-lg">
            <div className="px-4 pt-4 md:p-8">
              <div className="space-y-[32px] md:space-y-[48px]">
                <div className="space-y-12">
                  <div className="space-y-[16px] md:space-y-6">
                    <h3 className="text-[20px] md:text-[24px] font-bold text-black pb-[16px] md:pb-[24px] border-b-[0.5px] border-[#DADADA77]">
                      معلومات عن الإستشارة
                    </h3>

                    {/* <!-- Name and country Row --> */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-[16px] md:gap-6">
                      {/* <!-- Name Field --> */}
                      <div className="space-y-3">
                        <label className="text-base font-medium text-black block">
                          الأسم <span className="text-[#FF6B6B]">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="الرجاء إدخال اسمك."
                          className="w-full h-12 px-3 py-2 border border-[#DADADA] rounded-md text-sm text-black placeholder-[#B1B1B1] focus:outline-none focus:border-[#EDA133]"
                        />
                      </div>

                      {/* <!-- Country Field --> */}
                      <div className="space-y-3">
                        <label className="text-base font-medium text-black block">
                          الدولة <span className="text-[#FF6B6B]">*</span>
                        </label>
                        <div className="relative">
                          <select className="w-full h-12 px-3 py-2 border border-[#DADADA] rounded-md text-sm text-black appearance-none focus:outline-none focus:border-[#EDA133]">
                            <option value="">الرجاء إختيار الدولة.</option>
                            <option value="egypt">Egypt</option>
                            <option value="saudi">Saudi Arabia</option>
                            <option value="qatar">Qatar</option>
                          </select>
                          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                              <path d="M2.78 6.84L17.23 6.84L10 13.37L2.78 6.84Z" fill="#8B8B8B" />
                            </svg>
                          </div>
                        </div>
                      </div>

                      <CountryCodeInput />

                      {/* <!-- Email Field --> */}
                      <div className="space-y-3">
                        <label className="text-base font-medium text-black block">
                          البريد الإلكتروني <span className="text-[#FF6B6B]">*</span>
                        </label>
                        <input
                          type="email"
                          placeholder="الرجاء إدخال البريد الإلكتروني."
                          className="w-full h-12 px-3 py-2 border border-[#DADADA] rounded-md text-sm text-black placeholder-[#B1B1B1] focus:outline-none focus:border-[#EDA133]"
                        />
                      </div>

                      <div className="space-y-3">
                        <label className="text-base font-medium text-black block">
                          الخدمة المطلوبة؟<span className="text-[#FF6B6B]">*</span>
                        </label>
                        <div className="relative">
                          <select className="w-full h-12 px-3 py-2 border border-[#DADADA] rounded-md text-sm text-black appearance-none focus:outline-none focus:border-[#EDA133]">
                            <option value="">اختر</option>
                            <option value="web">web</option>
                          </select>
                          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                              <path d="M2.78 6.84L17.23 6.84L10 13.37L2.78 6.84Z" fill="#8B8B8B" />
                            </svg>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3 lg:col-span-2">
                        <label className="text-[16px] font-medium text-black block">استفسارك أو احتياجك</label>
                        <textarea
                          placeholder="الرجاء إدخال استفسارك أو احتياجك."
                          className="w-full h-36 px-3 py-3 border border-[#DADADA] rounded-md text-sm text-black placeholder-[#B1B1B1] focus:outline-none focus:border-[#EDA133] resize-none"
                        ></textarea>
                      </div>
                    </div>
                    {/* <!-- Form Actions --> */}
                    <section className="flex justify-start">
                      <section className="w-full flex flex-col md:flex-row gap-[16px] md:items-center pb-[16px]">
                        <button className="px-4 py-2 bg-[#EDA133] w-full md:w-[268px] h-[56px] text-white rounded-lg text-base font-medium hover:bg-[#D1912A] transition-colors">
                          إرسال
                        </button>

                        <a
                          href="free-consultation-calender.html"
                          className="px-4 py-2 w-full md:w-[268px] flex justify-center items-center h-[56px] text-[#EDA133] gap-[16px] rounded-lg text-base font-medium border border-[#EDA133] hover:bg-orange-50 transition-colors"
                        >
                          رجوع
                        </a>
                      </section>
                    </section>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Calender */}
      <CalendarComponent />
    </>
  );
}
