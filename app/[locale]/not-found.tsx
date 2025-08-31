import { Link } from "@/i18n/navigation";

// import Link from "next/link";

const GlobalNotFound = () => {
  return (
    <>
      <div className="w-full bg-white py-4 px-6 pt-[6rem] lg:pt-[8rem] xl:pt-[9rem]">
        <div className="max-w-[1400px] mx-auto xl:px-[24px]">
          <div className="flex items-center gap-2">
            <Link href="/" className="text-[#8B8B8B] text-[15px] font-medium leading-[1.65]">
              الرئيسية
            </Link>
            <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10.0603 14.281C10.1869 14.281 10.3136 14.2343 10.4136 14.1343C10.6069 13.941 10.6069 13.621 10.4136 13.4277L6.06693 9.08099C5.74693 8.76099 5.74693 8.24099 6.06693 7.92099L10.4136 3.57432C10.6069 3.38099 10.6069 3.06099 10.4136 2.86766C10.2203 2.67432 9.90026 2.67432 9.70693 2.86766L5.36026 7.21432C5.02026 7.55432 4.82693 8.01432 4.82693 8.50099C4.82693 8.98766 5.01359 9.44766 5.36026 9.78766L9.70693 14.1343C9.80693 14.2277 9.93359 14.281 10.0603 14.281Z"
                fill="#8B8B8B"
              />
            </svg>

            
          </div>
        </div>
      </div>

      <div className="w-full bg-white pt-[20px] pb-[64px] md:pb-[100px] md:pt-[36px] px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col items-center gap-[32px] max-w-[553px] mx-auto">
            <img
              className="w-[258px] h-[169px] md:w-[490px] md:h-[321px]"
              src="/unavailable-content.svg"
              alt="unavailable-content image"
            />

            <div className="flex flex-col items-center gap-2 text-center px-[15px] md:px-0">
              <h1 className="text-black text-[20px] md:text-[24px] font-bold leading-[1.5]">المحتوى غير متاح مؤقتًا</h1>
              <p className="text-[#4A4A4A] text-[14px] font-medium leading-[1.43]">
                نقوم ببعض التحسينات. شكرًا لصبرك، سنعود قريبًا.
              </p>
            </div>

            <Link href="/" className="bg-[#EDA133] text-white w-[181px] py-2 rounded-lg font-medium text-center text-[16px] leading-[1.5] hover:bg-[#D1912A] transition-colors">
              الرئيسية
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default GlobalNotFound;
