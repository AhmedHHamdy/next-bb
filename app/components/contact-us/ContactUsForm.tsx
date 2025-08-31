'use client'

export default function ContactUsForm() {
  return (
    <div className="w-full bg-white px-6 pt-[48px] pb-[48px] md:pb-[72px] md:pt-[72px]">
      <div className="max-w-[1300px] mx-auto">
        {/* <!-- Contact Form Header --> */}
        <div className="flex flex-col items-center gap-3 mb-[32px]">
          <h1 className="text-[24px] md:text-[40px] font-bold text-black text-center">أرسل لنا رسالتك</h1>
          <p className="text-[14px] md:text-[18px] font-medium text-[#4A4A4A] leading-[1.5] text-center max-w-[611px]">
            رجاء تعبئة النموذج التالي للتواصل مع فريقنا المتخصص. نحن هنا للرد على استفساراتك وتقديم الدعم الذي تحتاجه.
          </p>
        </div>

        {/* <!-- Contact --> */}
        <div className="flex flex-col lg:flex-row gap-9 justify-center">
          <div className="w-full lg:w-[500px]">
            <div className="bg-white border border-[#E7E8E9] rounded-lg p-6 shadow-lg">
              <h2 className="text-[20px] md:text-[40px] font-medium md:font-bold text-black mb-9">
                يرجى ملء النموذج التالي
              </h2>

              <div className="space-y-6">
                <p className="text-[14px] md:text-[18px] font-medium text-[#4A4A4A] leading-[1.5] ">
                  قم بتعبئة البيانات أدناه ليتمكن فريقنا من مساعدتك بشكل أسرع. نحن هنا دائمًا للإجابة على جميع أسئلتك
                  وتقديم الاستشارات التي تحتاجها لنجاح مشروعك.
                </p>

                <section className="flex items-center">
                  {/* <!-- User Avatars --> */}
                  <div className="flex items-center gap-4">
                    <div className="flex -space-x-2">
                      <div className="w-12 h-12 rounded-full border-2 border-white bg-gray-300 flex items-center justify-center">
                        <span className="text-white text-sm font-medium">أ</span>
                      </div>
                      <div className="w-12 h-12 rounded-full border-2 border-white bg-gray-400 flex items-center justify-center">
                        <span className="text-white text-sm font-medium">ب</span>
                      </div>
                      <div className="w-12 h-12 rounded-full border-2 border-white bg-gray-500 flex items-center justify-center">
                        <span className="text-white text-sm font-medium">ج</span>
                      </div>
                    </div>

                    {/* <!-- Rating Section --> */}
                    <div className="flex flex-col items-center gap-[2px]">
                      <div className="flex items-center gap-2">
                        <img src="/star-svg.svg" alt="star svg" />
                        <span className="text-[16px] font-normal text-[#050505]">4.5</span>
                      </div>
                      <span className="text-[14px] font-normal text-[#050505]">من أكثر من 500 تقييم</span>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>

          <div className="flex-1 max-w-[744px]">
            <div className="bg-white border border-[#E7E8E9] rounded-lg p-6 shadow-lg">
              <div className="flex flex-col lg:flex-row gap-8">
                {/* <!-- Form Fields --> */}
                <div className="flex-1 space-y-6">
                  {/* <!-- Name Field --> */}

                  <div className="space-y-3">
                    <label className="block text-[16px] font-medium text-black">الاسم</label>
                    <input
                      type="text"
                      placeholder="الاسم"
                      className="w-full h-12 px-3 py-2 border border-[#DADADA] rounded-md text-sm text-black placeholder-[#B1B1B1] focus:outline-none focus:border-[#EDA133]"
                    />
                  </div>

                  {/* <!-- Email and Phone Row --> */}
                  <div className="flex flex-col lg:flex-row gap-6">
                    <div className="flex-1 space-y-3">
                      <label className="block text-[16px] font-medium text-black">البريد الإلكتروني</label>
                      <input
                        type="email"
                        placeholder="الرجاء إدخال البريد الإلكتروني."
                        className="w-full h-12 px-3 py-2 border border-[#DADADA] rounded-md text-sm text-black placeholder-[#B1B1B1] focus:outline-none focus:border-[#EDA133]"
                      />
                    </div>
                    <div className="flex-1 space-y-3">
                      <label className="block text-[16px] font-medium text-black">الجوال</label>
                      <input
                        dir="rtl"
                        type="tel"
                        placeholder="الرجاء إدخال رقم الجوال."
                        className="w-full h-12 px-3 py-2 border border-[#DADADA] rounded-md text-sm text-black placeholder-[#B1B1B1] focus:outline-none focus:border-[#EDA133]"
                      />
                    </div>
                  </div>

                  {/* <!-- Subject Field --> */}
                  <div className="space-y-3">
                    <label className="block text-[16px] font-medium text-black">عنوان الرسالة</label>
                    <input
                      type="text"
                      placeholder="الرجاء إدخال عنوان الرسالة."
                      className="w-full h-12 px-3 py-2 border border-[#DADADA] rounded-md text-sm text-black placeholder-[#B1B1B1] focus:outline-none focus:border-[#EDA133]"
                    />
                  </div>

                  {/* <!-- Message Field --> */}
                  <div className="space-y-3">
                    <label className="block text-[16px] font-medium text-black">الرسالة</label>
                    <textarea
                      placeholder="الرجاء إدخال نص الرسالة."
                      rows={5}
                      className="w-full px-3 py-2 placeholder:text-[16px] placeholder:text-[#B1B1B1] border border-[#DADADA] rounded-md  focus:outline-none focus:ring-2 focus:ring-[#EDA133] focus:border-transparent resize-none"
                    ></textarea>
                  </div>

                  {/* <!-- Submit Button --> */}
                  <button className="w-full md:w-[266px] h-14 bg-[#EDA133] text-white font-medium text-[16px] rounded-lg hover:bg-[#D1912A] transition-colors">
                    إرسال الرسالة
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
