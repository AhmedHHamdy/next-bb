import CountryCodeInput from "@/app/components/global/CountryCodeInput";
import FileUpload from "@/app/components/global/FileUpload";
import { Link } from "@/i18n/navigation";

export default function Page() {
  return (
    <>
      <div className="w-full bg-white px-6 pt-[6rem] lg:pt-[8rem] xl:pt-[9rem]">
        <div className="max-w-[1400px] mx-auto xl:px-[24px]">
          <div className="flex items-center gap-2">
            <Link href="/career" className="text-[#8B8B8B] text-[15px] font-medium leading-[1.65]">
              الفرص الوظيفية
            </Link>
            <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10.0603 14.281C10.1869 14.281 10.3136 14.2343 10.4136 14.1343C10.6069 13.941 10.6069 13.621 10.4136 13.4277L6.06693 9.08099C5.74693 8.76099 5.74693 8.24099 6.06693 7.92099L10.4136 3.57432C10.6069 3.38099 10.6069 3.06099 10.4136 2.86766C10.2203 2.67432 9.90026 2.67432 9.70693 2.86766L5.36026 7.21432C5.02026 7.55432 4.82693 8.01432 4.82693 8.50099C4.82693 8.98766 5.01359 9.44766 5.36026 9.78766L9.70693 14.1343C9.80693 14.2277 9.93359 14.281 10.0603 14.281Z"
                fill="#8B8B8B"
              />
            </svg>

            <a href="appy-job-page.html" className="text-black text-[15px] font-medium leading-[1.65]">
              قيادة تصميم المنتج
            </a>
          </div>
        </div>
      </div>

      {/* <!-- Job Details Section --> */}
      <div className="w-full bg-white px-6 mt-[24px] md:mt-[32px]">
        <div className="max-w-[1400px] mx-auto xl:px-[24px]">
          <section className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-[49px]">
            <section className="lg:col-span-3 border border-[#DADADA77] rounded-[16px] md:rounded-lg p-[24px]">
              {/* <!-- Job Header --> */}
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-[32px]">
                {/* <!-- Job Info --> */}
                <div className="flex flex-col md:flex-row gap-4">
                  {/* <!-- Company Logo --> */}
                  <img src="/company-apply-page-logo.svg" alt="company logo" />

                  {/* <!-- Location and Company --> */}
                  <div className="flex flex-col gap-4 w-full">
                    <h1 className="text-2xl font-medium text-black text-right">قيادة تصميم المنتج</h1>

                    <section className="flex flex-col md:flex-row items-center gap-[15px]">
                      {/* <!-- Company --> */}
                      <div className="flex items-center gap-2">
                        <img src="/person-svg-apply-page.svg"/>
                        <span className="text-base font-medium text-[#4A4A4A]">رينتال</span>
                      </div>

                      {/* <!-- Location --> */}
                      <div className="flex items-center gap-2">
                        <img src="/location-svg-apply-page.svg"  />
                        <span className="text-base font-medium text-[#4A4A4A]">المملكة العربية السعودية</span>
                      </div>
                    </section>
                  </div>
                </div>
              </div>

              {/* <!-- Divider --> */}
              <div className="w-full h-px bg-[#DADADA77] mb-8"></div>

              {/* <!-- Overview Section --> */}
              <div className="mb-8">
                <h2 className="text-xl font-bold text-black text-right mb-3">نظرة عامة</h2>
                <p className="text-base font-medium text-[#4A4A4A] text-right leading-relaxed">
                  وظيفتك كمصمم تجربة مستخدم هي تقديم تجربة عالمية المستوى لمستخدمي استوديو سيبو. لديك مسؤوليات رئيسية
                  لإجراء أبحاث المستخدم و/أو تقييمها، والقيام بالكثير من الرسم، وإنشاء إطارات عمل ذات قابلية استخدام
                  عالية. كمصمم تجربة مستخدم، ستعمل عن كثب مع فريق من مصممي تجربة المستخدم والمهندسين ومديري المنتجات
                  لتصميم منتجات بسيطة ولكنها رائعة للمستخدم، مع التركيز على تطوير سيناريوهات المستخدم، وتحليل المهام،
                  وتدفقات العمليات، ونماذج التصميم منخفضة الدقة.
                </p>
              </div>

              {/* <!-- Divider --> */}
              <div className="w-full h-px bg-[#DADADA77] mb-8"></div>

              {/* <!-- Job Description Section --> */}
              <div className="mb-8">
                <h2 className="text-xl font-bold text-black text-right mb-3">وصف الوظيفة</h2>
                <div className="text-base font-medium text-[#4A4A4A] text-right leading-relaxed space-y-2">
                  <p>• توفير تدفق مستخدم واضح وإطار عمل</p>
                  <p>• بناء نموذج أولي وإجراء اختبارات الاستخدام لحل مشاكل المستخدمين.</p>
                  <p>• اتباع إرشادات نظام التصميم.</p>
                  <p>• استكشاف أفضل الممارسات لتنفيذ الوثائق الشاملة</p>
                  <p>• توجيه وتدريب أعضاء الفريق المبتدئين لضمان أفضل تنفيذ للتصميم.</p>
                  <p>• كون مستشارًا لمصممي تجربة المستخدم الآخرين في ثلاث قبائل على الأقل.</p>
                </div>
              </div>

              {/* <!-- Divider --> */}
              <div className="w-full h-px bg-[#DADADA77] mb-8"></div>

              {/* <!-- What We Offer Section --> */}
              <div className="mb-8">
                <h2 className="text-xl font-bold text-black text-right mb-3">ما نقدمه</h2>
                <div className="text-base font-medium text-[#4A4A4A] text-right leading-relaxed space-y-2">
                  <p>• راتب تنافسي</p>
                  <p>• مكتب في منطقة كوبنهاغن</p>
                  <p>• الكثير من المسؤولية والحرية</p>
                  <p>• كن جزءًا من شركة ناشئة ممولة ورحلة نمو دولية مثيرة</p>
                  <p>• فرصة للعمل عن كثب والتعلم من فريق ذو خبرة</p>
                  <p>• فريق صغير مخصص يتمتع بثقافة مرحة وشخصية وصديقة</p>
                  <p>• فرصة لزيادة مسؤولياتك مع نمو الشركة</p>
                </div>
              </div>
            </section>

            {/* <!-- Sidebar --> */}
            <div className="lg:col-span-1 xl:col-span-1 self-start">
              <div className="block md:w-[310px] flex-shrink-0 border border-[#DADADA77] h-full p-[16px] pb-[32px] rounded-[16px] md:rounded-[8px]">
                <h3 className="text-[16px] text-black font-medium">بيانات الوظيفة</h3>

                <hr className="my-[16px] text-[#DADADA77]" />

                <div className="space-y-[36px]">
                  <section className="flex items-center gap-[14px]">
                    <img src="/experience-svg.svg" alt="experience svg" />
                    <section className="flex flex-col gap-[8px]">
                      <span className="text-[#686868] text-[14px] font-bold">خبرة</span>
                      <span className="text-[16px] text-[#232323] font-medium">حد أدنى سنة واحدة</span>
                    </section>
                  </section>

                  <section className="flex items-center gap-[14px]">
                    <img src="/level-svg.svg" alt="level svg" />
                    <section className="flex flex-col gap-[8px]">
                      <span className="text-[#686868] text-[14px] font-bold">مستوى العمل</span>
                      <span className="text-[16px] text-[#232323] font-medium">مستوى متقدم</span>
                    </section>
                  </section>

                  <section className="flex items-center gap-[14px]">
                    <img src="/job-type-svg.svg" alt="job type svg" />
                    <section className="flex flex-col gap-[8px]">
                      <span className="text-[#686868] text-[14px] font-bold">أنواع الوظائف</span>
                      <span className="text-[16px] text-[#232323] font-medium">وظائف بدوام كامل</span>
                    </section>
                  </section>
                </div>

                {/* <!-- Apply Button --> */}
                <div className="flex flex-col justify-center gap-[16px] mt-12">
                  <h3 className="text-[16px] font-medium">هل أنت مهتم بهذه الوظائف؟</h3>
                  <button className="bg-[#EDA133] hover:bg-[#D1912A] text-white text-[16px] h-[56px] rounded-lg font-medium transition-colors">
                    تقدم للوظيفة
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* <!-- Apply Form --> */}
      <section className="relative bg-white px-[15px] pt-[20px] pb-[64px] md:pb-[100px] md:pt-[64px]">
        <div className="max-w-[1400px] mx-auto lg:px-[47px]">
          {/* <!-- Section Header --> */}
          <div className="text-center mb-[29px] md:mb-[26px] px-[15px] 2xl:px-0 max-w-[636px] mx-auto">
            <h2 className="text-[24px] md:text-[40px] font-bold text-black mb-[12px]">نموذج التقديم على الوظيفة</h2>
            <p className="text-[14px] md:text-[18px] text-[#4A4A4A] font-medium leading-relaxed max-w-3xl mx-auto">
              املأ النموذج التالي بدقة، وسيتواصل معك فريق الموارد البشرية بعد مراجعة البيانات والتحقّق منها.
            </p>
          </div>

          {/* <!-- Form Section --> */}
          <div className="max-w-[1300px] mx-auto bg-white border border-[#DADADA77] rounded-lg">
            <div className="px-4 pt-4 md:p-8">
              <div className="space-y-[32px] md:space-y-[48px]">
                <div className="space-y-12">
                  <div className="space-y-[16px] md:space-y-6">
                    {/* <!-- Name and country Row --> */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-[16px] md:gap-6">
                      {/* <!-- Name Field --> */}
                      <div className="space-y-3">
                        <label className="text-base font-medium text-black block">
                          {" "}
                          الأسم الكامل <span className="text-[#FF6B6B]">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="الرجاء إدخال اسمك."
                          className="w-full h-12 px-3 py-2 border border-[#DADADA] rounded-md text-sm text-black placeholder-[#B1B1B1] focus:outline-none focus:border-[#EDA133]"
                        />
                      </div>

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

                      <CountryCodeInput />

                      {/* <!-- Linkedin Field --> */}
                      <div className="space-y-3">
                        <label className="text-base font-medium text-black block">حساب Linkedin أو معرض أعمال</label>
                        <input
                          type="email"
                          placeholder="الرجاء إدخال حساب لينكدان او معرض اعمالك."
                          className="w-full h-12 px-3 py-2 border border-[#DADADA] rounded-md text-sm text-black placeholder-[#B1B1B1] focus:outline-none focus:border-[#EDA133]"
                        />
                      </div>

                      <div className="space-y-3 lg:col-span-2">
                        <label className="text-[16px] font-medium text-black block">
                          رسالة تعريفية <span className="text-[#FF6B6B]">*</span>
                        </label>
                        <textarea
                          placeholder="شاركنا لمحة عنك ولماذا ترغب بالانضمام إلينا."
                          className="w-full h-36 px-3 py-3 border border-[#DADADA] rounded-md text-sm text-black placeholder-[#B1B1B1] focus:outline-none focus:border-[#EDA133] resize-none"
                        ></textarea>
                      </div>
                    </div>

                    <div className="space-y-12">
                      {/* <!-- Project Section --> */}
                      <div className="space-y-[32px] md:space-b-[48px] md:space-t-[56px]">
                        <div className="space-y-[16px] md:space-y-6">
                          {/* <!-- File Upload Section --> */}
                          <FileUpload title="السيرة الذاتية" required={true}/>
                        </div>

                        {/* <!-- Form Actions --> */}
                        <section className="w-full mt-[32px] md:mt-[64px]">
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
          </div>
        </div>
      </section>
    </>
  );
}
