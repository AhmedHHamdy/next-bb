'use client'; // if using Next.js App Router

import { CountriesData } from "@/app/utils/Types";
import { useQuery } from "@tanstack/react-query";
import { Spin } from "antd";
import { useLocale } from "next-intl";
import { useState, useRef, useEffect } from "react";

type Country = {
  id: number,
  name: string,
  country_code: string,
  phone_length: string,
  flag: string
};


export default function CountryCodeInput({ setSelectedPhone, formDataValue }: {
  setSelectedPhone?: (v: string) => void,
  formDataValue?: string
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<Country | undefined>();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [phoneInputValue, setPhoneInputValue] = useState("")


  const locale = useLocale();

  const fetchCountries = async (): Promise<CountriesData> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getAllCountries`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        lang: locale,
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch website countries settings");
    }
    return res.json();
  };

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["countries"],
    queryFn: fetchCountries,
  });

  useEffect(() => {
    setSelected(data?.data?.[0])
  }, [data])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);


  // if (isLoading) {
  //   return (
  //     <section className="min-h-screen text-center flex items-center justify-center">
  //       <section className="px-6 pt-[6rem] lg:pt-[8rem] xl:pt-[9rem] text-center">
  //         <div className="max-w-[1400px] mx-auto flex items-center justify-center">
  //           <Spin size="large" />
  //         </div>
  //       </section>
  //     </section>
  //   );
  // }

  if (isError) {
    return (
      <h3 className="text-red-500 font-medium">حدث خطا في تحميل ارقام الدول</h3>
    );
  }

  return (
    <div className="space-y-3">
      <label className="text-base font-medium text-black block">
        الجوال <span className="text-[#FF6B6B]">*</span>
      </label>

      <div className="flex items-center border border-[#DADADA] rounded-md h-12 relative py-[10px]">
        {/* Country Code Dropdown */}
        <div
          ref={dropdownRef}
          className="flex items-center gap-2 px-3 rtl:border-l ltr:border-r border-[#D4D4D4] h-full cursor-pointer relative"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.6004 7.45898L11.1671 12.8923C10.5254 13.534 9.47539 13.534 8.83372 12.8923L3.40039 7.45898"
              fill="#F5F5F5"
            />
            <path
              d="M16.6004 7.45898L11.1671 12.8923C10.5254 13.534 9.47539 13.534 8.83372 12.8923L3.40039 7.45898"
              stroke="#8B8B8B"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-sm text-[#919191]">{selected?.country_code}</span>
          <img className="w-6" src={selected?.flag} alt="flag" />

          {/* Dropdown Menu */}
          {isOpen && (
            <div className="absolute top-12 left-0 bg-white border border-gray-200 rounded-md shadow-md w-40 z-10">
              {data?.data && data?.data.map((c) => (
                <div
                  key={c.id}
                  className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setSelected(c);
                    setSelectedPhone && setSelectedPhone(c.country_code + "-" + formDataValue)
                    setIsOpen(false);
                  }}
                >
                  <img className="w-7" src={c.flag} alt="flag" />
                  <span className="text-[14px]">{c.country_code}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Phone Input */}
        <input
          type="text"
          value={formDataValue}
          required
          maxLength={
            data?.data && selected?.id
              ? Number(
                  data?.data?.find(
                    (e:any) => String(e.id) == String(selected?.id)
                  )?.phone_length || ""
                )
              : 25
          }
          onChange={(e) => {
            // setPhoneInputValue(e.target.value)
            const value = e.target.value.replace(/\D/g, "");
            setSelectedPhone && setSelectedPhone(selected?.country_code + "-" + value)
          }}
          placeholder="الرجاء إدخال رقم الجوال"
          className="flex-1 px-3 py-2 text-end text-sm text-black placeholder-[#B1B1B1] focus:outline-none rtl:text-start ltr:text-start ltr:placeholder:text-start rtl:placeholder:text-start"
        />
      </div>
    </div>
  );
}