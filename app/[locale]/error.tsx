'use client';

import { Link } from "@/i18n/navigation";

const ErrorBoundary = ({
    error,
    reset,
  }: {
    error: Error & { digest?: string }
    reset: () => void
  }) => {

    console.log(error.message, "error")

  if (error.message == "Failed to fetch Server issue") {
    return (
      <>
        <div className="w-full bg-white py-4 px-6 pt-[6rem] lg:pt-[8rem] xl:pt-[9rem]">
          <div className="max-w-[1400px] mx-auto xl:px-[24px]">
            <div className="flex items-center gap-2">
              <Link href="/" className="text-[#8B8B8B] text-[15px] font-medium leading-[1.65]">
                الرئيسية
              </Link>
          
            </div>
          </div>
        </div>

        <div className="w-full bg-white pt-[20px] pb-[64px] md:pb-[100px] md:pt-[36px]  px-6">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex flex-col items-center gap-[32px] max-w-[553px] mx-auto">
              <img className="w-[202px] h-[169px] md:w-[352px] md:h-[321px]" src="/no-internet.svg" alt="error 404 image" />

              <div className="flex flex-col items-center gap-2 text-center px-[15px] md:px-0">
                <h1 className="text-black text-[20px] md:text-[24px] font-bold leading-[1.5]">
                  لا يوجد اتصال بالسيرفر
                </h1>
                <p className="text-[#4A4A4A] text-[14px] font-medium leading-[1.43]">
                تحقق من اتصالك بالإنترنت وأعد المحاولة
                لاحقًا.
                </p>
              </div>

              <button onClick={() => reset()} className="bg-[#EDA133] text-white w-[181px] py-2 rounded-lg font-medium text-[16px] leading-[1.5] hover:bg-[#D1912A] transition-colors">
                تحديث الصفحة
              </button>
            </div>
          </div>
        </div>
    </>
    )
  }
  return (
    <>
      <div className="w-full bg-white py-4 px-6 pt-[6rem] lg:pt-[8rem] xl:pt-[9rem]">
        <div className="max-w-[1400px] mx-auto xl:px-[24px]">
          <div className="flex items-center gap-2">
            <Link href="/" className="text-[#8B8B8B] text-[15px] font-medium leading-[1.65]">
              الرئيسية
            </Link>
        
          </div>
        </div>
      </div>

      <div className="w-full bg-white pt-[20px] pb-[64px] md:pb-[100px] md:pt-[36px]  px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col items-center gap-[32px] max-w-[553px] mx-auto">
            <img className="w-[202px] h-[169px] md:w-[352px] md:h-[321px]" src="/error404.svg" alt="error 404 image" />

            <div className="flex flex-col items-center gap-2 text-center px-[15px] md:px-0">
              <h1 className="text-black text-[20px] md:text-[24px] font-bold leading-[1.5]">
                حدث خطأ أثناء تحميل المحتوى
              </h1>
              <p className="text-[#4A4A4A] text-[14px] font-medium leading-[1.43]">
                عذرًا، واجهنا مشكلة مؤقتة. يرجى تحديث الصفحة أو المحاولة لاحقًا.
              </p>
            </div>

            <button onClick={() => reset()} className="bg-[#EDA133] text-white w-[181px] py-2 rounded-lg font-medium text-[16px] leading-[1.5] hover:bg-[#D1912A] transition-colors">
              تحديث الصفحة
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ErrorBoundary;
