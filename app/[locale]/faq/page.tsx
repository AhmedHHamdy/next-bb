import FAQ from "@/app/components/global/FAQ";

export default function FaqPage() {
  return (
    <>
      <div className="w-full bg-white px-6 pt-[6rem] lg:pt-[8rem] xl:pt-[9rem]">
        <div className="max-w-[1400px] mx-auto xl:px-[24px]">
          <div className="flex items-center gap-2">
            <a href="index.html" className="text-[#8B8B8B] text-[15px] font-medium leading-[1.65]">
              خدماتنا
            </a>
            <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10.0603 14.281C10.1869 14.281 10.3136 14.2343 10.4136 14.1343C10.6069 13.941 10.6069 13.621 10.4136 13.4277L6.06693 9.08099C5.74693 8.76099 5.74693 8.24099 6.06693 7.92099L10.4136 3.57432C10.6069 3.38099 10.6069 3.06099 10.4136 2.86766C10.2203 2.67432 9.90026 2.67432 9.70693 2.86766L5.36026 7.21432C5.02026 7.55432 4.82693 8.01432 4.82693 8.50099C4.82693 8.98766 5.01359 9.44766 5.36026 9.78766L9.70693 14.1343C9.80693 14.2277 9.93359 14.281 10.0603 14.281Z"
                fill="#8B8B8B"
              />
            </svg>

            <a href="faq-page.html" className="text-black text-[15px] font-medium leading-[1.65]">
              الأسئلة الشائعة
            </a>
          </div>
        </div>
      </div>

      {/* <FAQ /> */}
    </>
  );
}
