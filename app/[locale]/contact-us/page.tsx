import ContactUsForm from "@/app/components/contact-us/ContactUsForm";
import MapComponent from "@/app/components/contact-us/MapComponent";
import FAQ from "@/app/components/global/FAQ";
import { ContactUsPageDataType } from "@/app/utils/Types";
import { Link } from "@/i18n/navigation";
import { getLocale } from "next-intl/server";

export default async function Page() {
  const locale = await getLocale();

  async function getContactUsPageData(locale: string): Promise<ContactUsPageDataType> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getContactUsInfo`, {
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
  const { data } = await getContactUsPageData(locale);

  return (
    <>
      {/* <!-- Contact Us Section --> */}
      <section className="relative pt-[4rem] lg:pt-[6.7rem]">
        <div className="relative bg-[#FCF4E9] overflow-hidden">

          <div className="max-w-[1670px] mx-auto relative z-[50] grid lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-5">

            {/* <!-- Background Vector --> */}
            <div className="absolute right-[20px] top-[20px] ltr:hidden  ltr:xl:left-[-4%] rtl:xl:right-[-4%] xl:top-[10%] ltr:2xl:left-[6%] rtl:2xl:right-[6%] 2xl:top-[10%] opacity-70 z-[10]">
              <img
                src="/contact-bg-background.png"
                alt="background decoration"
                className="w-[225px] h-[543px]"
              />
            </div>


            <div className="bg-[#FCF4E9] h-full relative  w-full 2xl:col-span-3
              flex flex-col items-center justify-center gap-[32px]
              px-[15px] xl:px-[5rem] 2xl:px-[14rem] 2xl:ps-[14rem] pt-[20px] lg:py-[32px]
              ">

              <h1 className="text-[28px] md:text-[48px] w-full font-bold text-[#232323] leading-[1.75] relative z-[50]">
                {data?.other?.header_title?.slice(0, 60)}
              </h1>

              <div className="absolute z-[50] md:top-[31%] lg:top-[36%] xl:top-[38%] 2xl:top-[38%] right-[45px] md:right-[5%] lg:right-[4%] xl:right-[14%] 2xl:right-[25%] hidden md:block">
                <img src="/hero-vector-1393.svg" alt="decorative element" className="w-[247px] h-[28px]" />
              </div>

              <div className="absolute top-[23%] right-[25px] md:hidden  z-[50]">
                <img src="/hero-vector-mobile.svg" alt="decorative element" className="" />
              </div>

              <p className="text-[14px] md:text-[18px] font-medium text-[#393939] leading-[1.56] xl:max-w-full relative z-[50]">
                {data?.other?.header_description}
              </p>

              {/* <!-- Buttons --> */}
              <div className="flex flex-row gap-4 w-full relative z-[50]">
                <Link href="/start-your-project" className="bg-[#EDA133] hover:bg-[#D1912A] w-full md:w-auto text-white h-[48px] md:h-auto md:px-6 py-3 rounded-[8px] font-medium text-[14px] md:text-[16px] flex items-center justify-center gap-2 transition-colors">
                  ابدأ مشروعك الآن
                  <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12.6123 4.49951C12.9321 4.49951 13.1973 4.77661 13.1973 5.11084C13.2027 5.27771 13.1309 5.43305 13.0264 5.54248C12.9216 5.65197 12.7777 5.72119 12.6123 5.72119H7.49512L15.8545 14.4585C16.0802 14.6947 16.0802 15.0865 15.8545 15.3228C15.6285 15.559 15.2534 15.559 15.0273 15.3228L6.50391 6.4126V12.106C6.50391 12.4402 6.23967 12.7173 5.91992 12.7173C5.60018 12.7173 5.33594 12.4402 5.33594 12.106V5.11084C5.33594 4.77661 5.60018 4.49952 5.91992 4.49951H12.6123Z"
                      fill="white"
                    />
                  </svg>
                </Link>

                <button className="border border-[#EDA133] w-full md:w-auto text-[#EDA133] h-[48px] md:h-auto md:px-6 py-3 rounded-[8px] font-medium text-[14px] md:text-[16px] hover:bg-orange-50 transition-colors">
                  اتصل بنا الآن
                </button>
              </div>
            </div>


            <div className="w-full h-[350px] md:h-[655px] relative mt-[24px] lg:mt-0 2xl:col-span-2">
              <img
                src="/contact-us-bg.png.png"
                alt="hero image"
                className="w-full h-full object-cover lg:rounded-[8px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* <!-- From Section --> */}
      <ContactUsForm />

      {/* <!-- Contact Methods Section --> */}
      <div className="w-full bg-white px-6 pb-[48px] md:pb-[72px]">
        <div className="max-w-[1300px] mx-auto">
          {/* <!-- Section Header --> */}
          <div className="flex flex-col items-center gap-3 mb-[32px] md:mb-[48px]">
            <h2 className="text-[24px] md:text-[40px] font-bold text-black text-center">طرق التواصل المتاحة</h2>
            <p className="text-[14px] md:text-[18px] font-medium text-[#4A4A4A] leading-[1.5] text-center max-w-[724px]">
              نوفر لك خيارات متعددة للتواصل معنا، سواء عبر البريد الإلكتروني، الهاتف أو من خلال زيارة فروعنا. اختر
              الطريقة الأنسب لك وسنكون سعداء بمساعدتك.
            </p>
          </div>

          {/* <!-- Contact Methods Cards --> */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px] md:gap-[64px]">
            {/* <!-- Phone Call Card --> */}
            <div className="bg-white rounded-[31px] h-[273px] p-1 shadow-xs border border-[#F3F3F1]">
              <div className="bg-[rgba(245,245,245,0.5)] rounded-[28px] p-6 h-full flex flex-col justify-center items-center">
                <div className="flex flex-col items-center text-center space-y-[2px]">
                  {/* <!-- Icon --> */}
                  <img src="/phone-icon.svg" alt="phone icon" />

                  {/* <!-- Content --> */}
                  <div className="space-y-2">
                    <h3 className="text-[18px] font-medium text-black">جدولة مكالمة</h3>
                    <p className="text-[14px] font-medium text-[#4A4A4A] leading-[1.4]">
                      هل أنت مهتم بالشراكة معنا؟
                      <br />
                      دعنا نناقش أفكارك.
                    </p>
                    <p className="text-[18px] font-bold text-black">{data?.other?.communication?.phone}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* <!-- Support Chat Card --> */}
            <div className="bg-white rounded-[31px] h-[273px] p-1 shadow-xs border border-[#F3F3F1]">
              <div className="bg-[rgba(245,245,245,0.5)] rounded-[28px] p-6 h-full flex flex-col justify-center items-center">
                <div className="flex flex-col items-center text-center space-y-[2px]">
                  {/* <!-- Icon --> */}
                  <img src="/message-icon.svg" alt="message icon" />

                  {/* <!-- Content --> */}
                  <div className="space-y-2">
                    <h3 className="text-[18px] font-medium text-black">الدردشة مع الدعم</h3>
                    <p className="text-[14px] font-medium text-[#4A4A4A] leading-[1.4]">
                      تواصل مع فريقنا للحصول على
                      <br />
                      دعم فوري
                    </p>
                    <p className="text-[18px] font-bold text-black">{data?.other?.communication?.support_mail}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* <!-- Email Card --> */}
            <div className="bg-white rounded-[31px] h-[273px] p-1 shadow-xs border border-[#F3F3F1]">
              <div className="bg-[rgba(245,245,245,0.5)] rounded-[28px] p-6 h-full flex flex-col justify-center items-center">
                <div className="flex flex-col items-center text-center space-y-[2px]">
                  {/* <!-- Icon --> */}
                  <img src="/email-icon.svg" alt="email icon" />

                  {/* <!-- Content --> */}
                  <div className="space-y-2">
                    <h3 className="text-[18px] font-medium text-black">استفسارات البريد الإلكتروني</h3>
                    <p className="text-[14px] font-medium text-[#4A4A4A] leading-[1.4]">
                      أرسل لنا اسئلتك وسنقوم
                      <br />
                      بالرد عليها بسرعة.
                    </p>
                    <p className="text-[18px] font-bold text-black">{data?.other?.communication?.contact_email}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Our Branches Locations --> */}
      <div className="w-full bg-white pb-[48px] md:pb-[72px] px-[15px] 2xl:px-0">
        <div className="max-w-[1300px] mx-auto">
          {/* <!-- Section Header --> */}
          <div className="flex flex-col items-center gap-3 mb-[32px] md:mb-[48px] px-[15px] lg:px-0">
            <h2 className="text-[24px] md:text-[40px] font-bold text-black text-center">أماكن فروعنا بالقرب منك</h2>
            <p className="text-[14px] md:text-[18px] font-medium text-[#4A4A4A] leading-[1.5] text-center max-w-[724px]">
              استعرض جميع فروعنا المنتشرة وسجّل بياناتك أو تواصل مباشرة مع أقرب فرع لك بسهولة تامة.
            </p>
          </div>

          {/* <!-- Interactive Map --> */}
          <MapComponent branchesData={data?.other?.branches ? data?.other?.branches : []} />

          {/* <!-- Default Branches Cards --> */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[24px] md:gap-[35px] px-[15px] lg:px-0">

            {data?.other?.branches?.map(branch => {
              return (
                <div key={branch.id} className="bg-white rounded-[6px] p-1 shadow-lg border border-[#F3F3F1] w-full">
                  <div className="bg-[rgba(245,245,245,0.5)] rounded-[6px] p-6 h-full">
                    <h4 className="font-bold text-[20px] leading-normal text-black mb-[12px]">{branch?.name}</h4>
                    <div className="space-y-[10px]">
                      <div className="flex items-center gap-[14px]">
                        <div className="flex-shrink-0">
                          <img src="/location-icon-svg.svg" alt="location icon" />
                        </div>
                        <span className="font-medium text-[14px] text-[#232323] leading-tight">
                          {branch?.location}
                        </span>
                      </div>
                      <div className="flex items-center gap-[14px]">
                        <img src="/call-icon-svg.svg" alt="call icon" />
                        <span className="font-medium text-[14px] text-[#232323]">{branch?.phone}</span>
                      </div>
                      <div className="flex items-center gap-[14px]">
                        <img src="/email-icon-svg.svg" alt="email icon" />
                        <span className="font-medium text-[14px] text-[#232323]">{branch?.email}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}

  
          </div>
        </div>
      </div>

      {/* <!-- FAQ Section --> */}
      <FAQ faqs={data?.other?.faqs ? data?.other?.faqs : []} />
    </>
  );
}
