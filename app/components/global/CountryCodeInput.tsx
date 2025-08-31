'use client'; // if using Next.js App Router

import { useState, useRef, useEffect } from "react";

type Country = {
  code: string;
  flag: string;
  img: string;
};

const countries: Country[] = [
  { code: "+966", flag: "🇸🇦", img: "/sa-flag-icon.svg" },
  { code: "+971", flag: "🇦🇪", img: "/sa-flag-icon.svg" },
  { code: "+20", flag: "🇪🇬", img: "/sa-flag-icon.svg" },
];

export default function CountryCodeInput() {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<Country>(countries[0]);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  return (
    <div className="space-y-3">
      <label className="text-base font-medium text-black block">
        الجوال <span className="text-[#FF6B6B]">*</span>
      </label>

      <div className="flex items-center border border-[#DADADA] rounded-md h-12 relative py-[10px]">
        {/* Country Code Dropdown */}
        <div
          ref={dropdownRef}
          className="flex items-center gap-2 px-3 border-l border-[#D4D4D4] h-full cursor-pointer relative"
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
          <span className="text-sm text-[#919191]">{selected.code}</span>
          <img src={selected.img} alt="flag" />

          {/* Dropdown Menu */}
          {isOpen && (
            <div className="absolute top-12 left-0 bg-white border border-gray-200 rounded-md shadow-md w-40 z-10">
              {countries.map((c) => (
                <div
                  key={c.code}
                  className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setSelected(c);
                    setIsOpen(false);
                  }}
                >
                  <img src={c.img} alt="flag" />
                  <span className="text-[14px]">{c.code}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Phone Input */}
        <input
          type="tel"
          placeholder="الرجاء إدخال رقم الجوال"
          className="flex-1 px-3 py-2 text-end text-sm text-black placeholder-[#B1B1B1] focus:outline-none"
        />
      </div>
    </div>
  );
}